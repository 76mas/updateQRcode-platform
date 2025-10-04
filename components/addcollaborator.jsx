"use client";
import { IoMdPersonAdd } from "react-icons/io";
import { useEffect, useId, useRef, useState } from "react";
import i18n from "@/app/(dashboard)/i18n";
import { useTranslation } from "react-i18next";
import { CheckIcon, CopyIcon, UserRoundPlusIcon } from "lucide-react";
import { RiCloseLargeLine } from "react-icons/ri";
import { cn } from "@/lib/utils";
import { t } from "i18next";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Select from "./select";
import axios from "axios";
import { useReloadTemplate } from "@/app/(dashboard)/context/reloadTempleat";

export default function Addcollaborator({ id }) {
  const { t } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage("ar");
  }, [i18n]);
  const { addItem, setAddItem } = useReloadTemplate();
  const [isValid, setIsValid] = useState(false);
  const [open, setOpen] = useState(false);
  const [emails, setEmails] = useState([""]);
  console.log(id);
  const [invitData, setInviteData] = useState([{ email: "", role: "" }]);

  const [copied, setCopied] = useState(false);

  const [loding, setloding] = useState(false);
  // const inputRef = useRef(null)
  const lastInputRef = useRef(null);

  const addEmail = () => {
    setInviteData([...invitData, { email: "", role: "" }]);
  };

  const subInputs = (index) => {
    setInviteData(invitData.filter((item, i) => i !== index));
  };

  const senddata = () => {
    const isValid = invitData.every(
      (item) => item.email.trim() !== "" && item.role.trim() !== ""
    );

    return isValid;
  };

  useEffect(() => {
    const valid = invitData.every(
      (item) => item.email.trim() !== "" && item.role.trim() !== ""
    );
    setIsValid(valid);
  }, [invitData]);

  const handelAddInvitemember = async () => {
    setloding(true);
const baseApiUrl = "https://qrplatform-api.onrender.com";

    try {
      const respons = await axios.post(
        `${baseApiUrl}/api/event/${id}/addteam`,
        invitData
      );

      console.log(respons.data);
      setAddItem(true);
      setOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setloding(false);
      setOpen(false);
    }
  };

  return (
    <div className="dark">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          className="bg-transparen p-2 !w-full  cursor-pointer !flex items-center justify-center "
          asChild
        >
          <div className="text-gray-200 relative focus:bg-gray-800 !justify-between px-2  flex items-center w-full hover:bg-gray-800 rounded-[7px] focus:text-gray-100   cursor-pointer">
            <Button
              variant="ghost"
              className="!border-none !m-0 cursor-pointer p-0    !flex !bg-transparent !text-gray-100 hover:!bg-transparent hover:!text-gray-100 focus:!bg-transparent active:!bg-transparent !shadow-none !outline-none !ring-0  !h-auto"
              style={{
                backgroundColor: "transparent !important",
                border: "none !important",
                boxShadow: "none !important",
              }}
            >
              <span className="block">
                {t("templatesection.action.invite")}
              </span>
            </Button>
            <IoMdPersonAdd className="  text-[#fff]   block" />
          </div>
        </DialogTrigger>
        <DialogContent
          className="bg-gray-900 border-gray-700 text-gray-100"
          onOpenAutoFocus={(e) => {
            e.preventDefault();
            lastInputRef.current?.focus();
          }}
        >
          <div className="flex flex-col gap-2">
            <div
              className="flex size-11 shrink-0 items-center justify-center rounded-full border border-gray-700 bg-gray-800"
              aria-hidden="true"
            >
              <UserRoundPlusIcon
                className="opacity-80 text-gray-300"
                size={16}
              />
            </div>
            <DialogHeader>
              <DialogTitle className="text-left text-gray-100">
                {/* Add Staff Member */}
                {t("templatesection.addCollaborator.dialogTitle")}
              </DialogTitle>
              <DialogDescription className="text-left text-gray-400">
                {/* Enter the details below to add a new staff member to the event
                management team. */}
                {t("templatesection.addCollaborator.dialogDescription")}
              </DialogDescription>
            </DialogHeader>
          </div>

          <form className="space-y-5">
            <div className="space-y-4">
              <div className="*:not-first:mt-2">
                <Label className="text-gray-200">{t("templatesection.addCollaborator.inviteLabel")}</Label>
                <div className="space-y-3">
                  {invitData.map((item, index) => (
                    <div
                      className="flex justify-between items-center gap-1"
                      key={index}
                    >
                      {index >= 1 ? (
                        <>
                          <RiCloseLargeLine
                            onClick={() => {
                              subInputs(index);
                            }}
                            className=" absolute cursor-pointer -left-0 w-6"
                          />
                        </>
                      ) : (
                        <></>
                      )}
                      <Input
                        id={`team-email-${index + 1}`}
                        placeholder="hi@yourcompany.com"
                        required
                        type="email"
                        value={item.email}
                        onChange={(e) => {
                          setInviteData((prev) => {
                            const updated = [...prev];
                            updated[index] = {
                              ...updated[index],
                              email: e.target.value,
                            };
                            return updated;
                          });
                        }}
                        ref={
                          index === emails.length - 1 ? lastInputRef : undefined
                        }
                        className="bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500 focus:border-gray-600 focus:ring-gray-600"
                      />
                      <Select index={index} setInviteData={setInviteData} />
                    </div>
                  ))}
                </div>
              </div>
              <button
                type="button"
                onClick={addEmail}
                className="text-sm underline hover:no-underline text-blue-400 cursor-pointer hover:text-blue-300"
              >
                {/* + Add another */}
                {t("templatesection.addCollaborator.addAnother")}
              </button>
            </div>
            <Button
              disabled={!senddata() || loding}
              onClick={handelAddInvitemember}
              type="button"
              className="w-full bg-blue-600 cursor-pointer hover:bg-blue-700 text-white"
            >
              {loding
                ? t("templatesection.addCollaborator.sending")
                : t("templatesection.addCollaborator.sendInvites")}
            </Button>
          </form>

          <hr className="my-1 border-t border-gray-700" />
        </DialogContent>
      </Dialog>
    </div>
  );
}

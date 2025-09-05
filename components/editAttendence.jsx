"use client";
import { IoMdPersonAdd } from "react-icons/io";
import { use, useRef, useState } from "react";
import { UserRoundPlusIcon } from "lucide-react";
import { FaUserEdit } from "react-icons/fa";
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

import axios from "axios";
import { useReloadTemplate } from "@/app/(dashboard)/context/reloadTempleat";
import { useParams } from "next/navigation";

export default function EditAttendees({
  idAttendees,
  name,
  email,
  phoneNumber,
  isSend
}) {
  const { id } = useParams();
  const { addItem, setAddItem } = useReloadTemplate();
  const { setReload } = useReloadTemplate();
  const [open, setOpen] = useState(false);

  
  const [personInfo, setPersonInfo] = useState({
    id: idAttendees,
    name: name || "",
    email: email || "",
    phoneNumber: phoneNumber || "",
    chechkedIn: false,
    customId: "",
    category: "General",
    invitationStatus: isSend,
  });

  const [loding, setloding] = useState(false);

  const lastInputRef = useRef(null);

  //   const senddata = () => {
  //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  //     const phoneRegex = /^0\d{10}$/;

  //     const isValid =
  //       emailRegex.test(personInfo.email.trim()) &&
  //       phoneRegex.test(personInfo.phoneNumber.trim())
  //     //   personInfo.name.trim() !== "";

  //     return isValid;
  //   };

  const handelAddInvitemember = async () => {
    setloding(true);
    const baseApiUrl = "https://mk25szk5-7093.inc1.devtunnels.ms";

    try {
      const respons = await axios.put(
        `${baseApiUrl}/api/event/${id}/edit-attendee`,
        [personInfo]
      );

      console.log(respons.data);
      setAddItem(true);
      setOpen(false);
      setReload(true);
      setPersonInfo({
        idAttendees: "",
        email: "",
        phoneNumber: "",
        name: "",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setloding(false);
      setPersonInfo({
        idAttendees: "",
        email: "",
        phoneNumber: "",
        name: "",
      });
      setOpen(false);
    }
  };

  return (
    <div className="dark">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          className="bg-transparent w-full flex items-start"
          asChild
        >
          <Button
            variant="outline"
            className="!bg-gray-800 !border-[1px] !flex !items-center !justify-center !border-gray-700 !cursor-pointer !hover:text-gray-100 !text-gray-100 !hover:bg-gray-700"
          >
            <div className="flex justify-center items-center w-full gap-2">
              <FaUserEdit className="ml-3 text-[#fff] block" />
              <span className="block">Edit</span>
            </div>
          </Button>
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
                Invite team members
              </DialogTitle>
              <DialogDescription className="text-left text-gray-400">
                Invite teammates to earn free components.
              </DialogDescription>
            </DialogHeader>
          </div>

          <form className="space-y-5">
            <div className="space-y-4">
              <div className="*:not-first:mt-2">
                <Label className="text-gray-200">Invite via email</Label>
                <div className="space-y-3">
                  <div className="flex justify-between items-center gap-1">
                    <Input
                      id={`nameww`}
                      placeholder="person name"
                      required
                      type="text"
                      value={personInfo.name}
                      onChange={(e) => {
                        setPersonInfo({ ...personInfo, name: e.target.value });
                      }}
                      className="bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500 focus:border-gray-600 focus:ring-gray-600"
                    />
                  </div>

                  <div className="flex justify-between items-center gap-1">
                    <Input
                      id={`team-emailww`}
                      placeholder="hi@yourcompany.com"
                      required
                      type="email"
                      value={personInfo.email}
                      onChange={(e) => {
                        setPersonInfo({ ...personInfo, email: e.target.value });
                      }}
                      className="bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500 focus:border-gray-600 focus:ring-gray-600"
                    />
                  </div>
                  <div className="flex justify-between items-center gap-1">
                    <Input
                      id={`phoneNumberww`}
                      placeholder="phone number"
                      required
                      type="text"
                      value={personInfo.phoneNumber}
                      onChange={(e) => {
                        setPersonInfo({
                          ...personInfo,
                          phoneNumber: e.target.value,
                        });
                      }}
                      className="bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500 focus:border-gray-600 focus:ring-gray-600"
                    />
                  </div>
                </div>
              </div>
            </div>
            <Button
              disabled={loding}
              onClick={handelAddInvitemember}
              type="button"
              className="w-full bg-blue-600 cursor-pointer hover:bg-blue-700 text-white"
            >
              {loding ? "Sending..." : "Send invites"}
            </Button>
          </form>

          <hr className="my-1 border-t border-gray-700" />
        </DialogContent>
      </Dialog>
    </div>
  );
}

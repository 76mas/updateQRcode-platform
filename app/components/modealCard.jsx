"use client";

import { FaEdit } from "react-icons/fa";
import { MdDeleteForever, MdOutlineLogout } from "react-icons/md";
import { MoreHorizontal, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
import Addcollaborator from "@/components/addcollaborator";
import { useReloadTemplate } from "../(dashboard)/context/reloadTempleat";

import { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

// ✅ مكون الحذف
function DeleteAlert({ id }) {
  const [loding, setloding] = useState(false);
  const [open, setOpen] = useState(false);
  const { setReload } = useReloadTemplate();
  const { t } = useTranslation();

  const handleDelete = async () => {
    setloding(true);
    try {
      await axios.delete(
        `https://qrplatform-api.onrender.com/api/event/delete?id=${encodeURIComponent(
          id
        )}`
      );
      setReload(true);
      setOpen(false);
      setloding(false);
    } catch (error) {
      console.error("error in delete", error);
      setloding(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem
          className="text-red-400 focus:text-red-300 flex justify-between focus:bg-red-500/20 hover:bg-red-500/10 cursor-pointer"
          onSelect={(e) => e.preventDefault()}
        >
          <span>{t("templatesection.action.delete")}</span>
          <MdDeleteForever className="text-lg" />
        </DropdownMenuItem>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-gray-950 border-gray-800 text-gray-100">
        <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
          <div
            className="flex size-9 shrink-0 items-center justify-center rounded-full border"
            style={{ backgroundColor: "#2F5BB8", borderColor: "#2F5BB8" }}
            aria-hidden="true"
          >
            <AlertCircle className="text-white opacity-90" size={16} />
          </div>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-100">
              {t("templatesection.alert.DeleteTitle")}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              {t("templatesection.alert.DeleteDescription")}
            </AlertDialogDescription>
          </AlertDialogHeader>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-gray-900 cursor-pointer border-gray-700 text-gray-200 hover:bg-gray-800 hover:text-gray-100">
            {t("templatesection.alert.Cancel")}
          </AlertDialogCancel>
          <AlertDialogAction
            className="text-white cursor-pointer hover:opacity-90"
            style={{ backgroundColor: "#2F5BB8" }}
            onClick={handleDelete}
            disabled={loding}
          >
            {loding
              ? t("templatesection.alert.Deleting")
              : t("templatesection.action.delete")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// ✅ مكون المغادرة
function LeaveTemplate({ id }) {
  const [loding, setloding] = useState(false);
  const [open, setOpen] = useState(false);
  const { setReload } = useReloadTemplate();
  const { t } = useTranslation();

  const handleLeave = async () => {
    setloding(true);
    try {
      await axios.post(
        `https://qrplatform-api.onrender.com/api/event/${id}/leave`
      );
      setReload(true);
      setOpen(false);
      setloding(false);
    } catch (error) {
      console.error("error in leave", error);
      setloding(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem 
          className="text-red-200 focus:bg-gray-800 w-full flex justify-between items-center px-2 hover:bg-gray-800 focus:text-gray-100 cursor-pointer"
          onSelect={(e) => e.preventDefault()}
        >
          <span className="block p-0">{t("templatesection.action.leave")}</span>
          <MdOutlineLogout className="text-lg p-0" />
        </DropdownMenuItem>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-gray-950 border-gray-800 text-gray-100">
        <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
          <div
            className="flex size-9 shrink-0 items-center justify-center rounded-full border"
            style={{ backgroundColor: "#2F5BB8", borderColor: "#2F5BB8" }}
            aria-hidden="true"
          >
            <AlertCircle className="text-white opacity-90" size={16} />
          </div>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-100">
              {t("templatesection.alert.LeaveTitle")}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              {t("templatesection.alert.LeaveDescription")}
            </AlertDialogDescription>
          </AlertDialogHeader>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-gray-900 cursor-pointer border-gray-700 text-gray-200 hover:bg-gray-800 hover:text-gray-100">
            {t("templatesection.alert.Cancel")}
          </AlertDialogCancel>
          <AlertDialogAction
            className="text-white cursor-pointer hover:opacity-90"
            style={{ backgroundColor: "#2F5BB8" }}
            onClick={handleLeave}
            disabled={loding}
          >
            {loding
              ? t("templatesection.alert.Leaving")
              : t("templatesection.action.leave")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// ✅ مكون الأكشنات الرئيسي
export default function Actions({ id, date, name, role }) {
  const { t } = useTranslation();

  return (
    <div className="dark">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex justify-end">
            <Button
              size="icon"
              variant="ghost"
              className="shadow-none mr-2 text-gray-500 hover:text-gray-200 cursor-pointer hover:bg-gray-800/50"
              aria-label="Actions"
            >
              <MoreHorizontal size={16} aria-hidden="true" />
            </Button>
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="bg-gray-900 border-gray-700 text-gray-100"
        >
          {(role === "Owner" || role === "Editor") && (
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="text-gray-200 w-full flex   items-center  py-1 rounded-[7px] px-2 hover:bg-gray-800 justify-between cursor-pointer">
                      <span>{t("templatesection.action.edit")}</span>
                      <FaEdit />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-950 border-gray-800 text-gray-100">
                    <DialogHeader>
                      <DialogTitle>
                        {t("templatesection.action.EditEvent")}
                      </DialogTitle>
                      <DialogDescription>
                        {t("templatesection.action.detailsbelow")}
                      </DialogDescription>
                    </DialogHeader>
                    <EditEventForm id={id} name={name} date={date} />
                  </DialogContent>
                </Dialog>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          )}

          <DropdownMenuSeparator className="bg-gray-700" />

          <LeaveTemplate id={id} />

          {role === "Owner" && (
            <>
              <DropdownMenuSeparator className="bg-gray-700" />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Addcollaborator id={id} />
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator className="bg-gray-700" />
              <DeleteAlert id={id} />
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

// ✅ مكون تعديل الحدث
function EditEventForm({ id, name, date }) {
  const { setReload } = useReloadTemplate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [nameState, setNameState] = useState(name);
  const [dateState, setDateState] = useState(date);

  const handleEditEvent = async () => {
    setLoading(true);
    try {
      await axios.put(
        `https://qrplatform-api.onrender.com/api/event/${id}/edit`,
        {
          eventName: nameState,
          date: dateState,
        }
      );
      setReload(true);
    } catch (error) {
      console.error("error in edit", error);
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 mt-4">
      <div className="space-y-2">
        <Label htmlFor="edit-name" className="text-gray-200">
          {t("templatesection.action.EventName")}
        </Label>
        <Input
          id="edit-name"
          type="text"
          value={nameState}
          placeholder={t("templatesection.action.EnterEventName")}
          className="bg-gray-900 border-gray-700 text-gray-200 placeholder-gray-500 focus:border-gray-600 focus:ring-gray-600"
          onChange={(e) => setNameState(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="edit-date" className="text-gray-200">
          {t("templatesection.action.EventDate")}
        </Label>
        <Input
          id="edit-date"
          type="date"
          className="bg-gray-900 border-gray-700 text-gray-200 focus:border-gray-600 focus:ring-gray-600"
          value={dateState}
          onChange={(e) => setDateState(e.target.value)}
        />
      </div>

      <Button
        type="button"
        className="w-full cursor-pointer text-white hover:opacity-90"
        style={{ backgroundColor: "#2F5BB8" }}
        onClick={handleEditEvent}
        disabled={loading}
      >
        {loading
          ? t("templatesection.action.updating")
          : t("templatesection.action.UpdateEvent")}
      </Button>
    </div>
  );
}

//{
// "use client";

// import { useState } from "react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";

// import { Button } from "@/components/ui/button";
// import { FaEdit } from "react-icons/fa";
// import { MdDeleteForever } from "react-icons/md";
// import { IoIosPeople } from "react-icons/io";
// import { LogOut } from "lucide-react";
// import EditEventForm from "./EditEventForm";
// import { useTranslation } from "react-i18next";

// const TemplateSection = ({ id, name, date }) => {
//   const [editDialogOpen, setEditDialogOpen] = useState(false);
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [leaveDialogOpen, setLeaveDialogOpen] = useState(false);

//   const { t } = useTranslation();

//   return (
//     <div className="p-4 bg-gray-900 rounded-xl shadow-md flex justify-between items-center text-gray-100">
//       {/* عنوان الحدث */}
//       <div>
//         <h2 className="text-xl font-bold">{name}</h2>
//         <p className="text-sm text-gray-400">{date}</p>
//       </div>

//       {/* الأكشنات */}
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button variant="outline" className="text-gray-200">
//             {t("templatesection.manage")}
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent className="bg-gray-950 border border-gray-800 text-gray-200">
//           {/* تعديل */}
//           <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
//             <DropdownMenuItem asChild>
//               <DialogTrigger asChild>
//                 <div className="flex justify-between w-full cursor-pointer">
//                   <span>{t("templatesection.action.edit")}</span>
//                   <FaEdit />
//                 </div>
//               </DialogTrigger>
//             </DropdownMenuItem>
//             <DialogContent className="bg-gray-950 border-gray-800 text-gray-100">
//               <DialogHeader>
//                 <DialogTitle>
//                   {t("templatesection.action.EditEvent")}
//                 </DialogTitle>
//                 <DialogDescription>
//                   {t("templatesection.action.detailsbelow.")}
//                 </DialogDescription>
//               </DialogHeader>
//               <EditEventForm
//                 id={id}
//                 name={name}
//                 date={date}
//                 onClose={() => setEditDialogOpen(false)}
//               />
//             </DialogContent>
//           </Dialog>

//           {/* حذف */}
//           <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
//             <DropdownMenuItem asChild>
//               <AlertDialogAction asChild>
//                 <div className="flex justify-between w-full cursor-pointer text-red-500">
//                   <span>{t("templatesection.action.delete")}</span>
//                   <MdDeleteForever />
//                 </div>
//               </AlertDialogAction>
//             </DropdownMenuItem>
//             <AlertDialogContent className="bg-gray-950 border-gray-800 text-gray-100">
//               <AlertDialogHeader>
//                 <AlertDialogTitle>
//                   {t("templatesection.action.Areyousure?")}
//                 </AlertDialogTitle>
//                 <AlertDialogDescription>
//                   {t("templatesection.action.deleteyourEvent?")}
//                 </AlertDialogDescription>
//               </AlertDialogHeader>
//               <AlertDialogFooter>
//                 <AlertDialogCancel>
//                   {t("templatesection.action.cancel")}
//                 </AlertDialogCancel>
//                 <AlertDialogAction className="bg-red-600 text-white hover:bg-red-700">
//                   {t("templatesection.action.deleting")}
//                 </AlertDialogAction>
//               </AlertDialogFooter>
//             </AlertDialogContent>
//           </AlertDialog>

//           {/* دعوة عضو */}
//           <DropdownMenuItem className="flex justify-between cursor-pointer">
//             <span>{t("templatesection.action.invite")}</span>
//             <IoIosPeople />
//           </DropdownMenuItem>

//           {/* مغادرة */}
//           <AlertDialog open={leaveDialogOpen} onOpenChange={setLeaveDialogOpen}>
//             <DropdownMenuItem asChild>
//               <AlertDialogAction asChild>
//                 <div className="flex justify-between w-full cursor-pointer text-yellow-500">
//                   <span>{t("templatesection.action.leave")}</span>
//                   <LogOut />
//                 </div>
//               </AlertDialogAction>
//             </DropdownMenuItem>
//             <AlertDialogContent className="bg-gray-950 border-gray-800 text-gray-100">
//               <AlertDialogHeader>
//                 <AlertDialogTitle>
//                   {t("templatesection.action.Areyousure?")}
//                 </AlertDialogTitle>
//                 <AlertDialogDescription>
//                   {t("templatesection.action.LeaveyourEvent?")}
//                 </AlertDialogDescription>
//               </AlertDialogHeader>
//               <AlertDialogFooter>
//                 <AlertDialogCancel>
//                   {t("templatesection.action.cancel")}
//                 </AlertDialogCancel>
//                 <AlertDialogAction className="bg-yellow-600 text-white hover:bg-yellow-700">
//                   {t("templatesection.action.leaving")}
//                 </AlertDialogAction>
//               </AlertDialogFooter>
//             </AlertDialogContent>
//           </AlertDialog>
//         </DropdownMenuContent>
//       </DropdownMenu>
//     </div>
//   );
// };

// export default TemplateSection;

// "use client";

// import { FaEdit } from "react-icons/fa";
// import { MdDeleteForever, MdOutlineLogout } from "react-icons/md";
// import { MoreHorizontal, AlertCircle } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";

// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";

// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import Addcollaborator from "@/components/addcollaborator";
// import { useReloadTemplate } from "../(dashboard)/context/reloadTempleat";

// import { useState } from "react";
// import axios from "axios";
// import { useTranslation } from "react-i18next";

// // ✅ مكون الحذف
// function DeleteAlert({ id }) {
//   const [loding, setloding] = useState(false);
//   const [open, setOpen] = useState(false);
//   const { setReload } = useReloadTemplate();
//   const { t } = useTranslation();

//   const handleDelete = async () => {
//     setloding(true);
//     try {
//       await axios.delete(
//         `https://mk25szk5-7093.inc1.devtunnels.ms/api/event/delete?id=${encodeURIComponent(
//           id
//         )}`
//       );
//       setReload(true);
//       setOpen(false);
//       setloding(false);
//     } catch (error) {
//       console.error("error in delete", error);
//       setloding(false);
//     }
//   };

//   return (
//     <AlertDialog open={open} onOpenChange={setOpen}>
//       <AlertDialogTrigger asChild>
//         <DropdownMenuItem
//           className="text-red-400 focus:text-red-300 flex justify-between focus:bg-red-500/20 hover:bg-red-500/10 cursor-pointer"
//           onSelect={(e) => e.preventDefault()}
//         >
//           <span>{t("templatesection.action.Delete")}</span>
//           <MdDeleteForever className="text-lg" />
//         </DropdownMenuItem>
//       </AlertDialogTrigger>

//       <AlertDialogContent className="bg-gray-950 border-gray-800 text-gray-100">
//         <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
//           <div
//             className="flex size-9 shrink-0 items-center justify-center rounded-full border"
//             style={{ backgroundColor: "#2F5BB8", borderColor: "#2F5BB8" }}
//             aria-hidden="true"
//           >
//             <AlertCircle className="text-white opacity-90" size={16} />
//           </div>
//           <AlertDialogHeader>
//             <AlertDialogTitle className="text-gray-100">
//               {t("templatesection.alert.DeleteTitle")}
//             </AlertDialogTitle>
//             <AlertDialogDescription className="text-gray-400">
//               {t("templatesection.alert.DeleteDescription")}
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//         </div>
//         <AlertDialogFooter>
//           <AlertDialogCancel className="bg-gray-900 cursor-pointer border-gray-700 text-gray-200 hover:bg-gray-800 hover:text-gray-100">
//             {t("templatesection.alert.Cancel")}
//           </AlertDialogCancel>
//           <AlertDialogAction
//             className="text-white cursor-pointer hover:opacity-90"
//             style={{ backgroundColor: "#2F5BB8" }}
//             onClick={handleDelete}
//             disabled={loding}
//           >
//             {loding
//               ? t("templatesection.alert.Deleting")
//               : t("templatesection.action.Delete")}
//           </AlertDialogAction>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// }

// // ✅ مكون المغادرة
// function LeaveTemplate({ id }) {
//   const [loding, setloding] = useState(false);
//   const [open, setOpen] = useState(false);
//   const { setReload } = useReloadTemplate();
//   const { t } = useTranslation();

//   const handleLeave = async () => {
//     setloding(true);
//     try {
//       await axios.post(
//         `https://mk25szk5-7093.inc1.devtunnels.ms/api/event/${id}/leave`
//       );
//       setReload(true);
//       setOpen(false);
//       setloding(false);
//     } catch (error) {
//       console.error("error in leave", error);
//       setloding(false);
//     }
//   };

//   return (
//     <AlertDialog open={open} onOpenChange={setOpen}>
//       <AlertDialogTrigger asChild>
//         <DropdownMenuItem
//           className="text-red-200 focus:bg-gray-800 flex justify-between hover:bg-gray-800 focus:text-gray-100 cursor-pointer"
//           onSelect={(e) => e.preventDefault()}
//         >
//           <span>{t("templatesection.action.Leave")}</span>
//           <MdOutlineLogout className="text-lg" />
//         </DropdownMenuItem>
//       </AlertDialogTrigger>

//       <AlertDialogContent className="bg-gray-950 border-gray-800 text-gray-100">
//         <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
//           <div
//             className="flex size-9 shrink-0 items-center justify-center rounded-full border"
//             style={{ backgroundColor: "#2F5BB8", borderColor: "#2F5BB8" }}
//             aria-hidden="true"
//           >
//             <AlertCircle className="text-white opacity-90" size={16} />
//           </div>
//           <AlertDialogHeader>
//             <AlertDialogTitle className="text-gray-100">
//               {t("templatesection.alert.LeaveTitle")}
//             </AlertDialogTitle>
//             <AlertDialogDescription className="text-gray-400">
//               {t("templatesection.alert.LeaveDescription")}
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//         </div>
//         <AlertDialogFooter>
//           <AlertDialogCancel className="bg-gray-900 cursor-pointer border-gray-700 text-gray-200 hover:bg-gray-800 hover:text-gray-100">
//             {t("templatesection.alert.Cancel")}
//           </AlertDialogCancel>
//           <AlertDialogAction
//             className="text-white cursor-pointer hover:opacity-90"
//             style={{ backgroundColor: "#2F5BB8" }}
//             onClick={handleLeave}
//             disabled={loding}
//           >
//             {loding
//               ? t("templatesection.alert.Leaving")
//               : t("templatesection.action.Leave")}
//           </AlertDialogAction>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// }

// // ✅ مكون الأكشنات الرئيسي
// export default function Actions({ id, date, name, role }) {
//   const { t } = useTranslation();

//   return (
//     <div className="dark">
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <div className="flex justify-end">
//             <Button
//               size="icon"
//               variant="ghost"
//               className="shadow-none mr-2 text-gray-500 hover:text-gray-200 cursor-pointer hover:bg-gray-800/50"
//               aria-label="Actions"
//             >
//               <MoreHorizontal size={16} aria-hidden="true" />
//             </Button>
//           </div>
//         </DropdownMenuTrigger>

//         <DropdownMenuContent
//           align="end"
//           className="bg-gray-900 border-gray-700 text-gray-100"
//         >
//           {(role === "Owner" || role === "Editor") && (
//             <DropdownMenuGroup>
//               <DropdownMenuItem asChild>
//                 <Dialog>
//                   <DialogTrigger asChild>
//                     <div className="text-gray-200 flex justify-between cursor-pointer">
//                       <span>{t("templatesection.action.Edit")}</span>
//                       <FaEdit />
//                     </div>
//                   </DialogTrigger>
//                   <DialogContent className="bg-gray-950 border-gray-800 text-gray-100">
//                     <DialogHeader>
//                       <DialogTitle>
//                         {t("templatesection.dialog.EditTitle")}
//                       </DialogTitle>
//                       <DialogDescription>
//                         {t("templatesection.dialog.EditDescription")}
//                       </DialogDescription>
//                     </DialogHeader>
//                     <EditEventForm id={id} name={name} date={date} />
//                   </DialogContent>
//                 </Dialog>
//               </DropdownMenuItem>
//             </DropdownMenuGroup>
//           )}

//           <DropdownMenuSeparator className="bg-gray-700" />

//           <LeaveTemplate id={id} />

//           {role === "Owner" && (
//             <>
//               <DropdownMenuSeparator className="bg-gray-700" />
//               <DropdownMenuGroup>
//                 <DropdownMenuItem asChild>
//                   <Addcollaborator id={id} />
//                 </DropdownMenuItem>
//               </DropdownMenuGroup>
//               <DropdownMenuSeparator className="bg-gray-700" />
//               <DeleteAlert id={id} />
//             </>
//           )}
//         </DropdownMenuContent>
//       </DropdownMenu>
//     </div>
//   );
// }

// // ✅ مكون تعديل الحدث
// function EditEventForm({ id, name, date }) {
//   const { setReload } = useReloadTemplate();
//   const { t } = useTranslation();
//   const [loading, setLoading] = useState(false);
//   const [nameState, setNameState] = useState(name);
//   const [dateState, setDateState] = useState(date);

//   const handleEditEvent = async () => {
//     setLoading(true);
//     try {
//       await axios.put(
//         `https://mk25szk5-7093.inc1.devtunnels.ms/api/event/${id}/edit`,
//         {
//           eventName: nameState,
//           date: dateState,
//         }
//       );
//       setReload(true);
//     } catch (error) {
//       console.error("error in edit", error);
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="space-y-4 mt-4">
//       <div className="space-y-2">
//         <Label htmlFor="edit-name" className="text-gray-200">
//           {t("templatesection.form.EventName")}
//         </Label>
//         <Input
//           id="edit-name"
//           type="text"
//           value={nameState}
//           placeholder={t("templatesection.form.EnterEventName")}
//           className="bg-gray-900 border-gray-700 text-gray-200 placeholder-gray-500 focus:border-gray-600 focus:ring-gray-600"
//           onChange={(e) => setNameState(e.target.value)}
//         />
//       </div>

//       <div className="space-y-2">
//         <Label htmlFor="edit-date" className="text-gray-200">
//           {t("templatesection.form.EventDate")}
//         </Label>
//         <Input
//           id="edit-date"
//           type="date"
//           className="bg-gray-900 border-gray-700 text-gray-200 focus:border-gray-600 focus:ring-gray-600"
//           value={dateState}
//           onChange={(e) => setDateState(e.target.value)}
//         />
//       </div>

//       <Button
//         type="button"
//         className="w-full cursor-pointer text-white hover:opacity-90"
//         style={{ backgroundColor: "#2F5BB8" }}
//         onClick={handleEditEvent}
//         disabled={loading}
//       >
//         {loading
//           ? t("templatesection.form.Updating")
//           : t("templatesection.form.UpdateEvent")}
//       </Button>
//     </div>
//   );
// }

// "use client";
// import { FaEdit } from "react-icons/fa";
// import { MdDeleteForever, MdOutlineLogout } from "react-icons/md";

// import { MoreHorizontal } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { t } from "i18next";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// import { AlertCircle } from "lucide-react";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import { useEffect, useState } from "react";
// import axios from "axios";

// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import Addcollaborator from "@/components/addcollaborator";
// import { useReloadTemplate } from "../(dashboard)/context/reloadTempleat";

// function DeleteAlert({ id }) {
//   const [loding, setloding] = useState(false);
//   const [open, setOpen] = useState(false);
//   const { reload, setReload } = useReloadTemplate();

//   const handleDelete = async () => {
//     setloding(true);
//     try {
//       const response = await axios.delete(
//         `https://mk25szk5-7093.inc1.devtunnels.ms/api/event/delete?id=${encodeURIComponent(
//           id
//         )}`
//       );
//       console.log(response.data);
//       setReload(true);

//       setOpen(false);
//       setloding(false);
//     } catch (error) {
//       console.error("error in delete", error);
//       setloding(false);
//     }
//   };

//   return (
//     <AlertDialog open={open} onOpenChange={setOpen}>
//       <AlertDialogTrigger asChild>
//         <DropdownMenuItem
//           className="text-red-400 focus:text-red-300 felx justify-between focus:bg-red-500/20 hover:bg-red-500/10 cursor-pointer"
//           onSelect={(e) => e.preventDefault()}
//         >
//           <span>{t("templatesection.action.delete")}</span>
//           <MdDeleteForever className="text-lg" />
//         </DropdownMenuItem>
//       </AlertDialogTrigger>

//       <AlertDialogContent className="bg-gray-950 border-gray-800 text-gray-100">
//         <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
//           <div
//             className="flex size-9 shrink-0 items-center justify-center rounded-full border"
//             style={{ backgroundColor: "#2F5BB8", borderColor: "#2F5BB8" }}
//             aria-hidden="true"
//           >
//             <AlertCircle className="text-white opacity-90" size={16} />
//           </div>
//           <AlertDialogHeader>
//             <AlertDialogTitle className="text-gray-100">
//               {t("templatesection.action.Areyousure?")}
//             </AlertDialogTitle>
//             <AlertDialogDescription className="text-gray-400">
//               {t("templatesection.action.deleteyourEvent?")}
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//         </div>
//         <AlertDialogFooter>
//           <AlertDialogCancel className="bg-gray-900 cursor-pointer border-gray-700 text-gray-200 hover:bg-gray-800 hover:text-gray-100">
//             {t("templatesection.action.cancel")}
//           </AlertDialogCancel>
//           <AlertDialogAction
//             className="text-white cursor-pointer hover:opacity-90"
//             style={{ backgroundColor: "#2F5BB8" }}
//             onClick={handleDelete}
//             disabled={loding}
//           >
//             {loding
//               ? t("templatesection.action.deleting")
//               : t("templatesection.action.delete")}
//           </AlertDialogAction>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// }

// function LeaveTemplate({ id }) {
//   const [loding, setloding] = useState(false);
//   const [open, setOpen] = useState(false);
//   const { reload, setReload } = useReloadTemplate();

//   const handleLeave = async () => {
//     setloding(true);
//     try {
//       const response = await axios.post(
//         `https://mk25szk5-7093.inc1.devtunnels.ms/api/event/${id}/leave`
//       );

//       console.log(response.data);
//       setReload(true);
//       setOpen(false);
//       setloding(false);
//     } catch (error) {
//       console.error("error in delete", error);
//       setloding(false);
//     }
//   };

//   return (
//     <AlertDialog open={open} onOpenChange={setOpen}>
//       <AlertDialogTrigger asChild>
//         <DropdownMenuItem
//           className="text-red-200 focus:bg-gray-800 flex justify-between hover:bg-gray-800 focus:text-gray-100 cursor-pointer"
//           onSelect={(e) => e.preventDefault()}
//         >
//           <span>{t("templatesection.action.leave")}</span>

//           <MdOutlineLogout className="text-lg" />
//         </DropdownMenuItem>
//       </AlertDialogTrigger>

//       <AlertDialogContent className="bg-gray-950 border-gray-800 text-gray-100">
//         <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
//           <div
//             className="flex size-9 shrink-0 items-center justify-center rounded-full border"
//             style={{ backgroundColor: "#2F5BB8", borderColor: "#2F5BB8" }}
//             aria-hidden="true"
//           >
//             <AlertCircle className="text-white opacity-90" size={16} />
//           </div>
//           <AlertDialogHeader>
//             <AlertDialogTitle className="text-gray-100">
//               {t("templatesection.action.Areyousure?")}
//             </AlertDialogTitle>
//             <AlertDialogDescription className="text-gray-400">
//               {t("templatesection.action.LeaveyourEvent?")}
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//         </div>
//         <AlertDialogFooter>
//           <AlertDialogCancel className="bg-gray-900 cursor-pointer border-gray-700 text-gray-200 hover:bg-gray-800 hover:text-gray-100">
//             {t("templatesection.action.cancel")}
//           </AlertDialogCancel>
//           <AlertDialogAction
//             className="text-white cursor-pointer hover:opacity-90"
//             style={{ backgroundColor: "#2F5BB8" }}
//             onClick={handleLeave}
//             disabled={loding}
//           >
//             {loding
//               ? t("templatesection.action.leaving")
//               : t("templatesection.action.leave")}
//           </AlertDialogAction>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// }

// export default function Actions({ id, date, name, role }) {
//   const [editDialogOpen, setEditDialogOpen] = useState(false);

//   const handleEditClick = () => {
//     setEditDialogOpen(true);
//   };

//   return (
//     <div className="dark">
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <div className="flex justify-end">
//             <Button
//               size="icon"
//               variant="ghost"
//               className="shadow-none mr-2 text-gray-500 hover:text-gray-200 cursor-pointer hover:bg-gray-800/50"
//               aria-label="Edit item"
//             >
//               <MoreHorizontal size={16} aria-hidden="true" />
//             </Button>
//           </div>
//         </DropdownMenuTrigger>

//         <DropdownMenuContent
//           align="end"
//           className="bg-gray-900 border-gray-700 text-gray-100"
//         >
//           {role === "Owner" ? (
//             <>
//               <DropdownMenuGroup>
//                 <DropdownMenuItem
//                   className="text-gray-200 focus:bg-gray-800 flex justify-between hover:bg-gray-800 focus:text-gray-100 cursor-pointer"
//                   onClick={handleEditClick}
//                 >
//                   <span>{t("templatesection.action.edit")}</span>
//                   <FaEdit />
//                 </DropdownMenuItem>
//               </DropdownMenuGroup>

//               <DropdownMenuSeparator className="bg-gray-700" />
//               <LeaveTemplate id={id} />

//               <DropdownMenuSeparator className="bg-gray-700" />

//               <DropdownMenuGroup>
//                 {/* <DropdownMenuItem
//                   className="text-gray-200 focus:bg-gray-80 w-full  hover:bg-gray-800 focus:text-gray-100 p-0"
//                   onSelect={(e) => e.preventDefault()}
//                 > */}
//                 <Addcollaborator id={id} />
//                 {/* </DropdownMenuItem> */}
//               </DropdownMenuGroup>

//               <DropdownMenuSeparator className="bg-gray-700" />
//               <DeleteAlert id={id} />
//             </>
//           ) : role === "Editor" ? (
//             <>
//               <DropdownMenuGroup>
//                 <DropdownMenuItem
//                   className="text-gray-200 focus:bg-gray-800 flex justify-between hover:bg-gray-800 focus:text-gray-100 cursor-pointer"
//                   onClick={handleEditClick}
//                 >
//                   <span>{t("templatesection.action.edit")}</span>
//                   <FaEdit />
//                 </DropdownMenuItem>
//               </DropdownMenuGroup>

//               <DropdownMenuSeparator className="bg-gray-700" />
//               <LeaveTemplate id={id} />
//             </>
//           ) : (
//             <>
//               {" "}
//               <LeaveTemplate id={id} />
//             </>
//           )}
//         </DropdownMenuContent>
//       </DropdownMenu>

//       <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
//         <DialogContent className="bg-gray-950 border-gray-800 text-gray-100">
//           <DialogHeader>
//             <DialogTitle className="text-left text-gray-100">
//               {t("templatesection.action.EditEvent")}
//             </DialogTitle>
//             <DialogDescription className="text-left text-gray-400">
//               {t("templatesection.action.detailsbelow")}
//             </DialogDescription>
//           </DialogHeader>
//           <EditEventForm
//             id={id}
//             name={name}
//             date={date}
//             onClose={() => setEditDialogOpen(false)}
//           />
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

// function EditEventForm({ id, name, date, onClose }) {
//   const { reload, setReload } = useReloadTemplate();
//   const [loading, setLoading] = useState(false);
//   const [nameState, setNameState] = useState(name);
//   const [dateState, setDateState] = useState(date);

//   const handleEditEvent = async () => {
//     setLoading(true);

//     console.log({ id, nameState, dateState });

//     try {
//       const response = await axios.put(
//         `https://mk25szk5-7093.inc1.devtunnels.ms/api/event/${id}/edit`,
//         {
//           eventName: nameState,
//           date: dateState,
//         }
//       );

//       onClose();
//       document.body.click();
//       setReload(true);
//     } catch (error) {
//       console.error("error in edit", error);
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="space-y-4 mt-4">
//       {/* Name Event */}
//       <div className="space-y-2">
//         <Label htmlFor="edit-name" className="text-gray-200">
//           {t("templatesection.action.EventName")}
//         </Label>
//         <Input
//           id="edit-name"
//           type="text"
//           value={nameState}
//           placeholder="Enter event name"
//           className="bg-gray-900 border-gray-700 text-gray-200 placeholder-gray-500 focus:border-gray-600 focus:ring-gray-600"
//           onChange={(e) => setNameState(e.target.value)}
//         />
//       </div>

//       {/* Date Event */}
//       <div className="space-y-2">
//         <Label htmlFor="edit-date" className="text-gray-200">
//           {t("templatesection.action.EventDate")}
//         </Label>
//         <Input
//           id="edit-date"
//           type="date"
//           className="bg-gray-900 border-gray-700 text-gray-200 focus:border-gray-600 focus:ring-gray-600"
//           value={dateState}
//           onChange={(e) => setDateState(e.target.value)}
//         />
//       </div>

//       {/* Update Button */}
//       <Button
//         type="button"
//         className="w-full cursor-pointer text-white hover:opacity-90"
//         style={{ backgroundColor: "#2F5BB8" }}
//         onClick={handleEditEvent}
//         disabled={loading}
//       >
//         {loading
//           ? t("templatesection.action.updating")
//           : t("templatesection.action.UpdateEvent")}
//       </Button>
//     </div>
//   );
// }

//}

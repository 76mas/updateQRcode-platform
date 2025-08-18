"use client"

import { useState } from "react";
import {Alert} from "@heroui/react";

export default function AlertErrorApi({massegae , isError ,setIsError}) {


  const title = "Error Notification";
  const description =massegae;

  return (
    <div className=" fixed bottom-10 left-1 z-50  flex flex-col gap-4 p-4">
  
        <Alert
         variant="flat"
          className="bg-red-600/20 text-white border rounded-2xl border-red-800"
          description={description}
          isVisible={isError}
          title={title}
          onClose={() => setIsError(false)}
        />


    </div>
  );
}

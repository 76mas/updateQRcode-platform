"use client";

import Component from "@/components/StepWorke";
import { useEffect, useState } from "react";
import axios from "axios";
import { useEvent } from "../context/StepsInfo";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import ErrorLginAlert from "@/components/ErrorLogin";
import AlertErrorApi from "@/app/components/ErrorApi";

export default function WorkeSpace() {
  const [sendData, setSenddata] = useState(false);
  const [isError, setIsError] = useState(false);
  const [massegae, setMassegae] = useState("");
  const navigator = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const {
    eventName,
    excelData,
    designImage,
    boxes,
    eventDate,
    fontColor,
    fontName,
  } = useEvent();

  useEffect(() => {
    if (!sendData) return;

    const sendForm = async () => {
      if (isLoading) return;
      setIsLoading(true);

      const currentUser = auth.currentUser;

      if (!currentUser) {
        alert("You must be logged in to create an event.");
        setSenddata(false);
        setIsLoading(false);
        return;
      }

      const idToken = await currentUser.getIdToken();
      const formData = new FormData();
      const eventDetails = {
        name: eventName,
        eventDate: eventDate,
        Location: null,
      };

      const templateElementsWithColor = boxes.map((box) => {
        if (box.type === "Name") {
          return { ...box, fontColor: fontColor, fontTheme: fontName };
        }
        return box;
      });

      formData.append("eventInfo", JSON.stringify(eventDetails));
      formData.append(
        "templateInfo",
        JSON.stringify(templateElementsWithColor)
      );
      formData.append("attendeeFile", excelData);
      if (designImage instanceof File) {
        formData.append("backgroundImage", designImage);
      }

      console.log("Sending data to the backend...");
      const baseApiUrl = "https://mk25szk5-7093.inc1.devtunnels.ms";

      try {
        const response = await axios.post(
          `${baseApiUrl}/api/event/create`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 202) {
          const newEvent = response.data;
          const eventId = newEvent.id;

          alert(
            `Event created successfully! Generating invitations in the background...`
          );

          const pollForZipFile = (id) => {
            const intervalId = setInterval(async () => {
              try {
                console.log(`Polling for event ${id}...`);
                const pollResponse = await axios.get(
                  `${baseApiUrl}/api/event/${id}/download`
                );

                if (pollResponse.status === 200) {
                  clearInterval(intervalId);
                  console.log("File is ready! Downloading...");

                  const downloadUrl = `${baseApiUrl}${pollResponse.data}`;
                  const link = document.createElement("a");
                  link.href = downloadUrl;
                  link.download = "invitations.zip";
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  navigator.push("/templates");
                }
              } catch (error) {
                console.error("Polling error:", error);
                alert("An error occurred while checking for your file.");
                clearInterval(intervalId);
              }
            }, 10000);
          };

          pollForZipFile(eventId);
        }
      } catch (error) {
        console.error("API Error:", error);

        setIsError(true);
        setMassegae(error.response.data.detail);
        if (error.status === 403) {
          navigator.push("/#contact");
        }
      } finally {
        setIsLoading(false);
        setSenddata(false);
      }
    };

    sendForm();
  }, [sendData]);

  const [alrtLogin, setAlertLogin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setAlertLogin(false);
      } else {
        setAlertLogin(true);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col min-w-full min-h-screen">
      {alrtLogin ? (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px]">
          <ErrorLginAlert typeError={"you must login"} />
        </div>
      ) : (
        <>
          <AlertErrorApi
            isError={isError}
            massegae={massegae}
            setIsError={setIsError}
          />
          <Component setSenddata={setSenddata} isLoading={isLoading} />
        </>
      )}
    </div>
  );
}

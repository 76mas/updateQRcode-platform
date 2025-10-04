"use client";
// import t from "i18next";
import React, { useRef, useEffect, useState, use } from "react";
import { FaCamera, FaPlayCircle, FaStopCircle } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { MdMarkEmailRead } from "react-icons/md";
import axios from "axios";
import Webcam from "react-webcam";
import jsQR from "jsqr";
import { useParams } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebase/config";
import ErrorLginAlert from "@/components/ErrorLogin";
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";

function QRScanner() {
  const { t } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage("ar");
  }, [i18n]);

  const { id: eventId } = useParams();
  const baseApiUrl = "https://qrplatform-api.onrender.com";

  const webcamRef = useRef(null);
  const [email, setEmail] = useState("");
  const [result, setResult] = useState("");
  const [count, setCount] = useState(0);
  const [scanned, setScanned] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);
  const [loading, setLoading] = useState(false);
  const intervalRef = useRef(null);

  const captureAndScan = () => {
    if (!webcamRef.current || loading || !cameraOn) return;
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;

    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);

      if (code && code.data && !scanned) {
        setScanned(true);
        setEmail(code.data);
        checkIn(code.data).finally(() => {
          setTimeout(() => {
            setScanned(false);
            setEmail("");
            setResult("");
          }, 3000);
        });
      }
    };
  };

  const checkIn = async (scannedEmail) => {
    setLoading(true);

    try {
      const res = await axios.post(
        `${baseApiUrl}/api/event/${eventId}/check-in`,
        { email: scannedEmail },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = res.data;
      if (data.status === "Success") {
        setResult(`${t("webacm.attendanceRecorded")} ${data.attendeeName}`);
        setCount(data.checkedInCount);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        if (errorData.status === "AlreadyCheckedIn") {
          setResult(
            `${t("webacm.alreadyCheckedIn")}  ${errorData.attendeeName}`
          );
          setCount(errorData.checkedInCount);
        } else if (errorData.status === "NotFound") {
          setResult(t("webacm.notFound"));
        } else {
          setResult(t("webacm.unknownError"));
        }
      } else {
        setResult(t("webacm.cannotConnect"));
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchCount = async () => {
    try {
      const res = await axios.get(`${baseApiUrl}/api/event/${eventId}/count`);

      if (res.data && res.data.checkedInCount !== undefined) {
        setCount(res.data.checkedInCount);
      }
    } catch (err) {
      console.error("Error fetching attendance count:", err);
    }
  };

  useEffect(() => {
    fetchCount();

    const pollInterval = setInterval(fetchCount, 2000);

    return () => {
      clearInterval(pollInterval);
    };
  }, []);

  useEffect(() => {
    if (cameraOn) {
      intervalRef.current = setInterval(captureAndScan, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [cameraOn]);

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
    <div className="min-h-screen py-10 px-4 flex flex-col items-center justify-center gap-4">
      {alrtLogin ? (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px]">
          <ErrorLginAlert typeError={t("webcam.mustLogin")} />
        </div>
      ) : (
        <>
          {" "}
          <div
            className={`w-full max-w-3xl relative bg-white/5 rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[7.3px] border border-white/20 transition-all duration-500 overflow-hidden ${
              cameraOn ? "min-h-[850px]" : "min-h-[500px]"
            } p-6 justify-center items-center space-y-6`}
          >
            <h1 className="text-2xl w-full flex-col justify-center font-bold flex items-center gap-2 text-[#fff]">
              <FaCamera /> <span>{t("webacm.readQR")}</span>
            </h1>

            <div className="flex justify-center">
              <button
                onClick={() => {
                  setCameraOn(!cameraOn);
                }}
                disabled={loading}
                className={`px-5 py-2 cursor-pointer rounded-lg font-medium text-white flex items-center gap-2 transition ${
                  cameraOn
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {cameraOn ? <FaStopCircle /> : <FaPlayCircle />}
                {cameraOn
                  ? t("webacm.turnOffCamera")
                  : t("webacm.turnOnCamera")}
              </button>
            </div>

            {cameraOn && (
              <div className="relative border rounded-md overflow-hidden">
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/png"
                  videoConstraints={{ facingMode: "environment" }}
                  className="w-full min-h-[100px] max-h-[350px] object-cover"
                />
              </div>
            )}

            <div className="space-y-4 flex flex-col ">
              <div className="flex w-full items-center justify-center gap-2 text-gray-400">
                <MdMarkEmailRead className="text-indigo-500 text-xl" />
                <span className="font-medium">{t("webacm.scannedEmail")}</span>
                <span className="text-sm">
                  {email || t("webacm.notScannedYet")}
                </span>
              </div>

              {loading && (
                <div className="flex items-center justify-center gap-2 text-sm text-blue-400">
                  <span className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></span>
                  {t("webacm.verifying")}
                </div>
              )}

              {result && (
                <div
                  className={`px-4 py-2 rounded-md text-sm text-center ${
                    result.includes("✅")
                      ? "bg-green-100 text-green-800"
                      : result.includes("�")
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {result}
                </div>
              )}

              <div className="flex items-center gap-3 bg-[#ffffff1a] flex-col justify-center p-3 rounded-lg shadow-sm">
                <IoIosPeople className="text-2xl text-white" />
                <div className="flex flex-col justify-center items-center">
                  <div className="text-5xl font-bold text-white">{count}</div>
                  <div className="text-sm text-gray-400">
                    {t("webacm.registeredAttendees")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default QRScanner;

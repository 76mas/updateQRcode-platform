"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../context/authLogin";
import axios from "axios";

import NavBar from "@/app/components/templateNav";
import WaveCard from "@/app/components/EventCard";
import TextType from "@/app/components/emptyTemplate";
import { LoaderOne } from "@/components/loding";
import { useReloadTemplate } from "../context/reloadTempleat";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebase/config";
import ErrorLginAlert from "@/components/ErrorLogin";
const baseApiUrl = "https://qrplatform-api.onrender.com";

import { useTranslation } from "react-i18next";
import i18n from "../i18n";

export default function TemplatesPage() {
  const { reload, setReload } = useReloadTemplate();
  const [template, setTemplate] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isSyncedWithBackend } = useAuth();
  const { t } = useTranslation();

  // useEffect(() => {
  //   i18n.changeLanguage("ar");
  // }, [i18n]);

  useEffect(() => {
    if (!isSyncedWithBackend) return;

    const fetchTemplates = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${baseApiUrl}/api/event/all`);
        setTemplate(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("❌ Fetch templates failed", error);
      } finally {
        setLoading(false);
        setReload(false);
      }
    };

    fetchTemplates();
    i18n.changeLanguage("en");
  }, [isSyncedWithBackend, reload]);

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
    <div className="flex flex-wrap justify-center gap-6 p-6 b min-h-screen">
      {alrtLogin ? (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px]">
          <ErrorLginAlert typeError={"you must login"} />
        </div>
      ) : (
        <>
          {" "}
          <NavBar />
          <div className="w-full max-w-7xl mx-auto px-4 mt-[100px]">
            {loading ? (
              <div className="flex w-full h-full justify-center items-center">
                <LoaderOne />
              </div>
            ) : (
              <>
                {template.length === 0 ? (
                  <>
                    <div className="flex w-full  justify-center items-center h-full ">
                      <TextType
                        text={[
                          "you dont have any Template yet",
                          "Create New Template",
                          "Click Create Teamplate",
                        ]}
                        typingSpeed={75}
                        pauseDuration={1500}
                        showCursor={true}
                        cursorCharacter="_"
                        className="lg:text-[30px] md:text-[28px] text-[20px] mb-[100px] text-shadow-2xl p-3"
                      />
                    </div>
                  </>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
                    {template.map((item) => (
                      <WaveCard
                        key={item.id}
                        tags={`${item.attendeeCount} ${t(
                          "templatesection.person"
                        )}`}
                        title={item.name}
                        description={item.eventDate}
                        buttonText={t("templatesection.manage")}
                        imagurl={`${baseApiUrl}${item.backgroundImageUri}`}
                        href={`templates/${item.id}`}
                        id={item.id}
                        role={item.role}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

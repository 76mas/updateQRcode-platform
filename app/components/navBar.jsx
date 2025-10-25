"use client";
import Signup from "@/components/signup";
import { FaGlobe } from "react-icons/fa";
import Link from "next/link";
import { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import Login from "@/components/login";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import i18n from "@/app/(dashboard)/i18n";
import { useTranslation } from "react-i18next";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [language, setLanguage] = useState("en");
  useEffect(() => {
    setLanguage(localStorage?.getItem("language") || "en");
    localStorage.setItem("language", language);
  }, []);

  const [checkingVerification, setCheckingVerification] = useState(false);

  const { t } = useTranslation();

  const languages = [
    { value: "en", label: "En" },
    { value: "ar", label: "Ar" },
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser && firebaseUser.emailVerified) {
        setUser({
          name: firebaseUser.displayName,
          email: firebaseUser.email,
          photo: firebaseUser.photoURL,
        });

        const idToken = await firebaseUser.getIdToken();

        try {
          const response = await axios.post(
            "https://qrplatform-api.onrender.com/api/account/sync",
            {},
            {
              headers: {
                Authorization: `Bearer ${idToken}`,
              },
            }
          );

          const jwt = response.data.token;

          setToken(jwt);
          localStorage.setItem("my_token", jwt);
          setCheckingVerification(true);
        } catch (error) {
          setCheckingVerification(false);
          console.error("فشل مزامنة الحساب:", error);
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const checkEmailVerification = async () => {
    if (auth.currentUser) {
      await auth.currentUser.reload();
      if (auth.currentUser.emailVerified) {
        setUser({
          name: auth.currentUser.displayName,
          email: auth.currentUser.email,
          photo: auth.currentUser.photoURL,
        });
      }
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (auth.currentUser && !auth.currentUser.emailVerified) {
        checkEmailVerification();
      }
    }, 5000); // كل 5 ثواني

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Desktop NavBar */}
      <div
        dir={language === "ar" ? "rtl" : "ltr"}
        className="hidden md:flex h-[60px] w-[70%] max-w-[1200px] fixed top-6 z-50 left-1/2 -translate-x-1/2 
                      px-6 rounded-full border border-gray-500/30 bg-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[10px]
                      text-white items-center justify-between transition-all duration-300 hover:shadow-[0_8px_40px_rgba(0,0,0,0.15)]"
      >
        <div
          className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent 
                        hover:from-blue-400 hover:to-purple-400 transition-all duration-300 cursor-pointer"
        >
          LOGO
        </div>

        <div className="flex gap-6 text-sm font-medium">
          <a
            href="#home"
            className="cursor-pointer relative px-3 py-2 rounded-full transition-all duration-300 
                       hover:bg-white/10 hover:text-blue-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]
                       before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r 
                       before:from-blue-500/0 before:to-purple-500/0 hover:before:from-blue-500/20 
                       hover:before:to-purple-500/20 before:transition-all before:duration-300"
          >
            {t("nav.home")}
          </a>
          <a
            href="#questions"
            className="cursor-pointer relative px-3 py-2 rounded-full transition-all duration-300 
                       hover:bg-white/10 hover:text-blue-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]
                       before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r 
                       before:from-blue-500/0 before:to-purple-500/0 hover:before:from-blue-500/20 
                       hover:before:to-purple-500/20 before:transition-all before:duration-300"
          >
            {t("nav.about")}
          </a>
          <a
            href="#features"
            className="cursor-pointer relative px-3 py-2 rounded-full transition-all duration-300 
                       hover:bg-white/10 hover:text-blue-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]
                       before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r 
                       before:from-blue-500/0 before:to-purple-500/0 hover:before:from-blue-500/20 
                       hover:before:to-purple-500/20 before:transition-all before:duration-300"
          >
            {t("nav.features")}
          </a>
          <a
            href="#contact"
            className="cursor-pointer relative px-3 py-2 rounded-full transition-all duration-300 
                       hover:bg-white/10 hover:text-blue-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]
                       before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r 
                       before:from-blue-500/0 before:to-purple-500/0 hover:before:from-blue-500/20 
                       hover:before:to-purple-500/20 before:transition-all before:duration-300"
          >
            {t("nav.contact")}
          </a>

          {user ? (
            <Link
              href="/templates"
              className="cursor-pointer relative px-3 py-2 rounded-full transition-all duration-300 
                          bg-white/10 hover:text-purple-300 shadow-[0_0_15px_rgba(147,51,234,0.3)]
                          before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r 
                            before:from-purple-500/20 
                          before:to-pink-500/20 before:transition-all before:duration-300"
            >
              {t("nav.template")}
            </Link>
          ) : (
            <></>
          )}

          {/* هنا لبمفروض بعدين اتحقق من الصلاحية الحساب checkingVerification */}
          {user ? (
            <></>
          ) : (
            <div className="flex gap-1">
              {/* <div  
                    className="">
                      <Signup  />
                  </div> */}
              <div>
                <Login />
              </div>
            </div>
          )}

          <Select
            value={language}
            onValueChange={(value) => {
              setLanguage(value);
              localStorage.setItem("language", value);
              i18n.changeLanguage(value);
            }}
          >
            <SelectTrigger
              id={`language-`}
              className="[&>svg]:text-gray-400 cursor-pointer w-[80px] text-white h-8 border-none px-2 shadow-none  rounded-md"
              aria-label="Select language"
            >
              <FaGlobe size={16} aria-hidden="true" />
              <SelectValue className="hidden sm:inline-flex text-white" />
            </SelectTrigger>

            <SelectContent className="[&_*[role=option]]:ps-2 bg-[#1f1f1f80] [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2 rounded-md shadow-lg">
              {languages.map((lang) => (
                <SelectItem
                  className="cursor-pointer text-white hover:bg-white/10"
                  key={lang.value}
                  value={lang.value}
                >
                  <span className="flex items-center gap-2">
                    <span className="truncate">{lang.label}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Mobile NavBar */}
      <div className="md:hidden fixed top-4 left-4 right-4 z-50">
        <div
          className="flex h-[55px] px-4 rounded-2xl border border-gray-500/30 bg-white/5 
                        shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[10px] text-white 
                        items-center justify-between"
        >
          <div className="text-lg font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            LOGO
          </div>

          {/* Hamburger Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex flex-col gap-1 p-2 rounded-lg hover:bg-white/10 transition-all duration-300"
          >
            <div
              className={`w-5 h-0.5 bg-white transition-all duration-300 ${
                isOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            ></div>
            <div
              className={`w-5 h-0.5 bg-white transition-all duration-300 ${
                isOpen ? "opacity-0" : ""
              }`}
            ></div>
            <div
              className={`w-5 h-0.5 bg-white transition-all duration-300 ${
                isOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            ></div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`mt-2 rounded-2xl border border-gray-500/30 bg-white/5 
                        shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[10px] text-white
                        transition-all duration-300 overflow-hidden ${
                          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                        }`}
        >
          <div className="flex flex-col p-4 gap-3">
            <a
              href="#home"
              onClick={() => setIsOpen(false)}
              className="cursor-pointer px-4 py-3 rounded-xl transition-all duration-300 
                         hover:bg-white/10 hover:text-blue-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]
                         active:scale-95"
            >
              {t("nav.home")}
            </a>
            <a
              href="#questions"
              onClick={() => setIsOpen(false)}
              className="cursor-pointer px-4 py-3 rounded-xl transition-all duration-300 
                         hover:bg-white/10 hover:text-blue-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]
                         active:scale-95"
            >
              {t("nav.about")}
            </a>
            <a
              href="#features"
              onClick={() => setIsOpen(false)}
              className="cursor-pointer px-4 py-3 rounded-xl transition-all duration-300 
                         hover:bg-white/10 hover:text-blue-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]
                         active:scale-95"
            >
              {t("nav.features")}
            </a>
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="cursor-pointer px-4 py-3 rounded-xl transition-all duration-300 
                         hover:bg-white/10 hover:text-blue-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]
                         active:scale-95"
            >
              {t("nav.contact")}
            </a>
            {user ? (
              <Link
                href="/templates"
                className="cursor-pointer relative px-3 py-2 rounded-full transition-all duration-300 
                          bg-white/10 hover:text-purple-300 shadow-[0_0_15px_rgba(147,51,234,0.3)]
                          before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r 
                            before:from-purple-500/20 
                          before:to-pink-500/20 before:transition-all before:duration-300"
              >
                {t("nav.template")}
              </Link>
            ) : (
              <></>
            )}

            {user ? (
              <></>
            ) : (
              <>
                {/* <div  
                    className="">
                      <Signup  />
                  </div> */}

                <div>
                  <Login />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

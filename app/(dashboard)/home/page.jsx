"use client";
import NavBar from "@/app/components/navBar";
import Component from "@/components/questions";
import { FaAngleDown } from "react-icons/fa6";
import Link from "next/link";
import ShinyText from "@/app/components/TextHomePAge";
import { FaMagic, FaFileExcel, FaObjectGroup, FaQrcode } from "react-icons/fa";
import PixelTransition from "@/app/components/imagePixle";
import PricingCard from "@/app/components/PriceingCard";
import { useEffect, useState } from "react";
import { auth } from "@/app/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { ExplainSteps } from "@/components/explansteps";
import ErrorAlert from "@/components/ErrorAlert";
import ErrorLginAlert from "@/components/ErrorLogin";
import { useTranslation } from "react-i18next";
import i18n from "@/app/(dashboard)/i18n";
export default function Home() {
  const { t } = useTranslation();
  const [dir, setDir] = useState("ltr");
  useEffect(() => {
    i18n.changeLanguage(localStorage?.getItem("language") || "en");
  }, [i18n]);

  useEffect(() => {
    const lang = localStorage.getItem("language") || "en";
    setDir(lang === "ar" ? "rtl" : "ltr");
  }, []);

  const steps = [
    {
      quote: t("steps.step1.quote"),
      name: t("steps.step1.title"),
      designation: t("steps.step1.designation"),
      src: "/stepimage/1s.png",
    },
    {
      quote: t("steps.step2.quote"),
      name: t("steps.step2.title"),
      designation: t("steps.step2.designation"),
      src: "/stepimage/2s.png",
    },
    {
      quote: t("steps.step3.quote"),
      name: t("steps.step3.title"),
      designation: t("steps.step3.designation"),
      src: "/stepimage/3s.png",
    },
    {
      quote: t("steps.step4.quote"),
      name: t("steps.step4.title"),
      designation: t("steps.step4.designation"),
      src: "/stepimage/4s.png",
    },
    {
      quote: t("steps.step5.quote"),
      name: t("steps.step5.title"),
      designation: t("steps.step5.designation"),
      src: "/stepimage/5s.png",
    },
  ];

  const [isUserLogin, setisUserLogin] = useState(false);
  const [alrtLogin, setAlertLogin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setisUserLogin(true);
        setAlertLogin(false);
      } else {
        setisUserLogin(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center text-white pt-[60px] px-4">
      <NavBar />

      <section
        id="home"
        dir={dir}
        className="w-full relative flex items-center justify-center"
      >
        {alrtLogin && (
          <div className=" fixed z-[2222222] right-8 bottom-20 w-[300px]">
            <ErrorLginAlert typeError={"you must login"} />
          </div>
        )}

        <div className="flex flex-col justify-center items-center relative min-h-screen text-center max-w-3xl gap-2">
          <ShinyText
            text={t("hero.title")}
            disabled={false}
            speed={10}
            className="custom-class font-bold text-2xl md:text-5xl lg:text-5xl"
          />
          <p className="text-lg mb-8 text-gray-600 leading-relaxed">
            {t("hero.subtitle")}
          </p>

          {isUserLogin ? (
            <Link href="/templates" className="button-container mb-8">
              <div className="button">
                <span>{t("hero.getStarted")}</span>
              </div>
            </Link>
          ) : (
            <div
              onClick={() => {
                setAlertLogin(true);
              }}
              className="button-container mb-8"
            >
              <div className="button">
                <span>{t("hero.getStarted")}</span>
              </div>
            </div>
          )}

          <FaAngleDown
            className="absolute bottom-[100px] text-gray-500 left-1/2 -translate-x-1/2"
            style={{
              animation: "float 1.5s ease-in-out infinite",
            }}
          />
        </div>
      </section>

      {/* سكسشن ال  home */}

      {/* سكسشن الاسئلة */}
      <section dir={dir} id="questions" className="w-full py-20 px-4 ">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 mb-20 items-start">
          <div>
            <Component />
          </div>

          <div className="flex justify-center items-center">
            <PixelTransition
              firstContent={
                <img
                  src="https://w0.peakpx.com/wallpaper/395/225/HD-wallpaper-black-knight-logo-code-geass-silver-cool-logo-symbol-mecha-anime-dark-black-knight.jpg"
                  alt="default pixel transition content, a cat!"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              }
              secondContent={
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "grid",
                    placeItems: "center",
                    backgroundColor: "#111",
                  }}
                >
                  <p
                    style={{
                      fontWeight: 900,
                      fontSize: "3rem",
                      color: "#ffffff",
                    }}
                  >
                    MAS
                  </p>
                </div>
              }
              gridSize={12}
              pixelColor="#100319"
              animationStepDuration={0.4}
              className="custom-pixel-card"
            />
          </div>
        </div>
      </section>
      {/* سكسشن الاسئلة */}

      <section className="w-full py-20 px-4 ">
        <div
          dir={dir}
          className="text-center w-full flex flex-col justify-center items-center mb-16"
        >
          <div className="block bg-[#ffffff0c] w-fit backdrop-blur-3xl border border-gray-500 text-gray-300 px-3 py-1 rounded-full text-sm mb-6">
            {t("premium.badge")}
          </div>
          {/* <h1 className="text-5xl font-bold mb-6">Unlock Advanced Invitation Tools</h1> */}
          <ShinyText
            text={t("premium.title")}
            disabled={false}
            speed={10}
            className="custom-class font-bold text-2xl md:text-5xl lg:text-5xl "
          />

          <p className="text-gray-600 text-lg">{t("premium.desc1")}</p>
          <p className="text-gray-600 text-lg">{t("premium.desc2")} </p>
        </div>

        <ExplainSteps testimonials={steps} />
      </section>

      {/* سكشن ال features */}
      <section dir={dir} id="features" className="w-full py-20 px-4 ">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">{t("features.title")}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <FeatureCard
              icon={<FaMagic className="text-4xl text-blue-600 mb-4" />}
              title={t("features.feature1.title")}
              desc={t("features.feature1.desc")}
              pro={true}
            />
            <FeatureCard
              icon={<FaFileExcel className="text-4xl text-green-600 mb-4" />}
              title={t("features.feature2.title")}
              desc={t("features.feature2.desc")}
            />
            <FeatureCard
              icon={<FaObjectGroup className="text-4xl text-purple-600 mb-4" />}
              title={t("features.feature3.title")}
              desc={t("features.feature3.desc")}
              pro={true}
            />
            <FeatureCard
              icon={<FaQrcode className="text-4xl text-rose-600 mb-4" />}
              title={t("features.feature4.title")}
              desc={t("features.feature4.desc")}
            />
          </div>
        </div>
      </section>
      {/* سكشن ال features */}

      <PricingCard />

      <footer
        id="contact"
        dir={dir}
        className="w-full border-t border-gray-700  text-gray-300 py-12 px-4"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {/* Logo & Description */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">InviteMAS</h2>
            <p className="text-sm">{t("footer.desc")}</p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              {" "}
              {t("footer.linksTitle")}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:underline">
                  {t("footer.links.home")}
                </a>
              </li>
              <li>
                <a href="/login" className="hover:underline">
                  {t("footer.links.login")}
                </a>
              </li>
              <li>
                <a href="#features" className="hover:underline">
                  {t("footer.links.features")}
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:underline">
                  {t("footer.links.faq")}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact or Social (اختياري) */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>Email: info@invitemas.app</li>
              <li>Support: support@invitemas.app</li>
            </ul>
          </div>
        </div>

        {/* Bottom line */}
        <div className="border-t border-gray-700  mt-10 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} {t("footer.rights")}
        </div>
      </footer>
    </div>
  );
}

// فيجر كارت
function FeatureCard({ icon, title, desc, pro = false }) {
  return (
    <div
      className=" border border-white/20 
                    backdrop-blur-md bg-white/10 relative p-6 rounded-3xl shadow-sm hover:shadow-md transition"
    >
      {pro ? (
        <div
          className="     bg-white/10 text-blue-300 font-bold shadow-[0_0_15px_rgba(59,130,246,0.3)]
                       before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r 
                       before:from-blue-500/20 
                       before:to-purple-500/20 before:transition-all before:duration-300
                       
                       
                       
                       
                       rounded-full top-2 flex justify-center items-center p-1 text-[10px] left-2  absolute  w-15 backdrop-blur-3xl"
        >
          pro
        </div>
      ) : (
        <></>
      )}
      <div className="flex flex-col items-center text-center">
        {icon}
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-500">{desc}</p>
      </div>
    </div>
  );
}

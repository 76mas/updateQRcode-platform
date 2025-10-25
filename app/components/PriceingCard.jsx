import React, { useEffect } from "react";
import {
  Check,
  Upload,
  LayoutTemplate,
  QrCode,
  FileSpreadsheet,
} from "lucide-react";
import i18n from "@/app/(dashboard)/i18n";
import { useTranslation } from "react-i18next";

const PricingCard = () => {
  const { t } = useTranslation();

  const [language, setLanguage] = React.useState("en");

  useEffect(() => {
    setLanguage(localStorage?.getItem("language") || "en");
    localStorage.setItem("language", language);
  }, []);

  useEffect(() => {
    i18n.changeLanguage("ar");
  }, [i18n]);

  const features = [
    t("pricing.features.feature1"),
    t("pricing.features.feature2"),
    t("pricing.features.feature3"),
    t("pricing.features.feature4"),
  ];

  const mainFeatures = [
    {
      icon: <Upload className="w-6 h-6" />,
      title: t("pricing.mainFeatures.feature1.title"),
      description: t("pricing.mainFeatures.feature1.desc"),
    },
    {
      icon: <LayoutTemplate className="w-6 h-6" />,
      title: t("pricing.mainFeatures.feature2.title"),
      description: t("pricing.mainFeatures.feature2.desc"),
    },
    {
      icon: <FileSpreadsheet className="w-6 h-6" />,
      title: t("pricing.mainFeatures.feature3.title"),
      description: t("pricing.mainFeatures.feature3.desc"),
    },
    {
      icon: <QrCode className="w-6 h-6" />,
      title: t("pricing.mainFeatures.feature4.title"),
      description: t("pricing.mainFeatures.feature4.desc"),
    },
  ];

  return (
    <div
      dir={language === "ar" ? "rtl" : "ltr"}
      className="min-h-screen text-white p-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-[#ffffff0c] backdrop-blur-3xl border border-gray-500 text-gray-300 px-3 py-1 rounded-full text-sm mb-6">
            {t("pricing.upgrade")}
          </div>
          <h1 className="text-5xl font-bold mb-6">{t("pricing.title")}</h1>
          <p className="text-gray-400 text-lg">{t("pricing.subtitle")}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left side - Features */}
          <div className="flex flex-col justify-between space-y-14 mt-8">
            {mainFeatures.map((feature, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex bg-[#ffffff14] backdrop-blur-3xl border border-gray-500 items-center justify-center w-20 h-20 rounded-lg flex-shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right side - Pricing Card */}
          <div className="bg-[#ffffff0a] backdrop-blur-3xl rounded-2xl p-8 border border-gray-500">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold">{t("pricing.plan.basic")}</h2>
              <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {t("pricing.plan.mostPopular")}
              </span>
            </div>

            <p className="text-gray-400 mb-8">{t("pricing.plan.desc")}</p>

            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-5xl font-bold">$25</span>
              <span className="text-gray-400">
                {t("pricing.plan.perMonth")}
              </span>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 uppercase tracking-wide text-gray-300">
                {t("pricing.features.title")}
              </h3>
              <p className="text-gray-400 mb-6">
                {t("pricing.features.subtitle")}
              </p>

              <div className="grid grid-cols-1 gap-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="bg-green-500 rounded-full p-1 flex-shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="https://wa.me/9647727488537"
              className="block w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 text-center"
            >
              {t("pricing.getStarted")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingCard;

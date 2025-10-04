"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18n from "@/app/(dashboard)/i18n";

export default function Component() {
  const { t } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage("ar");
  }, [i18n]);

  const items = [
    {
      id: "1",
      title: t("faq.item1.title"),
      content: t("faq.item1.content"),
    },
    {
      id: "2",
      title: t("faq.item2.title"),
      content: t("faq.item2.content"),
    },
    {
      id: "3",
      title: t("faq.item3.title"),
      content: t("faq.item3.content"),
    },
    {
      id: "4",
      title: t("faq.item4.title"),
      content: t("faq.item4.content"),
    },
    {
      id: "5",
      title: t("faq.item5.title"),
      content: t("faq.item5.content"),
    },
  ];
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold"> {t("faq.title")} </h2>
      <Accordion type="single" collapsible className="w-full" defaultValue="3">
        {items.map((item) => (
          <AccordionItem value={item.id} key={item.id} className="py-2">
            <AccordionTrigger className="justify-start gap-3 py-2 cursor-pointer text-[15px] leading-6 hover:no-underline [&>svg]:-order-1">
              {item.title}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground ps-7 pb-2">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

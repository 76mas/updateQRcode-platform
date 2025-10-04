"use client";
import { HeroUIProvider } from "@heroui/react";

import { EventProvider } from "./context/StepsInfo";
import "./i18n"

export default function DashboardLayout({ children }) {
  return (
    <EventProvider>
      <HeroUIProvider>{children}</HeroUIProvider>
    </EventProvider>
  );
}

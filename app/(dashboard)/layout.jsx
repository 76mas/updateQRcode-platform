"use client"
import {HeroUIProvider} from "@heroui/react";

import { EventProvider } from "./context/StepsInfo";


export default function DashboardLayout({ children }) {
  return (

    <EventProvider>
        <HeroUIProvider >
           {children}
        </HeroUIProvider>
    </EventProvider>
  );
}

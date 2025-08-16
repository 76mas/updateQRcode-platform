"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAuth, applyActionCode } from "firebase/auth";
import { firebaseApp } from "@/app/firebase/config"; 

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState("جارِ التحقق...");

  useEffect(() => {
    const auth = getAuth(firebaseApp);
    const oobCode = searchParams.get("oobCode");

    if (!oobCode) {
      setStatus("رابط غير صالح.");
      return;
    }

    applyActionCode(auth, oobCode)
      .then(() => {
        setStatus("✅ تم تأكيد بريدك الإلكتروني بنجاح");
        setTimeout(() => router.push("/templates"), 2000);
      })
      .catch(() => {
        router.push("/link-expired");
        });

  }, [searchParams, router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <h2>{status}</h2>
    </div>
  );
}

"use client";

import { useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { auth, googleProvider } from "@/app/firebase/config";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

export default function Login() {
  const id = useId();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  // تسجيل دخول بالإيميل والباسورد
  const handleLogin = async () => {
    setLoading(true);
    setMessage("");
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      const name = result.user.displayName;
      const photo = result.user.photoURL;
      const userEmail = result.user.email;

      setUserInfo({ name, email: userEmail, photo });
      setMessage("✅ تم تسجيل الدخول بنجاح");
    } catch (error) {
      setMessage("❌ فشل تسجيل الدخول: " + error.message);
    }
    setLoading(false);
  };

  // تسجيل دخول بجوجل
  const handleGoogleLogin = async () => {
    setLoading(true);
    setMessage("");
    try {
      const result = await signInWithPopup(auth, googleProvider);

      const name = result.user.displayName;
      const userEmail = result.user.email;
      const photo = result.user.photoURL;

      setUserInfo({ name, email: userEmail, photo });
      setMessage("✅ تم تسجيل الدخول بجوجل بنجاح");
    } catch (error) {
      setMessage("❌ فشل تسجيل الدخول بجوجل: " + error.message);
    }
    setLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="text-black hover:text-black cursor-pointer bg-white"
          variant="outline"
        >
          Sign in
        </Button>
      </DialogTrigger>

      <DialogContent className="dark bg-zinc-900 text-white">
        <div className="flex flex-col items-center gap-2">
          <div
            className="flex size-11 shrink-0 items-center justify-center rounded-full border border-zinc-700"
            aria-hidden="true"
          >
            <svg
              className="stroke-white"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 32 32"
            >
              <circle cx="16" cy="16" r="12" fill="none" strokeWidth="8" />
            </svg>
          </div>
          <DialogHeader>
            <DialogTitle className="sm:text-center text-white">
              Welcome back
            </DialogTitle>
        
          </DialogHeader>
        </div>

       

        <Button
          onClick={handleGoogleLogin}
          variant="outline"
          className="text-white border-zinc-600 cursor-pointer hover:bg-zinc-800"
        >
          Login with Google
        </Button>

        {message && (
          <p
            className="text-sm mt-3"
            style={{
              color: message.startsWith("✅") ? "lightgreen" : "red",
            }}
          >
            {message}
          </p>
        )}

        {userInfo && (
          <div className="mt-4 text-center">
            <img
              src={userInfo.photo}
              alt="profile"
              className="mx-auto rounded-full w-14 h-14"
            />
            <p>{userInfo.name}</p>
            <p>{userInfo.email}</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}



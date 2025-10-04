"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "@/app/firebase/config";
import {
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import axios from "axios";

const AuthContext = createContext();
const baseApiUrl = "https://qrplatform-api.onrender.com";

export const AuthProvider = ({ children }) => {
  const [isSyncedWithBackend, setIsSyncedWithBackend] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 👇 نخلي الفايربيس يخزن الجلسة بالـ localStorage
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        // 👇 متابعة حالة المستخدم
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (!user) {
            setIsSyncedWithBackend(false);
            setLoading(false);
            return;
          }

          setIsSyncedWithBackend(false);

          try {
            const idToken = await user.getIdToken();

            // 👇 ضبط التوكن بالهيدر لكل طلب
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${idToken}`;

            // 👇 مزامنة مع الباكند
            const response = await axios.post(`${baseApiUrl}/api/account/sync`);

            // 👇 خزن التوكن اللي يرجع من الباكند (إذا موجود)
            if (response.data.token) {
              localStorage.setItem("token", response.data.token);
            }

            console.log("✅ Sync complete");
            setIsSyncedWithBackend(true);
          } catch (err) {
            console.error("❌ Sync failed", err);
          }

          setLoading(false);
        });

        return () => unsubscribe();
      })
      .catch((error) => {
        console.error("❌ Failed to set persistence:", error);
        setLoading(false);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ isSyncedWithBackend, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// "use client";

// import { createContext, useContext, useState, useEffect } from "react";
// import { auth } from "@/app/firebase/config";
// import {
//   onAuthStateChanged,
//   setPersistence,
//   browserLocalPersistence,
// } from "firebase/auth";
// import axios from "axios";

// const AuthContext = createContext();
// const baseApiUrl = "https://mk25szk5-7093.inc1.devtunnels.ms";

// export const AuthProvider = ({ children }) => {
//   const [isSyncedWithBackend, setIsSyncedWithBackend] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     // ضبط persistence حتى يخزن الجلسة بالـ localStorage
//     setPersistence(auth, browserLocalPersistence)
//       .then(() => {
//         console.log("✅ Auth persistence set to LOCAL");
//       })
//       .catch((err) => {
//         console.error("❌ Error setting persistence:", err);
//       });

//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (!user) {
//         setCurrentUser(null);
//         setIsSyncedWithBackend(false);
//         return;
//       }

//       setCurrentUser(user);
//       setIsSyncedWithBackend(false);

//       try {
//         // جلب توكن من Firebase
//         const idToken = await user.getIdToken();

//         // ضبط هيدر axios لكل الطلبات القادمة
//         axios.defaults.headers.common["Authorization"] = `Bearer ${idToken}`;

//         // مزامنة مع الباكند
//         const response = await axios.post(`${baseApiUrl}/api/account/sync`);

//         // حفظ JWT من الباكند إذا أرجع
//         if (response.data.token) {
//           localStorage.setItem("backendToken", response.data.token);
//         }

//         console.log("✅ Sync complete");
//         setIsSyncedWithBackend(true);
//       } catch (err) {
//         console.error("❌ Sync failed", err);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ isSyncedWithBackend, currentUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

// "use client";

// import { createContext, useContext, useState, useEffect } from "react";
// import { auth } from "@/app/firebase/config";
// import { onAuthStateChanged } from "firebase/auth";
// import axios from "axios";

// const AuthContext = createContext();
// const baseApiUrl = "https://mk25szk5-7093.inc1.devtunnels.ms";

// export const AuthProvider = ({ children }) => {
//   const [isSyncedWithBackend, setIsSyncedWithBackend] = useState(false);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (!user) {
//         setIsSyncedWithBackend(false);
//         return;
//       }

//       setIsSyncedWithBackend(false);

//       try {
//         const idToken = await user.getIdToken();

//         // ضبط هيدر axios لكل الطلبات القادمة
//         axios.defaults.headers.common["Authorization"] = `Bearer ${idToken}`;

//         // مزامنة مع الباكند (POST)
//         const response = await axios.post(`${baseApiUrl}/api/account/sync`);

//         // حفظ JWT من الباكند إذا أرجع
//         if (response.data.token) {
//           localStorage.setItem("token", response.data.token);
//         }

//         console.log("✅ Sync complete");
//         setIsSyncedWithBackend(true);
//       } catch (err) {
//         console.error("❌ Sync failed", err);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ isSyncedWithBackend }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

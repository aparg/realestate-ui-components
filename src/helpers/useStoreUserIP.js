"use client";

import { useEffect, useState } from "react";

export const useStoreUserIP = () => {
  const [userIP, setUserIP] = useState();
  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window !== "undefined") {
      fetch("https://jsonip.com", { mode: "cors" })
        .then((resp) => resp.json())
        .then((data) => {
          setUserIP(data.ip);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return { userIP };
};

"use client";

import { redirect, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const WithAuth = (Component: any) => {
  return function WithAuth(props: any) {
    useEffect(() => {
      if (typeof window !== "undefined") {
        if (localStorage.getItem("tkn") == null) {
          return redirect("/login");
        }
      }
    }, []);

    return <Component {...props} />;
  };
};

export default WithAuth;

"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function WithAuth(Component: any) {
  const router = useRouter();
  return (props: any) => {
    useEffect(() => {
      if (localStorage.getItem("tkn") == null) {
        router.push("/login");
      }
    }, []);
    if (localStorage.getItem("tkn") == null) {
      return null;
    }
    return <Component {...props} />;
  };
}

export default WithAuth;

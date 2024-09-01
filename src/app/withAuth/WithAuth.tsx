"use client"
import { useRouter } from 'next/navigation';
import React from 'react'

const WithAuth = (Component: any) => {
  
  if (localStorage?.getItem("tkn") == null) {
    const router = useRouter();
    router.push("/login");
    return null
  }
  return (props: any)=> <Component {...props} />;
};

export default WithAuth


// import { useRouter } from "next/navigation";
// import React, { useEffect } from "react";

// const WithAuth = (Component: any) => {
//   return (props: any) => {
//     const router = useRouter();
//     useEffect(() => {
//       if (localStorage.getItem("tkn") == null) {
//         router.push("/login");
//       }
//     }, []);
//     if (localStorage.getItem("tkn") == null) {
//       return null;
//     }
//     return <Component {...props} />;
//   };
// };

// export default WithAuth;
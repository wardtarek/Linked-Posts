import React from "react";
import PostPage from "./PostPage";

// export async function generateStaticParams() {
//   return [{id:"a"}]
// }

const page = ({ params }: any) => {

  return <PostPage params={params} />;
};

export default page;
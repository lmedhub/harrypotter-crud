import { getSession } from "next-auth/react";
import React from "react";

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    context.res.writeHead(302, { Location: "/api/auth/signin" });
    context.res.end();
  } else {
    context.res.writeHead(302, { Location: "/allcharacters" });
    context.res.end();
  }

  return {
    props: {},
  };
};

export default function Main() {
  return <div>Redirecting...</div>;
}

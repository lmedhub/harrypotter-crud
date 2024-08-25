// pages/mycharacters.tsx
import React from "react";
import Layout from "../components/Layout";
import prisma from "../lib/prisma";
import { getSession, GetSessionParams } from "next-auth/react";
import UnauthorizedPage from "../components/Unauthorized";
import { Session } from "next-auth";
import { useTranslation } from "react-i18next";
import PageHeader from "../components/PageHeader";
import EmptyData from "../components/EmptyData";
import CharacterList from "../components/CharacterList";
import { CharacterProps } from "../types";

export const getServerSideProps = async (context: GetSessionParams) => {
  const session = await getSession(context);

  const myFavorites = await prisma.favoriteCharacter.findMany({
    where: {
      authorId: session?.user?.id,
    },
  });

  return {
    props: { myFavorites, session },
  };
};

type Props = {
  myFavorites: CharacterProps[];
  session: Session;
};

const MyCharacters: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const { myFavorites, session } = props;

  if (!session) {
    return <UnauthorizedPage />;
  }

  if (myFavorites.length === 0) {
    return <EmptyData />;
  }

  return (
    <Layout>
      <PageHeader title={t("myfavorites")} />
      <CharacterList characters={myFavorites} />
    </Layout>
  );
};

export default MyCharacters;

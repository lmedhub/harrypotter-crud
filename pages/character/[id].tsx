import React, { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { getSession } from "next-auth/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { Session } from "next-auth";
import { useTranslation } from "react-i18next";
import PageHeader from "../../components/PageHeader";
import Image from "next/image";
import { styled } from "@mui/system";
import { CharacterProps } from "../../types";
import UnauthorizedPage from "../../components/Unauthorized";
import { GetServerSidePropsContext } from "next";

const CharacterContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
}));

const CharacterInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  [theme.breakpoints.up("md")]: {
    marginLeft: theme.spacing(4),
  },
}));

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { params } = context;
  const session = await getSession(context);

  const response = await fetch(
    `https://hp-api.onrender.com/api/character/${params?.id}`
  );
  const data = await response.json();
  const character = data[0];

  return {
    props: { character, session },
  };
};

type Props = {
  character: CharacterProps;
  session: Session;
};

const CharacterPage: React.FC<Props> = (props) => {
  const { t } = useTranslation();

  const { character, session } = props;
  const [isFavorited, setIsFavorited] = useState(false);
  const [isCheckingFavorited, setIsCheckingFavorited] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkIfFavorited = async () => {
      const response = await fetch(`/api/character/${character.id}`);
      if (!response.ok) {
        setIsCheckingFavorited(false);
        return;
      }
      const data = await response.json();
      setIsFavorited(data.isFavorited);
      setIsCheckingFavorited(false);
    };

    if (character.id) {
      checkIfFavorited();
    }
  }, [character.id]);

  if (!session) {
    return <UnauthorizedPage />;
  }

  const handleFavoriteToggle = async () => {
    setIsCheckingFavorited(true);
    const response = await fetch(`/api/character/${character.id}`, {
      method: isFavorited ? "DELETE" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ character }),
    });

    if (response.ok) {
      setIsCheckingFavorited(false);
      setIsFavorited(!isFavorited);
      router.push("/allcharacters");
    }
  };

  return (
    <Layout>
      <PageHeader title={t("characterdetails")} />
      <CharacterContainer>
        {character.image ? (
          <Image
            loader={() => character.image}
            src={character.image}
            alt={character.name}
            width={280}
            height={400}
          />
        ) : (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {t("noimage")}
          </Box>
        )}
        <CharacterInfo>
          <Typography variant="h3">
            {t("name")}: {character.name}
          </Typography>
          <Typography variant="h4">
            {t("species")}: {character.species}
          </Typography>
          <Typography variant="body1">
            {t("house")}: {character.house || "Unknown"}
          </Typography>
          <Typography variant="body2">
            {t("dateOfBirth")}: {character.dateOfBirth || "Unknown"}
          </Typography>
          <Typography variant="body2">
            {t("actor")}: {character.actor || "Unknown"}
          </Typography>
          <Typography variant="body2">
            {t("patronus")}: {character.patronus || "Unknown"}
          </Typography>
          <Typography variant="body2">
            {t("ancestry")}: {character.ancestry}
          </Typography>
          <Typography variant="body2">
            {t("alive")}: {character.alive ? t("yes") : t("no")}
          </Typography>
          {isCheckingFavorited ? (
            <CircularProgress />
          ) : (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleFavoriteToggle}
              id="fav-button"
            >
              {isFavorited ? t("unfavorite") : t("favorite")}
            </Button>
          )}
        </CharacterInfo>
      </CharacterContainer>
    </Layout>
  );
};

export default CharacterPage;

import React from "react";
import Router from "next/router";
import { Box, Card, Paper, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { CharacterProps } from "../types";
import EmptyData from "./EmptyData";
import { AspectRatio } from "@mui/icons-material";

const StyledCharacterCard = styled(Paper)`
  && {
    padding: 2rem;
    cursor: pointer;
    transition: background-color 0.3s;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const Character: React.FC<{ character: CharacterProps }> = ({ character }) => {
  const { t } = useTranslation();

  const handleCardClick = () => {
    Router.push("/character/[id]", `/character/${character.id}`);
  };

  return (
    <StyledCharacterCard onClick={handleCardClick}>
      <Typography variant="h6">
        {t("name")}: {character.name}
      </Typography>
      <Typography variant="subtitle1">
        {t("house")}: {character.house || t("unknown")}
      </Typography>
      <Box
        sx={{
          width: "200px",
          height: "250px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {character.image ? (
          <Image
            loader={() => character.image}
            src={character.image}
            alt={character.name}
            width={180}
            height={227}
          />
        ) : (
          <EmptyData
            noDataDisplay={t("noimage")}
            sx={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          />
        )}
      </Box>
    </StyledCharacterCard>
  );
};

export default Character;

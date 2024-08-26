import React from "react";
import Router from "next/router";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { CharacterProps } from "../types";
import EmptyData from "./EmptyData";

const StyledCharacterCard = styled(Card)`
  && {
    padding: 2rem;
    cursor: pointer;
    transition: background-color 0.3s;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #121212 !important;
    color: #fff !important;

    &:hover {
      background-color: #333333 !important;
    }
  }
`;

const StyledImageContainer = styled(Box)`
  width: 200px;
  height: 250px;
  display: flex;
  justify-content: center;
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
      <StyledImageContainer>
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
      </StyledImageContainer>
    </StyledCharacterCard>
  );
};

export default Character;

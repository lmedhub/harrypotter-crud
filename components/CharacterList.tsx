import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import React from "react";
import styled from "@emotion/styled";
import Character from "./Character";
import { CharacterProps } from "../types";

const StyledCharacterContainer = styled("section")`
  .character {
    margin-bottom: 16px;
  }
`;

type CharacterListProps = {
  characters: CharacterProps[];
};

export default function CharacterList({ characters }: CharacterListProps) {
  return (
    <StyledCharacterContainer>
      <Grid container spacing={3}>
        {characters.map((character: CharacterProps) => (
          <Grid item key={character.id} xs={12} sm={6} md={6} lg={3} component="article">
            <Card className="character">
              <Character character={character} />
            </Card>
          </Grid>
        ))}
      </Grid>
    </StyledCharacterContainer>
  );
}

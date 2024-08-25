import { Card, Grid, Typography } from "@mui/material";
import React from "react";
import styled from "@emotion/styled";
import Character from "./Character";

const StyledCharacterContainer = styled("div")`
  .character {
    margin-bottom: 16px;
  }
`;

export default function CharacterList({ characters }) {
  return (
    <StyledCharacterContainer>
      <Grid container spacing={3}>
        {characters.map((character) => (
          <Grid item key={character.id} xs={12} sm={6} md={6} lg={3}>
            <Card className="character">
              <Character character={character} />
            </Card>
          </Grid>
        ))}
      </Grid>
    </StyledCharacterContainer>
  );
}

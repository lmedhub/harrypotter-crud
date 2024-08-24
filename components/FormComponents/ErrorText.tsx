import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import React from "react";

const ErrorTextComponent = styled(Typography)`
  color: red;
  margin-top: 0.25rem;
`;

export default function ErrorText({ children }) {
  return <ErrorTextComponent>{children}</ErrorTextComponent>;
}

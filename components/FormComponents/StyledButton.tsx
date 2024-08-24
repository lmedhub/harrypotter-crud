import styled from "@emotion/styled";
import { Button } from "@mui/material";
import React from "react";

const StyledButtonComponent = styled(Button)`
  border: 0;
  padding: 1rem 2rem;
`;

export default function StyledButton({ children, ...props }) {
  return (
    <StyledButtonComponent variant="contained" {...props}>
      {children}
    </StyledButtonComponent>
  );
}

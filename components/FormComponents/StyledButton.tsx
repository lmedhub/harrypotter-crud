import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import { ButtonProps } from "@mui/material";
import React from "react";

const StyledButtonComponent = styled(Button)`
  border: 0;
  padding: 1rem 2rem;
`;

type StyledButtonProps = ButtonProps & {
  children: React.ReactNode;
};

export default function StyledButton({
  children,
  ...props
}: StyledButtonProps) {
  return (
    <StyledButtonComponent variant="contained" {...props}>
      {children}
    </StyledButtonComponent>
  );
}

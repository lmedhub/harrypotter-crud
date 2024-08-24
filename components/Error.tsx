import { Box, styled, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

const ErrorContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const ErrorText = styled(Typography)`
  margin-bottom: 16px;
`;

const ErrorFallback: React.FC = () => {
    const { t } = useTranslation();

  return (
    <ErrorContainer>
      <ErrorText variant="h5">{t("somethingwrong")}</ErrorText>
      <Typography variant="body1">{t("contactsupport")}</Typography>
    </ErrorContainer>
  );
};

export default ErrorFallback;

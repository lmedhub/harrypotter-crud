// components/UnauthorizedPage.js

import { Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useRouter } from "next/router";
import StyledButton from "./FormComponents/StyledButton";
import { useTranslation } from "react-i18next";

const UnauthorizedContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  gap: 2,
});

function UnauthorizedPage() {
  const { t } = useTranslation();
  const router = useRouter();

  const handleSignupClick = () => {
    router.push("/api/auth/signin");
  };

  return (
    <UnauthorizedContainer>
      <Typography variant="h4">{t("unauthorized")}</Typography>
      <Typography variant="body1">{t("needauth")}</Typography>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <StyledButton onClick={router.back}>{t("backbutton")}</StyledButton>
        <StyledButton onClick={handleSignupClick}>Login</StyledButton>
      </Box>
    </UnauthorizedContainer>
  );
}

export default UnauthorizedPage;

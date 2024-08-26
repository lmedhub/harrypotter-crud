import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

interface EmptyDataProps {
  sx?: React.CSSProperties;
  noDataDisplay?: string;
}

const EmptyData: React.FC<EmptyDataProps> = ({ sx, noDataDisplay }) => {
  const { t } = useTranslation();

  return (
    <Box sx={{ textAlign: "center", mt: 4, ...sx }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {noDataDisplay || t("nodata")}
      </Typography>
      <Typography variant="body2">{t("nodatadisplay")}</Typography>
    </Box>
  );
};

export default EmptyData;

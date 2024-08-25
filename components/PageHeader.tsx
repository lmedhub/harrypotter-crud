import React from "react";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import { Box, IconButton } from "@mui/material";
import Router from "next/router";
import { ArrowBack } from "@mui/icons-material";

const StyledPageHeader = styled(Typography)`
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-bottom: 2px solid #3f51b5;
  width: 100%;
  padding-bottom: 8px;
  margin-top: 20px;
  margin-bottom: 8px;
`;

type PageHeaderProps = {
  title: string;
  shouldNotBack?: boolean;
};

const PageHeader = ({ title, shouldNotBack }: PageHeaderProps) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <StyledPageHeader variant="h3">{title}</StyledPageHeader>
      {!shouldNotBack && (
        <IconButton onClick={() => Router.back()}>
          <ArrowBack color="secondary" />
        </IconButton>
      )}
    </Box>
  );
};

export default PageHeader;

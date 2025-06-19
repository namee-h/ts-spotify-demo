import React from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Tooltip, styled } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const StyledButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.default,
  borderRadius: "50%",
  padding: "8px",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: "#1ed760",
    color: "#000",
  },
}));

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Tooltip title="뒤로가기" arrow>
      <StyledButton onClick={handleBack}>
        <ArrowBackIosNewIcon />
      </StyledButton>
    </Tooltip>
  );
};

export default BackButton;

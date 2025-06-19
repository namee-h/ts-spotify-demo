import React from "react";
import { Box, Typography } from "@mui/material";
import LoginButton from "./buttons/LoginButton";
import Loading from "./loadingSpinner/images/loading.gif";

const UnauthorizedMessage = () => {
  return (
    <Box
      flexDirection="column"
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      <Box
        flexDirection="column"
        display="flex"
        alignItems="center"
        justifyContent="center"
        border="2px dashed #1ed760"
        padding="36px"
        borderRadius="8px"
      >
        <Box
          sx={{
            width: 220,
            height: 220,
            borderRadius: "50%",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "8px solid white",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)",
            marginBottom: "20px",
          }}
        >
          <img
            src={Loading}
            alt="Loading..."
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>

        <Typography variant="h2" fontWeight={700} mb="20px">
          다시 로그인 하세요
        </Typography>

        <LoginButton />
      </Box>
    </Box>
  );
};

export default UnauthorizedMessage;

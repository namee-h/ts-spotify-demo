import React from "react";
import { Box } from "@mui/material";
import Loading from "./images/loading.gif";

const text = "로딩중, 잠시만 기다려 주세요...";
const LoadingSpinner = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      gap={5}
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
        }}
      >
        <img
          src={Loading}
          alt="Loading..."
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>
      <Box
        mt={2}
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ gap: "1px" }}
      >
        {text.split("").map((char, index) => (
          <Box
            key={index}
            component="span"
            sx={{
              display: "inline-block",
              color: "#000",
              fontSize: "19px",
              animation: "wave 1.5s infinite",
              animationDelay: `${index * 0.1}s`,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </Box>
        ))}
      </Box>
      <style>
        {`
          @keyframes wave {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-8px);
            }
          }
        `}
      </style>
    </Box>
  );
};

export default LoadingSpinner;

import { Box } from "@mui/material";
import React from "react";
import LoginButton from "../../common/components/buttons/LoginButton";

const Navbar = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        height: "64px",
      }}
    >
      <LoginButton />
    </Box>
  );
};

export default Navbar;

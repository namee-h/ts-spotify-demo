import { Box, Button, styled, Typography } from "@mui/material";
import React from "react";
import { getSpotifyAuthUrl } from "../../utils/auth";

const EmptyPlaylistCard = styled(Box)(({ theme }) => ({
  borderRadius: "8px",
  backgroundColor: "#282828",
  color: theme.palette.text.primary,
  width: "100%",
  padding: "20px",
}));

const CreatePlaylistBtn = styled(Button)({
  marginTop: "20px",
  fontWeight: "700",
});

const EmptyPlaylist = () => {
  const handleToLogin = () => {
    getSpotifyAuthUrl();
  };
  return (
    <EmptyPlaylistCard>
      <Box>
        <Typography variant="h2" fontWeight={700}>
          Create your first playlist
        </Typography>
        <Typography variant="h2">It's easy, we'll help you</Typography>
      </Box>
      <CreatePlaylistBtn
        variant="contained"
        color="secondary"
        onClick={handleToLogin}
      >
        Create playlist
      </CreatePlaylistBtn>
    </EmptyPlaylistCard>
  );
};

export default EmptyPlaylist;

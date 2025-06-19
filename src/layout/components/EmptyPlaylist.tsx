import { Box, Button, styled, Typography } from "@mui/material";
import React from "react";
import { getSpotifyAuthUrl } from "../../utils/auth";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import useCreatePlaylist from "../../hooks/useCreatePlaylist";

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
  const { mutate: createPlaylist } = useCreatePlaylist();
  const { data: user } = useGetCurrentUserProfile();
  const handleToLogin = () => {
    if (!user) {
      getSpotifyAuthUrl();
    } else {
      createPlaylist({ name: "나의 플레이리스트" });
    }
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

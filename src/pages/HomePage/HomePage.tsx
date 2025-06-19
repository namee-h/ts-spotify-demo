import React from "react";
import NewReleases from "./components/NewReleases";
import OldTracks from "./components/OldTracks";
import NewTracks from "./components/NewTracks";
import HipsterAlbums from "./components/HipsterAlbums";
import KPopArtists from "./components/KPopArtists";
import { Box, styled } from "@mui/material";

const ScrollContainer = styled(Box)({
  maxHeight: "100dvh",
  overflowY: "scroll",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },
});

const HomePage = () => {
  return (
    <ScrollContainer style={{ maxHeight: "100dvh", overflowY: "auto" }}>
      <NewReleases />
      <NewTracks />
      <KPopArtists />
      <OldTracks />
      <HipsterAlbums />
    </ScrollContainer>
  );
};

export default HomePage;

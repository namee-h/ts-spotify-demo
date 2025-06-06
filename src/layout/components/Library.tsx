import React from "react";
import EmptyPlaylist from "./EmptyPlaylist";
import useGetCurrentUserPlaylists from "../../hooks/useGetCurrentUserPlaylists";
import Playlists from "./Playlists";
import { styled } from "@mui/material";

const LibraryContainer = styled("div")({
  height: "100%",
  overflowY: "auto",
  scrollbarWidth: "none", // Firefox
  "&::-webkit-scrollbar": {
    display: "none", // Chrome, Safari
  },
});

const Library = () => {
  const { data } = useGetCurrentUserPlaylists({
    limit: 20,
    offset: 0,
  });
  console.log("playlists:", data);
  return (
    <LibraryContainer style={{ height: "100%", overflowY: "auto" }}>
      {!data || data?.total === 0 ? (
        <EmptyPlaylist />
      ) : (
        <Playlists playlists={data.items} />
      )}
    </LibraryContainer>
  );
};

export default Library;

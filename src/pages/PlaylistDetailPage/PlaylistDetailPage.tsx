import React from "react";
import useGetPlaylist from "../../hooks/useGetPlaylist";
import { Navigate, useParams } from "react-router";
import PlaylistHead from "./components/PlaylistHead";
import { Box } from "@mui/material";

const PlaylistDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: playlist } = useGetPlaylist({ playlist_id: id! });
  console.log("playlist-detail", playlist);
  if (!id) {
    return <Navigate to="/" />;
  }
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
        borderRadius: "8px",
        marginTop: "20px",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "350px",
          background: "linear-gradient(to bottom,rgb(50, 168, 115), #121212)",
          zIndex: 0,
        }}
      />

      <Box sx={{ position: "relative", zIndex: 1, padding: "32px" }}>
        {playlist && <PlaylistHead playlist={playlist} />}

        {/* <PlaylistItem tracks={playlist.tracks.items} /> */}
      </Box>
    </Box>
  );
};

export default PlaylistDetailPage;

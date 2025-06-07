import React from "react";
import { Box } from "@mui/material";
import { SimplifiedPlaylist } from "../../models/playlist";
import PlaylistItem from "../../common/components/PlaylistItem";
interface PlaylistsProps {
  playlists: SimplifiedPlaylist[];
}

const Playlists = ({ playlists }: PlaylistsProps) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={1}
      sx={{ paddingBottom: "8px" }}
    >
      {playlists.map((playlist) => (
        <PlaylistItem key={playlist.id} playlist={playlist} />
      ))}
    </Box>
  );
};

export default Playlists;

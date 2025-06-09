import React, { useState } from "react";
import { Box } from "@mui/material";
import { SimplifiedPlaylist } from "../../models/playlist";
import PlaylistItem from "../../common/components/PlaylistItem";
import { useNavigate, useParams } from "react-router";
interface PlaylistsProps {
  playlists: SimplifiedPlaylist[];
}

const Playlists = ({ playlists }: PlaylistsProps) => {
  const navigate = useNavigate();
  const { id: selectedId } = useParams<{ id: string }>();
  const handleClick = (id: string) => {
    navigate(`/playlist/${id}`);
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={1}
      sx={{ paddingBottom: "8px" }}
    >
      {playlists.map((item) => (
        <PlaylistItem
          handleClick={handleClick}
          key={item.id}
          name={item.name || ""}
          image={(item.images && item.images[0]?.url) || null}
          id={item.id || ""}
          artistName={"Playlist ⚙︎ " + item.owner?.display_name}
          isSelected={item.id === selectedId}
        />
      ))}
    </Box>
  );
};

export default Playlists;

import React, { useState } from "react";
import { Box } from "@mui/material";
import { SimplifiedPlaylist } from "../../models/playlist";
import PlaylistItem from "../../common/components/PlaylistItem";
import { useNavigate } from "react-router";
interface PlaylistsProps {
  playlists: SimplifiedPlaylist[];
}

const Playlists = ({ playlists }: PlaylistsProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleClick = (id: string) => {
    setSelectedId(id);
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

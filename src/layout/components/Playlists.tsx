import React from "react";
import { Box, Typography } from "@mui/material";
import { SimplifiedPlaylist } from "../../models/playlist";
import fallbackImage from "../assets/no-image.png";
interface PlaylistsProps {
  playlists: SimplifiedPlaylist[];
}

const Playlists = ({ playlists }: PlaylistsProps) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={1}
      sx={{ paddingBottom: "60px" }}
    >
      {playlists.map((playlist) => (
        <Box
          key={playlist.id}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            padding: 1,
            borderRadius: 2,
            "&:hover": { backgroundColor: "#333" },
            cursor: "pointer",
          }}
        >
          <img
            src={playlist.images?.[0]?.url || fallbackImage}
            alt={playlist.name}
            style={{
              width: 50,
              height: 50,
              borderRadius: 4,
              objectFit: "cover",
            }}
          />
          <Box>
            <Typography
              fontWeight="bold"
              color="white"
              noWrap
              sx={{
                maxWidth: "200px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {playlist.name}
            </Typography>

            <Typography
              variant="body2"
              color="gray"
              noWrap
              sx={{
                maxWidth: "200px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              Playlist ·{" "}
              {playlist.owner ? playlist.owner.display_name : "Unknown"}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default Playlists;

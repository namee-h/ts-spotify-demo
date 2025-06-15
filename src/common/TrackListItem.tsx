import React from "react";
import { Box, Typography, Avatar, IconButton } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Track } from "../models/track";

interface Props {
  track: Track;
}

const formatDuration = (ms: number) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
};

const TrackListItem = ({ track }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px 8px",
        "&:hover": {
          backgroundColor: "rgba(255,255,255,0.1)",
          borderRadius: "8px",
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
        <Avatar
          src={track.album?.images?.[0]?.url}
          alt={track.name}
          variant="square"
          sx={{ width: 48, height: 48, borderRadius: 1 }}
        />
        <Box>
          <Typography fontWeight={600}>{track.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {track.artists?.map((a) => a.name).join(", ")}
          </Typography>
        </Box>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ minWidth: 50 }}>
        {track.duration_ms ? formatDuration(track.duration_ms) : "-"}
      </Typography>
      <IconButton
        sx={{
          borderRadius: "50%",
          color: "white",
          "&:hover": {
            color: "#1ed760",
            backgroundColor: "#343434",
          },
        }}
      >
        <MoreHorizIcon />
      </IconButton>
    </Box>
  );
};

export default TrackListItem;

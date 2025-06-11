import React from "react";
import { PlaylistTrack } from "../../../models/track";
import { isTrack } from "../../../utils/isTrack";
import { Box, TableCell, TableRow, Typography } from "@mui/material";
import fallbackImage from "../../../common/assets/no-image.png";

interface DesktopPlaylistItemProps {
  item: PlaylistTrack;
  index: number;
}

const DesktopPlaylistItem = ({ item, index }: DesktopPlaylistItemProps) => {
  const isTrackType = isTrack(item.track);
  const duration = item.track?.duration_ms ?? 0;
  const minutes = Math.floor(duration / 60000);
  const seconds = String(Math.floor(duration / 1000) % 60).padStart(2, "0");

  if (!isTrackType) {
    return (
      <Typography fontStyle="italic" color="gray">
        Episode
      </Typography>
    );
  }

  return (
    <TableRow
      sx={{
        "&:hover": {
          backgroundColor: "#333",
          cursor: "pointer",
        },
      }}
    >
      <TableCell>{index + 1}</TableCell>
      {isTrack(item.track) && (
        <TableCell>
          <Box display="flex" alignItems="center" gap={2}>
            <img
              src={item.track.album?.images?.[0]?.url || fallbackImage}
              alt={item.track.name}
              style={{
                width: 40,
                height: 40,
                objectFit: "cover",
                borderRadius: 4,
              }}
            />
            <Typography fontWeight="bold" color="white">
              {item.track.name || "No Name"}
            </Typography>
          </Box>
        </TableCell>
      )}
      {isTrack(item.track) && <TableCell>{item.track.album?.name}</TableCell>}
      <TableCell>{item.added_at?.slice(0, 10) || "Unknown"}</TableCell>
      <TableCell>
        {minutes}:{seconds}
      </TableCell>
    </TableRow>
  );
};

export default DesktopPlaylistItem;

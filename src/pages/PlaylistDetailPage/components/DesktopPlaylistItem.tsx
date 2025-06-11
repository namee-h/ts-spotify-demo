import React from "react";
import { PlaylistTrack } from "../../../models/track";
import { isTrack } from "../../../utils/isTrack";
import { Box, styled, TableCell, TableRow, Typography } from "@mui/material";
import fallbackImage from "../../../common/assets/no-image.png";

const NoBorderTableCell = styled(TableCell)({
  border: "none",
});
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
      <NoBorderTableCell>{index + 1}</NoBorderTableCell>
      {isTrack(item.track) && (
        <NoBorderTableCell>
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
        </NoBorderTableCell>
      )}
      {isTrack(item.track) && (
        <NoBorderTableCell>{item.track.album?.name}</NoBorderTableCell>
      )}
      <NoBorderTableCell>
        {item.added_at?.slice(0, 10) || "Unknown"}
      </NoBorderTableCell>
      <NoBorderTableCell>
        {minutes}:{seconds}
      </NoBorderTableCell>
    </TableRow>
  );
};

export default DesktopPlaylistItem;

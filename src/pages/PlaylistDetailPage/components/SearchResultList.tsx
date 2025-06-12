import React from "react";
import { Track } from "../../../models/track";
import { Avatar, Box, Button, List, ListItem, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface SearchResultListProps {
  list: Track[];
  onAddClick?: (track: Track) => void;
}

const SearchResultList = ({ list, onAddClick }: SearchResultListProps) => {
  return (
    <List sx={{ width: "100%" }}>
      {list.map((track) => (
        <ListItem
          key={track.id}
          sx={{
            py: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: 2,
            borderRadius: 1,
            transition: "background-color 0.2s ease",
            "&:hover": {
              backgroundColor: "#2a2a2a",
            },
          }}
        >
          <Box display="flex" gap={2}>
            <Button
              variant="text"
              sx={{
                color: "#1ED760",
                fontWeight: 500,
                minWidth: "50px",
              }}
              onClick={() => onAddClick?.(track)}
            >
              <AddIcon />
            </Button>

            <Avatar
              variant="square"
              src={track.album?.images?.[0]?.url}
              alt={track.name}
              sx={{ width: 48, height: 48, borderRadius: "8px" }}
            />
          </Box>

          <Box display="flex" width="100%" gap={2}>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="body2" color="text.secondary" noWrap>
                곡 제목
              </Typography>
              <Typography fontWeight={600} noWrap>
                {track.name}
              </Typography>
            </Box>

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="body2" color="text.secondary" noWrap>
                가수
              </Typography>
              <Typography fontWeight={600} noWrap>
                {track.artists?.map((artist) => artist.name).join(", ")}
              </Typography>
            </Box>

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="body2" color="text.secondary" noWrap>
                앨범명
              </Typography>
              <Typography fontWeight={600} noWrap>
                {track.album?.name}
              </Typography>
            </Box>
          </Box>
        </ListItem>
      ))}
    </List>
  );
};

export default SearchResultList;

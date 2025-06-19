import React from "react";
import { Avatar, Box, Button, List, ListItem, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Track } from "../../../models/track";
import { useParams } from "react-router";
import useAddTrackToPlaylist from "../../../hooks/useAddTrackToPlaylist";

interface Props {
  list: Track[];
}

const MobileSearchResultList = ({ list }: Props) => {
  const { id: playlist_id } = useParams<{ id: string }>();
  const { mutate: addTrack } = useAddTrackToPlaylist();

  const handleAddClick = (track: Track) => {
    if (!track.uri) return;
    addTrack({
      playlist_id: playlist_id!,
      uris: [track.uri],
    });
  };

  return (
    <List>
      {list.map((track) => (
        <ListItem
          key={track.id}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: 2,
            paddingY: 1,
            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
          }}
        >
          <Button
            variant="text"
            sx={{ minWidth: 32, padding: 0, color: "#1ED760" }}
            onClick={() => handleAddClick(track)}
          >
            <AddIcon />
          </Button>

          <Avatar
            variant="square"
            src={track.album?.images?.[0]?.url}
            alt={track.name}
            sx={{ width: 48, height: 48, borderRadius: "8px" }}
          />

          <Box sx={{ overflow: "hidden" }}>
            <Typography fontWeight={600} noWrap>
              {track.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              {track.artists?.map((artist) => artist.name).join(", ")}
            </Typography>
          </Box>
        </ListItem>
      ))}
    </List>
  );
};

export default MobileSearchResultList;

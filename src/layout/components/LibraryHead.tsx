import { styled } from "@mui/system";
import React from "react";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
const LibraryTitle = styled("div")({
  display: "flex",
  alignItems: "center",
  padding: "15px",
  justifyContent: "space-between",
});

const LibraryHead = () => {
  const handleCreatePlaylist = () => {};
  return (
    <LibraryTitle>
      <BookmarkIcon />
      <Typography variant="h2" fontWeight={700}>
        Your Library
      </Typography>
      <Button onClick={handleCreatePlaylist}>
        <AddIcon />
      </Button>
    </LibraryTitle>
  );
};

export default LibraryHead;

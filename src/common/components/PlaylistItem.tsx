import React from "react";
import { Box, styled, Typography } from "@mui/material";
import fallbackImage from "../assets/no-image.png";

const PlaylistItemContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isSelected",
})<Pick<PlaylistItemProps, "isSelected">>(({ isSelected }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "10px",
  borderRadius: "8px",
  backgroundColor: isSelected ? "#1ed76026" : "none",
  "&:hover": { backgroundColor: isSelected ? "#1ed76026" : "#333" },
  cursor: "pointer",
}));
const PlaylistCoverImage = styled("img")({
  width: 50,
  height: 50,
  borderRadius: 4,
  objectFit: "cover",
});

const EllipsisTypography = styled(Typography)({
  fontWeight: "bold",
  color: "white",
  maxWidth: "200px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});
interface PlaylistItemProps {
  image: string | null;
  name: string;
  artistName: string | null;
  id: string;
  isSelected: boolean;
  handleClick: (id: string) => void;
}

const PlaylistItem = ({
  image,
  name,
  artistName,
  id,
  isSelected,
  handleClick,
}: PlaylistItemProps) => {
  return (
    <PlaylistItemContainer
      onClick={() => handleClick(id)}
      isSelected={isSelected}
    >
      <PlaylistCoverImage src={image || fallbackImage} alt={name} />
      <Box>
        <EllipsisTypography noWrap>{name}</EllipsisTypography>
        <EllipsisTypography sx={{ color: "gray", fontWeight: "500" }} noWrap>
          {artistName}
        </EllipsisTypography>
      </Box>
    </PlaylistItemContainer>
  );
};

export default PlaylistItem;

import { styled, Typography } from "@mui/material";
import React from "react";
import PlayButton from "./buttons/PlayButton";
const CardContainer = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100%",
  minWidth: "160px",
  padding: "12px",
  borderRadius: "8px",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    transform: "translate3d(0px,0px,0px)",
    transition: "opacity 0.3s ease-in-out",
  },
  "&:hover .overlay": {
    opacity: 1,
  },
}));

const AlbumImage = styled("img")({
  width: "100%",
  height: "auto",
  borderRadius: "8px",
  marginBottom: "8px",
});

const EllipsisTypography = styled(Typography)({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

const Overlay = styled("div")({
  position: "absolute",
  bottom: "20px",
  right: "8px",
  opacity: 0,
  transform: "translate3d(0px,0px,0px)",
  transition: "opacity 0.3s ease-in-out",
});
interface CardProps {
  name: string;
  image: string;
  artistName: string | undefined;
}

const Card = ({ image, name, artistName }: CardProps) => {
  return (
    <CardContainer>
      <div style={{ position: "relative", overflow: "hidden" }}>
        <AlbumImage src={image} alt="album-img" />
        <Overlay className="overlay">
          <PlayButton />
        </Overlay>
      </div>
      <EllipsisTypography variant="h2" marginBottom="4px">
        {name || "No name"}
      </EllipsisTypography>
      <EllipsisTypography variant="body1" color="text.secondary">
        {artistName || "No artist"}
      </EllipsisTypography>
    </CardContainer>
  );
};

export default Card;

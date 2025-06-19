import React from "react";
import { Box, Typography, styled, Avatar, IconButton } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import fallbackImage from "../../../common/assets/no-image.png";
import { GetPlaylistItemsResponse } from "../../../models/playlist";
import { isTrack } from "../../../utils/isTrack";

interface MobilePlaylistItemProps {
  item: GetPlaylistItemsResponse["items"][number];
  index: number;
}

const ItemContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(1.5),
  backgroundColor: "#181818",
  borderRadius: 8,
  marginBottom: theme.spacing(1),
}));

const InfoArea = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "12px",
});

const TitleText = styled(Typography)({
  fontWeight: 600,
  fontSize: "15px",
  color: "white",
});

const ArtistText = styled(Typography)({
  fontSize: "13px",
  color: "gray",
});

const MobilePlaylistItem = ({ item, index }: MobilePlaylistItemProps) => {
  if (!item.track || !isTrack(item.track)) return null;

  const track = item.track;

  return (
    <ItemContainer>
      <InfoArea>
        <Avatar
          src={track.album?.images?.[0]?.url || fallbackImage}
          variant="square"
          sx={{ width: 48, height: 48, borderRadius: 1 }}
        />
        <Box>
          <TitleText>{track.name || "No Title"}</TitleText>
          <ArtistText>
            {track.artists?.map((a) => a.name).join(", ")}
          </ArtistText>
        </Box>
      </InfoArea>
      {/* <IconButton>
        <MoreHorizIcon
          sx={{
            borderRadius: "50%",
            color: "white",
            "&:hover": {
              color: "#1ed760",
              backgroundColor: "#343434",
            },
          }}
        />
      </IconButton> */}
    </ItemContainer>
  );
};

export default MobilePlaylistItem;

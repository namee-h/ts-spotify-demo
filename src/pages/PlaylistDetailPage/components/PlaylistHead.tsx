import React from "react";
import { Box, Grid, Typography, styled } from "@mui/material";
import fallbackImage from "../../../common/assets/no-image.png";
import { GetPlaylistResponse } from "../../../models/playlist";

const HeadContainer = styled(Box)({
  padding: "20px 16px",
});

const PlaylistTitle = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  color: "white",
  lineHeight: 1.2,
  marginBottom: theme.spacing(2),
  fontSize: "25px",
  [theme.breakpoints.up("sm")]: {
    fontSize: "30px",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "35px",
  },
}));

const PlaylistMeta = styled(Typography)({
  fontWeight: 400,
});

const GraySpan = styled("span")({
  color: "gray",
});

const WhiteSpan = styled("span")({
  color: "white",
});

interface PlaylistHeadProps {
  playlist: GetPlaylistResponse;
}

const PlaylistHead = ({ playlist }: PlaylistHeadProps) => {
  const totalTracks = playlist.tracks?.total ?? 0;
  const durationMinutes = totalTracks * 3;
  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;

  return (
    <HeadContainer>
      <Grid container spacing={4} alignItems="flex-end">
        <Grid size={{ xs: 12, sm: 4, md: 3 }}>
          <Box
            component="img"
            src={playlist.images?.[0]?.url || fallbackImage}
            alt={playlist.name}
            sx={{
              width: "100%",
              aspectRatio: "1",
              objectFit: "cover",
              borderRadius: 2,
              boxShadow: 4,
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 8, md: 9 }}>
          <Typography
            variant="caption"
            color="white"
            fontWeight={500}
            sx={{ mb: 1 }}
          >
            {playlist.public ? "공개 플레이리스트" : "비공개"}
          </Typography>

          <PlaylistTitle variant="h2">{playlist.name}</PlaylistTitle>

          <PlaylistMeta variant="body1">
            <WhiteSpan>{playlist.owner?.display_name}</WhiteSpan>
            <GraySpan>
              {" · 저장 횟수: "}
              {playlist.followers?.total ?? "0"}회{" · "}
              {totalTracks}곡{" · 약 "}
              {hours}시간 {minutes}분
            </GraySpan>
          </PlaylistMeta>
        </Grid>
      </Grid>
    </HeadContainer>
  );
};

export default PlaylistHead;

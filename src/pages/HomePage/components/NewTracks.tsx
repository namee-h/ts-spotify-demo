import React from "react";
import useSearchItemsByKeyword from "../../../hooks/useSearchItemsByKeyword";
import { SEARCH_TYPE } from "../../../models/search";
import LoadingSpinner from "../../../common/components/loadingSpinner/LoadingSpinner";
import ErrorMessage from "../../../common/components/ErrorMessage";
import { Grid, Typography } from "@mui/material";
import AlbumCard from "../../../common/components/AlbumCard";
import fallbackImage from "../../../common/assets/no-image.png";

const NewTracks = () => {
  const { data, isLoading, error } = useSearchItemsByKeyword({
    q: "year:2025",
    type: [SEARCH_TYPE.Track],
    limit: 12,
    market: "KR",
  });
  //   console.log("new tracks:", data);
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }
  const tracks = data?.pages?.flatMap((page) => page.tracks?.items || []) ?? [];
  return (
    <div>
      <Typography variant="h1" paddingTop="8px" marginBottom="8px">
        🆕 최신 음악 🎧
      </Typography>

      {tracks && tracks.length > 0 ? (
        <Grid container spacing={2}>
          {tracks.map((track) => (
            <Grid size={{ xs: 6, sm: 4, md: 2 }} key={track.id}>
              <AlbumCard
                image={track.album?.images[0].url || fallbackImage}
                name={track.name || "Unknown"}
                artistName={track.artists?.[0].name}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h2">No data</Typography>
      )}
    </div>
  );
};

export default NewTracks;

import React from "react";
import useSearchItemsByKeyword from "../../../hooks/useSearchItemsByKeyword";
import { SEARCH_TYPE } from "../../../models/search";
import LoadingSpinner from "../../../common/components/loadingSpinner/LoadingSpinner";
import ErrorMessage from "../../../common/components/ErrorMessage";
import { Grid, Typography } from "@mui/material";
import AlbumCard from "../../../common/components/AlbumCard";
import fallbackImage from "../../../common/assets/no-image.png";

const OldTracks = () => {
  const { data, isLoading, error } = useSearchItemsByKeyword({
    q: "genre:k-pop year:2008",
    type: [SEARCH_TYPE.Track],
    limit: 6,
    market: "KR",
  });
  // console.log("old tracks:", data);
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
        90년생들을 위한 노래 🎧
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

export default OldTracks;

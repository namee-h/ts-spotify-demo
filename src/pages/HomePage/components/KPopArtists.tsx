import React from "react";
import useSearchItemsByKeyword from "../../../hooks/useSearchItemsByKeyword";
import { SEARCH_TYPE } from "../../../models/search";
import LoadingSpinner from "../../../common/components/loadingSpinner/LoadingSpinner";
import ErrorMessage from "../../../common/components/ErrorMessage";
import { Grid, Typography } from "@mui/material";
import ArtistCard from "../../../common/components/ArtistCard";
import fallbackImage from "../../../common/assets/no-image.png";

const KPopArtists = () => {
  const { data, isLoading, error } = useSearchItemsByKeyword({
    q: "genre:k-pop",
    type: [SEARCH_TYPE.Artist],
    limit: 6,
    market: "KR",
  });
  console.log("K-pop artists:", data);
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }
  const artists =
    data?.pages?.flatMap((page) => page.artists?.items || []) ?? [];
  return (
    <div>
      <Typography variant="h1" paddingTop="8px" marginBottom="8px">
        K-Pop 아티스트 🧑‍🎤
      </Typography>

      {artists && artists.length > 0 ? (
        <Grid container spacing={2}>
          {artists.map((artist) => (
            <Grid size={{ xs: 6, sm: 4, md: 2 }} key={artist.id}>
              <ArtistCard
                image={artist.images?.[0].url || fallbackImage}
                name={artist.name || "Unknown"}
                artistName={artist?.name}
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

export default KPopArtists;

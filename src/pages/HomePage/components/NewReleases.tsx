import React from "react";
import Typography from "@mui/material/Typography";
import useGetNewReleases from "../../../hooks/useGetNewReleases";
import LoadingSpinner from "../../../common/components/loadingSpinner/LoadingSpinner";
import ErrorMessage from "../../../common/components/ErrorMessage";
import { Grid } from "@mui/material";
import AlbumCard from "../../../common/components/AlbumCard";

const NewReleases = () => {
  const { data, error, isLoading } = useGetNewReleases();
  console.log("ddd", data);
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }
  return (
    <div>
      <Typography variant="h1" paddingTop="8px" marginBottom="8px">
        🆕 최신 앨범 💿
      </Typography>
      {data && data.albums.items.length > 0 ? (
        <Grid container spacing={2}>
          {data.albums.items.map((album) => (
            <Grid size={{ xs: 6, sm: 4, md: 2 }} key={album.id}>
              <AlbumCard
                image={album.images[0].url}
                name={album.name}
                artistName={album.artists[0].name}
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

export default NewReleases;

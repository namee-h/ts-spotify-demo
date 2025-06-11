import React, { useEffect } from "react";
import useGetPlaylist from "../../hooks/useGetPlaylist";
import { Navigate, useParams } from "react-router";
import PlaylistHead from "./components/PlaylistHead";
import { Box, styled, Typography } from "@mui/material";
import useGetPlaylistItems from "../../hooks/useGetPlaylistItems";
import LoadingSpinner from "../../common/components/loadingSpinner/LoadingSpinner";
import ErrorMessage from "../../common/components/ErrorMessage";
import PlaylistItem from "./components/PlaylistItem";
import { PAGE_LIMIT } from "../../configs/commonConfig";
import { useInView } from "react-intersection-observer";

const PlaylistDetailContainer = styled(Box)({
  position: "relative",
  overflowX: "hidden",
  width: "100%",
  borderTopLeftRadius: "8px",
  borderTopRightRadius: "8px",
  marginTop: "20px",
});

const PlaylistDetailPage = () => {
  const [scrolled, setScrolled] = React.useState(false);
  const { id } = useParams<{ id: string }>();

  const {
    data: playlist,
    isLoading: isPlaylistLoading,
    error: playlistError,
  } = useGetPlaylist({ playlist_id: id! });
  // console.log("playlist-detail", playlist);

  const {
    data: playlistItems,
    isLoading: isPlaylistItemsLoading,
    error: playlistItemsError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetPlaylistItems({ playlist_id: id!, limit: PAGE_LIMIT });
  console.log("playlist-item", playlistItems);
  const { ref, inView } = useInView();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [id]);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);
  if (!id) {
    return <Navigate to="/" />;
  }
  if (isPlaylistLoading || isPlaylistItemsLoading) return <LoadingSpinner />;
  if (playlistError)
    return <ErrorMessage errorMessage={playlistError.message} />;
  if (playlistItemsError)
    return <ErrorMessage errorMessage={playlistItemsError.message} />;
  return (
    <PlaylistDetailContainer>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "350px",
          background: "linear-gradient(to bottom,rgb(50, 168, 115), #121212)",
          zIndex: 0,
        }}
      />

      <Box sx={{ position: "relative", zIndex: 1, padding: "32px" }}>
        {playlist && <PlaylistHead playlist={playlist} />}
        {playlist?.tracks?.total === 0 ? (
          <Typography>search</Typography>
        ) : (
          <Box>
            {playlistItems && <PlaylistItem playlistItems={playlistItems} />}
            {isFetchingNextPage ? (
              <div
                ref={ref}
                className="loader"
                style={{ margin: "32px auto", display: "block" }}
              />
            ) : (
              <div ref={ref} />
            )}
          </Box>
        )}
      </Box>
    </PlaylistDetailContainer>
  );
};

export default PlaylistDetailPage;

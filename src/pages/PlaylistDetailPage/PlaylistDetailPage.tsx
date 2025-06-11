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
  width: "100%",
  height: "100vh",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  marginTop: "20px",
});

const PlaylistHeadWrapper = styled(Box)({
  position: "relative",
  zIndex: 1,
  padding: "32px",
  flexShrink: 0,
});

const ScrollableContent = styled(Box)({
  flex: 1,
  overflowY: "auto",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },
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
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          width: "100%",
          height: "350px",
          background: "linear-gradient(to bottom,rgb(50, 168, 115), #121212)",
          zIndex: 0,
        }}
      />

      <PlaylistHeadWrapper>
        {playlist && <PlaylistHead playlist={playlist} />}
      </PlaylistHeadWrapper>

      <ScrollableContent>
        {playlist?.tracks?.total === 0 ? (
          <Typography>search</Typography>
        ) : (
          <Box>
            {playlistItems && <PlaylistItem playlistItems={playlistItems} />}
            {isFetchingNextPage ? (
              <Box
                ref={ref}
                className="loader"
                sx={{
                  height: "40px",
                  display: "block",
                  margin: "32px auto",
                }}
              />
            ) : (
              <Box
                ref={ref}
                sx={{
                  height: "40px",
                }}
              />
            )}
          </Box>
        )}
      </ScrollableContent>
    </PlaylistDetailContainer>
  );
};

export default PlaylistDetailPage;

import React, { useEffect } from "react";
import useGetPlaylist from "../../hooks/useGetPlaylist";
import { Navigate, useParams } from "react-router";
import PlaylistHead from "./components/PlaylistHead";
import { Box, styled } from "@mui/material";
import useGetPlaylistItems from "../../hooks/useGetPlaylistItems";
import LoadingSpinner from "../../common/components/loadingSpinner/LoadingSpinner";
import ErrorMessage from "../../common/components/ErrorMessage";
import PlaylistItem from "./components/PlaylistItem";
import { PAGE_LIMIT } from "../../configs/commonConfig";
import { useInView } from "react-intersection-observer";
import { AxiosError } from "axios";
import EmptyPlaylistWithSearch from "./components/EmptyPlaylistWithSearch";
import UnauthorizedMessage from "../../common/components/UnauthorizeMessage";

function isAxiosError(error: unknown): error is AxiosError {
  return (error as AxiosError)?.isAxiosError === true;
}

const PlaylistDetailContainer = styled(Box)({
  position: "relative",
  width: "100%",
  height: "100dvh",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  marginTop: "20px",
  padding: "40px 0px",
});

const PlaylistHeadWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: 1,
  padding: "10px",
  flexShrink: 0,
  maxHeight: "270px",

  [theme.breakpoints.down("sm")]: {
    maxHeight: "none",
  },
}));

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
  // console.log("playlist-item", playlistItems);
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

  if (playlistError || playlistItemsError) {
    // console.log("🔴 playlistError:", playlistError);
    // console.log("🔴 playlistItemsError:", playlistItemsError);
    if (
      (isAxiosError(playlistError) && playlistError.response?.status === 401) ||
      (isAxiosError(playlistItemsError) &&
        playlistItemsError.response?.status === 401)
    ) {
      return <UnauthorizedMessage />;
    }

    return <ErrorMessage errorMessage="Fail to Load" />;
  }

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
          height: "270px",
          background: "linear-gradient(to bottom,rgb(50, 168, 115), #121212)",
          zIndex: 0,
        }}
      />

      <PlaylistHeadWrapper sx={{ flex: "0 0 auto" }}>
        {playlist && <PlaylistHead playlist={playlist} />}
      </PlaylistHeadWrapper>

      <ScrollableContent sx={{ flex: "1 1 auto" }}>
        {playlist?.tracks?.total === 0 ? (
          // 플레이리스트 아이템 없을 때
          <EmptyPlaylistWithSearch />
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

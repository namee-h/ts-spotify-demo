import React, { useEffect } from "react";
import useGetCurrentUserPlaylists from "../../hooks/useGetCurrentUserPlaylists";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import EmptyPlaylist from "../../layout/components/EmptyPlaylist";
import { Box, styled } from "@mui/material";
import LibraryHead from "../../layout/components/LibraryHead";
import Playlists from "../../layout/components/Playlists";
import LoadingSpinner from "../../common/components/loadingSpinner/LoadingSpinner";
import ErrorMessage from "../../common/components/ErrorMessage";
import { useInView } from "react-intersection-observer";
import UnauthorizedMessage from "../../common/components/UnauthorizeMessage";

const LibraryContainer = styled("div")({
  height: "100%",
  overflowY: "auto",
  scrollbarWidth: "none", // Firefox
  "&::-webkit-scrollbar": {
    display: "none", // Chrome, Safari
  },
});

const PlaylistContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  paddingBottom: "60px",
});

const PlaylistPage = () => {
  const { ref, inView } = useInView();
  const {
    data,
    isLoading,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetCurrentUserPlaylists({
    limit: 15,
    offset: 0,
  });

  const { data: user } = useGetCurrentUserProfile();
  // console.log("mobile playlist:", data);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (!user) return <UnauthorizedMessage />;
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage errorMessage={error.message} />;
  return (
    <LibraryContainer style={{ height: "100%", overflowY: "auto" }}>
      <LibraryHead />
      {!data || data?.pages[0].total === 0 ? (
        <EmptyPlaylist />
      ) : (
        <PlaylistContainer>
          {data?.pages.map((page, index) => (
            <Playlists playlists={page.items} key={index} />
          ))}
          {isFetchingNextPage ? (
            <div ref={ref} className="loader" style={{ margin: "16px auto" }} />
          ) : (
            <div ref={ref} />
          )}
        </PlaylistContainer>
      )}
    </LibraryContainer>
  );
};

export default PlaylistPage;

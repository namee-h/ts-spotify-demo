import React from "react";
import { useParams } from "react-router-dom";
import useSearchItemsByKeyword from "../../hooks/useSearchItemsByKeyword";
import {
  Box,
  Typography,
  Grid,
  styled,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { SEARCH_TYPE } from "../../models/search";
import AlbumCard from "../../common/components/AlbumCard";
import TrackListItem from "../../common/components/TrackListItem";
import ArtistCard from "../../common/components/ArtistCard";
import LoadingSpinner from "../../common/components/loadingSpinner/LoadingSpinner";

const SearchResultContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  position: "relative",
  height: "100dvh",
  overflow: "hidden",
  marginTop: "20px",
  background: "linear-gradient(to bottom,rgb(53, 53, 53) 0%, #121212 100%)",
  borderRadius: "8px",
  maxWidth: "100%",
  "@media (max-width: 320px)": {
    padding: "15px",
  },
});

const ScrollableContainer = styled(Box)({
  overflowY: "auto",
  scrollbarWidth: "none", // Firefox
  msOverflowStyle: "none", // IE & Edge
  "&::-webkit-scrollbar": {
    display: "none", // Chrome, Safari
  },
});

const SearchTrackListContainer = styled(Box)({
  backgroundColor: "#181818",
  padding: "8px",
  borderRadius: "8px",
  maxHeight: "270px",
  overflowX: "hidden",
  overflowY: "auto",
  pr: 1,
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },
});
const BackgroundPaper = styled(Box)({
  backgroundColor: "#181818",
  padding: "8px",
  borderRadius: "8px",
});

const ResponsiveTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(3),
  fontSize: "2rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.25rem",
  },
}));

// 섹션 제목 (상위 결과, 노래, 아티스트, 앨범)
const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.25rem",
  fontWeight: 500,
  marginBottom: theme.spacing(1),
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
  },
}));

// 본문 텍스트
const ResponsiveBody = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.875rem",
  },
}));

const SearchWithKeywordPage = () => {
  const { keyword } = useParams<{ keyword: string }>();

  const { data, isLoading } = useSearchItemsByKeyword({
    q: keyword ?? "",
    type: [SEARCH_TYPE.Track, SEARCH_TYPE.Album, SEARCH_TYPE.Artist],
    limit: 10,
  });
  const tracks = data?.pages.flatMap((page) => page.tracks?.items || []) || [];
  const artists =
    data?.pages.flatMap((page) => page.artists?.items || []) || [];
  const albums = data?.pages.flatMap((page) => page.albums?.items || []) || [];

  const noResult =
    tracks.length === 0 && artists.length === 0 && albums.length === 0;
  const theme = useTheme();
  const isXl = useMediaQuery(theme.breakpoints.up("xl"));
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));

  let visibleCount = 4;
  if (isXl) visibleCount = 6;
  else if (isLg) visibleCount = 6;
  else if (isMd) visibleCount = 6;

  if (isLoading) return <LoadingSpinner />;

  return (
    <SearchResultContainer p={3}>
      <ResponsiveTitle>"{keyword}" 검색 결과</ResponsiveTitle>
      {noResult ? (
        <ResponsiveBody variant="body1">
          검색어에 해당하는 결과값이 존재하지 않습니다.
        </ResponsiveBody>
      ) : (
        <ScrollableContainer>
          <Grid container spacing={2} mb={5}>
            <Grid size={{ xs: 12, md: 4 }}>
              <SectionTitle variant="h6" gutterBottom>
                상위 결과
              </SectionTitle>

              {tracks[0] ? (
                <BackgroundPaper>
                  <Box
                    sx={{
                      width: "195px",
                      [theme.breakpoints.down("sm")]: {
                        margin: "0 auto",
                      },
                      "@media (max-width: 320px)": {
                        width: "160px",
                      },
                    }}
                  >
                    <AlbumCard
                      image={tracks[0].album?.images?.[0]?.url || ""}
                      name={tracks[0].name || "Unknown"}
                      artistName={tracks[0].artists?.[0]?.name || "Unknown"}
                    />
                  </Box>
                </BackgroundPaper>
              ) : (
                <ResponsiveBody variant="body1" color="text.secondary">
                  상위 결과가 없습니다.
                </ResponsiveBody>
              )}
            </Grid>

            <Grid size={{ xs: 12, md: 8 }}>
              <SectionTitle variant="h6" gutterBottom>
                노래
              </SectionTitle>
              {tracks.length > 0 ? (
                <SearchTrackListContainer>
                  {tracks.map((track) => (
                    <TrackListItem key={track.id} track={track} />
                  ))}
                </SearchTrackListContainer>
              ) : (
                <ResponsiveBody variant="body1" color="text.secondary">
                  노래 결과가 없습니다.
                </ResponsiveBody>
              )}
            </Grid>
          </Grid>

          {/* Artists */}
          <Box mb={5} sx={{ width: "100%" }}>
            <SectionTitle variant="h6" gutterBottom>
              아티스트
            </SectionTitle>
            {artists.length > 0 ? (
              <Grid container>
                {artists.slice(0, visibleCount).map((artist) => (
                  <Grid key={artist.id} size={{ xs: 12, sm: 6, md: 3, lg: 2 }}>
                    <BackgroundPaper sx={{ borderRadius: 0 }}>
                      <ArtistCard
                        image={artist.images?.[0]?.url || ""}
                        name={artist.name || "Unknown"}
                        artistName={"Artist"}
                      />
                    </BackgroundPaper>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <ResponsiveBody variant="body1" color="text.secondary">
                아티스트 결과가 없습니다.
              </ResponsiveBody>
            )}
          </Box>

          {/* Albums */}
          <Box>
            <SectionTitle variant="h6" gutterBottom>
              앨범
            </SectionTitle>
            {albums.length > 0 ? (
              <Grid container>
                {albums.slice(0, visibleCount).map((album) => (
                  <Grid key={album.id} size={{ xs: 12, sm: 6, md: 3, lg: 2 }}>
                    <BackgroundPaper sx={{ borderRadius: 0 }}>
                      <AlbumCard
                        image={album.images?.[0]?.url || ""}
                        name={album.name || "Unknown"}
                        artistName={album.artists?.[0]?.name || "Unknown"}
                      />
                    </BackgroundPaper>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <ResponsiveBody variant="body1" color="text.secondary">
                앨범 결과가 없습니다.
              </ResponsiveBody>
            )}
          </Box>
        </ScrollableContainer>
      )}
    </SearchResultContainer>
  );
};

export default SearchWithKeywordPage;

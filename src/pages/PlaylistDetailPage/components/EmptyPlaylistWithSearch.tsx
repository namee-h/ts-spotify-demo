import {
  Box,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useSearchItemsByKeyword from "../../../hooks/useSearchItemsByKeyword";
import { SEARCH_TYPE } from "../../../models/search";
import SearchResultList from "./SearchResultList";
import SearchIcon from "@mui/icons-material/Search";
import { useInView } from "react-intersection-observer";
import ErrorMessage from "../../../common/components/ErrorMessage";

const EmptyPlaylistWithSearch = () => {
  const [keyword, setKeyword] = useState<string>("");
  const { ref, inView } = useInView();
  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSearchItemsByKeyword({
    q: keyword,
    type: [SEARCH_TYPE.Track],
  });
  console.log("search-data:", data);
  const handleSearchKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);
  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="start"
      justifyContent="start"
      p={2}
      position="relative"
    >
      <Stack>
        <Typography variant="h5" fontWeight={600} mb={2}>
          아직 플레이리스트에 노래가 없어요
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={2}>
          마음에 드는 곡을 검색해서 추가해보세요
        </Typography>
      </Stack>
      <Paper
        elevation={3}
        sx={{
          p: 2,
          width: "100%",
          maxWidth: 400,
          borderRadius: "8px",
          mb: "10px",
        }}
      >
        <TextField
          fullWidth
          value={keyword}
          placeholder="노래를 검색해주세요"
          onChange={handleSearchKeyword}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#1ed760" }} />
                </InputAdornment>
              ),
            },
          }}
        />
      </Paper>

      {keyword.trim() === "" && <></>}

      {keyword.trim() !== "" && isLoading && (
        <Box mt={4} display="flex" justifyContent="center" width="100%">
          <div className="loader" />
        </Box>
      )}
      {keyword.trim() !== "" &&
        !isLoading &&
        data?.pages.every((item) => item.tracks?.items.length === 0) && (
          <Paper
            elevation={3}
            sx={{
              my: 2,
              p: 2,
              width: "100%",
              maxWidth: 400,
              borderRadius: "8px",
            }}
          >
            <Typography sx={{ color: "white" }}>
              ❌ 해당 검색어와 일치하는 결과가 없습니다 : {keyword}
            </Typography>
          </Paper>
        )}

      {keyword.trim() !== "" &&
        !isLoading &&
        data?.pages.map((item) => {
          if (!item.tracks) return false;
          return <SearchResultList list={item.tracks?.items} />;
        })}

      {keyword.trim() !== "" && <Box ref={ref} sx={{ height: "40px" }} />}

      {isFetchingNextPage && (
        <Box mt={2} display="flex" justifyContent="center" width="100%">
          <div className="loader" />
        </Box>
      )}
    </Box>
  );
};

export default EmptyPlaylistWithSearch;

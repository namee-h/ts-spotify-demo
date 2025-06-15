import React from "react";
import { TextField, InputAdornment, Paper, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchInputProps {
  keyword: string;
  onChange: (value: string) => void;
}

const StyledSearchWrapper = styled(Paper)(({ theme }) => ({
  position: "relative",
  padding: theme.spacing(2),
  maxWidth: 495,
  margin: "0 auto",
  borderRadius: theme.spacing(1),
}));

const SearchInput = ({ keyword, onChange }: SearchInputProps) => {
  return (
    <StyledSearchWrapper elevation={3}>
      <TextField
        fullWidth
        value={keyword}
        placeholder="노래를 검색해주세요"
        onChange={(e) => onChange(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "#1ed760" }} />
            </InputAdornment>
          ),
        }}
      />
    </StyledSearchWrapper>
  );
};

export default SearchInput;

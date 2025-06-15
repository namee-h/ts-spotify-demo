import React, { KeyboardEvent } from "react";
import { TextField, InputAdornment, Paper, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && keyword.trim()) {
      navigate(`/search/${encodeURIComponent(keyword.trim())}`);
    }
  };

  return (
    <StyledSearchWrapper elevation={3}>
      <TextField
        fullWidth
        value={keyword}
        placeholder="노래를 검색해주세요"
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
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

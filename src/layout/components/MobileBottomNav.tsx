import React, { useState } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Snackbar,
  Alert,
  styled,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import { useLocation, useNavigate } from "react-router";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";

const StyledBottomNavigationAction = styled(BottomNavigationAction)(
  ({ theme }) => ({
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    "& .MuiBottomNavigationAction-label": {
      marginTop: theme.spacing(0.8), // 아이콘과 텍스트 사이 간격
      fontSize: "0.75rem",
    },
  })
);

const MobileBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: user } = useGetCurrentUserProfile();
  const isLoggedIn = !!user;

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const currentPath = location.pathname;
  const getValue = () => {
    if (currentPath === "/") return "home";
    if (currentPath.startsWith("/search")) return "search";
    if (currentPath.startsWith("/playlist")) return "library";
    return "";
  };

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    if (newValue === "home") {
      navigate("/");
    } else if (newValue === "search") {
      navigate("/search");
    } else if (newValue === "library") {
      if (isLoggedIn) {
        navigate("/playlist");
      } else {
        setSnackbarOpen(true);
      }
    }
  };

  return (
    <>
      <Paper
        sx={{
          display: { xs: "block", sm: "none" },
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
          marginX: "8px",
          marginBottom: "8px",
          borderBottomLeftRadius: "16px",
          borderBottomRightRadius: "16px",
          overflow: "hidden",
        }}
        elevation={3}
      >
        <BottomNavigation
          value={getValue()}
          onChange={handleChange}
          showLabels
          sx={{
            borderBottomLeftRadius: "16px",
            borderBottomRightRadius: "16px",
          }}
        >
          <StyledBottomNavigationAction
            label="Home"
            value="home"
            icon={<HomeIcon />}
          />
          <StyledBottomNavigationAction
            label="Search"
            value="search"
            icon={<SearchIcon />}
          />
          <StyledBottomNavigationAction
            label="Your Library"
            value="library"
            icon={<LibraryMusicIcon />}
          />
        </BottomNavigation>
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="warning"
          sx={{
            width: "100%",
            fontSize: "1.1rem",
            fontWeight: 600,
            padding: "16px",
            borderRadius: "8px",
            border: "1px dashed white",
          }}
        >
          로그인 후 이용 가능합니다.
        </Alert>
      </Snackbar>
    </>
  );
};

export default MobileBottomNav;

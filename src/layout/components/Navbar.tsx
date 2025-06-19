import React, { useState } from "react";
import { Avatar, Box, styled } from "@mui/material";
import LoginButton from "../../common/components/buttons/LoginButton";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import LogoutIcon from "@mui/icons-material/Logout";
import { useLocation } from "react-router";
import SearchInput from "../../common/components/SearchInput";
import BackButton from "../../common/components/buttons/BackButton";

const ProfileContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  borderRadius: "8px",
  gap: "20px",
  [theme.breakpoints.down("sm")]: {
    gap: "10px",
  },
}));

const Navbar = () => {
  const { data: userProfile } = useGetCurrentUserProfile();
  console.log("user_profile data:", userProfile);
  const location = useLocation();
  const isSearchPage = location.pathname.startsWith("/search");
  const isPlaylistPage = location.pathname.startsWith("/playlist");
  const [keyword, setKeyword] = useState<string>("");

  const logout = () => {
    localStorage.removeItem("access_token");
    window.location.reload();
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isSearchPage
          ? "space-between"
          : isPlaylistPage
          ? { xs: "space-between", sm: "flex-end" }
          : "flex-end",
        alignItems: "center",
        height: "64px",
        gap: "10px",
      }}
    >
      {isSearchPage && (
        <Box width="450px">
          <SearchInput keyword={keyword} onChange={setKeyword} />
        </Box>
      )}
      {isPlaylistPage && (
        <Box sx={{ display: { xs: "block", sm: "none" } }}>
          <BackButton />
        </Box>
      )}
      {userProfile ? (
        <ProfileContainer>
          <Avatar
            src={userProfile.images?.[0]?.url}
            alt={userProfile.display_name || "user"}
            sx={{ width: 40, height: 40 }}
          >
            {userProfile.display_name?.[0] ?? "U"}
          </Avatar>

          <LogoutIcon
            sx={{
              color: "#444",
              cursor: "pointer",
              transition: "color 0.2s",
              "&:hover": {
                color: "#fff",
              },
            }}
            onClick={logout}
          />
        </ProfileContainer>
      ) : (
        <LoginButton />
      )}
    </Box>
  );
};

export default Navbar;

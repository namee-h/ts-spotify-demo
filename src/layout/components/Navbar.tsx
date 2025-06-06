import React from "react";
import { Avatar, Box, styled } from "@mui/material";
import LoginButton from "../../common/components/buttons/LoginButton";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import LogoutIcon from "@mui/icons-material/Logout";

const ProfileContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  borderRadius: "8px",
  gap: "20px",
});

const Navbar = () => {
  const { data: userProfile } = useGetCurrentUserProfile();
  console.log("user_profile data:", userProfile);
  const logout = () => {
    localStorage.removeItem("access_token");
    window.location.reload(); // or navigate to login page
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        height: "64px",
      }}
    >
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

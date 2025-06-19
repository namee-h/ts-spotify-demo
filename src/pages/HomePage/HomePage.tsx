import React from "react";
import NewReleases from "./components/NewReleases";
import OldTracks from "./components/OldTracks";
import NewTracks from "./components/NewTracks";
import HipsterAlbums from "./components/HipsterAlbums";
import KPopArtists from "./components/KPopArtists";

const HomePage = () => {
  return (
    <div style={{ maxHeight: "100dvh", overflowY: "auto" }}>
      <NewReleases />
      <NewTracks />
      <KPopArtists />
      <OldTracks />
      <HipsterAlbums />
    </div>
  );
};

export default HomePage;

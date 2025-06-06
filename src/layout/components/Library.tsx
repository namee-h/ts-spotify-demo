import React from "react";
import EmptyPlaylist from "./EmptyPlaylist";
import useGetCurrentUserPlaylists from "../../hooks/useGetCurrentUserPlaylists";
import Playlists from "./Playlists";

const Library = () => {
  const { data } = useGetCurrentUserPlaylists({
    limit: 10,
    offset: 0,
  });
  console.log("playlists:", data);
  return (
    <div>
      {!data || data?.total === 0 ? (
        <EmptyPlaylist />
      ) : (
        <Playlists key={1} playlists={data.items} />
      )}
    </div>
  );
};

export default Library;

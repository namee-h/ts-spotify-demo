import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddTrackToPlaylistRequest } from "../models/playlist";
import { addTrackToPlaylist } from "../apis/playlistApi";
import { useParams } from "react-router";

const useAddTrackToPlaylist = () => {
  const queryClient = useQueryClient();
  const { id: playlist_id } = useParams<{ id: string }>();
  return useMutation({
    mutationFn: (params: AddTrackToPlaylistRequest) => {
      if (!playlist_id) throw new Error("playlist_id is missing");
      return addTrackToPlaylist(playlist_id, params);
    },
    onSuccess: () => {
      console.log("트랙 추가 성공");
      queryClient.invalidateQueries({
        queryKey: ["playlist-detail", playlist_id],
      });
      queryClient.invalidateQueries({
        queryKey: ["playlist-items", playlist_id],
      });
      queryClient.invalidateQueries({
        queryKey: ["current-user-playlists"],
      });
    },
  });
};

export default useAddTrackToPlaylist;

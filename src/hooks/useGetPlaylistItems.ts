import { useInfiniteQuery } from "@tanstack/react-query";
import { GetPlaylistItemsRequest } from "../models/playlist";
import { getPlaylistItems } from "../apis/playlistApi";

const useGetPlaylistItems = (params: GetPlaylistItemsRequest) => {
  return useInfiniteQuery({
    queryKey: ["playlist-items", params.playlist_id],
    queryFn: ({ pageParam }) => {
      return getPlaylistItems({ offset: pageParam, ...params });
    },
    retry: false,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        const nextOffset = url.searchParams.get("offset");
        return nextOffset ? parseInt(nextOffset) : undefined;
      }
      return undefined;
    },
  });
};

export default useGetPlaylistItems;

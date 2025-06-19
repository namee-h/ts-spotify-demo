import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { GetPlaylistItemsResponse } from "../../../models/playlist";
import { InfiniteData } from "@tanstack/react-query";
import DesktopPlaylistItem from "./DesktopPlaylistItem";
import MobilePlaylistItem from "./MobilePlaylistItem";

interface PlaylistItemProps {
  playlistItems: InfiniteData<GetPlaylistItemsResponse, unknown>;
}

const PlaylistItem = ({ playlistItems }: PlaylistItemProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (isMobile) {
    // 모바일 뷰
    return (
      <Box>
        {playlistItems.pages.flatMap((page, pageIndex) =>
          page.items.map((item, itemIndex) => {
            const previousItemCount = playlistItems.pages
              .slice(0, pageIndex)
              .reduce((sum, p) => sum + p.items.length, 0);
            const index = previousItemCount + itemIndex;
            return (
              <MobilePlaylistItem
                key={`${pageIndex}-${itemIndex}`}
                item={item}
                index={index}
              />
            );
          })
        )}
      </Box>
    );
  }

  // 데스크탑 뷰
  return (
    <Box sx={{ height: "100%", overflowY: "auto", position: "relative" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>제목</TableCell>
            <TableCell>앨범</TableCell>
            <TableCell>날짜</TableCell>
            <TableCell>재생 시간</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {playlistItems.pages.flatMap((page, pageIndex) =>
            page.items.map((item, itemIndex) => {
              const previousItemCount = playlistItems.pages
                .slice(0, pageIndex)
                .reduce((sum, p) => sum + p.items.length, 0);
              const index = previousItemCount + itemIndex;
              return (
                <DesktopPlaylistItem
                  key={`${pageIndex}-${itemIndex}`}
                  item={item}
                  index={index}
                />
              );
            })
          )}
        </TableBody>
      </Table>
    </Box>
  );
};

export default PlaylistItem;

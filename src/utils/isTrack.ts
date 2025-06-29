import { Episode } from "../models/episode";
import { Track } from "../models/track";

export function isTrack(item: Track | Episode | undefined): item is Track {
  return !!item && item.type === "track";
}

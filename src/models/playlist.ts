import { SimplifiedAlbum } from "./album";
import { ApiResponse } from "./apiResponse";
import { Artist } from "./artist";
import {
  Copyrights,
  externalIds,
  ExternalUrls,
  Followers,
  Image,
  Owner,
  Restrictions,
} from "./commonType";

export interface GetCurrentUserPlaylistRequest {
  limit?: number;
  offset?: number;
}

export type GetCurrentUserPlaylistResponse = ApiResponse<SimplifiedPlaylist>;
// SimplifiedPlaylist tracks
// Playlist tracks

export interface BasePlaylist {
  collaborative?: boolean;
  description?: string | null;
  external_urls?: ExternalUrls;
  href?: string;
  id?: string;
  images?: Image[];
  name?: string;
  owner?: Owner;
  public?: boolean;
  snapshot_id?: string;
  type?: "playlist";
  uri?: string;
}
export interface SimplifiedPlaylist extends BasePlaylist {
  tracks?: {
    href?: string;
    total?: number;
  };
}

export interface GetPlaylistResponse extends BasePlaylist {
  tracks: ApiResponse<PlaylistTrack>;
  followers: Followers;
}
export interface GetPlaylistRequest {
  playlist_id: string;
  market?: string;
  fields?: string;
  additional_types?: string;
}

export interface PlaylistTrack {
  added_at?: string;
  added_by?: {
    external_urls?: ExternalUrls;
    href?: string;
    id?: string;
    type?: string;
    uri?: string;
  };
  is_local?: boolean;
  track?: TrackObject | EpisodeObject;
  type?: string;
  uri?: string;
}

interface TrackObject {
  album?: SimplifiedAlbum;
  artists?: Artist[];
  available_markets?: string[];
  disc_number?: number;
  duration_ms?: number;
  explicit?: boolean;
  external_ids?: externalIds;
  external_urls?: ExternalUrls;
  href?: string;
  id?: string;
  is_playable?: boolean;
  linked_from?: {};
  restrictions?: Restrictions;
  name?: string;
  popularity?: number;
  preview_url?:
    | string
    | null /** @deprecated This field is deprecated by Spotify */;
  track_number?: number;
  type?: "track";
  uri?: string;
  is_local?: boolean;
}

interface EpisodeObject {
  audio_preview_url:
    | string
    | null /** @deprecated This field is deprecated by Spotify */;
  description: string;
  html_description: string;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  is_externally_hosted: boolean;
  is_playable: boolean;
  language?: string /** @deprecated This field is deprecated by Spotify */;
  languages: string[];
  name: string;
  release_date: string;
  release_date_precision: string;
  resume_point?: {
    fully_played?: boolean;
    resume_position_ms?: number;
  };
  type: "episode";
  uri: string;
  restrictions?: Restrictions;
  show: {
    available_markets: string[];
    copyrights: Copyrights[];
    description: string;
    html_description: string;
    explicit: boolean;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    is_externally_hosted: boolean;
    languages: string[];
    media_type: string;
    name: string;
    publisher: string;
    type: "show";
    uri: string;
    total_episodes: number;
  };
}

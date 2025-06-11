import { SimplifiedAlbum } from "./album";
import { Artist } from "./artist";
import {
  Copyrights,
  ExternalIds,
  ExternalUrls,
  Image,
  Restrictions,
} from "./commonType";

export interface PlaylistTrack {
  added_at?: string | null;
  added_by?: {
    external_urls?: ExternalUrls;
    href?: string;
    id?: string;
    type?: string;
    uri?: string;
  } | null;
  is_local?: boolean;
  track?: Track | Episode;
  type?: string;
  uri?: string;
}

export interface Track {
  album?: SimplifiedAlbum;
  artists?: Artist[];
  available_markets?: string[];
  disc_number?: number;
  duration_ms?: number;
  explicit?: boolean;
  external_ids?: ExternalIds;
  external_urls?: ExternalUrls;
  href?: string;
  id?: string;
  is_playable?: boolean;
  linked_from?: Track;
  restrictions?: Restrictions;
  name?: string;
  popularity?: number;
  //   preview_url?:
  //     | string
  //     | null /** @deprecated This field is deprecated by Spotify */;
  track_number?: number;
  type?: "track";
  uri?: string;
  is_local?: boolean;
}

export interface Episode {
  //   audio_preview_url:
  //     | string
  //     | null /** @deprecated This field is deprecated by Spotify */;
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
  //   language?: string /** @deprecated This field is deprecated by Spotify */;
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
  show: Show;
}

interface Show {
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
}

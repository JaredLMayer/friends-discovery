// pages/api/stats/tracks.js

import { recentlyPlayed } from "../../../lib/spotify";

export default async function handler(req, res) {
  const response = await recentlyPlayed();
  const { items } = await response.json();

  const tracks = items.slice(0, 50).map(({track}) => {
    return {
      title: track.name,
      trackId: track.id,
      trackUri: track.uri,
      albumName: track.album.name,
      albumId: track.album.id,
      albumUri: track.album.uri
    }
  });
  
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=86400, stale-while-revalidate=43200"
  );

  return res.status(200).json(tracks);
}
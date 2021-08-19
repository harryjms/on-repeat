import axios from "axios";
import React, { useEffect, useState } from "react";

const SpotifyHomepage = () => {
  const [loadingTracks, setLoadingTracks] = useState(true);
  const [tracks, setTracks] = useState<Spotify.TopTracks[]>([]);

  const getData = async () => {
    try {
      const { data } = await axios.get("/api/spotify/me/top/tracks");
      setTracks(data.items);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingTracks(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <main>
      <h1>Your Top Tracks</h1>
      {loadingTracks ? (
        "Loading..."
      ) : (
        <ul className="grid grid-cols-3 gap-4">
          {tracks.map((track) => (
            <li key={track.id} className="flex">
              <div className="w-1/3 mr-4">
                <img src={track.album.images[0].url} className="artwork" />
              </div>
              <div className="w-2/3 flex flex-col">
                <div className="font-bold text-sm">
                  {track.artists.map((a) => a.name).join(", ")}
                </div>
                <div className="text-xl">{track.name}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default SpotifyHomepage;

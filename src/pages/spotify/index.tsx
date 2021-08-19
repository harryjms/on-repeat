import axios from "axios";
import React, { useEffect, useState } from "react";
import Track from "../../components/Track";

const SpotifyHomepage = () => {
  const [loadingTracks, setLoadingTracks] = useState(true);
  const [tracks, setTracks] = useState<Spotify.Track[]>([]);

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
            <li key={track.id}>
              <Track track={track} withPreview />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default SpotifyHomepage;

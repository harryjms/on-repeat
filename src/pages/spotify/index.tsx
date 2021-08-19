import axios from "axios";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import Track from "../../components/Track";

const SpotifyHomepage = () => {
  const [loadingTracks, setLoadingTracks] = useState(true);
  const [tracks, setTracks] = useState<Spotify.Track[]>([]);
  const [term, setTerm] = useState("short_term");
  const router = useRouter();

  const getData = async () => {
    try {
      const { data } = await axios.get(
        "/api/spotify/me/top/tracks?term=" + term
      );
      setTracks(data.items);
    } catch (err) {
      console.error(err);
      if (err.response.status === 401) {
        router.push("/spotify/login");
      }
    } finally {
      setLoadingTracks(false);
    }
  };

  useEffect(() => {
    getData();
  }, [term]);

  return (
    <main>
      <h1>
        Your Top Tracks on <span className="text-green-400">Spotify</span>
      </h1>
      <div className="rounded-lg dark:bg-gray-800 bg-gray-200 p-2 mb-4">
        Over the last{" "}
        <select
          value={term}
          onChange={(e) => {
            setTerm(e.target.value);
          }}
          className="bg-transparent"
        >
          <option value="short_term">4 weeks</option>
          <option value="medium_term">6 months</option>
          <option value="long_term">several years</option>
        </select>
      </div>
      {loadingTracks ? (
        "Loading..."
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

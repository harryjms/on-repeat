import axios from "axios";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import Track from "../../components/Track";
import Head from "next/head";

const SpotifyHomepage = () => {
  const [user, setUser] = useState(null);
  const [loadingTracks, setLoadingTracks] = useState(true);
  const [tracks, setTracks] = useState<Spotify.Track[]>([]);
  const [term, setTerm] = useState("short_term");
  const router = useRouter();

  const getData = async () => {
    try {
      const { data: userData } = await axios.get("/api/spotify/me");
      setUser(userData);

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
    window.scrollTo(0, 0);
  }, [term]);

  return (
    <>
      <Head>
        <title>Spotify Top Track - On Repeat</title>
      </Head>
      <main>
        <div className="p-4 pb-0">
          {user && (
            <div className="text-xl">Hi {user.display_name.split(" ")[0]}.</div>
          )}
          <h1>
            Here are your top tracks on{" "}
            <span className="text-green-400">Spotify</span>
          </h1>
        </div>
        <div className="sticky top-0 z-10 p-4 dark:bg-black bg-white">
          <div className="rounded-lg dark:bg-gray-800 bg-gray-200 p-2">
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
        </div>
        <div className="p-4 pt-0">
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
        </div>
      </main>
    </>
  );
};

export default SpotifyHomepage;

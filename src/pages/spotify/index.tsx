import axios from "axios";
import { useRouter } from "next/dist/client/router";
import React, { useCallback, useEffect, useState } from "react";
import Track from "../../components/Track";
import Head from "next/head";
import Bar from "../../components/Bar";
import ShareModal from "../../components/ShareModal";

const SpotifyHomepage = () => {
  const [user, setUser] = useState(null);
  const [tracks, setTracks] = useState<Spotify.Track[]>([]);
  const [term, setTerm] = useState("short_term");
  const [loadingTracks, setLoadingTracks] = useState(true);
  const [error, setError] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const router = useRouter();

  const getData = async () => {
    try {
      setLoadingTracks(true);
      setError(false);
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
      } else {
        setError(true);
      }
    } finally {
      setLoadingTracks(false);
    }
  };

  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, [term]);

  const handleShowShare = useCallback(() => {
    setShowShare(true);
  }, []);

  const handleHideShare = useCallback(() => {
    setShowShare(false);
  }, []);
  if (error)
    return (
      <div className="w-screen h-screen flex items-center justify-center text-red-500 font-bold">
        <div className="text-center">
          <h1 className="text-brand">On Repeat</h1>
          There was a problem loading the data.
        </div>
      </div>
    );

  if (tracks.length === 0)
    return (
      <div className="w-screen h-screen flex items-center justify-center text-green-400 font-bold">
        <div className="text-center">
          <h1 className="text-brand">On Repeat</h1>
          Loading...
        </div>
      </div>
    );

  return (
    <>
      <Head>
        <title>Spotify Top Tracks - On Repeat</title>
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
        <div className="sticky top-0 z-10 p-4 dark:bg-black bg-white flex gap-2">
          <Bar className="flex-1">
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
          </Bar>
          <Bar>
            <button onClick={handleShowShare}>Share list</button>
          </Bar>
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
      {showShare && <ShareModal onDismiss={handleHideShare} />}
    </>
  );
};

export default SpotifyHomepage;

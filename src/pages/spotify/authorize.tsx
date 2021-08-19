import axios from "axios";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";

const SpotifyAuthorize = () => {
  const [error, setError] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const { code } = router.query;
    const getToken = async () => {
      setError(false);
      try {
        await axios.get("/api/spotify/authorize/" + code);
        router.push("/spotify");
      } catch (e) {
        console.error(e);
        setError(true);
      }
    };

    if (code) getToken();
  }, [router.query]);

  if (error)
    return (
      <main>
        <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center text-red-500 font-bold text-lg">
          <p className="text-center">
            Sorry! There was an error.
            <br />
            <a href="/spotify/login" className="font-normal underline">
              Try again
            </a>
          </p>
        </div>
      </main>
    );
  return (
    <main>
      <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center text-green-400 font-bold text-lg">
        Hang tight, logging you in...
      </div>
    </main>
  );
};

export default SpotifyAuthorize;

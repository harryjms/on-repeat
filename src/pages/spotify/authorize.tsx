import axios from "axios";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";

const SpotifyAuthorize = () => {
  const [error, setError] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const { code } = router.query;
    const getToken = async () => {
      try {
        await axios.get("/api/spotify/authorize/" + code);
        router.push("/spotify");
      } catch (e) {
        throw e;
      }
    };
    try {
      if (code) getToken();
    } catch (err) {
      console.error(err);
      setError(true);
    }
  }, [router.query]);

  if (error)
    return (
      <div>
        There was an error. <a href="/spotify/login">Try again</a>
      </div>
    );
  return <div>Authorizing...</div>;
};

export default SpotifyAuthorize;

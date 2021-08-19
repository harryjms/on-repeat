import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextPageContext } from "next";
import React from "react";
import SpotifyHelper from "../../helpers/SpotifyHelper";

const SpotifyLogin = ({ loginURL }) => {
  return (
    <main>
      <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center">
        <div className="p-4 text-center">
          <h1>
            Hello, welcome to <span className="text-brand">On Repeat</span>
          </h1>
          <div className="text-sm p-5">
            <p>
              This service will display your top listened to tracks from
              Spotify.
            </p>
            <p className="my-2">
              To ensure your privacy, the authorisation data from Spotify is
              encrypted and stored as a cookie in your browser.
            </p>
            <p className="my-2">
              Unless you decide to share the list, none of the data generated is
              stored on our servers.
            </p>
          </div>
          <button
            onClick={() => {
              window.location = loginURL;
            }}
            className="mt-4 bg-green-400 hover:bg-green-600 text-white p-4 font-bold text-lg transition-colors"
            style={{ borderRadius: 40 }}
          >
            <FontAwesomeIcon icon={faSpotify} className="mr-2" />
            Login with Spotify
          </button>
        </div>
      </div>
    </main>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const {
    headers: { host },
  } = context.req;

  const protocol = process.env.NODE_ENV !== "production" ? "http" : "https";

  SpotifyHelper.setRedirectURI(`${protocol}://${host}/spotify/authorize`);
  return {
    props: {
      loginURL: SpotifyHelper.getLoginUrl(),
    },
  };
}

export default SpotifyLogin;

import JWTHelper from "../../../../../helpers/JWTHelper";
import { SHAccountPayload } from "../../../../../helpers/SpotifyHelper";
import SpotifySession from "../../../../../helpers/SpotifySession";

export default async (req, res) => {
  if (req.method !== "GET") {
    return res.status(404).send("Not found");
  }

  const {
    cookies: { token },
    query: { term },
  } = req;

  const {
    spotify: { access_token },
  } = JWTHelper.decode<{ spotify: SHAccountPayload }>(token);

  const SS = new SpotifySession(access_token);

  const tracks = await SS.getTopTracks(50, term);
  res.json(tracks);
};

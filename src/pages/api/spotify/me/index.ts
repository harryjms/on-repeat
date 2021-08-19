import { resolveSoa } from "dns";
import JWTHelper from "../../../../helpers/JWTHelper";
import { SHAccountPayload } from "../../../../helpers/SpotifyHelper";
import SpotifySession from "../../../../helpers/SpotifySession";

export default async (req, res) => {
  if (req.method !== "GET") {
    return res.status(404).send("Not found");
  }

  const {
    cookies: { token },
  } = req;

  if (!token) return res.status(401).send("Not authorized");

  const {
    spotify: { access_token },
  } = JWTHelper.decode<{ spotify: SHAccountPayload }>(token);

  try {
    const SS = new SpotifySession(access_token);
    const info = await SS.getUserInformation();

    return res.json(info);
  } catch (err) {
    if (err.response?.status === 401) {
      res.status(401).send("Not authorised");
    } else {
      console.error(err);
      res.status(500).send("internal server error");
    }
  }
};

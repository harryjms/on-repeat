import { NextApiResponse } from "next";
import JWTHelper from "../../../../helpers/JWTHelper";
import SpotifyHelper from "../../../../helpers/SpotifyHelper";
import { serialize } from "cookie";

export default async (req, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(404).send("Not found");
  }

  const {
    headers: { host },
  } = req;

  const protocol = process.env.NODE_ENV !== "production" ? "http" : "https";

  SpotifyHelper.setRedirectURI(`${protocol}://${host}/spotify/authorize`);

  try {
    const { code } = req.query;
    const data = await SpotifyHelper.getAccessAndRefreshToken(code);
    const jwt = JWTHelper.encode({ spotify: data });
    res.setHeader("Set-Cookie", serialize("token", jwt, { path: "/" }));
    res.json(jwt);
  } catch (err) {
    res.status(err.response.status).send(err.response.data);
  }
};

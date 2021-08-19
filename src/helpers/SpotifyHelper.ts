import axios from "axios";

interface SHConstructorOptions {
  clientID: string;
  clientSecret: string;
  redirectURI: string;
  scopes: string;
}

export interface SHAccountPayload {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
  refresh_token: string;
}

class SpotifyHelper {
  private readonly clientID: string;
  private readonly clientSecret: string;
  private readonly redirectURI: string;
  private readonly scopes: string;
  private request = axios.create({
    baseURL: "https://accounts.spotify.com/api",
  });

  constructor(opts: SHConstructorOptions) {
    this.clientID = opts.clientID;
    this.clientSecret = opts.clientSecret;
    this.redirectURI = opts.redirectURI;
    this.scopes = opts.scopes;
  }

  public apiAuthorizationToken() {
    return new Buffer(`${this.clientID}:${this.clientSecret}`).toString(
      "base64"
    );
  }

  getLoginUrl() {
    return `https://accounts.spotify.com/authorize?client_id=${this.clientID}&response_type=code&redirect_uri=${this.redirectURI}&scope=${this.scopes}`;
  }

  async getAccessAndRefreshToken(code: string) {
    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", this.redirectURI);
    try {
      const { data } = await this.request.post("/token", params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${this.apiAuthorizationToken()}`,
        },
      });
      return data;
    } catch (err) {
      throw err;
    }
  }
}

const SH = new SpotifyHelper({
  clientID: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectURI: process.env.SPOTIFY_REDIRECT_URI,
  scopes: process.env.SPOTIFY_SCOPES,
});

export default SH;

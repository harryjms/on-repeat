import axios from "axios";
import SpotifyHelper from "./SpotifyHelper";

class SpotifySession {
  private readonly SH = SpotifyHelper;
  private readonly accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  private request() {
    return axios.create({
      baseURL: "https://api.spotify.com/v1",
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
  }

  public async getUserInformation() {
    const { data } = await this.request().get("/me");
    return data;
  }

  public async getTopTracks(
    limit: number = 50,
    time_range: string = "short_term"
  ) {
    const { data } = await this.request().get(
      "/me/top/tracks?limit=" + limit + "&time_range=" + time_range
    );
    return data;
  }

  public async getTopArtists() {
    const { data } = await this.request().get("/me/top/artists");
    return data;
  }
}

export default SpotifySession;

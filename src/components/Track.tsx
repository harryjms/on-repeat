import React from "react";
import TrackPreview from "./TrackPreview";

interface ITrackProps {
  track: Spotify.Track;
  withPreview?: boolean;
}
const Track: React.FC<ITrackProps> = ({ track, withPreview = false }) => {
  return (
    <div className="flex">
      <div className="w-1/3 mr-4 relative">
        <img src={track.album.images[0].url} className="artwork" />
        {withPreview && (
          <div className="absolute top-0 right-0 bottom-0 left-0">
            <TrackPreview track={track} />
          </div>
        )}
      </div>
      <div className="w-2/3 flex flex-col">
        <div className="mb-2">
          <div className="font-bold text-sm truncate">
            {track.artists.map((a) => a.name).join(", ")}
          </div>
          <div className="text-lg">{track.name}</div>
        </div>
        <a
          href={track.external_urls.spotify}
          target="_blank"
          className="text-xs text-green-400 font-bold hover:underline mb-1 hover:cursor-pointer"
        >
          Open in Spotify
        </a>
      </div>
    </div>
  );
};
export default Track;

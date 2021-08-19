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
        <div className="font-bold text-sm">
          {track.artists.map((a) => a.name).join(", ")}
        </div>
        <div className="text-xl">{track.name}</div>
      </div>
    </div>
  );
};
export default Track;

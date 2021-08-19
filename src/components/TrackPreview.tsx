import { faPlay, faStop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useRef, useState } from "react";
import events from "../helpers/EventEmitter";

interface ITrackPreviewProps {
  track: Spotify.Track;
}

const TrackPreview: React.FC<ITrackPreviewProps> = ({ track }) => {
  const [playing, setPlaying] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const onKill = (trackException: string) => {
    if (track.id !== trackException) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  };

  useEffect(() => {
    if (!isActive && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    } else {
      if (audioRef.current) {
        audioRef.current.play();
      }
    }
  }, [isActive]);

  useEffect(() => {
    const listenPlay = () => {
      setPlaying(true);
    };

    const listenPause = () => {
      setPlaying(false);
    };

    events.on("set-active-preview", onKill);
    if (audioRef.current) {
      audioRef.current.addEventListener("play", listenPlay);
      audioRef.current.addEventListener("pause", listenPause);
      audioRef.current.addEventListener("ended", handlePause);
    }
    return () => {
      events.off("set-active-preview", onKill);
      if (audioRef.current) {
        audioRef.current.removeEventListener("play", listenPlay);
        audioRef.current.removeEventListener("pause", listenPause);
        audioRef.current.removeEventListener("ended", handlePause);
      }
    };
  }, [track]);

  const handlePlay = useCallback(() => {
    events.emit("set-active-preview", track.id);
  }, [track]);

  const handlePause = useCallback(() => {
    setIsActive(false);
  }, [track]);

  return (
    <div className="">
      {isActive && (
        <audio src={track.preview_url} ref={audioRef} id={track.id} />
      )}
      <div
        className="hover:opacity-100 opacity-0 absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center text-green-500"
        style={{ ...(isActive && { opacity: 1 }), borderRadius: "50%" }}
      >
        {isActive ? (
          <FontAwesomeIcon
            icon={faStop}
            className="cursor-pointer"
            onClick={handlePause}
          />
        ) : (
          <FontAwesomeIcon
            icon={faPlay}
            className="cursor-pointer"
            onClick={handlePlay}
          />
        )}
      </div>
    </div>
  );
};

export default TrackPreview;

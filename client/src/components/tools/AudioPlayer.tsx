import { useWebRTC } from "@/hooks/useWebRTC";
import { memo, useEffect, useRef, type FC } from "react";

interface AudioPlayerProps {
  id: string;
}

const AudioPlayer: FC<AudioPlayerProps> = ({ id }) => {
  const incomingStream = useWebRTC((state) => state.remoteStreams[id]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);

  useEffect(() => {
    if (!incomingStream) return;

    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }

    const audioContext = audioContextRef.current;

    sourceRef.current = audioContext.createMediaStreamSource(incomingStream);

    sourceRef.current.connect(audioContext.destination);

    if (audioContext.state === "suspended") {
      audioContext.resume();
    }

    return () => {
      if (sourceRef.current) {
        sourceRef.current.disconnect();
        sourceRef.current = null;
      }
    };
  }, [incomingStream]);

  return null;
};

export default memo(AudioPlayer);

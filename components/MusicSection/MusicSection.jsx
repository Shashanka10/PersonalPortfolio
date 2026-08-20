"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Headphone3D from "@/components/MusicSection/HeadPhone3D";

import {
  Play,
  Pause,
  ExternalLink,
  Volume2,
  VolumeX,
  SkipBack,
  SkipForward,
  Music2,
} from "lucide-react";

import Reveal from "@/components/Reveal/Reveal";

import { musicTracks } from "../../app/hobbies/[category]/data";

function CurrentlyInto({ track, playing }) {
  if (!track) return null;

  return (
    <div className="inline-flex items-center gap-2.5 text-[#c084fc] bg-[#c084fc]/10 border border-[#c084fc]/25 px-3 py-1.5 rounded-full text-[10px] sm:text-[12px] md:text-xs font-mono tracking-widest uppercase">
      <Headphone3D playing={playing} />
      {track.title} — {track.artist}
    </div>
  );
}

function Waveform({ playing, small = false }) {
  const heights = [35, 70, 50, 90, 45, 75, 100, 55, 80, 40, 65];

  return (
    <div className={`flex items-center gap-[3px] ${small ? "h-5" : "h-7"}`}>
      {heights.map((height, index) => (
        <span
          key={index}
          className={`
            rounded-full bg-[#c084fc]
            ${small ? "w-[2px]" : "w-[3px]"}
            ${playing ? "animate-music-wave" : ""}
          `}
          style={{
            height: `${small ? height * 0.18 : height * 0.25}px`,
            animationDelay: `${index * 70}ms`,
          }}
        />
      ))}
    </div>
  );
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "0:00";
  }

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function FeaturedPlayer({
  track,
  playing,
  progress,
  duration,
  muted,
  onToggle,
  onNext,
  onPrev,
  onSeek,
  onToggleMute,
}) {
  if (!track) return null;

  const progressPercent =
    duration > 0 ? Math.min(100, Math.max(0, (progress / duration) * 100)) : 0;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#2e2e2e] bg-[#181818]">
      {/* BACKGROUND ART */}

      {track.cover && (
        <div
          className="absolute inset-0 scale-110 opacity-[0.12] blur-3xl"
          style={{
            backgroundImage: `url(${track.cover})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-br from-[#181818]/70 via-[#181818]/90 to-[#181818]" />

      <div className="relative p-5 sm:p-7">
        <div className="flex flex-col sm:flex-row gap-6 items-center">
          <div
            className={`
    relative
    w-44
    h-44
    sm:w-52
    sm:h-52
    shrink-0
    flex
    items-center
    justify-center
    transition-all
    duration-500
    ${
      playing
        ? "scale-[1.02] drop-shadow-[0_0_45px_rgba(192,132,252,0.18)]"
        : ""
    }
  `}
          >
            {track.cover ? (
              <div
                className={`
        relative
        w-full
        h-full
        rounded-full
        overflow-hidden
        border-[5px]
        border-[#101010]
        shadow-[0_8px_30px_rgba(0,0,0,0.5)]
        ${playing ? "animate-vinyl-spin" : ""}
      `}
              >
                {/* ALBUM ART */}

                <Image
                  src={track.cover}
                  alt={track.title}
                  fill
                  priority
                  sizes="(max-width: 640px) 176px, 208px"
                  className="object-cover"
                />

                {/* DARK VINYL OVERLAY */}

                <div
                  className="
          absolute
          inset-0
          rounded-full
          pointer-events-none
          bg-[radial-gradient(circle_at_center,transparent_0%,transparent_45%,rgba(0,0,0,0.18)_70%,rgba(0,0,0,0.55)_100%)]
        "
                />

                {/* VINYL GROOVES */}

                <div
                  className="
          absolute
          inset-[7%]
          rounded-full
          border
          border-white/[0.08]
          pointer-events-none
        "
                />

                <div
                  className="
          absolute
          inset-[14%]
          rounded-full
          border
          border-white/[0.06]
          pointer-events-none
        "
                />

                <div
                  className="
          absolute
          inset-[21%]
          rounded-full
          border
          border-white/[0.05]
          pointer-events-none
        "
                />

                {/* CENTER LABEL */}

                <div
                  className="
          absolute
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2
          w-11
          h-11
          sm:w-12
          sm:h-12
          rounded-full
          bg-[#171717]
          border
          border-[#444]
          shadow-[0_0_15px_rgba(0,0,0,0.6)]
          flex
          items-center
          justify-center
        "
                >
                  {/* CENTER HOLE */}

                  <div
                    className="
            w-3
            h-3
            rounded-full
            bg-[#c084fc]
            border
            border-[#e9d5ff]/30
            shadow-[0_0_8px_rgba(192,132,252,0.4)]
          "
                  />
                </div>

                {/* LIGHT REFLECTION */}

                <div
                  className="
          absolute
          inset-0
          rounded-full
          pointer-events-none
          bg-[linear-gradient(135deg,rgba(255,255,255,0.12),transparent_35%,transparent_65%,rgba(255,255,255,0.04))]
        "
                />
              </div>
            ) : (
              <div
                className="
        w-full
        h-full
        rounded-full
        bg-[#222]
        border-[5px]
        border-[#111]
        flex
        items-center
        justify-center
        shadow-[0_8px_30px_rgba(0,0,0,0.5)]
      "
              >
                <Music2 size={48} className="text-gray-600" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0 w-full">
            <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#c084fc] mb-2">
              {playing ? "Now playing" : "Selected track"}
            </p>

            <h3 className="text-2xl sm:text-3xl font-bold text-gray-100 truncate">
              {track.title}
            </h3>

            <p className="text-gray-500 mt-1">{track.artist}</p>

            {track.album && (
              <p className="text-gray-600 text-xs mt-1 truncate">
                {track.album}
              </p>
            )}

            <div className="mt-7">
              <div className="relative w-full h-5 flex items-center">
                {/* Background */}

                <div className="absolute left-0 right-0 h-[4px] rounded-full bg-[#2b2b2b]" />

                {/* Played portion */}

                <div
                  className="absolute left-0 h-[4px] rounded-full bg-[#c084fc] pointer-events-none"
                  style={{
                    width: `${progressPercent}%`,
                  }}
                />

                {/* Actual range */}

                <input
                  type="range"
                  min="0"
                  max={duration || 1}
                  step="0.01"
                  value={Math.min(progress, duration || 0)}
                  onChange={(event) => onSeek(Number(event.target.value))}
                  aria-label="Music progress"
                  className="music-progress absolute inset-0 w-full"
                />
              </div>

              <div className="flex justify-between text-[9px] font-mono text-gray-600 mt-1">
                <span>{formatTime(progress)}</span>

                <span>{formatTime(duration)}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-4">
              {/* PREVIOUS */}

              <button
                type="button"
                onClick={onPrev}
                aria-label="Previous track"
                className="
                  w-9 h-9
                  rounded-full
                  border border-[#2e2e2e]
                  flex items-center justify-center
                  text-gray-500
                  hover:text-white
                  hover:border-[#444]
                  transition-all
                  cursor-pointer
                "
              >
                <SkipBack size={15} fill="currentColor" />
              </button>

              {/* PLAY */}

              <button
                type="button"
                onClick={onToggle}
                aria-label={playing ? "Pause preview" : "Play preview"}
                className="
                  w-11
                  h-11
                  rounded-full
                  bg-[#c084fc]
                  text-[#101010]
                  flex
                  items-center
                  justify-center
                  hover:bg-[#d8a8ff]
                  hover:scale-105
                  transition-all
                  cursor-pointer
                "
              >
                {playing ? (
                  <Pause size={17} fill="currentColor" />
                ) : (
                  <Play size={17} fill="currentColor" />
                )}
              </button>

              {/* NEXT */}

              <button
                type="button"
                onClick={onNext}
                aria-label="Next track"
                className="
                  w-9 h-9
                  rounded-full
                  border border-[#2e2e2e]
                  flex items-center justify-center
                  text-gray-500
                  hover:text-white
                  hover:border-[#444]
                  transition-all
                  cursor-pointer
                "
              >
                <SkipForward size={15} fill="currentColor" />
              </button>

              <Waveform playing={playing} />

              {/* VOLUME */}

              <button
                type="button"
                onClick={onToggleMute}
                aria-label={muted ? "Unmute" : "Mute"}
                className="
                  hidden sm:flex
                  w-8 h-8
                  items-center justify-center
                  text-gray-600
                  hover:text-gray-300
                  transition-colors
                  cursor-pointer
                "
              >
                {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
              </button>

              {/* DEEZER */}

              {track.externalUrl && (
                <Link
                  href={track.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    ml-auto
                    text-gray-500
                    hover:text-[#c084fc]
                    transition-colors
                  "
                  aria-label="Open on Deezer"
                >
                  <ExternalLink size={16} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TrackCard({ track, index, active, playing, onSelect, onToggle }) {
  return (
    <div
      onClick={onSelect}
      className={`
        group
        flex
        items-center
        gap-3
        sm:gap-4
        p-3
        sm:p-4
        rounded-xl
        border
        cursor-pointer
        transition-all
        duration-300
        ${
          active
            ? "bg-[#c084fc]/[0.06] border-[#c084fc]/30"
            : "bg-[#1e1e1e] border-[#2e2e2e] hover:border-[#c084fc]/30"
        }
      `}
    >
      {/* NUMBER */}

      <span
        className={`
          hidden sm:block
          w-5
          text-[10px]
          font-mono
          ${active ? "text-[#c084fc]" : "text-gray-600"}
        `}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* COVER */}

      <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden shrink-0 bg-[#252525]">
        {track.cover ? (
          <Image
            src={track.cover}
            alt={track.title}
            fill
            sizes="56px"
            className={`
              object-cover
              transition-transform
              duration-300
              ${active ? "scale-105" : "group-hover:scale-105"}
            `}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Music2 size={18} className="text-gray-600" />
          </div>
        )}
      </div>

      {/* INFO */}

      <div className="flex-1 min-w-0">
        <p
          className={`
            font-semibold
            text-sm
            truncate
            ${active ? "text-[#c084fc]" : "text-gray-100"}
          `}
        >
          {track.title}
        </p>

        <p className="text-gray-500 text-xs truncate mt-0.5">{track.artist}</p>

        {active && playing && (
          <div className="mt-1.5">
            <Waveform playing small />
          </div>
        )}
      </div>

      {/* PREVIEW */}

      <span className="hidden sm:block text-[9px] font-mono text-gray-600 uppercase">
        A little louder
      </span>

      {/* PLAY */}

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onToggle();
        }}
        className={`
          w-9
          h-9
          rounded-full
          border
          flex
          items-center
          justify-center
          shrink-0
          transition-all
          duration-300
          ${
            active && playing
              ? "border-[#c084fc]/60 bg-[#c084fc]/10 text-[#c084fc]"
              : "border-[#2e2e2e] text-gray-400 hover:border-[#c084fc]/40 hover:text-[#c084fc]"
          }
        `}
      >
        {active && playing ? (
          <Pause size={13} fill="currentColor" />
        ) : (
          <Play size={13} fill="currentColor" />
        )}
      </button>
    </div>
  );
}

export default function MusicSection() {
  const [tracks, setTracks] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const [activeTrack, setActiveTrack] = useState(null);

  const [playing, setPlaying] = useState(false);

  const [progress, setProgress] = useState(0);

  const [duration, setDuration] = useState(0);

  const [muted, setMuted] = useState(false);

  const audioRef = useRef(null);

  /*
   * When true, the new audio element should
   * automatically start when it has loaded.
   */
  const shouldAutoPlayRef = useRef(false);

  useEffect(() => {
    let cancelled = false;

    async function loadMusic() {
      try {
        setLoading(true);
        setError(null);

        const results = await Promise.all(
          musicTracks.map(async (item) => {
            try {
              const response = await fetch(
                `/api/music?q=${encodeURIComponent(item.query)}`,
              );

              if (!response.ok) {
                throw new Error(`Failed to fetch ${item.query}`);
              }

              const data = await response.json();

              const deezerTrack = data?.[0];

              if (!deezerTrack) {
                return null;
              }

              return {
                ...deezerTrack,
              };
            } catch (error) {
              console.warn(`Could not load ${item.query}`, error);

              return null;
            }
          }),
        );

        const validTracks = results.filter(Boolean);

        if (!cancelled) {
          setTracks(validTracks);

          if (validTracks.length > 0) {
            setActiveTrack(validTracks[0]);
          }
        }
      } catch (error) {
        console.error(error);

        if (!cancelled) {
          setError("Unable to load music right now.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadMusic();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!activeTrack?.previewUrl) {
      return;
    }

    /*
     * Destroy previous audio.
     */

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current.load();
    }

    const audio = new Audio(activeTrack.previewUrl);

    audio.preload = "auto";

    audio.volume = muted ? 0 : 1;

    audioRef.current = audio;

    /*
     * Reset timeline for new track.
     */

    setProgress(0);
    setDuration(0);

    const handleLoadedMetadata = () => {
      if (Number.isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleTimeUpdate = () => {
      setProgress(audio.currentTime);

      if (Number.isFinite(audio.duration) && audio.duration > 0) {
        setDuration(audio.duration);
      }
    };

    const handlePlay = () => {
      setPlaying(true);
    };

    const handlePause = () => {
      setPlaying(false);
    };

    const handleEnded = () => {
      setProgress(0);
      setPlaying(false);
    };

    const handleError = () => {
      console.warn("Deezer preview unavailable:", activeTrack.title);

      setPlaying(false);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    audio.addEventListener("timeupdate", handleTimeUpdate);

    audio.addEventListener("play", handlePlay);

    audio.addEventListener("pause", handlePause);

    audio.addEventListener("ended", handleEnded);

    audio.addEventListener("error", handleError);

    /*
     * Automatically play after changing track
     * if requested by next/play button.
     */

    if (shouldAutoPlayRef.current) {
      shouldAutoPlayRef.current = false;

      const startPlayback = async () => {
        try {
          await audio.play();
        } catch (error) {
          console.warn("Autoplay failed:", error);

          setPlaying(false);
        }
      };

      startPlayback();
    }

    return () => {
      audio.pause();

      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);

      audio.removeEventListener("timeupdate", handleTimeUpdate);

      audio.removeEventListener("play", handlePlay);

      audio.removeEventListener("pause", handlePause);

      audio.removeEventListener("ended", handleEnded);

      audio.removeEventListener("error", handleError);

      audio.src = "";
      audio.load();
    };
  }, [activeTrack]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  const selectTrack = (track) => {
    if (!track) return;

    if (activeTrack?.id === track.id) {
      return;
    }

    shouldAutoPlayRef.current = false;

    setPlaying(false);
    setProgress(0);
    setDuration(0);

    setActiveTrack(track);
  };

  const togglePlay = async (track = activeTrack) => {
    if (!track?.previewUrl) {
      return;
    }

    /*
     * Different track
     */

    if (track.id !== activeTrack?.id) {
      shouldAutoPlayRef.current = true;

      setActiveTrack(track);

      return;
    }

    const audio = audioRef.current;

    if (!audio) return;

    try {
      if (audio.paused) {
        await audio.play();
      } else {
        audio.pause();
      }
    } catch (error) {
      console.error("Playback failed:", error);

      setPlaying(false);
    }
  };

  const playNextTrack = () => {
    if (!tracks.length) return;

    const currentIndex = tracks.findIndex(
      (track) => track.id === activeTrack?.id,
    );

    const nextIndex =
      currentIndex === -1 ? 0 : (currentIndex + 1) % tracks.length;

    const next = tracks[nextIndex];

    shouldAutoPlayRef.current = true;

    setProgress(0);
    setDuration(0);
    setActiveTrack(next);
  };

  const playPreviousTrack = () => {
    if (!tracks.length) return;

    /*
     * If we're more than 3 seconds into the current
     * track, previous means restart the track.
     */

    if (audioRef.current && audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0;

      setProgress(0);

      return;
    }

    const currentIndex = tracks.findIndex(
      (track) => track.id === activeTrack?.id,
    );

    const previousIndex =
      currentIndex === -1
        ? 0
        : (currentIndex - 1 + tracks.length) % tracks.length;

    const previous = tracks[previousIndex];

    shouldAutoPlayRef.current = true;

    setProgress(0);
    setDuration(0);
    setActiveTrack(previous);
  };

  const seek = (value) => {
    const audio = audioRef.current;

    if (!audio) return;

    const newTime = Math.min(
      Math.max(value, 0),
      Number.isFinite(audio.duration) ? audio.duration : value,
    );

    audio.currentTime = newTime;

    setProgress(newTime);
  };

  const toggleMute = () => {
    const audio = audioRef.current;

    const nextMuted = !muted;

    setMuted(nextMuted);

    if (audio) {
      audio.volume = nextMuted ? 0 : 1;
    }
  };

  useEffect(() => {
    const handleKeyboard = (event) => {
      /*
       * Don't hijack keyboard controls when typing.
       */

      const target = event.target;

      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLButtonElement
      ) {
        return;
      }

      if (event.code === "Space") {
        event.preventDefault();
        togglePlay();
      }

      if (event.code === "ArrowRight") {
        playNextTrack();
      }

      if (event.code === "ArrowLeft") {
        playPreviousTrack();
      }
    };

    window.addEventListener("keydown", handleKeyboard);

    return () => {
      window.removeEventListener("keydown", handleKeyboard);
    };
  }, [activeTrack, playing, tracks]);

  return (
    <div className="space-y-8">
      {/* CURRENTLY INTO */}

      {!loading && activeTrack && (
        <Reveal>
          <CurrentlyInto track={activeTrack} playing={playing} />
        </Reveal>
      )}

      {/* PLAYER */}

      {!loading && activeTrack && (
        <Reveal delay={80}>
          <FeaturedPlayer
            track={activeTrack}
            playing={playing}
            progress={progress}
            duration={duration}
            muted={muted}
            onToggle={() => togglePlay()}
            onNext={playNextTrack}
            onPrev={playPreviousTrack}
            onSeek={seek}
            onToggleMute={toggleMute}
          />
        </Reveal>
      )}

      {/* TRACKS */}

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-gray-500 text-xs font-mono uppercase tracking-widest">
            My Top Picks
          </p>

          <span className="text-[9px] font-mono text-gray-600 uppercase">
            {loading ? "Loading..." : `${tracks.length} tracks`}
          </span>
        </div>

        {/* LOADING */}

        {loading &&
          [1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="
                h-[82px]
                rounded-xl
                bg-[#1e1e1e]
                border
                border-[#2e2e2e]
                animate-pulse
              "
            />
          ))}

        {/* ERROR */}

        {!loading && error && (
          <div className="p-5 rounded-xl border border-[#2e2e2e] bg-[#1e1e1e] text-gray-500 text-sm">
            {error}
          </div>
        )}

        {/* EMPTY */}

        {!loading && !error && tracks.length === 0 && (
          <div className="p-5 rounded-xl border border-[#2e2e2e] bg-[#1e1e1e] text-gray-500 text-sm">
            No tracks found.
          </div>
        )}

        {/* TRACK LIST */}

        {!loading &&
          !error &&
          tracks.map((track, index) => (
            <Reveal key={track.id} delay={index * 50}>
              <TrackCard
                track={track}
                index={index}
                active={activeTrack?.id === track.id}
                playing={activeTrack?.id === track.id && playing}
                onSelect={() => {
                  selectTrack(track);
                  togglePlay(track);
                }}
                onToggle={() => {
                  togglePlay(track);
                }}
              />
            </Reveal>
          ))}
      </div>
    </div>
  );
}

import React, { type HTMLAttributes, useEffect, useId, useMemo, useRef, useState } from 'react';
import './VideoSection.css';
import './SectionLayout.css';
import { Container } from './Container';
import { SectionHeader } from './SectionHeader';
import { WysiwygContent } from './WysiwygContent';
import type { PlainText, HtmlString, HeadingLevel, VideoItem } from './types';

const WL_VIDEO_PLAY_EVENT = 'wl-video-play';

type WlVideoPlayDetail = {
  playerId: string;
};

function dispatchVideoPlay(playerId: string) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent<WlVideoPlayDetail>(WL_VIDEO_PLAY_EVENT, { detail: { playerId } }));
}

export interface VideoSectionProps extends HTMLAttributes<HTMLElement> {
  /** Plain text headline (not from CMS) - rendered via Heading component */
  headline?: PlainText;
  /** HTML string from CMS rich text editor - rendered via WysiwygContent component */
  subheadline?: HtmlString;
  /** Semantic heading level (1-6) - defaults to 2 */
  headlineLevel?: HeadingLevel;
  /** One or more videos to render */
  videos?: VideoItem[];
  className?: string;
}

type VideoPlayerProps = {
  item: VideoItem;
};

const VideoPlayer = ({ item }: VideoPlayerProps) => {
  const playerId = useId();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const sources = useMemo(() => {
    if (item.sources?.length) return item.sources;
    if (item.src) return [{ src: item.src, type: item.type }];
    return [];
  }, [item.sources, item.src, item.type]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const onOtherPlayerPlay = (event: Event) => {
      const custom = event as CustomEvent<WlVideoPlayDetail>;
      const otherId = custom.detail?.playerId;
      if (!otherId || otherId === playerId) return;

      const el = videoRef.current;
      if (!el) return;
      if (!el.paused && !el.ended) {
        el.pause();
      }
    };

    window.addEventListener(WL_VIDEO_PLAY_EVENT, onOtherPlayerPlay as EventListener);
    return () => window.removeEventListener(WL_VIDEO_PLAY_EVENT, onOtherPlayerPlay as EventListener);
  }, [playerId]);

  const setNativeControlsVisible = (visible: boolean) => {
    const el = videoRef.current;
    if (!el) return;
    el.controls = visible;
  };

  const handlePlay = () => {
    setIsPlaying(true);
    setNativeControlsVisible(true);
    dispatchVideoPlay(playerId);
  };

  const handlePause = () => {
    setIsPlaying(false);
    setNativeControlsVisible(false);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setNativeControlsVisible(false);
  };

  const startPlayback = async () => {
    const el = videoRef.current;
    if (!el) return;
    try {
      setNativeControlsVisible(true);
      await el.play();
    } catch {
      // Autoplay/click-to-play restrictions vary by browser; keep overlay visible if play fails.
      setNativeControlsVisible(false);
      setIsPlaying(false);
    }
  };

  const aspectRatioStyle = item.aspectRatio ? ({ aspectRatio: item.aspectRatio } as React.CSSProperties) : undefined;

  return (
    <div className="video-section__item">
      <div className="video-section__frame" style={aspectRatioStyle}>
        <video
          ref={videoRef}
          className="video-section__media"
          poster={item.poster}
          preload={item.preload ?? 'metadata'}
          playsInline={item.playsInline ?? true}
          muted={item.muted ?? false}
          loop={item.loop ?? false}
          controls={isPlaying}
          onPlay={handlePlay}
          onPause={handlePause}
          onEnded={handleEnded}
        >
          {sources.map(source => (
            <source key={`${source.src}:${source.type ?? ''}`} src={source.src} type={source.type} />
          ))}
        </video>

        {!isPlaying && (
          <div className="video-section__overlay">
            <button
              type="button"
              className="video-section__play-button"
              onClick={() => void startPlayback()}
              aria-label={item.ariaLabel ?? 'Play video'}
              disabled={sources.length === 0}
            >
              <span className="video-section__play-icon" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>

      {(item.title || item.caption) && (
        <div className="video-section__meta">
          {item.title && <div className="video-section__title">{item.title}</div>}
          {item.caption && <WysiwygContent content={item.caption} className="video-section__caption" />}
        </div>
      )}
    </div>
  );
};

export const VideoSection = ({
  headline,
  subheadline,
  headlineLevel = 2,
  videos = [],
  className = '',
  ...props
}: VideoSectionProps) => {
  if (!headline && !subheadline && videos.length === 0) {
    return null;
  }

  const classes = [
    'video-section',
    'wl-sec',
    className
  ].filter(Boolean).join(' ');

  return (
    <section className={classes} {...props}>
      <Container padding>
        {(headline || subheadline) && (
          <SectionHeader
            headline={headline}
            headlineLevel={headlineLevel}
            subheadline={subheadline}
          />
        )}

        {videos.length > 0 && (
          <div className="video-section__grid">
            {videos.map((item, index) => (
              <VideoPlayer key={item.id ?? index} item={item} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};


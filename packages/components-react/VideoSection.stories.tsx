import React from 'react';
import { VideoSection } from './VideoSection';

import poster1 from '../../stories/assets/theme-lays/lays-de-header-desktop.jpg';
import poster2 from '../../stories/assets/pepsi-images/alexander-sergienko-S_fpEkzHnJo-unsplash.jpg';

const demoVideoMp4 = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';

export default {
  title: 'Components/VideoSection',
  component: VideoSection,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Video section with a centered play button overlay. When a video starts playing, native controls appear and any other playing videos on the page are paused.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    headline: {
      description: 'Plain text field - not from CMS',
      control: 'text',
      table: { type: { summary: 'string (plain text)' } },
    },
    subheadline: {
      description: 'HTML string from CMS rich text editor',
      control: 'text',
      table: { type: { summary: 'string (HTML from CMS)' } },
    },
    headlineLevel: {
      description: 'Semantic heading level for the headline (visual style remains H2)',
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6],
      table: { type: { summary: 'number' }, defaultValue: { summary: 2 } },
    },
    videos: {
      description: 'Array of videos to render. Only one video can play at a time across the page.',
      control: 'object',
      table: {
        type: {
          summary: 'array',
          detail: `[
  {
    id?: string | number,
    src?: string,
    sources?: Array<{ src: string, type?: string }>,
    poster?: string,
    title?: string,
    caption?: string (HTML from CMS),
    aspectRatio?: string (e.g. "16/9"),
    loop?: boolean,
    muted?: boolean
  }
]`,
        },
      },
    },
  },
};

export const SingleVideo = {
  args: {
    headline: 'Video Section',
    subheadline: '<p>Click play to show native controls. Refresh not required.</p>',
    videos: [
      {
        id: 1,
        sources: [{ src: demoVideoMp4, type: 'video/mp4' }],
        poster: poster1,
        title: 'Demo video',
        caption: '<p>This caption comes from CMS rich text.</p>',
        aspectRatio: '16/9',
      },
    ],
  },
};

export const MultipleVideos = {
  args: {
    headline: 'Multiple Videos',
    subheadline: '<p>Start one video, then start the other: the first one pauses automatically.</p>',
    videos: [
      {
        id: 1,
        sources: [{ src: demoVideoMp4, type: 'video/mp4' }],
        poster: poster1,
        title: 'Video A',
        caption: '<p>Only one video plays at a time.</p>',
      },
      {
        id: 2,
        sources: [{ src: demoVideoMp4, type: 'video/mp4' }],
        poster: poster2,
        title: 'Video B',
        caption: '<p>Native controls appear when playing.</p>',
      },
    ],
  },
};

export const NoHeader = {
  args: {
    videos: [
      {
        id: 1,
        sources: [{ src: demoVideoMp4, type: 'video/mp4' }],
        poster: poster2,
        title: 'Video only',
      },
    ],
  },
};


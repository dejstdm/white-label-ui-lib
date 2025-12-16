import { defineComponentMeta } from '@builder.io/fusion';

export default defineComponentMeta({
  name: 'VideoSection',
  category: 'display',
  displayName: 'Video Section',
  description:
    'Video section with a centered play button overlay. When playing, native video controls are shown and other videos on the page are paused.',
  props: {
    headline: {
      type: 'string',
      description: 'PlainText: Plain text headline (not from CMS, safe to render directly)',
      required: false,
    },
    subheadline: {
      type: 'string',
      description: 'HtmlString: HTML string for subheadline (from CMS rich text editor, must use WysiwygContent)',
      required: false,
    },
    headlineLevel: {
      type: 'number',
      description: 'HTML heading level (1-6)',
      required: false,
      defaultValue: 2,
      enum: [1, 2, 3, 4, 5, 6],
    },
    videos: {
      type: 'array',
      description: 'Array of videos to render (only one can play at a time across the page)',
      required: false,
      defaultValue: [],
      itemType: {
        id: { type: 'string|number', required: false },
        src: { type: 'string', required: false, description: 'Single video URL (used if sources not provided)' },
        type: { type: 'string', required: false, description: 'MIME type for src (e.g. "video/mp4")' },
        sources: {
          type: 'array',
          required: false,
          description: 'Multiple sources for browser support',
          itemType: {
            src: { type: 'string', required: true },
            type: { type: 'string', required: false },
          },
        },
        poster: { type: 'string', required: false, description: 'Poster image URL' },
        title: { type: 'string', required: false, description: 'PlainText title shown under the video' },
        caption: { type: 'string', required: false, description: 'HtmlString caption shown under the video' },
        aspectRatio: { type: 'string', required: false, description: 'Aspect ratio like "16/9" or "4/3"' },
        loop: { type: 'boolean', required: false, defaultValue: false },
        muted: { type: 'boolean', required: false, defaultValue: false },
        playsInline: { type: 'boolean', required: false, defaultValue: true },
        preload: { type: 'string', required: false, defaultValue: 'metadata' },
        ariaLabel: { type: 'string', required: false, description: 'Accessible label for the overlay play button' },
      },
    },
    className: {
      type: 'string',
      description: 'Additional CSS classes',
      required: false,
      defaultValue: '',
    },
  },
  constraints: {
    maxDepth: 2,
  },
});


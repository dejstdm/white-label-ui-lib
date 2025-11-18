
## Agent 5 – Component Development Agent
**Goal:** Ensure all components are built to accept CMS (Drupal) content without wrapping HTML in React components.

### Critical Rule: CMS Content Compatibility

**All text content props that come from CMS rich text editor MUST accept raw HTML strings and use the `WysiwygContent` component.**

#### Why This Matters
- CMS content comes with HTML tags already (h2, p, a, ul, li, etc.)
- Wrapping CMS HTML in React components (Heading, Text, Button) creates invalid HTML:
  - `<p><p>content</p></p>` (invalid - nested paragraphs)
  - `<Heading><h2>title</h2></Heading>` (invalid - heading inside heading)
  - `<Button><a href="#">link</a></Button>` (invalid - link inside button)

#### Implementation Pattern

1. **Use WysiwygContent component for CMS rich text editor output:**
   ```jsx
   import { WysiwygContent } from './WysiwygContent';
   
   // ❌ WRONG - Don't wrap CMS content in React components
   <Heading level={2}>{headline}</Heading>
   <Text size="large">{description}</Text>
   <Button href={buttonHref}>{buttonLabel}</Button>
   
   // ✅ CORRECT - Use WysiwygContent component
   <WysiwygContent 
     content={headline}
     className="component__headline"
   />
   <WysiwygContent 
     content={description}
     className="component__description"
   />
   
   // For buttons/links from CMS (if needed)
   <div className="component__button-wrapper">
     <WysiwygContent content={buttonHtml} />
   </div>
   ```

2. **Global WYSIWYG styles are automatically applied:**
   - The `wysiwyg-content.css` file is globally imported in Storybook preview
   - All HTML elements (h1-h6, p, ul, ol, li, a, strong, em, etc.) are styled using theme variables
   - Component-specific overrides can be added using CSS:
   ```css
   /* Component-specific overrides for WYSIWYG content */
   .component__description .wysiwyg-content {
     text-align: center; /* Example: center text in product slider */
   }
   ```

3. **TypeScript props should label HTML strings explicitly:**
   ```ts
   export type HeroCopy = {
     headline?: string;      // HTML string from CMS rich text editor
     description?: string;   // HTML string (e.g., "<p>Description</p>")
     ctaMarkup?: string;     // HTML string (e.g., "<a href='#'>Learn more</a>")
   };
   ```

#### WysiwygContent Component

The `WysiwygContent` component:
- Accepts `content` prop (HTML string from CMS)
- Wraps content in a `<div>` with class `wysiwyg-content`
- Uses `dangerouslySetInnerHTML` internally (handled safely by the component)
- Supports `className` prop for component-specific styling
- Returns `null` if content is empty or undefined

#### Examples of Valid CMS Content
- `headline: "<h2>Our Products</h2>"`
- `description: "<p>Some text here.</p><p>More text.</p>"`
- `subheadline: "<p>Sed ut perspiciatis unde omnis iste natus error</p>"`
- `buttonHtml: "<a href='/products' class='button'>Learn More</a>"`

#### When to Use React Components vs WysiwygContent

**Use WysiwygContent component for:**
- All content from CMS rich text editor (Drupal)
- Any HTML string that contains formatted content (paragraphs, headings, lists, links, etc.)

**Use React components (Heading, Text, Button) only for:**
- Internal component UI (navigation, labels, etc.)
- Content that is NOT from CMS (plain text fields)
- Storybook examples where you control the content structure

#### Tasks
1. Use `WysiwygContent` component for all CMS rich text editor output.  
2. Accept HTML strings as props for CMS content fields.  
3. Global `.wysiwyg-content` styles are automatically applied (imported in Storybook preview).  
4. Add component-specific CSS overrides only when needed.  
5. Document HTML string format in TypeScript interfaces (JSDoc) and Storybook argTypes.  
6. Test with real CMS HTML output in Storybook stories.

---

### Component Development Standards

**All components MUST follow these rules:**

#### 1. Use Global Container Component

All components must wrap their content in the global `Container` component for consistent layout:

```jsx
import { Container } from './Container';

export const MyComponent = ({ children }) => {
  return (
    <section className="my-component">
      <Container breakpoint={null} padding>
        {/* Component content */}
      </Container>
    </section>
  );
};
```

#### 2. Follow BEM Methodology

All CSS classes must follow BEM (Block Element Modifier) naming convention:

```css
/* Block */
.component-name {
  /* Block styles */
}

/* Element */
.component-name__element {
  /* Element styles */
}

/* Modifier */
.component-name--modifier {
  /* Modifier styles */
}

.component-name__element--modifier {
  /* Element modifier styles */
}
```

**Examples:**
- `.product-slider` (block)
- `.product-slider__header` (element)
- `.product-slider__card` (element)
- `.product-slider--disabled` (modifier, if needed)

#### 3. Mobile-First Responsive Design

All components must be built mobile-first with responsive breakpoints:

```css
/* Mobile-first base styles (default) */
.component-name {
  padding: 20px;
  font-size: 16px;
}

/* Tablet and up */
@media (min-width: 768px) {
  .component-name {
    padding: 30px;
    font-size: 18px;
  }
}

/* Desktop and up */
@media (min-width: 992px) {
  .component-name {
    padding: 50px;
    font-size: 20px;
  }
}
```

**Breakpoints:** Use standard breakpoints: 576px (sm), 768px (md), 992px (lg), 1200px (xl), 1400px (xxl)

#### 4. Section Wrapper & Header Patterns

- Top-level structural sections must include the shared `.wl-sec` utility class in addition to their component block class (e.g., `<section class="product-slider wl-sec">`).
- Reuse the `SectionHeader` component for shared headline/subheadline patterns instead of duplicating wrapper markup.
- `SectionHeader` allows you to set the semantic heading level with `headlineLevel` (defaults to `2`) while always rendering with the shared `h2` visual style, keeping typography consistent across components. Pass `align` (`left`, `center`, `right`) to control alignment without custom markup.
- **CRITICAL:** `.wl-sec__header` must only be styled globally in `SectionHeader.css`. Never add component-scoped overrides for `.wl-sec__header` in individual component CSS files.

#### 5. Slider / Carousel Navigation Rules

When building slider-style components (e.g., product carousels) follow these rules:
- Navigation controls must only render when there are more items than can be displayed at the current breakpoint. Hide arrows and disable sliding for 1 item on mobile, ≤2 items on tablet, and ≤3 items on desktop.
- When navigation is disabled, slides must remain centered within the wrapper so the layout does not collapse to the left.
- Keep touch/drag interactions disabled when navigation is hidden to avoid “dead” gestures.
- Use responsive logic that derives the visible slide count from breakpoints so themes do not need to duplicate this behaviour.

#### 6. Never Style HTML Tags Directly

**CRITICAL:** Never style Text Formatting and Content Grouping HTML tags directly. Only add classes on wrappers and style inner tags via selectors.

**Forbidden HTML tags to style directly:**
- Text Formatting: `<h1>` to `<h6>`, `<p>`, `<span>`, `<strong>`, `<em>`, `<b>`, `<i>`, `<br>`
- Content Grouping: `<ul>`, `<ol>`, `<li>`, `<dl>`, `<dt>`, `<dd>`
- Table Tags: `<table>`, `<thead>`, `<tbody>`, `<tfoot>`, `<tr>`, `<th>`, `<td>`
- Media Tags: `<img>`, `<video>`, `<audio>`, `<iframe>`

**Correct Pattern:**
```css
/* ❌ WRONG - Don't style HTML tags directly */
h1 { color: red; }
p { font-size: 16px; }
img { max-width: 100%; }

/* ✅ CORRECT - Style via wrapper class selector */
.component-name__header h1 {
  color: var(--color-text-primary);
}

.component-name__description p {
  font-size: var(--type-body-large-size);
}

.component-name__image-wrapper img {
  max-width: 100%;
  height: auto;
}
```

**For CMS content:** Use `WysiwygContent` component which applies global `.wysiwyg-content` styles. Component-specific overrides should target `.component-name__wrapper .wysiwyg-content h1`, etc.

#### 7. Storybook Field Type Documentation

Document field types in TypeScript + Storybook args:

```ts
export type ProductSliderProps = {
  headline?: string;     // Plain text field (internal copy)
  subheadline?: string;  // HTML string from the CMS rich text editor
  description?: string;  // HTML string from the CMS rich text editor
};

// In Storybook stories, use argTypes to reinforce the guidance
export default {
  component: ProductSlider,
  argTypes: {
    headline: {
      description: 'Plain text field - not from CMS',
      control: 'text',
    },
    subheadline: {
      description: 'HTML string from CMS rich text editor',
      control: 'text',
    },
  },
} satisfies Meta<typeof ProductSlider>;
```

**Note:** Storybook can track field types through:
- TypeScript doc comments / inline prop descriptions
- `argTypes` configuration (controls and descriptions)
- Story examples showing HTML strings vs plain text

#### 8. Social Media Icons Usage

**CRITICAL:** All social media icons MUST be imported from `./icons` folder. No custom icon code should exist in component files.

**Available icons:**
- `FacebookIcon` - Facebook social media icon
- `InstagramIcon` - Instagram social media icon
- `XTwitterIcon` - X (Twitter) social media icon

**Implementation Pattern:**

1. **Import icons from `./icons`:**
   ```jsx
   import { FacebookIcon, InstagramIcon, XTwitterIcon } from './icons';
   ```

2. **Create icon mapping for name resolution:**
   ```tsx
   const SOCIAL_ICON_COMPONENTS = {
     facebook: FacebookIcon,
     instagram: InstagramIcon,
     'x-twitter': XTwitterIcon,
   } as const;
   ```

3. **Resolve icons from name prop (recommended):**
   ```tsx
   const resolveIconKey = (value: string | null | undefined): 'facebook' | 'instagram' | 'x-twitter' | null => {
     if (!value || typeof value !== 'string') return null;
     const normalized = value.toLowerCase();
     
     if (normalized.includes('facebook')) return 'facebook';
     if (normalized.includes('instagram')) return 'instagram';
     if (normalized === 'x' || normalized.includes('x-twitter') || normalized.includes('x.com') || normalized.includes('twitter')) {
       return 'x-twitter';
     }
     return null;
   };
   
   // Usage in component
   const key = resolveIconKey(name);
   if (key) {
     const IconComponent = SOCIAL_ICON_COMPONENTS[key];
     if (IconComponent) {
       iconNode = <IconComponent size={iconSize} aria-hidden="true" color={iconColor ?? "currentColor"} />;
     }
   }
   ```

4. **Support automatic icon resolution with optional customization:**
   ```tsx
   export type SocialLink = {
     name?: string;
     href?: string;
     icon?: ReactNode;      // Optional: custom icon override
     iconSize?: number;     // Optional: size for auto-resolved icons (Footer only)
     iconColor?: string;    // Optional: color for auto-resolved icons (Footer only)
   };
   ```

**Rules:**
- ✅ Always import icons from `./icons` folder
- ✅ Use name-based resolution to automatically select the correct icon
- ✅ Allow optional `icon` prop for custom icon overrides (advanced use cases)
- ✅ Support `iconSize` and `iconColor` props for customization (where applicable)
- ❌ Never create inline SVG paths for social icons in component files
- ❌ Never import SVG files for social icons
- ❌ Never duplicate icon component code

**Components using icons:**
- `Footer` - Uses icons from `./icons`, supports `iconSize` and `iconColor` props
- `SocialMediaFeed` - Uses icons from `./icons` for platform badges and social links

---

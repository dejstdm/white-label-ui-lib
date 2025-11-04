export default {
  title: 'Foundation/Introduction',
  parameters: {
    layout: 'padded',
    previewTabs: {
      canvas: { hidden: true },
    },
    viewMode: 'docs',
  },
};

export const Welcome = {
  render: () => (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: 'var(--space-8)' }}>
      <h1 style={{ 
        fontFamily: 'var(--font-heading)',
        fontSize: 'var(--type-display-size)',
        fontWeight: 'var(--type-display-weight)',
        lineHeight: 'var(--type-display-line)',
        marginBottom: 'var(--space-6)',
      }}>
        WhiteLabel Design System
      </h1>
      
      <p style={{
        fontSize: 'var(--type-body-large-size)',
        lineHeight: 'var(--type-body-large-line)',
        color: 'var(--color-text-muted)',
        marginBottom: 'var(--space-8)',
      }}>
        A unified, role-based theming system for WhiteLabel Drupal projects. 
        One manifest drives Storybook, React components, and Drupal themes.
      </p>

      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2 style={{
          fontSize: 'var(--type-h2-size)',
          lineHeight: 'var(--type-h2-line)',
          marginBottom: 'var(--space-5)',
        }}>
          🎯 Goals
        </h2>
        <ul style={{ 
          fontSize: 'var(--type-body-large-size)',
          lineHeight: 'var(--type-body-large-line)',
        }}>
          <li>Single source of truth for all theming (theme.manifest.json)</li>
          <li>Zero manual CSS per brand</li>
          <li>100% WCAG AA accessibility compliance</li>
          <li>Fast brand setup (≤ 2 hours)</li>
          <li>Consistent design across Storybook and Drupal</li>
        </ul>
      </section>

      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2 style={{
          fontSize: 'var(--type-h2-size)',
          lineHeight: 'var(--type-h2-line)',
          marginBottom: 'var(--space-5)',
        }}>
          📦 What's Included
        </h2>
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 'var(--space-6)',
        }}>
          <Card 
            title="Design Tokens"
            description="Colors, typography, spacing, radii, and shadows"
          />
          <Card 
            title="Components"
            description="Container, Heading, Text, Button with BEM naming"
          />
          <Card 
            title="Theme Manifest"
            description="JSON-based configuration with validation"
          />
          <Card 
            title="Storybook Docs"
            description="Auto-generated documentation and controls"
          />
        </div>
      </section>

      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2 style={{
          fontSize: 'var(--type-h2-size)',
          lineHeight: 'var(--type-h2-line)',
          marginBottom: 'var(--space-5)',
        }}>
          🚀 Quick Start
        </h2>
        <ol style={{ 
          fontSize: 'var(--type-body-large-size)',
          lineHeight: 'var(--type-body-large-line)',
        }}>
          <li>Edit <code>themes/default/theme.manifest.json</code></li>
          <li>Compile to CSS: <code>npm run build-theme</code></li>
          <li>Preview in Storybook: <code>npm run storybook</code></li>
          <li>Deploy to Drupal theme</li>
        </ol>
      </section>

      <section>
        <h2 style={{
          fontSize: 'var(--type-h2-size)',
          lineHeight: 'var(--type-h2-line)',
          marginBottom: 'var(--space-5)',
        }}>
          📚 Documentation
        </h2>
        <ul style={{ 
          fontSize: 'var(--type-body-large-size)',
          lineHeight: 'var(--type-body-large-line)',
        }}>
          <li><strong>Foundation/Design Tokens</strong> - View all color, typography, spacing tokens</li>
          <li><strong>Layout/Container</strong> - Responsive grid container</li>
          <li><strong>Typography/Heading</strong> - Heading component with variants</li>
          <li><strong>Typography/Text</strong> - Text component for body copy</li>
          <li><strong>Components/Button</strong> - Button with solid, outline, and text variants</li>
        </ul>
      </section>
    </div>
  ),
};

const Card = ({ title, description }) => (
  <div style={{
    padding: 'var(--space-6)',
    background: 'var(--color-bg-section)',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--color-border)',
  }}>
    <h3 style={{
      fontSize: 'var(--type-h3-size)',
      fontWeight: 'var(--type-h3-weight)',
      marginBottom: 'var(--space-3)',
    }}>
      {title}
    </h3>
    <p style={{
      fontSize: 'var(--type-body-small-size)',
      color: 'var(--color-text-muted)',
      margin: 0,
    }}>
      {description}
    </p>
  </div>
);

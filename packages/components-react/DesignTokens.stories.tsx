import React from 'react';

export default {
  title: 'Foundation/Design Tokens',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export const Colors = {
  render: () => (
    <div>
      <h2>Colors</h2>
      
      <h3>Brand</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--space-5)' }}>
        <ColorSwatch name="brand-primary" value="var(--color-brand-primary)" />
        <ColorSwatch name="brand-on-primary" value="var(--color-brand-on-primary)" />
      </div>
      
      <h3>Background</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--space-5)' }}>
        <ColorSwatch name="bg-page" value="var(--color-bg-page)" />
        <ColorSwatch name="bg-section" value="var(--color-bg-section)" />
      </div>
      
      <h3>Text</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--space-5)' }}>
        <ColorSwatch name="text-primary" value="var(--color-text-primary)" />
        <ColorSwatch name="text-muted" value="var(--color-text-muted)" />
      </div>
      
      <h3>UI</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--space-5)' }}>
        <ColorSwatch name="border" value="var(--color-border)" />
        <ColorSwatch name="focus-ring" value="var(--color-focus-ring)" />
        <ColorSwatch name="success" value="var(--color-success)" />
        <ColorSwatch name="warning" value="var(--color-warning)" />
        <ColorSwatch name="danger" value="var(--color-danger)" />
      </div>
    </div>
  ),
};

export const Typography = {
  render: () => (
    <div>
      <h2>Typography Scale</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        <TypoSample 
          name="Display" 
          style={{
            fontFamily: 'var(--type-display-family, var(--font-heading))',
            fontSize: 'var(--type-display-size)',
            fontWeight: 'var(--type-display-weight)',
            lineHeight: 'var(--type-display-line)',
            letterSpacing: 'var(--type-display-spacing)',
          }}
        />
        <TypoSample 
          name="H1" 
          style={{
            fontFamily: 'var(--type-h1-family, var(--font-heading))',
            fontSize: 'var(--type-h1-size)',
            fontWeight: 'var(--type-h1-weight)',
            lineHeight: 'var(--type-h1-line)',
            letterSpacing: 'var(--type-h1-spacing)',
          }}
        />
        <TypoSample 
          name="H2" 
          style={{
            fontFamily: 'var(--type-h2-family, var(--font-heading))',
            fontSize: 'var(--type-h2-size)',
            fontWeight: 'var(--type-h2-weight)',
            lineHeight: 'var(--type-h2-line)',
            letterSpacing: 'var(--type-h2-spacing)',
          }}
        />
        <TypoSample 
          name="H3" 
          style={{
            fontFamily: 'var(--type-h3-family, var(--font-heading))',
            fontSize: 'var(--type-h3-size)',
            fontWeight: 'var(--type-h3-weight)',
            lineHeight: 'var(--type-h3-line)',
            letterSpacing: 'var(--type-h3-spacing)',
          }}
        />
        <TypoSample 
          name="H4" 
          style={{
            fontFamily: 'var(--type-h4-family, var(--font-heading))',
            fontSize: 'var(--type-h4-size)',
            fontWeight: 'var(--type-h4-weight)',
            lineHeight: 'var(--type-h4-line)',
            letterSpacing: 'var(--type-h4-spacing)',
          }}
        />
        <TypoSample 
          name="H5" 
          style={{
            fontFamily: 'var(--type-h5-family, var(--font-heading))',
            fontSize: 'var(--type-h5-size)',
            fontWeight: 'var(--type-h5-weight)',
            lineHeight: 'var(--type-h5-line)',
            letterSpacing: 'var(--type-h5-spacing)',
          }}
        />
        <TypoSample 
          name="H6" 
          style={{
            fontFamily: 'var(--type-h6-family, var(--font-heading))',
            fontSize: 'var(--type-h6-size)',
            fontWeight: 'var(--type-h6-weight)',
            lineHeight: 'var(--type-h6-line)',
            letterSpacing: 'var(--type-h6-spacing)',
          }}
        />
        <TypoSample 
          name="Body Large" 
          style={{
            fontFamily: 'var(--type-body-large-family, var(--font-body))',
            fontSize: 'var(--type-body-large-size)',
            fontWeight: 'var(--type-body-large-weight)',
            lineHeight: 'var(--type-body-large-line)',
            letterSpacing: 'var(--type-body-large-spacing)',
          }}
        />
        <TypoSample 
          name="Body Small" 
          style={{
            fontFamily: 'var(--type-body-small-family, var(--font-body))',
            fontSize: 'var(--type-body-small-size)',
            fontWeight: 'var(--type-body-small-weight)',
            lineHeight: 'var(--type-body-small-line)',
            letterSpacing: 'var(--type-body-small-spacing)',
          }}
        />
        <TypoSample 
          name="Label" 
          style={{
            fontFamily: 'var(--type-label-family, var(--font-bold))',
            fontSize: 'var(--type-label-size)',
            fontWeight: 'var(--type-label-weight)',
            lineHeight: 'var(--type-label-line)',
            letterSpacing: 'var(--type-label-spacing)',
          }}
        />
        <TypoSample 
          name="Small" 
          style={{
            fontFamily: 'var(--type-small-family, var(--font-body))',
            fontSize: 'var(--type-small-size)',
            fontWeight: 'var(--type-small-weight)',
            lineHeight: 'var(--type-small-line)',
            letterSpacing: 'var(--type-small-spacing)',
          }}
        />
      </div>
    </div>
  ),
};

export const Spacing = {
  render: () => (
    <div>
      <h2>Spacing Scale</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map(step => (
          <SpacingSample key={step} step={step} />
        ))}
      </div>
    </div>
  ),
};

export const Radii = {
  render: () => (
    <div>
      <h2>Border Radii</h2>
      <div style={{ display: 'flex', gap: 'var(--space-6)', flexWrap: 'wrap' }}>
        <RadiusSample name="none" value="var(--radius-none)" />
        <RadiusSample name="sm" value="var(--radius-sm)" />
        <RadiusSample name="md" value="var(--radius-md)" />
        <RadiusSample name="pill" value="var(--radius-pill)" />
      </div>
    </div>
  ),
};

export const Shadows = {
  render: () => (
    <div>
      <h2>Shadows</h2>
      <div style={{ display: 'flex', gap: 'var(--space-6)', flexWrap: 'wrap' }}>
        <ShadowSample name="sm" value="var(--shadow-sm)" />
        <ShadowSample name="md" value="var(--shadow-md)" />
        <ShadowSample name="lg" value="var(--shadow-lg)" />
      </div>
    </div>
  ),
};

const ColorSwatch = ({ name, value }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
    <div 
      style={{ 
        width: '100%', 
        height: '80px', 
        background: value,
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-sm)',
      }}
    />
    <div>
      <div style={{ fontWeight: 600, fontSize: '14px' }}>{name}</div>
      <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>{value}</div>
    </div>
  </div>
);

const TypoSample = ({ name, style }) => (
  <div>
    <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: 'var(--space-2)' }}>
      {name}
    </div>
    <div style={style}>
      The quick brown fox jumps over the lazy dog
    </div>
  </div>
);

const SpacingSample = ({ step }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-5)' }}>
    <div style={{ width: '100px', fontSize: '14px', fontWeight: 600 }}>
      --space-{step}
    </div>
    <div 
      style={{ 
        width: `var(--space-${step})`,
        height: '32px',
        background: 'var(--color-brand-primary)',
        borderRadius: 'var(--radius-sm)',
      }}
    />
    <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
      {step === 1 ? '2px' : step === 2 ? '4px' : step === 3 ? '8px' : step === 4 ? '12px' : step === 5 ? '16px' : step === 6 ? '24px' : step === 7 ? '32px' : '48px'}
    </div>
  </div>
);

const RadiusSample = ({ name, value }) => (
  <div style={{ textAlign: 'center' }}>
    <div 
      style={{ 
        width: '100px',
        height: '100px',
        background: 'var(--color-brand-primary)',
        borderRadius: value,
        marginBottom: 'var(--space-3)',
      }}
    />
    <div style={{ fontSize: '14px', fontWeight: 600 }}>{name}</div>
    <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>{value}</div>
  </div>
);

const ShadowSample = ({ name, value }) => (
  <div style={{ textAlign: 'center' }}>
    <div 
      style={{ 
        width: '120px',
        height: '80px',
        background: 'var(--color-bg-page)',
        boxShadow: value,
        borderRadius: 'var(--radius-md)',
        marginBottom: 'var(--space-3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>shadow-{name}</div>
    </div>
    <div style={{ fontSize: '14px', fontWeight: 600 }}>{name}</div>
  </div>
);

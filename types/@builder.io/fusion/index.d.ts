/**
 * Type stubs for @builder.io/fusion
 * This package is only available in Builder.io workspace, so we provide type definitions
 * for local development and type checking.
 */

export type PropType = 'string' | 'number' | 'boolean' | 'array' | 'object' | 'function';

export type PropDefinition = {
  type: PropType | string;
  description?: string;
  required?: boolean;
  defaultValue?: unknown;
  enum?: readonly unknown[];
  itemType?: Record<string, PropDefinition>;
};

export type ComponentMetaConfig = {
  name: string;
  category: string;
  displayName?: string;
  description?: string;
  props?: Record<string, PropDefinition>;
  constraints?: {
    maxDepth?: number;
    [key: string]: unknown;
  };
  [key: string]: unknown;
};

export type AgentConfig = {
  name: string;
  designSystem?: {
    path?: string;
    components?: string;
    metadata?: string;
    [key: string]: unknown;
  };
  constraints?: {
    maxDepth?: number;
    allowedCategories?: string[];
    disallowRawHtml?: boolean;
    [key: string]: unknown;
  };
  guidance?: {
    brandVoice?: string;
    layoutGoals?: string[];
    a11yGoals?: string[];
    [key: string]: unknown;
  };
  [key: string]: unknown;
};

export function defineComponentMeta(config: ComponentMetaConfig): ComponentMetaConfig;
export function defineAgent(config: AgentConfig): AgentConfig;


import type { CellPluginComponentProps } from '@kehila/react-page-editor';
import type { SpacerState } from './state';
import type { Translations } from './translations';

export interface SpacerSettings {
  Renderer: React.ComponentType<CellPluginComponentProps<SpacerState>>;

  translations?: Translations;
}

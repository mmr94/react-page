import type { CellPluginComponentProps } from '@kehila/react-page-editor';
import type { Translations } from './translations';

export interface DividerSettings {
  Renderer: React.ComponentType<CellPluginComponentProps>;
  translations?: Translations;
}

import { render } from 'react-dom';
import type { Settings } from '../shared';
import { createTheme, ThemeProviders } from '../shared';
import Navigation from './Navigation';

export async function renderNavigation(settings: Settings, container: HTMLElement) {
  render(
    <ThemeProviders theme={createTheme(settings)}>
      <Navigation />
    </ThemeProviders>,
    container
  );
}

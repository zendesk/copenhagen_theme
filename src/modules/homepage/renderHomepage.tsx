import { render } from 'react-dom';
import { HomepageData } from '../../lib/types';
import { Settings } from '../shared';
import { createTheme, ThemeProviders } from '../shared';
import Homepage from './Homepage';

export async function renderHomepage(
  settings: Settings,
  homepageData: HomepageData,
  container: HTMLElement
) {
  render(
    <ThemeProviders theme={createTheme(settings)}>
      <Homepage homepageData={homepageData} />
    </ThemeProviders>,
    container
  );
}

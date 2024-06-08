import { withThemeByClassName } from '@storybook/addon-themes';
import {
  INITIAL_VIEWPORTS,
  MINIMAL_VIEWPORTS,
} from '@storybook/addon-viewport';
import type { Preview } from '@storybook/react';
import {
  AppRouterContext,
  AppRouterInstance,
} from 'next/dist/shared/lib/app-router-context.shared-runtime';
import React from 'react';
import { Toaster } from 'sonner';

import '../src/tailwind.css';

const mockRouter: AppRouterInstance = {
  push: () => Promise.resolve(true),
  prefetch: () => Promise.resolve(),
  replace: () => Promise.resolve(true),
  back: () => {},
  forward: () => Promise.resolve(true),
  refresh: () => Promise.resolve(),
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      viewport: {
        viewports: {
          ...INITIAL_VIEWPORTS,
          ...MINIMAL_VIEWPORTS,
        },
        defaultViewport: 'iphone14pro',
      },
    },
  },
  decorators: [
    (Story) => {
      return (
        <AppRouterContext.Provider value={mockRouter}>
          <div
            style={{
              padding: '20 10',
            }}
          >
            <Toaster position="top-center" />
            <Story />
          </div>
        </AppRouterContext.Provider>
      );
    },
  ],
};

export const decorators = [
  withThemeByClassName({
    themes: {
      light: 'light',
      dark: 'dark',
    },
    defaultTheme: 'dark',
  }),
];

export default preview;

import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import type { Metadata } from 'next';

import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

import { AppSnackbar } from '@app/_components/_core';
import { CONFIG } from '@app/_config';
import '@app/_themes/assets/fonts/noir-pro/styles.css';
import '@app/_utilities/style/style.css';
import {
  JumboConfigProvider,
  JumboDialog,
  JumboDialogProvider,
  JumboTheme,
} from '@jumbo/components';
import { CssBaseline } from '@mui/material';
import Link from 'next/link';

declare module '@mui/material/styles' {
  interface Theme {
    type: 'light' | 'semi-dark' | 'dark';
    sidebar: {
      bgimage: string;
      overlay: {
        bgcolor: string;
        bgimage: string;
        opacity: number;
      };
    };
    jumboComponents: {
      JumboNavbar: {
        nav: {
          action: {
            active: string;
            hover: string;
          };
          background: {
            active: string;
            hover: string;
          };
          tick: {
            active: string;
            hover: string;
          };
        };
      };
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    type?: 'light' | 'semi-dark' | 'dark';
    sidebar?: {
      bgimage?: string;
      overlay?: {
        bgcolor?: string;
        bgimage?: string;
        opacity?: number;
      };
    };
    jumboComponents?: {
      JumboNavbar?: {
        nav?: {
          action?: {
            active?: string;
            hover?: string;
          };
          background?: {
            active?: string;
            hover?: string;
          };
          tick?: {
            active?: string;
            hover?: string;
          };
        };
      };
    };
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en-US' }];
}
export const metadata: Metadata = {
  title: 'Jumbo - Admin Dashboard',
  icons: '/assets/images/favicon.ico',
};

export default async function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: Params;
}) {
  return (
    <html lang={lang}>
      <body>
        <div id='root'>
          <AppRouterCacheProvider>
            <JumboConfigProvider LinkComponent={Link}>
              <JumboTheme init={CONFIG.THEME}>
                <CssBaseline />
                <JumboDialogProvider>
                  <JumboDialog />
                  <AppSnackbar>{children}</AppSnackbar>
                </JumboDialogProvider>
              </JumboTheme>
            </JumboConfigProvider>
          </AppRouterCacheProvider>
        </div>
      </body>
    </html>
  );
}

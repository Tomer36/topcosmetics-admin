'use client';
import { useJumboTheme } from '@jumbo/components/JumboTheme/hooks';
import {
  LayoutContentOptions,
  LayoutContext,
  LayoutFooterOptions,
  LayoutHeaderOptions,
  LayoutMainOptions,
  LayoutOptions,
  LayoutRootOptions,
  LayoutSidebarOptions,
  LayoutWrapperOptions,
} from '@jumbo/types';
import { LAYOUT_ACTIONS, SIDEBAR_VARIANTS } from '@jumbo/utilities/constants';
import { useMediaQuery } from '@mui/system';
import React from 'react';
import { JumboLayoutContext, defaultLayoutOptions } from './JumboLayoutContext';
import { jumboLayoutReducer } from './reducer';

function JumboLayoutProvider({
  children,
  layoutConfig,
  debugOptions,
}: {
  children: React.ReactNode;
  layoutConfig?: LayoutOptions;
  debugOptions?: any;
}) {
  const [layoutOptions, setLayoutOptions] = React.useReducer(
    jumboLayoutReducer,
    layoutConfig ?? defaultLayoutOptions
  );

  //handle mobile screen sizes
  const { theme } = useJumboTheme();
  const isBelowLg = useMediaQuery(
    theme.breakpoints.down(layoutOptions.sidebar?.drawerBreakpoint ?? 'xl')
  );

  const prevLayoutOptions = React.useMemo(() => {
    if (isBelowLg) {
      return layoutOptions.sidebar;
    }
    return null;
  }, [layoutOptions.sidebar, isBelowLg]);

  React.useEffect(() => {
    if (!layoutOptions.sidebar?.hide) {
      if (isBelowLg) {
        setLayoutOptions({
          type: LAYOUT_ACTIONS.SET_SIDEBAR_OPTIONS,
          payload: {
            variant: SIDEBAR_VARIANTS.TEMPORARY,
            open: false,
          },
        });
      } else {
        if (prevLayoutOptions) {
          setLayoutOptions({
            type: LAYOUT_ACTIONS.SET_SIDEBAR_OPTIONS,
            payload: prevLayoutOptions,
          });
        }
      }
    }
  }, [isBelowLg, prevLayoutOptions, layoutOptions.sidebar?.hide]);

  React.useEffect(() => {
    if (layoutConfig)
      setLayoutOptions({
        type: LAYOUT_ACTIONS.SET_OPTIONS,
        payload: layoutConfig,
      });
  }, [layoutConfig]);

  const setHeaderOptions = React.useCallback((options: LayoutHeaderOptions) => {
    setLayoutOptions({
      type: LAYOUT_ACTIONS.SET_HEADER_OPTIONS,
      payload: options,
    });
  }, []);

  const setSidebarOptions = React.useCallback(
    (options: LayoutSidebarOptions) => {
      setLayoutOptions({
        type: LAYOUT_ACTIONS.SET_SIDEBAR_OPTIONS,
        payload: options,
      });
    },
    []
  );

  const setFooterOptions = React.useCallback((options: LayoutFooterOptions) => {
    setLayoutOptions({
      type: LAYOUT_ACTIONS.SET_FOOTER_OPTIONS,
      payload: options,
    });
  }, []);

  const setRootOptions = React.useCallback((options: LayoutRootOptions) => {
    setLayoutOptions({
      type: LAYOUT_ACTIONS.SET_ROOT_OPTIONS,
      payload: options,
    });
  }, []);

  const setContentOptions = React.useCallback(
    (options: LayoutContentOptions) => {
      setLayoutOptions({
        type: LAYOUT_ACTIONS.SET_CONTENT_OPTIONS,
        payload: options,
      });
    },
    []
  );

  const setWrapperOptions = React.useCallback(
    (options: LayoutWrapperOptions) => {
      setLayoutOptions({
        type: LAYOUT_ACTIONS.SET_WRAPPER_OPTIONS,
        payload: options,
      });
    },
    []
  );

  const setMainOptions = React.useCallback((options: LayoutMainOptions) => {
    setLayoutOptions({
      type: LAYOUT_ACTIONS.SET_MAIN_OPTIONS,
      payload: options,
    });
  }, []);

  const setOptions = React.useCallback((options: LayoutOptions) => {
    setLayoutOptions({
      type: LAYOUT_ACTIONS.SET_OPTIONS,
      payload: options,
    });
  }, []);

  const layoutContext: LayoutContext = React.useMemo(
    () => ({
      layoutOptions,
      headerOptions: layoutOptions.header,
      sidebarOptions: layoutOptions.sidebar,
      footerOptions: layoutOptions.footer,
      contentOptions: layoutOptions.content,
      rootOptions: layoutOptions.root,
      wrapperOptions: layoutOptions.wrapper,
      mainOptions: layoutOptions.main,
      debugOptions,
      setHeaderOptions,
      setSidebarOptions,
      setFooterOptions,
      setContentOptions,
      setRootOptions,
      setWrapperOptions,
      setMainOptions,
      setOptions,
    }),
    [
      layoutOptions,
      debugOptions,
      setHeaderOptions,
      setFooterOptions,
      setSidebarOptions,
      setContentOptions,
      setRootOptions,
      setWrapperOptions,
      setMainOptions,
      setOptions,
    ]
  );

  return (
    <JumboLayoutContext.Provider value={layoutContext}>
      {children}
    </JumboLayoutContext.Provider>
  );
}

export { JumboLayoutProvider };

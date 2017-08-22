// @flow weak
/* eslint-disable no-underscore-dangle */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { JssProvider } from 'react-jss';
import { getContext } from 'docs/src/modules/styles/context';
import { connect } from 'react-redux';
import AppFrame from 'docs/src/modules/components/AppFrame';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createMuiTheme from 'material-ui/styles/theme';
import createPalette from 'material-ui/styles/palette';
import { setPrismTheme } from 'docs/src/modules/utils/prism'

const palette = createPalette({
  primary: {
    50: '#edf0f5',
    100: '#dae1ea',
    200: '#c9d2e0',
    300: '#92a5c0',
    400: '#5b77a0',
    500: '#1c427b',
    600: '#193b6e',
    700: '#163461',
    800: '#132d54',
    900: '#102647',
    A100: '#d6ebf7',
    A200: '#c2e2f4',
    A400: '#47a7dc',
    A700: '#0076b5',
    contrastDefaultColor: 'light'
  },
  accent: {
    50: '#fefcf8',
    100: '#fdf9f0',
    200: '#fcf6e9',
    300: '#faedd3',
    400: '#f6e3bc',
    500: '#f3d8a2',
    600: '#e6cc9a',
    700: '#d9c191',
    800: '#ccb689',
    900: '#bfaa80',
    A100: '#f0d2a2',
    A200: '#dfa13c',
    A400: '#c48d35',
    A700: '#ab7b2e',
    contrastDefaultColor: 'dark'
  }
})

const fontFamily = '"museo-sans", Arial, Helvetica, sans-serif'
const fontWeightLight = 300
const fontWeightRegular = 300
const fontWeightMedium = 500
const theme = createMuiTheme({
  palette: palette,
  typography: {
    fontFamily: fontFamily,
    fontSize: 14,
    fontWeightLight: fontWeightLight,
    fontWeightRegular: fontWeightRegular,
    fontWeightMedium: fontWeightMedium,
    display4: {
      fontSize: 112,
      fontWeight: fontWeightLight,
      fontFamily,
      letterSpacing: '-.04em',
      lineHeight: 1,
      color: palette.text.secondary,
    },
    display3: {
      fontSize: 56,
      fontWeight: fontWeightRegular,
      fontFamily,
      letterSpacing: '-.02em',
      lineHeight: 1.35,
      color: palette.text.secondary,
    },
    display2: {
      fontSize: 45,
      fontWeight: fontWeightRegular,
      fontFamily,
      lineHeight: '48px',
      color: palette.text.secondary,
    },
    display1: {
      fontSize: 34,
      fontWeight: fontWeightRegular,
      fontFamily,
      lineHeight: '40px',
      color: palette.text.secondary,
    },
    headline: {
      fontSize: 24,
      fontWeight: fontWeightRegular,
      fontFamily,
      lineHeight: '32px',
      color: palette.text.primary,
    },
    title: {
      fontSize: 21,
      fontWeight: fontWeightMedium,
      fontFamily,
      lineHeight: 1,
      color: palette.text.primary,
    },
    subheading: {
      fontSize: 15,
      fontWeight: fontWeightRegular,
      fontFamily,
      lineHeight: '22px',
      color: palette.text.primary,
    },
    body2: {
      fontSize: 14,
      fontWeight: fontWeightMedium,
      fontFamily,
      lineHeight: '24px',
      color: palette.text.primary,
    },
    body1: {
      fontSize: 14,
      fontWeight: fontWeightRegular,
      fontFamily,
      lineHeight: '20px',
      color: palette.text.primary,
    },
    caption: {
      fontSize: 12,
      fontWeight: fontWeightRegular,
      fontFamily,
      lineHeight: 1,
      color: palette.text.secondary,
    },
    button: {
      fontSize: 14,
      textTransform: 'uppercase',
      fontWeight: fontWeightMedium,
      fontFamily,
    },
  },
  overrides: {

  },
  // shadows
  // transitions
  // mixins
  // spacing
  // breakpoints
  // zIndex
})

// Injected the insertion-point-jss after docssearch
if (process.browser && !global.__INSERTION_POINT__) {
  global.__INSERTION_POINT__ = true;
  const styleNode = document.createComment('insertion-point-jss');
  const docsearchStylesSheet = document.querySelector('#insertion-point-jss');

  if (document.head && docsearchStylesSheet) {
    document.head.insertBefore(styleNode, docsearchStylesSheet.nextSibling);
  }
}

class AppWrapper extends Component {
  componentWillMount() {
    this.styleContext = getContext();
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  styleContext = null;

  render() {
    const { children } = this.props;

    return (
      <JssProvider registry={this.styleContext.sheetsRegistry} jss={this.styleContext.jss}>
        <MuiThemeProvider
          theme={theme}
          sheetsManager={this.styleContext.sheetsManager}
        >
          <AppFrame>
            {children}
          </AppFrame>
        </MuiThemeProvider>
      </JssProvider>
    );
  }
}

AppWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  dark: PropTypes.bool.isRequired,
};

export default connect(state => state.theme)(AppWrapper);

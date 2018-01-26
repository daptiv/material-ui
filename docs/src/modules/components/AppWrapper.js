/* eslint-disable no-underscore-dangle */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Reboot from 'material-ui/Reboot';
import JssProvider from 'react-jss/lib/JssProvider';
import getPageContext, { getTheme } from 'docs/src/modules/styles/getPageContext';
import AppFrame from 'docs/src/modules/components/AppFrame';
import { lightTheme, darkTheme, setPrismTheme } from 'docs/src/modules/utils/prism';
import GoogleTag from 'docs/src/modules/components/GoogleTag';

const cpBlueDark = {
  50: '#1c427b',
  100: '#edf0f5',
  200: '#dae1ea',
  300: '#c9d2e0',
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
  contrastDefaultColor: 'light',
};

const cpGoldLight = {
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
  A100: '#faf0e0',
  A200: '#f8e9d0',
  A400: '#e8bb72',
  A700: '#c48d35',
  contrastDefaultColor: 'dark',
};

const palette = {
  primary: cpBlueDark,
  secondary: cpGoldLight,
};

const fontFamily = '"museo-sans", Arial, Helvetica, sans-serif';
const fontWeightLight = 300;
const fontWeightRegular = 300;
const fontWeightMedium = 500;
const typography = {
  fontFamily,
  fontSize: 14,
  fontWeightLight,
  fontWeightRegular,
  fontWeightMedium,
  display4: {
    fontSize: 112,
    fontWeight: fontWeightLight,
    fontFamily,
    letterSpacing: '-.04em',
    lineHeight: 1,
  },
  display3: {
    fontSize: 56,
    fontWeight: fontWeightRegular,
    fontFamily,
    letterSpacing: '-.02em',
    lineHeight: 1.35,
  },
  display2: {
    fontSize: 45,
    fontWeight: fontWeightRegular,
    fontFamily,
    lineHeight: '48px',
  },
  display1: {
    fontSize: 34,
    fontWeight: fontWeightRegular,
    fontFamily,
    lineHeight: '40px',
  },
  headline: {
    fontSize: 24,
    fontWeight: fontWeightRegular,
    fontFamily,
    lineHeight: '32px',
  },
  title: {
    fontSize: 21,
    fontWeight: fontWeightMedium,
    fontFamily,
    lineHeight: 1,
  },
  subheading: {
    fontSize: 15,
    fontWeight: fontWeightRegular,
    fontFamily,
    lineHeight: '22px',
  },
  body2: {
    fontSize: 14,
    fontWeight: fontWeightMedium,
    fontFamily,
    lineHeight: '24px',
  },
  body1: {
    fontSize: 14,
    fontWeight: fontWeightRegular,
    fontFamily,
    lineHeight: '20px',
  },
  caption: {
    fontSize: 12,
    fontWeight: fontWeightRegular,
    fontFamily,
    lineHeight: 1,
  },
  button: {
    fontSize: 14,
    textTransform: 'uppercase',
    fontWeight: fontWeightMedium,
    fontFamily,
  },
};

const daptivTheme = createMuiTheme({
  palette,
  typography,
});

// Inject the insertion-point-jss after docssearch
if (process.browser && !global.__INSERTION_POINT__) {
  global.__INSERTION_POINT__ = true;
  const styleNode = document.createComment('insertion-point-jss');
  const docsearchStylesSheet = document.querySelector('#insertion-point-jss');

  if (document.head && docsearchStylesSheet) {
    document.head.insertBefore(styleNode, docsearchStylesSheet.nextSibling);
  }
}

class AppWrapper extends React.Component {
  componentWillMount() {
    this.pageContext = this.props.pageContext || getPageContext();
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }

    if (this.props.uiTheme.paletteType === 'light') {
      setPrismTheme(lightTheme);
    } else {
      setPrismTheme(darkTheme);
    }

    if (document.body) {
      document.body.dir = this.props.uiTheme.direction;
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.uiTheme.paletteType !== this.props.uiTheme.paletteType ||
      nextProps.uiTheme.direction !== this.props.uiTheme.direction
    ) {
      this.pageContext.theme = getTheme(nextProps.uiTheme);

      if (nextProps.uiTheme.paletteType === 'light') {
        setPrismTheme(lightTheme);
      } else {
        setPrismTheme(darkTheme);
      }

      if (document.body) {
        document.body.dir = nextProps.uiTheme.direction;
      }
    }
  }

  context = null;

  render() {
    const { children } = this.props;
    // eslint-disable-next-line no-console
    console.dir(this.pageContext.theme);
    return (
      <JssProvider
        jss={this.pageContext.jss}
        registry={this.pageContext.sheetsRegistry}
        generateClassName={this.pageContext.generateClassName}
      >
        <MuiThemeProvider
          theme={daptivTheme}
          sheetsManager={this.pageContext.sheetsManager}
        >
          <Reboot />
          <AppFrame>{children}</AppFrame>
          <GoogleTag />
        </MuiThemeProvider>
      </JssProvider>
    );
  }
}

AppWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  pageContext: PropTypes.object,
  uiTheme: PropTypes.object.isRequired,
};

export default connect(state => ({
  uiTheme: state.theme,
}))(AppWrapper);

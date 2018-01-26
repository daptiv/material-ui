import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

const SvgIconCustom = global.__MUI_SvgIcon__ || SvgIcon;

let SignalCellularOff = props =>
  <SvgIconCustom {...props}>
    <path d="M21 1l-8.59 8.59L21 18.18V1zM4.77 4.5L3.5 5.77l6.36 6.36L1 21h17.73l2 2L22 21.73 4.77 4.5z" />
  </SvgIconCustom>;

SignalCellularOff = pure(SignalCellularOff);
SignalCellularOff.muiName = 'SvgIcon';

export default SignalCellularOff;

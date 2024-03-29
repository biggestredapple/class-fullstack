import React from 'react';
import { Box, InputBase, InputBaseProps } from '@mui/material';
import { IconInputComponentStyle } from './index.style';

type IconInputComponentProps = InputBaseProps & {
  frontIcon?: React.ReactNode,
  placeholder?: string
};

export const IconInputComponent: React.FC<IconInputComponentProps> = (props) => {
  const { frontIcon, placeholder, ...rest } = props;

  return <IconInputComponentStyle>
    { !!frontIcon && <Box className='icon-container'>{frontIcon}</Box>}
    <InputBase
      className='input-container'
      placeholder={placeholder}
      {...rest}
    />
  </IconInputComponentStyle>
}
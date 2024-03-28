import React, { useRef } from 'react';
import { UseFormRegister, RegisterOptions } from 'react-hook-form';
import { Box, InputBase, InputBaseProps } from '@mui/material';
import { InputComponentStyle } from './index.style';

type InputComponentProps = InputBaseProps & {
  label?: string;
  frontIcon?: React.ReactNode;
  backIcon?: React.ReactNode;
  inputSize?: 'regular' | 'large';
  register?: UseFormRegister<any>;
  options?: RegisterOptions
};

const defaultProps: Pick<InputComponentProps, 'inputSize'> = {
  inputSize: 'regular',
};

export const InputComponent: React.FC<InputComponentProps> = (props) => {
  props = { ...defaultProps, ...props };

  const { label, inputSize, frontIcon, backIcon, name: fieldName, register, options, ...rest } = props;

  const parentRef = useRef<HTMLDivElement>(null);

  return <InputComponentStyle
    inputSize={inputSize!}
    label={label}
  >
    { !!frontIcon && <Box className='icon-container front'>{frontIcon}</Box> }

    <Box className='text-container' ref={parentRef}>
      { !!label && <Box className='label'>{label}</Box> }
      <InputBase
        className='text'
        {...rest}
        {...(register && register(fieldName!, options))}
      />
    </Box>

    { !!backIcon && <Box className='icon-container front'>{backIcon}</Box> }
  </InputComponentStyle>
}
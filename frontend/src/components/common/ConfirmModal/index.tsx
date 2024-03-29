import React from 'react';
import { Box, BoxProps, Stack, Button } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import { ConfirmModalStyle } from './index.style';

type ConfirmModalProps = BoxProps & {
  closeModal: () => void;
  confirmModal: () => void;
};

export const ConfirmModal: React.FC<ConfirmModalProps> = (props) => {
  const { closeModal, confirmModal } = props;

  return <ConfirmModalStyle>
    <Box className='container'>
      <Box className='header'>
        <WarningIcon className='warning' />
      </Box>
      <Box className='content'>
        Once you confirmed, it cannot be undone. Are you sure?
      </Box>
      <Box className='footer'>
        <Stack spacing={2} direction='row'>
          <Button className='btn contained' variant='outlined' onClick={confirmModal}> Confirm </Button>
          <Button className='btn' variant='outlined' onClick={closeModal}> Cancel </Button>
        </Stack>
      </Box>
    </Box>
  </ConfirmModalStyle>
}
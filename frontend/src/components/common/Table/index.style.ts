import { StyledComponentProps, styled } from '@mui/material';

import { CustomTheme } from 'styles/themes/types';

type TableComponentStyleProps = StyledComponentProps & {};

export const TableComponenteStyle = styled('div')<TableComponentStyleProps>(
  ({ theme }: any) => {
    const customTheme = theme as CustomTheme;

    return {
      '.MuiTableHead-root': {
        backgroundColor: customTheme.colors.black
      },
      
      '.MuiTableRow-root': {
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.08)'
        }
      },

      '.cursor-pointer': {
        cursor: 'pointer'
      }
    }
  }
);

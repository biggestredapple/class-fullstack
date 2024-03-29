import { StyledComponentProps, styled } from '@mui/material';

import { CustomTheme } from 'styles/themes/types';

type AddIngredientComponentStyleProps = StyledComponentProps & {};

export const AddIngredientComponentStyle = styled('div')<AddIngredientComponentStyleProps>(
  ({ theme }: any) => {
    const customTheme = theme as CustomTheme;

    return {
      width: '100%',
      display: 'flex',

      '.stack-container': {
        width: '100%'
      }
    }
  }
);

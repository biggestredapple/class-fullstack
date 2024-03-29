import { StyledComponentProps, styled } from '@mui/material';

import { CustomTheme } from 'styles/themes/types';

type RecipeModalStyleProps = StyledComponentProps & {};

export const RecipeModalStyle = styled('div')<RecipeModalStyleProps>(
  ({ theme }: any) => {
    const customTheme = theme as CustomTheme;

    return {
      position: 'fixed',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      zIndex: 100,

      '.modal-container': {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '40rem',
        backgroundColor: customTheme.colors.primary00,
        border: `1px solid ${customTheme.colors.primary20}`,
        borderRadius: '0.5rem',
        boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)',
        p: 4,
        color: customTheme.colors.textPrimary00,

        '.modal-header': {
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '1.2rem',
          textTransform: 'uppercase',
          padding: '1rem'
        },

        '.modal-content': {
          padding: '2rem 1rem',

          '.selected-ingredients': {

            '.selected-ingredient-list': {
              display: 'inline-block',

              '.selected-ingredient': {
                backgroundColor: customTheme.colors.primary20,
                borderRadius: '1rem',
                padding: '0.25rem 0.5rem',
                float: 'left',
                marginRight: '0.5rem',
                marginBottom: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
        
                'span': {
                  fontSize: '1rem',
                },
        
                'button': {
                  minWidth: '5px',
                  marginLeft: '0.5rem',
                  padding: '0'
                }
              }
            }
          }
        },

        '.modal-footer': {
          padding: '1rem',
          display: 'flex',
          justifyContent: 'end',
        }
      }
    }
  }
);

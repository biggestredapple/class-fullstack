import React, { useCallback, useState } from 'react';
import { BoxProps, Box, Button, Stack } from '@mui/material';
import { IconInputComponent } from '../IconInput';
import { AddIngredientComponentStyle } from './index.style';

type AddIngredientComponentProps = BoxProps & {
  add: (newIngredient: string) => void;
};

export const AddIngredientComponent: React.FC<AddIngredientComponentProps> = (props) => {
  const { add } = props;

  const [newIngredient, setNewIngredient] = useState<string>('');

  const handleInputChange = useCallback((e: any) => {
    setNewIngredient(e.target.value);
  }, []);

  const handleAddClick = useCallback(() => {
    add(newIngredient);
    setNewIngredient('');
  }, [add, newIngredient]);

  return <AddIngredientComponentStyle>
    <Stack className='stack-container' spacing={2} direction='row'>
      <IconInputComponent placeholder='New ingredient...' value={newIngredient} onChange={handleInputChange} />
      <Button className='btn' variant='outlined' onClick={handleAddClick} disabled={newIngredient === ''}> Add </Button>
    </Stack>
  </AddIngredientComponentStyle>
}
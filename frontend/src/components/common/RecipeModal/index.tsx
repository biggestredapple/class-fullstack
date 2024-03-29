import React, { useCallback, useEffect } from 'react';
import { Box, Divider, Button, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { InputComponent } from '../Input';
import { ConfirmModal } from '../ConfirmModal';
import { AddIngredientComponent } from '../AddIngredient';
import { RecipeModalStyle } from './index.style';
import { CancelSVG } from 'assets/icon';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Recipe } from 'models';
import { RecipeAction } from 'consts';
import { useConfirmModal } from 'hooks';

type RecipeModalProps = {
  recipe: Recipe;
  actionType: RecipeAction;
  cancelAction: () => void;
  confirmAction: (recipe: Recipe) => void;
};

enum ModalTitle {
  CREATE = 'Create Recipe',
  UPDATE = 'Update Recipe'
};

const schema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  instruction: Yup.string().required('Instructions is required'),
  ingredients: Yup.array().of(Yup.string().required('Ingredient is required')).min(1, 'Need to provide at least one ingredient').defined()
});

const defaultCreateRecipeValue = {
  title: '',
  instruction: '',
  ingredients: [],
  uuid: ''
} as Recipe;

export const RecipeModal: React.FC<RecipeModalProps> = (props) => {
  const { recipe, actionType, cancelAction, confirmAction, ...rest } = props;

  const {
    isShowing: isConfirmModalShow,
    isConfirm: isConfirmAction,
    show: showConfirmModal,
    close: closeConfirmModal,
    confirm: confirmUserAction
  } = useConfirmModal();

  const { register, formState: { errors, isValid }, getValues, setValue, watch } = useForm<Recipe>({
    resolver: yupResolver(schema),
    defaultValues: actionType === RecipeAction.CREATE ? defaultCreateRecipeValue : recipe
  });

  const handleConfirmClick = useCallback(() => {
    showConfirmModal();
  }, [showConfirmModal]);

  const handleAddNewIngredient = useCallback((newIngredient: string) => {
    const currentIngredients = getValues().ingredients ?? [];
    setValue('ingredients', [...currentIngredients, newIngredient]);
  }, [getValues, setValue]);

  const handleRemoveIngredient = useCallback((ingredientIndex: number) => {
    const currentIngredients = getValues().ingredients;
    const filteredIngredients = (currentIngredients.slice(0, ingredientIndex)).concat(currentIngredients.slice(ingredientIndex + 1, currentIngredients.length));
    setValue('ingredients', filteredIngredients);
  }, [getValues, setValue]);

  const handleConfirmUserAction = useCallback(() => {
    confirmAction(getValues());
    confirmUserAction();
  }, [getValues, confirmAction, confirmUserAction]);

  useEffect(() => {
    if (recipe) {
      setValue('title', recipe.title);
      setValue('instruction', recipe.instruction);
      setValue('ingredients', recipe.ingredients);
      setValue('uuid', recipe.uuid);
    }
  }, [recipe, setValue]);

  return <RecipeModalStyle>
    <Box className='modal-container'>
      <Box className='modal-header'>
        {
          actionType === RecipeAction.CREATE 
            ? ModalTitle.CREATE
            : actionType === RecipeAction.UPDATE
              ? ModalTitle.UPDATE
              : '' 
        }
        <CloseIcon onClick={cancelAction} />
      </Box>
      <Divider />

      <Box className='modal-content'>
        <Stack spacing={2}>
          <InputComponent
            label='Title'
            name='title'
            register={register}
          />
          <InputComponent 
            label='Instructions'
            name='instruction'
            register={register}
          />
          <Box className='selected-ingredients'>
            <Stack spacing={2} direction='column'>
              <Box> Ingredients </Box>
              <AddIngredientComponent add={handleAddNewIngredient} />
              <Box className='selected-ingredient-list'>
                {
                  watch().ingredients && watch().ingredients.map((ingredient, index) => (
                    <Box className='selected-ingredient' key={index}>
                      <span>{ingredient}</span>
                      <Button onClick={() => {handleRemoveIngredient(index)}}> <img src={CancelSVG} /> </Button>
                    </Box>
                  ))
                }
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Box>
      <Divider />

      <Box className='modal-footer'>
        <Stack spacing={2} direction='row'>
          <Button className='btn contained' variant='outlined' onClick={handleConfirmClick}>
            { actionType === RecipeAction.CREATE? 'Create': 'Update' }
          </Button>
          <Button className='btn' variant='outlined' onClick={cancelAction}> Cancel </Button>
        </Stack>
      </Box>
    </Box>

    {
      isConfirmModalShow && <ConfirmModal
        closeModal={closeConfirmModal}
        confirmModal={handleConfirmUserAction}
      />
    }
  </RecipeModalStyle>
}
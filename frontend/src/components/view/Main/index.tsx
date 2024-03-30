import React, { useEffect, useState, useCallback } from 'react';
import { Box, BoxProps, Button, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { MainViewStyle } from './index.style';
import { IconInputComponent, TableComponent, RecipeModal, ConfirmModal } from 'components/common';
import AddIcon from '@mui/icons-material/Add';
import { Recipe } from 'models';
import { AppActionType } from 'redux/store';
import { RecipeAction } from 'consts';
import { debounce } from 'lodash';
import { useConfirmModal } from 'hooks';

type MainViewProps = BoxProps & {
  recipes: Recipe[];
  recipe: Recipe;
  totalCount: number;
  createRecipe: (data: AppActionType.Recipe.CreateRecipeRequestAction) => void;
  updateRecipe: (data: AppActionType.Recipe.UpdateRecipeRequestAction) => void;
  getRecipes: (data: AppActionType.Recipe.GetRecipesRequestAction) => void;
  getCertainRecipe: (data: AppActionType.Recipe.GetCertainRecipeRequestAction) => void;
  deleteRecipe: (data: AppActionType.Recipe.DeleteRecipeRequestAction) => void;
};

export const MainView: React.FC<MainViewProps> = (props) => {
  const { recipes, recipe, totalCount, createRecipe, updateRecipe, getRecipes, getCertainRecipe, deleteRecipe, ...rest } = props;

  const [searchOption, setSearchOption] = useState<string>('');
  const [filterOption, setFilterOption] = useState<string>('');
  
  const [isRecipeModal, setIsRecipeModal] = useState<boolean>(false);
  const [currentRecipeAction, setCurrentRecipeAction] = useState<RecipeAction>(RecipeAction.CREATE);
  const [currentRecipe, setCurrentRecipe] = useState<Recipe>({} as Recipe);
  const [currentRecipeIndex, setCurrentRecipeIndex] = useState<number>();

  const [perPage, setPerPage] = useState<number>();
  const [pageNum, setPageNum] = useState<number>();

  const {
    isShowing: isConfirmModalShow,
    isConfirm: isConfirmAction,
    show: showConfirmModal,
    close: closeConfirmModal,
    confirm: confirmUserAction
  } = useConfirmModal();

  const handleItemDetailClick = useCallback((index: number) => {
    setCurrentRecipeAction(RecipeAction.UPDATE);
    setCurrentRecipeIndex(index);
    setIsRecipeModal(true);

    getCertainRecipe({
      recipeId: recipes[index].uuid ?? '',
      next: () => {
        setIsRecipeModal(true);
      }
    });
  }, [getCertainRecipe, setCurrentRecipeAction, setCurrentRecipeIndex, setIsRecipeModal, recipes]);

  const handlePaginationChange = useCallback((newPerPage: number, newPageNum: number) => {
    setPageNum(newPageNum);
    setPerPage(newPerPage);
    getRecipes({
      searchOption: searchOption,
      filterOption: filterOption,
      pageNum: newPageNum,
      perPage: newPerPage
    });
  }, [setPageNum, setPerPage, getRecipes, searchOption, filterOption]);

  const handleDeleteItemClick = useCallback((index: number) => {
    setCurrentRecipeIndex(index);
    showConfirmModal();
  }, [setCurrentRecipeIndex, showConfirmModal]);

  const handleAddClick = useCallback(() => {
    setIsRecipeModal(true);
    setCurrentRecipeAction(RecipeAction.CREATE);
  }, []);

  const handleCancelAction = useCallback(() => {
    setIsRecipeModal(false);
  }, []);

  const handleConfirmAction = useCallback((recipe: Recipe) => {
    if (currentRecipeAction === RecipeAction.CREATE) {
      createRecipe({
        recipe,
        next: () => {
          setIsRecipeModal(false);
          getRecipes({
            searchOption: searchOption,
            filterOption: filterOption,
            pageNum: pageNum,
            perPage: perPage
          });
        }
      })
    } else if (currentRecipeAction === RecipeAction.UPDATE) {
      updateRecipe({
        recipe,
        recipeId: recipes[currentRecipeIndex ?? 0].uuid ?? '',
        next: () => {
          setIsRecipeModal(false);
          getRecipes({
            searchOption: searchOption,
            filterOption: filterOption,
            pageNum: pageNum,
            perPage: perPage
          });
        }
      })
    }
  }, [currentRecipeAction, currentRecipeIndex, createRecipe, updateRecipe, setIsRecipeModal, getRecipes, pageNum, perPage, searchOption, filterOption, recipes]);

  const handleFilterOptionChange = (e: any) => {
    setFilterOption(e.target.value);
    getRecipes({
      filterOption: e.target.value,
      searchOption: searchOption
    });
  };
  const debouncedHandleFilterOptionChange = debounce(handleFilterOptionChange, 300);

  const handleSearchOptionChange = (e: any) => {
    setSearchOption(e.target.value);
    getRecipes({
      filterOption: filterOption,
      searchOption: e.target.value
    });
  };
  const debouncedHandleSearchOptionChange = debounce(handleSearchOptionChange, 300);

  const handleDeleteRecipe = useCallback(() => {
    deleteRecipe({
      recipeId: recipes[currentRecipeIndex ?? 0].uuid ?? '',
      next: () => {
        closeConfirmModal();
        getRecipes({
          searchOption: searchOption,
          filterOption: filterOption,
          pageNum: pageNum,
          perPage: perPage
        });
      }
    });
  }, [deleteRecipe, currentRecipeIndex, getRecipes, pageNum, perPage, searchOption, filterOption, recipes])

  useEffect(() => {
    setCurrentRecipe(recipe);
  }, [recipe]);

  return <MainViewStyle>
    <Box className='container'>
      <Box className='actions-container'>
        <Button className='btn contained' variant='outlined' onClick={handleAddClick}> 
          <AddIcon />
          Add New
        </Button>
        <Stack className='condition-container' spacing={2} direction={{ xs: 'column', 'md': 'row'}}>
          <IconInputComponent
            frontIcon={<FilterListIcon />}
            placeholder='Filter by ingredients...'
            onChange={debouncedHandleFilterOptionChange}
          />
          <IconInputComponent
            frontIcon={<SearchIcon />}
            placeholder='Search by title...'
            onChange={debouncedHandleSearchOptionChange}
          />
        </Stack>
      </Box>

      <Box className='data-container'>
        <TableComponent
          recipes={recipes}
          perPage={perPage}
          pageNum={pageNum}
          totalNum={totalCount}
          paginationChange={handlePaginationChange}
          itemClick={handleItemDetailClick}
          deleteItem={handleDeleteItemClick}
        />
      </Box>
    </Box>

    {
      isRecipeModal && <RecipeModal 
        recipe={currentRecipe}
        actionType={currentRecipeAction}
        cancelAction={handleCancelAction}
        confirmAction={handleConfirmAction}
      />
    }

    {
      isConfirmModalShow && <ConfirmModal
        closeModal={closeConfirmModal}
        confirmModal={handleDeleteRecipe}
      />
    }
  </MainViewStyle>
};
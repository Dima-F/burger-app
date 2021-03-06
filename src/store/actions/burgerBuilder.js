import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = name => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}

export const removeIngredient = name => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients
    };
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    };
}

export const initIngredients = () => dispatch => {
    axios.get('/ingredients.json')
        .then(res => {
            if(res.data) {
                dispatch(setIngredients(res.data));
            } else {
                dispatch(setIngredients([]));
            }
        })
        .catch(e => dispatch(fetchIngredientsFailed()));
}
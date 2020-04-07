const initialState = {
};

export default function cartReducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_ITEM': {
            const stateCopy = { ...state }
            return {
                ...stateCopy,
                //use the ID as an unique key name
                [action.item.id]: {
                    //copy item completely. Better than doing it 1by1.
                    ...action.item,
                    quantity: stateCopy[action.item.id] ? Number(stateCopy[action.item.id].quantity += 1) : 1,
                    total: action.item.price / 100,
                }
            }
        }
        case 'REMOVE_ITEM': {
            const stateCopy = { ...state }
            delete stateCopy[action.itemId]
            return {
                ...stateCopy
            }
        }
        case 'UPDATE_QUANTITY': {
            const stateCopy = { ...state }
            stateCopy[action.quantity.id].quantity = action.quantity.value
            stateCopy[action.quantity.id].total = stateCopy[action.quantity.id].price / 100 * action.quantity.value
            return {
                ...stateCopy,
            }
        }
        case 'CLEAR_CART': {
            //return an empty object, the initialState. 
            return {
            }
        }
        default:
            return state;
    }
}
export const getStoreItemArray = (state) => {
    return Object.values(state)
}


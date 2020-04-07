export const addItem = (item) => ({
    type: 'ADD_ITEM',
    item,
});

export const removeItem = (itemId) => ({
    type: 'REMOVE_ITEM',
    itemId,
})

export const updateQuantities = (quantity) => ({
    type: 'UPDATE_QUANTITY',
    quantity
})

export const clearCart = () => ({
    type: "CLEAR_CART",
})
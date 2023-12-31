import { createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        shippingPrice: 0,
        subTotal: 0,
        products: [
            // {
            //     category: "men's clothing",
            //     countRate: 120,
            //     id: 1,
            //     image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
            //     oldPrice: undefined,
            //     price: 109.95,
            //     quantity: 1,
            //     rate: 3.9,
            //     title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
            // },
        ],
    },
    reducers: {
        addToCart: (state, action) => {
            const checkExist = (item) => item._id === action.payload._id;
            const isExist = state.products.some(checkExist);

            const index = state.products.findIndex(checkExist);
            if (isExist) {
                if (state.products[index].quantity + action.payload.quantity <= 999) {
                    state.products[index].quantity += action.payload.quantity;
                    message.success({
                        content: `Add ${action.payload.quantity} \"${action.payload.title}\" successfuly!`,
                        className: 'custom-class',
                        style: {
                            textTransform: 'capitalize',
                        },
                    });
                } else {
                    message.warning({
                        content: `\"${action.payload.title}\"  have to less than or equal 999 products`,
                        className: 'custom-class',
                        style: {
                            textTransform: 'capitalize',
                        },
                    });
                }
            } else {
                state.products.push(action.payload);
                console.log(action.payload);
                console.log(state.products);
                message.success({
                    content: `Add ${action.payload.quantity} \"${action.payload.name}\" successfuly!`,
                    className: 'custom-class',
                    style: {
                        textTransform: 'capitalize',
                        zIndex: 99999,
                    },
                });
            }

            message.config({
                duration: 2,
                maxCount: 1,
            });
        },
        removeFromCart: (state, action) => {
            const index = state.products.findIndex((item) => item._id === action.payload);
            console.log(index);
            state.products.splice(index, 1);
            message.info('remove successful!');
        },
        // changeQuantity: (state, action) => {
        //     const index = state.products.findIndex((item) => item._id === action.payload._id);
        //     console.log(index);
        //     state.products[index].quantity = action.payload.quantity;
        // },
        changeQuantity: (state, action) => {
            console.log(state.products);
            console.log(action.payload);
            const index = state.products.findIndex((item) => item._id === action.payload._id);
            if (index !== -1) {
                state.products[index].quantity = action.payload.quantity;
            } else {
                console.error(`Product with _id ${action.payload._id} not found.`);
            }
        },
        changeShippingPrice: (state, action) => {
            state.shippingPrice = action.payload;
        },
        changeSubtotal: (state, action) => {
            state.subTotal = action.payload;
        },
        clearAllCart: (state, action) => {
            state.products = [];
            state.shippingPrice = 0;
            state.subTotal = 0;
        },
    },
});

const { actions, reducer } = cartSlice;
export const {
    addToCart,
    removeFromCart,
    changeQuantity,
    changeShippingPrice,
    changeSubtotal,
    clearAllCart,
} = actions;
export default reducer;

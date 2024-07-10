import { createSlice } from "@reduxjs/toolkit";

// Local storage dan ma'lumot olish uchun funksiya

function dataFromLocalStorage() {
  return (
    JSON.parse(localStorage.getItem("user")) || {
      user: null,
      userP: { products: [], price: 0, amount: 0 },
      isAuthState: false,
    }
  );
}

const userSlice = createSlice({
  name: "user",
  initialState: dataFromLocalStorage(),
  reducers: {
    login: (state, { payload }) => {
      state.user = payload;
    },
    logout: (state) => {
      state.user = null;
    },
    isAuthChange: (state) => {
      state.isAuthState = true;
    },
    addProduct: (state, { payload }) => {
      const item = state.userP.products.find(
        (product) => product.id === payload.id
      );
      if (item) {
        item.amount += payload.amount;
      } else {
        state.userP.products.push(payload);
      }
      userSlice.caseReducers.Total(state);
    },
    changeAmount: (state, { payload }) => {
      const item = state.userP.products.find((item) => item.id === payload.id);
      if (payload.type === "increase") {
        item.amount += 1;
      } else {
        item.amount -= 1;
      }
      userSlice.caseReducers.Total(state);
    },
    removeAll: (state, { payload }) => {
      state.userP = { products: [], amount: 0, price: 0 };
      userSlice.caseReducers.Total(state);
    },
    removeProduct: (state, { payload }) => {
      state.userP.products = state.userP.products.filter((item) => {
        return item.id !== payload;
      });
      userSlice.caseReducers.Total(state);
    },
    Total: (state) => {
      let price = 0;
      let amount = 0;

      state.userP.products.forEach((item) => {
        price += item.price;
        amount += item.amount;
      });

      state.userP.amount = amount;
      state.userP.price = price;
      localStorage.setItem("user", JSON.stringify(state));
    },
  },
});

export const {
  isAuthChange,
  login,
  logout,
  addProduct,
  changeAmount,
  removeProduct,
  Total,
  removeAll,
} = userSlice.actions;
export default userSlice.reducer;

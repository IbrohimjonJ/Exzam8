import { configureStore } from "@reduxjs/toolkit";
import UserReduser from "../app/userslice";

export const store = configureStore({
  reducer: {
    user: UserReduser,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["user/setUser", "user/setAuthReady"],
        ignoredPaths: ["user.user"],
      },
    }),
});

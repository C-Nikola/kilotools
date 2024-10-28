import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers"; // 导入根 reducer

// 创建 Redux store
const store = configureStore({
  reducer: rootReducer,
  // middleware: getDefaultMiddleware => getDefaultMiddleware(), // 使用默认的中间件
  devTools: process.env.NODE_ENV !== "production", // 在开发环境启用 Redux DevTools
});

export default store;

// 从 store 本身推断 `RootState` 和 `AppDispatch` 类型
export type RootState = ReturnType<typeof store.getState>;
// 推断类型：{posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

import { configureStore } from '@reduxjs/toolkit';
import dataRecordSlice from './datarecord/dataRecordSlice';

export const store = configureStore({
  reducer: {
    datarecords: dataRecordSlice
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
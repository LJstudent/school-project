import { configureStore } from '@reduxjs/toolkit';
import dataRecordSlice from './datarecord/dataRecordSlice';
import { dataRecordApi } from './services/dataRecord.services';

export const store = configureStore({
  reducer: {
    datarecords: dataRecordSlice,
    [dataRecordApi.reducerPath]: dataRecordApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dataRecordApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
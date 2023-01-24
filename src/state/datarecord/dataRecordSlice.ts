import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDataRecord } from '../../models/interfaces/IDataRecord';
import { dataRecordApi } from '../services/dataRecord.services';

export interface IDataRecordState {
  dataRecords: IDataRecord[];
  newRecord: boolean;
};

const initialState: IDataRecordState = {
  dataRecords: [],
  newRecord: false,
};

export const dataRecordSlice = createSlice({
  name: 'dataRecords',
  initialState,
  reducers: {
    addRecord: (state, action: PayloadAction<IDataRecord>) => {
      state.dataRecords.push(action.payload)
      state.newRecord = false
    },
    deleteRecord: (state, action: PayloadAction<number>) => {
      const index = state.dataRecords.findIndex(dataRecord => dataRecord.id === action.payload)
      state.dataRecords.splice(index, 1);
    },
    newRecord: (state) => {
      state.newRecord = true;
    },
    cancelRecord: (state) => {
      state.newRecord = false;
    },
    ApproveRecordByDirector: (state, action: PayloadAction<{ dataRecordId: number, user: number }>) => {
      if (action.payload.user === 2) {
        state.dataRecords.filter(dataRecord => dataRecord.id === action.payload.dataRecordId)[0].approved_by_purchasing_department = 1
      }
      if (action.payload.user === 3) {
        state.dataRecords.filter(dataRecord => dataRecord.id === action.payload.dataRecordId)[0].approved_by_director = 1
      }
    },
    DeclineRecordByDirector: (state, action: PayloadAction<{ dataRecordId: number, user: number }>) => {
      if (action.payload.user === 2) {
        state.dataRecords.filter(dataRecord => dataRecord.id === action.payload.dataRecordId)[0].approved_by_purchasing_department = 0
      }
      if (action.payload.user === 3) {
        state.dataRecords.filter(dataRecord => dataRecord.id === action.payload.dataRecordId)[0].approved_by_director = 0
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      dataRecordApi.endpoints.getDataRecords.matchFulfilled,
      (state, { payload }) => {
         state.dataRecords = payload
     }
  )
},
});


export const { addRecord, newRecord, cancelRecord, deleteRecord, ApproveRecordByDirector, DeclineRecordByDirector } = dataRecordSlice.actions;

export default dataRecordSlice.reducer;
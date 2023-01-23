import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { dataRecords } from '../../data/dataRecords';
import { IDataRecord } from '../../models/interfaces/IDataRecord';

export interface IDataRecordState {
  dataRecords: IDataRecord[];
  newRecord: boolean;
};

const initialState: IDataRecordState = {
  dataRecords: dataRecords,
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
        state.dataRecords.filter(dataRecord => dataRecord.id === action.payload.dataRecordId)[0].approved_by_purchasing_department = true
      }
      if (action.payload.user === 3) {
        state.dataRecords.filter(dataRecord => dataRecord.id === action.payload.dataRecordId)[0].approved_by_director = true
      }
    },
    DeclineRecordByDirector: (state, action: PayloadAction<{ dataRecordId: number, user: number }>) => {
      if (action.payload.user === 2) {
        state.dataRecords.filter(dataRecord => dataRecord.id === action.payload.dataRecordId)[0].approved_by_purchasing_department = false
      }
      if (action.payload.user === 3) {
        state.dataRecords.filter(dataRecord => dataRecord.id === action.payload.dataRecordId)[0].approved_by_director = false
      }
    },
  },
});


export const { addRecord, newRecord, cancelRecord, deleteRecord, ApproveRecordByDirector, DeclineRecordByDirector } = dataRecordSlice.actions;

export default dataRecordSlice.reducer;
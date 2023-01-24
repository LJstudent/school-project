import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IDataRecord } from '../../models/interfaces/IDataRecord'

// Define a service using a base URL and expected endpoints
export const dataRecordApi = createApi({
  reducerPath: 'dataRecordApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3004' }),
  endpoints: (builder) => ({
    getDataRecords: builder.query<IDataRecord[], void>({
      query: () => '/datarecord',
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetDataRecordsQuery } = dataRecordApi
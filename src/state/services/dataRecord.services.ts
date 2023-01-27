import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IDataRecord } from '../../models/interfaces/IDataRecord'

// Define a service using a base URL and expected endpoints
export const dataRecordApi = createApi({
  reducerPath: 'dataRecordApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3004' }),
  tagTypes: ['DataRecord'],
  endpoints: (builder) => ({
    getDataRecords: builder.query<IDataRecord[], string>({
      query: () => '/datarecord',
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'DataRecord' as const, id })), 'DataRecord']
          : ['DataRecord'],
    }),
    updateDataRecord: builder.mutation<IDataRecord, Partial<IDataRecord>>({
      query(data) {
        const { id, ...body } = data
        return {
          url: `/datarecord/approved/${id}`,
          method: 'PUT',
          body,
        }
      },
      invalidatesTags: ['DataRecord'],
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetDataRecordsQuery, useUpdateDataRecordMutation } = dataRecordApi
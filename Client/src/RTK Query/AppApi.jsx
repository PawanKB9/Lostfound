// src/features/itemsApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = process.env.REACT_APP_API_URL || 'https://kabadiwala.onrender.com';

export const itemsApi = createApi({
  reducerPath: 'itemsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include', // include cookies if backend uses sessions
  }),
  tagTypes: ['Items'],
  endpoints: (builder) => ({
    // GET /items?page=&limit=&search=&isApproved=&isFound=
    getItems: builder.query({
      query: ({ page = 1, limit = 10, search, isApproved, isFound } = {}) => {
        const params = { page, limit };
        if (search) params.search = search;
        if (isApproved !== undefined) params.isApproved = isApproved;
        if (isFound !== undefined) params.isFound = isFound;
        return {
          url: '/items',
          method: 'GET',
          params,
        };
      },
      providesTags: (result) =>
        result?.items
          ? [
              { type: 'Items', id: 'LIST' },
              ...result.items.map((itm) => ({ type: 'Items', id: itm._id || itm.id })),
            ]
          : [{ type: 'Items', id: 'LIST' }],
    }),

    // POST /items  (multipart/form-data)
    addItem: builder.mutation({
      query: (formData) => ({
        url: '/items',
        method: 'POST',
        // body should be FormData instance (don't set content-type; browser will set boundary)
        body: formData,
      }),
      invalidatesTags: [{ type: 'Items', id: 'LIST' }],
    }),

    // PATCH /items/:itemId/approval  { isApproved }
    updateApproval: builder.mutation({
      query: ({ itemId, isApproved }) => ({
        url: `/items/${itemId}/approval`,
        method: 'PATCH',
        body: { isApproved },
      }),
      invalidatesTags: (result, error, { itemId }) => [
        { type: 'Items', id: itemId },
        { type: 'Items', id: 'LIST' },
      ],
    }),

    // PATCH /items/:itemId/found  { isFound }
    updateFound: builder.mutation({
      query: ({ itemId, isFound }) => ({
        url: `/items/${itemId}/found`,
        method: 'PATCH',
        body: { isFound },
      }),
      invalidatesTags: (result, error, { itemId }) => [
        { type: 'Items', id: itemId },
        { type: 'Items', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetItemsQuery,
  useLazyGetItemsQuery,
  useAddItemMutation,
  useUpdateApprovalMutation,
  useUpdateFoundMutation,
} = itemsApi;

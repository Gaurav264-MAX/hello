import {createApi} from '@reduxjs/toolkit/query/react';
import {fetchBaseQuery} from '@reduxjs/toolkit/query';

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000',prepareHeaders: (headers, { getState }) => {
        headers.set('Content-Type', 'multipart/form-data');
        return headers; },
     }),
    tagTypes:['Product'],
    endpoints: (builder) => ({
        fetchAcParts: builder.query({
            query: () => '/ac',
        }),
        fetchTvParts: builder.query({
            query: () => '/tv',
        }),
        fetchMachines: builder.query({
            query: () => '/machine',
        }),
        fetchData : builder.query({
            query: () => '/data',
        }),
        fetchProductById: builder.query({
            query: ({ type, _id }) => `/${type}/${_id}`,
        }),
        fetchOtherProducts: builder.query({
            query: ({ type }) => {
                return `/${type}`; // Assuming this returns all products of the type
            }
}),
        fetchOrder: builder.query({
            query: (orderId) => `/orders/${orderId}`,
        }),
        fetchUserOrders: builder.query({
            query: (userId) => `/orders/user/${userId}`,
        }),
        fetchProducts: builder.query({
            query: (type) => {
                const backendType = type === 'washingmachine' ? 'machine' : type;
                return `/${backendType}`;
            },
            providesTags: ['Product'],
        }),
         deleteProduct: builder.mutation({
      query: ({ type, productId }) => {
        const backendType = type === 'washingmachine' ? 'machine' : type;
        return {
          url: `/${backendType}/${productId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Product'],
    }),
    addProduct: builder.mutation({
        query: ({ type, formData }) => ({
            url: `/${backend}`,
            method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Product'],
        }),
    searchProducts: builder.query({
      query: ({ endpoint, query }) => ({
        url: `/api/${endpoint}-search`,
        params: { q: query }
      }),
      transformResponse: (response, meta, { endpoint }) => {
        // Add category to each item in the response
        return response.map(item => ({ ...item, category: endpoint }));
      },
    }),
    
    })
})
export const { 
    useFetchAcPartsQuery, 
    useFetchTvPartsQuery, 
    useFetchMachinesQuery, 
    useFetchDataQuery, 
    useFetchProductByIdQuery, 
    useFetchOtherProductsQuery, 
    useFetchOrderQuery,
    useFetchUserOrdersQuery,
    useFetchProductsQuery,
    useDeleteProductMutation,
    useAddProductMutation,
    useSearchProductsQuery,
} = api;

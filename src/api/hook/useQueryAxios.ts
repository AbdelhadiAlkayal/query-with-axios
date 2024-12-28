import type { Ref } from 'vue'
import { useAxiosRoute } from './useAxiosRoute'
import type { IAxiosRoute } from '../interfaces/apiRoute.types'
import type { UseMutationOptions, UseQueryOptions, UseQueryReturnType } from '@tanstack/vue-query'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type { AxiosError } from 'axios'

// Type utility to extract the payload type from a function type.
type IPayload<T> = T extends (payload: infer P) => Promise<unknown> ? P : never
// Type utility to extract the return type from a function type.
type IReturn<T> = T extends (payload: never) => Promise<infer R> ? R : never

// Generic function to send API requests using the provided route and method.
const sendRequest = async <T extends keyof IAxiosRoute, R extends keyof IAxiosRoute[T]>( // The route key (e.g., 'users', 'products').
  route: T, // The method key within the route (e.g., 'get', 'post', 'update').
  routeMethod: R, // Optional payload for the request.
  payload?: IPayload<IAxiosRoute[T][R]>,
): Promise<IReturn<IAxiosRoute[T][R]>> => {
  // Get the Axios route object containing the API methods.
  const axiosRoute = useAxiosRoute() // Extract the specific API method based on the provided route and method keys. Type assertion is used here because typescript can not infer types correctly in this case.
  const query = axiosRoute[route][routeMethod] as (
    payload: IPayload<IAxiosRoute[T][R]>,
  ) => Promise<IReturn<IAxiosRoute[T][R]>> // Call the extracted API method with the provided payload (using non-null assertion because payload is optional but query function expects it).

  return query(payload!)
}

// Custom hook for using TanStack Query with Axios for GET requests.
const useQueryWithAxios = <T extends keyof IAxiosRoute, R extends keyof IAxiosRoute[T]>( // The route key.
  route: T, // The method key.
  routeMethod: R, // Reactive payload using Vue's Ref. This ensures the query is re-executed when the payload changes.
  payload?: Ref<IPayload<IAxiosRoute[T][R]>>, // Optional TanStack Query options. Omitting 'queryKey' as it's handled internally.
  options?: Omit<UseQueryOptions<IReturn<IAxiosRoute[T][R]>, AxiosError>, 'queryKey'>,
): UseQueryReturnType<IReturn<IAxiosRoute[T][R]>, AxiosError> => {
  // Use the TanStack Query useQuery hook.
  return useQuery<IReturn<IAxiosRoute[T][R]>, AxiosError>({
    // Generate a unique query key based on the route, method, and payload. This is crucial for caching and invalidation.
    queryKey: [`${route}-${String(routeMethod)}`, payload], // The query function that fetches the data. Calls the sendRequest function.
    queryFn: () => sendRequest(route, routeMethod, payload?.value), // Spread any additional options provided by the user.
    ...options,
  })
}

// Custom hook for using TanStack Query with Axios for mutation requests (POST, PUT, DELETE, etc.).
const useMutationWithAxios = <T extends keyof IAxiosRoute, R extends keyof IAxiosRoute[T]>( // The route key.
  route: T, // The method key.
  routeMethod: R, // Optional TanStack Mutation options.
  options?: UseMutationOptions<IReturn<IAxiosRoute[T][R]>, AxiosError, IPayload<IAxiosRoute[T][R]>>,
) => {
  // Use the TanStack Query useMutation hook.
  return useMutation<IReturn<IAxiosRoute[T][R]>, AxiosError, IPayload<IAxiosRoute[T][R]>>({
    // Generate a unique mutation key based on the route and method.
    mutationKey: [`${route}-${String(routeMethod)}`], // The mutation function that performs the API request. Calls the sendRequest function.
    mutationFn: (data) => sendRequest(route, routeMethod, data), // Spread any additional options provided by the user.
    ...options,
  })
}

// Export the custom hooks for use in components.
export { useQueryWithAxios, useMutationWithAxios }

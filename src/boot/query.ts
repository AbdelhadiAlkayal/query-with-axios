import { boot } from 'quasar/wrappers'
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'

export default boot(({ app }) => {
  // Create a QueryClient instance
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // Customize behavior as needed
        retry: 1, // Number of retry attempts for failed queries
        staleTime: 5 * 60 * 1000, // Data freshness duration
      },
    },
  })

  // Install VueQueryPlugin and provide the query client
  app.use(VueQueryPlugin, { queryClient })
})

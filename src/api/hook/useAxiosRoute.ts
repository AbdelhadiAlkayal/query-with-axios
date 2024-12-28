// Import the `api` object from the `src/boot/axios` file. This object likely represents an Axios instance configured for making API requests.
import { api } from 'src/boot/axios'

// Import the type definition for the `IAxiosRoute` interface from the `../interfaces/apiRoute.types` file. This interface likely defines the structure of the object returned by the `useAxiosRoute` function.
import type { IAxiosRoute } from '../interfaces/apiRoute.types'

// Define an object named `axiosRoutePrefix` that acts as a dictionary to map API resource names to their corresponding URL prefixes. This helps construct consistent API endpoint URLs.
export const axiosRoutePrefix = {
  posts: 'posts',
  photos: 'photos',
}

// Define a function named `useAxiosRoute` that uses a hook pattern to provide access to a pre-configured API route object.
export const useAxiosRoute = () => {
  // Create an object named `axiosRoute` that conforms to the `IAxiosRoute` interface. This object will hold methods for making API requests to different resources.
  const axiosRoute: IAxiosRoute = {
    posts: {
      // Define a method named `getPosts` that returns a promise representing an Axios GET request to the `/posts` endpoint.
      getPosts() {
        return api.get(`${axiosRoutePrefix.posts}`)
      },
      // Define a method named `getPostById` that takes a payload (likely an ID) and returns a promise representing an Axios GET request to the `/posts/:id` endpoint, where ":id" is replaced with the provided payload.
      getPostById: (payload) => api.get(`${axiosRoutePrefix.posts}/${payload}`),
    },
    photos: {
      // Define a method named `getPhotos` that returns a promise representing an Axios GET request to the `/photos` endpoint.
      getPhotos() {
        return api.get(`${axiosRoutePrefix.photos}`)
      },
      // Define a method named `getTitlePhotos` that takes a payload (likely a search term) and returns a promise representing an Axios GET request to the `/photos?title=:title` endpoint, where ":title" is replaced with the provided payload. This likely filters photos based on their title.
      getTitlePhotos: (payload) => api.get(`${axiosRoutePrefix.photos}?title=${payload}`),
    },
  }

  // Return the configured `axiosRoute` object, making it accessible to components that call this hook.
  return axiosRoute
}

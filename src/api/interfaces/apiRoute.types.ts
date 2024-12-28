// Import the type definition for a generic response object (IResponse) from the './axios.types' file.
// This likely defines the structure of the API responses, including data, status, etc.
import type { IResponse } from './axios.types'

// Import the type definition for the structure of a single post (IGetPosts) from the './res.types' file.
// This defines the data that will be received for each post.
import type { IGetPosts } from './res.types'

// Define an interface named `IPostsRoute` to describe the methods related to posts.
export interface IPostsRoute {
  // Define a method named `getPosts` that returns a generic `IResponse` object containing an array of `IGetPosts` objects.
  // This represents a request to retrieve multiple posts.
  getPosts: () => IResponse<IGetPosts[]>
  // Define a method named `getPostById` that takes a string `id` as input and returns a generic `IResponse` object containing a single `IGetPosts` object.
  // This represents a request to retrieve a specific post by its ID.
  getPostById: (id: string) => IResponse<IGetPosts>
}

// Define an interface named `IPhotosRoute` to describe the methods related to photos.
export interface IPhotosRoute {
  // Define a method named `getPhotos` that returns a generic `IResponse` object containing an array of `IGetPosts` objects.
  // Although the name suggests photos, the return type here is IGetPosts[]. This might be a mistake and should possibly be a different type like IGetPhotos[] if the data structures are different.
  // This represents a request to retrieve multiple photos.
  getPhotos: () => IResponse<IGetPosts[]>
  // Define a method named `getTitlePhotos` that takes a string `title` as input and returns a generic `IResponse` object containing an array of `IGetPosts` objects.
  // Although the name suggests photos and filtering by title, the return type here is IGetPosts[]. This might be a mistake and should possibly be a different type like IGetPhotos[] if the data structures are different.
  // This represents a request to retrieve photos filtered by their title.
  getTitlePhotos: (title: string) => IResponse<IGetPosts[]>
}

// Define an interface named `IAxiosRoute` to describe the overall structure of the API routes.
export interface IAxiosRoute {
  // Define a property named `posts` of type `IPostsRoute`. This groups the post-related methods.
  posts: IPostsRoute
  // Define a property named `photos` of type `IPhotosRoute`. This groups the photo-related methods.
  photos: IPhotosRoute
}

// Define a generic interface called `IAxiosData`.
// This interface is intended to represent the structure of the data returned by an API endpoint.
export interface IAxiosData<T> {
  // Define a property called `data` of type `T`.
  // `T` is a generic type parameter, meaning it can be any type. This allows the `data` property to hold data of various structures, depending on the specific API endpoint.
  data: T
  // Define a property called `message` of type `string`.
  // This property is intended to hold a human-readable message, such as a success or error message from the API.
  message: string
}

// Define a type alias called `IResponse`.
// This type alias is intended to represent the overall response from an API call.
// It uses a generic type parameter `T` to maintain type safety.
export type IResponse<T> = Promise<IAxiosData<T>>
// This line defines `IResponse` to be a `Promise` that resolves to an `IAxiosData<T>` object.
// In other words, an `IResponse` represents an asynchronous operation (a Promise) that, when it completes successfully, will yield an object structured according to the `IAxiosData` interface.

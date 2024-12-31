<template>
  <router-view />
</template>

<script setup lang="ts">
import type { RoutesType } from 'query-with-axios'
import { InitAxiosRoute } from 'query-with-axios'
import { api, type IPostsRoute } from './boot/axios'

declare module 'query-with-axios' {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace RouteDefinitions {
    interface Routes {
      posts: IPostsRoute // Adding a 'posts' route
    }
  }
}
const test: RoutesType = {
  posts: {
    getPostById: (payload) => api.get(`posts/${payload}`),
    getPosts() {
      return api.get(`posts`)
    },
  },
}

InitAxiosRoute.createAxiosRoute(test)
</script>

<template>
  <q-page class="q-pa-lg column">
    <h4 class="self-center">welcome to query with axios</h4>

    <q-inner-loading v-if="loadingPosts" showing color="primary" />
    <pre style="font-size: 18px">posts by id:{{ postsState?.data }}</pre>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useQueryWithAxios } from 'query-with-axios'

const postId = ref<string>('1')

const { data: postsState, isLoading: loadingPosts } = useQueryWithAxios(
  'posts',
  'getPostById',
  postId,
)
</script>

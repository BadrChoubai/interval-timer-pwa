<script setup lang="ts">
import { useTimeAgo } from '@vueuse/core'
import ReloadPrompt from './components/ReloadPrompt.vue'

const date = '__DATE__'
const timeAgo = useTimeAgo(date)
</script>

<template>
  <header>
    <h1>Intervals</h1>
  </header>
  <main>
    Under Construction
  </main>
  <footer>
    <div>Built at: {{ date }} ({{ timeAgo }})</div>
  </footer>
  <ReloadPrompt />
</template>
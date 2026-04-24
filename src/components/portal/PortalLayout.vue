<!-- [AI_START TIMESTAMP=2025-06-15 12:00:00] -->
<script setup lang="ts">
import { watch } from 'vue'
import { useRouter } from 'vue-router'
import { Loader2 } from 'lucide-vue-next'
import Sidebar from './Sidebar.vue'
import Header from './Header.vue'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

// [AI_START TIMESTAMP=2025-06-17 10:15:00]
watch(
  () => [auth.isLoading, auth.isLoggedIn],
  ([loading, loggedIn]) => {
    if (!loading && !loggedIn) {
      router.replace('/')
    }
  },
  { immediate: true }
)
</script>

<template>
  <div v-if="auth.isLoading || !auth.isLoggedIn" class="flex h-screen items-center justify-center bg-background">
    <Loader2 class="h-6 w-6 animate-spin text-muted-foreground" />
  </div>
  <div v-else class="flex h-screen overflow-hidden">
    <Sidebar />
    <div class="flex flex-1 flex-col overflow-hidden">
      <Header />
      <main class="flex-1 overflow-y-auto bg-muted/30 p-6">
        <slot />
      </main>
    </div>
  </div>
</template>
<!-- [AI_END LINES=36 TIMESTAMP=2025-06-15 12:00:00] -->

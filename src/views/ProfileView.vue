<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ArrowLeftIcon } from '@heroicons/vue/24/outline';
import Header from '@/components/portal/Header.vue';
import ProfileContent from '@/components/portal/ProfileContent.vue';

const router = useRouter();

function goDashboard() {
  router.push('/dashboard');
}
</script>

<template>
  <div class="flex h-screen flex-col overflow-hidden">
    <Header>
      <template #logo>
        <div class="flex h-14 items-center justify-between px-4">
          <div class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="h-8 w-8 rounded-lg">
              <rect width="32" height="32" rx="8" fill="#333" />
              <path d="M16 7L7 12.5l9 5.5 9-5.5z" fill="#fff" opacity="0.95" />
              <path d="M7 16.5l9 5.5 9-5.5" fill="none" stroke="#fff" stroke-width="1.8" opacity="0.55" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M7 20l9 5.5 9-5.5" fill="none" stroke="#fff" stroke-width="1.8" opacity="0.3" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <span class="text-sm font-semibold whitespace-nowrap"> 应用运营管理门户 </span>
          </div>
        </div>
      </template>
    </Header>

    <main class="bg-muted/30 flex-1 overflow-y-auto px-4 py-6 lg:px-16 lg:py-8">
      <div class="mx-auto max-w-6xl">
        <button @click="goDashboard" class="text-muted-foreground hover:text-foreground mb-4 inline-flex items-center gap-1 text-sm transition-colors">
          <ArrowLeftIcon class="h-4 w-4" />
          返回控制台
        </button>
        <ProfileContent />
      </div>
    </main>
  </div>
</template>

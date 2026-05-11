<!-- [AI_START TIMESTAMP=2025-06-20 06:30:00] -->
<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { cn } from '@/lib/utils';
import { Squares2X2Icon, CubeIcon, ShoppingCartIcon, SparklesIcon, WalletIcon, ReceiptPercentIcon, DocumentTextIcon, BuildingOffice2Icon, PresentationChartLineIcon, ChevronLeftIcon, MagnifyingGlassIcon, CheckBadgeIcon, UserGroupIcon } from '@heroicons/vue/24/outline';

const route = useRoute();
const router = useRouter();
const collapsed = ref(false);
const menuGroups = [
  {
    items: [{ title: '控制台首页', href: '/dashboard', icon: Squares2X2Icon }],
  },
  {
    label: '用户和企业管理',
    items: [
      { title: '企业管理', href: '/enterprise', icon: BuildingOffice2Icon },
      // [AI_START TIMESTAMP=2025-07-18 13:00:00]
      { title: '用户账号管理', href: '/user-accounts', icon: UserGroupIcon },
      // [AI_END LINES=1 TIMESTAMP=2025-07-18 13:00:00]
    ],
  },
  {
    label: '服务管理',
    items: [
      { title: '套餐管理', href: '/packages', icon: CubeIcon },
      { title: '模型管理', href: '/models', icon: SparklesIcon },
      // [AI_START TIMESTAMP=2025-07-16 06:10:00]
      { title: '已订购服务管理', href: '/services/subscribed', icon: CheckBadgeIcon },
      // [AI_END LINES=1 TIMESTAMP=2025-07-16 06:10:00]
    ],
  },
  {
    label: '交易管理',
    items: [{ title: '订单管理', href: '/orders', icon: ShoppingCartIcon }],
  },
  {
    label: '财务中心',
    items: [
      { title: '资金管理', href: '/wallet', icon: WalletIcon },
      { title: '账单管理', href: '/billing', icon: ReceiptPercentIcon },
    ],
  },

  {
    label: '运营监控',
    items: [
      { title: '用量监控', href: '/usage', icon: PresentationChartLineIcon },
      { title: '审计日志', href: '/audit', icon: DocumentTextIcon },
    ],
  },
];

function navigate(href: string) {
  router.push(href);
}
</script>

<template>
  <aside :class="cn('border-border flex h-screen flex-col transition-all duration-300', collapsed ? 'w-16' : 'w-60')">
    <!-- Logo -->
    <div class="flex h-14 items-center border-b border-white/10 bg-black px-4 text-white">
      <div class="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="h-8 w-8 rounded-lg">
          <rect width="32" height="32" rx="8" fill="#333" />
          <path d="M16 7L7 12.5l9 5.5 9-5.5z" fill="#fff" opacity="0.95" />
          <path d="M7 16.5l9 5.5 9-5.5" fill="none" stroke="#fff" stroke-width="1.8" opacity="0.55" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M7 20l9 5.5 9-5.5" fill="none" stroke="#fff" stroke-width="1.8" opacity="0.3" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <span v-if="!collapsed" class="text-sm font-semibold">应用运营管理门户</span>
      </div>
    </div>

    <!-- MagnifyingGlassIcon -->
    <div v-if="!collapsed" class="bg-sidebar border-r p-3">
      <div class="relative">
        <MagnifyingGlassIcon class="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
        <Input placeholder="搜索..." class="bg-muted/50 focus-visible:border-ring h-9 border-transparent pl-8 text-sm shadow-sm transition" />
      </div>
    </div>

    <!-- Navigation -->
    <nav class="bg-sidebar flex-1 space-y-1 overflow-y-auto border-r px-3 py-2">
      <template v-for="(group, gi) in menuGroups" :key="gi">
        <div v-if="group.label && !collapsed" class="text-muted-foreground/50 px-3 pt-4 pb-1 text-[12px] tracking-wider uppercase">
          {{ group.label }}
        </div>
        <div v-if="group.label && collapsed" class="border-border mx-2 my-2 border-t" />
        <button
          v-for="item in group.items"
          :key="item.href"
          @click="navigate(item.href)"
          :class="cn('flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors', route.path === item.href ? 'bg-accent text-accent-foreground font-medium' : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground')"
        >
          <component :is="item.icon" class="h-4 w-4 shrink-0" />
          <span v-if="!collapsed">{{ item.title }}</span>
        </button>
      </template>
    </nav>

    <!-- Collapse Button -->
    <div class="border-border bg-sidebar border-t border-r p-3">
      <button @click="collapsed = !collapsed" class="text-muted-foreground hover:bg-accent hover:text-accent-foreground flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors">
        <ChevronLeftIcon :class="cn('h-4 w-4 transition-transform', collapsed && 'rotate-180')" />
        <span v-if="!collapsed">收起菜单</span>
      </button>
    </div>
  </aside>
</template>
<!-- [AI_END LINES=84 TIMESTAMP=2025-06-20 06:30:00] -->

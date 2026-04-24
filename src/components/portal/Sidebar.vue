<!-- [AI_START TIMESTAMP=2025-06-20 06:30:00] -->
<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Brain,
  Wallet,
  Receipt,
  FileText,
  Building2,
  Activity,
  ChevronLeft,
  Search,
} from 'lucide-vue-next'
import Input from '@/components/ui/Input.vue'

const route = useRoute()
const router = useRouter()
const collapsed = ref(false)
const menuGroups = [
  {
    items: [
      { title: '控制台首页', href: '/dashboard', icon: LayoutDashboard },
    ],
  },
  {
    label: '服务管理',
    items: [
      { title: '套餐管理', href: '/packages', icon: Package },
      { title: '模型管理', href: '/models', icon: Brain },
    ],
  },
  {
    label: '交易管理',
    items: [
      { title: '订单管理', href: '/orders', icon: ShoppingCart },
    ],
  },
  {
    label: '财务中心',
    items: [
      { title: '资金管理', href: '/wallet', icon: Wallet },
      { title: '账单管理', href: '/billing', icon: Receipt },
    ],
  },
  {
    label: '客户管理',
    items: [
      { title: '企业客户', href: '/enterprise', icon: Building2 },
    ],
  },
  {
    label: '运营监控',
    items: [
      { title: '用量监控', href: '/usage', icon: Activity },
      { title: '审计日志', href: '/audit', icon: FileText },
    ],
  },
]

function navigate(href: string) {
  router.push(href)
}
</script>

<template>
  <aside
    :class="cn(
      'relative flex h-screen flex-col overflow-hidden border-border transition-all duration-300',
      collapsed ? 'w-16' : 'w-60'
    )"
  >
    <!-- Tech background -->
    <div class="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
      <div class="tech-lines absolute inset-0"></div>
      <div class="tech-scan absolute inset-0"></div>
    </div>

    <!-- Logo -->
    <div class="relative z-10 flex h-14 items-center border-b border-white/10 bg-black px-4 text-white">
      <div class="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="h-8 w-8 rounded-lg">
          <rect width="32" height="32" rx="8" fill="#333"/>
          <path d="M16 7L7 12.5l9 5.5 9-5.5z" fill="#fff" opacity="0.95"/>
          <path d="M7 16.5l9 5.5 9-5.5" fill="none" stroke="#fff" stroke-width="1.8" opacity="0.55" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M7 20l9 5.5 9-5.5" fill="none" stroke="#fff" stroke-width="1.8" opacity="0.3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span v-if="!collapsed" class="text-sm font-semibold">应用运营管理平台</span>
      </div>
    </div>

    <!-- Search -->
    <div v-if="!collapsed" class="relative z-10 border-r bg-sidebar p-3">
      <div class="relative">
        <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="搜索..." class="h-9 pl-8 text-sm bg-muted/50 border-0" />
      </div>
    </div>

    <!-- Navigation -->
    <nav class="relative z-10 flex-1 space-y-1 overflow-y-auto bg-sidebar border-r px-3 py-2">
      <template v-for="(group, gi) in menuGroups" :key="gi">
        <div v-if="group.label && !collapsed" class="pt-4 pb-1 px-3 text-[12px]  uppercase tracking-wider text-muted-foreground/50">
          {{ group.label }}
        </div>
        <div v-if="group.label && collapsed" class="my-2 mx-2 border-t border-border" />
        <button
          v-for="item in group.items"
          :key="item.href"
          @click="navigate(item.href)"
          :class="cn(
            'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
            route.path === item.href
              ? 'bg-accent text-accent-foreground font-medium'
              : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
          )"
        >
          <component :is="item.icon" class="h-4 w-4 shrink-0" />
          <span v-if="!collapsed">{{ item.title }}</span>
        </button>
      </template>
    </nav>

    <!-- Collapse Button -->
    <div class="relative z-10 border-t border-border border-r bg-sidebar  p-3">
      <button
        @click="collapsed = !collapsed"
        class="flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
      >
        <ChevronLeft
          :class="cn('h-4 w-4 transition-transform', collapsed && 'rotate-180')"
        />
        <span v-if="!collapsed">收起菜单</span>
      </button>
    </div>
  </aside>
</template>

<style scoped>
.tech-lines {
  background-image:
    linear-gradient(to right, rgba(0, 0, 0, 0.06) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.06) 1px, transparent 1px);
  background-size: 24px 24px;
}

.tech-scan {
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(0, 0, 0, 0.02) 40%,
    rgba(0, 0, 0, 0.06) 50%,
    rgba(0, 0, 0, 0.02) 60%,
    transparent 100%
  );
  animation: techScan 6s linear infinite;
}

@keyframes techScan {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100%);
  }
}
</style>
<!-- [AI_END LINES=84 TIMESTAMP=2025-06-20 06:30:00] -->

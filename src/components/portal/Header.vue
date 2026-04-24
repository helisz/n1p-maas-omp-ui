<!-- [AI_START TIMESTAMP=2025-06-20 06:30:00] -->
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Bell, HelpCircle, LogOut, ChevronDown, User, Settings } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'
import DropdownMenu from '@/components/ui/DropdownMenu.vue'
import DropdownMenuTrigger from '@/components/ui/DropdownMenuTrigger.vue'
import DropdownMenuContent from '@/components/ui/DropdownMenuContent.vue'
import DropdownMenuItem from '@/components/ui/DropdownMenuItem.vue'
import DropdownMenuSeparator from '@/components/ui/DropdownMenuSeparator.vue'
import Avatar from '@/components/ui/Avatar.vue'
import AvatarFallback from '@/components/ui/AvatarFallback.vue'
import Badge from '@/components/ui/Badge.vue'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

function handleLogout() {
  auth.logout()
  router.push('/')
}

const initials = auth.user?.name?.charAt(0) ?? '管'
</script>

<template>
  <header class="flex h-14 items-center justify-between border-b border-border bg-background px-6">
    <div class="flex items-center gap-2">
      <h1 class="text-lg font-semibold text-foreground">应用运营管理平台</h1>
    </div>

    <div class="flex items-center gap-2">
      <!-- Notifications -->
      <Button variant="ghost" size="icon" class="relative">
        <Bell class="h-4 w-4" />
        <Badge class="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full p-0 text-[10px] leading-none">
          3
        </Badge>
      </Button>

      <!-- Help -->
      <Button variant="ghost" size="icon">
        <HelpCircle class="h-4 w-4" />
      </Button>

      <!-- User Menu -->
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="ghost" class="flex items-center gap-2 px-2">
            <Avatar size="sm">
              <AvatarFallback class="bg-primary text-primary-foreground text-xs">
                {{ initials }}
              </AvatarFallback>
            </Avatar>
            <div class="flex flex-col items-start text-xs">
              <span class="font-medium">{{ auth.user?.name ?? '运营管理员' }}</span>
              <span class="text-muted-foreground">{{ auth.user?.role ?? '管理员' }}</span>
            </div>
            <ChevronDown class="h-4 w-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" class="w-48">
          <div class="px-2 py-1.5">
            <p class="text-xs font-medium text-foreground">{{ auth.user?.name }}</p>
            <p class="text-xs text-muted-foreground truncate">{{ auth.user?.email ?? '' }}</p>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <User class="mr-2 h-4 w-4" />
            <span>个人中心</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings class="mr-2 h-4 w-4" />
            <span>账号设置</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem class="text-destructive focus:text-destructive" @click="handleLogout">
            <LogOut class="mr-2 h-4 w-4" />
            <span>退出登录</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </header>
</template>
<!-- [AI_END LINES=80 TIMESTAMP=2025-06-20 06:30:00] -->

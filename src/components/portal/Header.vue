<!-- [AI_START TIMESTAMP=2025-06-20 06:30:00] -->
<script setup lang="ts">
import { useRouter } from "vue-router";
import {
  BellIcon,
  QuestionMarkCircleIcon,
  ArrowRightStartOnRectangleIcon,
  ChevronDownIcon,
  UserIcon,
  Cog6ToothIcon,
} from "@heroicons/vue/24/outline";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const auth = useAuthStore();

function handleLogout() {
  auth.logout();
  router.push("/");
}

const initials = auth.user?.name?.charAt(0) ?? "管";
</script>

<template>
  <header
    class="flex h-14 items-center justify-between border-b border-white/10 bg-black px-6 text-white"
  >
    <div class="flex items-center gap-2">
      <!-- <h1 class="text-lg font-semibold text-foreground">应用运营管理平台</h1> -->
    </div>

    <div class="flex items-center gap-2">
      <!-- Notifications -->
      <Button
        variant="ghost"
        size="icon"
        class="relative text-white hover:bg-white/10 hover:text-white"
      >
        <BellIcon class="h-4 w-4" />
        <Badge
          class="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full p-0 text-[10px] leading-none"
        >
          3
        </Badge>
      </Button>

      <!-- Help -->
      <Button
        variant="ghost"
        size="icon"
        class="text-white hover:bg-white/10 hover:text-white"
      >
        <QuestionMarkCircleIcon class="h-4 w-4" />
      </Button>

      <!-- User Menu -->
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button
            variant="ghost"
            class="flex items-center gap-2 px-2 text-white hover:bg-white/10 hover:text-white"
          >
            <Avatar size="sm">
              <AvatarFallback class="bg-white text-primary text-xs">
                {{ initials }}
              </AvatarFallback>
            </Avatar>
            <div class="flex flex-col items-start text-xs">
              <span class="font-medium">{{
                auth.user?.name ?? "运营管理员"
              }}</span>
              <span class="text-white/70">{{
                auth.user?.role ?? "管理员"
              }}</span>
            </div>
            <ChevronDownIcon class="h-4 w-4 text-white/70" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" class="w-48">
          <div class="px-2 py-1.5">
            <p class="text-xs font-medium text-foreground">
              {{ auth.user?.name }}
            </p>
            <p class="text-xs text-muted-foreground truncate">
              {{ auth.user?.email ?? "" }}
            </p>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <UserIcon class="mr-2 h-4 w-4" />
            <span>个人中心</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Cog6ToothIcon class="mr-2 h-4 w-4" />
            <span>账号设置</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            class="text-destructive focus:text-destructive"
            @click="handleLogout"
          >
            <ArrowRightStartOnRectangleIcon class="mr-2 h-4 w-4" />
            <span>退出登录</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </header>
</template>
<!-- [AI_END LINES=80 TIMESTAMP=2025-06-20 06:30:00] -->

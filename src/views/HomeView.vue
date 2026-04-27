<!-- [AI_START TIMESTAMP=2025-06-20 06:00:00] -->
<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import {
  EyeIcon,
  EyeSlashIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
  ArrowPathIcon,
} from "@heroicons/vue/24/outline";

const router = useRouter();
const auth = useAuthStore();

const username = ref("");
const password = ref("");
const showPassword = ref(false);
const rememberMe = ref(false);
const isLoggingIn = ref(false);

async function handleLogin() {
  isLoggingIn.value = true;
  await auth.demoLogin();
  router.push("/dashboard");
}
</script>

<template>
  <div class="flex min-h-screen w-full">
    <!-- Left Panel: Black background, platform introduction -->
    <div
      class="relative hidden lg:flex lg:w-1/2 flex-col justify-between overflow-hidden bg-black text-white p-12"
    >
      <!-- Tech background -->
      <div class="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div class="tech-lines absolute inset-0"></div>
        <div class="tech-scan absolute inset-0"></div>
      </div>

      <div class="relative z-10">
        <div class="flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            class="h-8 w-8 rounded-lg"
          >
            <rect width="32" height="32" rx="8" fill="#ffffff" />
            <path d="M16 7L7 12.5l9 5.5 9-5.5z" fill="#000000" opacity="0.95" />
            <path
              d="M7 16.5l9 5.5 9-5.5"
              fill="none"
              stroke="#000000"
              stroke-width="1.8"
              opacity="0.55"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M7 20l9 5.5 9-5.5"
              fill="none"
              stroke="#000000"
              stroke-width="1.8"
              opacity="0.3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span class="text-xl font-semibold">应用运营管理平台</span>
        </div>
      </div>

      <div class="relative z-10 space-y-10">
        <div class="space-y-4">
          <h1 class="text-4xl font-bold leading-tight">
            智信 MaaS 应用运营管理平台
          </h1>
          <p class="text-lg text-white/70 max-w-md leading-relaxed">
            一站式企业应用运营管理解决方案，以安全为基，以高效为纲，赋能企业数字化升级。
          </p>
        </div>

        <div class="space-y-6">
          <div class="flex items-start gap-4">
            <div
              class="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 shrink-0"
            >
              <ChartBarIcon class="h-5 w-5 text-white" />
            </div>
            <div>
              <p class="text-base font-medium">数据可视化分析</p>
              <p class="text-sm text-white/60 mt-1">
                多维度运营数据统计，实时监控业务指标
              </p>
            </div>
          </div>

          <div class="flex items-start gap-4">
            <div
              class="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 shrink-0"
            >
              <ShieldCheckIcon class="h-5 w-5 text-white" />
            </div>
            <div>
              <p class="text-base font-medium">安全合规审计</p>
              <p class="text-sm text-white/60 mt-1">
                全流程操作日志记录，满足企业合规审查要求
              </p>
            </div>
          </div>

          <div class="flex items-start gap-4">
            <div
              class="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 shrink-0"
            >
              <Cog6ToothIcon class="h-5 w-5 text-white" />
            </div>
            <div>
              <p class="text-base font-medium">全生命周期管理</p>
              <p class="text-sm text-white/60 mt-1">
                从订购到运维，覆盖应用运营全流程需求
              </p>
            </div>
          </div>

          <div class="flex items-start gap-4">
            <div
              class="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 shrink-0"
            >
              <DocumentTextIcon class="h-5 w-5 text-white" />
            </div>
            <div>
              <p class="text-base font-medium">账单与报表</p>
              <p class="text-sm text-white/60 mt-1">
                透明账单明细，支持按月导出报表，开票便捷
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="relative z-10 text-sm text-white/40">
        © 2026 中信国际电讯 版权所有
      </div>
    </div>

    <!-- Right Panel: White background, login form -->
    <div
      class="flex w-full lg:w-1/2 items-center justify-center bg-white p-6 sm:p-12"
    >
      <div class="w-full max-w-sm">
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-foreground">欢迎回来</h2>
          <p class="text-sm text-muted-foreground mt-2">
            请登录您的账号以继续使用平台服务
          </p>
        </div>

        <Card>
          <CardHeader class="space-y-1">
            <CardTitle class="text-lg">账号登录</CardTitle>
            <CardDescription>输入用户名和密码进行登录</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <form @submit.prevent="handleLogin" class="space-y-4">
              <div class="space-y-2">
                <Label for="username">用户名</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="请输入用户名"
                  v-model="username"
                />
              </div>

              <div class="space-y-2">
                <Label for="password">密码</Label>
                <div class="relative">
                  <Input
                    id="password"
                    :type="showPassword ? 'text' : 'password'"
                    placeholder="请输入密码"
                    v-model="password"
                    class="pr-10"
                  />
                  <button
                    type="button"
                    @click="showPassword = !showPassword"
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <EyeSlashIcon v-if="showPassword" class="h-4 w-4" />
                    <EyeIcon v-else class="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <Switch id="remember" v-model="rememberMe" />
                  <Label for="remember" class="text-sm">记住我</Label>
                </div>
              </div>

              <Button type="submit" class="w-full" :disabled="isLoggingIn">
                <ArrowPathIcon v-if="isLoggingIn" class="h-4 w-4 animate-spin" />
                {{ isLoggingIn ? "登录中..." : "登录" }}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tech-lines {
  background-image:
    linear-gradient(to right, rgba(255, 255, 255, 0.12) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.12) 1px, transparent 1px);
  background-size: 32px 32px;
}

.tech-scan {
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(255, 255, 255, 0.03) 30%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.03) 70%,
    transparent 100%
  );
  animation: techScan 3s linear infinite;
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
<!-- [AI_END LINES=154 TIMESTAMP=2025-06-20 06:00:00] -->

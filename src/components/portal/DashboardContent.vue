<!-- [AI_START TIMESTAMP=2025-06-20 06:35:00] -->
<script setup lang="ts">
import { useRouter } from "vue-router";
import {
  ShoppingCart,
  Building2,
  Receipt,
  Activity,
  ArrowRight,
  Package,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  Clock,
} from "lucide-vue-next";

const router = useRouter();

const stats = [
  {
    title: "今日订单",
    value: "12",
    unit: "笔",
    icon: ShoppingCart,
    change: "+3",
    changeLabel: "较昨日",
  },
  {
    title: "新增客户",
    value: "3",
    unit: "家",
    icon: Building2,
    change: "+1",
    changeLabel: "较昨日",
  },
  {
    title: "本月收入",
    value: "¥128,456",
    unit: "",
    icon: Receipt,
    change: "+12.5%",
    changeLabel: "较上月",
  },
  {
    title: "API 总调用",
    value: "856,432",
    unit: "次",
    icon: Activity,
    change: "+8.2%",
    changeLabel: "较昨日",
  },
];

const quickActions = [
  {
    title: "订单管理",
    description: "查看和处理客户订单",
    icon: ShoppingCart,
    href: "/orders",
  },
  {
    title: "企业客户",
    description: "管理企业客户与认证",
    icon: Building2,
    href: "/enterprise",
  },
  {
    title: "套餐管理",
    description: "配置服务套餐与定价",
    icon: Package,
    href: "/packages",
  },
  {
    title: "账单管理",
    description: "查看账单与发票申请",
    icon: Receipt,
    href: "/billing",
  },
];

const recentActivities = [
  {
    type: "order",
    title: "新客户 华为云科技 提交订单 #ORD202403150012",
    time: "10分钟前",
    status: "success",
  },
  {
    type: "enterprise",
    title: "企业 阿里云数 完成资质认证",
    time: "30分钟前",
    status: "success",
  },
  {
    type: "billing",
    title: "3月账单已自动生成，共 156 笔",
    time: "1小时前",
    status: "info",
  },
  {
    type: "service",
    title: "GPT-4o 模型配额告警：华为云科技 用量达 92%",
    time: "2小时前",
    status: "pending",
  },
  {
    type: "login",
    title: "运营管理员登录系统",
    time: "3小时前",
    status: "info",
  },
];

const pendingTasks = [
  { name: "待审核企业认证", count: 5, href: "/enterprise" },
  { name: "待处理退款申请", count: 2, href: "/orders" },
  { name: "待开具发票", count: 8, href: "/billing" },
  { name: "欠费预警客户", count: 3, href: "/wallet" },
];

function navigate(href: string) {
  router.push(href);
}
</script>

<template>
  <div class="space-y-6">
    <!-- Welcome -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-semibold text-foreground">运营总览</h2>
        <p class="text-muted-foreground">今日平台运营数据与待办事项</p>
      </div>
      <div class="flex items-center gap-2">
        <Badge variant="outline" class="gap-1">
          <Clock class="h-3 w-3" />
          数据更新于 10:00
        </Badge>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card v-for="stat in stats" :key="stat.title">
        <CardHeader class="flex flex-row items-center justify-between pb-2">
          <CardTitle class="text-sm font-medium text-muted-foreground">{{
            stat.title
          }}</CardTitle>
          <component :is="stat.icon" class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="flex items-baseline gap-1">
            <span class="text-2xl font-bold">{{ stat.value }}</span>
            <span class="text-sm text-muted-foreground">{{ stat.unit }}</span>
          </div>
          <div
            class="mt-1 flex items-center gap-1 text-xs text-muted-foreground"
          >
            <TrendingUp class="h-3 w-3 text-green-500" />
            <span class="text-green-500">{{ stat.change }}</span>
            <span>{{ stat.changeLabel }}</span>
          </div>
        </CardContent>
      </Card>
    </div>

    <div class="grid gap-6 lg:grid-cols-3">
      <!-- Quick Actions -->
      <Card class="lg:col-span-1">
        <CardHeader>
          <CardTitle>快捷入口</CardTitle>
          <CardDescription>常用运营功能快速访问</CardDescription>
        </CardHeader>
        <CardContent class="space-y-3">
          <button
            v-for="action in quickActions"
            :key="action.title"
            @click="navigate(action.href)"
            class="flex h-auto w-full items-center justify-between rounded-lg border border-border p-4 text-left transition-colors hover:bg-accent"
          >
            <div class="flex items-center gap-3">
              <div
                class="flex h-9 w-9 items-center justify-center rounded-lg bg-muted"
              >
                <component :is="action.icon" class="h-4 w-4" />
              </div>
              <div>
                <div class="font-medium">{{ action.title }}</div>
                <div class="text-xs text-muted-foreground">
                  {{ action.description }}
                </div>
              </div>
            </div>
            <ArrowRight class="h-4 w-4 text-muted-foreground" />
          </button>
        </CardContent>
      </Card>

      <!-- Recent Activities -->
      <Card class="lg:col-span-2">
        <CardHeader>
          <CardTitle>最新动态</CardTitle>
          <CardDescription>平台近期的运营事件</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <div
              v-for="activity in recentActivities"
              :key="activity.title"
              class="flex items-center gap-3"
            >
              <div
                :class="[
                  'h-2 w-2 rounded-full',
                  activity.status === 'success'
                    ? 'bg-green-500'
                    : activity.status === 'pending'
                      ? 'bg-yellow-500'
                      : 'bg-blue-500',
                ]"
              />
              <div class="flex-1">
                <p class="text-sm">{{ activity.title }}</p>
              </div>
              <span class="text-xs text-muted-foreground">{{
                activity.time
              }}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Pending Tasks -->
    <Card>
      <CardHeader>
        <CardTitle>待办事项</CardTitle>
        <CardDescription>需要运营人员处理的事项</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid gap-4 md:grid-cols-4">
          <div
            v-for="task in pendingTasks"
            :key="task.name"
            class="flex items-center justify-between rounded-lg border border-border p-4 cursor-pointer hover:bg-accent transition-colors"
            @click="navigate(task.href)"
          >
            <div>
              <p class="font-medium">{{ task.name }}</p>
            </div>
            <div class="flex items-center gap-2">
              <Badge v-if="task.count > 0" variant="outline" class="gap-1">
                <AlertTriangle
                  v-if="task.count >= 5"
                  class="h-3 w-3 text-red-500"
                />
                <CheckCircle2 v-else class="h-3 w-3 text-yellow-500" />
                {{ task.count }} 项
              </Badge>
              <ArrowRight class="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
<!-- [AI_END LINES=154 TIMESTAMP=2025-06-20 06:35:00] -->

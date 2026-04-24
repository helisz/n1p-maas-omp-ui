<!-- [AI_START TIMESTAMP=2025-06-15 12:00:00] -->
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Card from '@/components/ui/Card.vue'
import CardHeader from '@/components/ui/CardHeader.vue'
import CardTitle from '@/components/ui/CardTitle.vue'
import CardDescription from '@/components/ui/CardDescription.vue'
import CardContent from '@/components/ui/CardContent.vue'
import Button from '@/components/ui/Button.vue'
import Badge from '@/components/ui/Badge.vue'
import Dialog from '@/components/ui/Dialog.vue'
import DialogContent from '@/components/ui/DialogContent.vue'
import DialogHeader from '@/components/ui/DialogHeader.vue'
import DialogTitle from '@/components/ui/DialogTitle.vue'
import DialogDescription from '@/components/ui/DialogDescription.vue'
import DialogFooter from '@/components/ui/DialogFooter.vue'
import {
  Server,
  Activity,
  Receipt,
  Clock,
  ArrowRight,
  Key,
  FileText,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Building2,
  Upload,
  UserCheck,
  Zap,
  Lock,
  HeadphonesIcon,
} from 'lucide-vue-next'

const router = useRouter()
const auth = useAuthStore()
const showVerifyDialog = ref(false)

onMounted(() => {
  if (auth.justLoggedIn) {
    showVerifyDialog.value = true
    auth.clearJustLoggedIn()
  }
})

const stats = [
  { title: '已开通服务', value: '5', unit: '个', icon: Server, change: '+2', changeLabel: '本月新增' },
  { title: '本月API调用', value: '128,456', unit: '次', icon: Activity, change: '+12.5%', changeLabel: '较上月' },
  { title: '待支付订单', value: '2', unit: '笔', icon: Receipt, change: '¥3,600', changeLabel: '待付金额' },
  { title: '即将到期套餐', value: '1', unit: '个', icon: Clock, change: '15天后', changeLabel: '到期' },
]

const quickActions = [
  { title: '订购套餐', description: '浏览并购买 MaaS 服务套餐', icon: Server, href: '/packages' },
  { title: '查看 API 密钥', description: '管理您的 API 访问凭证', icon: Key, href: '/services' },
  { title: '查看账单', description: '查看账单详情和支付记录', icon: FileText, href: '/billing' },
]

const recentActivities = [
  { type: 'service', title: 'GPT-4 API 服务开通成功', time: '10分钟前', status: 'success' },
  { type: 'payment', title: '订单 #ORD202403150001 支付成功', time: '2小时前', status: 'success' },
  { type: 'auth', title: '网银Key认证完成', time: '2小时前', status: 'success' },
  { type: 'order', title: '创建订单 #ORD202403150002', time: '3小时前', status: 'pending' },
  { type: 'login', title: '管理员登录系统', time: '昨天 14:30', status: 'info' },
]

const activePackages = [
  { name: 'GPT-4 企业版', status: 'active', usage: 45, expiry: '2024-06-15' },
  { name: 'Claude 基础版', status: 'active', usage: 78, expiry: '2024-05-20' },
  { name: 'Embedding 旗舰版', status: 'expiring', usage: 92, expiry: '2024-04-01' },
]

function navigate(href: string) {
  router.push(href)
}

function goToEnterprise() {
  showVerifyDialog.value = false
  router.push('/enterprise')
}
</script>

<template>
  <div class="space-y-6">
    <!-- Welcome -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-semibold text-foreground">欢迎回来，中科云数科技</h2>
        <p class="text-muted-foreground">以下是您的服务概览和最新动态</p>
      </div>
      <div class="flex items-center gap-2">
        <Badge variant="outline" class="gap-1">
          <ShieldCheck class="h-3 w-3" />
          已认证企业
        </Badge>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card v-for="stat in stats" :key="stat.title">
        <CardHeader class="flex flex-row items-center justify-between pb-2">
          <CardTitle class="text-sm font-medium text-muted-foreground">{{ stat.title }}</CardTitle>
          <component :is="stat.icon" class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="flex items-baseline gap-1">
            <span class="text-2xl font-bold">{{ stat.value }}</span>
            <span class="text-sm text-muted-foreground">{{ stat.unit }}</span>
          </div>
          <div class="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
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
          <CardDescription>常用功能快速访问</CardDescription>
        </CardHeader>
        <CardContent class="space-y-3">
          <button
            v-for="action in quickActions"
            :key="action.title"
            @click="navigate(action.href)"
            class="flex h-auto w-full items-center justify-between rounded-lg border border-border p-4 text-left transition-colors hover:bg-accent"
          >
            <div class="flex items-center gap-3">
              <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                <component :is="action.icon" class="h-4 w-4" />
              </div>
              <div>
                <div class="font-medium">{{ action.title }}</div>
                <div class="text-xs text-muted-foreground">{{ action.description }}</div>
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
          <CardDescription>近期的操作记录</CardDescription>
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
                  activity.status === 'success' ? 'bg-green-500' :
                  activity.status === 'pending' ? 'bg-yellow-500' : 'bg-blue-500'
                ]"
              />
              <div class="flex-1">
                <p class="text-sm">{{ activity.title }}</p>
              </div>
              <span class="text-xs text-muted-foreground">{{ activity.time }}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Active Packages -->
    <Card>
      <CardHeader>
        <CardTitle>当前套餐</CardTitle>
        <CardDescription>已开通的 MaaS 服务套餐</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid gap-4 md:grid-cols-3">
          <div
            v-for="pkg in activePackages"
            :key="pkg.name"
            class="flex items-center justify-between rounded-lg border border-border p-4"
          >
            <div>
              <p class="font-medium">{{ pkg.name }}</p>
              <p class="text-sm text-muted-foreground">到期：{{ pkg.expiry }}</p>
            </div>
            <Badge v-if="pkg.status === 'active'" variant="outline" class="gap-1">
              <CheckCircle2 class="h-3 w-3 text-green-500" />运行中
            </Badge>
            <Badge v-else variant="outline" class="gap-1">
              <AlertTriangle class="h-3 w-3 text-red-500" />即将到期
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Enterprise Verification Dialog -->
    <Dialog v-model:open="showVerifyDialog">
      <DialogContent class="sm:max-w-lg">
        <DialogHeader class="text-center">
          <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 mb-4">
            <Building2 class="h-8 w-8 text-indigo-600" />
          </div>
          <DialogTitle class="text-xl">完善企业信息，解锁全部服务</DialogTitle>
          <DialogDescription>
            为了保障平台安全与合规，请您尽快完成企业资质验证
          </DialogDescription>
        </DialogHeader>

        <div class="space-y-5 py-2">
          <!-- Steps -->
          <div class="space-y-3">
            <p class="text-sm font-semibold text-foreground">验证流程</p>
            <div class="flex items-start gap-3">
              <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">1</div>
              <div>
                <p class="text-sm font-medium">进入「企业信息管理」</p>
                <p class="text-xs text-muted-foreground">填写企业基本信息与联系人资料</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">2</div>
              <div>
                <p class="text-sm font-medium">上传企业资质材料</p>
                <p class="text-xs text-muted-foreground">营业执照、法人身份证等必要文件</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">3</div>
              <div>
                <p class="text-sm font-medium">等待审核通过</p>
                <p class="text-xs text-muted-foreground">平台将在 1-2 个工作日内完成审核</p>
              </div>
            </div>
          </div>

          <!-- Benefits -->
          <div class="rounded-lg bg-muted/50 p-4 space-y-3">
            <p class="text-sm font-semibold text-foreground">验证后可享受</p>
            <div class="grid grid-cols-2 gap-3">
              <div class="flex items-center gap-2">
                <Zap class="h-4 w-4 text-amber-500" />
                <span class="text-xs">更高 API 调用额度</span>
              </div>
              <div class="flex items-center gap-2">
                <HeadphonesIcon class="h-4 w-4 text-indigo-500" />
                <span class="text-xs">专属客户经理</span>
              </div>
              <div class="flex items-center gap-2">
                <Lock class="h-4 w-4 text-emerald-500" />
                <span class="text-xs">企业级 SLA 保障</span>
              </div>
              <div class="flex items-center gap-2">
                <CheckCircle2 class="h-4 w-4 text-blue-500" />
                <span class="text-xs">优先技术支持</span>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter class="flex-col sm:flex-row gap-2">
          <Button variant="outline" class="w-full sm:w-auto" @click="showVerifyDialog = false">
            我知道了
          </Button>
          <Button class="w-full sm:w-auto gap-2" @click="goToEnterprise">
            <ShieldCheck class="h-4 w-4" />
            验证企业资质
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
<!-- [AI_END LINES=213 TIMESTAMP=2025-06-15 12:00:00] -->

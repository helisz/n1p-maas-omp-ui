<!-- [AI_START TIMESTAMP=2025-06-15 12:00:00] -->
<script setup lang="ts">
import { ref } from 'vue'
import Card from '@/components/ui/Card.vue'
import CardHeader from '@/components/ui/CardHeader.vue'
import CardTitle from '@/components/ui/CardTitle.vue'
import CardDescription from '@/components/ui/CardDescription.vue'
import CardContent from '@/components/ui/CardContent.vue'
import CardFooter from '@/components/ui/CardFooter.vue'
import Button from '@/components/ui/Button.vue'
import Badge from '@/components/ui/Badge.vue'
import Dialog from '@/components/ui/Dialog.vue'
import DialogContent from '@/components/ui/DialogContent.vue'
import DialogHeader from '@/components/ui/DialogHeader.vue'
import DialogTitle from '@/components/ui/DialogTitle.vue'
import DialogDescription from '@/components/ui/DialogDescription.vue'
import DialogFooter from '@/components/ui/DialogFooter.vue'
import { Check, Sparkles, Rocket, Crown, Info, ArrowRight, Zap, Brain, Eye } from 'lucide-vue-next'

const packages = [
  {
    id: 'basic',
    name: '基础版',
    subtitle: 'Starter',
    description: '个人开发者与初创团队的理想选择',
    price: 1999,
    period: '月',
    features: [
      '大语言模型 API 50,000 次/月',
      '标准响应速度',
      '基础技术支持',
      'API 文档访问',
      '基础调用统计报表',
    ],
    tier: 'basic',
    popular: false,
  },
  {
    id: 'advanced',
    name: '高级版',
    subtitle: 'Professional',
    description: '成长型企业与中型团队的全能方案',
    price: 5999,
    period: '月',
    features: [
      '大语言模型 API 200,000 次/月',
      '优先响应队列',
      '7×24 技术支持',
      '专属客户经理',
      '高级调用分析',
      '自定义限流规则',
    ],
    tier: 'advanced',
    popular: true,
  },
  {
    id: 'premium',
    name: '尊享版',
    subtitle: 'Enterprise',
    description: '大型企业与高并发场景的顶级配置',
    price: 19999,
    period: '月',
    features: [
      '大语言模型 API 1,000,000 次/月',
      '最高响应优先级',
      '专属技术团队支持',
      'SLA 99.99% 保障',
      '私有化部署支持',
      '定制化功能开发',
      '专属网络通道',
    ],
    tier: 'premium',
    popular: false,
  },
]

const tierConfig: Record<string, { icon: typeof Sparkles; gradient: string; badgeGradient: string; accentColor: string; ringColor: string }> = {
  basic: { icon: Sparkles, gradient: 'from-slate-500 to-slate-600', badgeGradient: 'bg-slate-100 text-slate-700', accentColor: 'text-slate-600', ringColor: 'ring-slate-200' },
  advanced: { icon: Rocket, gradient: 'from-indigo-500 to-purple-600', badgeGradient: 'bg-indigo-100 text-indigo-700', accentColor: 'text-indigo-600', ringColor: 'ring-indigo-300' },
  premium: { icon: Crown, gradient: 'from-amber-500 to-orange-600', badgeGradient: 'bg-amber-100 text-amber-700', accentColor: 'text-amber-600', ringColor: 'ring-amber-300' },
}

const selectedPackage = ref<typeof packages[0] | null>(null)
const dialogOpen = ref(false)

function handlePurchase(pkg: typeof packages[0]) {
  selectedPackage.value = pkg
  dialogOpen.value = true
}
</script>

<template>
  <div class="space-y-8">
    <!-- Header -->
    <div>
      <h2 class="text-2xl font-semibold text-foreground">服务订购</h2>
      <p class="text-muted-foreground">一站式 AI 能力套餐，整合大语言模型、向量服务与视觉服务，按需选择，即刻启程</p>
    </div>

    <!-- Package Cards -->
    <div class="grid gap-6 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 xxl:grid-cols-4 items-stretch">
      <Card
        v-for="pkg in packages"
        :key="pkg.id"
        :class="[
          'relative overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl',
          pkg.popular ? 'ring-2 ring-indigo-400 shadow-lg scale-[1.02]' : 'ring-1 ring-border',
        ]"
      >
        <!-- Popular Badge -->
        <div
          v-if="pkg.popular"
          class="absolute top-0 right-0 bg-gradient-to-l from-indigo-600 to-purple-600 text-white text-xs font-semibold px-4 py-1 rounded-bl-lg z-10"
        >
          最受欢迎
        </div>

        <!-- Card Header with Gradient -->
        <CardHeader :class="['relative pb-6 pt-7', pkg.popular ? 'bg-indigo-50/60' : 'bg-muted/30']">
          <!-- <div class="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r" :class="tierConfig[pkg.tier].gradient" /> -->
          <div class="flex items-center gap-3">
            <div
              class="flex h-12 w-12 items-center justify-center rounded-xl ring-1"
              :class="tierConfig[pkg.tier].ringColor"
            >
              <component :is="tierConfig[pkg.tier].icon" :class="['h-6 w-6', tierConfig[pkg.tier].accentColor]" />
            </div>
            <div>
              <CardTitle class="text-xl">{{ pkg.name }}</CardTitle>
              <span class="text-xs font-medium uppercase tracking-wider text-muted-foreground">{{ pkg.subtitle }}</span>
            </div>
          </div>
          <CardDescription class="mt-3 text-sm leading-relaxed">{{ pkg.description }}</CardDescription>
        </CardHeader>

        <!-- Price -->
        <CardContent class="pt-2 pb-0">
          <div class="flex items-baseline gap-1">
            <span class="text-sm text-muted-foreground">¥</span>
            <span class="text-4xl font-extrabold tracking-tight">{{ pkg.price.toLocaleString() }}</span>
            <span class="text-muted-foreground">/ {{ pkg.period }}</span>
          </div>
        </CardContent>

        <!-- Features - flex-1 to push footer down -->
        <CardContent class="flex-1 pt-5">
          <div class="space-y-3">
            <p class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">套餐包含</p>
            <ul class="space-y-2.5">
              <li v-for="feature in pkg.features" :key="feature" class="flex items-start gap-2.5 text-sm">
                <div class="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-green-100">
                  <Check class="h-2.5 w-2.5 text-green-600" />
                </div>
                <span class="text-foreground/90">{{ feature }}</span>
              </li>
            </ul>
          </div>
        </CardContent>

        <!-- CTA Footer - always at bottom -->
        <CardFooter class="pt-6 pb-6">
          <Button
            :class="[
              'w-full font-semibold transition-all duration-200',
              pkg.popular
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg'
                : 'hover:bg-foreground hover:text-background',
            ]"
            variant="outline"
            @click="handlePurchase(pkg)"
          >
            立即订购
            <ArrowRight class="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>

    <!-- Trust Indicators -->
    <div class="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
      <div class="flex items-center gap-2">
        <Zap class="h-4 w-4 text-amber-500" />
        <span>即时开通</span>
      </div>
      <div class="flex items-center gap-2">
        <Brain class="h-4 w-4 text-indigo-500" />
        <span>全模型覆盖</span>
      </div>
      <div class="flex items-center gap-2">
        <Eye class="h-4 w-4 text-emerald-500" />
        <span>透明计费</span>
      </div>
    </div>

    <!-- Purchase Dialog -->
    <Dialog v-model:open="dialogOpen">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>确认订购</DialogTitle>
          <DialogDescription>请确认您要订购以下套餐</DialogDescription>
        </DialogHeader>
        <div v-if="selectedPackage" class="space-y-4">
          <div class="flex items-center gap-3 rounded-lg bg-muted p-4">
            <component :is="tierConfig[selectedPackage.tier].icon" :class="['h-6 w-6', tierConfig[selectedPackage.tier].accentColor]" />
            <div>
              <p class="font-medium">{{ selectedPackage.name }}</p>
              <p class="text-sm text-muted-foreground">{{ selectedPackage.subtitle }}</p>
            </div>
          </div>
          <div class="flex items-center justify-between rounded-lg border border-border p-4">
            <span class="text-muted-foreground">套餐价格</span>
            <span class="text-lg font-bold">¥{{ selectedPackage.price.toLocaleString() }}/{{ selectedPackage.period }}</span>
          </div>
          <div class="flex items-center gap-2 rounded-lg bg-muted/50 p-3">
            <Info class="h-4 w-4 text-muted-foreground shrink-0" />
            <p class="text-xs text-muted-foreground">订购后将立即开通全部套餐内服务，费用将计入当月账单。</p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" @click="dialogOpen = false">取消</Button>
          <Button @click="dialogOpen = false">确认订购</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
<!-- [AI_END LINES=177 TIMESTAMP=2025-06-15 12:00:00] -->

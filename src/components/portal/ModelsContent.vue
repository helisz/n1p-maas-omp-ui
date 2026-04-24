<!-- [AI_START TIMESTAMP=2025-06-16 08:00:00] -->
<script setup lang="ts">
import { ref, computed } from 'vue'
import Card from '@/components/ui/Card.vue'
import CardHeader from '@/components/ui/CardHeader.vue'
import CardTitle from '@/components/ui/CardTitle.vue'
import CardDescription from '@/components/ui/CardDescription.vue'
import CardContent from '@/components/ui/CardContent.vue'
import Button from '@/components/ui/Button.vue'
import Badge from '@/components/ui/Badge.vue'
import Input from '@/components/ui/Input.vue'
import Dialog from '@/components/ui/Dialog.vue'
import DialogContent from '@/components/ui/DialogContent.vue'
import DialogHeader from '@/components/ui/DialogHeader.vue'
import DialogTitle from '@/components/ui/DialogTitle.vue'
import DialogDescription from '@/components/ui/DialogDescription.vue'
import DialogFooter from '@/components/ui/DialogFooter.vue'
import {
  Search, Brain, Eye, ExternalLink, Cpu, Layers, Hash,
  DollarSign, Sparkles, Globe, Zap,
} from 'lucide-vue-next'

interface TierPricing {
  prompt: number
  completion: number
}

interface ModelPricing {
  basic: TierPricing
  advanced: TierPricing
  premium: TierPricing
}

interface Model {
  id: string
  name: string
  provider: string
  description: string
  tags: string[]
  contextLength: number
  maxOutput: number
  pricing: ModelPricing
  capabilities: string[]
  modality: string
}

const models: Model[] = [
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'OpenAI',
    description: 'OpenAI 旗舰多模态模型，在文本、视觉和音频理解方面表现卓越，具备极高的推理能力和响应速度。',
    tags: ['旗舰', '多模态', '推荐'],
    contextLength: 128000,
    maxOutput: 16384,
    pricing: {
      basic: { prompt: 2.5, completion: 10.0 },
      advanced: { prompt: 2.25, completion: 9.0 },
      premium: { prompt: 2.0, completion: 8.0 },
    },
    capabilities: ['Text Generation', 'Vision', 'Function Calling', 'JSON Mode', 'Streaming'],
    modality: 'Text + Vision',
  },
  {
    id: 'gpt-4o-mini',
    name: 'GPT-4o Mini',
    provider: 'OpenAI',
    description: 'OpenAI 轻量级多模态模型，性价比极高，适合高频调用场景和成本敏感型应用。',
    tags: ['高性价比', '多模态'],
    contextLength: 128000,
    maxOutput: 16384,
    pricing: {
      basic: { prompt: 0.15, completion: 0.6 },
      advanced: { prompt: 0.135, completion: 0.54 },
      premium: { prompt: 0.12, completion: 0.48 },
    },
    capabilities: ['Text Generation', 'Vision', 'Function Calling', 'JSON Mode', 'Streaming'],
    modality: 'Text + Vision',
  },
  {
    id: 'claude-3-5-sonnet',
    name: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    description: 'Anthropic 高性能模型，在编程、推理和复杂指令遵循方面表现尤为出色，代码生成能力强。',
    tags: ['编程强', '推理优'],
    contextLength: 200000,
    maxOutput: 8192,
    pricing: {
      basic: { prompt: 3.0, completion: 15.0 },
      advanced: { prompt: 2.7, completion: 13.5 },
      premium: { prompt: 2.4, completion: 12.0 },
    },
    capabilities: ['Text Generation', 'Vision', 'Function Calling', 'Code Generation', 'Streaming'],
    modality: 'Text + Vision',
  },
  {
    id: 'claude-3-haiku',
    name: 'Claude 3 Haiku',
    provider: 'Anthropic',
    description: 'Anthropic 轻量快速模型，延迟极低，适合需要即时响应的对话和简单任务处理。',
    tags: ['极速', '轻量'],
    contextLength: 200000,
    maxOutput: 4096,
    pricing: {
      basic: { prompt: 0.25, completion: 1.25 },
      advanced: { prompt: 0.225, completion: 1.125 },
      premium: { prompt: 0.2, completion: 1.0 },
    },
    capabilities: ['Text Generation', 'Vision', 'Streaming'],
    modality: 'Text + Vision',
  },
  {
    id: 'gemini-1-5-pro',
    name: 'Gemini 1.5 Pro',
    provider: 'Google',
    description: 'Google 先进多模态模型，支持超长上下文窗口，在文档分析和视频理解方面具有独特优势。',
    tags: ['超长上下文', '多模态'],
    contextLength: 2000000,
    maxOutput: 8192,
    pricing: {
      basic: { prompt: 3.5, completion: 10.5 },
      advanced: { prompt: 3.15, completion: 9.45 },
      premium: { prompt: 2.8, completion: 8.4 },
    },
    capabilities: ['Text Generation', 'Vision', 'Audio', 'Video', 'Function Calling', 'Streaming'],
    modality: 'Text + Vision + Audio',
  },
  {
    id: 'gemini-1-5-flash',
    name: 'Gemini 1.5 Flash',
    provider: 'Google',
    description: 'Google 快速高效模型，针对低延迟和高吞吐量场景优化，适合大规模部署。',
    tags: ['高速', '高效'],
    contextLength: 1000000,
    maxOutput: 8192,
    pricing: {
      basic: { prompt: 0.35, completion: 0.7 },
      advanced: { prompt: 0.315, completion: 0.63 },
      premium: { prompt: 0.28, completion: 0.56 },
    },
    capabilities: ['Text Generation', 'Vision', 'Audio', 'Function Calling', 'Streaming'],
    modality: 'Text + Vision + Audio',
  },
  {
    id: 'deepseek-chat',
    name: 'DeepSeek V3',
    provider: 'DeepSeek',
    description: '国产开源大模型佼佼者，在数学推理和代码生成方面表现优异，性价比极高。',
    tags: ['国产', '开源', '高性价比'],
    contextLength: 64000,
    maxOutput: 8192,
    pricing: {
      basic: { prompt: 0.1, completion: 0.5 },
      advanced: { prompt: 0.09, completion: 0.45 },
      premium: { prompt: 0.08, completion: 0.4 },
    },
    capabilities: ['Text Generation', 'Code Generation', 'Function Calling', 'Streaming'],
    modality: 'Text',
  },
  {
    id: 'deepseek-reasoner',
    name: 'DeepSeek R1',
    provider: 'DeepSeek',
    description: '深度推理模型，在复杂逻辑推理、数学证明和代码调试方面展现出强大的思维能力。',
    tags: ['深度推理', '国产'],
    contextLength: 64000,
    maxOutput: 8192,
    pricing: {
      basic: { prompt: 0.5, completion: 2.0 },
      advanced: { prompt: 0.45, completion: 1.8 },
      premium: { prompt: 0.4, completion: 1.6 },
    },
    capabilities: ['Text Generation', 'Reasoning', 'Code Generation', 'Streaming'],
    modality: 'Text',
  },
  {
    id: 'qwen2-5-72b',
    name: 'Qwen2.5 72B',
    provider: 'Alibaba Cloud',
    description: '阿里云通义千问系列大参数模型，中文理解和生成能力顶尖，支持长文本处理。',
    tags: ['中文强', '长文本'],
    contextLength: 128000,
    maxOutput: 8192,
    pricing: {
      basic: { prompt: 0.5, completion: 1.0 },
      advanced: { prompt: 0.45, completion: 0.9 },
      premium: { prompt: 0.4, completion: 0.8 },
    },
    capabilities: ['Text Generation', 'Vision', 'Function Calling', 'Streaming'],
    modality: 'Text + Vision',
  },
  {
    id: 'llama-3-1-405b',
    name: 'Llama 3.1 405B',
    provider: 'Meta',
    description: 'Meta 开源大模型旗舰版本，405B 参数规模，在多语言理解和复杂推理方面表现强劲。',
    tags: ['开源', '多语言'],
    contextLength: 128000,
    maxOutput: 8192,
    pricing: {
      basic: { prompt: 1.5, completion: 3.0 },
      advanced: { prompt: 1.35, completion: 2.7 },
      premium: { prompt: 1.2, completion: 2.4 },
    },
    capabilities: ['Text Generation', 'Function Calling', 'Streaming'],
    modality: 'Text',
  },
  {
    id: 'mistral-large',
    name: 'Mistral Large 2',
    provider: 'Mistral AI',
    description: 'Mistral 顶级商用模型，在代码、数学和多语言任务上表现卓越，推理效率高。',
    tags: ['多语言', '代码'],
    contextLength: 128000,
    maxOutput: 8192,
    pricing: {
      basic: { prompt: 2.0, completion: 6.0 },
      advanced: { prompt: 1.8, completion: 5.4 },
      premium: { prompt: 1.6, completion: 4.8 },
    },
    capabilities: ['Text Generation', 'Function Calling', 'JSON Mode', 'Streaming'],
    modality: 'Text',
  },
  {
    id: 'kimi-k1-5',
    name: 'Kimi K1.5',
    provider: 'Moonshot AI',
    description: '月之暗面 Kimi 系列模型，支持超长上下文，在中文长文档处理和理解方面极具优势。',
    tags: ['超长上下文', '中文'],
    contextLength: 256000,
    maxOutput: 16384,
    pricing: {
      basic: { prompt: 0.5, completion: 2.0 },
      advanced: { prompt: 0.45, completion: 1.8 },
      premium: { prompt: 0.4, completion: 1.6 },
    },
    capabilities: ['Text Generation', 'Vision', 'Function Calling', 'Streaming'],
    modality: 'Text + Vision',
  },
]

const providers = computed(() => {
  const set = new Set(models.map(m => m.provider))
  return Array.from(set)
})

const searchQuery = ref('')
const selectedProvider = ref<string>('全部')
const selectedTier = ref<'basic' | 'advanced' | 'premium'>('basic')
const selectedModel = ref<Model | null>(null)
const detailOpen = ref(false)

const tierLabels: Record<string, string> = {
  basic: '基础版',
  advanced: '高级版',
  premium: '尊享版',
}

const tierBadgeClasses: Record<string, string> = {
  basic: 'bg-slate-100 text-slate-700',
  advanced: 'bg-indigo-100 text-indigo-700',
  premium: 'bg-amber-100 text-amber-700',
}

const filteredModels = computed(() => {
  let result = models
  if (selectedProvider.value !== '全部') {
    result = result.filter(m => m.provider === selectedProvider.value)
  }
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(
      m =>
        m.name.toLowerCase().includes(q) ||
        m.provider.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        m.tags.some(t => t.toLowerCase().includes(q))
    )
  }
  return result
})

function openDetail(model: Model) {
  selectedModel.value = model
  detailOpen.value = true
}

function formatPrice(price: number) {
  return `$${price.toFixed(4)}`
}

function formatContext(len: number) {
  if (len >= 10000) return `${(len / 1000).toFixed(0)}K`
  return `${len}`
}

function discountRate(basic: number, tier: number) {
  return Math.round((tier / basic) * 100)
}

const providerColors: Record<string, string> = {
  'OpenAI': 'bg-emerald-100 text-emerald-700',
  'Anthropic': 'bg-orange-100 text-orange-700',
  'Google': 'bg-blue-100 text-blue-700',
  'DeepSeek': 'bg-purple-100 text-purple-700',
  'Alibaba Cloud': 'bg-red-100 text-red-700',
  'Meta': 'bg-indigo-100 text-indigo-700',
  'Mistral AI': 'bg-cyan-100 text-cyan-700',
  'Moonshot AI': 'bg-amber-100 text-amber-700',
}
</script>

<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="flex flex-col gap-2">
      <h2 class="text-2xl font-semibold text-foreground">模型广场</h2>
      <p class="text-muted-foreground">浏览和比较平台接入的各类大语言模型，查看详细规格与分级定价信息</p>
    </div>

    <!-- Filters -->
    <div class="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      <div class="relative w-full lg:w-80">
        <Search class="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input v-model="searchQuery" placeholder="搜索模型名称、提供商或标签..." class="h-10 pl-9 text-sm" />
      </div>
      <div class="flex flex-wrap items-center gap-3">
        <span class="text-xs text-muted-foreground">查看价格：</span>
        <button
          v-for="tier in ['basic', 'advanced', 'premium'] as const"
          :key="tier"
          @click="selectedTier = tier"
          :class="[
            'rounded-full px-4 py-1.5 text-xs font-medium transition-colors',
            selectedTier === tier ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground',
          ]"
        >
          {{ tierLabels[tier] }}
        </button>
      </div>
      <div class="flex flex-wrap gap-2">
        <button
          @click="selectedProvider = '全部'"
          :class="[
            'rounded-full px-4 py-1.5 text-xs font-medium transition-colors',
            selectedProvider === '全部' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground',
          ]"
        >
          全部
        </button>
        <button
          v-for="p in providers"
          :key="p"
          @click="selectedProvider = p"
          :class="[
            'rounded-full px-4 py-1.5 text-xs font-medium transition-colors',
            selectedProvider === p ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground',
          ]"
        >
          {{ p }}
        </button>
      </div>
    </div>

    <!-- Model Cards -->
    <div>
      <div class="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
        <Brain class="h-5 w-5 text-primary" />
        模型列表
        <span class="text-sm font-normal text-muted-foreground">（共 {{ filteredModels.length }} 个）</span>
        <span :class="['ml-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium', tierBadgeClasses[selectedTier]]">
          {{ tierLabels[selectedTier] }}价格
        </span>
      </div>
      <div class="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <Card
          v-for="model in filteredModels"
          :key="model.id"
          class="flex cursor-pointer flex-col transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
          @click="openDetail(model)"
        >
          <CardHeader class="pb-3 pt-5">
            <div class="flex items-start justify-between">
              <div class="flex items-center gap-3">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Cpu class="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div class="flex items-center gap-2">
                    <CardTitle class="text-base">{{ model.name }}</CardTitle>
                    <span v-if="model.tags.includes('推荐')" class="inline-flex items-center rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold text-amber-700">
                      <Sparkles class="mr-0.5 h-3 w-3" />推荐
                    </span>
                  </div>
                  <CardDescription class="mt-0.5 text-xs">
                    {{ model.modality }} · {{ formatContext(model.contextLength) }}
                  </CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent class="flex flex-1 flex-col gap-4 pb-5">
            <div class="flex flex-wrap gap-1.5">
              <span :class="['inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium', providerColors[model.provider] || 'bg-muted text-muted-foreground']">
                {{ model.provider }}
              </span>
              <Badge v-for="tag in model.tags.filter(t => t !== '推荐')" :key="tag" variant="secondary" class="text-[10px]">
                {{ tag }}
              </Badge>
            </div>
            <p class="line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
              {{ model.description }}
            </p>
            <div class="grid grid-cols-2 gap-3 rounded-lg bg-muted/40 p-3">
              <div>
                <div class="text-[10px] text-muted-foreground">Prompt / 1M</div>
                <div class="mt-0.5 font-mono text-sm font-semibold text-foreground">{{ formatPrice(model.pricing[selectedTier].prompt) }}</div>
              </div>
              <div>
                <div class="text-[10px] text-muted-foreground">Completion / 1M</div>
                <div class="mt-0.5 font-mono text-sm font-semibold text-foreground">{{ formatPrice(model.pricing[selectedTier].completion) }}</div>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-xs text-muted-foreground">上下文 {{ model.contextLength.toLocaleString() }} Tokens</span>
              <Button variant="ghost" size="sm" class="h-7 gap-1 text-xs" @click.stop="openDetail(model)">
                <Eye class="h-3.5 w-3.5" />
                详情
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <div v-if="filteredModels.length === 0" class="py-16 text-center text-muted-foreground">
        未找到匹配的模型
      </div>
    </div>

    <!-- Price Legend -->
    <div class="rounded-lg border border-border bg-muted/30 p-5">
      <div class="flex items-center gap-2 text-sm font-medium text-foreground">
        <DollarSign class="h-4 w-4" />
        计费说明
      </div>
      <p class="mt-2 text-xs leading-relaxed text-muted-foreground">
        价格单位：每百万 Tokens（1M Tokens）。基础版按标准价计费，高级版享约 9 折优惠，尊享版享约 8 折优惠。实际费用按调用量实时结算。
      </p>
    </div>

    <!-- Detail Dialog -->
    <Dialog v-model:open="detailOpen">
      <DialogContent class="max-w-2xl">
        <DialogHeader>
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Cpu class="h-5 w-5 text-primary" />
            </div>
            <div>
              <DialogTitle class="text-xl">{{ selectedModel?.name }}</DialogTitle>
              <DialogDescription class="flex items-center gap-2">
                <span :class="['inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium', selectedModel ? (providerColors[selectedModel.provider] || 'bg-muted text-muted-foreground') : '']">
                  {{ selectedModel?.provider }}
                </span>
                <span class="text-xs text-muted-foreground">{{ selectedModel?.modality }}</span>
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div v-if="selectedModel" class="space-y-6 py-2">
          <!-- Description -->
          <p class="text-sm leading-relaxed text-foreground">{{ selectedModel.description }}</p>

          <!-- Tags -->
          <div class="flex flex-wrap gap-2">
            <Badge v-for="tag in selectedModel.tags" :key="tag" variant="outline">{{ tag }}</Badge>
          </div>

          <!-- Specs Grid -->
          <div class="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div class="rounded-lg border border-border bg-muted/30 p-3">
              <div class="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Layers class="h-3.5 w-3.5" />
                上下文长度
              </div>
              <p class="mt-1 text-sm font-semibold text-foreground">{{ selectedModel.contextLength.toLocaleString() }} Tokens</p>
            </div>
            <div class="rounded-lg border border-border bg-muted/30 p-3">
              <div class="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Hash class="h-3.5 w-3.5" />
                最大输出
              </div>
              <p class="mt-1 text-sm font-semibold text-foreground">{{ selectedModel.maxOutput.toLocaleString() }} Tokens</p>
            </div>
            <div class="rounded-lg border border-border bg-muted/30 p-3">
              <div class="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Globe class="h-3.5 w-3.5" />
                模态
              </div>
              <p class="mt-1 text-sm font-semibold text-foreground">{{ selectedModel.modality }}</p>
            </div>
          </div>

          <!-- Tiered Pricing -->
          <div class="space-y-3">
            <h4 class="text-sm font-semibold text-foreground">分级定价（每 1M Tokens）</h4>
            <div class="grid grid-cols-3 gap-3">
              <div class="rounded-lg border border-border p-3">
                <div class="flex items-center justify-between">
                  <div class="text-xs text-muted-foreground">基础版</div>
                  <Badge variant="secondary" class="text-[10px]">标准价</Badge>
                </div>
                <div class="mt-2 space-y-1">
                  <div class="flex items-center justify-between">
                    <span class="text-[10px] text-muted-foreground">Prompt</span>
                    <span class="font-mono text-sm font-semibold text-foreground">{{ formatPrice(selectedModel.pricing.basic.prompt) }}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-[10px] text-muted-foreground">Completion</span>
                    <span class="font-mono text-sm font-semibold text-foreground">{{ formatPrice(selectedModel.pricing.basic.completion) }}</span>
                  </div>
                </div>
              </div>
              <div class="rounded-lg border border-border p-3">
                <div class="flex items-center justify-between">
                  <div class="text-xs text-muted-foreground">高级版</div>
                  <Badge variant="secondary" class="text-[10px]">约 {{ discountRate(selectedModel.pricing.basic.prompt, selectedModel.pricing.advanced.prompt) }}%</Badge>
                </div>
                <div class="mt-2 space-y-1">
                  <div class="flex items-center justify-between">
                    <span class="text-[10px] text-muted-foreground">Prompt</span>
                    <span class="font-mono text-sm font-semibold text-foreground">{{ formatPrice(selectedModel.pricing.advanced.prompt) }}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-[10px] text-muted-foreground">Completion</span>
                    <span class="font-mono text-sm font-semibold text-foreground">{{ formatPrice(selectedModel.pricing.advanced.completion) }}</span>
                  </div>
                </div>
              </div>
              <div class="rounded-lg border border-border p-3">
                <div class="flex items-center justify-between">
                  <div class="text-xs text-muted-foreground">尊享版</div>
                  <Badge variant="secondary" class="text-[10px]">约 {{ discountRate(selectedModel.pricing.basic.prompt, selectedModel.pricing.premium.prompt) }}%</Badge>
                </div>
                <div class="mt-2 space-y-1">
                  <div class="flex items-center justify-between">
                    <span class="text-[10px] text-muted-foreground">Prompt</span>
                    <span class="font-mono text-sm font-semibold text-foreground">{{ formatPrice(selectedModel.pricing.premium.prompt) }}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-[10px] text-muted-foreground">Completion</span>
                    <span class="font-mono text-sm font-semibold text-foreground">{{ formatPrice(selectedModel.pricing.premium.completion) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Capabilities -->
          <div class="space-y-3">
            <h4 class="text-sm font-semibold text-foreground">能力支持</h4>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="cap in selectedModel.capabilities"
                :key="cap"
                class="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
              >
                <Zap class="h-3 w-3" />
                {{ cap }}
              </span>
            </div>
          </div>
        </div>

        <DialogFooter class="gap-2 sm:gap-0">
          <Button variant="outline" @click="detailOpen = false">关闭</Button>
          <Button class="gap-1">
            <ExternalLink class="h-4 w-4" />
            查看文档
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
<!-- [AI_END LINES=370 TIMESTAMP=2025-06-16 08:00:00] -->

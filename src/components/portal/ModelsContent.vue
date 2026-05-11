<!-- [AI_START TIMESTAMP=2025-07-18 12:30:00] -->
<script setup lang="ts">
import { ref, computed } from 'vue';
import { MagnifyingGlassIcon, SparklesIcon, CheckCircleIcon, ExclamationTriangleIcon, XCircleIcon, EyeIcon, PencilSquareIcon, BoltIcon, PlusIcon, ChevronRightIcon, ChevronLeftIcon, CpuChipIcon, RectangleStackIcon, HashtagIcon, GlobeAltIcon, CurrencyDollarIcon } from '@heroicons/vue/24/outline';

interface TierPricing {
  input: number;
  output: number;
  cacheRead: number;
}

interface ModelPricing {
  basic: TierPricing;
  advanced: TierPricing;
  premium: TierPricing;
}

interface ModelItem {
  id: string;
  name: string;
  provider: string;
  description: string;
  tags: string[];
  modality: string;
  contextLength: number;
  maxOutput: number;
  pricing: ModelPricing;
  costPrice: TierPricing;
  capabilities: string[];
  status: 'online' | 'maintenance' | 'offline';
  calls: number;
  rpm: number;
  tpm: number;
}

const models = ref<ModelItem[]>([
  {
    id: 'doubao-seed-2-0-pro',
    name: 'Doubao-Seed-2.0-pro',
    provider: '火山引擎',
    description: '火山引擎 Doubao 系列旗舰模型，具备强大的推理能力和多模态理解能力，适用于复杂任务场景。',
    tags: ['旗舰', '推荐'],
    modality: 'Text + Vision',
    contextLength: 128000,
    maxOutput: 16384,
    pricing: {
      basic: { input: 2.0, output: 8.0, cacheRead: 0.5 },
      advanced: { input: 1.8, output: 7.2, cacheRead: 0.45 },
      premium: { input: 1.6, output: 6.4, cacheRead: 0.4 },
    },
    costPrice: { input: 1.2, output: 5.0, cacheRead: 0.3 },
    capabilities: ['Text Generation', 'Vision', 'Function Calling', 'Streaming'],
    status: 'online',
    calls: 456000,
    rpm: 10000,
    tpm: 1000000,
  },
  {
    id: 'doubao-seed-2-0-lite',
    name: 'Doubao-Seed-2.0-lite',
    provider: '火山引擎',
    description: '火山引擎 Doubao 轻量级模型，性价比高，适合高频调用和成本敏感型应用场景。',
    tags: ['高性价比', '轻量'],
    modality: 'Text',
    contextLength: 128000,
    maxOutput: 16384,
    pricing: {
      basic: { input: 0.15, output: 0.6, cacheRead: 0.04 },
      advanced: { input: 0.135, output: 0.54, cacheRead: 0.036 },
      premium: { input: 0.12, output: 0.48, cacheRead: 0.032 },
    },
    costPrice: { input: 0.09, output: 0.35, cacheRead: 0.02 },
    capabilities: ['Text Generation', 'Function Calling', 'Streaming'],
    status: 'online',
    calls: 234000,
    rpm: 30000,
    tpm: 2000000,
  },
  {
    id: 'doubao-1-5-pro-32k',
    name: 'Doubao-1.5-pro-32k',
    provider: '火山引擎',
    description: '火山引擎 Doubao 1.5 专业版，32K 上下文窗口，在专业领域任务中表现稳定可靠。',
    tags: ['专业', '稳定'],
    modality: 'Text',
    contextLength: 32000,
    maxOutput: 8192,
    pricing: {
      basic: { input: 1.0, output: 4.0, cacheRead: 0.25 },
      advanced: { input: 0.9, output: 3.6, cacheRead: 0.225 },
      premium: { input: 0.8, output: 3.2, cacheRead: 0.2 },
    },
    costPrice: { input: 0.6, output: 2.5, cacheRead: 0.15 },
    capabilities: ['Text Generation', 'Function Calling', 'Streaming'],
    status: 'online',
    calls: 189000,
    rpm: 8000,
    tpm: 800000,
  },
  {
    id: 'doubao-1-5-lite-32k',
    name: 'Doubao-1.5-lite-32k',
    provider: '火山引擎',
    description: '火山引擎 Doubao 1.5 轻量版，32K 上下文窗口，兼顾性能与成本，适合日常对话和简单任务。',
    tags: ['轻量', '高性价比'],
    modality: 'Text',
    contextLength: 32000,
    maxOutput: 8192,
    pricing: {
      basic: { input: 0.1, output: 0.4, cacheRead: 0.025 },
      advanced: { input: 0.09, output: 0.36, cacheRead: 0.0225 },
      premium: { input: 0.08, output: 0.32, cacheRead: 0.02 },
    },
    costPrice: { input: 0.06, output: 0.25, cacheRead: 0.015 },
    capabilities: ['Text Generation', 'Streaming'],
    status: 'maintenance',
    calls: 98000,
    rpm: 20000,
    tpm: 5000000,
  },
  {
    id: 'deepseek-r1-volc',
    name: 'DeepSeek-R1',
    provider: '火山引擎',
    description: '火山引擎部署的 DeepSeek R1 深度推理模型，在复杂逻辑推理、数学证明和代码调试方面展现出强大的思维能力。',
    tags: ['深度推理', '推荐'],
    modality: 'Text',
    contextLength: 64000,
    maxOutput: 8192,
    pricing: {
      basic: { input: 0.5, output: 2.0, cacheRead: 0.125 },
      advanced: { input: 0.45, output: 1.8, cacheRead: 0.1125 },
      premium: { input: 0.4, output: 1.6, cacheRead: 0.1 },
    },
    costPrice: { input: 0.3, output: 1.2, cacheRead: 0.075 },
    capabilities: ['Text Generation', 'Reasoning', 'Code Generation', 'Streaming'],
    status: 'online',
    calls: 156000,
    rpm: 5000,
    tpm: 500000,
  },
  {
    id: 'deepseek-v3-volc',
    name: 'DeepSeek-V3',
    provider: '火山引擎',
    description: '火山引擎部署的 DeepSeek V3 通用模型，在数学推理和代码生成方面表现优异，性价比极高。',
    tags: ['高性价比', '代码'],
    modality: 'Text',
    contextLength: 64000,
    maxOutput: 8192,
    pricing: {
      basic: { input: 0.1, output: 0.5, cacheRead: 0.025 },
      advanced: { input: 0.09, output: 0.45, cacheRead: 0.0225 },
      premium: { input: 0.08, output: 0.4, cacheRead: 0.02 },
    },
    costPrice: { input: 0.06, output: 0.3, cacheRead: 0.015 },
    capabilities: ['Text Generation', 'Code Generation', 'Function Calling', 'Streaming'],
    status: 'online',
    calls: 312000,
    rpm: 15000,
    tpm: 1500000,
  },
  {
    id: 'deepseek-r1-huawei',
    name: 'DeepSeek-R1',
    provider: '华为云',
    description: '华为云部署的 DeepSeek R1 深度推理模型，在复杂逻辑推理、数学证明和代码调试方面展现出强大的思维能力。',
    tags: ['深度推理', '推荐'],
    modality: 'Text',
    contextLength: 64000,
    maxOutput: 8192,
    pricing: {
      basic: { input: 0.5, output: 2.0, cacheRead: 0.125 },
      advanced: { input: 0.45, output: 1.8, cacheRead: 0.1125 },
      premium: { input: 0.4, output: 1.6, cacheRead: 0.1 },
    },
    costPrice: { input: 0.3, output: 1.2, cacheRead: 0.075 },
    capabilities: ['Text Generation', 'Reasoning', 'Code Generation', 'Streaming'],
    status: 'online',
    calls: 89000,
    rpm: 5000,
    tpm: 500000,
  },
  {
    id: 'deepseek-v3-2-huawei',
    name: 'DeepSeek-V3.2',
    provider: '华为云',
    description: '华为云部署的 DeepSeek V3.2 升级版模型，在推理能力和代码生成方面进一步提升，性能更强劲。',
    tags: ['升级版', '代码'],
    modality: 'Text',
    contextLength: 128000,
    maxOutput: 16384,
    pricing: {
      basic: { input: 0.5, output: 2.0, cacheRead: 0.125 },
      advanced: { input: 0.45, output: 1.8, cacheRead: 0.1125 },
      premium: { input: 0.4, output: 1.6, cacheRead: 0.1 },
    },
    costPrice: { input: 0.3, output: 1.2, cacheRead: 0.075 },
    capabilities: ['Text Generation', 'Code Generation', 'Function Calling', 'Streaming'],
    status: 'online',
    calls: 67000,
    rpm: 3600,
    tpm: 4000000,
  },
  {
    id: 'deepseek-v4-flash',
    name: 'DeepSeek-V4-Flash',
    provider: '华为云',
    description: '华为云部署的 DeepSeek V4 Flash 快速推理模型，延迟极低，适合高吞吐量实时应用场景。',
    tags: ['极速', '高吞吐'],
    modality: 'Text',
    contextLength: 128000,
    maxOutput: 16384,
    pricing: {
      basic: { input: 0.3, output: 1.2, cacheRead: 0.075 },
      advanced: { input: 0.27, output: 1.08, cacheRead: 0.0675 },
      premium: { input: 0.24, output: 0.96, cacheRead: 0.06 },
    },
    costPrice: { input: 0.18, output: 0.7, cacheRead: 0.045 },
    capabilities: ['Text Generation', 'Code Generation', 'Streaming'],
    status: 'maintenance',
    calls: 45000,
    rpm: 20000,
    tpm: 3000000,
  },
  {
    id: 'qwen3-235b-a22b',
    name: 'Qwen3-235B-A22B',
    provider: '华为云',
    description: '华为云部署的通义千问 Qwen3 系列 MoE 架构模型，235B 参数（22B 激活），兼顾性能与效率。',
    tags: ['MoE', '高效'],
    modality: 'Text',
    contextLength: 128000,
    maxOutput: 16384,
    pricing: {
      basic: { input: 1.5, output: 4.0, cacheRead: 0.375 },
      advanced: { input: 1.35, output: 3.6, cacheRead: 0.3375 },
      premium: { input: 1.2, output: 3.2, cacheRead: 0.3 },
    },
    costPrice: { input: 0.9, output: 2.5, cacheRead: 0.225 },
    capabilities: ['Text Generation', 'Function Calling', 'Streaming'],
    status: 'online',
    calls: 123000,
    rpm: 6000,
    tpm: 600000,
  },
  {
    id: 'qwen3-32b',
    name: 'Qwen3-32B',
    provider: '华为云',
    description: '华为云部署的通义千问 Qwen3 系列 32B 参数模型，在中文理解和生成方面表现优异。',
    tags: ['中文强', '均衡'],
    modality: 'Text',
    contextLength: 128000,
    maxOutput: 16384,
    pricing: {
      basic: { input: 0.5, output: 1.5, cacheRead: 0.125 },
      advanced: { input: 0.45, output: 1.35, cacheRead: 0.1125 },
      premium: { input: 0.4, output: 1.2, cacheRead: 0.1 },
    },
    costPrice: { input: 0.3, output: 0.9, cacheRead: 0.075 },
    capabilities: ['Text Generation', 'Function Calling', 'Streaming'],
    status: 'offline',
    calls: 78000,
    rpm: 4000,
    tpm: 400000,
  },
  {
    id: 'glm-5',
    name: 'GLM-5',
    provider: '华为云',
    description: '华为云部署的智谱 GLM-5 系列模型，在中文理解和生成方面表现卓越，支持多种复杂任务。',
    tags: ['中文强', '推荐'],
    modality: 'Text',
    contextLength: 128000,
    maxOutput: 16384,
    pricing: {
      basic: { input: 1.0, output: 3.0, cacheRead: 0.25 },
      advanced: { input: 0.9, output: 2.7, cacheRead: 0.225 },
      premium: { input: 0.8, output: 2.4, cacheRead: 0.2 },
    },
    costPrice: { input: 0.6, output: 1.8, cacheRead: 0.15 },
    capabilities: ['Text Generation', 'Function Calling', 'Streaming'],
    status: 'online',
    calls: 201000,
    rpm: 8000,
    tpm: 800000,
  },
  {
    id: 'kimi-k2-6',
    name: 'Kimi-K2.6',
    provider: '华为云',
    description: '华为云部署的月之暗面 Kimi K2.6 模型，支持超长上下文，在中文长文档处理和理解方面极具优势。',
    tags: ['超长上下文', '中文'],
    modality: 'Text + Vision',
    contextLength: 256000,
    maxOutput: 16384,
    pricing: {
      basic: { input: 0.5, output: 2.0, cacheRead: 0.125 },
      advanced: { input: 0.45, output: 1.8, cacheRead: 0.1125 },
      premium: { input: 0.4, output: 1.6, cacheRead: 0.1 },
    },
    costPrice: { input: 0.3, output: 1.2, cacheRead: 0.075 },
    capabilities: ['Text Generation', 'Vision', 'Function Calling', 'Streaming'],
    status: 'online',
    calls: 56000,
    rpm: 3000,
    tpm: 300000,
  },
  {
    id: 'qwen2-5-72b-huawei',
    name: 'Qwen2.5-72B',
    provider: '华为云',
    description: '华为云部署的通义千问 Qwen2.5 系列 72B 参数模型，中文理解和生成能力顶尖，支持长文本处理。',
    tags: ['中文强', '长文本'],
    modality: 'Text + Vision',
    contextLength: 128000,
    maxOutput: 8192,
    pricing: {
      basic: { input: 0.5, output: 1.0, cacheRead: 0.125 },
      advanced: { input: 0.45, output: 0.9, cacheRead: 0.1125 },
      premium: { input: 0.4, output: 0.8, cacheRead: 0.1 },
    },
    costPrice: { input: 0.3, output: 0.6, cacheRead: 0.075 },
    capabilities: ['Text Generation', 'Vision', 'Function Calling', 'Streaming'],
    status: 'online',
    calls: 145000,
    rpm: 7000,
    tpm: 700000,
  },
  {
    id: 'glm-5-1',
    name: 'GLM-5.1',
    provider: '华为云',
    description: '华为云部署的智谱 GLM-5.1 升级版模型，在 GLM-5 基础上进一步优化推理能力和响应质量。',
    tags: ['升级版', '推荐'],
    modality: 'Text',
    contextLength: 128000,
    maxOutput: 16384,
    pricing: {
      basic: { input: 1.2, output: 3.5, cacheRead: 0.3 },
      advanced: { input: 1.08, output: 3.15, cacheRead: 0.27 },
      premium: { input: 0.96, output: 2.8, cacheRead: 0.24 },
    },
    costPrice: { input: 0.72, output: 2.1, cacheRead: 0.18 },
    capabilities: ['Text Generation', 'Function Calling', 'Streaming'],
    status: 'online',
    calls: 92000,
    rpm: 5000,
    tpm: 500000,
  },
  {
    id: 'qwen3-coder-480b',
    name: 'Qwen3-Coder-480B',
    provider: '华为云',
    description: '华为云部署的通义千问 Qwen3 Coder 系列 480B 参数模型，专为代码生成和编程任务优化，代码能力业界领先。',
    tags: ['代码', '旗舰'],
    modality: 'Text',
    contextLength: 128000,
    maxOutput: 16384,
    pricing: {
      basic: { input: 2.0, output: 6.0, cacheRead: 0.5 },
      advanced: { input: 1.8, output: 5.4, cacheRead: 0.45 },
      premium: { input: 1.6, output: 4.8, cacheRead: 0.4 },
    },
    costPrice: { input: 1.2, output: 3.6, cacheRead: 0.3 },
    capabilities: ['Text Generation', 'Code Generation', 'Function Calling', 'Streaming'],
    status: 'online',
    calls: 34000,
    rpm: 2000,
    tpm: 200000,
  },
]);

const statusConfig: Record<
  string,
  {
    label: string;
    variant: 'default' | 'outline' | 'secondary' | 'destructive';
    icon: typeof CheckCircleIcon;
    class: string;
  }
> = {
  online: {
    label: '正常',
    variant: 'outline',
    icon: CheckCircleIcon,
    class: 'text-green-500',
  },
  maintenance: {
    label: '维护中',
    variant: 'outline',
    icon: ExclamationTriangleIcon,
    class: 'text-yellow-500',
  },
  offline: {
    label: '已下线',
    variant: 'secondary',
    icon: XCircleIcon,
    class: 'text-muted-foreground',
  },
};

const tierLabels: Record<string, string> = {
  basic: '基础版',
  advanced: '高级版',
  premium: '尊享版',
};

const tierBadgeClasses: Record<string, string> = {
  basic: 'bg-slate-100 text-slate-700',
  advanced: 'bg-indigo-100 text-indigo-700',
  premium: 'bg-amber-100 text-amber-700',
};

const providerColors: Record<string, string> = {
  火山引擎: 'bg-red-100 text-red-700',
  华为云: 'bg-blue-100 text-blue-700',
};

const searchQuery = ref('');
const selectedProvider = ref<string>('全部');
const detailOpen = ref(false);
const selectedModel = ref<ModelItem | null>(null);

const providers = computed(() => {
  const set = new Set(models.value.map((m) => m.provider));
  return Array.from(set);
});

const filteredModels = computed(() => {
  let result = models.value;
  if (selectedProvider.value !== '全部') {
    result = result.filter((m) => m.provider === selectedProvider.value);
  }
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase();
    result = result.filter((m) => m.name.toLowerCase().includes(q) || m.provider.toLowerCase().includes(q) || m.description.toLowerCase().includes(q) || m.tags.some((t) => t.toLowerCase().includes(q)));
  }
  return result;
});

function handleViewDetail(model: ModelItem) {
  selectedModel.value = model;
  detailOpen.value = true;
}

function toggleStatus(model: ModelItem) {
  if (model.status === 'online') {
    model.status = 'offline';
  } else if (model.status === 'offline') {
    model.status = 'online';
  } else {
    model.status = 'online';
  }
}

const stats = computed(() => ({
  total: models.value.length,
  online: models.value.filter((m) => m.status === 'online').length,
  maintenance: models.value.filter((m) => m.status === 'maintenance').length,
  totalCalls: models.value.reduce((acc, m) => acc + m.calls, 0),
}));

function formatPrice(price: number) {
  return `$${price.toFixed(4)}`;
}

function formatPriceShort(price: number) {
  return `$${price.toFixed(2)}`;
}

function formatContext(len: number) {
  if (len >= 10000) return `${(len / 1000).toFixed(0)}K`;
  return `${len}`;
}

function calcTierPrice(basic: number, ratio: number) {
  return Number((basic * ratio).toFixed(4));
}

// Create model dialog
const createOpen = ref(false);
const createTab = ref('basic');
const modalityOptions = ['Text', 'Text + Vision', 'Text + Vision + Audio', 'Audio', 'Embedding'];
const capabilityOptions = ['Text Generation', 'Vision', 'Function Calling', 'Streaming', 'Reasoning', 'Code Generation'];

const createForm = ref({
  id: '',
  name: '',
  provider: '',
  description: '',
  tags: [] as string[],
  modality: 'Text',
  contextLength: '',
  maxOutput: '',
  capabilities: [] as string[],
  status: 'offline',
  inputBasic: '',
  outputBasic: '',
  cacheReadBasic: '',
  inputCost: '',
  outputCost: '',
  cacheReadCost: '',
  rpm: '',
  tpm: '',
});

const tagInput = ref('');

function addTag() {
  const tag = tagInput.value.trim();
  if (tag && !createForm.value.tags.includes(tag)) {
    createForm.value.tags.push(tag);
  }
  tagInput.value = '';
}

function removeTag(tag: string) {
  createForm.value.tags = createForm.value.tags.filter((t) => t !== tag);
}

function toggleCapability(cap: string) {
  const idx = createForm.value.capabilities.indexOf(cap);
  if (idx >= 0) {
    createForm.value.capabilities.splice(idx, 1);
  } else {
    createForm.value.capabilities.push(cap);
  }
}

function openCreateDialog() {
  createForm.value = {
    id: '',
    name: '',
    provider: '',
    description: '',
    tags: [],
    modality: 'Text',
    contextLength: '',
    maxOutput: '',
    capabilities: [],
    status: 'offline',
    inputBasic: '',
    outputBasic: '',
    cacheReadBasic: '',
    inputCost: '',
    outputCost: '',
    cacheReadCost: '',
    rpm: '',
    tpm: '',
  };
  createTab.value = 'basic';
  createOpen.value = true;
}

function handleCreateModel() {
  const inputB = Number(createForm.value.inputBasic) || 0;
  const outputB = Number(createForm.value.outputBasic) || 0;
  const cacheB = Number(createForm.value.cacheReadBasic) || 0;
  const newModel: ModelItem = {
    id: createForm.value.id || `model-${Date.now()}`,
    name: createForm.value.name,
    provider: createForm.value.provider,
    description: createForm.value.description,
    tags: createForm.value.tags,
    modality: createForm.value.modality,
    contextLength: Number(createForm.value.contextLength) || 0,
    maxOutput: Number(createForm.value.maxOutput) || 0,
    capabilities: createForm.value.capabilities,
    status: createForm.value.status as 'online' | 'maintenance' | 'offline',
    pricing: {
      basic: { input: inputB, output: outputB, cacheRead: cacheB },
      advanced: { input: calcTierPrice(inputB, 0.9), output: calcTierPrice(outputB, 0.9), cacheRead: calcTierPrice(cacheB, 0.9) },
      premium: { input: calcTierPrice(inputB, 0.8), output: calcTierPrice(outputB, 0.8), cacheRead: calcTierPrice(cacheB, 0.8) },
    },
    costPrice: {
      input: Number(createForm.value.inputCost) || 0,
      output: Number(createForm.value.outputCost) || 0,
      cacheRead: Number(createForm.value.cacheReadCost) || 0,
    },
    calls: 0,
    rpm: Number(createForm.value.rpm) || 0,
    tpm: Number(createForm.value.tpm) || 0,
  };
  models.value.unshift(newModel);
  createOpen.value = false;
}

// Computed pricing display for create dialog
const computedAdvanced = computed(() => {
  const inputB = Number(createForm.value.inputBasic) || 0;
  const outputB = Number(createForm.value.outputBasic) || 0;
  const cacheB = Number(createForm.value.cacheReadBasic) || 0;
  return {
    input: calcTierPrice(inputB, 0.9),
    output: calcTierPrice(outputB, 0.9),
    cacheRead: calcTierPrice(cacheB, 0.9),
  };
});

const computedPremium = computed(() => {
  const inputB = Number(createForm.value.inputBasic) || 0;
  const outputB = Number(createForm.value.outputBasic) || 0;
  const cacheB = Number(createForm.value.cacheReadBasic) || 0;
  return {
    input: calcTierPrice(inputB, 0.8),
    output: calcTierPrice(outputB, 0.8),
    cacheRead: calcTierPrice(cacheB, 0.8),
  };
});
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-foreground text-2xl font-semibold">模型管理</h2>
      <p class="text-muted-foreground">管理平台接入的模型、分级定价与服务状态</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid gap-4 md:grid-cols-4">
      <Card>
        <CardHeader class="pb-2"><CardTitle class="text-muted-foreground text-sm font-medium">接入模型数</CardTitle></CardHeader>
        <CardContent
          ><div class="text-2xl font-bold">{{ stats.total }}</div></CardContent
        >
      </Card>
      <Card>
        <CardHeader class="pb-2"><CardTitle class="text-muted-foreground text-sm font-medium">正常服务</CardTitle></CardHeader>
        <CardContent
          ><div class="text-2xl font-bold text-green-600">{{ stats.online }}</div></CardContent
        >
      </Card>
      <Card>
        <CardHeader class="pb-2"><CardTitle class="text-muted-foreground text-sm font-medium">维护中</CardTitle></CardHeader>
        <CardContent
          ><div class="text-2xl font-bold text-yellow-600">{{ stats.maintenance }}</div></CardContent
        >
      </Card>
      <Card>
        <CardHeader class="pb-2"><CardTitle class="text-muted-foreground text-sm font-medium">本月调用量</CardTitle></CardHeader>
        <CardContent
          ><div class="text-2xl font-bold">{{ stats.totalCalls.toLocaleString() }}</div></CardContent
        >
      </Card>
    </div>

    <!-- Model Table Card -->
    <Card>
      <CardHeader>
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div class="flex items-center gap-2">
            <CpuChipIcon class="text-primary h-5 w-5" />
            <CardTitle>模型列表</CardTitle>
            <span class="text-muted-foreground text-sm font-normal">（共 {{ filteredModels.length }} 个）</span>
          </div>
          <div class="flex flex-wrap items-center gap-3">
            <div class="relative">
              <MagnifyingGlassIcon class="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
              <Input v-model="searchQuery" placeholder="搜索模型名称、提供商或标签..." class="w-56 pl-8" />
            </div>
            <div class="flex items-center gap-2">
              <Select v-model="selectedProvider">
                <SelectTrigger class="h-9 w-28 text-xs">
                  <SelectValue placeholder="全部提供方" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="全部">全部提供方</SelectItem>
                  <SelectItem v-for="p in providers" :key="p" :value="p">{{ p }}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button @click="openCreateDialog"><PlusIcon class="mr-1 h-4 w-4" />接入模型</Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div class="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>模型名称</TableHead>
                <TableHead>提供商</TableHead>
                <TableHead>标签</TableHead>
                <TableHead>模态</TableHead>
                <TableHead>上下文</TableHead>
                <TableHead>售价 Input</TableHead>
                <TableHead>售价 Output</TableHead>
                <TableHead>售价 Cache</TableHead>
                <TableHead>RPM</TableHead>
                <TableHead>状态</TableHead>
                <TableHead class="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="model in filteredModels" :key="model.id">
                <TableCell>
                  <div>
                    <div class="font-medium">{{ model.name }}</div>
                    <div class="text-muted-foreground font-mono text-xs">{{ model.id }}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <span :class="['inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium', providerColors[model.provider] || 'bg-muted text-muted-foreground']">
                    {{ model.provider }}
                  </span>
                </TableCell>
                <TableCell>
                  <div class="flex flex-wrap gap-1">
                    <Badge v-for="tag in model.tags" :key="tag" variant="secondary" class="text-[10px]">
                      {{ tag }}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell class="text-sm">{{ model.modality }}</TableCell>
                <TableCell class="text-sm">{{ formatContext(model.contextLength) }}</TableCell>
                <TableCell class="text-sm">{{ formatPriceShort(model.pricing.basic.input) }}/1M</TableCell>
                <TableCell class="text-sm">{{ formatPriceShort(model.pricing.basic.output) }}/1M</TableCell>
                <TableCell class="text-sm">{{ formatPriceShort(model.pricing.basic.cacheRead) }}/1M</TableCell>
                <TableCell class="text-sm">{{ model.rpm.toLocaleString() }}</TableCell>
                <TableCell>
                  <Badge :variant="statusConfig[model.status].variant" class="gap-1">
                    <component :is="statusConfig[model.status].icon" :class="['h-3 w-3', statusConfig[model.status].class]" />
                    {{ statusConfig[model.status].label }}
                  </Badge>
                </TableCell>
                <TableCell class="text-right">
                  <div class="flex justify-end gap-1">
                    <Button variant="ghost" size="sm" @click="handleViewDetail(model)"><EyeIcon class="mr-1 h-3 w-3" />详情</Button>
                    <Button variant="ghost" size="sm"><PencilSquareIcon class="mr-1 h-3 w-3" />编辑</Button>
                    <Button variant="ghost" size="sm" @click="toggleStatus(model)"><BoltIcon class="mr-1 h-3 w-3" />{{ model.status === 'online' ? '停用' : '启用' }}</Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>

    <!-- Price Legend -->
    <div class="border-border bg-muted/30 rounded-lg border p-5">
      <div class="text-foreground flex items-center gap-2 text-sm font-medium">
        <CurrencyDollarIcon class="h-4 w-4" />
        计费说明
      </div>
      <p class="text-muted-foreground mt-2 text-xs leading-relaxed">
        价格单位：每百万 Tokens（1M Tokens）。售价分基础版（标准价）、高级版（基础价 × 0.9）、尊享版（基础价 × 0.8）。Input 为输入价格，Output 为输出价格，Cache Read 为缓存读取价格。成本价为平台采购成本，仅后台可见。RPM（请求/分钟）、TPM（Tokens/分钟）为速率限制参数。
      </p>
    </div>

    <!-- Create Model Dialog -->
    <Dialog v-model:open="createOpen">
      <DialogContent class="max-w-lg">
        <DialogHeader>
          <DialogTitle>接入模型</DialogTitle>
          <DialogDescription>配置新模型的基本信息、分级定价与限流策略</DialogDescription>
        </DialogHeader>
        <Tabs v-model="createTab" class="w-full">
          <TabsList class="grid w-full grid-cols-3">
            <TabsTrigger value="basic">基础信息</TabsTrigger>
            <TabsTrigger value="pricing">定价与成本</TabsTrigger>
            <TabsTrigger value="limit">限流策略</TabsTrigger>
          </TabsList>

          <!-- Basic Info Tab -->
          <TabsContent value="basic" class="space-y-4 pt-2">
            <div class="space-y-2">
              <Label for="model-name">模型名称</Label>
              <Input id="model-name" v-model="createForm.name" placeholder="例如：GPT-4o" />
            </div>
            <div class="space-y-2">
              <Label for="model-id">模型ID</Label>
              <Input id="model-id" v-model="createForm.id" placeholder="留空将自动生成" />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-2">
                <Label for="model-provider">提供商</Label>
                <Input id="model-provider" v-model="createForm.provider" placeholder="例如：OpenAI" />
              </div>
              <div class="space-y-2">
                <Label for="model-modality">模态</Label>
                <Select v-model="createForm.modality">
                  <SelectTrigger class="w-full">
                    <SelectValue placeholder="选择模态" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem v-for="m in modalityOptions" :key="m" :value="m">{{ m }}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-2">
                <Label for="model-context">上下文长度（Tokens）</Label>
                <Input id="model-context" v-model="createForm.contextLength" type="number" placeholder="128000" />
              </div>
              <div class="space-y-2">
                <Label for="model-max-output">最大输出（Tokens）</Label>
                <Input id="model-max-output" v-model="createForm.maxOutput" type="number" placeholder="16384" />
              </div>
            </div>
            <div class="space-y-2">
              <Label for="model-desc">模型描述</Label>
              <Input id="model-desc" v-model="createForm.description" placeholder="简要描述模型能力..." />
            </div>
            <div class="space-y-2">
              <Label>标签</Label>
              <div class="flex gap-2">
                <Input v-model="tagInput" placeholder="输入标签后点击添加" class="flex-1" @keyup.enter="addTag" />
                <Button variant="outline" size="sm" @click="addTag">添加</Button>
              </div>
              <div v-if="createForm.tags.length > 0" class="flex flex-wrap gap-1 pt-1">
                <Badge v-for="tag in createForm.tags" :key="tag" variant="secondary" class="cursor-pointer gap-1">
                  {{ tag }}
                  <button @click="removeTag(tag)" class="hover:bg-muted-foreground/20 ml-0.5 rounded-full">
                    <XCircleIcon class="h-3 w-3" />
                  </button>
                </Badge>
              </div>
            </div>
            <div class="space-y-2">
              <Label>能力支持</Label>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="cap in capabilityOptions"
                  :key="cap"
                  @click="toggleCapability(cap)"
                  :class="['inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium transition-colors', createForm.capabilities.includes(cap) ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground hover:bg-accent']"
                >
                  <BoltIcon class="h-3 w-3" />
                  {{ cap }}
                </button>
              </div>
            </div>
            <div class="flex justify-end">
              <Button variant="outline" @click="createTab = 'pricing'">下一步 <ChevronRightIcon class="ml-1 h-4 w-4" /></Button>
            </div>
          </TabsContent>

          <!-- Pricing & Cost Tab -->
          <TabsContent value="pricing" class="space-y-4 pt-2">
            <!-- 基础版售价 - editable -->
            <div class="border-border bg-muted/20 rounded-lg border p-3">
              <div class="mb-3 flex items-center gap-2">
                <span :class="['rounded px-2 py-0.5 text-xs font-medium', tierBadgeClasses['basic']]">基础版</span>
                <span class="text-muted-foreground text-xs">标准售价（填写后自动计算高级/尊享版）</span>
              </div>
              <div class="grid grid-cols-3 gap-3">
                <div class="space-y-1.5">
                  <Label for="input-basic" class="text-xs">Input Price</Label>
                  <Input id="input-basic" v-model="createForm.inputBasic" type="number" step="0.0001" placeholder="0.0000" />
                </div>
                <div class="space-y-1.5">
                  <Label for="output-basic" class="text-xs">Output Price</Label>
                  <Input id="output-basic" v-model="createForm.outputBasic" type="number" step="0.0001" placeholder="0.0000" />
                </div>
                <div class="space-y-1.5">
                  <Label for="cache-basic" class="text-xs">Cache Read</Label>
                  <Input id="cache-basic" v-model="createForm.cacheReadBasic" type="number" step="0.0001" placeholder="0.0000" />
                </div>
              </div>
            </div>

            <!-- 高级版 - calculated display -->
            <div class="border-border bg-muted/20 rounded-lg border p-3">
              <div class="mb-3 flex items-center gap-2">
                <span :class="['rounded px-2 py-0.5 text-xs font-medium', tierBadgeClasses['advanced']]">高级版</span>
                <span class="text-muted-foreground text-xs">基础价 × 0.9</span>
              </div>
              <div class="grid grid-cols-3 gap-3">
                <div class="space-y-1.5">
                  <Label class="text-muted-foreground text-xs">Input Price</Label>
                  <p class="font-mono text-sm font-semibold">{{ formatPrice(computedAdvanced.input) }}</p>
                </div>
                <div class="space-y-1.5">
                  <Label class="text-muted-foreground text-xs">Output Price</Label>
                  <p class="font-mono text-sm font-semibold">{{ formatPrice(computedAdvanced.output) }}</p>
                </div>
                <div class="space-y-1.5">
                  <Label class="text-muted-foreground text-xs">Cache Read</Label>
                  <p class="font-mono text-sm font-semibold">{{ formatPrice(computedAdvanced.cacheRead) }}</p>
                </div>
              </div>
            </div>

            <!-- 尊享版 - calculated display -->
            <div class="border-border bg-muted/20 rounded-lg border p-3">
              <div class="mb-3 flex items-center gap-2">
                <span :class="['rounded px-2 py-0.5 text-xs font-medium', tierBadgeClasses['premium']]">尊享版</span>
                <span class="text-muted-foreground text-xs">基础价 × 0.8</span>
              </div>
              <div class="grid grid-cols-3 gap-3">
                <div class="space-y-1.5">
                  <Label class="text-muted-foreground text-xs">Input Price</Label>
                  <p class="font-mono text-sm font-semibold">{{ formatPrice(computedPremium.input) }}</p>
                </div>
                <div class="space-y-1.5">
                  <Label class="text-muted-foreground text-xs">Output Price</Label>
                  <p class="font-mono text-sm font-semibold">{{ formatPrice(computedPremium.output) }}</p>
                </div>
                <div class="space-y-1.5">
                  <Label class="text-muted-foreground text-xs">Cache Read</Label>
                  <p class="font-mono text-sm font-semibold">{{ formatPrice(computedPremium.cacheRead) }}</p>
                </div>
              </div>
            </div>

            <!-- 成本价 -->
            <div class="border-border rounded-lg border p-3">
              <div class="mb-3 flex items-center gap-2">
                <span class="rounded bg-rose-100 px-2 py-0.5 text-xs font-medium text-rose-700">成本价</span>
                <span class="text-muted-foreground text-xs">平台采购成本（仅后台可见）</span>
              </div>
              <div class="grid grid-cols-3 gap-3">
                <div class="space-y-1.5">
                  <Label for="input-cost" class="text-xs">Input Price</Label>
                  <Input id="input-cost" v-model="createForm.inputCost" type="number" step="0.0001" placeholder="0.0000" />
                </div>
                <div class="space-y-1.5">
                  <Label for="output-cost" class="text-xs">Output Price</Label>
                  <Input id="output-cost" v-model="createForm.outputCost" type="number" step="0.0001" placeholder="0.0000" />
                </div>
                <div class="space-y-1.5">
                  <Label for="cache-cost" class="text-xs">Cache Read</Label>
                  <Input id="cache-cost" v-model="createForm.cacheReadCost" type="number" step="0.0001" placeholder="0.0000" />
                </div>
              </div>
            </div>

            <div class="flex justify-between">
              <Button variant="outline" @click="createTab = 'basic'"><ChevronLeftIcon class="mr-1 h-4 w-4" />上一步</Button>
              <Button variant="outline" @click="createTab = 'limit'">下一步 <ChevronRightIcon class="ml-1 h-4 w-4" /></Button>
            </div>
          </TabsContent>

          <!-- Rate Limiting Tab -->
          <TabsContent value="limit" class="space-y-4 pt-2">
            <div class="space-y-2">
              <Label for="model-status">初始状态</Label>
              <Select v-model="createForm.status">
                <SelectTrigger class="w-full">
                  <SelectValue placeholder="选择状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="offline">下线</SelectItem>
                  <SelectItem value="online">上线</SelectItem>
                  <SelectItem value="maintenance">维护中</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-2">
                <Label for="model-rpm">RPM（请求/分钟）</Label>
                <Input id="model-rpm" v-model="createForm.rpm" type="number" placeholder="10000" />
              </div>
              <div class="space-y-2">
                <Label for="model-tpm">TPM（Tokens/分钟）</Label>
                <Input id="model-tpm" v-model="createForm.tpm" type="number" placeholder="1000000" />
              </div>
            </div>
            <div class="flex justify-between pt-2">
              <Button variant="outline" @click="createTab = 'pricing'"><ChevronLeftIcon class="mr-1 h-4 w-4" />上一步</Button>
              <Button @click="handleCreateModel">确认接入</Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>

    <!-- Detail Dialog -->
    <Dialog v-model:open="detailOpen">
      <DialogContent class="max-w-2xl">
        <DialogHeader>
          <div class="flex items-center gap-3">
            <div class="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
              <CpuChipIcon class="text-primary h-5 w-5" />
            </div>
            <div>
              <DialogTitle class="text-xl">{{ selectedModel?.name }}</DialogTitle>
              <DialogDescription class="flex items-center gap-2">
                <span :class="['inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium', selectedModel ? providerColors[selectedModel.provider] || 'bg-muted text-muted-foreground' : '']">
                  {{ selectedModel?.provider }}
                </span>
                <span class="text-muted-foreground text-xs">{{ selectedModel?.modality }}</span>
                <span class="text-muted-foreground font-mono text-xs">ID: {{ selectedModel?.id }}</span>
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div v-if="selectedModel" class="max-h-[60vh] space-y-6 overflow-y-auto py-2">
          <!-- Description -->
          <p class="text-foreground text-sm leading-relaxed">{{ selectedModel.description }}</p>

          <!-- Tags -->
          <div class="flex flex-wrap gap-2">
            <Badge v-for="tag in selectedModel.tags" :key="tag" variant="outline">{{ tag }}</Badge>
            <Badge :variant="statusConfig[selectedModel.status].variant" class="gap-1">
              <component :is="statusConfig[selectedModel.status].icon" :class="['h-3 w-3', statusConfig[selectedModel.status].class]" />
              {{ statusConfig[selectedModel.status].label }}
            </Badge>
          </div>

          <!-- Specs Grid -->
          <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div class="border-border bg-muted/30 rounded-lg border p-3">
              <div class="text-muted-foreground flex items-center gap-1.5 text-xs">
                <RectangleStackIcon class="h-3.5 w-3.5" />
                上下文长度
              </div>
              <p class="text-foreground mt-1 text-sm font-semibold">{{ selectedModel.contextLength.toLocaleString() }} Tokens</p>
            </div>
            <div class="border-border bg-muted/30 rounded-lg border p-3">
              <div class="text-muted-foreground flex items-center gap-1.5 text-xs">
                <HashtagIcon class="h-3.5 w-3.5" />
                最大输出
              </div>
              <p class="text-foreground mt-1 text-sm font-semibold">{{ selectedModel.maxOutput.toLocaleString() }} Tokens</p>
            </div>
            <div class="border-border bg-muted/30 rounded-lg border p-3">
              <div class="text-muted-foreground flex items-center gap-1.5 text-xs">
                <GlobeAltIcon class="h-3.5 w-3.5" />
                模态
              </div>
              <p class="text-foreground mt-1 text-sm font-semibold">{{ selectedModel.modality }}</p>
            </div>
            <div class="border-border bg-muted/30 rounded-lg border p-3">
              <div class="text-muted-foreground flex items-center gap-1.5 text-xs">
                <BoltIcon class="h-3.5 w-3.5" />
                本月调用
              </div>
              <p class="text-foreground mt-1 text-sm font-semibold">{{ selectedModel.calls.toLocaleString() }}</p>
            </div>
          </div>

          <!-- Tiered Pricing -->
          <div class="space-y-3">
            <h4 class="text-foreground text-sm font-semibold">分级售价（每 1M Tokens）</h4>
            <div class="grid grid-cols-3 gap-3">
              <div class="border-border rounded-lg border p-3">
                <div class="mb-2 flex items-center justify-between">
                  <span :class="['rounded px-2 py-0.5 text-xs font-medium', tierBadgeClasses['basic']]">基础版</span>
                  <Badge variant="secondary" class="text-[10px]">标准价</Badge>
                </div>
                <div class="space-y-1">
                  <div class="flex items-center justify-between">
                    <span class="text-muted-foreground text-[10px]">Input</span>
                    <span class="text-foreground font-mono text-sm font-semibold">{{ formatPrice(selectedModel.pricing.basic.input) }}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-muted-foreground text-[10px]">Output</span>
                    <span class="text-foreground font-mono text-sm font-semibold">{{ formatPrice(selectedModel.pricing.basic.output) }}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-muted-foreground text-[10px]">Cache</span>
                    <span class="text-foreground font-mono text-sm font-semibold">{{ formatPrice(selectedModel.pricing.basic.cacheRead) }}</span>
                  </div>
                </div>
              </div>
              <div class="border-border rounded-lg border p-3">
                <div class="mb-2 flex items-center justify-between">
                  <span :class="['rounded px-2 py-0.5 text-xs font-medium', tierBadgeClasses['advanced']]">高级版</span>
                  <Badge variant="secondary" class="text-[10px]">×0.9</Badge>
                </div>
                <div class="space-y-1">
                  <div class="flex items-center justify-between">
                    <span class="text-muted-foreground text-[10px]">Input</span>
                    <span class="text-foreground font-mono text-sm font-semibold">{{ formatPrice(selectedModel.pricing.advanced.input) }}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-muted-foreground text-[10px]">Output</span>
                    <span class="text-foreground font-mono text-sm font-semibold">{{ formatPrice(selectedModel.pricing.advanced.output) }}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-muted-foreground text-[10px]">Cache</span>
                    <span class="text-foreground font-mono text-sm font-semibold">{{ formatPrice(selectedModel.pricing.advanced.cacheRead) }}</span>
                  </div>
                </div>
              </div>
              <div class="border-border rounded-lg border p-3">
                <div class="mb-2 flex items-center justify-between">
                  <span :class="['rounded px-2 py-0.5 text-xs font-medium', tierBadgeClasses['premium']]">尊享版</span>
                  <Badge variant="secondary" class="text-[10px]">×0.8</Badge>
                </div>
                <div class="space-y-1">
                  <div class="flex items-center justify-between">
                    <span class="text-muted-foreground text-[10px]">Input</span>
                    <span class="text-foreground font-mono text-sm font-semibold">{{ formatPrice(selectedModel.pricing.premium.input) }}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-muted-foreground text-[10px]">Output</span>
                    <span class="text-foreground font-mono text-sm font-semibold">{{ formatPrice(selectedModel.pricing.premium.output) }}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-muted-foreground text-[10px]">Cache</span>
                    <span class="text-foreground font-mono text-sm font-semibold">{{ formatPrice(selectedModel.pricing.premium.cacheRead) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Cost Price -->
          <div class="space-y-3">
            <h4 class="text-foreground text-sm font-semibold">成本价格（每 1M Tokens）</h4>
            <div class="border-border rounded-lg border bg-rose-50/50 p-4">
              <div class="grid grid-cols-3 gap-4">
                <div>
                  <div class="text-muted-foreground text-xs">Input Price</div>
                  <p class="text-foreground mt-1 font-mono text-sm font-semibold">{{ formatPrice(selectedModel.costPrice.input) }}</p>
                </div>
                <div>
                  <div class="text-muted-foreground text-xs">Output Price</div>
                  <p class="text-foreground mt-1 font-mono text-sm font-semibold">{{ formatPrice(selectedModel.costPrice.output) }}</p>
                </div>
                <div>
                  <div class="text-muted-foreground text-xs">Cache Read</div>
                  <p class="text-foreground mt-1 font-mono text-sm font-semibold">{{ formatPrice(selectedModel.costPrice.cacheRead) }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Capabilities -->
          <div class="space-y-3">
            <h4 class="text-foreground text-sm font-semibold">能力支持</h4>
            <div class="flex flex-wrap gap-2">
              <span v-for="cap in selectedModel.capabilities" :key="cap" class="bg-primary/10 text-primary inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium">
                <BoltIcon class="h-3 w-3" />
                {{ cap }}
              </span>
            </div>
          </div>

          <!-- Rate Limiting -->
          <div class="space-y-3">
            <h4 class="text-foreground text-sm font-semibold">限流配置</h4>
            <div class="grid grid-cols-2 gap-4">
              <div class="border-border bg-muted/30 rounded-lg border p-3">
                <div class="text-muted-foreground text-xs">RPM（请求/分钟）</div>
                <p class="text-foreground mt-1 text-sm font-semibold">{{ selectedModel.rpm.toLocaleString() }}</p>
              </div>
              <div class="border-border bg-muted/30 rounded-lg border p-3">
                <div class="text-muted-foreground text-xs">TPM（Tokens/分钟）</div>
                <p class="text-foreground mt-1 text-sm font-semibold">{{ selectedModel.tpm.toLocaleString() }}</p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter class="sm:gap-0 md:gap-2">
          <Button variant="outline" @click="detailOpen = false">关闭</Button>
          <Button variant="outline"><PencilSquareIcon class="mr-1 h-4 w-4" />编辑模型</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
<!-- [AI_END LINES=475 TIMESTAMP=2025-07-18 12:30:00] -->

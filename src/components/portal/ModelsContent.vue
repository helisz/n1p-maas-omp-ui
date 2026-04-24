<!-- [AI_START TIMESTAMP=2025-06-20 06:40:00] -->
<script setup lang="ts">
import { ref, computed } from "vue";
import Card from "@/components/ui/Card.vue";
import CardHeader from "@/components/ui/CardHeader.vue";
import CardTitle from "@/components/ui/CardTitle.vue";
import CardDescription from "@/components/ui/CardDescription.vue";
import CardContent from "@/components/ui/CardContent.vue";
import Button from "@/components/ui/Button.vue";
import Badge from "@/components/ui/Badge.vue";
import Input from "@/components/ui/Input.vue";
import Label from "@/components/ui/Label.vue";
import Table from "@/components/ui/Table.vue";
import TableHeader from "@/components/ui/TableHeader.vue";
import TableBody from "@/components/ui/TableBody.vue";
import TableRow from "@/components/ui/TableRow.vue";
import TableHead from "@/components/ui/TableHead.vue";
import TableCell from "@/components/ui/TableCell.vue";
import Dialog from "@/components/ui/Dialog.vue";
import DialogContent from "@/components/ui/DialogContent.vue";
import DialogHeader from "@/components/ui/DialogHeader.vue";
import DialogTitle from "@/components/ui/DialogTitle.vue";
import DialogDescription from "@/components/ui/DialogDescription.vue";
import DialogFooter from "@/components/ui/DialogFooter.vue";
import Select from "@/components/ui/select/Select.vue";
import SelectValue from "@/components/ui/select/SelectValue.vue";
import SelectTrigger from "@/components/ui/select/SelectTrigger.vue";
import SelectContent from "@/components/ui/select/SelectContent.vue";
import SelectItem from "@/components/ui/select/SelectItem.vue";
import Tabs from "@/components/ui/Tabs.vue";
import TabsList from "@/components/ui/TabsList.vue";
import TabsTrigger from "@/components/ui/TabsTrigger.vue";
import TabsContent from "@/components/ui/TabsContent.vue";
import {
  Search,
  Brain,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Eye,
  Edit,
  Power,
  Plus,
  ChevronRight,
  ChevronLeft,
} from "lucide-vue-next";

interface ModelItem {
  id: string;
  name: string;
  provider: string;
  modality: string;
  contextLength: number;
  status: "online" | "maintenance" | "offline";
  promptPrice: number;
  completionPrice: number;
  calls: number;
  description?: string;
  rpm?: number;
  tpm?: number;
}

const models = ref<ModelItem[]>([
  {
    id: "gpt-4o",
    name: "GPT-4o",
    provider: "OpenAI",
    modality: "Text + Vision",
    contextLength: 128000,
    status: "online",
    promptPrice: 2.5,
    completionPrice: 10.0,
    calls: 456000,
    description: "OpenAI 旗舰多模态模型",
    rpm: 10000,
    tpm: 1000000,
  },
  {
    id: "gpt-4o-mini",
    name: "GPT-4o Mini",
    provider: "OpenAI",
    modality: "Text + Vision",
    contextLength: 128000,
    status: "online",
    promptPrice: 0.15,
    completionPrice: 0.6,
    calls: 234000,
    description: "高性价比轻量级模型",
    rpm: 30000,
    tpm: 2000000,
  },
  {
    id: "claude-3-5-sonnet",
    name: "Claude 3.5 Sonnet",
    provider: "Anthropic",
    modality: "Text + Vision",
    contextLength: 200000,
    status: "online",
    promptPrice: 3.0,
    completionPrice: 15.0,
    calls: 189000,
    description: "Anthropic 高级推理模型",
    rpm: 8000,
    tpm: 800000,
  },
  {
    id: "deepseek-chat",
    name: "DeepSeek V3",
    provider: "DeepSeek",
    modality: "Text",
    contextLength: 64000,
    status: "maintenance",
    promptPrice: 0.1,
    completionPrice: 0.5,
    calls: 98000,
    description: "国产高性价比大模型",
    rpm: 20000,
    tpm: 5000000,
  },
  {
    id: "gemini-1-5-pro",
    name: "Gemini 1.5 Pro",
    provider: "Google",
    modality: "Text + Vision + Audio",
    contextLength: 2000000,
    status: "online",
    promptPrice: 3.5,
    completionPrice: 10.5,
    calls: 67000,
    description: "Google 长上下文多模态模型",
    rpm: 3600,
    tpm: 4000000,
  },
]);

const statusConfig: Record<
  string,
  {
    label: string;
    variant: "default" | "outline" | "secondary" | "destructive";
    icon: typeof CheckCircle2;
    class: string;
  }
> = {
  online: {
    label: "正常",
    variant: "outline",
    icon: CheckCircle2,
    class: "text-green-500",
  },
  maintenance: {
    label: "维护中",
    variant: "outline",
    icon: AlertTriangle,
    class: "text-yellow-500",
  },
  offline: {
    label: "已下线",
    variant: "secondary",
    icon: XCircle,
    class: "text-muted-foreground",
  },
};

const searchQuery = ref("");
const detailOpen = ref(false);
const selectedModel = ref<ModelItem | null>(null);

const filteredModels = computed(() =>
  models.value.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      m.provider.toLowerCase().includes(searchQuery.value.toLowerCase()),
  ),
);

function handleViewDetail(model: ModelItem) {
  selectedModel.value = model;
  detailOpen.value = true;
}

const stats = computed(() => ({
  total: models.value.length,
  online: models.value.filter((m) => m.status === "online").length,
  maintenance: models.value.filter((m) => m.status === "maintenance").length,
  totalCalls: models.value.reduce((acc, m) => acc + m.calls, 0),
}));

// Create model dialog
const createOpen = ref(false);
const createTab = ref("basic");
const createForm = ref({
  id: "",
  name: "",
  provider: "",
  modality: "Text",
  contextLength: "",
  status: "offline",
  promptPrice: "",
  completionPrice: "",
  description: "",
  rpm: "",
  tpm: "",
});
const modalityOptions = [
  "Text",
  "Text + Vision",
  "Text + Vision + Audio",
  "Audio",
  "Embedding",
];

function openCreateDialog() {
  createForm.value = {
    id: "",
    name: "",
    provider: "",
    modality: "Text",
    contextLength: "",
    status: "offline",
    promptPrice: "",
    completionPrice: "",
    description: "",
    rpm: "",
    tpm: "",
  };
  createTab.value = "basic";
  createOpen.value = true;
}

function handleCreateModel() {
  const newModel: ModelItem = {
    id: createForm.value.id || `model-${Date.now()}`,
    name: createForm.value.name,
    provider: createForm.value.provider,
    modality: createForm.value.modality,
    contextLength: Number(createForm.value.contextLength) || 0,
    status: createForm.value.status as "online" | "maintenance" | "offline",
    promptPrice: Number(createForm.value.promptPrice) || 0,
    completionPrice: Number(createForm.value.completionPrice) || 0,
    calls: 0,
    description: createForm.value.description,
    rpm: Number(createForm.value.rpm) || 0,
    tpm: Number(createForm.value.tpm) || 0,
  };
  models.value.unshift(newModel);
  createOpen.value = false;
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-2xl font-semibold text-foreground">模型管理</h2>
      <p class="text-muted-foreground">管理平台接入的模型、定价与服务状态</p>
    </div>

    <div class="grid gap-4 md:grid-cols-4">
      <Card>
        <CardHeader class="pb-2"
          ><CardTitle class="text-sm font-medium text-muted-foreground"
            >接入模型数</CardTitle
          ></CardHeader
        >
        <CardContent
          ><div class="text-2xl font-bold">{{ stats.total }}</div></CardContent
        >
      </Card>
      <Card>
        <CardHeader class="pb-2"
          ><CardTitle class="text-sm font-medium text-muted-foreground"
            >正常服务</CardTitle
          ></CardHeader
        >
        <CardContent
          ><div class="text-2xl font-bold text-green-600">
            {{ stats.online }}
          </div></CardContent
        >
      </Card>
      <Card>
        <CardHeader class="pb-2"
          ><CardTitle class="text-sm font-medium text-muted-foreground"
            >维护中</CardTitle
          ></CardHeader
        >
        <CardContent
          ><div class="text-2xl font-bold text-yellow-600">
            {{ stats.maintenance }}
          </div></CardContent
        >
      </Card>
      <Card>
        <CardHeader class="pb-2"
          ><CardTitle class="text-sm font-medium text-muted-foreground"
            >本月调用量</CardTitle
          ></CardHeader
        >
        <CardContent
          ><div class="text-2xl font-bold">
            {{ stats.totalCalls.toLocaleString() }}
          </div></CardContent
        >
      </Card>
    </div>

    <Card>
      <CardHeader>
        <div class="flex items-center justify-between">
          <CardTitle>模型列表</CardTitle>
          <div class="flex items-center gap-3">
            <div class="relative">
              <Search
                class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
              />
              <Input
                v-model="searchQuery"
                placeholder="搜索模型..."
                class="w-64 pl-8"
              />
            </div>
            <Button @click="openCreateDialog"
              ><Plus class="mr-1 h-4 w-4" />接入模型</Button
            >
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>模型名称</TableHead>
              <TableHead>提供商</TableHead>
              <TableHead>模态</TableHead>
              <TableHead>上下文长度</TableHead>
              <TableHead>Prompt单价</TableHead>
              <TableHead>Completion单价</TableHead>
              <TableHead>状态</TableHead>
              <TableHead class="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="model in filteredModels" :key="model.id">
              <TableCell class="font-medium">{{ model.name }}</TableCell>
              <TableCell>{{ model.provider }}</TableCell>
              <TableCell>{{ model.modality }}</TableCell>
              <TableCell
                >{{ model.contextLength.toLocaleString() }} Tokens</TableCell
              >
              <TableCell>${{ model.promptPrice }}/1M</TableCell>
              <TableCell>${{ model.completionPrice }}/1M</TableCell>
              <TableCell>
                <Badge
                  :variant="statusConfig[model.status].variant"
                  class="gap-1"
                >
                  <component
                    :is="statusConfig[model.status].icon"
                    :class="['h-3 w-3', statusConfig[model.status].class]"
                  />
                  {{ statusConfig[model.status].label }}
                </Badge>
              </TableCell>
              <TableCell class="text-right">
                <div class="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    @click="handleViewDetail(model)"
                    ><Eye class="mr-1 h-3 w-3" />详情</Button
                  >
                  <Button variant="ghost" size="sm"
                    ><Edit class="mr-1 h-3 w-3" />编辑</Button
                  >
                  <Button variant="ghost" size="sm"
                    ><Power class="mr-1 h-3 w-3" />{{
                      model.status === "online" ? "停用" : "启用"
                    }}</Button
                  >
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>

    <!-- Create Model Dialog -->
    <Dialog v-model:open="createOpen">
      <DialogContent class="max-w-lg">
        <DialogHeader>
          <DialogTitle>接入模型</DialogTitle>
          <DialogDescription
            >配置新模型的基本信息、定价与限流策略</DialogDescription
          >
        </DialogHeader>
        <Tabs v-model="createTab" class="w-full">
          <TabsList class="grid w-full grid-cols-2">
            <TabsTrigger value="basic">基础信息</TabsTrigger>
            <TabsTrigger value="pricing">定价与限流</TabsTrigger>
          </TabsList>
          <TabsContent value="basic" class="space-y-4 pt-2">
            <div class="space-y-2">
              <Label for="model-name">模型名称</Label>
              <Input
                id="model-name"
                v-model="createForm.name"
                placeholder="例如：GPT-4o"
              />
            </div>
            <div class="space-y-2">
              <Label for="model-id">模型ID</Label>
              <Input
                id="model-id"
                v-model="createForm.id"
                placeholder="留空将自动生成"
              />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-2">
                <Label for="model-provider">提供商</Label>
                <Input
                  id="model-provider"
                  v-model="createForm.provider"
                  placeholder="例如：OpenAI"
                />
              </div>
              <div class="space-y-2">
                <Label for="model-modality">模态</Label>
                <Select v-model="createForm.modality">
                  <SelectTrigger class="w-full">
                    <SelectValue placeholder="选择模态" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      v-for="m in modalityOptions"
                      :key="m"
                      :value="m"
                      >{{ m }}</SelectItem
                    >
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div class="space-y-2">
              <Label for="model-context">上下文长度（Tokens）</Label>
              <Input
                id="model-context"
                v-model="createForm.contextLength"
                type="number"
                placeholder="128000"
              />
            </div>
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
            <div class="space-y-2">
              <Label for="model-desc">模型描述</Label>
              <Input
                id="model-desc"
                v-model="createForm.description"
                placeholder="简要描述模型能力..."
              />
            </div>
            <div class="flex justify-end">
              <Button variant="outline" @click="createTab = 'pricing'"
                >下一步 <ChevronRight class="ml-1 h-4 w-4"
              /></Button>
            </div>
          </TabsContent>
          <TabsContent value="pricing" class="space-y-4 pt-2">
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-2">
                <Label for="model-prompt">Prompt单价（$/1M Tokens）</Label>
                <Input
                  id="model-prompt"
                  v-model="createForm.promptPrice"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                />
              </div>
              <div class="space-y-2">
                <Label for="model-completion"
                  >Completion单价（$/1M Tokens）</Label
                >
                <Input
                  id="model-completion"
                  v-model="createForm.completionPrice"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                />
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-2">
                <Label for="model-rpm">RPM（请求/分钟）</Label>
                <Input
                  id="model-rpm"
                  v-model="createForm.rpm"
                  type="number"
                  placeholder="10000"
                />
              </div>
              <div class="space-y-2">
                <Label for="model-tpm">TPM（Tokens/分钟）</Label>
                <Input
                  id="model-tpm"
                  v-model="createForm.tpm"
                  type="number"
                  placeholder="1000000"
                />
              </div>
            </div>
            <div class="flex justify-between">
              <Button variant="outline" @click="createTab = 'basic'"
                ><ChevronLeft class="mr-1 h-4 w-4" />上一步</Button
              >
              <Button @click="handleCreateModel">确认接入</Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>

    <Dialog v-model:open="detailOpen">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>模型详情</DialogTitle>
          <DialogDescription>查看模型详细配置与定价</DialogDescription>
        </DialogHeader>
        <div v-if="selectedModel" class="space-y-3">
          <div class="flex justify-between">
            <span class="text-muted-foreground">模型名称</span
            ><span class="font-medium">{{ selectedModel.name }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-muted-foreground">模型ID</span
            ><span class="font-mono">{{ selectedModel.id }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-muted-foreground">提供商</span
            ><span>{{ selectedModel.provider }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-muted-foreground">模态</span
            ><span>{{ selectedModel.modality }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-muted-foreground">上下文长度</span
            ><span
              >{{ selectedModel.contextLength.toLocaleString() }} Tokens</span
            >
          </div>
          <div class="flex justify-between">
            <span class="text-muted-foreground">Prompt单价</span
            ><span>${{ selectedModel.promptPrice }}/1M Tokens</span>
          </div>
          <div class="flex justify-between">
            <span class="text-muted-foreground">Completion单价</span
            ><span>${{ selectedModel.completionPrice }}/1M Tokens</span>
          </div>
          <div class="flex justify-between">
            <span class="text-muted-foreground">状态</span>
            <Badge
              :variant="statusConfig[selectedModel.status].variant"
              class="gap-1"
            >
              <component
                :is="statusConfig[selectedModel.status].icon"
                :class="['h-3 w-3', statusConfig[selectedModel.status].class]"
              />
              {{ statusConfig[selectedModel.status].label }}
            </Badge>
          </div>
          <div class="flex justify-between">
            <span class="text-muted-foreground">本月调用量</span
            ><span>{{ selectedModel.calls.toLocaleString() }}</span>
          </div>
          <div v-if="selectedModel.description" class="flex justify-between">
            <span class="text-muted-foreground">描述</span
            ><span class="max-w-[200px] text-right">{{
              selectedModel.description
            }}</span>
          </div>
          <div v-if="selectedModel.rpm" class="flex justify-between">
            <span class="text-muted-foreground">RPM</span
            ><span>{{ selectedModel.rpm.toLocaleString() }}</span>
          </div>
          <div v-if="selectedModel.tpm" class="flex justify-between">
            <span class="text-muted-foreground">TPM</span
            ><span>{{ selectedModel.tpm.toLocaleString() }}</span>
          </div>
        </div>
        <DialogFooter
          ><Button variant="outline" @click="detailOpen = false"
            >关闭</Button
          ></DialogFooter
        >
      </DialogContent>
    </Dialog>
  </div>
</template>
<!-- [AI_END LINES=130 TIMESTAMP=2025-06-20 06:40:00] -->

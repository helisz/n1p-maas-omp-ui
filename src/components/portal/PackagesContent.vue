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
  Package,
  CheckCircle2,
  XCircle,
  Eye,
  Edit,
  Power,
  Plus,
  ChevronRight,
  ChevronLeft,
  Layers,
} from "lucide-vue-next";

interface PackageItem {
  id: string;
  name: string;
  type: string;
  price: number;
  status: "online" | "offline";
  createdAt: string;
  orders: number;
  revenue: number;
  description?: string;
  quota?: number;
  models?: string[];
}

const packages = ref<PackageItem[]>([
  {
    id: "pkg-basic",
    name: "基础版",
    type: "按月",
    price: 1999,
    status: "online",
    createdAt: "2024-01-15",
    orders: 45,
    revenue: 89955,
    description: "适合初创团队的基础套餐",
    quota: 10000,
    models: ["GPT-3.5", "Embedding"],
  },
  {
    id: "pkg-advanced",
    name: "高级版",
    type: "按月",
    price: 5999,
    status: "online",
    createdAt: "2024-01-15",
    orders: 32,
    revenue: 191968,
    description: "包含更多模型与更高配额",
    quota: 50000,
    models: ["GPT-4", "GPT-3.5", "Embedding", "DALL-E"],
  },
  {
    id: "pkg-premium",
    name: "尊享版",
    type: "按月",
    price: 19999,
    status: "online",
    createdAt: "2024-01-15",
    orders: 12,
    revenue: 239988,
    description: "企业级全功能套餐",
    quota: 200000,
    models: ["GPT-4", "GPT-3.5", "Embedding", "DALL-E", "Whisper"],
  },
  {
    id: "pkg-annual",
    name: "企业年包",
    type: "按年",
    price: 59999,
    status: "offline",
    createdAt: "2024-02-01",
    orders: 3,
    revenue: 179997,
    description: "年度付费专享优惠",
    quota: 1000000,
    models: ["全部模型"],
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
    label: "已上线",
    variant: "outline",
    icon: CheckCircle2,
    class: "text-green-500",
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
const selectedPackage = ref<PackageItem | null>(null);

const filteredPackages = computed(() =>
  packages.value.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.value.toLowerCase()),
  ),
);

function handleViewDetail(pkg: PackageItem) {
  selectedPackage.value = pkg;
  detailOpen.value = true;
}

const stats = computed(() => ({
  total: packages.value.length,
  online: packages.value.filter((p) => p.status === "online").length,
  totalOrders: packages.value.reduce((acc, p) => acc + p.orders, 0),
  totalRevenue: packages.value.reduce((acc, p) => acc + p.revenue, 0),
}));

// Create package dialog
const createOpen = ref(false);
const createTab = ref("basic");
const createForm = ref({
  id: "",
  name: "",
  type: "按月",
  price: "",
  status: "offline",
  description: "",
  quota: "10000",
  models: [] as string[],
});
const availableModels = [
  "GPT-3.5",
  "GPT-4",
  "GPT-4o",
  "Embedding",
  "DALL-E",
  "Whisper",
  "Claude 3",
];

function openCreateDialog() {
  createForm.value = {
    id: "",
    name: "",
    type: "按月",
    price: "",
    status: "offline",
    description: "",
    quota: "10000",
    models: [],
  };
  createTab.value = "basic";
  createOpen.value = true;
}

function handleCreatePackage() {
  const newPkg: PackageItem = {
    id: createForm.value.id || `pkg-${Date.now()}`,
    name: createForm.value.name,
    type: createForm.value.type,
    price: Number(createForm.value.price) || 0,
    status: createForm.value.status as "online" | "offline",
    createdAt: new Date().toISOString().slice(0, 10),
    orders: 0,
    revenue: 0,
    description: createForm.value.description,
    quota: Number(createForm.value.quota) || 0,
    models: createForm.value.models.length
      ? createForm.value.models
      : ["GPT-3.5"],
  };
  packages.value.unshift(newPkg);
  createOpen.value = false;
}

function toggleModel(model: string) {
  const idx = createForm.value.models.indexOf(model);
  if (idx > -1) {
    createForm.value.models.splice(idx, 1);
  } else {
    createForm.value.models.push(model);
  }
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-2xl font-semibold text-foreground">套餐管理</h2>
      <p class="text-muted-foreground">
        管理平台服务套餐的定价、状态与销售数据
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-4">
      <Card>
        <CardHeader class="pb-2"
          ><CardTitle class="text-sm font-medium text-muted-foreground"
            >套餐总数</CardTitle
          ></CardHeader
        >
        <CardContent
          ><div class="text-2xl font-bold">{{ stats.total }}</div></CardContent
        >
      </Card>
      <Card>
        <CardHeader class="pb-2"
          ><CardTitle class="text-sm font-medium text-muted-foreground"
            >已上线</CardTitle
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
            >累计订购</CardTitle
          ></CardHeader
        >
        <CardContent
          ><div class="text-2xl font-bold">
            {{ stats.totalOrders }}
          </div></CardContent
        >
      </Card>
      <Card>
        <CardHeader class="pb-2"
          ><CardTitle class="text-sm font-medium text-muted-foreground"
            >累计收入</CardTitle
          ></CardHeader
        >
        <CardContent
          ><div class="text-2xl font-bold">
            ¥{{ stats.totalRevenue.toLocaleString() }}
          </div></CardContent
        >
      </Card>
    </div>

    <Card>
      <CardHeader>
        <div class="flex items-center justify-between">
          <CardTitle>套餐列表</CardTitle>
          <div class="flex items-center gap-3">
            <div class="relative">
              <Search
                class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
              />
              <Input
                v-model="searchQuery"
                placeholder="搜索套餐..."
                class="w-64 pl-8"
              />
            </div>
            <Button @click="openCreateDialog"
              ><Plus class="mr-1 h-4 w-4" />创建套餐</Button
            >
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>套餐名称</TableHead>
              <TableHead>计费类型</TableHead>
              <TableHead>价格</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>创建时间</TableHead>
              <TableHead>订购量</TableHead>
              <TableHead>收入贡献</TableHead>
              <TableHead class="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="pkg in filteredPackages" :key="pkg.id">
              <TableCell class="font-medium">{{ pkg.name }}</TableCell>
              <TableCell>{{ pkg.type }}</TableCell>
              <TableCell
                >¥{{ pkg.price.toLocaleString() }}/{{
                  pkg.type === "按年" ? "年" : "月"
                }}</TableCell
              >
              <TableCell>
                <Badge
                  :variant="statusConfig[pkg.status].variant"
                  class="gap-1"
                >
                  <component
                    :is="statusConfig[pkg.status].icon"
                    :class="['h-3 w-3', statusConfig[pkg.status].class]"
                  />
                  {{ statusConfig[pkg.status].label }}
                </Badge>
              </TableCell>
              <TableCell class="text-muted-foreground">{{
                pkg.createdAt
              }}</TableCell>
              <TableCell>{{ pkg.orders }}</TableCell>
              <TableCell>¥{{ pkg.revenue.toLocaleString() }}</TableCell>
              <TableCell class="text-right">
                <div class="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    @click="handleViewDetail(pkg)"
                    ><Eye class="mr-1 h-3 w-3" />详情</Button
                  >
                  <Button variant="ghost" size="sm"
                    ><Edit class="mr-1 h-3 w-3" />编辑</Button
                  >
                  <Button variant="ghost" size="sm"
                    ><Power class="mr-1 h-3 w-3" />{{
                      pkg.status === "online" ? "下线" : "上线"
                    }}</Button
                  >
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>

    <!-- Create Package Dialog -->
    <Dialog v-model:open="createOpen">
      <DialogContent class="max-w-lg">
        <DialogHeader>
          <DialogTitle>创建套餐</DialogTitle>
          <DialogDescription
            >填写套餐基本信息并配置可用模型与配额</DialogDescription
          >
        </DialogHeader>
        <Tabs v-model="createTab" class="w-full">
          <TabsList class="grid w-full grid-cols-2">
            <TabsTrigger value="basic">基本信息</TabsTrigger>
            <TabsTrigger value="config">套餐配置</TabsTrigger>
          </TabsList>
          <TabsContent value="basic" class="space-y-4 pt-2">
            <div class="space-y-2">
              <Label for="pkg-name">套餐名称</Label>
              <Input
                id="pkg-name"
                v-model="createForm.name"
                placeholder="例如：专业版"
              />
            </div>
            <div class="space-y-2">
              <Label for="pkg-id">套餐ID</Label>
              <Input
                id="pkg-id"
                v-model="createForm.id"
                placeholder="留空将自动生成"
              />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-2">
                <Label for="pkg-type">计费类型</Label>
                <Select v-model="createForm.type">
                  <SelectTrigger class="w-full">
                    <SelectValue placeholder="选择计费类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="按月">按月</SelectItem>
                    <SelectItem value="按年">按年</SelectItem>
                    <SelectItem value="按量">按量</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div class="space-y-2">
                <Label for="pkg-price">价格（元）</Label>
                <Input
                  id="pkg-price"
                  v-model="createForm.price"
                  type="number"
                  placeholder="0"
                />
              </div>
            </div>
            <div class="space-y-2">
              <Label for="pkg-status">初始状态</Label>
              <Select v-model="createForm.status">
                <SelectTrigger class="w-full">
                  <SelectValue placeholder="选择状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="offline">下线（草稿）</SelectItem>
                  <SelectItem value="online">上线</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div class="space-y-2">
              <Label for="pkg-desc">套餐描述</Label>
              <Input
                id="pkg-desc"
                v-model="createForm.description"
                placeholder="简要描述套餐适用场景..."
              />
            </div>
            <div class="flex justify-end">
              <Button variant="outline" @click="createTab = 'config'"
                >下一步 <ChevronRight class="ml-1 h-4 w-4"
              /></Button>
            </div>
          </TabsContent>
          <TabsContent value="config" class="space-y-4 pt-2">
            <div class="space-y-2">
              <Label for="pkg-quota">调用配额（次）</Label>
              <Input
                id="pkg-quota"
                v-model="createForm.quota"
                type="number"
                placeholder="10000"
              />
            </div>
            <div class="space-y-2">
              <Label>包含模型</Label>
              <div class="grid grid-cols-2 gap-2">
                <button
                  v-for="model in availableModels"
                  :key="model"
                  type="button"
                  @click="toggleModel(model)"
                  :class="[
                    'flex items-center gap-2 rounded-md border px-3 py-2 text-sm transition-colors',
                    createForm.models.includes(model)
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border hover:bg-accent',
                  ]"
                >
                  <Layers class="h-4 w-4" />
                  {{ model }}
                </button>
              </div>
            </div>
            <div class="flex justify-between">
              <Button variant="outline" @click="createTab = 'basic'"
                ><ChevronLeft class="mr-1 h-4 w-4" />上一步</Button
              >
              <Button @click="handleCreatePackage">创建套餐</Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>

    <Dialog v-model:open="detailOpen">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>套餐详情</DialogTitle>
          <DialogDescription>查看套餐详细配置信息</DialogDescription>
        </DialogHeader>
        <div v-if="selectedPackage" class="space-y-3">
          <div class="flex justify-between">
            <span class="text-muted-foreground">套餐名称</span
            ><span class="font-medium">{{ selectedPackage.name }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-muted-foreground">套餐ID</span
            ><span class="font-mono">{{ selectedPackage.id }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-muted-foreground">计费类型</span
            ><span>{{ selectedPackage.type }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-muted-foreground">价格</span
            ><span>¥{{ selectedPackage.price.toLocaleString() }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-muted-foreground">状态</span>
            <Badge
              :variant="statusConfig[selectedPackage.status].variant"
              class="gap-1"
            >
              <component
                :is="statusConfig[selectedPackage.status].icon"
                :class="['h-3 w-3', statusConfig[selectedPackage.status].class]"
              />
              {{ statusConfig[selectedPackage.status].label }}
            </Badge>
          </div>
          <div class="flex justify-between">
            <span class="text-muted-foreground">创建时间</span
            ><span>{{ selectedPackage.createdAt }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-muted-foreground">累计订购</span
            ><span>{{ selectedPackage.orders }} 笔</span>
          </div>
          <div class="flex justify-between">
            <span class="text-muted-foreground">收入贡献</span
            ><span>¥{{ selectedPackage.revenue.toLocaleString() }}</span>
          </div>
          <div v-if="selectedPackage.description" class="flex justify-between">
            <span class="text-muted-foreground">描述</span
            ><span class="max-w-[200px] text-right">{{
              selectedPackage.description
            }}</span>
          </div>
          <div v-if="selectedPackage.quota" class="flex justify-between">
            <span class="text-muted-foreground">调用配额</span
            ><span>{{ selectedPackage.quota.toLocaleString() }} 次</span>
          </div>
          <div v-if="selectedPackage.models" class="flex justify-between">
            <span class="text-muted-foreground">包含模型</span
            ><span class="max-w-[200px] text-right">{{
              selectedPackage.models.join("、")
            }}</span>
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

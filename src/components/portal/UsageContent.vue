<!-- [AI_START TIMESTAMP=2025-06-20 08:00:00] -->
<script setup lang="ts">
import { ref, computed } from "vue";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import Card from "@/components/ui/Card.vue";
import CardHeader from "@/components/ui/CardHeader.vue";
import CardTitle from "@/components/ui/CardTitle.vue";
import CardDescription from "@/components/ui/CardDescription.vue";
import CardContent from "@/components/ui/CardContent.vue";
import Badge from "@/components/ui/Badge.vue";
import Input from "@/components/ui/Input.vue";
import Table from "@/components/ui/Table.vue";
import TableHeader from "@/components/ui/TableHeader.vue";
import TableBody from "@/components/ui/TableBody.vue";
import TableRow from "@/components/ui/TableRow.vue";
import TableHead from "@/components/ui/TableHead.vue";
import TableCell from "@/components/ui/TableCell.vue";
import Select from "@/components/ui/select/Select.vue";
import SelectValue from "@/components/ui/select/SelectValue.vue";
import SelectTrigger from "@/components/ui/select/SelectTrigger.vue";
import SelectContent from "@/components/ui/select/SelectContent.vue";
import SelectItem from "@/components/ui/select/SelectItem.vue";
import {
  PresentationChartLineIcon,
  ArrowTrendingUpIcon,
  UsersIcon,
  ClockIcon,
  MagnifyingGlassIcon,
  SparklesIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from "@heroicons/vue/24/outline";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
);

const stats = [
  { title: "今日总调用", value: "128,456", icon: PresentationChartLineIcon, change: "+8.5%" },
  { title: "本周总调用", value: "856,432", icon: ArrowTrendingUpIcon, change: "+12.3%" },
  { title: "活跃客户数", value: "45", icon: UsersIcon, change: "+2" },
  { title: "平均延迟", value: "245", unit: "ms", icon: ClockIcon, change: "-5%" },
];

const trendDataMap: Record<string, { date: string; calls: number }[]> = {
  "7d": [
    { date: "03-10", calls: 112000 },
    { date: "03-11", calls: 128000 },
    { date: "03-12", calls: 135000 },
    { date: "03-13", calls: 142000 },
    { date: "03-14", calls: 138000 },
    { date: "03-15", calls: 156000 },
    { date: "03-16", calls: 148000 },
  ],
  "30d": [
    { date: "02-15", calls: 85000 },
    { date: "02-17", calls: 92000 },
    { date: "02-19", calls: 88000 },
    { date: "02-21", calls: 105000 },
    { date: "02-23", calls: 98000 },
    { date: "02-25", calls: 115000 },
    { date: "02-27", calls: 108000 },
    { date: "03-01", calls: 125000 },
    { date: "03-03", calls: 118000 },
    { date: "03-05", calls: 132000 },
    { date: "03-07", calls: 128000 },
    { date: "03-09", calls: 135000 },
    { date: "03-11", calls: 142000 },
    { date: "03-13", calls: 148000 },
    { date: "03-15", calls: 156000 },
  ],
  "90d": [
    { date: "12-18", calls: 65000 },
    { date: "12-23", calls: 72000 },
    { date: "12-28", calls: 78000 },
    { date: "01-02", calls: 82000 },
    { date: "01-07", calls: 88000 },
    { date: "01-12", calls: 95000 },
    { date: "01-17", calls: 92000 },
    { date: "01-22", calls: 105000 },
    { date: "01-27", calls: 110000 },
    { date: "02-01", calls: 108000 },
    { date: "02-06", calls: 115000 },
    { date: "02-11", calls: 122000 },
    { date: "02-16", calls: 118000 },
    { date: "02-21", calls: 128000 },
    { date: "02-26", calls: 135000 },
    { date: "03-03", calls: 132000 },
    { date: "03-08", calls: 142000 },
    { date: "03-13", calls: 148000 },
    { date: "03-16", calls: 156000 },
  ],
};

const modelDataMap: Record<
  string,
  {
    model: string;
    provider: string;
    totalCalls: number;
    tokens: string;
    avgLatency: string;
    status: "normal" | "warning";
    errorRate: string;
  }[]
> = {
  "7d": [
    {
      model: "GPT-4o",
      provider: "OpenAI",
      totalCalls: 98000,
      tokens: "260M",
      avgLatency: "210ms",
      status: "normal",
      errorRate: "0.1%",
    },
    {
      model: "Claude 3.5 Sonnet",
      provider: "Anthropic",
      totalCalls: 52000,
      tokens: "150M",
      avgLatency: "320ms",
      status: "normal",
      errorRate: "0.2%",
    },
    {
      model: "DeepSeek V3",
      provider: "DeepSeek",
      totalCalls: 41000,
      tokens: "92M",
      avgLatency: "180ms",
      status: "normal",
      errorRate: "0.05%",
    },
    {
      model: "Gemini 1.5 Pro",
      provider: "Google",
      totalCalls: 23000,
      tokens: "72M",
      avgLatency: "280ms",
      status: "warning",
      errorRate: "0.8%",
    },
    {
      model: "Qwen2.5 72B",
      provider: "Alibaba Cloud",
      totalCalls: 18000,
      tokens: "51M",
      avgLatency: "260ms",
      status: "normal",
      errorRate: "0.15%",
    },
  ],
  "30d": [
    {
      model: "GPT-4o",
      provider: "OpenAI",
      totalCalls: 456000,
      tokens: "1.2B",
      avgLatency: "210ms",
      status: "normal",
      errorRate: "0.1%",
    },
    {
      model: "Claude 3.5 Sonnet",
      provider: "Anthropic",
      totalCalls: 234000,
      tokens: "680M",
      avgLatency: "320ms",
      status: "normal",
      errorRate: "0.2%",
    },
    {
      model: "DeepSeek V3",
      provider: "DeepSeek",
      totalCalls: 189000,
      tokens: "420M",
      avgLatency: "180ms",
      status: "normal",
      errorRate: "0.05%",
    },
    {
      model: "Gemini 1.5 Pro",
      provider: "Google",
      totalCalls: 98000,
      tokens: "310M",
      avgLatency: "280ms",
      status: "warning",
      errorRate: "0.8%",
    },
    {
      model: "Qwen2.5 72B",
      provider: "Alibaba Cloud",
      totalCalls: 67000,
      tokens: "190M",
      avgLatency: "260ms",
      status: "normal",
      errorRate: "0.15%",
    },
  ],
  "90d": [
    {
      model: "GPT-4o",
      provider: "OpenAI",
      totalCalls: 1380000,
      tokens: "3.6B",
      avgLatency: "210ms",
      status: "normal",
      errorRate: "0.1%",
    },
    {
      model: "Claude 3.5 Sonnet",
      provider: "Anthropic",
      totalCalls: 720000,
      tokens: "2.1B",
      avgLatency: "320ms",
      status: "normal",
      errorRate: "0.2%",
    },
    {
      model: "DeepSeek V3",
      provider: "DeepSeek",
      totalCalls: 580000,
      tokens: "1.3B",
      avgLatency: "180ms",
      status: "normal",
      errorRate: "0.05%",
    },
    {
      model: "Gemini 1.5 Pro",
      provider: "Google",
      totalCalls: 310000,
      tokens: "980M",
      avgLatency: "280ms",
      status: "warning",
      errorRate: "0.8%",
    },
    {
      model: "Qwen2.5 72B",
      provider: "Alibaba Cloud",
      totalCalls: 210000,
      tokens: "590M",
      avgLatency: "260ms",
      status: "normal",
      errorRate: "0.15%",
    },
  ],
};

const customerDataMap: Record<
  string,
  {
    company: string;
    callsPeriod: number;
    callsMonth: number;
    quotaUsed: number;
    status: "normal" | "warning";
  }[]
> = {
  "7d": [
    {
      company: "华为云科技",
      callsPeriod: 10500,
      callsMonth: 320000,
      quotaUsed: 85,
      status: "normal",
    },
    {
      company: "阿里云数",
      callsPeriod: 8900,
      callsMonth: 280000,
      quotaUsed: 78,
      status: "normal",
    },
    {
      company: "腾讯云智",
      callsPeriod: 7400,
      callsMonth: 210000,
      quotaUsed: 92,
      status: "warning",
    },
    {
      company: "百度智能",
      callsPeriod: 5200,
      callsMonth: 150000,
      quotaUsed: 65,
      status: "normal",
    },
    {
      company: "字节跳动",
      callsPeriod: 4100,
      callsMonth: 120000,
      quotaUsed: 45,
      status: "normal",
    },
  ],
  "30d": [
    {
      company: "华为云科技",
      callsPeriod: 320000,
      callsMonth: 320000,
      quotaUsed: 85,
      status: "normal",
    },
    {
      company: "阿里云数",
      callsPeriod: 280000,
      callsMonth: 280000,
      quotaUsed: 78,
      status: "normal",
    },
    {
      company: "腾讯云智",
      callsPeriod: 210000,
      callsMonth: 210000,
      quotaUsed: 92,
      status: "warning",
    },
    {
      company: "百度智能",
      callsPeriod: 150000,
      callsMonth: 150000,
      quotaUsed: 65,
      status: "normal",
    },
    {
      company: "字节跳动",
      callsPeriod: 120000,
      callsMonth: 120000,
      quotaUsed: 45,
      status: "normal",
    },
  ],
  "90d": [
    {
      company: "华为云科技",
      callsPeriod: 980000,
      callsMonth: 320000,
      quotaUsed: 85,
      status: "normal",
    },
    {
      company: "阿里云数",
      callsPeriod: 860000,
      callsMonth: 280000,
      quotaUsed: 78,
      status: "normal",
    },
    {
      company: "腾讯云智",
      callsPeriod: 640000,
      callsMonth: 210000,
      quotaUsed: 92,
      status: "warning",
    },
    {
      company: "百度智能",
      callsPeriod: 450000,
      callsMonth: 150000,
      quotaUsed: 65,
      status: "normal",
    },
    {
      company: "字节跳动",
      callsPeriod: 360000,
      callsMonth: 120000,
      quotaUsed: 45,
      status: "normal",
    },
  ],
};

const trendRange = ref("7d");
const modelRange = ref("30d");
const customerRange = ref("30d");

const trendData = computed(
  () => trendDataMap[trendRange.value] || trendDataMap["7d"],
);
const modelUsages = computed(
  () => modelDataMap[modelRange.value] || modelDataMap["30d"],
);
const customerUsages = computed(
  () => customerDataMap[customerRange.value] || customerDataMap["30d"],
);

const chartData = computed(() => ({
  labels: trendData.value.map((d) => d.date),
  datasets: [
    {
      label: "API 调用量",
      data: trendData.value.map((d) => d.calls),
      backgroundColor: "#374151",
      borderColor: "#374151",
      borderWidth: 0,
      borderRadius: 0,
      barPercentage: 0.6,
      categoryPercentage: 0.8,
    },
  ],
}));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: "rgba(0,0,0,0.85)",
      titleColor: "#fff",
      bodyColor: "#fff",
      padding: 10,
      cornerRadius: 6,
      displayColors: false,
      callbacks: {
        label: (context: any) =>
          `调用量: ${Number(context.raw).toLocaleString()}`,
      },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        color: "#6b7280",
        font: { size: 11 },
      },
      border: { display: false },
    },
    y: {
      beginAtZero: true,
      grid: {
        color: "rgba(0,0,0,0.06)",
        drawBorder: false,
      },
      ticks: {
        color: "#6b7280",
        font: { size: 11 },
        callback: (value: any) => `${Number(value) / 1000}k`,
      },
      border: { display: false },
    },
  },
};

const searchQuery = ref("");

const filteredModels = computed(() =>
  modelUsages.value.filter(
    (m) =>
      m.model.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      m.provider.toLowerCase().includes(searchQuery.value.toLowerCase()),
  ),
);
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-2xl font-semibold text-foreground">用量监控</h2>
      <p class="text-muted-foreground">
        实时监控平台 API 调用量与各客户用量分布
      </p>
    </div>

    <!-- Stats -->
    <div class="grid gap-4 md:grid-cols-4">
      <Card v-for="stat in stats" :key="stat.title">
        <CardHeader class="pb-2">
          <CardTitle class="text-sm font-medium text-muted-foreground">{{
            stat.title
          }}</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="flex items-baseline gap-1">
            <span class="text-2xl font-bold">{{ stat.value }}</span>
            <span v-if="stat.unit" class="text-sm text-muted-foreground">{{
              stat.unit
            }}</span>
          </div>
          <div class="mt-1 text-xs text-green-500">{{ stat.change }}</div>
        </CardContent>
      </Card>
    </div>

    <!-- Daily Trend -->
    <Card>
      <CardHeader>
        <div class="flex items-center justify-between">
          <div>
            <CardTitle>调用趋势</CardTitle>
            <CardDescription>平台每日 API 调用总量</CardDescription>
          </div>
          <Select v-model="trendRange">
            <SelectTrigger class="w-28">
              <SelectValue placeholder="选择时间范围" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">近7日</SelectItem>
              <SelectItem value="30d">近30日</SelectItem>
              <SelectItem value="90d">近90日</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div class="relative h-96">
          <Bar
            :data="chartData"
            :options="chartOptions"
            class="w-full"
            style="display: block; width: 100%; height: 100%"
          />
        </div>
      </CardContent>
    </Card>

    <!-- Model Usage -->
    <Card>
      <CardHeader>
        <div class="flex items-center justify-between">
          <div>
            <CardTitle>模型用量排行</CardTitle>
            <CardDescription>各模型累计调用统计</CardDescription>
          </div>
          <div class="flex items-center gap-3">
            <div class="relative">
              <MagnifyingGlassIcon
                class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
              />
              <Input
                v-model="searchQuery"
                placeholder="搜索模型..."
                class="w-64 pl-8"
              />
            </div>
            <Select v-model="modelRange">
              <SelectTrigger class="w-28">
                <SelectValue placeholder="选择时间范围" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">近7日</SelectItem>
                <SelectItem value="30d">近30日</SelectItem>
                <SelectItem value="90d">近90日</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>模型名称</TableHead>
              <TableHead>提供商</TableHead>
              <TableHead>总调用量</TableHead>
              <TableHead>Token 消耗</TableHead>
              <TableHead>平均延迟</TableHead>
              <TableHead>错误率</TableHead>
              <TableHead>状态</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="m in filteredModels" :key="m.model">
              <TableCell class="font-medium">{{ m.model }}</TableCell>
              <TableCell>{{ m.provider }}</TableCell>
              <TableCell>{{ m.totalCalls.toLocaleString() }}</TableCell>
              <TableCell>{{ m.tokens }}</TableCell>
              <TableCell>{{ m.avgLatency }}</TableCell>
              <TableCell>{{ m.errorRate }}</TableCell>
              <TableCell>
                <Badge
                  v-if="m.status === 'normal'"
                  variant="outline"
                  class="gap-1"
                >
                  <CheckCircleIcon class="h-3 w-3 text-green-500" />正常
                </Badge>
                <Badge v-else variant="outline" class="gap-1">
                  <ExclamationTriangleIcon class="h-3 w-3 text-yellow-500" />告警
                </Badge>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>

    <!-- Customer Usage TOP -->
    <Card>
      <CardHeader>
        <div class="flex items-center justify-between">
          <div>
            <CardTitle>客户用量 TOP5</CardTitle>
            <CardDescription>调用量最高的企业客户</CardDescription>
          </div>
          <Select v-model="customerRange">
            <SelectTrigger class="w-28">
              <SelectValue placeholder="选择时间范围" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">近7日</SelectItem>
              <SelectItem value="30d">近30日</SelectItem>
              <SelectItem value="90d">近90日</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>企业名称</TableHead>
              <TableHead>当前周期调用</TableHead>
              <TableHead>本月累计</TableHead>
              <TableHead>配额使用率</TableHead>
              <TableHead>状态</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="c in customerUsages" :key="c.company">
              <TableCell class="font-medium">{{ c.company }}</TableCell>
              <TableCell>{{ c.callsPeriod.toLocaleString() }}</TableCell>
              <TableCell>{{ c.callsMonth.toLocaleString() }}</TableCell>
              <TableCell>
                <div class="flex items-center gap-2">
                  <div class="h-2 w-24 overflow-hidden rounded-full bg-muted">
                    <div
                      class="h-full rounded-full bg-primary"
                      :style="{ width: c.quotaUsed + '%' }"
                    />
                  </div>
                  <span class="text-xs">{{ c.quotaUsed }}%</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  v-if="c.status === 'normal'"
                  variant="outline"
                  class="gap-1"
                >
                  <CheckCircleIcon class="h-3 w-3 text-green-500" />正常
                </Badge>
                <Badge v-else variant="outline" class="gap-1">
                  <ExclamationTriangleIcon class="h-3 w-3 text-yellow-500" />预警
                </Badge>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
</template>
<style scoped>
/* Prevent Chart.js canvas from creating scrollbars */
:deep(.chart-container) {
  position: relative;
  overflow: hidden;
}

:deep(.chart-container canvas) {
  max-width: 100% !important;
  height: auto !important;
  overflow: hidden !important;
}
</style>
<!-- [AI_END LINES=220 TIMESTAMP=2025-06-20 08:00:00] -->

<!-- [AI_START TIMESTAMP=2025-06-20 06:40:00] -->
<script setup lang="ts">
import { ref, computed } from "vue";
import {
  Wallet,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  Clock,
  XCircle,
  AlertTriangle,
} from "lucide-vue-next";

const customerBalances = [
  { company: "华为云科技", balance: 52850.0, frozen: 0.0, status: "normal" },
  { company: "阿里云数", balance: 32100.5, frozen: 5000.0, status: "normal" },
  { company: "腾讯云智", balance: 18500.0, frozen: 0.0, status: "normal" },
  { company: "百度智能", balance: 5600.0, frozen: 0.0, status: "warning" },
  { company: "字节跳动", balance: 128000.0, frozen: 0.0, status: "normal" },
];

const transactions = [
  {
    id: "TXN20240315001",
    time: "2024-03-15 14:32:18",
    company: "华为云科技",
    type: "充值",
    amount: 5000.0,
    status: "success",
  },
  {
    id: "TXN20240312001",
    time: "2024-03-12 09:15:03",
    company: "阿里云数",
    type: "消费",
    amount: -1299.0,
    status: "success",
  },
  {
    id: "TXN20240310001",
    time: "2024-03-10 16:45:22",
    company: "腾讯云智",
    type: "消费",
    amount: -3700.0,
    status: "success",
  },
  {
    id: "TXN20240308001",
    time: "2024-03-08 11:20:55",
    company: "字节跳动",
    type: "充值",
    amount: 10000.0,
    status: "success",
  },
  {
    id: "TXN20240305001",
    time: "2024-03-05 08:30:10",
    company: "百度智能",
    type: "退款",
    amount: 500.0,
    status: "success",
  },
  {
    id: "TXN20240302001",
    time: "2024-03-02 17:12:40",
    company: "华为云科技",
    type: "充值",
    amount: 3000.0,
    status: "pending",
  },
];

const statusConfig: Record<
  string,
  {
    label: string;
    variant: "default" | "outline" | "secondary" | "destructive";
    icon: typeof CheckCircle2;
    class: string;
  }
> = {
  success: {
    label: "成功",
    variant: "outline",
    icon: CheckCircle2,
    class: "text-green-500",
  },
  pending: {
    label: "处理中",
    variant: "outline",
    icon: Clock,
    class: "text-yellow-500",
  },
  failed: {
    label: "失败",
    variant: "outline",
    icon: XCircle,
    class: "text-red-500",
  },
};

const balanceStatusConfig: Record<string, { label: string; class: string }> = {
  normal: { label: "正常", class: "text-green-500" },
  warning: { label: "余额不足", class: "text-yellow-500" },
};

const searchQuery = ref("");
const detailOpen = ref(false);
const selectedCustomer = ref<(typeof customerBalances)[0] | null>(null);

const filteredCustomers = computed(() =>
  customerBalances.filter((c) =>
    c.company.toLowerCase().includes(searchQuery.value.toLowerCase()),
  ),
);

function handleViewDetail(customer: (typeof customerBalances)[0]) {
  selectedCustomer.value = customer;
  detailOpen.value = true;
}

function formatCredit(val: number): string {
  return val.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

const stats = computed(() => ({
  totalBalance: customerBalances.reduce((acc, c) => acc + c.balance, 0),
  totalFrozen: customerBalances.reduce((acc, c) => acc + c.frozen, 0),
  warningCount: customerBalances.filter((c) => c.status === "warning").length,
  todayRecharge: 15000.0,
}));
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-2xl font-semibold text-foreground">资金管理</h2>
      <p class="text-muted-foreground">查看全平台客户资金、余额与交易流水</p>
    </div>

    <div class="grid gap-4 md:grid-cols-4">
      <Card>
        <CardHeader class="pb-2"
          ><CardTitle class="text-sm font-medium text-muted-foreground"
            >平台总余额</CardTitle
          ></CardHeader
        >
        <CardContent
          ><div class="text-2xl font-bold">
            ¥{{ formatCredit(stats.totalBalance) }}
          </div></CardContent
        >
      </Card>
      <Card>
        <CardHeader class="pb-2"
          ><CardTitle class="text-sm font-medium text-muted-foreground"
            >冻结金额</CardTitle
          ></CardHeader
        >
        <CardContent
          ><div class="text-2xl font-bold text-yellow-600">
            ¥{{ formatCredit(stats.totalFrozen) }}
          </div></CardContent
        >
      </Card>
      <Card>
        <CardHeader class="pb-2"
          ><CardTitle class="text-sm font-medium text-muted-foreground"
            >今日充值</CardTitle
          ></CardHeader
        >
        <CardContent
          ><div class="text-2xl font-bold text-green-600">
            ¥{{ formatCredit(stats.todayRecharge) }}
          </div></CardContent
        >
      </Card>
      <Card>
        <CardHeader class="pb-2"
          ><CardTitle class="text-sm font-medium text-muted-foreground"
            >余额预警</CardTitle
          ></CardHeader
        >
        <CardContent
          ><div class="text-2xl font-bold text-red-600">
            {{ stats.warningCount }} 家
          </div></CardContent
        >
      </Card>
    </div>

    <Card>
      <CardHeader>
        <div class="flex items-center justify-between">
          <CardTitle>客户余额列表</CardTitle>
          <div class="relative">
            <Search
              class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
            />
            <Input
              v-model="searchQuery"
              placeholder="搜索企业..."
              class="w-64 pl-8"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>企业名称</TableHead>
              <TableHead>账户余额</TableHead>
              <TableHead>冻结金额</TableHead>
              <TableHead>状态</TableHead>
              <TableHead class="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="c in filteredCustomers" :key="c.company">
              <TableCell class="font-medium">{{ c.company }}</TableCell>
              <TableCell>¥{{ formatCredit(c.balance) }}</TableCell>
              <TableCell>¥{{ formatCredit(c.frozen) }}</TableCell>
              <TableCell>
                <Badge
                  v-if="c.status === 'normal'"
                  variant="outline"
                  class="gap-1"
                >
                  <CheckCircle2 class="h-3 w-3 text-green-500" />正常
                </Badge>
                <Badge v-else variant="outline" class="gap-1">
                  <AlertTriangle class="h-3 w-3 text-yellow-500" />余额不足
                </Badge>
              </TableCell>
              <TableCell class="text-right">
                <Button variant="ghost" size="sm" @click="handleViewDetail(c)"
                  >详情</Button
                >
                <Button variant="ghost" size="sm">调账</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>交易流水</CardTitle>
        <CardDescription>近期全平台资金变动记录</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>交易时间</TableHead>
              <TableHead>企业名称</TableHead>
              <TableHead>交易类型</TableHead>
              <TableHead>交易金额</TableHead>
              <TableHead>状态</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="tx in transactions" :key="tx.id">
              <TableCell class="text-sm text-muted-foreground">{{
                tx.time
              }}</TableCell>
              <TableCell class="font-medium">{{ tx.company }}</TableCell>
              <TableCell>
                <div class="flex items-center gap-1.5">
                  <ArrowUpRight
                    v-if="tx.amount > 0"
                    class="h-4 w-4 text-green-500"
                  />
                  <ArrowDownRight v-else class="h-4 w-4 text-red-500" />
                  <span>{{ tx.type }}</span>
                </div>
              </TableCell>
              <TableCell>
                <span
                  :class="
                    tx.amount > 0
                      ? 'text-green-600 font-medium'
                      : 'text-destructive font-medium'
                  "
                >
                  {{ tx.amount > 0 ? "+" : ""
                  }}{{ formatCredit(Math.abs(tx.amount)) }}
                </span>
              </TableCell>
              <TableCell>
                <Badge :variant="statusConfig[tx.status].variant" class="gap-1">
                  <component
                    :is="statusConfig[tx.status].icon"
                    :class="['h-3 w-3', statusConfig[tx.status].class]"
                  />
                  {{ statusConfig[tx.status].label }}
                </Badge>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>

    <Dialog v-model:open="detailOpen">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>客户资金详情</DialogTitle>
          <DialogDescription>查看客户资金明细</DialogDescription>
        </DialogHeader>
        <div v-if="selectedCustomer" class="space-y-3">
          <div class="flex justify-between">
            <span class="text-muted-foreground">企业名称</span
            ><span class="font-medium">{{ selectedCustomer.company }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-muted-foreground">账户余额</span
            ><span>¥{{ formatCredit(selectedCustomer.balance) }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-muted-foreground">冻结金额</span
            ><span>¥{{ formatCredit(selectedCustomer.frozen) }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-muted-foreground">可用余额</span
            ><span
              >¥{{
                formatCredit(selectedCustomer.balance - selectedCustomer.frozen)
              }}</span
            >
          </div>
          <div class="flex justify-between">
            <span class="text-muted-foreground">状态</span>
            <Badge
              v-if="selectedCustomer.status === 'normal'"
              variant="outline"
              class="gap-1"
            >
              <CheckCircle2 class="h-3 w-3 text-green-500" />正常
            </Badge>
            <Badge v-else variant="outline" class="gap-1">
              <AlertTriangle class="h-3 w-3 text-yellow-500" />余额不足
            </Badge>
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
<!-- [AI_END LINES=154 TIMESTAMP=2025-06-20 06:40:00] -->

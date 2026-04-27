<!-- [AI_START TIMESTAMP=2025-06-20 06:45:00] -->
<script setup lang="ts">
import { ref, computed } from "vue";
import {
  MagnifyingGlassIcon,
  CheckCircleIcon,
  ClockIcon,
  DocumentTextIcon,
  ArrowTrendingUpIcon,
  ExclamationCircleIcon,
  EyeIcon,
  ArrowDownTrayIcon,
} from "@heroicons/vue/24/outline";

const bills = [
  {
    id: "BILL202403",
    company: "华为云科技",
    month: "2024年3月",
    amount: 12997,
    status: "unpaid",
    dueDate: "2024-04-15",
  },
  {
    id: "BILL202402",
    company: "阿里云数",
    month: "2024年2月",
    amount: 6998,
    status: "paid",
    paidAt: "2024-03-10",
  },
  {
    id: "BILL202401",
    company: "腾讯云智",
    month: "2024年1月",
    amount: 5999,
    status: "paid",
    paidAt: "2024-02-08",
  },
  {
    id: "BILL202403002",
    company: "百度智能",
    month: "2024年3月",
    amount: 3200,
    status: "unpaid",
    dueDate: "2024-04-15",
  },
  {
    id: "BILL202402002",
    company: "字节跳动",
    month: "2024年2月",
    amount: 25998,
    status: "paid",
    paidAt: "2024-03-05",
  },
];

const invoices = [
  {
    id: "INV202403001",
    company: "华为云科技",
    billId: "BILL202402",
    type: "增值税专用发票",
    amount: 6998,
    status: "issued",
    issuedAt: "2024-03-15",
  },
  {
    id: "INV202403002",
    company: "阿里云数",
    billId: "BILL202401",
    type: "增值税普通发票",
    amount: 5999,
    status: "pending",
    issuedAt: "-",
  },
  {
    id: "INV202402001",
    company: "字节跳动",
    billId: "BILL202402",
    type: "增值税专用发票",
    amount: 25998,
    status: "issued",
    issuedAt: "2024-03-10",
  },
];

const statusConfig: Record<
  string,
  {
    label: string;
    variant: "default" | "outline" | "secondary" | "destructive";
    icon: typeof CheckCircleIcon;
    color: string;
  }
> = {
  paid: {
    label: "已支付",
    variant: "outline",
    icon: CheckCircleIcon,
    color: "text-green-500",
  },
  unpaid: {
    label: "待支付",
    variant: "outline",
    icon: ClockIcon,
    color: "text-yellow-500",
  },
};

const invoiceStatusConfig: Record<
  string,
  {
    label: string;
    variant: "default" | "outline" | "secondary" | "destructive";
    icon: typeof CheckCircleIcon;
    color: string;
  }
> = {
  issued: {
    label: "已开具",
    variant: "outline",
    icon: CheckCircleIcon,
    color: "text-green-500",
  },
  pending: {
    label: "待开具",
    variant: "outline",
    icon: ClockIcon,
    color: "text-yellow-500",
  },
};

const searchQuery = ref("");
const billDetailOpen = ref(false);
const selectedBill = ref<(typeof bills)[0] | null>(null);

const filteredBills = computed(() =>
  bills.filter(
    (b) =>
      b.id.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      b.company.toLowerCase().includes(searchQuery.value.toLowerCase()),
  ),
);

function handleViewBill(bill: (typeof bills)[0]) {
  selectedBill.value = bill;
  billDetailOpen.value = true;
}

const totalUnpaid = computed(() =>
  bills
    .filter((b) => b.status === "unpaid")
    .reduce((acc, b) => acc + b.amount, 0),
);
const pendingInvoices = computed(
  () => invoices.filter((i) => i.status === "pending").length,
);
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-2xl font-semibold text-foreground">账单管理</h2>
      <p class="text-muted-foreground">查看全平台客户账单与发票申请</p>
    </div>

    <div class="grid gap-4 md:grid-cols-4">
      <Card>
        <CardHeader class="pb-2"
          ><CardTitle class="text-sm font-medium text-muted-foreground"
            >本月账单</CardTitle
          ></CardHeader
        >
        <CardContent
          ><div class="text-2xl font-bold">{{ bills.length }}</div></CardContent
        >
      </Card>
      <Card>
        <CardHeader class="pb-2"
          ><CardTitle class="text-sm font-medium text-muted-foreground"
            >待支付金额</CardTitle
          ></CardHeader
        >
        <CardContent
          ><div class="text-2xl font-bold text-destructive">
            ¥{{ totalUnpaid.toLocaleString() }}
          </div></CardContent
        >
      </Card>
      <Card>
        <CardHeader class="pb-2"
          ><CardTitle class="text-sm font-medium text-muted-foreground"
            >已收款</CardTitle
          ></CardHeader
        >
        <CardContent
          ><div class="text-2xl font-bold text-green-600">
            ¥{{
              bills
                .filter((b) => b.status === "paid")
                .reduce((acc, b) => acc + b.amount, 0)
                .toLocaleString()
            }}
          </div></CardContent
        >
      </Card>
      <Card>
        <CardHeader class="pb-2"
          ><CardTitle class="text-sm font-medium text-muted-foreground"
            >待开发票</CardTitle
          ></CardHeader
        >
        <CardContent
          ><div class="text-2xl font-bold text-yellow-600">
            {{ pendingInvoices }} 笔
          </div></CardContent
        >
      </Card>
    </div>

    <Card>
      <CardHeader>
        <div class="flex items-center justify-between">
          <CardTitle>账单列表</CardTitle>
          <div class="relative">
            <MagnifyingGlassIcon
              class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
            />
            <Input
              v-model="searchQuery"
              placeholder="搜索账单号或企业..."
              class="w-64 pl-8"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>账单编号</TableHead>
              <TableHead>企业名称</TableHead>
              <TableHead>账单月份</TableHead>
              <TableHead>应付金额</TableHead>
              <TableHead>支付状态</TableHead>
              <TableHead>到期日</TableHead>
              <TableHead class="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="bill in filteredBills" :key="bill.id">
              <TableCell class="font-mono text-sm">{{ bill.id }}</TableCell>
              <TableCell class="font-medium">{{ bill.company }}</TableCell>
              <TableCell>{{ bill.month }}</TableCell>
              <TableCell class="font-medium"
                >¥{{ bill.amount.toLocaleString() }}</TableCell
              >
              <TableCell>
                <Badge
                  :variant="statusConfig[bill.status].variant"
                  class="gap-1"
                >
                  <component
                    :is="statusConfig[bill.status].icon"
                    :class="['h-3 w-3', statusConfig[bill.status].color]"
                  />
                  {{ statusConfig[bill.status].label }}
                </Badge>
              </TableCell>
              <TableCell class="text-muted-foreground">{{
                bill.dueDate
              }}</TableCell>
              <TableCell class="text-right">
                <div class="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    @click="handleViewBill(bill)"
                    ><EyeIcon class="mr-1 h-3 w-3" />详情</Button
                  >
                  <Button variant="ghost" size="sm"
                    ><ArrowDownTrayIcon class="mr-1 h-3 w-3" />导出</Button
                  >
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <div class="flex items-center justify-between">
          <div>
            <CardTitle>发票申请</CardTitle>
            <CardDescription>客户提交的发票开具申请</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>发票编号</TableHead>
              <TableHead>企业名称</TableHead>
              <TableHead>发票类型</TableHead>
              <TableHead>金额</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>开具日期</TableHead>
              <TableHead class="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="inv in invoices" :key="inv.id">
              <TableCell class="font-mono text-sm">{{ inv.id }}</TableCell>
              <TableCell class="font-medium">{{ inv.company }}</TableCell>
              <TableCell>{{ inv.type }}</TableCell>
              <TableCell class="font-medium"
                >¥{{ inv.amount.toLocaleString() }}</TableCell
              >
              <TableCell>
                <Badge
                  :variant="invoiceStatusConfig[inv.status].variant"
                  class="gap-1"
                >
                  <component
                    :is="invoiceStatusConfig[inv.status].icon"
                    :class="['h-3 w-3', invoiceStatusConfig[inv.status].color]"
                  />
                  {{ invoiceStatusConfig[inv.status].label }}
                </Badge>
              </TableCell>
              <TableCell class="text-muted-foreground">{{
                inv.issuedAt
              }}</TableCell>
              <TableCell class="text-right">
                <Button v-if="inv.status === 'pending'" size="sm"
                  >开具发票</Button
                >
                <Button v-else variant="ghost" size="sm">查看</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>

    <Dialog v-model:open="billDetailOpen">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>账单详情</DialogTitle>
          <DialogDescription
            >{{ selectedBill?.company }} -
            {{ selectedBill?.month }} 账单</DialogDescription
          >
        </DialogHeader>
        <div v-if="selectedBill" class="space-y-3">
          <div class="flex justify-between">
            <span class="text-muted-foreground">账单编号</span
            ><span class="font-mono">{{ selectedBill.id }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-muted-foreground">企业名称</span
            ><span class="font-medium">{{ selectedBill.company }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-muted-foreground">账单月份</span
            ><span>{{ selectedBill.month }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-muted-foreground">应付金额</span
            ><span class="font-medium"
              >¥{{ selectedBill.amount.toLocaleString() }}</span
            >
          </div>
          <div class="flex justify-between">
            <span class="text-muted-foreground">支付状态</span>
            <Badge
              :variant="statusConfig[selectedBill.status].variant"
              class="gap-1"
            >
              <component
                :is="statusConfig[selectedBill.status].icon"
                :class="['h-3 w-3', statusConfig[selectedBill.status].color]"
              />
              {{ statusConfig[selectedBill.status].label }}
            </Badge>
          </div>
          <div class="flex justify-between">
            <span class="text-muted-foreground">到期日</span
            ><span>{{ selectedBill.dueDate }}</span>
          </div>
          <div v-if="selectedBill.paidAt" class="flex justify-between">
            <span class="text-muted-foreground">支付时间</span
            ><span>{{ selectedBill.paidAt }}</span>
          </div>
        </div>
        <DialogFooter
          ><Button variant="outline" @click="billDetailOpen = false"
            >关闭</Button
          ></DialogFooter
        >
      </DialogContent>
    </Dialog>
  </div>
</template>
<!-- [AI_END LINES=130 TIMESTAMP=2025-06-20 06:45:00] -->

<!-- [AI_START TIMESTAMP=2025-06-15 12:00:00] -->
<script setup lang="ts">
import { ref, computed } from 'vue'
import Card from '@/components/ui/Card.vue'
import CardHeader from '@/components/ui/CardHeader.vue'
import CardTitle from '@/components/ui/CardTitle.vue'
import CardContent from '@/components/ui/CardContent.vue'
import Button from '@/components/ui/Button.vue'
import Badge from '@/components/ui/Badge.vue'
import Input from '@/components/ui/Input.vue'
import Table from '@/components/ui/Table.vue'
import TableHeader from '@/components/ui/TableHeader.vue'
import TableBody from '@/components/ui/TableBody.vue'
import TableRow from '@/components/ui/TableRow.vue'
import TableHead from '@/components/ui/TableHead.vue'
import TableCell from '@/components/ui/TableCell.vue'
import Dialog from '@/components/ui/Dialog.vue'
import DialogContent from '@/components/ui/DialogContent.vue'
import DialogHeader from '@/components/ui/DialogHeader.vue'
import DialogTitle from '@/components/ui/DialogTitle.vue'
import DialogDescription from '@/components/ui/DialogDescription.vue'
import DialogFooter from '@/components/ui/DialogFooter.vue'
import DropdownMenu from '@/components/ui/DropdownMenu.vue'
import DropdownMenuTrigger from '@/components/ui/DropdownMenuTrigger.vue'
import DropdownMenuContent from '@/components/ui/DropdownMenuContent.vue'
import DropdownMenuItem from '@/components/ui/DropdownMenuItem.vue'
import {
  Search, Filter, MoreHorizontal, Eye, CreditCard, X,
  ShieldCheck, Clock, CheckCircle2, XCircle,
} from 'lucide-vue-next'

const orders = [
  { id: 'ORD202403150001', packageName: '高级版', amount: 5999, status: 'paid', createdAt: '2024-03-15 14:30:00', paidAt: '2024-03-15 14:35:00' },
  { id: 'ORD202403150002', packageName: '基础版', amount: 1999, status: 'pending', createdAt: '2024-03-15 10:20:00', paidAt: null },
  { id: 'ORD202403140003', packageName: '高级版', amount: 5999, status: 'pending', createdAt: '2024-03-14 16:45:00', paidAt: null },
  { id: 'ORD202403130004', packageName: '基础版', amount: 1999, status: 'paid', createdAt: '2024-03-13 09:15:00', paidAt: '2024-03-13 09:20:00' },
  { id: 'ORD202403120005', packageName: '尊享版', amount: 19999, status: 'cancelled', createdAt: '2024-03-12 11:30:00', paidAt: null },
  { id: 'ORD202403100006', packageName: '高级版', amount: 5999, status: 'paid', createdAt: '2024-03-10 15:00:00', paidAt: '2024-03-10 15:05:00' },
]

const statusConfig: Record<string, { label: string; variant: 'default' | 'outline' | 'secondary' | 'destructive'; icon: typeof Clock; color: string }> = {
  pending: { label: '待支付', variant: 'outline', icon: Clock, color: 'text-yellow-500' },
  paid: { label: '已支付', variant: 'outline', icon: CheckCircle2, color: 'text-green-500' },
  cancelled: { label: '已取消', variant: 'secondary', icon: XCircle, color: 'text-muted-foreground' },
}

const paymentDialogOpen = ref(false)
const detailDialogOpen = ref(false)
const selectedOrder = ref<typeof orders[0] | null>(null)
const searchQuery = ref('')

const filteredOrders = computed(() =>
  orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      order.packageName.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
)

function handlePay(order: typeof orders[0]) {
  selectedOrder.value = order
  paymentDialogOpen.value = true
}

function handleViewDetail(order: typeof orders[0]) {
  selectedOrder.value = order
  detailDialogOpen.value = true
}

const stats = computed(() => ({
  total: orders.length,
  pending: orders.filter((o) => o.status === 'pending').length,
  paid: orders.filter((o) => o.status === 'paid').length,
  totalAmount: orders.filter((o) => o.status === 'paid').reduce((acc, o) => acc + o.amount, 0),
}))
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-2xl font-semibold text-foreground">我的订单</h2>
      <p class="text-muted-foreground">管理您的套餐订购订单</p>
    </div>

    <div class="grid gap-4 md:grid-cols-4">
      <Card>
        <CardHeader class="pb-2"><CardTitle class="text-sm font-medium text-muted-foreground">全部订单</CardTitle></CardHeader>
        <CardContent><div class="text-2xl font-bold">{{ stats.total }}</div></CardContent>
      </Card>
      <Card>
        <CardHeader class="pb-2"><CardTitle class="text-sm font-medium text-muted-foreground">待支付</CardTitle></CardHeader>
        <CardContent><div class="text-2xl font-bold text-yellow-600">{{ stats.pending }}</div></CardContent>
      </Card>
      <Card>
        <CardHeader class="pb-2"><CardTitle class="text-sm font-medium text-muted-foreground">已支付</CardTitle></CardHeader>
        <CardContent><div class="text-2xl font-bold text-green-600">{{ stats.paid }}</div></CardContent>
      </Card>
      <Card>
        <CardHeader class="pb-2"><CardTitle class="text-sm font-medium text-muted-foreground">累计支付</CardTitle></CardHeader>
        <CardContent><div class="text-2xl font-bold">¥{{ stats.totalAmount.toLocaleString() }}</div></CardContent>
      </Card>
    </div>

    <Card>
      <CardHeader>
        <div class="flex items-center justify-between">
          <CardTitle>订单列表</CardTitle>
          <div class="flex items-center gap-2">
            <div class="relative">
              <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input v-model="searchQuery" placeholder="搜索订单..." class="w-64 pl-8" />
            </div>
            <Button variant="outline" size="icon"><Filter class="h-4 w-4" /></Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>订单号</TableHead>
              <TableHead>套餐名称</TableHead>
              <TableHead>金额</TableHead>
              <TableHead>支付状态</TableHead>
              <TableHead>下单时间</TableHead>
              <TableHead class="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="order in filteredOrders" :key="order.id">
              <TableCell class="font-mono text-sm">{{ order.id }}</TableCell>
              <TableCell>{{ order.packageName }}</TableCell>
              <TableCell class="font-medium">¥{{ order.amount.toLocaleString() }}</TableCell>
              <TableCell>
                <Badge :variant="statusConfig[order.status].variant" class="gap-1">
                  <component :is="statusConfig[order.status].icon" :class="['h-3 w-3', statusConfig[order.status].color]" />
                  {{ statusConfig[order.status].label }}
                </Badge>
              </TableCell>
              <TableCell class="text-muted-foreground">{{ order.createdAt }}</TableCell>
              <TableCell class="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="ghost" size="icon"><MoreHorizontal class="h-4 w-4" /></Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem @click="handleViewDetail(order)">
                      <Eye class="mr-2 h-4 w-4" />查看详情
                    </DropdownMenuItem>
                    <template v-if="order.status === 'pending'">
                      <DropdownMenuItem @click="handlePay(order)">
                        <CreditCard class="mr-2 h-4 w-4" />去支付
                      </DropdownMenuItem>
                      <DropdownMenuItem class="text-destructive">
                        <X class="mr-2 h-4 w-4" />取消订单
                      </DropdownMenuItem>
                    </template>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>

    <!-- Payment Dialog -->
    <Dialog v-model:open="paymentDialogOpen">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>订单支付</DialogTitle>
          <DialogDescription>请完成网银Key认证后进行支付</DialogDescription>
        </DialogHeader>
        <div v-if="selectedOrder" class="space-y-4">
          <div class="rounded-lg border border-border p-4">
            <div class="flex justify-between"><span class="text-muted-foreground">订单号</span><span class="font-mono">{{ selectedOrder.id }}</span></div>
            <div class="mt-2 flex justify-between"><span class="text-muted-foreground">套餐</span><span>{{ selectedOrder.packageName }}</span></div>
            <div class="mt-2 flex justify-between"><span class="text-muted-foreground">金额</span><span class="text-lg font-bold">¥{{ selectedOrder.amount.toLocaleString() }}</span></div>
          </div>
          <div class="flex items-center gap-2 rounded-lg bg-muted p-3">
            <ShieldCheck class="h-4 w-4 text-muted-foreground" />
            <span class="text-sm text-muted-foreground">需要网银Key认证确认支付</span>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" @click="paymentDialogOpen = false">取消</Button>
          <Button @click="paymentDialogOpen = false">确认支付</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <!-- Detail Dialog -->
    <Dialog v-model:open="detailDialogOpen">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>订单详情</DialogTitle>
          <DialogDescription>查看订单详细信息</DialogDescription>
        </DialogHeader>
        <div v-if="selectedOrder" class="space-y-3">
          <div class="flex justify-between"><span class="text-muted-foreground">订单号</span><span class="font-mono">{{ selectedOrder.id }}</span></div>
          <div class="flex justify-between"><span class="text-muted-foreground">套餐名称</span><span>{{ selectedOrder.packageName }}</span></div>
          <div class="flex justify-between"><span class="text-muted-foreground">订单金额</span><span class="font-medium">¥{{ selectedOrder.amount.toLocaleString() }}</span></div>
          <div class="flex justify-between"><span class="text-muted-foreground">下单时间</span><span>{{ selectedOrder.createdAt }}</span></div>
          <div class="flex justify-between"><span class="text-muted-foreground">支付状态</span>
            <Badge :variant="statusConfig[selectedOrder.status].variant" class="gap-1">
              <component :is="statusConfig[selectedOrder.status].icon" :class="['h-3 w-3', statusConfig[selectedOrder.status].color]" />
              {{ statusConfig[selectedOrder.status].label }}
            </Badge>
          </div>
          <div v-if="selectedOrder.paidAt" class="flex justify-between"><span class="text-muted-foreground">支付时间</span><span>{{ selectedOrder.paidAt }}</span></div>
        </div>
        <DialogFooter><Button variant="outline" @click="detailDialogOpen = false">关闭</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
<!-- [AI_END LINES=177 TIMESTAMP=2025-06-15 12:00:00] -->

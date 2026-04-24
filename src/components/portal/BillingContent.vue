<!-- [AI_START TIMESTAMP=2025-06-15 12:00:00] -->
<script setup lang="ts">
import { ref, computed } from 'vue'
import Card from '@/components/ui/Card.vue'
import CardHeader from '@/components/ui/CardHeader.vue'
import CardTitle from '@/components/ui/CardTitle.vue'
import CardDescription from '@/components/ui/CardDescription.vue'
import CardContent from '@/components/ui/CardContent.vue'
import Button from '@/components/ui/Button.vue'
import Badge from '@/components/ui/Badge.vue'
import Tabs from '@/components/ui/Tabs.vue'
import TabsList from '@/components/ui/TabsList.vue'
import TabsTrigger from '@/components/ui/TabsTrigger.vue'
import TabsContent from '@/components/ui/TabsContent.vue'
import Progress from '@/components/ui/Progress.vue'
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
import {
  Download, FileText, Receipt, CreditCard, TrendingUp,
  AlertCircle, CheckCircle2, Clock, Building2,
} from 'lucide-vue-next'

const bills = [
  { id: 'BILL202403', month: '2024年3月', amount: 12997, status: 'unpaid', dueDate: '2024-04-15', items: [{ name: 'GPT-4 企业版', amount: 5999 }, { name: 'Embedding 基础版', amount: 999 }, { name: '超量调用费用', amount: 5999 }] },
  { id: 'BILL202402', month: '2024年2月', amount: 6998, status: 'paid', paidAt: '2024-03-10', items: [{ name: 'GPT-4 企业版', amount: 5999 }, { name: 'Embedding 基础版', amount: 999 }] },
  { id: 'BILL202401', month: '2024年1月', amount: 5999, status: 'paid', paidAt: '2024-02-08', items: [{ name: 'GPT-4 企业版', amount: 5999 }] },
]

const usageStats = [
  { package: 'GPT-4 企业版', quota: 200000, used: 189456, overage: 0, overagePrice: 0.05 },
  { package: 'Embedding 基础版', quota: 100000, used: 78000, overage: 0, overagePrice: 0.01 },
  { package: 'Claude 基础版', quota: 50000, used: 62000, overage: 12000, overagePrice: 0.08 },
]

const invoices = [
  { id: 'INV202403001', billId: 'BILL202402', type: '增值税专用发票', amount: 6998, status: 'issued', issuedAt: '2024-03-15' },
  { id: 'INV202402001', billId: 'BILL202401', type: '增值税专用发票', amount: 5999, status: 'issued', issuedAt: '2024-02-20' },
]

const invoiceDialogOpen = ref(false)
const billDetailOpen = ref(false)
const selectedBill = ref<typeof bills[0] | null>(null)

function handleViewBill(bill: typeof bills[0]) {
  selectedBill.value = bill
  billDetailOpen.value = true
}

const totalUnpaid = computed(() => bills.filter((b) => b.status === 'unpaid').reduce((acc, b) => acc + b.amount, 0))
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-2xl font-semibold text-foreground">账单与计费</h2>
      <p class="text-muted-foreground">查看账单、用量统计和发票管理</p>
    </div>

    <div class="grid gap-4 md:grid-cols-4">
      <Card>
        <CardHeader class="pb-2"><CardTitle class="text-sm font-medium text-muted-foreground">待支付账单</CardTitle></CardHeader>
        <CardContent>
          <div class="text-2xl font-bold text-destructive">¥{{ totalUnpaid.toLocaleString() }}</div>
          <p class="text-xs text-muted-foreground">{{ bills.filter((b) => b.status === 'unpaid').length }} 笔待支付</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader class="pb-2"><CardTitle class="text-sm font-medium text-muted-foreground">本月消费</CardTitle></CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">¥12,997</div>
          <div class="flex items-center text-xs text-muted-foreground"><TrendingUp class="mr-1 h-3 w-3 text-green-500" />较上月 +85%</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader class="pb-2"><CardTitle class="text-sm font-medium text-muted-foreground">累计消费</CardTitle></CardHeader>
        <CardContent><div class="text-2xl font-bold">¥25,994</div><p class="text-xs text-muted-foreground">自 2024 年起</p></CardContent>
      </Card>
      <Card>
        <CardHeader class="pb-2"><CardTitle class="text-sm font-medium text-muted-foreground">账户余额</CardTitle></CardHeader>
        <CardContent><div class="text-2xl font-bold text-green-600">¥5,000</div><Button variant="link" class="h-auto p-0 text-xs">充值</Button></CardContent>
      </Card>
    </div>

    <Tabs default-value="bills" class="space-y-4">
      <TabsList>
        <TabsTrigger value="bills">我的账单</TabsTrigger>
        <TabsTrigger value="usage">用量统计</TabsTrigger>
        <TabsTrigger value="invoices">发票管理</TabsTrigger>
      </TabsList>

      <TabsContent value="bills">
        <Card>
          <CardHeader><CardTitle>账单列表</CardTitle><CardDescription>按月查看消费明细</CardDescription></CardHeader>
          <CardContent>
            <Table>
              <TableHeader><TableRow><TableHead>账单月份</TableHead><TableHead>账单编号</TableHead><TableHead>应付金额</TableHead><TableHead>支付状态</TableHead><TableHead class="text-right">操作</TableHead></TableRow></TableHeader>
              <TableBody>
                <TableRow v-for="bill in bills" :key="bill.id">
                  <TableCell class="font-medium">{{ bill.month }}</TableCell>
                  <TableCell class="font-mono text-sm">{{ bill.id }}</TableCell>
                  <TableCell class="font-medium">¥{{ bill.amount.toLocaleString() }}</TableCell>
                  <TableCell>
                    <Badge v-if="bill.status === 'paid'" variant="outline" class="gap-1"><CheckCircle2 class="h-3 w-3 text-green-500" />已支付</Badge>
                    <Badge v-else variant="outline" class="gap-1"><Clock class="h-3 w-3 text-yellow-500" />待支付</Badge>
                  </TableCell>
                  <TableCell class="text-right">
                    <div class="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" @click="handleViewBill(bill)">查看</Button>
                      <Button variant="ghost" size="sm"><Download class="mr-1 h-3 w-3" />下载</Button>
                      <Button v-if="bill.status === 'unpaid'" size="sm">去支付</Button>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="usage">
        <Card>
          <CardHeader><CardTitle>用量统计</CardTitle><CardDescription>各套餐额度使用情况</CardDescription></CardHeader>
          <CardContent class="space-y-6">
            <div v-for="stat in usageStats" :key="stat.package" class="space-y-3">
              <div class="flex items-center justify-between">
                <div>
                  <p class="font-medium">{{ stat.package }}</p>
                  <p class="text-sm text-muted-foreground">已用 {{ stat.used.toLocaleString() }} / 额度 {{ stat.quota.toLocaleString() }} 次</p>
                </div>
                <Badge v-if="stat.overage > 0" variant="outline" class="gap-1"><AlertCircle class="h-3 w-3 text-red-500" />超量 {{ stat.overage.toLocaleString() }} 次</Badge>
              </div>
              <Progress :value="Math.min(Math.round((stat.used / stat.quota) * 100), 100)" />
              <p v-if="stat.overage > 0" class="text-xs text-destructive">超量费用：¥{{ (stat.overage * stat.overagePrice).toLocaleString() }}</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="invoices">
        <Card>
          <CardHeader>
            <div class="flex items-center justify-between">
              <div><CardTitle>发票管理</CardTitle><CardDescription>查看和管理开票记录</CardDescription></div>
              <Button @click="invoiceDialogOpen = true"><FileText class="mr-2 h-4 w-4" />申请开票</Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader><TableRow><TableHead>发票编号</TableHead><TableHead>发票类型</TableHead><TableHead>金额</TableHead><TableHead>状态</TableHead><TableHead>开具日期</TableHead></TableRow></TableHeader>
              <TableBody>
                <TableRow v-for="inv in invoices" :key="inv.id">
                  <TableCell class="font-mono text-sm">{{ inv.id }}</TableCell>
                  <TableCell>{{ inv.type }}</TableCell>
                  <TableCell class="font-medium">¥{{ inv.amount.toLocaleString() }}</TableCell>
                  <TableCell><Badge variant="outline" class="gap-1"><CheckCircle2 class="h-3 w-3 text-green-500" />已开具</Badge></TableCell>
                  <TableCell class="text-muted-foreground">{{ inv.issuedAt }}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>

    <!-- Bill Detail Dialog -->
    <Dialog v-model:open="billDetailOpen">
      <DialogContent>
        <DialogHeader><DialogTitle>账单详情</DialogTitle><DialogDescription>{{ selectedBill?.month }} 账单明细</DialogDescription></DialogHeader>
        <div v-if="selectedBill" class="space-y-3">
          <div v-for="item in selectedBill.items" :key="item.name" class="flex justify-between">
            <span>{{ item.name }}</span><span class="font-medium">¥{{ item.amount.toLocaleString() }}</span>
          </div>
          <div class="border-t pt-2 flex justify-between font-bold"><span>合计</span><span>¥{{ selectedBill.amount.toLocaleString() }}</span></div>
        </div>
        <DialogFooter><Button variant="outline" @click="billDetailOpen = false">关闭</Button></DialogFooter>
      </DialogContent>
    </Dialog>

    <!-- Invoice Dialog -->
    <Dialog v-model:open="invoiceDialogOpen">
      <DialogContent>
        <DialogHeader><DialogTitle>申请开票</DialogTitle><DialogDescription>选择需要开具发票的账单</DialogDescription></DialogHeader>
        <div class="space-y-3">
          <div v-for="bill in bills.filter(b => b.status === 'paid')" :key="bill.id" class="flex items-center justify-between rounded-lg border p-3">
            <div><p class="font-medium">{{ bill.month }}</p><p class="text-sm text-muted-foreground">¥{{ bill.amount.toLocaleString() }}</p></div>
            <Button size="sm" variant="outline">选择</Button>
          </div>
        </div>
        <DialogFooter><Button variant="outline" @click="invoiceDialogOpen = false">取消</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
<!-- [AI_END LINES=143 TIMESTAMP=2025-06-15 12:00:00] -->

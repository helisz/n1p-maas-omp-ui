<!-- [AI_START TIMESTAMP=2025-06-16 08:00:00] -->
<script setup lang="ts">
import { ref } from 'vue'
import Card from '@/components/ui/Card.vue'
import CardHeader from '@/components/ui/CardHeader.vue'
import CardTitle from '@/components/ui/CardTitle.vue'
import CardDescription from '@/components/ui/CardDescription.vue'
import CardContent from '@/components/ui/CardContent.vue'
import Button from '@/components/ui/Button.vue'
import Badge from '@/components/ui/Badge.vue'
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
import Input from '@/components/ui/Input.vue'
import Label from '@/components/ui/Label.vue'
import {
  Wallet, Plus, History, ShieldCheck, AlertTriangle,
  CheckCircle2, Clock, XCircle, ArrowUpRight, ArrowDownRight,
  ExternalLink, TrendingUp, CircleDollarSign, Activity,
} from 'lucide-vue-next'

// Wallet state
const balance = ref(12850.50)

// Recharge dialog
const rechargeOpen = ref(false)
const rechargeAmount = ref('')
const rechargeSubmitting = ref(false)

// Demo transaction records
const transactions = ref([
  { id: 'TXN20240315001', time: '2024-03-15 14:32:18', type: '充值', amount: 5000.00, balanceChange: '+5,000.00', balanceAfter: 12850.50, status: 'success' },
  { id: 'TXN20240312001', time: '2024-03-12 09:15:03', type: '消费', amount: -1299.00, balanceChange: '-1,299.00', balanceAfter: 7850.50, status: 'success' },
  { id: 'TXN20240310001', time: '2024-03-10 16:45:22', type: '消费', amount: -3700.00, balanceChange: '-3,700.00', balanceAfter: 9149.50, status: 'success' },
  { id: 'TXN20240308001', time: '2024-03-08 11:20:55', type: '充值', amount: 10000.00, balanceChange: '+10,000.00', balanceAfter: 12849.50, status: 'success' },
  { id: 'TXN20240305001', time: '2024-03-05 08:30:10', type: '退款', amount: 500.00, balanceChange: '+500.00', balanceAfter: 2849.50, status: 'success' },
  { id: 'TXN20240302001', time: '2024-03-02 17:12:40', type: '充值', amount: 3000.00, balanceChange: '+3,000.00', balanceAfter: 2349.50, status: 'pending' },
  { id: 'TXN20240228001', time: '2024-02-28 13:05:33', type: '消费', amount: -650.00, balanceChange: '-650.00', balanceAfter: -650.50, status: 'failed' },
])

const spendingStats = [
  { label: '模型调用', value: 4230.50, percent: 58 },
  { label: '套餐订购', value: 1999.00, percent: 27 },
  { label: '增值服务', value: 720.00, percent: 10 },
  { label: '其他', value: 350.00, percent: 5 },
]

function getStatusBadge(status: string) {
  switch (status) {
    case 'success':
      return { label: '成功', variant: 'outline' as const, icon: CheckCircle2, class: 'text-green-500' }
    case 'pending':
      return { label: '处理中', variant: 'outline' as const, icon: Clock, class: 'text-yellow-500' }
    case 'failed':
      return { label: '失败', variant: 'outline' as const, icon: XCircle, class: 'text-red-500' }
    default:
      return { label: status, variant: 'outline' as const, icon: Clock, class: '' }
  }
}

function formatCredit(val: number): string {
  return val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

async function handleRecharge() {
  if (!rechargeAmount.value || Number(rechargeAmount.value) <= 0) return
  rechargeSubmitting.value = true
  // Simulate payment gateway redirect
  await new Promise((r) => setTimeout(r, 1500))
  rechargeSubmitting.value = false
  rechargeOpen.value = false
  // In production, this would redirect to payment gateway
  alert('即将跳转至支付网关…（演示模式）')
}
</script>

<template>
  <div class="space-y-8">
    <!-- Page Title -->
    <div>
      <h2 class="text-2xl font-semibold text-foreground">智信钱包</h2>
      <p class="mt-1 text-muted-foreground">管理您的账户余额、充值与交易记录</p>
    </div>

    <!-- Balance Overview -->
    <div class="grid gap-5 lg:grid-cols-3">
      <div class="lg:col-span-1 relative overflow-hidden rounded-xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 text-white shadow-lg">
        <!-- Card texture decorations -->
        <div class="pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white/[0.07]" />
        <div class="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-white/[0.05]" />
        <div class="pointer-events-none absolute -left-4 bottom-8 h-20 w-20 rounded-full bg-white/[0.04]" />
        <!-- Diagonal stripe pattern -->
        <div class="pointer-events-none absolute inset-0 opacity-[0.03]" style="background: repeating-linear-gradient(135deg, transparent, transparent 20px, white 20px, white 21px);" />
        <!-- Chip icon -->
        <div class="pointer-events-none absolute right-5 top-5 h-8 w-8 rounded-md bg-gradient-to-br from-amber-400/30 to-amber-600/30 ring-1 ring-amber-400/20" />

        <div class="relative z-10">
          <div class="text-sm font-medium text-slate-300">账户余额</div>
          <div class="mt-4">
            <div class="text-3xl font-bold tracking-tight text-white">{{ formatCredit(balance) }}</div>
            <div class="mt-1 text-xs text-slate-400">Credits</div>
          </div>
          <Button class="mt-6 w-full gap-2 bg-white text-slate-900 hover:bg-slate-100" @click="rechargeOpen = true">
            <Plus class="h-4 w-4" />
            充值
          </Button>
        </div>
      </div>

      <Card class="lg:col-span-2">
        <CardHeader class="pb-3">
          <CardTitle class="flex items-center gap-2 text-base">
            <TrendingUp class="h-4 w-4 text-primary" />
            本月消费构成
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div class="grid gap-4 sm:grid-cols-2">
            <div v-for="item in spendingStats" :key="item.label" class="space-y-2">
              <div class="flex items-center justify-between text-sm">
                <span class="text-muted-foreground">{{ item.label }}</span>
                <span class="font-medium text-foreground">{{ formatCredit(item.value) }}</span>
              </div>
              <div class="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  class="h-full rounded-full bg-primary transition-all"
                  :style="{ width: item.percent + '%' }"
                />
              </div>
              <div class="text-right text-xs text-muted-foreground">{{ item.percent }}%</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Quick Stats -->
    <div class="grid gap-5 md:grid-cols-3">
      <Card>
        <CardContent class="flex items-center gap-4 p-5">
          <div class="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <CircleDollarSign class="h-5 w-5" />
          </div>
          <div>
            <div class="text-xs text-muted-foreground">本月充值</div>
            <div class="flex items-center gap-1 text-lg font-semibold text-emerald-600">
              <ArrowUpRight class="h-4 w-4" />
              +18,000.00
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent class="flex items-center gap-4 p-5">
          <div class="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-rose-600">
            <Activity class="h-5 w-5" />
          </div>
          <div>
            <div class="text-xs text-muted-foreground">本月消费</div>
            <div class="flex items-center gap-1 text-lg font-semibold text-rose-600">
              <ArrowDownRight class="h-4 w-4" />
              -5,649.50
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent class="flex items-center gap-4 p-5">
          <div class="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
            <Wallet class="h-5 w-5" />
          </div>
          <div>
            <div class="text-xs text-muted-foreground">累计充值</div>
            <div class="text-lg font-semibold text-foreground">48,000.00</div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Transaction History -->
    <Card>
      <CardHeader>
        <div class="flex items-center justify-between">
          <div>
            <CardTitle class="flex items-center gap-2">
              <History class="h-5 w-5 text-primary" />
              交易记录
            </CardTitle>
            <CardDescription>查看历史充值、消费与退款明细</CardDescription>
          </div>
          <Button variant="outline" size="sm" class="gap-1">
            <ExternalLink class="h-3.5 w-3.5" />
            导出记录
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>交易时间</TableHead>
              <TableHead>交易类型</TableHead>
              <TableHead>交易金额</TableHead>
              <TableHead>余额变动</TableHead>
              <TableHead>交易状态</TableHead>
              <TableHead class="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="tx in transactions" :key="tx.id">
              <TableCell class="text-sm text-muted-foreground">{{ tx.time }}</TableCell>
              <TableCell>
                <div class="flex items-center gap-1.5">
                  <ArrowUpRight v-if="tx.amount > 0" class="h-4 w-4 text-green-500" />
                  <ArrowDownRight v-else class="h-4 w-4 text-red-500" />
                  <span class="font-medium">{{ tx.type }}</span>
                </div>
              </TableCell>
              <TableCell>
                <span :class="tx.amount > 0 ? 'text-green-600 font-medium' : 'text-destructive font-medium'">
                  {{ tx.amount > 0 ? '+' : '' }}{{ formatCredit(Math.abs(tx.amount)) }}
                </span>
              </TableCell>
              <TableCell>
                <span :class="tx.balanceChange.startsWith('+') ? 'text-green-600' : 'text-destructive'">
                  {{ tx.balanceChange }}
                </span>
              </TableCell>
              <TableCell>
                <Badge
                  :variant="getStatusBadge(tx.status).variant"
                  class="gap-1"
                >
                  <component :is="getStatusBadge(tx.status).icon" :class="['h-3 w-3', getStatusBadge(tx.status).class]" />
                  {{ getStatusBadge(tx.status).label }}
                </Badge>
              </TableCell>
              <TableCell class="text-right">
                <Button variant="ghost" size="sm">详情</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>

    <!-- Security Tips -->
    <Card class="border-amber-200 bg-amber-50/50 dark:border-amber-800 dark:bg-amber-950/20">
      <CardHeader class="pb-3">
        <CardTitle class="flex items-center gap-2 text-base">
          <ShieldCheck class="h-5 w-5 text-amber-600" />
          安全提示
        </CardTitle>
      </CardHeader>
      <CardContent class="space-y-3 text-sm text-muted-foreground">
        <div class="flex items-start gap-2">
          <AlertTriangle class="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
          <p>账户资金仅用于本平台 MaaS 套餐订购、服务续费，不支持其他用途</p>
        </div>
        <div class="flex items-start gap-2">
          <AlertTriangle class="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
          <p>所有充值、消费操作均需中信网银 Key 认证，且全程留痕，可在「<router-link to="/audit" class="font-medium text-primary hover:underline">操作审计</router-link>」中查询</p>
        </div>
        <div class="flex items-start gap-2">
          <AlertTriangle class="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
          <p>若有资金异常，请立即联系客服：<span class="font-medium text-foreground">400-XXXX-XXXX</span></p>
        </div>
      </CardContent>
    </Card>

    <!-- Recharge Dialog -->
    <Dialog v-model:open="rechargeOpen">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>账户充值</DialogTitle>
          <DialogDescription>选择充值金额，确认后将跳转至支付网关</DialogDescription>
        </DialogHeader>
        <div class="space-y-4">
          <!-- Quick amounts -->
          <div>
            <Label class="mb-2 block">快捷金额</Label>
            <div class="grid grid-cols-4 gap-2">
              <Button
                v-for="amt in [500, 1000, 5000, 10000]"
                :key="amt"
                variant="outline"
                size="sm"
                @click="rechargeAmount = String(amt)"
                :class="rechargeAmount === String(amt) ? 'border-primary bg-primary/5' : ''"
              >
                {{ amt.toLocaleString() }}
              </Button>
            </div>
          </div>
          <!-- Custom amount -->
          <div class="space-y-1.5">
            <Label for="recharge-amount">自定义金额（Credit）</Label>
            <Input
              id="recharge-amount"
              type="number"
              v-model="rechargeAmount"
              placeholder="请输入充值金额"
              min="1"
            />
          </div>
          <!-- Summary -->
          <div v-if="rechargeAmount && Number(rechargeAmount) > 0" class="space-y-1 rounded-lg bg-muted/50 p-3 text-sm">
            <div class="flex justify-between">
              <span class="text-muted-foreground">充值金额</span>
              <span class="font-medium">{{ formatCredit(Number(rechargeAmount)) }} Credit</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">充值后余额</span>
              <span class="font-medium">{{ formatCredit(balance + Number(rechargeAmount)) }} Credit</span>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" @click="rechargeOpen = false">取消</Button>
          <Button
            :disabled="!rechargeAmount || Number(rechargeAmount) <= 0 || rechargeSubmitting"
            @click="handleRecharge"
          >
            {{ rechargeSubmitting ? '处理中…' : '确认充值' }}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
<!-- [AI_END LINES=290 TIMESTAMP=2025-06-16 08:00:00] -->


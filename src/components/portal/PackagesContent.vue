<!-- [AI_START TIMESTAMP=2025-06-20 06:40:00] -->
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
import { Search, Package, CheckCircle2, XCircle, Eye, Edit, Power } from 'lucide-vue-next'

const packages = [
  { id: 'pkg-basic', name: '基础版', type: '按月', price: 1999, status: 'online', createdAt: '2024-01-15', orders: 45, revenue: 89955 },
  { id: 'pkg-advanced', name: '高级版', type: '按月', price: 5999, status: 'online', createdAt: '2024-01-15', orders: 32, revenue: 191968 },
  { id: 'pkg-premium', name: '尊享版', type: '按月', price: 19999, status: 'online', createdAt: '2024-01-15', orders: 12, revenue: 239988 },
  { id: 'pkg-annual', name: '企业年包', type: '按年', price: 59999, status: 'offline', createdAt: '2024-02-01', orders: 3, revenue: 179997 },
]

const statusConfig: Record<string, { label: string; variant: 'default' | 'outline' | 'secondary' | 'destructive'; icon: typeof CheckCircle2; class: string }> = {
  online: { label: '已上线', variant: 'outline', icon: CheckCircle2, class: 'text-green-500' },
  offline: { label: '已下线', variant: 'secondary', icon: XCircle, class: 'text-muted-foreground' },
}

const searchQuery = ref('')
const detailOpen = ref(false)
const selectedPackage = ref<typeof packages[0] | null>(null)

const filteredPackages = computed(() =>
  packages.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
)

function handleViewDetail(pkg: typeof packages[0]) {
  selectedPackage.value = pkg
  detailOpen.value = true
}

const stats = computed(() => ({
  total: packages.length,
  online: packages.filter((p) => p.status === 'online').length,
  totalOrders: packages.reduce((acc, p) => acc + p.orders, 0),
  totalRevenue: packages.reduce((acc, p) => acc + p.revenue, 0),
}))
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-2xl font-semibold text-foreground">套餐管理</h2>
      <p class="text-muted-foreground">管理平台服务套餐的定价、状态与销售数据</p>
    </div>

    <div class="grid gap-4 md:grid-cols-4">
      <Card>
        <CardHeader class="pb-2"><CardTitle class="text-sm font-medium text-muted-foreground">套餐总数</CardTitle></CardHeader>
        <CardContent><div class="text-2xl font-bold">{{ stats.total }}</div></CardContent>
      </Card>
      <Card>
        <CardHeader class="pb-2"><CardTitle class="text-sm font-medium text-muted-foreground">已上线</CardTitle></CardHeader>
        <CardContent><div class="text-2xl font-bold text-green-600">{{ stats.online }}</div></CardContent>
      </Card>
      <Card>
        <CardHeader class="pb-2"><CardTitle class="text-sm font-medium text-muted-foreground">累计订购</CardTitle></CardHeader>
        <CardContent><div class="text-2xl font-bold">{{ stats.totalOrders }}</div></CardContent>
      </Card>
      <Card>
        <CardHeader class="pb-2"><CardTitle class="text-sm font-medium text-muted-foreground">累计收入</CardTitle></CardHeader>
        <CardContent><div class="text-2xl font-bold">¥{{ stats.totalRevenue.toLocaleString() }}</div></CardContent>
      </Card>
    </div>

    <Card>
      <CardHeader>
        <div class="flex items-center justify-between">
          <CardTitle>套餐列表</CardTitle>
          <div class="relative">
            <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input v-model="searchQuery" placeholder="搜索套餐..." class="w-64 pl-8" />
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
              <TableCell>¥{{ pkg.price.toLocaleString() }}/{{ pkg.type === '按年' ? '年' : '月' }}</TableCell>
              <TableCell>
                <Badge :variant="statusConfig[pkg.status].variant" class="gap-1">
                  <component :is="statusConfig[pkg.status].icon" :class="['h-3 w-3', statusConfig[pkg.status].class]" />
                  {{ statusConfig[pkg.status].label }}
                </Badge>
              </TableCell>
              <TableCell class="text-muted-foreground">{{ pkg.createdAt }}</TableCell>
              <TableCell>{{ pkg.orders }}</TableCell>
              <TableCell>¥{{ pkg.revenue.toLocaleString() }}</TableCell>
              <TableCell class="text-right">
                <div class="flex justify-end gap-2">
                  <Button variant="ghost" size="sm" @click="handleViewDetail(pkg)"><Eye class="mr-1 h-3 w-3" />详情</Button>
                  <Button variant="ghost" size="sm"><Edit class="mr-1 h-3 w-3" />编辑</Button>
                  <Button variant="ghost" size="sm"><Power class="mr-1 h-3 w-3" />{{ pkg.status === 'online' ? '下线' : '上线' }}</Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>

    <Dialog v-model:open="detailOpen">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>套餐详情</DialogTitle>
          <DialogDescription>查看套餐详细配置信息</DialogDescription>
        </DialogHeader>
        <div v-if="selectedPackage" class="space-y-3">
          <div class="flex justify-between"><span class="text-muted-foreground">套餐名称</span><span class="font-medium">{{ selectedPackage.name }}</span></div>
          <div class="flex justify-between"><span class="text-muted-foreground">套餐ID</span><span class="font-mono">{{ selectedPackage.id }}</span></div>
          <div class="flex justify-between"><span class="text-muted-foreground">计费类型</span><span>{{ selectedPackage.type }}</span></div>
          <div class="flex justify-between"><span class="text-muted-foreground">价格</span><span>¥{{ selectedPackage.price.toLocaleString() }}</span></div>
          <div class="flex justify-between"><span class="text-muted-foreground">状态</span>
            <Badge :variant="statusConfig[selectedPackage.status].variant" class="gap-1">
              <component :is="statusConfig[selectedPackage.status].icon" :class="['h-3 w-3', statusConfig[selectedPackage.status].class]" />
              {{ statusConfig[selectedPackage.status].label }}
            </Badge>
          </div>
          <div class="flex justify-between"><span class="text-muted-foreground">创建时间</span><span>{{ selectedPackage.createdAt }}</span></div>
          <div class="flex justify-between"><span class="text-muted-foreground">累计订购</span><span>{{ selectedPackage.orders }} 笔</span></div>
          <div class="flex justify-between"><span class="text-muted-foreground">收入贡献</span><span>¥{{ selectedPackage.revenue.toLocaleString() }}</span></div>
        </div>
        <DialogFooter><Button variant="outline" @click="detailOpen = false">关闭</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
<!-- [AI_END LINES=130 TIMESTAMP=2025-06-20 06:40:00] -->

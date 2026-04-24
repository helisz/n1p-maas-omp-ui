<!-- [AI_START TIMESTAMP=2025-06-20 06:45:00] -->
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
import {
  Search, Building2, CheckCircle2, Clock, XCircle,
  Eye, ShieldCheck, Lock,
} from 'lucide-vue-next'

const enterprises = [
  { id: 'ENT001', name: '华为云科技', creditCode: '91110108MA01XXXX01', contact: '张三', phone: '138****8888', email: 'admin@huawei.com', status: 'verified', registeredAt: '2024-01-15', uKeyBound: true },
  { id: 'ENT002', name: '阿里云数', creditCode: '91110108MA01XXXX02', contact: '李四', phone: '139****6666', email: 'admin@aliyun.com', status: 'verified', registeredAt: '2024-02-01', uKeyBound: true },
  { id: 'ENT003', name: '腾讯云智', creditCode: '91110108MA01XXXX03', contact: '王五', phone: '137****9999', email: 'admin@tencent.com', status: 'pending', registeredAt: '2024-03-10', uKeyBound: false },
  { id: 'ENT004', name: '百度智能', creditCode: '91110108MA01XXXX04', contact: '赵六', phone: '136****5555', email: 'admin@baidu.com', status: 'verified', registeredAt: '2024-01-20', uKeyBound: true },
  { id: 'ENT005', name: '字节跳动', creditCode: '91110108MA01XXXX05', contact: '孙七', phone: '135****7777', email: 'admin@bytedance.com', status: 'frozen', registeredAt: '2024-02-15', uKeyBound: true },
]

const statusConfig: Record<string, { label: string; variant: 'default' | 'outline' | 'secondary' | 'destructive'; icon: typeof CheckCircle2; color: string }> = {
  verified: { label: '已认证', variant: 'outline', icon: CheckCircle2, color: 'text-green-500' },
  pending: { label: '待审核', variant: 'outline', icon: Clock, color: 'text-yellow-500' },
  frozen: { label: '已冻结', variant: 'secondary', icon: XCircle, color: 'text-red-500' },
}

const searchQuery = ref('')
const detailOpen = ref(false)
const selectedEnterprise = ref<typeof enterprises[0] | null>(null)

const filteredEnterprises = computed(() =>
  enterprises.filter(
    (e) =>
      e.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      e.creditCode.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      e.contact.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
)

function handleViewDetail(ent: typeof enterprises[0]) {
  selectedEnterprise.value = ent
  detailOpen.value = true
}

const stats = computed(() => ({
  total: enterprises.length,
  verified: enterprises.filter((e) => e.status === 'verified').length,
  pending: enterprises.filter((e) => e.status === 'pending').length,
  frozen: enterprises.filter((e) => e.status === 'frozen').length,
}))
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-2xl font-semibold text-foreground">企业客户</h2>
      <p class="text-muted-foreground">管理平台所有企业客户与认证状态</p>
    </div>

    <div class="grid gap-4 md:grid-cols-4">
      <Card>
        <CardHeader class="pb-2"><CardTitle class="text-sm font-medium text-muted-foreground">总客户数</CardTitle></CardHeader>
        <CardContent><div class="text-2xl font-bold">{{ stats.total }}</div></CardContent>
      </Card>
      <Card>
        <CardHeader class="pb-2"><CardTitle class="text-sm font-medium text-muted-foreground">已认证</CardTitle></CardHeader>
        <CardContent><div class="text-2xl font-bold text-green-600">{{ stats.verified }}</div></CardContent>
      </Card>
      <Card>
        <CardHeader class="pb-2"><CardTitle class="text-sm font-medium text-muted-foreground">待审核</CardTitle></CardHeader>
        <CardContent><div class="text-2xl font-bold text-yellow-600">{{ stats.pending }}</div></CardContent>
      </Card>
      <Card>
        <CardHeader class="pb-2"><CardTitle class="text-sm font-medium text-muted-foreground">已冻结</CardTitle></CardHeader>
        <CardContent><div class="text-2xl font-bold text-red-600">{{ stats.frozen }}</div></CardContent>
      </Card>
    </div>

    <Card>
      <CardHeader>
        <div class="flex items-center justify-between">
          <CardTitle>企业列表</CardTitle>
          <div class="relative">
            <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input v-model="searchQuery" placeholder="搜索企业名称、统一信用代码或联系人..." class="w-80 pl-8" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>企业名称</TableHead>
              <TableHead>统一信用代码</TableHead>
              <TableHead>联系人</TableHead>
              <TableHead>联系电话</TableHead>
              <TableHead>认证状态</TableHead>
              <TableHead>网银Key</TableHead>
              <TableHead>注册时间</TableHead>
              <TableHead class="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="ent in filteredEnterprises" :key="ent.id">
              <TableCell class="font-medium">{{ ent.name }}</TableCell>
              <TableCell class="font-mono text-sm">{{ ent.creditCode }}</TableCell>
              <TableCell>{{ ent.contact }}</TableCell>
              <TableCell>{{ ent.phone }}</TableCell>
              <TableCell>
                <Badge :variant="statusConfig[ent.status].variant" class="gap-1">
                  <component :is="statusConfig[ent.status].icon" :class="['h-3 w-3', statusConfig[ent.status].color]" />
                  {{ statusConfig[ent.status].label }}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge v-if="ent.uKeyBound" variant="outline" class="gap-1">
                  <ShieldCheck class="h-3 w-3 text-green-500" />已绑定
                </Badge>
                <Badge v-else variant="outline" class="gap-1">
                  <Lock class="h-3 w-3 text-muted-foreground" />未绑定
                </Badge>
              </TableCell>
              <TableCell class="text-muted-foreground">{{ ent.registeredAt }}</TableCell>
              <TableCell class="text-right">
                <div class="flex justify-end gap-2">
                  <Button variant="ghost" size="sm" @click="handleViewDetail(ent)"><Eye class="mr-1 h-3 w-3" />详情</Button>
                  <Button v-if="ent.status === 'pending'" size="sm">审核</Button>
                  <Button v-if="ent.status === 'verified'" variant="ghost" size="sm" class="text-destructive">冻结</Button>
                  <Button v-if="ent.status === 'frozen'" variant="ghost" size="sm">解冻</Button>
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
          <DialogTitle>企业详情</DialogTitle>
          <DialogDescription>查看企业客户详细信息</DialogDescription>
        </DialogHeader>
        <div v-if="selectedEnterprise" class="space-y-3">
          <div class="flex justify-between"><span class="text-muted-foreground">企业名称</span><span class="font-medium">{{ selectedEnterprise.name }}</span></div>
          <div class="flex justify-between"><span class="text-muted-foreground">企业ID</span><span class="font-mono">{{ selectedEnterprise.id }}</span></div>
          <div class="flex justify-between"><span class="text-muted-foreground">统一信用代码</span><span class="font-mono">{{ selectedEnterprise.creditCode }}</span></div>
          <div class="flex justify-between"><span class="text-muted-foreground">联系人</span><span>{{ selectedEnterprise.contact }}</span></div>
          <div class="flex justify-between"><span class="text-muted-foreground">联系电话</span><span>{{ selectedEnterprise.phone }}</span></div>
          <div class="flex justify-between"><span class="text-muted-foreground">联系邮箱</span><span>{{ selectedEnterprise.email }}</span></div>
          <div class="flex justify-between"><span class="text-muted-foreground">认证状态</span>
            <Badge :variant="statusConfig[selectedEnterprise.status].variant" class="gap-1">
              <component :is="statusConfig[selectedEnterprise.status].icon" :class="['h-3 w-3', statusConfig[selectedEnterprise.status].color]" />
              {{ statusConfig[selectedEnterprise.status].label }}
            </Badge>
          </div>
          <div class="flex justify-between"><span class="text-muted-foreground">网银Key</span>
            <Badge v-if="selectedEnterprise.uKeyBound" variant="outline" class="gap-1">
              <ShieldCheck class="h-3 w-3 text-green-500" />已绑定
            </Badge>
            <Badge v-else variant="outline" class="gap-1">
              <Lock class="h-3 w-3 text-muted-foreground" />未绑定
            </Badge>
          </div>
          <div class="flex justify-between"><span class="text-muted-foreground">注册时间</span><span>{{ selectedEnterprise.registeredAt }}</span></div>
        </div>
        <DialogFooter><Button variant="outline" @click="detailOpen = false">关闭</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
<!-- [AI_END LINES=130 TIMESTAMP=2025-06-20 06:45:00] -->

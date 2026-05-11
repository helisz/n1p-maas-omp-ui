<!-- [AI_START TIMESTAMP=2025-07-16 06:20:00] -->
<script setup lang="ts">
import { ref, computed } from 'vue';
import { MagnifyingGlassIcon, EllipsisHorizontalIcon, EyeIcon, CheckCircleIcon, ExclamationTriangleIcon, XCircleIcon, ArrowPathIcon, BuildingOffice2Icon, CubeIcon, ShieldCheckIcon, PauseCircleIcon } from '@heroicons/vue/24/outline';

interface SubscribedPackage {
  id: string;
  enterpriseId: string;
  enterpriseName: string;
  packageName: string;
  packageType: string;
  amount: number;
  status: 'active' | 'expiring' | 'suspended' | 'expired';
  subscribeDate: string;
  expiryDate: string;
  usedCalls: number;
  totalCalls: number;
}

const subscriptions = ref<SubscribedPackage[]>([
  {
    id: 'sub-001',
    enterpriseId: 'ENT001',
    enterpriseName: '华为云科技',
    packageName: '企业尊享版',
    packageType: '按年',
    amount: 59999,
    status: 'active',
    subscribeDate: '2024-03-15',
    expiryDate: '2025-03-15',
    usedCalls: 450000,
    totalCalls: 1000000,
  },
  {
    id: 'sub-002',
    enterpriseId: 'ENT002',
    enterpriseName: '阿里云数',
    packageName: '专业版',
    packageType: '按年',
    amount: 29999,
    status: 'active',
    subscribeDate: '2024-02-01',
    expiryDate: '2025-02-01',
    usedCalls: 280000,
    totalCalls: 500000,
  },
  {
    id: 'sub-003',
    enterpriseId: 'ENT001',
    enterpriseName: '华为云科技',
    packageName: '旗舰版',
    packageType: '按月',
    amount: 9999,
    status: 'expiring',
    subscribeDate: '2024-01-15',
    expiryDate: '2024-12-31',
    usedCalls: 180000,
    totalCalls: 200000,
  },
  {
    id: 'sub-004',
    enterpriseId: 'ENT004',
    enterpriseName: '百度智能',
    packageName: '基础版',
    packageType: '按月',
    amount: 1999,
    status: 'suspended',
    subscribeDate: '2024-03-01',
    expiryDate: '2024-09-01',
    usedCalls: 12000,
    totalCalls: 100000,
  },
  {
    id: 'sub-005',
    enterpriseId: 'ENT002',
    enterpriseName: '阿里云数',
    packageName: '高级版',
    packageType: '按年',
    amount: 59999,
    status: 'expired',
    subscribeDate: '2023-06-01',
    expiryDate: '2024-06-01',
    usedCalls: 500000,
    totalCalls: 500000,
  },
  {
    id: 'sub-006',
    enterpriseId: 'ENT005',
    enterpriseName: '字节跳动',
    packageName: '企业尊享版',
    packageType: '按年',
    amount: 59999,
    status: 'active',
    subscribeDate: '2024-04-01',
    expiryDate: '2025-04-01',
    usedCalls: 120000,
    totalCalls: 1000000,
  },
  {
    id: 'sub-007',
    enterpriseId: 'ENT004',
    enterpriseName: '百度智能',
    packageName: '专业版',
    packageType: '按年',
    amount: 29999,
    status: 'active',
    subscribeDate: '2024-05-15',
    expiryDate: '2025-05-15',
    usedCalls: 85000,
    totalCalls: 500000,
  },
  {
    id: 'sub-008',
    enterpriseId: 'ENT001',
    enterpriseName: '华为云科技',
    packageName: '体验版',
    packageType: '按月',
    amount: 0,
    status: 'expiring',
    subscribeDate: '2024-08-01',
    expiryDate: '2024-11-01',
    usedCalls: 8200,
    totalCalls: 10000,
  },
]);

const statusConfig: Record<
  string,
  {
    label: string;
    variant: 'default' | 'outline' | 'secondary' | 'destructive';
    icon: typeof CheckCircleIcon;
    colorClass: string;
  }
> = {
  active: {
    label: '运行中',
    variant: 'outline',
    icon: CheckCircleIcon,
    colorClass: 'text-green-500',
  },
  expiring: {
    label: '即将到期',
    variant: 'outline',
    icon: ExclamationTriangleIcon,
    colorClass: 'text-yellow-500',
  },
  suspended: {
    label: '已暂停',
    variant: 'secondary',
    icon: PauseCircleIcon,
    colorClass: 'text-muted-foreground',
  },
  expired: {
    label: '已过期',
    variant: 'outline',
    icon: XCircleIcon,
    colorClass: 'text-red-500',
  },
};

const searchQuery = ref('');
const statusFilter = ref<string>('all');

const filteredSubscriptions = computed(() => {
  return subscriptions.value.filter((sub) => {
    const matchSearch = sub.enterpriseName.toLowerCase().includes(searchQuery.value.toLowerCase()) || sub.packageName.toLowerCase().includes(searchQuery.value.toLowerCase()) || sub.id.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchStatus = statusFilter.value === 'all' || sub.status === statusFilter.value;
    return matchSearch && matchStatus;
  });
});

const stats = computed(() => {
  const all = subscriptions.value;
  const activeSubs = all.filter((s) => s.status === 'active');
  return {
    total: all.length,
    active: activeSubs.length,
    expiring: all.filter((s) => s.status === 'expiring').length,
    suspended: all.filter((s) => s.status === 'suspended').length,
    totalRevenue: activeSubs.reduce((acc, s) => acc + s.amount, 0),
  };
});

const detailDialogOpen = ref(false);
const selectedSubscription = ref<SubscribedPackage | null>(null);
const confirmActionDialogOpen = ref(false);
const confirmActionType = ref<'suspend' | 'resume' | 'renew' | null>(null);

function handleViewDetail(sub: SubscribedPackage) {
  selectedSubscription.value = sub;
  detailDialogOpen.value = true;
}

function handleConfirmAction(sub: SubscribedPackage, action: 'suspend' | 'resume' | 'renew') {
  selectedSubscription.value = sub;
  confirmActionType.value = action;
  confirmActionDialogOpen.value = true;
}

function executeConfirmAction() {
  confirmActionDialogOpen.value = false;
  confirmActionType.value = null;
  selectedSubscription.value = null;
}

const actionLabels: Record<string, string> = {
  suspend: '暂停订阅',
  resume: '恢复订阅',
  renew: '续费订阅',
};

function usagePercent(sub: SubscribedPackage): number {
  return Math.round((sub.usedCalls / sub.totalCalls) * 100);
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h2 class="text-foreground text-2xl font-semibold">已订购服务管理</h2>
      <p class="text-muted-foreground">查看和管理所有企业客户的套餐订购与使用情况</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid gap-4 md:grid-cols-5">
      <Card>
        <CardHeader class="pb-2"><CardTitle class="text-muted-foreground text-sm font-medium">全部订阅</CardTitle></CardHeader>
        <CardContent
          ><div class="text-2xl font-bold">{{ stats.total }}</div></CardContent
        >
      </Card>
      <Card>
        <CardHeader class="pb-2"><CardTitle class="text-muted-foreground text-sm font-medium">运行中</CardTitle></CardHeader>
        <CardContent>
          <div class="flex items-center gap-2">
            <div class="text-2xl font-bold text-green-600">
              {{ stats.active }}
            </div>
            <CheckCircleIcon class="h-5 w-5 text-green-500" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader class="pb-2"><CardTitle class="text-muted-foreground text-sm font-medium">即将到期</CardTitle></CardHeader>
        <CardContent>
          <div class="flex items-center gap-2">
            <div class="text-2xl font-bold text-yellow-600">
              {{ stats.expiring }}
            </div>
            <ExclamationTriangleIcon class="h-5 w-5 text-yellow-500" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader class="pb-2"><CardTitle class="text-muted-foreground text-sm font-medium">已暂停</CardTitle></CardHeader>
        <CardContent>
          <div class="flex items-center gap-2">
            <div class="text-muted-foreground text-2xl font-bold">
              {{ stats.suspended }}
            </div>
            <PauseCircleIcon class="text-muted-foreground h-5 w-5" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader class="pb-2"><CardTitle class="text-muted-foreground text-sm font-medium">运行中月收入</CardTitle></CardHeader>
        <CardContent
          ><div class="text-2xl font-bold">¥{{ stats.totalRevenue.toLocaleString() }}</div></CardContent
        >
      </Card>
    </div>

    <!-- Subscription List -->
    <Card>
      <CardHeader>
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>订阅列表</CardTitle>
          <div class="flex items-center gap-2">
            <div class="relative">
              <MagnifyingGlassIcon class="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
              <Input v-model="searchQuery" placeholder="搜索企业名称、套餐..." class="w-64 pl-8" />
            </div>
            <Select v-model="statusFilter">
              <SelectTrigger class="w-28">
                <SelectValue placeholder="全部状态" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部状态</SelectItem>
                <SelectItem value="active">运行中</SelectItem>
                <SelectItem value="expiring">即将到期</SelectItem>
                <SelectItem value="suspended">已暂停</SelectItem>
                <SelectItem value="expired">已过期</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>企业名称</TableHead>
              <TableHead>订购套餐</TableHead>
              <TableHead>类型</TableHead>
              <TableHead>订购金额</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>订购时间</TableHead>
              <TableHead>到期时间</TableHead>
              <TableHead>调用量 / 配额</TableHead>
              <TableHead class="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="sub in filteredSubscriptions" :key="sub.id">
              <TableCell>
                <div class="flex items-center gap-2">
                  <div class="bg-muted flex h-8 w-8 items-center justify-center rounded-lg">
                    <BuildingOffice2Icon class="h-4 w-4" />
                  </div>
                  <div>
                    <div class="font-medium">{{ sub.enterpriseName }}</div>
                    <div class="text-muted-foreground text-xs">
                      {{ sub.enterpriseId }}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div class="flex items-center gap-1.5">
                  <span class="font-medium">{{ sub.packageName }}</span>
                </div>
              </TableCell>

              <TableCell>
                <Badge variant="secondary" class="text-xs">{{ sub.packageType }}</Badge>
              </TableCell>
              <TableCell class="font-medium">¥{{ sub.amount.toLocaleString() }}</TableCell>
              <TableCell>
                <Badge :variant="statusConfig[sub.status].variant" class="gap-1">
                  <component :is="statusConfig[sub.status].icon" :class="['h-3 w-3', statusConfig[sub.status].colorClass]" />
                  {{ statusConfig[sub.status].label }}
                </Badge>
              </TableCell>
              <TableCell class="text-muted-foreground text-sm">{{ sub.subscribeDate }}</TableCell>
              <TableCell class="text-muted-foreground text-sm">{{ sub.expiryDate }}</TableCell>
              <TableCell>
                <div class="w-36 space-y-1">
                  <div class="text-muted-foreground flex items-center justify-between text-xs">
                    <span>{{ usagePercent(sub) }}%</span>
                    <span>{{ sub.usedCalls.toLocaleString() }} / {{ sub.totalCalls.toLocaleString() }}</span>
                  </div>
                  <Progress :value="usagePercent(sub)" class="h-1.5" />
                </div>
              </TableCell>
              <TableCell class="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="ghost" size="icon"><EllipsisHorizontalIcon class="h-4 w-4" /></Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem @click="handleViewDetail(sub)"> <EyeIcon class="mr-2 h-4 w-4" />查看详情 </DropdownMenuItem>
                    <template v-if="sub.status === 'active' || sub.status === 'expiring'">
                      <DropdownMenuSeparator />
                      <DropdownMenuItem @click="handleConfirmAction(sub, 'suspend')"> <PauseCircleIcon class="mr-2 h-4 w-4" />暂停订阅 </DropdownMenuItem>
                    </template>
                    <template v-if="sub.status === 'suspended'">
                      <DropdownMenuSeparator />
                      <DropdownMenuItem @click="handleConfirmAction(sub, 'resume')"> <CheckCircleIcon class="mr-2 h-4 w-4" />恢复订阅 </DropdownMenuItem>
                    </template>
                    <template v-if="sub.status === 'expiring'">
                      <DropdownMenuItem @click="handleConfirmAction(sub, 'renew')"> <ArrowPathIcon class="mr-2 h-4 w-4" />续费 </DropdownMenuItem>
                    </template>
                    <template v-if="sub.status === 'expired'">
                      <DropdownMenuItem @click="handleConfirmAction(sub, 'renew')"> <ArrowPathIcon class="mr-2 h-4 w-4" />重新订阅 </DropdownMenuItem>
                    </template>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
            <TableRow v-if="filteredSubscriptions.length === 0">
              <TableCell :colspan="9" class="text-muted-foreground py-12 text-center">
                <div class="flex flex-col items-center gap-2">
                  <CubeIcon class="h-8 w-8" />
                  <span>暂无匹配的订阅记录</span>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>

    <!-- Detail Dialog -->
    <Dialog v-model:open="detailDialogOpen">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>订阅详情</DialogTitle>
          <DialogDescription>查看企业客户套餐订购的详细信息</DialogDescription>
        </DialogHeader>
        <div v-if="selectedSubscription" class="space-y-4">
          <div class="border-border flex items-center gap-3 rounded-lg border p-4">
            <div class="bg-muted flex h-10 w-10 items-center justify-center rounded-lg">
              <BuildingOffice2Icon class="h-5 w-5" />
            </div>
            <div>
              <div class="font-semibold">
                {{ selectedSubscription.enterpriseName }}
              </div>
              <div class="text-muted-foreground text-sm">
                {{ selectedSubscription.enterpriseId }}
              </div>
            </div>
            <Badge :variant="statusConfig[selectedSubscription.status].variant" class="ml-auto gap-1">
              <component :is="statusConfig[selectedSubscription.status].icon" :class="['h-3 w-3', statusConfig[selectedSubscription.status].colorClass]" />
              {{ statusConfig[selectedSubscription.status].label }}
            </Badge>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <span class="text-muted-foreground text-sm">订阅编号</span>
              <div class="text-sm">
                {{ selectedSubscription.id }}
              </div>
            </div>
            <div>
              <span class="text-muted-foreground text-sm">订购套餐</span>
              <div class="font-medium">{{ selectedSubscription.packageName }}</div>
            </div>
            <div>
              <span class="text-muted-foreground text-sm">套餐类型</span>
              <div>{{ selectedSubscription.packageType }}</div>
            </div>
            <div>
              <span class="text-muted-foreground text-sm">订购金额</span>
              <div class="font-medium">¥{{ selectedSubscription.amount.toLocaleString() }}</div>
            </div>
            <div>
              <span class="text-muted-foreground text-sm">订购时间</span>
              <div>{{ selectedSubscription.subscribeDate }}</div>
            </div>
            <div>
              <span class="text-muted-foreground text-sm">到期时间</span>
              <div>{{ selectedSubscription.expiryDate }}</div>
            </div>
            <div>
              <span class="text-muted-foreground text-sm">已用调用量</span>
              <div>{{ selectedSubscription.usedCalls.toLocaleString() }} 次</div>
            </div>
            <div>
              <span class="text-muted-foreground text-sm">总配额</span>
              <div>{{ selectedSubscription.totalCalls.toLocaleString() }} 次</div>
            </div>
          </div>
          <div class="space-y-2">
            <div class="text-muted-foreground flex items-center justify-between text-sm">
              <span>用量进度</span>
              <span>{{ usagePercent(selectedSubscription) }}%</span>
            </div>
            <Progress :value="usagePercent(selectedSubscription)" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" @click="detailDialogOpen = false">关闭</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <!-- Confirm Action Dialog -->
    <Dialog v-model:open="confirmActionDialogOpen">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{{ confirmActionType ? actionLabels[confirmActionType] : '确认操作' }}</DialogTitle>
          <DialogDescription>此操作将影响企业客户的套餐订阅状态</DialogDescription>
        </DialogHeader>
        <div v-if="selectedSubscription && confirmActionType" class="space-y-3">
          <div class="border-border rounded-lg border p-4">
            <div class="flex items-center gap-2">
              <ShieldCheckIcon class="text-muted-foreground h-5 w-5" />
              <span class="font-medium">{{ selectedSubscription.enterpriseName }}</span>
              <Badge variant="secondary" class="ml-auto">{{ selectedSubscription.packageName }}</Badge>
            </div>
          </div>
          <div class="border-destructive/50 bg-destructive/5 rounded-lg border p-3">
            <p class="text-sm">
              <template v-if="confirmActionType === 'suspend'"> 暂停后该企业的套餐订阅将被冻结，API调用将被拒绝，但数据和配置将被保留。 </template>
              <template v-else-if="confirmActionType === 'resume'"> 恢复后该企业的套餐订阅将重新激活，API调用恢复正常。 </template>
              <template v-else> 续费后将根据当前套餐延长订阅有效期。 </template>
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" @click="confirmActionDialogOpen = false">取消</Button>
          <Button :variant="confirmActionType === 'suspend' ? 'destructive' : 'default'" @click="executeConfirmAction"> 确认{{ confirmActionType === 'suspend' ? '暂停' : confirmActionType === 'resume' ? '恢复' : '续费' }} </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
<!-- [AI_END LINES=545 TIMESTAMP=2025-07-16 06:20:00] -->

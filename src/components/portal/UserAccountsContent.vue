<!-- [AI_START TIMESTAMP=2025-07-18 14:00:00] -->
<script setup lang="ts">
import { ref, computed } from 'vue';
import { MagnifyingGlassIcon, UserIcon, CheckCircleIcon, XCircleIcon, EyeIcon, EnvelopeIcon, PhoneIcon, BuildingOffice2Icon, ClockIcon, NoSymbolIcon, PlayIcon } from '@heroicons/vue/24/outline';

interface UserAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  department: string;
  role: string;
  status: 'active' | 'disabled';
  registeredAt: string;
  lastLogin: string;
}

const users = ref<UserAccount[]>([
  {
    id: 'USR001',
    name: '张三',
    email: 'zhangsan@huawei.com',
    phone: '138****8888',
    company: '华为云科技',
    department: '技术部',
    role: '超级管理员',
    status: 'active',
    registeredAt: '2024-01-15',
    lastLogin: '2025-07-18 09:30:22',
  },
  {
    id: 'USR002',
    name: '李四',
    email: 'lisi@aliyun.com',
    phone: '139****6666',
    company: '阿里云数',
    department: '产品部',
    role: '管理员',
    status: 'active',
    registeredAt: '2024-02-01',
    lastLogin: '2025-07-17 16:45:10',
  },
  {
    id: 'USR003',
    name: '王五',
    email: 'wangwu@tencent.com',
    phone: '137****9999',
    company: '腾讯云智',
    department: '研发部',
    role: '普通用户',
    status: 'active',
    registeredAt: '2024-03-10',
    lastLogin: '2025-07-18 08:12:05',
  },
  {
    id: 'USR004',
    name: '赵六',
    email: 'zhaoliu@baidu.com',
    phone: '136****5555',
    company: '百度智能',
    department: '运维部',
    role: '管理员',
    status: 'active',
    registeredAt: '2024-01-20',
    lastLogin: '2025-07-17 14:22:33',
  },
  {
    id: 'USR005',
    name: '孙七',
    email: 'sunqi@bytedance.com',
    phone: '135****7777',
    company: '字节跳动',
    department: '数据部',
    role: '普通用户',
    status: 'disabled',
    registeredAt: '2024-02-15',
    lastLogin: '2025-06-01 10:00:00',
  },
  {
    id: 'USR006',
    name: '周八',
    email: 'zhouba@huawei.com',
    phone: '134****3333',
    company: '华为云科技',
    department: '技术部',
    role: '普通用户',
    status: 'active',
    registeredAt: '2024-04-05',
    lastLogin: '2025-07-18 11:05:42',
  },
  {
    id: 'USR007',
    name: '吴九',
    email: 'wujiu@huawei.com',
    phone: '133****2222',
    company: '华为云科技',
    department: '市场部',
    role: '管理员',
    status: 'active',
    registeredAt: '2024-05-12',
    lastLogin: '2025-07-18 07:30:18',
  },
  {
    id: 'USR008',
    name: '郑十',
    email: 'zhengshi@aliyun.com',
    phone: '132****1111',
    company: '阿里云数',
    department: '财务部',
    role: '普通用户',
    status: 'disabled',
    registeredAt: '2024-03-22',
    lastLogin: '2025-05-15 09:20:00',
  },
  {
    id: 'USR009',
    name: '刘一',
    email: 'liuyi@tencent.com',
    phone: '131****0000',
    company: '腾讯云智',
    department: '研发部',
    role: '普通用户',
    status: 'active',
    registeredAt: '2024-06-08',
    lastLogin: '2025-07-17 18:55:30',
  },
  {
    id: 'USR010',
    name: '陈二',
    email: 'chener@baidu.com',
    phone: '130****9999',
    company: '百度智能',
    department: '产品部',
    role: '管理员',
    status: 'active',
    registeredAt: '2024-07-01',
    lastLogin: '2025-07-18 06:40:11',
  },
]);

const companySet = computed(() => {
  const set = new Set(users.value.map((u) => u.company));
  return Array.from(set);
});

const searchQuery = ref('');
const selectedCompany = ref<string>('全部');
const detailOpen = ref(false);
const selectedUser = ref<UserAccount | null>(null);

const filteredUsers = computed(() => {
  let result = users.value;
  if (selectedCompany.value !== '全部') {
    result = result.filter((u) => u.company === selectedCompany.value);
  }
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase();
    result = result.filter((u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.company.toLowerCase().includes(q) || u.department.toLowerCase().includes(q));
  }
  return result;
});

function handleViewDetail(user: UserAccount) {
  selectedUser.value = user;
  detailOpen.value = true;
}

function toggleUserStatus(user: UserAccount) {
  user.status = user.status === 'active' ? 'disabled' : 'active';
}

const stats = computed(() => ({
  total: users.value.length,
  superAdmin: users.value.filter((u) => u.role === '超级管理员').length,
  admin: users.value.filter((u) => u.role === '管理员').length,
  disabled: users.value.filter((u) => u.status === 'disabled').length,
}));
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-foreground text-2xl font-semibold">用户账号管理</h2>
      <p class="text-muted-foreground">管理所有在平台注册的企业用户账号、认证与启用状态</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid gap-4 md:grid-cols-4">
      <Card>
        <CardHeader class="pb-2"><CardTitle class="text-muted-foreground text-sm font-medium">总用户数</CardTitle></CardHeader>
        <CardContent
          ><div class="text-2xl font-bold">{{ stats.total }}</div></CardContent
        >
      </Card>
      <Card>
        <CardHeader class="pb-2"><CardTitle class="text-muted-foreground text-sm font-medium">超级管理员</CardTitle></CardHeader>
        <CardContent
          ><div class="text-2xl font-bold text-blue-600">{{ stats.superAdmin }}</div></CardContent
        >
      </Card>
      <Card>
        <CardHeader class="pb-2"><CardTitle class="text-muted-foreground text-sm font-medium">管理员</CardTitle></CardHeader>
        <CardContent
          ><div class="text-2xl font-bold text-amber-600">{{ stats.admin }}</div></CardContent
        >
      </Card>
      <Card>
        <CardHeader class="pb-2"><CardTitle class="text-muted-foreground text-sm font-medium">已冻结</CardTitle></CardHeader>
        <CardContent
          ><div class="text-2xl font-bold text-red-600">{{ stats.disabled }}</div></CardContent
        >
      </Card>
    </div>

    <!-- User Table Card -->
    <Card>
      <CardHeader>
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div class="flex items-center gap-2">
            <UserIcon class="text-primary h-5 w-5" />
            <CardTitle>用户列表</CardTitle>
            <span class="text-muted-foreground text-sm font-normal">（共 {{ filteredUsers.length }} 人）</span>
          </div>
          <div class="flex flex-wrap items-center gap-3">
            <div class="relative">
              <MagnifyingGlassIcon class="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
              <Input v-model="searchQuery" placeholder="搜索用户名、邮箱或企业..." class="w-56 pl-8" />
            </div>
            <div class="flex items-center gap-2">
              <Select v-model="selectedCompany">
                <SelectTrigger class="h-9 w-36 text-xs">
                  <SelectValue placeholder="全部企业" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="全部">全部企业</SelectItem>
                  <SelectItem v-for="c in companySet" :key="c" :value="c">{{ c }}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div class="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>用户ID</TableHead>
                <TableHead>用户名</TableHead>
                <TableHead>邮箱</TableHead>
                <TableHead>所属企业</TableHead>
                <TableHead>部门</TableHead>
                <TableHead>角色</TableHead>
                <TableHead>账号状态</TableHead>
                <TableHead>注册时间</TableHead>
                <TableHead>最后登录</TableHead>
                <TableHead class="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="user in filteredUsers" :key="user.id">
                <TableCell class="text-muted-foreground text-xs">{{ user.id }}</TableCell>
                <TableCell class="font-medium">{{ user.name }}</TableCell>
                <TableCell class="text-sm">{{ user.email }}</TableCell>
                <TableCell class="text-sm">{{ user.company }}</TableCell>
                <TableCell class="text-sm">{{ user.department }}</TableCell>
                <TableCell>
                  <Badge variant="outline" class="text-xs">{{ user.role }}</Badge>
                </TableCell>
                <TableCell>
                  <Badge v-if="user.status === 'active'" variant="outline" class="gap-1 border-green-200 bg-green-50 text-green-700">
                    <CheckCircleIcon class="h-3 w-3" />
                    正常
                  </Badge>
                  <Badge v-else variant="outline" class="gap-1 border-red-200 bg-red-50 text-red-700">
                    <NoSymbolIcon class="h-3 w-3" />
                    已冻结
                  </Badge>
                </TableCell>
                <TableCell class="text-muted-foreground text-sm">{{ user.registeredAt }}</TableCell>
                <TableCell class="text-muted-foreground text-sm">{{ user.lastLogin }}</TableCell>
                <TableCell class="text-right">
                  <div class="flex justify-end gap-1">
                    <Button variant="ghost" size="sm" @click="handleViewDetail(user)"><EyeIcon class="mr-1 h-3 w-3" />详情</Button>
                    <Button v-if="user.status === 'active'" variant="ghost" size="sm" class="text-destructive" @click="toggleUserStatus(user)">禁用</Button>
                    <Button v-else variant="ghost" size="sm" @click="toggleUserStatus(user)">启用</Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>

    <!-- Detail Dialog -->
    <Dialog v-model:open="detailOpen">
      <DialogContent class="max-w-lg">
        <DialogHeader>
          <DialogTitle>用户详情</DialogTitle>
          <DialogDescription>查看用户账号详细信息</DialogDescription>
        </DialogHeader>
        <div v-if="selectedUser" class="max-h-[60vh] space-y-4 overflow-y-auto py-2">
          <!-- Basic Info -->
          <div class="border-border bg-muted/30 space-y-3 rounded-lg border p-4">
            <div class="flex items-center gap-3">
              <div class="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-full">
                <span class="text-primary text-lg font-semibold">{{ selectedUser.name.charAt(0) }}</span>
              </div>
              <div>
                <p class="text-foreground text-lg font-semibold">{{ selectedUser.name }}</p>
                <p class="text-muted-foreground font-mono text-xs">{{ selectedUser.id }}</p>
              </div>
            </div>
            <Separator />
            <div class="grid grid-cols-2 gap-3">
              <div class="flex items-center gap-2 text-sm">
                <EnvelopeIcon class="text-muted-foreground h-4 w-4 shrink-0" />
                <span class="text-muted-foreground shrink-0">邮箱：</span>
                <span class="truncate">{{ selectedUser.email }}</span>
              </div>
              <div class="flex items-center gap-2 text-sm">
                <PhoneIcon class="text-muted-foreground h-4 w-4 shrink-0" />
                <span class="text-muted-foreground shrink-0">手机：</span>
                <span>{{ selectedUser.phone }}</span>
              </div>
              <div class="flex items-center gap-2 text-sm">
                <BuildingOffice2Icon class="text-muted-foreground h-4 w-4 shrink-0" />
                <span class="text-muted-foreground shrink-0">企业：</span>
                <span>{{ selectedUser.company }}</span>
              </div>
              <div class="flex items-center gap-2 text-sm">
                <UserIcon class="text-muted-foreground h-4 w-4 shrink-0" />
                <span class="text-muted-foreground shrink-0">部门：</span>
                <span>{{ selectedUser.department }}</span>
              </div>
            </div>
          </div>

          <!-- Status -->
          <div class="border-border space-y-3 rounded-lg border p-4">
            <h4 class="text-foreground text-sm font-semibold">账号状态</h4>
            <div class="grid grid-cols-2 gap-3">
              <div class="space-y-1">
                <span class="text-muted-foreground text-xs">角色</span>
                <p>
                  <Badge variant="outline" class="text-xs">{{ selectedUser.role }}</Badge>
                </p>
              </div>

              <div class="space-y-1">
                <span class="text-muted-foreground text-xs">账号状态</span>
                <p>
                  <Badge v-if="selectedUser.status === 'active'" variant="outline" class="gap-1 border-green-200 bg-green-50 text-green-700">
                    <CheckCircleIcon class="h-3 w-3" />
                    正常
                  </Badge>
                  <Badge v-else variant="outline" class="gap-1 border-red-200 bg-red-50 text-red-700">
                    <NoSymbolIcon class="h-3 w-3" />
                    已冻结
                  </Badge>
                </p>
              </div>
              <div class="space-y-1">
                <span class="text-muted-foreground text-xs">注册时间</span>
                <p class="text-sm">{{ selectedUser.registeredAt }}</p>
              </div>
            </div>
          </div>

          <!-- Login Info -->
          <div class="border-border bg-muted/30 space-y-3 rounded-lg border p-4">
            <h4 class="text-foreground text-sm font-semibold">登录信息</h4>
            <div class="space-y-2">
              <div class="flex items-center gap-2 text-sm">
                <ClockIcon class="text-muted-foreground h-4 w-4 shrink-0" />
                <span class="text-muted-foreground">最后登录：</span>
                <span>{{ selectedUser.lastLogin }}</span>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter class="sm:gap-0 md:gap-2">
          <Button variant="outline" @click="detailOpen = false">关闭</Button>
          <Button
            v-if="selectedUser && selectedUser.status === 'active'"
            variant="outline"
            class="text-destructive"
            @click="
              toggleUserStatus(selectedUser!);
              detailOpen = false;
            "
          >
            禁用账号
          </Button>
          <Button
            v-if="selectedUser && selectedUser.status === 'disabled'"
            variant="outline"
            @click="
              toggleUserStatus(selectedUser!);
              detailOpen = false;
            "
          >
            启用账号
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
<!-- [AI_END LINES=205 TIMESTAMP=2025-07-18 14:00:00] -->

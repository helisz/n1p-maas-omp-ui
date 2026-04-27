<!-- [AI_START TIMESTAMP=2025-06-15 12:00:00] -->
<script setup lang="ts">
import { ref } from "vue";
import {
  UserPlusIcon,
  EllipsisHorizontalIcon,
  PencilSquareIcon,
  TrashIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  XCircleIcon,
  StarIcon,
  WrenchIcon,
  WalletIcon,
  CodeBracketIcon,
} from "@heroicons/vue/24/outline";

const accounts = [
  {
    id: "user-001",
    email: "admin@zhongkeyunshu.com",
    name: "李四",
    role: "super_admin",
    status: "active",
    createdAt: "2024-01-15",
    lastLogin: "2024-03-15 14:30:00",
  },
  {
    id: "user-002",
    email: "ops@zhongkeyunshu.com",
    name: "王五",
    role: "ops_admin",
    status: "active",
    createdAt: "2024-02-01",
    lastLogin: "2024-03-14 16:20:00",
  },
  {
    id: "user-003",
    email: "finance@zhongkeyunshu.com",
    name: "赵六",
    role: "finance_admin",
    status: "active",
    createdAt: "2024-02-15",
    lastLogin: "2024-03-13 09:45:00",
  },
  {
    id: "user-004",
    email: "dev@zhongkeyunshu.com",
    name: "孙七",
    role: "api_user",
    status: "active",
    createdAt: "2024-03-01",
    lastLogin: "2024-03-15 10:15:00",
  },
  {
    id: "user-005",
    email: "test@zhongkeyunshu.com",
    name: "周八",
    role: "api_user",
    status: "inactive",
    createdAt: "2024-03-10",
    lastLogin: null,
  },
];

const roleConfig: Record<
  string,
  { label: string; icon: typeof StarIcon; color: string }
> = {
  super_admin: { label: "超级管理员", icon: StarIcon, color: "text-amber-500" },
  ops_admin: { label: "运营管理员", icon: WrenchIcon, color: "text-blue-500" },
  finance_admin: { label: "财务管理员", icon: WalletIcon, color: "text-green-500" },
  api_user: { label: "API 调用员", icon: CodeBracketIcon, color: "text-purple-500" },
};

const roles = [
  {
    id: "super_admin",
    name: "超级管理员",
    description: "拥有全部权限",
    icon: StarIcon,
    color: "text-amber-500",
  },
  {
    id: "ops_admin",
    name: "运营管理员",
    description: "套餐、服务、密钥管理",
    icon: WrenchIcon,
    color: "text-blue-500",
  },
  {
    id: "finance_admin",
    name: "财务管理员",
    description: "订单、账单、发票",
    icon: WalletIcon,
    color: "text-green-500",
  },
  {
    id: "api_user",
    name: "API 调用员",
    description: "查看密钥和调用统计",
    icon: CodeBracketIcon,
    color: "text-purple-500",
  },
];

const addDialogOpen = ref(false);
const editDialogOpen = ref(false);
const selectedAccount = ref<(typeof accounts)[0] | null>(null);

function handleEdit(account: (typeof accounts)[0]) {
  selectedAccount.value = account;
  editDialogOpen.value = true;
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-2xl font-semibold text-foreground">子账号与权限</h2>
      <p class="text-muted-foreground">管理企业子账号和角色权限分配</p>
    </div>

    <div class="grid gap-4 md:grid-cols-4">
      <Card
        ><CardHeader class="pb-2"
          ><CardTitle class="text-sm font-medium text-muted-foreground"
            >总账号数</CardTitle
          ></CardHeader
        ><CardContent
          ><div class="text-2xl font-bold">
            {{ accounts.length }}
          </div></CardContent
        ></Card
      >
      <Card
        ><CardHeader class="pb-2"
          ><CardTitle class="text-sm font-medium text-muted-foreground"
            >已激活</CardTitle
          ></CardHeader
        ><CardContent
          ><div class="text-2xl font-bold text-green-600">
            {{ accounts.filter((a) => a.status === "active").length }}
          </div></CardContent
        ></Card
      >
      <Card
        ><CardHeader class="pb-2"
          ><CardTitle class="text-sm font-medium text-muted-foreground"
            >已禁用</CardTitle
          ></CardHeader
        ><CardContent
          ><div class="text-2xl font-bold text-muted-foreground">
            {{ accounts.filter((a) => a.status === "inactive").length }}
          </div></CardContent
        ></Card
      >
      <Card
        ><CardHeader class="pb-2"
          ><CardTitle class="text-sm font-medium text-muted-foreground"
            >管理员</CardTitle
          ></CardHeader
        ><CardContent
          ><div class="text-2xl font-bold">
            {{ accounts.filter((a) => a.role.includes("admin")).length }}
          </div></CardContent
        ></Card
      >
    </div>

    <div class="grid gap-6 lg:grid-cols-3">
      <Card class="lg:col-span-2">
        <CardHeader>
          <div class="flex items-center justify-between">
            <div>
              <CardTitle>子账号列表</CardTitle
              ><CardDescription>管理企业下所有子账号</CardDescription>
            </div>
            <Button @click="addDialogOpen = true"
              ><UserPlusIcon class="mr-2 h-4 w-4" />新增子账号</Button
            >
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader
              ><TableRow
                ><TableHead>账号</TableHead><TableHead>姓名</TableHead
                ><TableHead>角色</TableHead><TableHead>状态</TableHead
                ><TableHead class="text-right">操作</TableHead></TableRow
              ></TableHeader
            >
            <TableBody>
              <TableRow v-for="account in accounts" :key="account.id">
                <TableCell>
                  <div>
                    <p class="font-medium">{{ account.email }}</p>
                    <p class="text-xs text-muted-foreground">
                      创建于 {{ account.createdAt }}
                    </p>
                  </div>
                </TableCell>
                <TableCell>{{ account.name }}</TableCell>
                <TableCell>
                  <div class="flex items-center gap-1.5">
                    <component
                      :is="roleConfig[account.role].icon"
                      :class="['h-4 w-4', roleConfig[account.role].color]"
                    />
                    <span class="text-sm">{{
                      roleConfig[account.role].label
                    }}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    v-if="account.status === 'active'"
                    variant="outline"
                    class="gap-1"
                    ><CheckCircleIcon
                      class="h-3 w-3 text-green-500"
                    />已激活</Badge
                  >
                  <Badge v-else variant="secondary" class="gap-1"
                    ><XCircleIcon class="h-3 w-3" />已禁用</Badge
                  >
                </TableCell>
                <TableCell class="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      ><Button variant="ghost" size="icon"
                        ><EllipsisHorizontalIcon class="h-4 w-4" /></Button
                    ></DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem @click="handleEdit(account)"
                        ><PencilSquareIcon class="mr-2 h-4 w-4" />编辑</DropdownMenuItem
                      >
                      <DropdownMenuItem
                        ><ShieldCheckIcon class="mr-2 h-4 w-4" />{{
                          account.status === "active" ? "禁用" : "启用"
                        }}</DropdownMenuItem
                      >
                      <DropdownMenuItem
                        v-if="account.role !== 'super_admin'"
                        class="text-destructive"
                        ><TrashIcon class="mr-2 h-4 w-4" />删除</DropdownMenuItem
                      >
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <!-- Roles -->
      <Card>
        <CardHeader
          ><CardTitle>角色权限</CardTitle
          ><CardDescription>系统预设角色说明</CardDescription></CardHeader
        >
        <CardContent class="space-y-4">
          <div
            v-for="role in roles"
            :key="role.id"
            class="rounded-lg border p-3"
          >
            <div class="flex items-center gap-2">
              <component :is="role.icon" :class="['h-4 w-4', role.color]" />
              <span class="font-medium">{{ role.name }}</span>
            </div>
            <p class="mt-1 text-xs text-muted-foreground">
              {{ role.description }}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Add Dialog -->
    <Dialog v-model:open="addDialogOpen">
      <DialogContent>
        <DialogHeader
          ><DialogTitle>新增子账号</DialogTitle
          ><DialogDescription
            >创建新的企业子账号</DialogDescription
          ></DialogHeader
        >
        <div class="space-y-4">
          <div class="space-y-2">
            <Label for="newEmail">邮箱</Label
            ><Input id="newEmail" type="email" placeholder="请输入邮箱" />
          </div>
          <div class="space-y-2">
            <Label for="newName">姓名</Label
            ><Input id="newName" placeholder="请输入姓名" />
          </div>
          <div class="space-y-2">
            <Label>角色</Label>
            <Select default-value="api_user">
              <SelectTrigger class="w-full">
                <SelectValue placeholder="请选择角色" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  v-for="role in roles.filter((r) => r.id !== 'super_admin')"
                  :key="role.id"
                  :value="role.id"
                  >{{ role.name }}</SelectItem
                >
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" @click="addDialogOpen = false">取消</Button>
          <Button @click="addDialogOpen = false">创建</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <!-- PencilSquareIcon Dialog -->
    <Dialog v-model:open="editDialogOpen">
      <DialogContent>
        <DialogHeader
          ><DialogTitle>编辑子账号</DialogTitle
          ><DialogDescription>修改子账号信息</DialogDescription></DialogHeader
        >
        <div v-if="selectedAccount" class="space-y-4">
          <div class="space-y-2">
            <Label>邮箱</Label
            ><Input :default-value="selectedAccount.email" disabled />
          </div>
          <div class="space-y-2">
            <Label>姓名</Label><Input :default-value="selectedAccount.name" />
          </div>
          <div class="space-y-2">
            <Label>角色</Label>
            <Select :default-value="selectedAccount.role">
              <SelectTrigger class="w-full">
                <SelectValue placeholder="请选择角色" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  v-for="role in roles.filter((r) => r.id !== 'super_admin')"
                  :key="role.id"
                  :value="role.id"
                  >{{ role.name }}</SelectItem
                >
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" @click="editDialogOpen = false"
            >取消</Button
          >
          <Button @click="editDialogOpen = false">保存</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
<!-- [AI_END LINES=137 TIMESTAMP=2025-06-15 12:00:00] -->

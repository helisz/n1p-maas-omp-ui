<!-- [AI_START TIMESTAMP=2025-06-20 06:45:00] -->
<script setup lang="ts">
import { ref, computed } from "vue";
import {
  Search,
  Download,
  Filter,
  LogIn,
  ShoppingCart,
  CreditCard,
  Server,
  Key,
  ShieldCheck,
  UserCog,
  Eye,
  Settings,
} from "lucide-vue-next";

const auditLogs = [
  {
    id: "LOG001",
    time: "2024-03-15 14:35:00",
    type: "payment",
    action: "订单支付成功",
    detail: "订单 #ORD202403150001 支付完成，金额 ¥5,999",
    ip: "218.76.xxx.xxx",
    authMethod: "网银Key",
    operator: "华为云科技 / admin",
  },
  {
    id: "LOG002",
    time: "2024-03-15 14:32:00",
    type: "auth",
    action: "网银Key认证",
    detail: "完成中信网银Key身份认证",
    ip: "218.76.xxx.xxx",
    authMethod: "网银Key",
    operator: "阿里云数 / admin",
  },
  {
    id: "LOG003",
    time: "2024-03-15 14:30:00",
    type: "order",
    action: "创建订单",
    detail: "创建订单 #ORD202403150001，套餐：高级版",
    ip: "218.76.xxx.xxx",
    authMethod: "密码登录",
    operator: "华为云科技 / admin",
  },
  {
    id: "LOG004",
    time: "2024-03-15 10:20:00",
    type: "ops",
    action: "运营调整余额",
    detail: "运营人员为 百度智能 手动调账 +¥500",
    ip: "10.0.1.xxx",
    authMethod: "密码+令牌",
    operator: "平台运营 / ops01",
  },
  {
    id: "LOG005",
    time: "2024-03-15 09:00:00",
    type: "login",
    action: "用户登录",
    detail: "管理员账号登录系统",
    ip: "218.76.xxx.xxx",
    authMethod: "密码登录",
    operator: "腾讯云智 / admin",
  },
  {
    id: "LOG006",
    time: "2024-03-14 16:45:00",
    type: "key",
    action: "密钥重置",
    detail: "重置 API SecretKey（生产环境密钥）",
    ip: "218.76.xxx.xxx",
    authMethod: "网银Key",
    operator: "百度智能 / admin",
  },
  {
    id: "LOG007",
    time: "2024-03-14 15:30:00",
    type: "ops",
    action: "套餐状态变更",
    detail: "运营人员将「企业年包」状态变更为下线",
    ip: "10.0.1.xxx",
    authMethod: "密码+令牌",
    operator: "平台运营 / ops01",
  },
  {
    id: "LOG008",
    time: "2024-03-14 14:00:00",
    type: "login",
    action: "运营登录",
    detail: "运营管理员登录后台系统",
    ip: "10.0.1.xxx",
    authMethod: "密码登录",
    operator: "平台运营 / ops01",
  },
];

const typeConfig: Record<
  string,
  { label: string; icon: typeof LogIn; color: string }
> = {
  login: { label: "登录", icon: LogIn, color: "bg-blue-50 text-blue-700" },
  order: {
    label: "订购",
    icon: ShoppingCart,
    color: "bg-purple-50 text-purple-700",
  },
  payment: {
    label: "支付",
    icon: CreditCard,
    color: "bg-green-50 text-green-700",
  },
  service: {
    label: "开通服务",
    icon: Server,
    color: "bg-orange-50 text-orange-700",
  },
  key: { label: "密钥变更", icon: Key, color: "bg-red-50 text-red-700" },
  auth: {
    label: "网银Key认证",
    icon: ShieldCheck,
    color: "bg-cyan-50 text-cyan-700",
  },
  ops: {
    label: "运营操作",
    icon: Settings,
    color: "bg-amber-50 text-amber-700",
  },
};

const searchQuery = ref("");
const typeFilter = ref("all");
const detailDialogOpen = ref(false);
const selectedLog = ref<(typeof auditLogs)[0] | null>(null);

const filteredLogs = computed(() =>
  auditLogs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      log.detail.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      log.operator.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesType =
      typeFilter.value === "all" || log.type === typeFilter.value;
    return matchesSearch && matchesType;
  }),
);

function handleViewDetail(log: (typeof auditLogs)[0]) {
  selectedLog.value = log;
  detailDialogOpen.value = true;
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-2xl font-semibold text-foreground">审计日志</h2>
      <p class="text-muted-foreground">查看系统操作日志，全流程留痕可追溯</p>
    </div>

    <div class="grid gap-4 md:grid-cols-4">
      <Card
        ><CardHeader class="pb-2"
          ><CardTitle class="text-sm font-medium text-muted-foreground"
            >今日操作</CardTitle
          ></CardHeader
        ><CardContent
          ><div class="text-2xl font-bold">28</div></CardContent
        ></Card
      >
      <Card
        ><CardHeader class="pb-2"
          ><CardTitle class="text-sm font-medium text-muted-foreground"
            >本月操作</CardTitle
          ></CardHeader
        ><CardContent
          ><div class="text-2xl font-bold">456</div></CardContent
        ></Card
      >
      <Card
        ><CardHeader class="pb-2"
          ><CardTitle class="text-sm font-medium text-muted-foreground"
            >网银Key认证</CardTitle
          ></CardHeader
        ><CardContent
          ><div class="text-2xl font-bold">12</div></CardContent
        ></Card
      >
      <Card
        ><CardHeader class="pb-2"
          ><CardTitle class="text-sm font-medium text-muted-foreground"
            >运营操作</CardTitle
          ></CardHeader
        ><CardContent
          ><div class="text-2xl font-bold">8</div></CardContent
        ></Card
      >
    </div>

    <Card>
      <CardHeader>
        <div
          class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <CardTitle>操作日志</CardTitle
            ><CardDescription>所有操作记录均不可删除、可追溯</CardDescription>
          </div>
          <div class="flex items-center gap-2">
            <div class="relative">
              <Search
                class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
              />
              <Input
                v-model="searchQuery"
                placeholder="搜索操作..."
                class="w-64 pl-8"
              />
            </div>
            <Select v-model="typeFilter">
              <SelectTrigger class="w-36">
                <SelectValue placeholder="筛选类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部类型</SelectItem>
                <SelectItem value="login">登录</SelectItem>
                <SelectItem value="order">订购</SelectItem>
                <SelectItem value="payment">支付</SelectItem>
                <SelectItem value="service">开通服务</SelectItem>
                <SelectItem value="key">密钥变更</SelectItem>
                <SelectItem value="auth">网银Key认证</SelectItem>
                <SelectItem value="ops">运营操作</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline"
              ><Download class="mr-2 h-4 w-4" />导出</Button
            >
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>操作时间</TableHead>
              <TableHead>操作类型</TableHead>
              <TableHead>操作内容</TableHead>
              <TableHead>操作人</TableHead>
              <TableHead>IP 地址</TableHead>
              <TableHead>认证方式</TableHead>
              <TableHead class="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="log in filteredLogs" :key="log.id">
              <TableCell class="text-muted-foreground">{{
                log.time
              }}</TableCell>
              <TableCell>
                <Badge :class="['gap-1', typeConfig[log.type].color]">
                  <component :is="typeConfig[log.type].icon" class="h-3 w-3" />
                  {{ typeConfig[log.type].label }}
                </Badge>
              </TableCell>
              <TableCell>{{ log.action }}</TableCell>
              <TableCell>{{ log.operator }}</TableCell>
              <TableCell class="font-mono text-sm">{{ log.ip }}</TableCell>
              <TableCell>{{ log.authMethod }}</TableCell>
              <TableCell class="text-right">
                <Button variant="ghost" size="sm" @click="handleViewDetail(log)"
                  ><Eye class="mr-1 h-3 w-3" />详情</Button
                >
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>

    <Dialog v-model:open="detailDialogOpen">
      <DialogContent>
        <DialogHeader
          ><DialogTitle>操作详情</DialogTitle
          ><DialogDescription
            >查看操作日志详细信息</DialogDescription
          ></DialogHeader
        >
        <div v-if="selectedLog" class="space-y-3">
          <div class="flex justify-between">
            <span class="text-muted-foreground">操作时间</span
            ><span>{{ selectedLog.time }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-muted-foreground">操作类型</span
            ><Badge :class="typeConfig[selectedLog.type].color">{{
              typeConfig[selectedLog.type].label
            }}</Badge>
          </div>
          <div class="flex justify-between">
            <span class="text-muted-foreground">操作内容</span
            ><span>{{ selectedLog.action }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-muted-foreground">详细信息</span
            ><span class="text-right max-w-[60%]">{{
              selectedLog.detail
            }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-muted-foreground">操作人</span
            ><span>{{ selectedLog.operator }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-muted-foreground">IP 地址</span
            ><span class="font-mono">{{ selectedLog.ip }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-muted-foreground">认证方式</span
            ><span>{{ selectedLog.authMethod }}</span>
          </div>
        </div>
        <DialogFooter
          ><Button variant="outline" @click="detailDialogOpen = false"
            >关闭</Button
          ></DialogFooter
        >
      </DialogContent>
    </Dialog>
  </div>
</template>
<!-- [AI_END LINES=122 TIMESTAMP=2025-06-20 06:45:00] -->

<!-- [AI_START TIMESTAMP=2025-06-15 12:00:00] -->
<script setup lang="ts">
import { ref } from "vue";
import {
  Key,
  Eye,
  EyeOff,
  Copy,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  Activity,
  TrendingUp,
  Clock,
  Server,
} from "lucide-vue-next";

const myPackages = [
  {
    id: "pkg-001",
    name: "高级版",
    status: "active",
    startDate: "2024-03-15",
    endDate: "2024-06-15",
    usedCalls: 89456,
    totalCalls: 200000,
    apiEndpoint: "https://api.maas-portal.com/v1",
  },
  {
    id: "pkg-002",
    name: "基础版",
    status: "active",
    startDate: "2024-02-01",
    endDate: "2024-05-01",
    usedCalls: 78000,
    totalCalls: 100000,
    apiEndpoint: "https://api.maas-portal.com/v1",
  },
  {
    id: "pkg-003",
    name: "尊享版",
    status: "expiring",
    startDate: "2024-01-15",
    endDate: "2024-04-01",
    usedCalls: 450000,
    totalCalls: 1000000,
    apiEndpoint: "https://api.maas-portal.com/v1",
  },
];

const apiKeys = [
  {
    id: "key-001",
    name: "生产环境密钥",
    accessKey: "ak_prod_xxxxxxxxxxxx1234",
    secretKey: "sk_prod_xxxxxxxxxxxxxxxxxxxxxxxx5678",
    createdAt: "2024-03-15 10:30:00",
    status: "active",
  },
  {
    id: "key-002",
    name: "测试环境密钥",
    accessKey: "ak_test_xxxxxxxxxxxx9876",
    secretKey: "sk_test_xxxxxxxxxxxxxxxxxxxxxxxx4321",
    createdAt: "2024-03-10 14:20:00",
    status: "active",
  },
];

const apiCallStats = [
  { date: "03-10", calls: 4500 },
  { date: "03-11", calls: 5200 },
  { date: "03-12", calls: 4800 },
  { date: "03-13", calls: 6100 },
  { date: "03-14", calls: 5500 },
  { date: "03-15", calls: 7200 },
  { date: "03-16", calls: 6800 },
];

const errorLogs = [
  {
    time: "2024-03-15 14:32:15",
    api: "/v1/completions",
    error: "Rate limit exceeded",
    code: 429,
  },
  {
    time: "2024-03-15 12:15:30",
    api: "/v1/embedding",
    error: "Invalid input format",
    code: 400,
  },
  {
    time: "2024-03-14 18:45:00",
    api: "/v1/completions",
    error: "Token limit exceeded",
    code: 400,
  },
];

const showSecretKey = ref<string | null>(null);
const resetDialogOpen = ref(false);
const selectedKey = ref<(typeof apiKeys)[0] | null>(null);

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}

function handleResetKey(key: (typeof apiKeys)[0]) {
  selectedKey.value = key;
  resetDialogOpen.value = true;
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-2xl font-semibold text-foreground">服务管理</h2>
      <p class="text-muted-foreground">管理您的套餐、API密钥和调用监控</p>
    </div>

    <Tabs default-value="packages" class="space-y-6">
      <TabsList>
        <TabsTrigger value="packages">我的套餐</TabsTrigger>
        <TabsTrigger value="keys">API 密钥</TabsTrigger>
        <TabsTrigger value="monitor">调用监控</TabsTrigger>
      </TabsList>

      <!-- Packages Tab -->
      <TabsContent value="packages" class="space-y-4">
        <div class="grid gap-4">
          <Card v-for="pkg in myPackages" :key="pkg.id">
            <CardHeader class="pb-2">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div
                    class="flex h-10 w-10 items-center justify-center rounded-lg bg-muted"
                  >
                    <Server class="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle class="text-lg">{{ pkg.name }}</CardTitle>
                    <CardDescription
                      >有效期：{{ pkg.startDate }} 至
                      {{ pkg.endDate }}</CardDescription
                    >
                  </div>
                </div>
                <Badge
                  v-if="pkg.status === 'active'"
                  variant="outline"
                  class="gap-1"
                  ><CheckCircle2 class="h-3 w-3 text-green-500" />运行中</Badge
                >
                <Badge v-else variant="outline" class="gap-1"
                  ><AlertTriangle class="h-3 w-3 text-red-500" />即将到期</Badge
                >
              </div>
            </CardHeader>
            <CardContent class="space-y-4">
              <div class="space-y-2">
                <div class="flex items-center justify-between text-sm">
                  <span class="text-muted-foreground">API 调用额度</span>
                  <span
                    >{{ pkg.usedCalls.toLocaleString() }} /
                    {{ pkg.totalCalls.toLocaleString() }} 次</span
                  >
                </div>
                <Progress
                  :value="Math.round((pkg.usedCalls / pkg.totalCalls) * 100)"
                />
                <p class="text-xs text-muted-foreground">
                  已使用
                  {{
                    Math.round((pkg.usedCalls / pkg.totalCalls) * 100)
                  }}%，剩余
                  {{ (pkg.totalCalls - pkg.usedCalls).toLocaleString() }} 次
                </p>
              </div>
              <div class="flex items-center gap-2 rounded-lg bg-muted/50 p-3">
                <span class="text-sm text-muted-foreground">API 端点：</span>
                <code class="flex-1 text-sm">{{ pkg.apiEndpoint }}</code>
                <Button
                  variant="ghost"
                  size="icon"
                  class="h-6 w-6"
                  @click="copyToClipboard(pkg.apiEndpoint)"
                  ><Copy class="h-3 w-3"
                /></Button>
              </div>
              <div class="flex gap-2">
                <Button variant="outline" size="sm">查看文档</Button>
                <Button variant="outline" size="sm">在线调试</Button>
                <Button v-if="pkg.status === 'expiring'" size="sm"
                  >立即续费</Button
                >
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <!-- API Keys Tab -->
      <TabsContent value="keys" class="space-y-4">
        <Card>
          <CardHeader>
            <div class="flex items-center justify-between">
              <div>
                <CardTitle>API 密钥管理</CardTitle
                ><CardDescription>用于 API 接口调用的访问凭证</CardDescription>
              </div>
              <Button><Key class="mr-2 h-4 w-4" />创建密钥</Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>名称</TableHead><TableHead>AccessKey</TableHead
                  ><TableHead>SecretKey</TableHead>
                  <TableHead>创建时间</TableHead><TableHead>状态</TableHead
                  ><TableHead class="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow v-for="key in apiKeys" :key="key.id">
                  <TableCell class="font-medium">{{ key.name }}</TableCell>
                  <TableCell>
                    <div class="flex items-center gap-2">
                      <code class="text-sm">{{ key.accessKey }}</code>
                      <Button
                        variant="ghost"
                        size="icon"
                        class="h-6 w-6"
                        @click="copyToClipboard(key.accessKey)"
                        ><Copy class="h-3 w-3"
                      /></Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div class="flex items-center gap-2">
                      <code class="text-sm">{{
                        showSecretKey === key.id
                          ? key.secretKey
                          : "••••••••••••••••••••••••"
                      }}</code>
                      <Button
                        variant="ghost"
                        size="icon"
                        class="h-6 w-6"
                        @click="
                          showSecretKey =
                            showSecretKey === key.id ? null : key.id
                        "
                      >
                        <Eye v-if="showSecretKey !== key.id" class="h-3 w-3" />
                        <EyeOff v-else class="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell class="text-muted-foreground">{{
                    key.createdAt
                  }}</TableCell>
                  <TableCell
                    ><Badge variant="outline" class="gap-1"
                      ><CheckCircle2
                        class="h-3 w-3 text-green-500"
                      />正常</Badge
                    ></TableCell
                  >
                  <TableCell class="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      @click="handleResetKey(key)"
                      ><RefreshCw class="mr-1 h-3 w-3" />重置</Button
                    >
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      <!-- Monitor Tab -->
      <TabsContent value="monitor" class="space-y-4">
        <div class="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader class="pb-2"
              ><CardTitle class="text-sm font-medium text-muted-foreground"
                >今日调用</CardTitle
              ></CardHeader
            >
            <CardContent
              ><div class="text-2xl font-bold">6,800</div>
              <div class="flex items-center text-xs text-muted-foreground">
                <TrendingUp class="mr-1 h-3 w-3 text-green-500" />较昨日 +8%
              </div></CardContent
            >
          </Card>
          <Card>
            <CardHeader class="pb-2"
              ><CardTitle class="text-sm font-medium text-muted-foreground"
                >本周调用</CardTitle
              ></CardHeader
            >
            <CardContent
              ><div class="text-2xl font-bold">40,100</div></CardContent
            >
          </Card>
          <Card>
            <CardHeader class="pb-2"
              ><CardTitle class="text-sm font-medium text-muted-foreground"
                >错误率</CardTitle
              ></CardHeader
            >
            <CardContent
              ><div class="text-2xl font-bold text-yellow-600">
                0.3%
              </div></CardContent
            >
          </Card>
        </div>
        <Card>
          <CardHeader
            ><CardTitle>近期 API 调用统计</CardTitle
            ><CardDescription>过去7天的调用趋势</CardDescription></CardHeader
          >
          <CardContent>
            <div class="flex items-end gap-3 h-40">
              <div
                v-for="stat in apiCallStats"
                :key="stat.date"
                class="flex-1 flex flex-col items-center gap-1"
              >
                <div
                  class="w-full bg-primary/20 rounded-t"
                  :style="{ height: `${(stat.calls / 8000) * 100}%` }"
                />
                <span class="text-xs text-muted-foreground">{{
                  stat.date
                }}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader
            ><CardTitle>错误日志</CardTitle
            ><CardDescription>最近的 API 调用错误</CardDescription></CardHeader
          >
          <CardContent>
            <Table>
              <TableHeader
                ><TableRow
                  ><TableHead>时间</TableHead><TableHead>API</TableHead
                  ><TableHead>错误</TableHead
                  ><TableHead>状态码</TableHead></TableRow
                ></TableHeader
              >
              <TableBody>
                <TableRow v-for="log in errorLogs" :key="log.time">
                  <TableCell class="text-muted-foreground">{{
                    log.time
                  }}</TableCell>
                  <TableCell class="font-mono text-sm">{{ log.api }}</TableCell>
                  <TableCell
                    ><div class="flex items-center gap-2">
                      <AlertTriangle class="h-4 w-4 text-yellow-500" />{{
                        log.error
                      }}
                    </div></TableCell
                  >
                  <TableCell
                    ><Badge variant="outline" class="gap-1 text-red-500">{{
                      log.code
                    }}</Badge></TableCell
                  >
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>

    <!-- Reset Key Dialog -->
    <Dialog v-model:open="resetDialogOpen">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>重置 SecretKey</DialogTitle>
          <DialogDescription
            >此操作不可逆，重置后旧密钥将立即失效</DialogDescription
          >
        </DialogHeader>
        <div
          v-if="selectedKey"
          class="rounded-lg border border-destructive/50 bg-destructive/5 p-4"
        >
          <p class="text-sm">
            确定要重置
            <span class="font-medium">{{ selectedKey.name }}</span> 的 SecretKey
            吗？
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline" @click="resetDialogOpen = false"
            >取消</Button
          >
          <Button variant="destructive" @click="resetDialogOpen = false"
            >确认重置</Button
          >
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
<!-- [AI_END LINES=193 TIMESTAMP=2025-06-15 12:00:00] -->

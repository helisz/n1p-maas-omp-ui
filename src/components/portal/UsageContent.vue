<!-- [AI_START TIMESTAMP=2025-06-20 06:35:00] -->
<script setup lang="ts">
import { ref, computed } from 'vue'
import Card from '@/components/ui/Card.vue'
import CardHeader from '@/components/ui/CardHeader.vue'
import CardTitle from '@/components/ui/CardTitle.vue'
import CardDescription from '@/components/ui/CardDescription.vue'
import CardContent from '@/components/ui/CardContent.vue'
import Badge from '@/components/ui/Badge.vue'
import Input from '@/components/ui/Input.vue'
import Table from '@/components/ui/Table.vue'
import TableHeader from '@/components/ui/TableHeader.vue'
import TableBody from '@/components/ui/TableBody.vue'
import TableRow from '@/components/ui/TableRow.vue'
import TableHead from '@/components/ui/TableHead.vue'
import TableCell from '@/components/ui/TableCell.vue'
import {
  Activity, TrendingUp, Users, Clock, Search, Brain,
  AlertTriangle, CheckCircle2,
} from 'lucide-vue-next'

const stats = [
  { title: '今日总调用', value: '128,456', icon: Activity, change: '+8.5%' },
  { title: '本周总调用', value: '856,432', icon: TrendingUp, change: '+12.3%' },
  { title: '活跃客户数', value: '45', icon: Users, change: '+2' },
  { title: '平均延迟', value: '245', unit: 'ms', icon: Clock, change: '-5%' },
]

const modelUsages = [
  { model: 'GPT-4o', provider: 'OpenAI', totalCalls: 456000, tokens: '1.2B', avgLatency: '210ms', status: 'normal', errorRate: '0.1%' },
  { model: 'Claude 3.5 Sonnet', provider: 'Anthropic', totalCalls: 234000, tokens: '680M', avgLatency: '320ms', status: 'normal', errorRate: '0.2%' },
  { model: 'DeepSeek V3', provider: 'DeepSeek', totalCalls: 189000, tokens: '420M', avgLatency: '180ms', status: 'normal', errorRate: '0.05%' },
  { model: 'Gemini 1.5 Pro', provider: 'Google', totalCalls: 98000, tokens: '310M', avgLatency: '280ms', status: 'warning', errorRate: '0.8%' },
  { model: 'Qwen2.5 72B', provider: 'Alibaba Cloud', totalCalls: 67000, tokens: '190M', avgLatency: '260ms', status: 'normal', errorRate: '0.15%' },
]

const customerUsages = [
  { company: '华为云科技', callsToday: 45000, callsMonth: 320000, quotaUsed: 85, status: 'normal' },
  { company: '阿里云数', callsToday: 38000, callsMonth: 280000, quotaUsed: 78, status: 'normal' },
  { company: '腾讯云智', callsToday: 32000, callsMonth: 210000, quotaUsed: 92, status: 'warning' },
  { company: '百度智能', callsToday: 21000, callsMonth: 150000, quotaUsed: 65, status: 'normal' },
  { company: '字节跳动', callsToday: 18000, callsMonth: 120000, quotaUsed: 45, status: 'normal' },
]

const dailyStats = [
  { date: '03-10', calls: 120000 }, { date: '03-11', calls: 135000 },
  { date: '03-12', calls: 128000 }, { date: '03-13', calls: 142000 },
  { date: '03-14', calls: 138000 }, { date: '03-15', calls: 156000 },
  { date: '03-16', calls: 128456 },
]

const searchQuery = ref('')

const filteredModels = computed(() =>
  modelUsages.filter(m =>
    m.model.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    m.provider.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
)
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-2xl font-semibold text-foreground">用量监控</h2>
      <p class="text-muted-foreground">实时监控平台 API 调用量与各客户用量分布</p>
    </div>

    <!-- Stats -->
    <div class="grid gap-4 md:grid-cols-4">
      <Card v-for="stat in stats" :key="stat.title">
        <CardHeader class="pb-2">
          <CardTitle class="text-sm font-medium text-muted-foreground">{{ stat.title }}</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="flex items-baseline gap-1">
            <span class="text-2xl font-bold">{{ stat.value }}</span>
            <span v-if="stat.unit" class="text-sm text-muted-foreground">{{ stat.unit }}</span>
          </div>
          <div class="mt-1 text-xs text-green-500">{{ stat.change }}</div>
        </CardContent>
      </Card>
    </div>

    <!-- Daily Trend -->
    <Card>
      <CardHeader>
        <CardTitle>近7日调用趋势</CardTitle>
        <CardDescription>平台每日 API 调用总量</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex items-end gap-3 h-48">
          <div v-for="stat in dailyStats" :key="stat.date" class="flex-1 flex flex-col items-center gap-1">
            <div class="w-full bg-primary/20 rounded-t" :style="{ height: `${(stat.calls / 160000) * 100}%` }" />
            <span class="text-xs text-muted-foreground">{{ stat.date }}</span>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Model Usage -->
    <Card>
      <CardHeader>
        <div class="flex items-center justify-between">
          <div>
            <CardTitle>模型用量排行</CardTitle>
            <CardDescription>各模型本月累计调用统计</CardDescription>
          </div>
          <div class="relative">
            <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input v-model="searchQuery" placeholder="搜索模型..." class="w-64 pl-8" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>模型名称</TableHead>
              <TableHead>提供商</TableHead>
              <TableHead>总调用量</TableHead>
              <TableHead>Token 消耗</TableHead>
              <TableHead>平均延迟</TableHead>
              <TableHead>错误率</TableHead>
              <TableHead>状态</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="m in filteredModels" :key="m.model">
              <TableCell class="font-medium">{{ m.model }}</TableCell>
              <TableCell>{{ m.provider }}</TableCell>
              <TableCell>{{ m.totalCalls.toLocaleString() }}</TableCell>
              <TableCell>{{ m.tokens }}</TableCell>
              <TableCell>{{ m.avgLatency }}</TableCell>
              <TableCell>{{ m.errorRate }}</TableCell>
              <TableCell>
                <Badge v-if="m.status === 'normal'" variant="outline" class="gap-1">
                  <CheckCircle2 class="h-3 w-3 text-green-500" />正常
                </Badge>
                <Badge v-else variant="outline" class="gap-1">
                  <AlertTriangle class="h-3 w-3 text-yellow-500" />告警
                </Badge>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>

    <!-- Customer Usage TOP -->
    <Card>
      <CardHeader>
        <CardTitle>客户用量 TOP5</CardTitle>
        <CardDescription>本月调用量最高的企业客户</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>企业名称</TableHead>
              <TableHead>今日调用</TableHead>
              <TableHead>本月累计</TableHead>
              <TableHead>配额使用率</TableHead>
              <TableHead>状态</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="c in customerUsages" :key="c.company">
              <TableCell class="font-medium">{{ c.company }}</TableCell>
              <TableCell>{{ c.callsToday.toLocaleString() }}</TableCell>
              <TableCell>{{ c.callsMonth.toLocaleString() }}</TableCell>
              <TableCell>
                <div class="flex items-center gap-2">
                  <div class="h-2 w-24 overflow-hidden rounded-full bg-muted">
                    <div class="h-full rounded-full bg-primary" :style="{ width: c.quotaUsed + '%' }" />
                  </div>
                  <span class="text-xs">{{ c.quotaUsed }}%</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge v-if="c.status === 'normal'" variant="outline" class="gap-1">
                  <CheckCircle2 class="h-3 w-3 text-green-500" />正常
                </Badge>
                <Badge v-else variant="outline" class="gap-1">
                  <AlertTriangle class="h-3 w-3 text-yellow-500" />预警
                </Badge>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
</template>
<!-- [AI_END LINES=154 TIMESTAMP=2025-06-20 06:35:00] -->

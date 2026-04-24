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
import { Search, Brain, CheckCircle2, AlertTriangle, XCircle, Eye, Edit, Power } from 'lucide-vue-next'

const models = [
  { id: 'gpt-4o', name: 'GPT-4o', provider: 'OpenAI', modality: 'Text + Vision', contextLength: 128000, status: 'online', promptPrice: 2.5, completionPrice: 10.0, calls: 456000 },
  { id: 'gpt-4o-mini', name: 'GPT-4o Mini', provider: 'OpenAI', modality: 'Text + Vision', contextLength: 128000, status: 'online', promptPrice: 0.15, completionPrice: 0.6, calls: 234000 },
  { id: 'claude-3-5-sonnet', name: 'Claude 3.5 Sonnet', provider: 'Anthropic', modality: 'Text + Vision', contextLength: 200000, status: 'online', promptPrice: 3.0, completionPrice: 15.0, calls: 189000 },
  { id: 'deepseek-chat', name: 'DeepSeek V3', provider: 'DeepSeek', modality: 'Text', contextLength: 64000, status: 'maintenance', promptPrice: 0.1, completionPrice: 0.5, calls: 98000 },
  { id: 'gemini-1-5-pro', name: 'Gemini 1.5 Pro', provider: 'Google', modality: 'Text + Vision + Audio', contextLength: 2000000, status: 'online', promptPrice: 3.5, completionPrice: 10.5, calls: 67000 },
]

const statusConfig: Record<string, { label: string; variant: 'default' | 'outline' | 'secondary' | 'destructive'; icon: typeof CheckCircle2; class: string }> = {
  online: { label: '正常', variant: 'outline', icon: CheckCircle2, class: 'text-green-500' },
  maintenance: { label: '维护中', variant: 'outline', icon: AlertTriangle, class: 'text-yellow-500' },
  offline: { label: '已下线', variant: 'secondary', icon: XCircle, class: 'text-muted-foreground' },
}

const searchQuery = ref('')
const detailOpen = ref(false)
const selectedModel = ref<typeof models[0] | null>(null)

const filteredModels = computed(() =>
  models.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      m.provider.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
)

function handleViewDetail(model: typeof models[0]) {
  selectedModel.value = model
  detailOpen.value = true
}

const stats = computed(() => ({
  total: models.length,
  online: models.filter((m) => m.status === 'online').length,
  maintenance: models.filter((m) => m.status === 'maintenance').length,
  totalCalls: models.reduce((acc, m) => acc + m.calls, 0),
}))
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-2xl font-semibold text-foreground">模型管理</h2>
      <p class="text-muted-foreground">管理平台接入的模型、定价与服务状态</p>
    </div>

    <div class="grid gap-4 md:grid-cols-4">
      <Card>
        <CardHeader class="pb-2"><CardTitle class="text-sm font-medium text-muted-foreground">接入模型数</CardTitle></CardHeader>
        <CardContent><div class="text-2xl font-bold">{{ stats.total }}</div></CardContent>
      </Card>
      <Card>
        <CardHeader class="pb-2"><CardTitle class="text-sm font-medium text-muted-foreground">正常服务</CardTitle></CardHeader>
        <CardContent><div class="text-2xl font-bold text-green-600">{{ stats.online }}</div></CardContent>
      </Card>
      <Card>
        <CardHeader class="pb-2"><CardTitle class="text-sm font-medium text-muted-foreground">维护中</CardTitle></CardHeader>
        <CardContent><div class="text-2xl font-bold text-yellow-600">{{ stats.maintenance }}</div></CardContent>
      </Card>
      <Card>
        <CardHeader class="pb-2"><CardTitle class="text-sm font-medium text-muted-foreground">本月调用量</CardTitle></CardHeader>
        <CardContent><div class="text-2xl font-bold">{{ stats.totalCalls.toLocaleString() }}</div></CardContent>
      </Card>
    </div>

    <Card>
      <CardHeader>
        <div class="flex items-center justify-between">
          <CardTitle>模型列表</CardTitle>
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
              <TableHead>模态</TableHead>
              <TableHead>上下文长度</TableHead>
              <TableHead>Prompt单价</TableHead>
              <TableHead>Completion单价</TableHead>
              <TableHead>状态</TableHead>
              <TableHead class="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="model in filteredModels" :key="model.id">
              <TableCell class="font-medium">{{ model.name }}</TableCell>
              <TableCell>{{ model.provider }}</TableCell>
              <TableCell>{{ model.modality }}</TableCell>
              <TableCell>{{ model.contextLength.toLocaleString() }} Tokens</TableCell>
              <TableCell>${{ model.promptPrice }}/1M</TableCell>
              <TableCell>${{ model.completionPrice }}/1M</TableCell>
              <TableCell>
                <Badge :variant="statusConfig[model.status].variant" class="gap-1">
                  <component :is="statusConfig[model.status].icon" :class="['h-3 w-3', statusConfig[model.status].class]" />
                  {{ statusConfig[model.status].label }}
                </Badge>
              </TableCell>
              <TableCell class="text-right">
                <div class="flex justify-end gap-2">
                  <Button variant="ghost" size="sm" @click="handleViewDetail(model)"><Eye class="mr-1 h-3 w-3" />详情</Button>
                  <Button variant="ghost" size="sm"><Edit class="mr-1 h-3 w-3" />编辑</Button>
                  <Button variant="ghost" size="sm"><Power class="mr-1 h-3 w-3" />{{ model.status === 'online' ? '停用' : '启用' }}</Button>
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
          <DialogTitle>模型详情</DialogTitle>
          <DialogDescription>查看模型详细配置与定价</DialogDescription>
        </DialogHeader>
        <div v-if="selectedModel" class="space-y-3">
          <div class="flex justify-between"><span class="text-muted-foreground">模型名称</span><span class="font-medium">{{ selectedModel.name }}</span></div>
          <div class="flex justify-between"><span class="text-muted-foreground">模型ID</span><span class="font-mono">{{ selectedModel.id }}</span></div>
          <div class="flex justify-between"><span class="text-muted-foreground">提供商</span><span>{{ selectedModel.provider }}</span></div>
          <div class="flex justify-between"><span class="text-muted-foreground">模态</span><span>{{ selectedModel.modality }}</span></div>
          <div class="flex justify-between"><span class="text-muted-foreground">上下文长度</span><span>{{ selectedModel.contextLength.toLocaleString() }} Tokens</span></div>
          <div class="flex justify-between"><span class="text-muted-foreground">Prompt单价</span><span>${{ selectedModel.promptPrice }}/1M Tokens</span></div>
          <div class="flex justify-between"><span class="text-muted-foreground">Completion单价</span><span>${{ selectedModel.completionPrice }}/1M Tokens</span></div>
          <div class="flex justify-between"><span class="text-muted-foreground">状态</span>
            <Badge :variant="statusConfig[selectedModel.status].variant" class="gap-1">
              <component :is="statusConfig[selectedModel.status].icon" :class="['h-3 w-3', statusConfig[selectedModel.status].class]" />
              {{ statusConfig[selectedModel.status].label }}
            </Badge>
          </div>
          <div class="flex justify-between"><span class="text-muted-foreground">本月调用量</span><span>{{ selectedModel.calls.toLocaleString() }}</span></div>
        </div>
        <DialogFooter><Button variant="outline" @click="detailOpen = false">关闭</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
<!-- [AI_END LINES=130 TIMESTAMP=2025-06-20 06:40:00] -->

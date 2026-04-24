<!-- [AI_START TIMESTAMP=2025-06-15 12:00:00] -->
<script setup lang="ts">
import { ref } from 'vue'
import Card from '@/components/ui/Card.vue'
import CardHeader from '@/components/ui/CardHeader.vue'
import CardTitle from '@/components/ui/CardTitle.vue'
import CardDescription from '@/components/ui/CardDescription.vue'
import CardContent from '@/components/ui/CardContent.vue'
import Button from '@/components/ui/Button.vue'
import Badge from '@/components/ui/Badge.vue'
import Input from '@/components/ui/Input.vue'
import Label from '@/components/ui/Label.vue'
import Separator from '@/components/ui/Separator.vue'
import Dialog from '@/components/ui/Dialog.vue'
import DialogContent from '@/components/ui/DialogContent.vue'
import DialogHeader from '@/components/ui/DialogHeader.vue'
import DialogTitle from '@/components/ui/DialogTitle.vue'
import DialogDescription from '@/components/ui/DialogDescription.vue'
import DialogFooter from '@/components/ui/DialogFooter.vue'
import {
  Building2, CheckCircle2, ShieldCheck, Edit, Upload,
  Key, RefreshCw,
} from 'lucide-vue-next'

const enterpriseInfo = {
  name: '中科云数科技有限公司', creditCode: '91110108MA01XXXXXX', legalPerson: '张三',
  contactPerson: '李四', contactPhone: '138****8888', contactEmail: 'admin@zhongkeyunshu.com',
  address: '北京市海淀区中关村科技园区XX号', registeredAt: '2024-01-15', verifiedAt: '2024-01-16', status: 'verified',
}

const uKeyInfo = {
  serialNumber: 'CITIC2024XXXXXXXX', boundAt: '2024-01-16 10:30:00',
  expiry: '2025-01-16', status: 'active', lastUsed: '2024-03-15 14:32:00',
}

const editDialogOpen = ref(false)
const rebindDialogOpen = ref(false)
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-2xl font-semibold text-foreground">企业信息管理</h2>
      <p class="text-muted-foreground">查看和管理企业认证信息</p>
    </div>

    <div class="grid gap-6 lg:grid-cols-2">
      <!-- Basic Info -->
      <Card>
        <CardHeader>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10"><Building2 class="h-5 w-5 text-primary" /></div>
              <div><CardTitle>企业基本信息</CardTitle><CardDescription>工商注册信息</CardDescription></div>
            </div>
            <Badge variant="outline" class="gap-1"><CheckCircle2 class="h-3 w-3 text-green-500" />已认证</Badge>
          </div>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="grid gap-4">
            <div class="space-y-1"><Label class="text-muted-foreground">企业名称</Label><p class="font-medium">{{ enterpriseInfo.name }}</p></div>
            <div class="space-y-1"><Label class="text-muted-foreground">统一社会信用代码</Label><p class="font-mono">{{ enterpriseInfo.creditCode }}</p></div>
            <div class="space-y-1"><Label class="text-muted-foreground">法定代表人</Label><p>{{ enterpriseInfo.legalPerson }}</p></div>
            <div class="space-y-1"><Label class="text-muted-foreground">企业地址</Label><p>{{ enterpriseInfo.address }}</p></div>
          </div>
          <Separator />
          <div class="flex items-center justify-between text-sm text-muted-foreground">
            <span>注册时间：{{ enterpriseInfo.registeredAt }}</span>
            <span>认证时间：{{ enterpriseInfo.verifiedAt }}</span>
          </div>
        </CardContent>
      </Card>

      <!-- Contact Info -->
      <Card>
        <CardHeader>
          <div class="flex items-center justify-between">
            <div><CardTitle>联系人信息</CardTitle><CardDescription>企业管理员联系方式</CardDescription></div>
            <Button variant="outline" size="sm" @click="editDialogOpen = true"><Edit class="mr-1 h-3 w-3" />修改</Button>
          </div>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="grid gap-4">
            <div class="space-y-1"><Label class="text-muted-foreground">联系人</Label><p class="font-medium">{{ enterpriseInfo.contactPerson }}</p></div>
            <div class="space-y-1"><Label class="text-muted-foreground">联系电话</Label><p>{{ enterpriseInfo.contactPhone }}</p></div>
            <div class="space-y-1"><Label class="text-muted-foreground">联系邮箱</Label><p>{{ enterpriseInfo.contactEmail }}</p></div>
          </div>
        </CardContent>
      </Card>

      <!-- UKey Binding -->
      <Card class="lg:col-span-2">
        <CardHeader>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-50"><ShieldCheck class="h-5 w-5 text-cyan-600" /></div>
              <div><CardTitle>网银Key绑定状态</CardTitle><CardDescription>中信网银Key认证信息</CardDescription></div>
            </div>
            <Badge class="gap-1"><CheckCircle2 class="h-3 w-3" />已绑定</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div class="grid gap-6 md:grid-cols-2">
            <div class="space-y-4">
              <div class="space-y-1"><Label class="text-muted-foreground">Key 序列号</Label><p class="font-mono">{{ uKeyInfo.serialNumber }}</p></div>
              <div class="space-y-1"><Label class="text-muted-foreground">绑定时间</Label><p>{{ uKeyInfo.boundAt }}</p></div>
              <div class="space-y-1"><Label class="text-muted-foreground">证书有效期</Label><p>{{ uKeyInfo.expiry }}</p></div>
            </div>
            <div class="space-y-4">
              <div class="space-y-1"><Label class="text-muted-foreground">最近使用</Label><p>{{ uKeyInfo.lastUsed }}</p></div>
              <div class="space-y-1"><Label class="text-muted-foreground">状态</Label><Badge variant="outline" class="gap-1"><CheckCircle2 class="h-3 w-3 text-green-500" />正常</Badge></div>
            </div>
          </div>
          <Separator class="my-4" />
          <div class="flex gap-2">
            <Button variant="outline" @click="rebindDialogOpen = true"><RefreshCw class="mr-2 h-4 w-4" />重新绑定</Button>
            <Button variant="outline"><Key class="mr-2 h-4 w-4" />测试认证</Button>
          </div>
        </CardContent>
      </Card>

      <!-- Qualification Documents -->
      <Card class="lg:col-span-2">
        <CardHeader><CardTitle>资质文件</CardTitle><CardDescription>企业认证上传的资质文件</CardDescription></CardHeader>
        <CardContent>
          <div class="grid gap-4 md:grid-cols-3">
            <div class="rounded-lg border p-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="flex h-10 w-10 items-center justify-center rounded bg-muted"><Building2 class="h-5 w-5 text-muted-foreground" /></div>
                  <div><p class="font-medium">营业执照</p><p class="text-xs text-muted-foreground">business_license.pdf</p></div>
                </div>
                <Badge variant="outline" class="text-green-600">已上传</Badge>
              </div>
            </div>
            <div class="rounded-lg border p-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="flex h-10 w-10 items-center justify-center rounded bg-muted"><ShieldCheck class="h-5 w-5 text-muted-foreground" /></div>
                  <div><p class="font-medium">法人身份证</p><p class="text-xs text-muted-foreground">legal_person_id.pdf</p></div>
                </div>
                <Badge variant="outline" class="text-green-600">已上传</Badge>
              </div>
            </div>
            <div class="rounded-lg border border-dashed p-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="flex h-10 w-10 items-center justify-center rounded bg-muted"><Upload class="h-5 w-5 text-muted-foreground" /></div>
                  <div><p class="font-medium">其他资质</p><p class="text-xs text-muted-foreground">可选上传</p></div>
                </div>
                <Button variant="ghost" size="sm">上传</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Edit Dialog -->
    <Dialog v-model:open="editDialogOpen">
      <DialogContent>
        <DialogHeader><DialogTitle>修改联系人信息</DialogTitle><DialogDescription>更新企业管理员联系方式</DialogDescription></DialogHeader>
        <div class="space-y-4">
          <div class="space-y-2"><Label for="contactPerson">联系人</Label><Input id="contactPerson" :default-value="enterpriseInfo.contactPerson" /></div>
          <div class="space-y-2"><Label for="contactPhone">联系电话</Label><Input id="contactPhone" :default-value="enterpriseInfo.contactPhone" /></div>
          <div class="space-y-2"><Label for="contactEmail">联系邮箱</Label><Input id="contactEmail" type="email" :default-value="enterpriseInfo.contactEmail" /></div>
        </div>
        <DialogFooter>
          <Button variant="outline" @click="editDialogOpen = false">取消</Button>
          <Button @click="editDialogOpen = false">保存</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <!-- Rebind Dialog -->
    <Dialog v-model:open="rebindDialogOpen">
      <DialogContent>
        <DialogHeader><DialogTitle>重新绑定网银Key</DialogTitle><DialogDescription>请插入新的网银Key设备后点击确认</DialogDescription></DialogHeader>
        <div class="flex items-center gap-3 rounded-lg bg-muted p-4">
          <ShieldCheck class="h-5 w-5 text-muted-foreground" />
          <p class="text-sm text-muted-foreground">重新绑定后，旧的网银Key将立即失效</p>
        </div>
        <DialogFooter>
          <Button variant="outline" @click="rebindDialogOpen = false">取消</Button>
          <Button @click="rebindDialogOpen = false">确认重新绑定</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
<!-- [AI_END LINES=143 TIMESTAMP=2025-06-15 12:00:00] -->

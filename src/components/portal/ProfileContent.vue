<script setup lang="ts">
import { computed, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { UserIcon, EnvelopeIcon, PhoneIcon, BuildingOffice2Icon, ShieldCheckIcon, KeyIcon, PencilSquareIcon, CheckCircleIcon, DevicePhoneMobileIcon, ComputerDesktopIcon, LockClosedIcon, CameraIcon } from '@heroicons/vue/24/outline';

const auth = useAuthStore();
const editingBasic = ref(false);
const showPasswordDialog = ref(false);
const avatarPreview = ref<string | null>(null);
const avatarFileInput = ref<HTMLInputElement | null>(null);
const currentAvatar = computed(() => avatarPreview.value ?? auth.user?.avatar);

function triggerAvatarUpload() {
  avatarFileInput.value?.click();
}

function onAvatarChange(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      avatarPreview.value = url;
      auth.updateAvatar(url);
    };
    reader.readAsDataURL(input.files[0]);
  }
}

const profileForm = ref({
  name: auth.user?.name ?? '张三',
  email: auth.user?.email ?? 'admin@sample.com',
  phone: '138****8888',
  department: '技术部',
});

const passwordForm = ref({
  current: '',
  new: '',
  confirm: '',
});

const loginHistory = [
  { device: 'Windows 11 - Chrome', ip: '192.168.1.100', time: '2024-03-15 14:30:00', current: true },
  { device: 'macOS - Safari', ip: '192.168.1.105', time: '2024-03-14 09:15:22', current: false },
  { device: 'iPhone 15 - App', ip: '10.0.0.55', time: '2024-03-10 18:42:11', current: false },
];

const initials = auth.user?.name?.charAt(0) ?? '管';
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-foreground text-2xl font-semibold">个人中心</h2>
      <p class="text-muted-foreground">管理您的个人账户信息与安全设置</p>
    </div>

    <div class="grid gap-6 lg:grid-cols-12 lg:items-start">
      <Card class="lg:col-span-4">
        <CardContent class="flex flex-col items-center pt-6">
          <div class="group relative cursor-pointer" @click="triggerAvatarUpload">
            <Avatar size="lg" class="h-20 w-20">
              <img v-if="currentAvatar" :src="currentAvatar" alt="头像" class="h-full w-full rounded-full object-cover" />
              <AvatarFallback v-else class="bg-primary text-primary-foreground text-2xl font-bold">
                {{ initials }}
              </AvatarFallback>
            </Avatar>
            <div class="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
              <CameraIcon class="h-6 w-6 text-white" />
            </div>
          </div>
          <input ref="avatarFileInput" type="file" accept="image/*" class="hidden" @change="onAvatarChange" />
          <h3 class="mt-4 text-lg font-semibold">{{ auth.user?.name ?? '张三' }}</h3>
          <p class="text-muted-foreground text-sm">{{ auth.user?.company ?? '应用运营管理平台' }}</p>
          <Badge variant="outline" class="mt-2 gap-1 border-green-200 bg-green-50 text-green-700">
            <ShieldCheckIcon class="h-3 w-3" />
            已认证
          </Badge>
          <Separator class="my-4 w-full" />
          <div class="w-full space-y-3">
            <div class="flex items-center gap-2 text-sm">
              <EnvelopeIcon class="text-muted-foreground h-4 w-4 shrink-0" />
              <span class="text-muted-foreground shrink-0">邮箱：</span>
              <span class="truncate">{{ auth.user?.email ?? 'admin@sample.com' }}</span>
            </div>
            <div class="flex items-center gap-2 text-sm">
              <PhoneIcon class="text-muted-foreground h-4 w-4 shrink-0" />
              <span class="text-muted-foreground shrink-0">手机：</span>
              <span>138****8888</span>
            </div>
            <div class="flex items-center gap-2 text-sm">
              <BuildingOffice2Icon class="text-muted-foreground h-4 w-4 shrink-0" />
              <span class="text-muted-foreground shrink-0">部门：</span>
              <span>{{ profileForm.department }}</span>
            </div>
            <div class="flex items-center gap-2 text-sm">
              <UserIcon class="text-muted-foreground h-4 w-4 shrink-0" />
              <span class="text-muted-foreground shrink-0">角色：</span>
              <span>{{ auth.user?.role ?? '管理员' }}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div class="space-y-4 lg:col-span-8">
        <Card>
          <CardHeader class="flex flex-row items-center justify-between">
            <div>
              <CardTitle>基本信息</CardTitle>
              <CardDescription>查看和修改您的个人资料</CardDescription>
            </div>
            <Button variant="outline" size="sm" @click="editingBasic = !editingBasic">
              <PencilSquareIcon class="mr-1 h-3 w-3" />
              {{ editingBasic ? '取消' : '编辑' }}
            </Button>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="grid gap-4 sm:grid-cols-2">
              <div class="space-y-2">
                <Label for="profileName">姓名</Label>
                <Input id="profileName" v-model="profileForm.name" :disabled="!editingBasic" />
              </div>
              <div class="space-y-2">
                <Label for="profileDept">部门</Label>
                <Input id="profileDept" v-model="profileForm.department" :disabled="!editingBasic" />
              </div>
              <div class="space-y-2">
                <Label for="profileEmail">邮箱</Label>
                <Input id="profileEmail" type="email" v-model="profileForm.email" :disabled="!editingBasic" />
              </div>
              <div class="space-y-2">
                <Label for="profilePhone">手机号码</Label>
                <Input id="profilePhone" v-model="profileForm.phone" :disabled="!editingBasic" />
              </div>
            </div>
            <div v-if="editingBasic" class="flex justify-end gap-2">
              <Button variant="outline" @click="editingBasic = false">取消</Button>
              <Button @click="editingBasic = false">保存修改</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader class="flex flex-row items-center justify-between">
            <div>
              <CardTitle>安全设置</CardTitle>
              <CardDescription>管理密码与登录安全</CardDescription>
            </div>
            <Button variant="outline" size="sm" @click="showPasswordDialog = true">
              <KeyIcon class="mr-1 h-3 w-3" />
              修改密码
            </Button>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="bg-muted/40 flex items-center gap-3 rounded-lg p-4">
              <LockClosedIcon class="text-muted-foreground h-5 w-5" />
              <div>
                <p class="text-sm font-medium">密码安全等级</p>
                <p class="text-muted-foreground text-xs">当前密码强度：中等</p>
              </div>
              <Badge variant="secondary" class="ml-auto gap-1 border-green-200 bg-green-50 text-green-600">
                <CheckCircleIcon class="h-3 w-3" />
                已设置
              </Badge>
            </div>
            <Separator />
            <div>
              <p class="mb-3 text-sm font-medium">登录记录</p>
              <div class="space-y-3">
                <div v-for="log in loginHistory" :key="log.time" class="border-border flex items-center gap-3 rounded-lg border p-3">
                  <component :is="log.device.includes('iPhone') ? DevicePhoneMobileIcon : ComputerDesktopIcon" class="text-muted-foreground h-5 w-5 shrink-0" />
                  <div class="min-w-0 flex-1">
                    <p class="text-sm font-medium">{{ log.device }}</p>
                    <p class="text-muted-foreground text-xs">IP: {{ log.ip }} · {{ log.time }}</p>
                  </div>
                  <Badge v-if="log.current" variant="outline" class="shrink-0 gap-1 border-green-200 bg-green-50 text-green-600">
                    <CheckCircleIcon class="h-3 w-3" />
                    当前会话
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>

    <Dialog v-model:open="showPasswordDialog">
      <DialogContent class="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>修改登录密码</DialogTitle>
          <DialogDescription>请输入当前密码并设置新密码</DialogDescription>
        </DialogHeader>
        <div class="space-y-4">
          <div class="space-y-2">
            <Label for="currentPwd">当前密码</Label>
            <Input id="currentPwd" type="password" v-model="passwordForm.current" />
          </div>
          <div class="space-y-2">
            <Label for="newPwd">新密码</Label>
            <Input id="newPwd" type="password" v-model="passwordForm.new" />
          </div>
          <div class="space-y-2">
            <Label for="confirmPwd">确认新密码</Label>
            <Input id="confirmPwd" type="password" v-model="passwordForm.confirm" />
          </div>
          <div class="flex justify-end gap-2">
            <Button variant="outline" @click="showPasswordDialog = false">取消</Button>
            <Button @click="showPasswordDialog = false">保存</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>

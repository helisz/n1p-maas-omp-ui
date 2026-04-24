<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { cn } from '@/lib/utils'
import Dialog from '@/components/ui/Dialog.vue'
import DialogContent from '@/components/ui/DialogContent.vue'
import DialogHeader from '@/components/ui/DialogHeader.vue'
import DialogTitle from '@/components/ui/DialogTitle.vue'
import DialogDescription from '@/components/ui/DialogDescription.vue'
import DialogFooter from '@/components/ui/DialogFooter.vue'
import Button from '@/components/ui/Button.vue'
import Input from '@/components/ui/Input.vue'
import Label from '@/components/ui/Label.vue'
import Switch from '@/components/ui/Switch.vue'
import Card from '@/components/ui/Card.vue'
import CardHeader from '@/components/ui/CardHeader.vue'
import CardTitle from '@/components/ui/CardTitle.vue'
import CardContent from '@/components/ui/CardContent.vue'
import CardDescription from '@/components/ui/CardDescription.vue'
// [AI_START TIMESTAMP=2025-06-15 14:00:00]
// [AI_START TIMESTAMP=2025-06-17 11:00:00]
import { ShieldCheck, Package, Settings, FileText, Eye, EyeOff, Loader2, Check, Lock, KeyRound, Fingerprint, Cloud, Zap, Headphones, BarChart3, FileSearch, ClipboardCheck, ArrowRight, LogIn } from 'lucide-vue-next'

const router = useRouter()
const auth = useAuthStore()

// Dialog visibility
const showLogin = ref(false)
const showRegister = ref(false)

// Login form state
const email = ref('admin@sample.com')
const password = ref('admin123')
const showPassword = ref(false)
const rememberMe = ref(false)
const loginError = ref('')
const loginSubmitting = ref(false)

// Register form state
const company = ref('')
const name = ref('')
const regEmail = ref('')
const phone = ref('')
const regPassword = ref('')
const showRegPassword = ref(false)
const confirmPassword = ref('')
const showConfirmPassword = ref(false)
const agreed = ref(false)
const registerErrors = ref<Record<string, string | undefined>>({})
const registerSubmitting = ref(false)

// Mouse parallax for hero banner
const mouseX = ref(0)
const mouseY = ref(0)
const heroRef = ref<HTMLElement | null>(null)

function handleMouseMove(e: MouseEvent) {
  if (!heroRef.value) return
  const rect = heroRef.value.getBoundingClientRect()
  mouseX.value = (e.clientX - rect.left - rect.width / 2) / rect.width
  mouseY.value = (e.clientY - rect.top - rect.height / 2) / rect.height
}

onMounted(() => {
  heroRef.value = document.querySelector('.hero-parallax-container')
  if (heroRef.value) {
    heroRef.value.addEventListener('mousemove', handleMouseMove, { passive: true })
  }
})

onUnmounted(() => {
  if (heroRef.value) {
    heroRef.value.removeEventListener('mousemove', handleMouseMove)
  }
})

// [AI_START TIMESTAMP=2025-06-17 10:05:00]
watch(() => [auth.isLoading, auth.isLoggedIn], ([loading, loggedIn]) => {
  if (!loading && loggedIn) {
    router.replace('/dashboard')
  }
}, { immediate: true })

function openLogin() {
  showRegister.value = false
  showLogin.value = true
  loginError.value = ''
}

function openRegister() {
  showLogin.value = false
  showRegister.value = true
  registerErrors.value = {}
}

async function handleLogin() {
  loginError.value = ''
  if (!email.value.trim()) { loginError.value = '请输入邮箱账号'; return }
  if (!password.value) { loginError.value = '请输入密码'; return }

  loginSubmitting.value = true
  const result = await auth.login(email.value.trim(), password.value)
  loginSubmitting.value = false

  if (result.success) {
    showLogin.value = false
    router.push('/dashboard')
  } else {
    loginError.value = result.error ?? '登录失败'
  }
}

function validateRegister(): boolean {
  const errs: Record<string, string> = {}
  if (!company.value.trim()) errs.company = '请输入企业名称'
  if (!name.value.trim()) errs.name = '请输入联系人姓名'
  if (!regEmail.value.trim()) errs.email = '请输入邮箱'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(regEmail.value)) errs.email = '邮箱格式不正确'
  if (!phone.value.trim()) errs.phone = '请输入手机号'
  else if (!/^1[3-9]\d{9}$/.test(phone.value)) errs.phone = '手机号格式不正确'
  if (!regPassword.value) errs.password = '请设置密码'
  else if (regPassword.value.length < 6) errs.password = '密码至少 6 位'
  if (!confirmPassword.value) errs.confirmPassword = '请再次输入密码'
  else if (regPassword.value !== confirmPassword.value) errs.confirmPassword = '两次密码不一致'
  if (!agreed.value) errs.agreed = '请阅读并同意服务协议'
  registerErrors.value = errs
  return Object.keys(errs).length === 0
}

async function handleRegister() {
  if (!validateRegister()) return
  registerSubmitting.value = true
  const result = await auth.register({
    company: company.value,
    name: name.value,
    email: regEmail.value,
    phone: phone.value,
    password: regPassword.value,
  })
  registerSubmitting.value = false

  if (result.success) {
    showRegister.value = false
    router.push('/dashboard')
  } else {
    registerErrors.value = { general: result.error }
  }
}
</script>

<template>
  <!-- Loading state -->
  <div v-if="auth.isLoading" class="flex h-screen items-center justify-center bg-background">
    <Loader2 class="h-6 w-6 animate-spin text-muted-foreground" />
  </div>

  <!-- Main landing page -->
  <div v-else class="min-h-screen bg-background">
    <!-- Top Navigation Bar -->
    <nav class="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <!-- [AI_START TIMESTAMP=2025-06-18 08:01:00] -->
        <div class="flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="h-8 w-8 rounded-lg">
            <rect width="32" height="32" rx="8" fill="#18181B"/>
            <path d="M16 7L7 12.5l9 5.5 9-5.5z" fill="#fff" opacity="0.95"/>
            <path d="M7 16.5l9 5.5 9-5.5" fill="none" stroke="#fff" stroke-width="1.8" opacity="0.55" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7 20l9 5.5 9-5.5" fill="none" stroke="#fff" stroke-width="1.8" opacity="0.3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="text-base font-semibold text-foreground">智信 MaaS</span>
        </div>
        <!-- [AI_END LINES=17 TIMESTAMP=2025-06-18 08:01:00] -->
        <div class="flex items-center gap-4">
          <span class="hidden sm:inline text-sm text-muted-foreground hover:text-foreground cursor-pointer">帮助中心</span>
          <span class="hidden sm:inline text-sm text-muted-foreground hover:text-foreground cursor-pointer">联系我们</span>
          <Button size="sm" @click="openLogin" class="gap-1.5"><LogIn class="h-4 w-4" />登录</Button>
          <!-- <Button variant="outline" size="sm" @click="openRegister">注册</Button> -->
        </div>
      </div>
    </nav>
<!-- [AI_START TIMESTAMP=2025-06-18 10:00:00] -->
<!-- Hero Banner with Dark Gray Tech Animation -->
<section
  class="pt-16 relative overflow-hidden bg-gray-100 hero-parallax-container"
  :style="{ '--parallax-x': mouseX * 30 + 'px', '--parallax-y': mouseY * 20 + 'px', '--parallax-x-reverse': -mouseX * 20 + 'px', '--parallax-y-reverse': -mouseY * 15 + 'px' }"
>
  <!-- Flowing wave curves - Layer 1 -->
  <svg class="absolute inset-0 w-full h-full opacity-[0.35]" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1200 600">
    <path d="M0,300 Q150,200 300,300 T600,300 T900,300 T1200,300" fill="none" stroke="#000000" stroke-width="0.6" class="animate-wave-flow-1"/>
    <path d="M0,350 Q150,450 300,350 T600,350 T900,350 T1200,350" fill="none" stroke="#000000" stroke-width="0.5" class="animate-wave-flow-2"/>
    <path d="M0,250 Q200,150 400,250 T800,250 T1200,250" fill="none" stroke="#000000" stroke-width="0.7" class="animate-wave-flow-3"/>
    <path d="M0,400 Q200,500 400,400 T800,400 T1200,400" fill="none" stroke="#000000" stroke-width="0.4" class="animate-wave-flow-1"/>
  </svg>

  <!-- Diagonal data stream lines - Layer 2 -->
  <svg class="absolute inset-0 w-full h-full opacity-[0.22]" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1200 600">
    <line x1="-100" y1="500" x2="400" y2="-100" stroke="#000000" stroke-width="0.5" stroke-dasharray="4 12" class="animate-stream-1"/>
    <line x1="0" y1="600" x2="500" y2="0" stroke="#000000" stroke-width="0.4" stroke-dasharray="6 18" class="animate-stream-2"/>
    <line x1="100" y1="600" x2="600" y2="0" stroke="#000000" stroke-width="0.6" stroke-dasharray="3 15" class="animate-stream-3"/>
    <line x1="200" y1="600" x2="700" y2="0" stroke="#000000" stroke-width="0.5" stroke-dasharray="8 20" class="animate-stream-1"/>
    <line x1="700" y1="600" x2="1200" y2="0" stroke="#000000" stroke-width="0.4" stroke-dasharray="5 15" class="animate-stream-2"/>
    <line x1="800" y1="600" x2="1300" y2="0" stroke="#000000" stroke-width="0.5" stroke-dasharray="4 16" class="animate-stream-3"/>
  </svg>

  <!-- Curved connection network - Layer 3 -->
  <svg class="absolute inset-0 w-full h-full opacity-[0.28]" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1200 600">
    <!-- Central hub connections -->
    <path d="M600,300 Q500,200 400,250" fill="none" stroke="#000000" stroke-width="0.8" class="animate-network-pulse"/>
    <path d="M600,300 Q700,200 800,150" fill="none" stroke="#000000" stroke-width="0.6" class="animate-network-pulse-delayed"/>
    <path d="M600,300 Q500,400 350,450" fill="none" stroke="#000000" stroke-width="0.7" class="animate-network-pulse-slow"/>
    <path d="M600,300 Q700,400 850,480" fill="none" stroke="#000000" stroke-width="0.5" class="animate-network-pulse-delayed"/>
    <path d="M400,250 Q300,180 200,220" fill="none" stroke="#000000" stroke-width="0.5" class="animate-network-pulse"/>
    <path d="M800,150 Q900,100 1000,140" fill="none" stroke="#000000" stroke-width="0.4" class="animate-network-pulse-slow"/>
    <!-- Connection nodes -->
    <circle cx="600" cy="300" r="2" fill="#000000" class="animate-node-glow"/>
    <circle cx="400" cy="250" r="1.5" fill="#000000" class="animate-node-glow-delayed"/>
    <circle cx="800" cy="150" r="1.5" fill="#000000" class="animate-node-glow-slow"/>
    <circle cx="350" cy="450" r="1.5" fill="#000000" class="animate-node-glow-delayed"/>
    <circle cx="200" cy="220" r="1" fill="#000000" class="animate-node-glow"/>
    <circle cx="1000" cy="140" r="1" fill="#000000" class="animate-node-glow-slow"/>
  </svg>

  <!-- Horizontal flowing energy lines - Layer 4 -->
  <svg class="absolute inset-0 w-full h-full opacity-[0.20]" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1200 600">
    <line x1="-100" y1="100" x2="1300" y2="100" stroke="#000000" stroke-width="0.3" class="animate-energy-flow-1"/>
    <line x1="-100" y1="180" x2="1300" y2="180" stroke="#000000" stroke-width="0.4" class="animate-energy-flow-2"/>
    <line x1="-100" y1="420" x2="1300" y2="420" stroke="#000000" stroke-width="0.4" class="animate-energy-flow-3"/>
    <line x1="-100" y1="520" x2="1300" y2="520" stroke="#000000" stroke-width="0.3" class="animate-energy-flow-1"/>
  </svg>

  <!-- Spiral vortex curves - Layer 5 -->
  <svg class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.18]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
    <path d="M200,200 m-150,0 a150,150 0 1,1 300,0 a150,150 0 1,1 -300,0" fill="none" stroke="#000000" stroke-width="0.5" class="animate-vortex-spin"/>
    <path d="M200,200 m-120,0 a120,120 0 1,0 240,0 a120,120 0 1,0 -240,0" fill="none" stroke="#000000" stroke-width="0.4" class="animate-vortex-spin-reverse"/>
    <path d="M200,200 m-90,0 a90,90 0 1,1 180,0 a90,90 0 1,1 -180,0" fill="none" stroke="#000000" stroke-width="0.6" class="animate-vortex-spin-slow"/>
    <path d="M200,200 m-60,0 a60,60 0 1,0 120,0 a60,60 0 1,0 -120,0" fill="none" stroke="#000000" stroke-width="0.5" class="animate-vortex-spin-reverse-slow"/>
  </svg>

  <!-- Floating particles with trails - Layer 6 -->
  <svg class="absolute inset-0 w-full h-full opacity-[0.14]" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1200 600">
    <circle cx="150" cy="150" r="1.2" fill="#000000" class="animate-particle-float-1"/>
    <circle cx="1050" cy="200" r="1" fill="#000000" class="animate-particle-float-2"/>
    <circle cx="200" cy="450" r="1.5" fill="#000000" class="animate-particle-float-3"/>
    <circle cx="1000" cy="400" r="1.2" fill="#000000" class="animate-particle-float-1"/>
    <circle cx="600" cy="100" r="1" fill="#000000" class="animate-particle-float-2"/>
    <circle cx="500" cy="500" r="1.3" fill="#000000" class="animate-particle-float-3"/>
  </svg>

  <!-- Dynamic gradient glow orbs - Layer 7 -->
  <div class="absolute inset-0 overflow-hidden pointer-events-none">
    <div class="absolute w-[600px] h-[600px] rounded-full bg-gradient-radial from-indigo-400/20 via-purple-400/10 to-transparent blur-3xl animate-glow-orb-1"></div>
    <div class="absolute w-[500px] h-[500px] rounded-full bg-gradient-radial from-blue-400/15 via-cyan-400/10 to-transparent blur-3xl animate-glow-orb-2"></div>
    <div class="absolute w-[400px] h-[400px] rounded-full bg-gradient-radial from-violet-400/15 via-fuchsia-400/10 to-transparent blur-3xl animate-glow-orb-3"></div>
  </div>

  <!-- Radar pulse scan rings - Layer 8 -->
  <svg class="absolute inset-0 w-full h-full opacity-[0.12]" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1200 600">
    <circle cx="600" cy="300" r="50" fill="none" stroke="#000000" stroke-width="0.5" class="animate-radar-pulse-1"/>
    <circle cx="600" cy="300" r="100" fill="none" stroke="#000000" stroke-width="0.4" class="animate-radar-pulse-2"/>
    <circle cx="600" cy="300" r="150" fill="none" stroke="#000000" stroke-width="0.3" class="animate-radar-pulse-3"/>
    <circle cx="200" cy="150" r="30" fill="none" stroke="#000000" stroke-width="0.4" class="animate-radar-pulse-1"/>
    <circle cx="1000" cy="450" r="40" fill="none" stroke="#000000" stroke-width="0.3" class="animate-radar-pulse-2"/>
  </svg>

  <!-- Binary code rain - Layer 9 -->
  <div class="absolute inset-0 overflow-hidden opacity-[0.06] pointer-events-none">
    <div class="absolute left-[10%] top-0 font-mono text-[10px] text-gray-700 animate-binary-rain-1 leading-tight">10110<br/>01001<br/>11010<br/>00101</div>
    <div class="absolute left-[25%] top-0 font-mono text-[10px] text-gray-700 animate-binary-rain-2 leading-tight">01011<br/>10100<br/>01101<br/>10010</div>
    <div class="absolute left-[40%] top-0 font-mono text-[10px] text-gray-700 animate-binary-rain-3 leading-tight">11001<br/>00110<br/>10011<br/>01100</div>
    <div class="absolute left-[60%] top-0 font-mono text-[10px] text-gray-700 animate-binary-rain-1 leading-tight">00101<br/>11010<br/>01011<br/>10100</div>
    <div class="absolute left-[75%] top-0 font-mono text-[10px] text-gray-700 animate-binary-rain-2 leading-tight">10010<br/>01101<br/>10110<br/>01001</div>
    <div class="absolute left-[90%] top-0 font-mono text-[10px] text-gray-700 animate-binary-rain-3 leading-tight">01100<br/>10011<br/>00110<br/>11001</div>
  </div>

  <!-- Geometric polygon mesh - Layer 11 -->
  <svg class="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1200 600">
    <polygon points="100,100 150,50 200,100 150,150" fill="none" stroke="#000000" stroke-width="0.4" class="animate-polygon-morph-1"/>
    <polygon points="1000,400 1050,350 1100,400 1050,450" fill="none" stroke="#000000" stroke-width="0.4" class="animate-polygon-morph-2"/>
    <polygon points="300,500 360,440 420,500 360,560" fill="none" stroke="#000000" stroke-width="0.3" class="animate-polygon-morph-3"/>
    <polygon points="900,150 940,110 980,150 940,190" fill="none" stroke="#000000" stroke-width="0.3" class="animate-polygon-morph-1"/>
  </svg>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center py-18 sm:py-24 lg:py-32">
        <!-- Badge -->
        <div class="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 mb-8">
          <Zap class="h-3.5 w-3.5 text-primary" />
          <span class="text-sm font-medium text-foreground">智信 MaaS 服务平台</span>
        </div>
        <!-- Title -->
        <h1 class="text-4xl sm:text-5xl lg:text-7xl font-bold text-center text-foreground leading-tight tracking-tight">
          智慧无界 · 信以致远
        </h1>
        <!-- Subtitle -->
        <p class="text-lg sm:text-xl text-center text-muted-foreground mt-6 max-w-3xl leading-relaxed">
          一站式企业 MaaS API 服务平台，以安全为基，以高效为纲，赋能企业数字化升级
        </p>
        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row items-center gap-4 mt-10">
          <Button size="lg" @click="openLogin" class="gap-2">
            立即体验
            <ArrowRight class="h-4 w-4" />
          </Button>
          <Button variant="outline" size="lg" @click="openRegister" class="border-border text-foreground hover:bg-muted">
            免费注册
          </Button>
        </div>
        <!-- Stats -->
        <div class="grid grid-cols-3 gap-8 sm:gap-16 mt-16 pt-8 border-t border-border">
          <div class="text-center">
            <p class="text-2xl sm:text-3xl font-bold text-foreground">99.9%</p>
            <p class="text-xs sm:text-sm text-muted-foreground mt-1">服务可用性</p>
          </div>
          <div class="text-center">
            <p class="text-2xl sm:text-3xl font-bold text-foreground">50+</p>
            <p class="text-xs sm:text-sm text-muted-foreground mt-1">API 接口</p>
          </div>
          <div class="text-center">
            <p class="text-2xl sm:text-3xl font-bold text-foreground">7×24</p>
            <p class="text-xs sm:text-sm text-muted-foreground mt-1">技术支持</p>
          </div>
        </div>
      </div>
    </section>
    <!-- [AI_END LINES=52 TIMESTAMP=2025-06-17 10:10:00] -->

    <!-- Feature Section — 4 full-width rows -->
    <section class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-0">

        <!-- Feature 1: Security Authentication -->
        <div class="py-12 sm:py-16 border-b border-border">
          <div class="flex flex-col lg:flex-row items-start gap-8 lg:gap-16">
            <!-- Left: Icon + Title + Description -->
            <div class="flex-1">
              <div class="flex items-center gap-4 mb-6">
                <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <ShieldCheck class="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h2 class="text-xl sm:text-2xl font-bold text-foreground">安全认证・筑牢企业防线</h2>
                  <p class="text-sm text-muted-foreground mt-1">Enterprise-Grade Security</p>
                </div>
              </div>
              <p class="text-base text-muted-foreground leading-relaxed mb-6">
                对接中信网银 Key 认证体系，在登录、支付、服务开通、密钥变更等核心环节实施强制双因子认证，确保每一次关键操作都经过严格的身份核验，为企业数据资产构筑坚实的安全屏障。
              </p>
            </div>
            <!-- Right: Feature details grid -->
            <div class="flex-1 w-full">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="rounded-xl border border-border bg-muted/30 p-4 space-y-2">
                  <div class="flex items-center gap-2">
                    <Lock class="h-4 w-4 text-primary" />
                    <span class="text-sm font-medium text-foreground">数据传输加密</span>
                  </div>
                  <p class="text-xs text-muted-foreground leading-relaxed">全链路 TLS 1.3 加密传输，保障数据在客户端与服务器之间的安全通信</p>
                </div>
                <div class="rounded-xl border border-border bg-muted/30 p-4 space-y-2">
                  <div class="flex items-center gap-2">
                    <KeyRound class="h-4 w-4 text-primary" />
                    <span class="text-sm font-medium text-foreground">网银 Key 认证</span>
                  </div>
                  <p class="text-xs text-muted-foreground leading-relaxed">对接中信网银 Key 硬件证书，关键操作强制双因子身份核验</p>
                </div>
                <div class="rounded-xl border border-border bg-muted/30 p-4 space-y-2">
                  <div class="flex items-center gap-2">
                    <Fingerprint class="h-4 w-4 text-primary" />
                    <span class="text-sm font-medium text-foreground">实名校验</span>
                  </div>
                  <p class="text-xs text-muted-foreground leading-relaxed">企业身份实名认证，操作全程签名留痕，责任可追溯到人</p>
                </div>
                <div class="rounded-xl border border-border bg-muted/30 p-4 space-y-2">
                  <div class="flex items-center gap-2">
                    <Check class="h-4 w-4 text-primary" />
                    <span class="text-sm font-medium text-foreground">全场景覆盖</span>
                  </div>
                  <p class="text-xs text-muted-foreground leading-relaxed">覆盖登录、支付、服务开通、密钥变更等所有核心业务场景</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Feature 2: MaaS Services -->
        <div class="py-12 sm:py-16 border-b border-border">
          <div class="flex flex-col lg:flex-row-reverse items-start gap-8 lg:gap-16">
            <!-- Right: Icon + Title + Description -->
            <div class="flex-1">
              <div class="flex items-center gap-4 mb-6">
                <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <Package class="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h2 class="text-xl sm:text-2xl font-bold text-foreground">MaaS 服务・一站式采购开通</h2>
                  <p class="text-sm text-muted-foreground mt-1">One-Stop MaaS Procurement</p>
                </div>
              </div>
              <p class="text-base text-muted-foreground leading-relaxed mb-6">
                全品类 MaaS API 套餐集中展示，支持在线选购、自动开通，无需人工干预。从基础版到旗舰版灵活选择，公有云无缝对接，让企业以最快速度接入所需的大模型服务能力。
              </p>
            </div>
            <!-- Left: Feature details grid -->
            <div class="flex-1 w-full">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="rounded-xl border border-border bg-muted/30 p-4 space-y-2">
                  <div class="flex items-center gap-2">
                    <Package class="h-4 w-4 text-primary" />
                    <span class="text-sm font-medium text-foreground">灵活套餐选择</span>
                  </div>
                  <p class="text-xs text-muted-foreground leading-relaxed">基础版 / 企业版 / 旗舰版三档灵活选择，满足不同规模企业需求</p>
                </div>
                <div class="rounded-xl border border-border bg-muted/30 p-4 space-y-2">
                  <div class="flex items-center gap-2">
                    <Cloud class="h-4 w-4 text-primary" />
                    <span class="text-sm font-medium text-foreground">公有云无缝对接</span>
                  </div>
                  <p class="text-xs text-muted-foreground leading-relaxed">开通即用，无需人工干预，标准 API 接口快速对接企业现有系统</p>
                </div>
                <div class="rounded-xl border border-border bg-muted/30 p-4 space-y-2">
                  <div class="flex items-center gap-2">
                    <BarChart3 class="h-4 w-4 text-primary" />
                    <span class="text-sm font-medium text-foreground">用量实时监控</span>
                  </div>
                  <p class="text-xs text-muted-foreground leading-relaxed">套餐用量可视化监控，API 调用统计一目了然，费用透明可控</p>
                </div>
                <div class="rounded-xl border border-border bg-muted/30 p-4 space-y-2">
                  <div class="flex items-center gap-2">
                    <Headphones class="h-4 w-4 text-primary" />
                    <span class="text-sm font-medium text-foreground">专属技术支持</span>
                  </div>
                  <p class="text-xs text-muted-foreground leading-relaxed">API 在线调试工具，专属客户经理一对一服务，7×24 小时响应</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Feature 3: Full-process Management -->
        <div class="py-12 sm:py-16 border-b border-border">
          <div class="flex flex-col lg:flex-row items-start gap-8 lg:gap-16">
            <!-- Left: Icon + Title + Description -->
            <div class="flex-1">
              <div class="flex items-center gap-4 mb-6">
                <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <Settings class="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h2 class="text-xl sm:text-2xl font-bold text-foreground">全流程管理・高效便捷</h2>
                  <p class="text-sm text-muted-foreground mt-1">Lifecycle Management</p>
                </div>
              </div>
              <p class="text-base text-muted-foreground leading-relaxed mb-6">
                订单管理、服务管理、API 管理、账单管理四大模块一体化整合。从下单到开通、从监控到续费，实现服务全生命周期的可视化管理，大幅降低企业运营成本。
              </p>
            </div>
            <!-- Right: Feature details grid -->
            <div class="flex-1 w-full">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="rounded-xl border border-border bg-muted/30 p-4 space-y-2">
                  <div class="flex items-center gap-2">
                    <FileText class="h-4 w-4 text-primary" />
                    <span class="text-sm font-medium text-foreground">订单全流程跟踪</span>
                  </div>
                  <p class="text-xs text-muted-foreground leading-relaxed">从下单、审批、支付到开通，订单状态实时追踪，进度透明可视</p>
                </div>
                <div class="rounded-xl border border-border bg-muted/30 p-4 space-y-2">
                  <div class="flex items-center gap-2">
                    <KeyRound class="h-4 w-4 text-primary" />
                    <span class="text-sm font-medium text-foreground">API 密钥管控</span>
                  </div>
                  <p class="text-xs text-muted-foreground leading-relaxed">密钥生成、权限配置、调用范围管控，精细化的 API 访问授权管理</p>
                </div>
                <div class="rounded-xl border border-border bg-muted/30 p-4 space-y-2">
                  <div class="flex items-center gap-2">
                    <BarChart3 class="h-4 w-4 text-primary" />
                    <span class="text-sm font-medium text-foreground">调用量统计</span>
                  </div>
                  <p class="text-xs text-muted-foreground leading-relaxed">多维度 API 调用统计分析，用量趋势、异常告警、配额管理一站搞定</p>
                </div>
                <div class="rounded-xl border border-border bg-muted/30 p-4 space-y-2">
                  <div class="flex items-center gap-2">
                    <ClipboardCheck class="h-4 w-4 text-primary" />
                    <span class="text-sm font-medium text-foreground">账单明细导出</span>
                  </div>
                  <p class="text-xs text-muted-foreground leading-relaxed">透明账单明细，支持按月导出报表，对接企业财务系统，开票便捷</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Feature 4: Security Audit -->
        <div class="py-12 sm:py-16">
          <div class="flex flex-col lg:flex-row-reverse items-start gap-8 lg:gap-16">
            <!-- Right: Icon + Title + Description -->
            <div class="flex-1">
              <div class="flex items-center gap-4 mb-6">
                <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <FileSearch class="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h2 class="text-xl sm:text-2xl font-bold text-foreground">安全审计・可溯可查</h2>
                  <p class="text-sm text-muted-foreground mt-1">Comprehensive Audit Trail</p>
                </div>
              </div>
              <p class="text-base text-muted-foreground leading-relaxed mb-6">
                全流程操作日志记录，满足企业合规审查要求。从登录日志到 API 调用日志，所有操作留痕不可篡改，支持多维度检索与导出审计报告，为企业合规检查提供坚实数据支撑。
              </p>
            </div>
            <!-- Left: Feature details grid -->
            <div class="flex-1 w-full">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="rounded-xl border border-border bg-muted/30 p-4 space-y-2">
                  <div class="flex items-center gap-2">
                    <FileText class="h-4 w-4 text-primary" />
                    <span class="text-sm font-medium text-foreground">全类型日志</span>
                  </div>
                  <p class="text-xs text-muted-foreground leading-relaxed">覆盖登录日志、操作日志、网银 Key 认证日志、API 调用日志全类型</p>
                </div>
                <div class="rounded-xl border border-border bg-muted/30 p-4 space-y-2">
                  <div class="flex items-center gap-2">
                    <Lock class="h-4 w-4 text-primary" />
                    <span class="text-sm font-medium text-foreground">日志不可篡改</span>
                  </div>
                  <p class="text-xs text-muted-foreground leading-relaxed">采用区块链级存储技术，日志一旦写入不可修改或删除，确保审计真实性</p>
                </div>
                <div class="rounded-xl border border-border bg-muted/30 p-4 space-y-2">
                  <div class="flex items-center gap-2">
                    <FileSearch class="h-4 w-4 text-primary" />
                    <span class="text-sm font-medium text-foreground">多维度检索</span>
                  </div>
                  <p class="text-xs text-muted-foreground leading-relaxed">按时间、操作人、操作类型等多维度灵活检索，快速定位目标记录</p>
                </div>
                <div class="rounded-xl border border-border bg-muted/30 p-4 space-y-2">
                  <div class="flex items-center gap-2">
                    <ClipboardCheck class="h-4 w-4 text-primary" />
                    <span class="text-sm font-medium text-foreground">导出审计报告</span>
                  </div>
                  <p class="text-xs text-muted-foreground leading-relaxed">一键导出标准化审计报告，适配企业内控合规检查与外部审计需求</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- Service Advantages Bar -->
    <section class="bg-primary/5 py-12">
      <div class="max-w-7xl mx-auto px-4 text-center">
        <p class="text-lg font-medium text-foreground">安全可靠・高效便捷・合规可控・无缝对接——覆盖企业 MaaS 服务从订购到运维的全流程需求</p>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-foreground text-background">
      <div class="max-w-7xl mx-auto px-4 py-8 text-center space-y-2">
        <p class="text-sm">© 2026 中信国际电讯 版权所有</p>
        <p class="text-sm text-background/60">服务热线：400-XXXX-XXXX | 工作时间：9:00-18:00（工作日）</p>
        <p class="text-sm text-background/60">
          <span class="cursor-pointer hover:text-background">隐私政策</span>
          <span> | </span>
          <span class="cursor-pointer hover:text-background">服务条款</span>
          <span> | </span>
          <span class="cursor-pointer hover:text-background">常见问题</span>
          <span> | </span>
          <span class="cursor-pointer hover:text-background">资质公示</span>
        </p>
      </div>
    </footer>
  </div>

  <!-- Login Dialog -->
  <Dialog :open="showLogin" @update:open="showLogin = $event">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>用您的智信ID登入</DialogTitle>
        <DialogDescription>输入您的账号信息登录智信MaaS服务管理平台</DialogDescription>
      </DialogHeader>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div class="space-y-1.5">
          <Label for="login-email">邮箱账号</Label>
          <Input id="login-email" type="email" v-model="email" />
        </div>
        <div class="space-y-1.5">
          <Label for="login-password">密码</Label>
          <div class="relative">
            <Input id="login-password" :type="showPassword ? 'text' : 'password'" v-model="password" class="pr-10" />
            <button type="button" @click="showPassword = !showPassword" class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <EyeOff v-if="showPassword" class="h-4 w-4" /><Eye v-else class="h-4 w-4" />
            </button>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <Switch id="remember" v-model="rememberMe" />
          <Label for="remember">记住我</Label>
        </div>
        <p v-if="loginError" class="text-sm text-destructive">{{ loginError }}</p>
        <Button type="submit" class="w-full" :disabled="loginSubmitting">
          <Loader2 v-if="loginSubmitting" class="mr-2 h-4 w-4 animate-spin" />
          {{ loginSubmitting ? '登录中...' : '登录' }}
        </Button>
      </form>
      <p class="mt-4 text-center text-sm text-muted-foreground">
        还没有账号？<button type="button" @click="openRegister" class="font-medium text-foreground underline-offset-4 hover:underline">立即注册</button>
      </p>
    </DialogContent>
  </Dialog>

  <!-- Register Dialog -->
  <Dialog :open="showRegister" @update:open="showRegister = $event">
    <DialogContent class="max-h-[85vh] overflow-y-auto sm:max-w-lg">
      <DialogHeader>
        <DialogTitle>创建你的智信ID</DialogTitle>
        <DialogDescription>填写以下信息完成企业账号注册</DialogDescription>
      </DialogHeader>
      <form @submit.prevent="handleRegister" class="space-y-3.5">
        <div class="space-y-1.5">
          <Label for="reg-company">企业名称 <span class="text-destructive">*</span></Label>
          <Input id="reg-company" v-model="company" placeholder="请输入企业全称" :class="cn(registerErrors.company && 'border-destructive')" />
          <p v-if="registerErrors.company" class="text-xs text-destructive">{{ registerErrors.company }}</p>
        </div>
        <div class="space-y-1.5">
          <Label for="reg-name">联系人姓名 <span class="text-destructive">*</span></Label>
          <Input id="reg-name" v-model="name" placeholder="请输入联系人姓名" :class="cn(registerErrors.name && 'border-destructive')" />
          <p v-if="registerErrors.name" class="text-xs text-destructive">{{ registerErrors.name }}</p>
        </div>
        <div class="space-y-1.5">
          <Label for="reg-email">邮箱 <span class="text-destructive">*</span></Label>
          <Input id="reg-email" type="email" v-model="regEmail" placeholder="请输入邮箱" :class="cn(registerErrors.email && 'border-destructive')" />
          <p v-if="registerErrors.email" class="text-xs text-destructive">{{ registerErrors.email }}</p>
        </div>
        <div class="space-y-1.5">
          <Label for="reg-phone">手机号 <span class="text-destructive">*</span></Label>
          <Input id="reg-phone" v-model="phone" placeholder="请输入手机号" :class="cn(registerErrors.phone && 'border-destructive')" />
          <p v-if="registerErrors.phone" class="text-xs text-destructive">{{ registerErrors.phone }}</p>
        </div>
        <div class="space-y-1.5">
          <Label for="reg-password">密码 <span class="text-destructive">*</span></Label>
          <div class="relative">
            <Input id="reg-password" :type="showRegPassword ? 'text' : 'password'" v-model="regPassword" placeholder="请设置密码（至少6位）" :class="cn(registerErrors.password && 'border-destructive', 'pr-10')" />
            <button type="button" @click="showRegPassword = !showRegPassword" class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <EyeOff v-if="showRegPassword" class="h-4 w-4" /><Eye v-else class="h-4 w-4" />
            </button>
          </div>
          <p v-if="registerErrors.password" class="text-xs text-destructive">{{ registerErrors.password }}</p>
        </div>
        <div class="space-y-1.5">
          <Label for="reg-confirm">确认密码 <span class="text-destructive">*</span></Label>
          <div class="relative">
            <Input id="reg-confirm" :type="showConfirmPassword ? 'text' : 'password'" v-model="confirmPassword" placeholder="请再次输入密码" :class="cn(registerErrors.confirmPassword && 'border-destructive', 'pr-10')" />
            <button type="button" @click="showConfirmPassword = !showConfirmPassword" class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <EyeOff v-if="showConfirmPassword" class="h-4 w-4" /><Eye v-else class="h-4 w-4" />
            </button>
          </div>
          <p v-if="registerErrors.confirmPassword" class="text-xs text-destructive">{{ registerErrors.confirmPassword }}</p>
        </div>
        <div class="flex items-center gap-2">
          <input type="checkbox" id="reg-agreed" v-model="agreed" class="rounded" />
          <Label for="reg-agreed" class="text-sm">我已阅读并同意 <span class="text-primary cursor-pointer">服务协议</span></Label>
        </div>
        <p v-if="registerErrors.agreed" class="text-xs text-destructive">{{ registerErrors.agreed }}</p>
        <p v-if="registerErrors.general" class="text-sm text-destructive">{{ registerErrors.general }}</p>
        <Button type="submit" class="w-full" :disabled="registerSubmitting">
          <Loader2 v-if="registerSubmitting" class="mr-2 h-4 w-4 animate-spin" />
          {{ registerSubmitting ? '注册中...' : '注册' }}
        </Button>
      </form>
      <p class="mt-4 text-center text-sm text-muted-foreground">
        已有账号？<button type="button" @click="openLogin" class="font-medium text-foreground underline-offset-4 hover:underline">立即登录</button>
      </p>
    </DialogContent>
  </Dialog>
</template>
<style scoped>
/* [AI_START TIMESTAMP=2025-06-18 08:35:00] */
/* Wave curves flowing animation */
@keyframes wave-flow-1 {
  0% { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: -4800; }
}
@keyframes wave-flow-2 {
  0% { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: -4800; }
}
@keyframes wave-flow-3 {
  0% { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: -3600; }
}
.animate-wave-flow-1 {
  stroke-dasharray: 1200 3600;
  animation: wave-flow-1 20s linear infinite;
}
.animate-wave-flow-2 {
  stroke-dasharray: 1200 3600;
  animation: wave-flow-2 25s linear infinite;
}
.animate-wave-flow-3 {
  stroke-dasharray: 900 2700;
  animation: wave-flow-3 18s linear infinite;
}

/* Diagonal data stream animation */
@keyframes stream-1 {
  0% { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: -160; }
}
@keyframes stream-2 {
  0% { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: -240; }
}
@keyframes stream-3 {
  0% { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: -180; }
}
.animate-stream-1 {
  animation: stream-1 4s linear infinite;
}
.animate-stream-2 {
  animation: stream-2 5s linear infinite;
}
.animate-stream-3 {
  animation: stream-3 3.5s linear infinite;
}

/* Network pulse animation */
@keyframes network-pulse {
  0%, 100% { stroke-dashoffset: 300; opacity: 0.3; }
  50% { stroke-dashoffset: 0; opacity: 0.8; }
}
@keyframes network-pulse-delayed {
  0%, 100% { stroke-dashoffset: 300; opacity: 0.2; }
  40%, 60% { stroke-dashoffset: 0; opacity: 0.7; }
}
@keyframes network-pulse-slow {
  0%, 100% { stroke-dashoffset: 300; opacity: 0.25; }
  45%, 55% { stroke-dashoffset: 0; opacity: 0.6; }
}
.animate-network-pulse {
  stroke-dasharray: 300;
  animation: network-pulse 6s ease-in-out infinite;
}
.animate-network-pulse-delayed {
  stroke-dasharray: 300;
  animation: network-pulse-delayed 7s ease-in-out infinite;
  animation-delay: 1s;
}
.animate-network-pulse-slow {
  stroke-dasharray: 300;
  animation: network-pulse-slow 8s ease-in-out infinite;
  animation-delay: 2s;
}

/* Node glow animation */
@keyframes node-glow {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.5); }
}
@keyframes node-glow-delayed {
  0%, 100% { opacity: 0.2; transform: scale(1); }
  50% { opacity: 0.9; transform: scale(1.3); }
}
@keyframes node-glow-slow {
  0%, 100% { opacity: 0.25; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.4); }
}
.animate-node-glow {
  animation: node-glow 3s ease-in-out infinite;
  transform-origin: center;
}
.animate-node-glow-delayed {
  animation: node-glow-delayed 4s ease-in-out infinite;
  animation-delay: 0.5s;
  transform-origin: center;
}
.animate-node-glow-slow {
  animation: node-glow-slow 5s ease-in-out infinite;
  animation-delay: 1s;
  transform-origin: center;
}

/* Energy flow animation */
@keyframes energy-flow-1 {
  0% { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: -1400; }
}
@keyframes energy-flow-2 {
  0% { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: -1400; }
}
@keyframes energy-flow-3 {
  0% { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: -1400; }
}
.animate-energy-flow-1 {
  stroke-dasharray: 100 1300;
  animation: energy-flow-1 12s linear infinite;
}
.animate-energy-flow-2 {
  stroke-dasharray: 150 1250;
  animation: energy-flow-2 15s linear infinite;
}
.animate-energy-flow-3 {
  stroke-dasharray: 80 1320;
  animation: energy-flow-3 10s linear infinite;
}

/* Vortex spin animation */
@keyframes vortex-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@keyframes vortex-spin-reverse {
  from { transform: rotate(360deg); }
  to { transform: rotate(0deg); }
}
@keyframes vortex-spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@keyframes vortex-spin-reverse-slow {
  from { transform: rotate(360deg); }
  to { transform: rotate(0deg); }
}
.animate-vortex-spin {
  animation: vortex-spin 40s linear infinite;
  transform-origin: center;
}
.animate-vortex-spin-reverse {
  animation: vortex-spin-reverse 35s linear infinite;
  transform-origin: center;
}
.animate-vortex-spin-slow {
  animation: vortex-spin-slow 50s linear infinite;
  transform-origin: center;
}
.animate-vortex-spin-reverse-slow {
  animation: vortex-spin-reverse-slow 45s linear infinite;
  transform-origin: center;
}

/* Particle float animation */
@keyframes particle-float-1 {
  0%, 100% { transform: translate(0, 0); opacity: 0.3; }
  25% { transform: translate(30px, -20px); opacity: 0.8; }
  50% { transform: translate(60px, 0); opacity: 0.5; }
  75% { transform: translate(30px, 20px); opacity: 0.9; }
}
@keyframes particle-float-2 {
  0%, 100% { transform: translate(0, 0); opacity: 0.2; }
  33% { transform: translate(-40px, 30px); opacity: 0.7; }
  66% { transform: translate(-20px, -30px); opacity: 0.4; }
}
@keyframes particle-float-3 {
  0%, 100% { transform: translate(0, 0); opacity: 0.25; }
  20% { transform: translate(20px, 40px); opacity: 0.6; }
  40% { transform: translate(-20px, 20px); opacity: 0.9; }
  60% { transform: translate(-40px, -10px); opacity: 0.5; }
  80% { transform: translate(10px, -30px); opacity: 0.8; }
}
.animate-particle-float-1 {
  animation: particle-float-1 15s ease-in-out infinite;
}
.animate-particle-float-2 {
  animation: particle-float-2 18s ease-in-out infinite;
  animation-delay: 2s;
}
.animate-particle-float-3 {
  animation: particle-float-3 20s ease-in-out infinite;
  animation-delay: 4s;
}

/* [AI_START TIMESTAMP=2025-06-18 10:05:00] */
/* Gradient glow orb animations */
@keyframes glow-orb-1 {
  0%, 100% { transform: translate(-20%, -20%) scale(1); opacity: 0.6; }
  25% { transform: translate(10%, 5%) scale(1.1); opacity: 0.8; }
  50% { transform: translate(30%, 20%) scale(0.95); opacity: 0.7; }
  75% { transform: translate(15%, -10%) scale(1.05); opacity: 0.9; }
}
@keyframes glow-orb-2 {
  0%, 100% { transform: translate(60%, 40%) scale(1); opacity: 0.5; }
  33% { transform: translate(40%, 60%) scale(1.15); opacity: 0.7; }
  66% { transform: translate(70%, 30%) scale(0.9); opacity: 0.6; }
}
@keyframes glow-orb-3 {
  0%, 100% { transform: translate(20%, 80%) scale(1); opacity: 0.5; }
  50% { transform: translate(40%, 50%) scale(1.2); opacity: 0.8; }
}
.animate-glow-orb-1 {
  animation: glow-orb-1 25s ease-in-out infinite;
}
.animate-glow-orb-2 {
  animation: glow-orb-2 30s ease-in-out infinite;
  animation-delay: 5s;
}
.animate-glow-orb-3 {
  animation: glow-orb-3 35s ease-in-out infinite;
  animation-delay: 10s;
}

/* Radar pulse scan animation */
@keyframes radar-pulse-1 {
  0% { r: 20; opacity: 0.8; stroke-width: 1; }
  50% { opacity: 0.3; }
  100% { r: 200; opacity: 0; stroke-width: 0.1; }
}
@keyframes radar-pulse-2 {
  0% { r: 30; opacity: 0.6; stroke-width: 0.8; }
  50% { opacity: 0.2; }
  100% { r: 250; opacity: 0; stroke-width: 0.1; }
}
@keyframes radar-pulse-3 {
  0% { r: 40; opacity: 0.4; stroke-width: 0.6; }
  50% { opacity: 0.15; }
  100% { r: 300; opacity: 0; stroke-width: 0.1; }
}
.animate-radar-pulse-1 {
  animation: radar-pulse-1 4s ease-out infinite;
  transform-origin: center;
}
.animate-radar-pulse-2 {
  animation: radar-pulse-2 4s ease-out infinite;
  animation-delay: 1.3s;
  transform-origin: center;
}
.animate-radar-pulse-3 {
  animation: radar-pulse-3 4s ease-out infinite;
  animation-delay: 2.6s;
  transform-origin: center;
}

/* Binary code rain animation */
@keyframes binary-rain-1 {
  0% { transform: translateY(-100%); opacity: 0; }
  10% { opacity: 0.6; }
  90% { opacity: 0.6; }
  100% { transform: translateY(100vh); opacity: 0; }
}
@keyframes binary-rain-2 {
  0% { transform: translateY(-100%); opacity: 0; }
  10% { opacity: 0.5; }
  90% { opacity: 0.5; }
  100% { transform: translateY(100vh); opacity: 0; }
}
@keyframes binary-rain-3 {
  0% { transform: translateY(-100%); opacity: 0; }
  10% { opacity: 0.4; }
  90% { opacity: 0.4; }
  100% { transform: translateY(100vh); opacity: 0; }
}
.animate-binary-rain-1 {
  animation: binary-rain-1 12s linear infinite;
}
.animate-binary-rain-2 {
  animation: binary-rain-2 15s linear infinite;
  animation-delay: 3s;
}
.animate-binary-rain-3 {
  animation: binary-rain-3 18s linear infinite;
  animation-delay: 6s;
}

/* Audio waveform animation */
@keyframes waveform-1 {
  0%, 100% { d: path('M0,64 Q30,40 60,64 T120,64 T180,64 T240,64 T300,64 T360,64 T420,64 T480,64 T540,64 T600,64 T660,64 T720,64 T780,64 T840,64 T900,64 T960,64 T1020,64 T1080,64 T1140,64 T1200,64'); }
  25% { d: path('M0,64 Q30,80 60,64 T120,50 T180,78 T240,45 T300,70 T360,55 T420,75 T480,40 T540,65 T600,50 T660,80 T720,45 T780,70 T840,55 T900,75 T960,40 T1020,65 T1080,50 T1140,78 T1200,64'); }
  50% { d: path('M0,64 Q30,30 60,64 T120,70 T180,40 T240,80 T300,35 T360,75 T420,45 T480,70 T540,40 T600,80 T660,35 T720,75 T780,45 T840,70 T900,40 T960,80 T1020,35 T1080,75 T1140,45 T1200,64'); }
  75% { d: path('M0,64 Q30,75 60,64 T120,45 T180,70 T240,50 T300,80 T360,40 T420,65 T480,55 T540,75 T600,40 T660,70 T720,50 T780,80 T840,40 T900,65 T960,55 T1020,75 T1080,40 T1140,70 T1200,64'); }
}
@keyframes waveform-2 {
  0%, 100% { d: path('M0,64 Q30,80 60,64 T120,64 T180,64 T240,64 T300,64 T360,64 T420,64 T480,64 T540,64 T600,64 T660,64 T720,64 T780,64 T840,64 T900,64 T960,64 T1020,64 T1080,64 T1140,64 T1200,64'); }
  33% { d: path('M0,64 Q30,45 60,64 T120,75 T180,35 T240,85 T300,30 T360,80 T420,35 T480,75 T540,45 T600,85 T660,30 T720,80 T780,35 T840,75 T900,45 T960,85 T1020,30 T1080,80 T1140,35 T1200,64'); }
  66% { d: path('M0,64 Q30,70 60,64 T120,40 T180,80 T240,35 T300,75 T360,50 T420,85 T480,30 T540,80 T600,35 T660,75 T720,50 T780,85 T840,30 T900,80 T960,35 T1020,75 T1080,50 T1140,85 T1200,64'); }
}
.animate-waveform-1 {
  animation: waveform-1 4s ease-in-out infinite;
}
.animate-waveform-2 {
  animation: waveform-2 5s ease-in-out infinite;
  animation-delay: 1s;
}

/* Polygon morph animation */
@keyframes polygon-morph-1 {
  0%, 100% { transform: rotate(0deg) scale(1); opacity: 0.4; }
  50% { transform: rotate(180deg) scale(1.2); opacity: 0.7; }
}
@keyframes polygon-morph-2 {
  0%, 100% { transform: rotate(0deg) scale(1); opacity: 0.3; }
  50% { transform: rotate(-180deg) scale(0.8); opacity: 0.6; }
}
@keyframes polygon-morph-3 {
  0%, 100% { transform: rotate(45deg) scale(0.9); opacity: 0.35; }
  50% { transform: rotate(225deg) scale(1.1); opacity: 0.65; }
}
.animate-polygon-morph-1 {
  animation: polygon-morph-1 20s ease-in-out infinite;
  transform-origin: center;
}
.animate-polygon-morph-2 {
  animation: polygon-morph-2 25s ease-in-out infinite;
  transform-origin: center;
}
.animate-polygon-morph-3 {
  animation: polygon-morph-3 22s ease-in-out infinite;
  transform-origin: center;
}

/* Gradient radial background utility */
.bg-gradient-radial {
  background: radial-gradient(circle, var(--tw-gradient-stops));
}

/* Mouse parallax effects */
.hero-parallax-container [class*="animate-glow-orb"] {
  transition: transform 0.3s ease-out;
  transform: translate(var(--parallax-x, 0), var(--parallax-y, 0));
}

.hero-parallax-container [class*="animate-polygon-morph"] {
  transition: transform 0.4s ease-out;
  transform: translate(var(--parallax-x-reverse, 0), var(--parallax-y-reverse, 0)) rotate(var(--rotation, 0deg));
}

.hero-parallax-container .animate-waveform-1,
.hero-parallax-container .animate-waveform-2 {
  transition: transform 0.2s ease-out;
  transform: translateX(calc(var(--parallax-x, 0) * 0.5));
}

/* Spotlight cursor glow effect */
.hero-parallax-container::before {
  content: '';
  position: absolute;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  transform: translate(calc(var(--parallax-x, 0) * 10 - 50%), calc(var(--parallax-y, 0) * 10 - 50%));
  transition: transform 0.15s ease-out;
  z-index: 1;
}
/* [AI_END LINES=130 TIMESTAMP=2025-06-18 08:35:00] */
</style>

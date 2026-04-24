// [AI_START TIMESTAMP=2025-06-15 12:00:00]
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface User {
  name: string
  company: string
  role: string
  email: string
}

export interface RegisterData {
  company: string
  name: string
  email: string
  phone: string
  password: string
}

const STORAGE_KEY = 'maas_portal_user'

interface DemoUser extends User {
  password: string
}

const DEMO_USERS: DemoUser[] = [
  {
    email: 'admin@sample.com',
    password: 'admin123',
    name: '张三',
    company: '中科云数科技有限公司',
    role: '超级管理员',
  },
]

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isLoading = ref(true)
  const justLoggedIn = ref(false)

  const isLoggedIn = computed(() => !!user.value)

  function restoreSession() {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY)
      if (stored) {
        user.value = JSON.parse(stored)
      }
    } catch {
      // ignore
    }
    isLoading.value = false
  }

  async function login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    await new Promise((r) => setTimeout(r, 800))

    const found = DEMO_USERS.find(
      (u) => u.email === email && u.password === password
    )

    if (!found) {
      return { success: false, error: '账号或密码错误，请重新输入' }
    }

    const { password: _p, ...userData } = found
    user.value = userData
    justLoggedIn.value = true
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(userData))
    return { success: true }
  }

  async function register(data: RegisterData): Promise<{ success: boolean; error?: string }> {
    await new Promise((r) => setTimeout(r, 1000))

    const exists = DEMO_USERS.find((u) => u.email === data.email)
    if (exists) {
      return { success: false, error: '该邮箱已注册，请直接登录' }
    }

    const newUser: User = {
      name: data.name,
      company: data.company,
      role: '超级管理员',
      email: data.email,
    }

    DEMO_USERS.push({ ...newUser, password: data.password })

    user.value = newUser
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newUser))
    return { success: true }
  }

  function logout() {
    user.value = null
    justLoggedIn.value = false
    sessionStorage.removeItem(STORAGE_KEY)
  }

  function clearJustLoggedIn() {
    justLoggedIn.value = false
  }

  async function demoLogin(): Promise<void> {
    await new Promise((r) => setTimeout(r, 500))

    const demoUser: User = {
      name: '管理员',
      company: '应用运营管理平台',
      role: '管理员',
      email: 'admin@example.com',
    }

    user.value = demoUser
    justLoggedIn.value = true
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(demoUser))
  }

  return {
    user,
    isLoading,
    isLoggedIn,
    justLoggedIn,
    restoreSession,
    login,
    register,
    logout,
    clearJustLoggedIn,
    demoLogin,
  }
})
// [AI_END LINES=89 TIMESTAMP=2025-06-15 12:00:00]

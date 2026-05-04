# n1p-maas-esp-ui 项目 UI 功能分析报告

## 一、项目概述

**项目名称**：智信MaaS服务管理平台（ESP-UI）  
**技术栈**：Vue 3 + TypeScript + Vue Router + Tailwind CSS + shadcn/ui 风格组件  
**布局结构**：左侧可折叠边栏导航 + 顶部Header + 主内容区（PortalLayout）

---

## 二、路由体系

| 路由路径 | 页面名称 | 是否需要登录 |
|---------|---------|------------|
| `/` | 登录页（HomeView） | 否 |
| `/dashboard` | 控制台首页 | 是 |
| `/packages` | 服务订购 | 是 |
| `/orders` | 我的订单 | 是 |
| `/services` | 服务管理 | 是 |
| `/models` | 模型广场 | 是 |
| `/wallet` | 智信钱包 | 是 |
| `/billing` | 账单与计费 | 是 |
| `/audit` | 操作审计 | 是 |
| `/enterprise` | 企业信息管理 | 是 |
| `/accounts` | 子账号与权限 | 是 |

---

## 三、导航菜单结构（Sidebar）

菜单分为四大组，支持收起/展开和搜索：

1. **控制台首页**
   - 控制台首页

2. **服务**
   - 服务订购（`/packages`）
   - 模型广场（`/models`）
   - 我的订单（`/orders`）
   - 服务管理（`/services`）

3. **费用**
   - 智信钱包（`/wallet`）
   - 账单与计费（`/billing`）

4. **管理**
   - 企业信息管理（`/enterprise`）
   - 子账号与权限（`/accounts`）
   - 操作审计（`/audit`）

---

## 四、各模块功能详细分析

### 4.1 控制台首页（Dashboard）

**页面/模块名称**：控制台首页  
**文件位置**：[`src/views/DashboardView.vue`](n1p-maas-esp-ui/src/views/DashboardView.vue:1)、[`src/components/portal/DashboardContent.vue`](n1p-maas-esp-ui/src/components/portal/DashboardContent.vue:1)

**功能描述**：
- 企业用户登录后的主入口页面，展示服务概览和最新动态
- 首次登录弹出「完善企业信息」引导弹窗

**数据展示项**：
- **统计卡片**（4项）：已开通服务（5个）、本月API调用（128,456次）、待支付订单（2笔/¥3,600）、即将到期套餐（1个/15天后到期）
- **快捷入口**：订购套餐、查看API密钥、查看账单
- **最新动态**：服务开通、支付成功、网银Key认证、创建订单、管理员登录等操作记录（含时间线和状态标识）
- **当前套餐**：GPT-4企业版、Claude基础版、Embedding旗舰版（含使用进度、到期时间、运行状态）

**主要操作**：
- 快捷导航至各功能页面
- 关闭/响应企业资质验证引导弹窗
- 跳转至企业信息管理页完成认证

---

### 4.2 企业信息管理（Enterprise）

**页面/模块名称**：企业信息管理  
**文件位置**：[`src/views/EnterpriseView.vue`](n1p-maas-esp-ui/src/views/EnterpriseView.vue:1)、[`src/components/portal/EnterpriseContent.vue`](n1p-maas-esp-ui/src/components/portal/EnterpriseContent.vue:1)

**功能描述**：
- 展示和编辑企业认证信息、联系人资料、网银Key绑定状态及资质文件

**数据展示项**：
- **企业基本信息**：企业名称、统一社会信用代码、法定代表人、企业地址、注册时间、认证时间、认证状态（已认证）
- **联系人信息**：联系人、联系电话、联系邮箱
- **网银Key绑定状态**：Key序列号、绑定时间、证书有效期、最近使用时间、状态（正常）
- **资质文件**：营业执照（business_license.pdf）、法人身份证（legal_person_id.pdf）、其他资质（可选上传）

**主要操作**：
- **修改联系人信息**：弹出编辑对话框，修改联系人、电话、邮箱
- **重新绑定网银Key**：确认后插入新设备重新绑定，旧Key立即失效
- **测试认证**：验证当前网银Key有效性
- **上传其他资质文件**

---

### 4.3 子账号与权限（Accounts）

**页面/模块名称**：子账号与权限  
**文件位置**：[`src/views/AccountsView.vue`](n1p-maas-esp-ui/src/views/AccountsView.vue:1)、[`src/components/portal/AccountsContent.vue`](n1p-maas-esp-ui/src/components/portal/AccountsContent.vue:1)

**功能描述**：
- 管理企业下的所有子账号，支持角色分配和状态控制
- 展示系统预设的四种角色权限说明

**数据展示项**：
- **统计卡片**：总账号数、已激活数、已禁用数、管理员数
- **子账号列表**：账号邮箱、姓名、角色（带图标和颜色标识）、状态（已激活/已禁用）、创建时间、最后登录时间
- **角色权限说明**：超级管理员、运营管理员、财务管理员、API调用员（含图标、描述）

**主要操作**：
- **新增子账号**：填写邮箱、姓名，选择角色（下拉选择，排除超级管理员）
- **编辑子账号**：修改姓名和角色（邮箱不可修改）
- **启用/禁用账号**：切换账号激活状态
- **删除子账号**：非超级管理员账号可删除

**角色体系**：
| 角色 | 权限范围 |
|-----|---------|
| 超级管理员 | 拥有全部权限 |
| 运营管理员 | 套餐、服务、密钥管理 |
| 财务管理员 | 订单、账单、发票 |
| API调用员 | 查看密钥和调用统计 |

---

### 4.4 服务管理（Services）

**页面/模块名称**：服务管理  
**文件位置**：[`src/views/ServicesView.vue`](n1p-maas-esp-ui/src/views/ServicesView.vue:1)、[`src/components/portal/ServicesContent.vue`](n1p-maas-esp-ui/src/components/portal/ServicesContent.vue:1)

**功能描述**：
- 以Tab页签形式组织：我的套餐、API密钥、调用监控、安全审计

#### Tab 1：我的套餐
**数据展示项**：
- 套餐名称、有效期（起止日期）、运行状态（运行中/即将到期）
- API调用额度进度条（已用/总额度/百分比/剩余次数）
- API端点地址（可复制）

**主要操作**：
- 查看文档、在线调试
- 即将到期套餐可立即续费

#### Tab 2：API密钥
**数据展示项**：
- 密钥名称、AccessKey、SecretKey（可显示/隐藏）、创建时间、状态

**主要操作**：
- **创建密钥**：生成新的API访问凭证
- **复制AccessKey/SecretKey**
- **显示/隐藏SecretKey**
- **重置SecretKey**：弹出确认对话框，重置后旧密钥立即失效

#### Tab 3：调用监控
**数据展示项**：
- **统计卡片**：今日调用（6,800次/较昨日+8%）、本周调用（40,100次）、错误率（0.3%）
- **柱状图**：近期API调用统计，支持7天/1个月/3个月范围切换（Canvas绘制）
- **错误日志**：时间、API路径、错误信息、状态码

**主要操作**：
- 切换时间范围（7天/1个月/3个月）查看调用趋势

#### Tab 4：安全审计
**数据展示项**：
- 嵌入[`SecurityAuditContent`](n1p-maas-esp-ui/src/components/portal/SecurityAuditContent.vue:1)组件，展示风险监控和安全防护状态（详见4.8审计功能）

---

### 4.5 模型广场（Models）

**页面/模块名称**：模型广场  
**文件位置**：[`src/views/ModelsView.vue`](n1p-maas-esp-ui/src/views/ModelsView.vue:1)、[`src/components/portal/ModelsContent.vue`](n1p-maas-esp-ui/src/components/portal/ModelsContent.vue:1)

**功能描述**：
- 浏览和比较平台接入的各类大语言模型，查看详细规格与分级定价
- 支持搜索、提供商筛选、价格等级切换

**数据展示项**：
- **模型卡片**（共12个）：GPT-4o、GPT-4o Mini、Claude 3.5 Sonnet、Claude 3 Haiku、Gemini 1.5 Pro、Gemini 1.5 Flash、DeepSeek V3、DeepSeek R1、Qwen2.5 72B、Llama 3.1 405B、Mistral Large 2、Kimi K1.5
- 每张卡片展示：模型名称、推荐标签、提供商（带颜色标识）、标签、描述、Prompt/Completion价格（按选中等级）、上下文长度
- **详情弹窗**：完整描述、标签、上下文长度、最大输出、模态、三级定价对比（基础版/高级版/尊享版）、能力支持列表

**主要操作**：
- **搜索模型**：按名称、提供商、描述、标签搜索
- **筛选提供商**：全部/OpenAI/Anthropic/Google/DeepSeek/Alibaba Cloud/Meta/Mistral AI/Moonshot AI
- **切换价格等级**：基础版（标准价）/高级版（约9折）/尊享版（约8折）
- **查看详情**：弹出详情对话框，查看完整规格和文档链接

---

### 4.6 我的订单（Orders）

**页面/模块名称**：我的订单  
**文件位置**：[`src/views/OrdersView.vue`](n1p-maas-esp-ui/src/views/OrdersView.vue:1)、[`src/components/portal/OrdersContent.vue`](n1p-maas-esp-ui/src/components/portal/OrdersContent.vue:1)

**功能描述**：
- 管理套餐订购订单，支持搜索、支付、取消、查看详情

**数据展示项**：
- **统计卡片**：全部订单、待支付、已支付、累计支付金额
- **订单列表**：订单号、套餐名称、金额、支付状态（待支付/已支付/已取消）、下单时间
- **订单详情弹窗**：订单号、套餐、金额、下单时间、支付状态、支付时间

**主要操作**：
- **搜索订单**：按订单号或套餐名称搜索
- **去支付**：待支付订单弹出支付对话框，需网银Key认证确认
- **取消订单**：待支付订单可取消
- **查看详情**：查看订单完整信息

---

### 4.7 服务订购（Packages）

**页面/模块名称**：服务订购  
**文件位置**：[`src/views/PackagesView.vue`](n1p-maas-esp-ui/src/views/PackagesView.vue:1)、[`src/components/portal/PackagesContent.vue`](n1p-maas-esp-ui/src/components/portal/PackagesContent.vue:1)

**功能描述**：
- 展示三种套餐方案，支持在线订购

**数据展示项**：
| 套餐 | 价格 | 核心权益 |
|-----|------|---------|
| 基础版 Starter | ¥1,999/月 | 50,000次API/月、标准响应、基础技术支持、API文档、基础统计 |
| 高级版 Professional | ¥5,999/月 | 200,000次API/月、优先队列、7×24支持、专属客户经理、高级分析、自定义限流 |
| 尊享版 Enterprise | ¥19,999/月 | 1,000,000次API/月、最高优先级、专属技术团队、SLA 99.99%、私有化部署、定制开发、专属网络 |

**主要操作**：
- **立即订购**：弹出确认对话框，确认套餐信息后提交订购

---

### 4.8 账单与计费（Billing）

**页面/模块名称**：账单与计费  
**文件位置**：[`src/views/BillingView.vue`](n1p-maas-esp-ui/src/views/BillingView.vue:1)、[`src/components/portal/BillingContent.vue`](n1p-maas-esp-ui/src/components/portal/BillingContent.vue:1)

**功能描述**：
- 以Tab页签组织：我的账单、用量统计、发票管理

#### Tab 1：我的账单
**数据展示项**：
- **统计卡片**：待支付账单、本月消费、累计消费、账户余额
- **账单列表**：账单月份、账单编号、应付金额、支付状态（已支付/待支付）
- **账单详情弹窗**：各消费项明细及合计

**主要操作**：
- 查看账单详情
- 下载账单
- 去支付（待支付账单）

#### Tab 2：用量统计
**数据展示项**：
- 各套餐额度使用情况（已用/额度/进度条）
- 超量提醒及超量费用计算

#### Tab 3：发票管理
**数据展示项**：
- 发票列表：发票编号、发票类型（增值税专用发票）、金额、状态（已开具）、开具日期

**主要操作**：
- **申请开票**：选择已支付账单申请开具发票

---

### 4.9 智信钱包（Wallet）

**页面/模块名称**：智信钱包  
**文件位置**：[`src/views/WalletView.vue`](n1p-maas-esp-ui/src/views/WalletView.vue:1)、[`src/components/portal/WalletContent.vue`](n1p-maas-esp-ui/src/components/portal/WalletContent.vue:1)

**功能描述**：
- 管理账户余额、充值与交易记录

**数据展示项**：
- **余额卡片**：账户余额（Credits）、充值按钮
- **本月消费构成**：模型调用（58%）、套餐订购（27%）、增值服务（10%）、其他（5%）
- **快捷统计**：本月充值（+18,000）、本月消费（-5,649.50）、累计充值（48,000）
- **交易记录**：交易时间、类型（充值/消费/退款）、交易金额、余额变动、交易后余额、交易状态（成功/处理中/失败）
- **安全提示**：资金用途限制、网银Key认证要求、客服联系方式

**主要操作**：
- **账户充值**：弹出充值对话框，支持快捷金额（500/1,000/5,000/10,000）或自定义金额，显示充值后余额预览，确认后跳转支付网关
- **导出交易记录**
- **查看交易详情**

---

### 4.10 操作审计（Audit）

**页面/模块名称**：操作审计  
**文件位置**：[`src/views/AuditView.vue`](n1p-maas-esp-ui/src/views/AuditView.vue:1)、[`src/components/portal/AuditContent.vue`](n1p-maas-esp-ui/src/components/portal/AuditContent.vue:1)、[`src/components/portal/SecurityAuditContent.vue`](n1p-maas-esp-ui/src/components/portal/SecurityAuditContent.vue:1)

#### 4.10.1 操作日志（AuditContent）
**功能描述**：
- 查看系统操作日志，全流程留痕可追溯，日志不可删除

**数据展示项**：
- **统计卡片**：今日操作（28）、本月操作（456）、网银Key认证（12）、关键操作（8）
- **操作日志表**：操作时间、操作类型（带图标和颜色标识）、操作内容、IP地址、认证方式
- **操作详情弹窗**：时间、类型、内容、详细信息、IP、认证方式、操作人

**操作类型**：
| 类型 | 说明 |
|-----|------|
| 登录 | 用户登录系统 |
| 订购 | 创建订单 |
| 支付 | 订单支付 |
| 开通服务 | 服务开通 |
| 密钥变更 | API密钥重置 |
| 网银Key认证 | 身份认证 |
| 账号管理 | 子账号创建/修改 |

**主要操作**：
- **搜索操作**：按操作内容、操作人搜索
- **筛选类型**：全部/登录/订购/支付/开通服务/密钥变更/网银Key认证/账号管理
- **导出日志**
- **查看详情**

#### 4.10.2 安全审计（SecurityAuditContent）
**功能描述**：
- 展示平台安全态势、风险监控、模型安全防护能力及数据安全架构

**数据展示项**：
- **风险监控**：沙箱异常连接（3）、沙箱异常文件访问（7）、沙箱容器逃逸（0）
- **全方位安全防护**：已拦截风险（128）、应用层会话加密（已启用）、网络层传输加密（已启用）
- **模型安全**（4大维度）：
  1. 模型防泄露与知识产权保护（已开启）：防止prompt注入窃取模型参数、模型水印溯源
  2. 模型防攻击与鲁棒性防护（已开启）：对抗样本防御、数据投毒防护
  3. 模型行为安全与合规管控（未开启）：安全护栏、权限与访问控制
  4. 模型运行环境安全（已开启）：可信安全沙箱联动
- **数据安全架构示意图**（SVG动画）：客户私域 → 接入层（TLS/mTLS全链路加密） → 可信安全沙箱，实现数据「可用不可见」、Prompt不出域

**主要操作**：
- 刷新数据更新时间
- 开启未启用的安全防护模块

---

## 五、整体功能汇总

| 模块 | 核心能力 | 关键操作 |
|-----|---------|---------|
| 控制台首页 | 服务概览、快捷入口、动态通知 | 导航跳转、资质验证引导 |
| 企业信息管理 | 企业/联系人/UKey/资质管理 | 编辑联系人、重新绑定UKey、上传资质 |
| 子账号与权限 | RBAC子账号管理 | 增删改查子账号、分配角色、启禁用 |
| 服务管理 | 套餐管理、API密钥、调用监控、安全审计 | 创建/重置密钥、查看调用趋势、复制端点 |
| 模型广场 | 模型浏览、比价、规格查看 | 搜索、筛选、切换价格等级、查看详情 |
| 我的订单 | 订单生命周期管理 | 搜索、支付、取消、查看详情 |
| 服务订购 | 套餐选购与开通 | 确认订购 |
| 账单与计费 | 账单、用量、发票 | 支付账单、下载账单、申请开票 |
| 智信钱包 | 余额、充值、交易记录 | 充值（快捷/自定义）、导出记录 |
| 操作审计 | 全量操作日志、安全态势 | 搜索、筛选、导出、查看详情、开启防护 |

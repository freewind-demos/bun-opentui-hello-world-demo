# node-opentui-hello-world-demo

## 简介

OpenTUI 是一个自研的 TUI 框架，基于 Solid.js 响应式系统，结合自研的 CLI 渲染器实现终端界面。OpenCode 项目使用的就是这个框架。

## 快速开始

### 环境要求

- Node.js >= 18
- Bun 或 Node.js

### 运行

```bash
pnpm install
pnpm start
```

## 概念讲解

### 核心架构

```
Solid.js 响应式系统
       ↓
虚拟 DOM diff
       ↓
@opentui/core 渲染器
       ↓
ANSI escape sequences
       ↓
终端输出
```

### 创建渲染器

```javascript
import { createCliRenderer } from "@opentui/core"

const renderer = createCliRenderer({
  targetFps: 60,
  useMouse: true,
})
```

### 渲染组件

```javascript
import { render } from "@opentui/solid"
import { createSignal } from "solid-js"

const [count, setCount] = createSignal(0)

await render(() => {
  return <Counter count={count()} onIncrement={() => setCount(c => c + 1)} />
}, renderer)
```

### 响应式状态

```javascript
import { createSignal, createEffect } from "solid-js"

const [count, setCount] = createSignal(0)

createEffect(() => {
  // 当 count 变化时自动执行
  console.log("Count changed:", count())
})
```

## 完整示例代码结构

```javascript
// 伪代码，展示 OpenTUI 工作原理
import { render } from "@opentui/solid"
import { createCliRenderer } from "@opentui/core"
import { createSignal } from "solid-js"

const renderer = await createCliRenderer({ targetFps: 60 })

const [count, setCount] = createSignal(0)

await render(() => {
  // Solid 组件，自动响应式更新
  return <Box>
    <Text>Count: {count()}</Text>
    <Button onPress={() => setCount(c => c + 1)}>+</Button>
  </Box>
}, renderer)
```

## 完整讲解

OpenTUI 的核心创新在于**用 Solid.js 的响应式系统驱动终端渲染**。

**渲染管道**:
1. Solid 组件描述 UI 结构
2. 响应式状态变化触发重算
3. 虚拟 DOM diff 算出最小变更
4. CLI 渲染器将变更转为 ANSI 序列
5. `process.stdout.write()` 输出到终端

**对比浏览器**:
- 浏览器: Solid → Virtual DOM → DOM API → 屏幕
- 终端: Solid → Virtual DOM → ANSI sequences → 终端

**OpenCode 中的使用**:
```typescript
// packages/opencode/src/cli/cmd/tui/app.tsx
const renderer = await createCliRenderer(rendererConfig(config))
await render(() => <App ... />, renderer)
```

**为什么自研**:
现有框架（blessed/ink）要么 API 老旧，要么性能/定制性不足，OpenTUI 专为 OpenCode 的需求定制。

更多信息: https://github.com/anomalyco/opentui

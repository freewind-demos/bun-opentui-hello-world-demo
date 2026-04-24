/**
 * OpenTUI Demo
 *
 * 注意: OpenTUI (anomalyco/opentui) 的 npm 包可能需要特殊配置。
 * 如果直接安装失败，这是一个概念演示。
 *
 * 核心概念:
 * - 使用 Solid.js 的响应式系统
 * - 通过 @opentui/core 创建 CLI 渲染器
 * - 用 render() 将 Solid 组件渲染到终端
 */

import { createSignal } from "solid-js"
import { render } from "@opentui/solid"
import { createCliRenderer } from "@opentui/core"

// 检查是否可用
async function main() {
  try {
    // 创建渲染器
    const renderer = createCliRenderer({
      targetFps: 60,
      useMouse: false,
    })

    const [count, setCount] = createSignal(0)

    // 渲染组件到终端
    // 注意: 这需要实际的 @opentui 包支持
    console.log("OpenTUI Demo概念说明:\n")
    console.log("OpenTUI 使用 Solid.js 的响应式系统来控制终端渲染")
    console.log("核心 API:")
    console.log("  - createCliRenderer(): 创建 CLI 渲染器")
    console.log("  - render(() => <Component />, renderer): 渲染 Solid 组件到终端")
    console.log("  - createSignal(): 创建响应式状态")
    console.log("  - createEffect(): 响应式副作用")
    console.log("\n当前计数器值:", count())
    console.log("\n完整使用示例见:")
    console.log("  packages/opencode/src/cli/cmd/tui/app.tsx")

  } catch (e) {
    console.log("OpenTUI 包可能未正确安装")
    console.log("请参考: https://github.com/anomalyco/opentui")
    console.log("\n核心概念:")
    console.log("OpenTUI = Solid.js响应式 + CLI渲染器")
    console.log("- createCliRenderer() 创建终端渲染器")
    console.log("- render(() => <App />, renderer) 渲染组件")
    console.log("- Solid 的 createSignal/createEffect 自动追踪依赖并重绘")
  }
}

main()

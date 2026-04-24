function renderUnsupportedRuntimeMessage(error: unknown): void {
  const detail =
    error instanceof Error ? `${error.name}: ${error.message}` : String(error)

  console.log("OpenTUI demo currently cannot run on plain Node.js.")
  console.log("Reason: upstream @opentui/core now depends on Bun runtime APIs.")
  console.log("Status: TypeScript source is ready; run this demo with Bun instead.")
  console.log(`Detail: ${detail}`)
}

async function startOpenTuiCounter(): Promise<void> {
  const { BoxRenderable, TextRenderable, createCliRenderer } = await import(
    "@opentui/core"
  )

  const renderer = await createCliRenderer({
    clearOnShutdown: true,
    exitOnCtrlC: false,
    targetFps: 60,
  })

  let count = 0

  const frame = new BoxRenderable(renderer, {
    border: true,
    borderColor: "cyan",
    title: "OpenTUI Counter Demo",
    width: 40,
    height: 8,
    left: 2,
    top: 1,
  })

  const hint = new TextRenderable(renderer, {
    left: 2,
    top: 2,
    content: "Up/Down change | q quit",
  })

  const counter = new TextRenderable(renderer, {
    left: 2,
    top: 4,
    content: "Count: +0",
  })

  frame.add(hint)
  frame.add(counter)
  renderer.root.add(frame)

  const updateCounter = (): void => {
    counter.content = `Count: ${count >= 0 ? "+" : ""}${count}`
    renderer.requestRender()
  }

  renderer.addInputHandler((sequence) => {
    if (sequence === "q" || sequence === "\u0003") {
      renderer.destroy()
      process.exit(0)
    }

    if (sequence === "\u001b[A") {
      count += 1
      updateCounter()
      return true
    }

    if (sequence === "\u001b[B") {
      count -= 1
      updateCounter()
      return true
    }

    return false
  })

  updateCounter()
  renderer.start()
}

async function main(): Promise<void> {
  if (!("bun" in process.versions)) {
    renderUnsupportedRuntimeMessage(
      new Error("Missing Bun runtime. Install Bun, then run `bun dist/index.js`."),
    )
    return
  }

  try {
    await startOpenTuiCounter()
  } catch (error) {
    renderUnsupportedRuntimeMessage(error)
  }
}

await main()

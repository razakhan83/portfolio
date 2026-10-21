"use client"

import {
  addTransitionType,
  createContext,
  startTransition,
  useContext,
  useId,
  useRef,
  useState,
  ViewTransition,
  type KeyboardEvent,
  type ReactNode,
  type RefObject,
} from "react"

type TabsState = {
  id: string
  value: string | undefined
  select: (next: string, animated?: boolean) => void
  list: RefObject<HTMLDivElement | null>
}

const Context = createContext<TabsState | null>(null)

function useTabs() {
  const tabs = useContext(Context)
  if (!tabs) throw new Error("Tabs parts must be used inside <Tabs>")
  return tabs
}

const tabsOf = (list: HTMLElement | null) => [
  ...(list?.querySelectorAll<HTMLButtonElement>("[role=tab]") ?? []),
]

export function Tabs({
  defaultValue,
  value: controlled,
  onValueChange,
  className = "",
  children,
}: {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  className?: string
  children: ReactNode
}) {
  const id = useId()
  const [uncontrolled, setUncontrolled] = useState(defaultValue)
  const value = controlled ?? uncontrolled
  const list = useRef<HTMLDivElement>(null)

  const select = (next: string, animated = true) => {
    const values = tabsOf(list.current).map((tab) => tab.dataset.value)
    const from = values.indexOf(value)
    const to = values.indexOf(next)
    if (to === from || to < 0) return
    const update = () => {
      setUncontrolled(next)
      onValueChange?.(next)
    }
    document.activeViewTransition?.skipTransition()
    if (!animated) return update()
    startTransition(() => {
      addTransitionType(to > from ? "tabs-next" : "tabs-prev")
      update()
    })
  }

  return (
    <Context value={{ id, value, select, list }}>
      <div className={`w-full text-deep ${className}`}>{children}</div>
    </Context>
  )
}

export function TabsList({
  className = "",
  children,
}: {
  className?: string
  children: ReactNode
}) {
  const { select, list } = useTabs()

  const onKeyDown = (e: KeyboardEvent) => {
    const tabs = tabsOf(list.current)
    const index = tabs.findIndex((tab) => tab === document.activeElement)
    const step = ({ ArrowRight: 1, ArrowLeft: -1 } as Record<string, number>)[e.key]
    const to = e.key === "Home" ? 0 : e.key === "End" ? tabs.length - 1 : step ? index + step : null
    if (to === null || index < 0) return
    e.preventDefault()
    const tab = tabs[(to + tabs.length) % tabs.length]
    select(tab.dataset.value!, false)
    tab.focus()
  }

  return (
    <div
      ref={list}
      role="tablist"
      onKeyDown={onKeyDown}
      className={`flex items-center gap-1 sm:gap-4 border-b border-border overflow-x-auto no-scrollbar pb-px ${className}`}
    >
      {children}
    </div>
  )
}

export function TabsTrigger({
  value,
  className = "",
  children,
}: {
  value: string
  className?: string
  children: ReactNode
}) {
  const { id, value: active, select } = useTabs()
  const selected = value === active
  return (
    <button
      type="button"
      role="tab"
      data-value={value}
      id={`${id}-tab-${value}`}
      aria-selected={selected}
      aria-controls={selected ? `${id}-panel-${value}` : undefined}
      tabIndex={selected ? 0 : -1}
      onClick={() => select(value)}
      className={`relative -mb-px cursor-pointer rounded-md px-3 sm:px-4 py-2.5 min-h-[44px] inline-flex items-center justify-center text-sm sm:text-base font-medium whitespace-nowrap outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary ${
        selected ? "text-deep font-semibold" : "text-muted hover:text-deep"
      } ${className}`}
    >
      {children}
      {selected && (
        <ViewTransition name={`${id}-underline`} share="vt-move vt-quick" default="none">
          <span className="absolute inset-x-0 -bottom-[1px] h-[2px] rounded-full bg-primary" />
        </ViewTransition>
      )}
    </button>
  )
}

export function TabsContent({
  value,
  className = "",
  children,
}: {
  value: string
  className?: string
  children: ReactNode
}) {
  const { id, value: active } = useTabs()
  if (value !== active) return null
  return (
    <ViewTransition
      name={`${id}-panel`}
      share={{
        "tabs-next": "vt-slide vt-quick vt-clip vt-forward",
        "tabs-prev": "vt-slide vt-quick vt-clip vt-back",
        default: "none",
      }}
    >
      <div
        role="tabpanel"
        id={`${id}-panel-${value}`}
        aria-labelledby={`${id}-tab-${value}`}
        tabIndex={0}
        className={`pt-8 text-deep outline-none focus-visible:ring-2 focus-visible:ring-primary ${className}`}
      >
        {children}
      </div>
    </ViewTransition>
  )
}

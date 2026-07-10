"use client"

import { CheckIcon, MonitorIcon, MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { Button, buttonVariants } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

const themeModes = [
  {
    value: "system",
    label: "System",
    icon: MonitorIcon,
  },
  {
    value: "light",
    label: "Light",
    icon: SunIcon,
  },
  {
    value: "dark",
    label: "Dark",
    icon: MoonIcon,
  },
] as const

export function ThemeModePopover() {
  const { setTheme, theme } = useTheme()

  const activeTheme = theme ?? "system"
  const activeMode =
    themeModes.find((mode) => mode.value === activeTheme) ?? themeModes[0]
  const ActiveIcon = activeMode.icon

  return (
    <Popover>
      <PopoverTrigger
        aria-label="Theme"
        className={cn(buttonVariants({ variant: "outline", size: "icon-sm" }))}
      >
        <ActiveIcon />
      </PopoverTrigger>
      <PopoverContent align="end" className="w-52">
        <PopoverHeader>
          <PopoverTitle>Theme</PopoverTitle>
          <PopoverDescription>
            Match the preview to your system.
          </PopoverDescription>
        </PopoverHeader>
        <div className="grid gap-1">
          {themeModes.map((mode) => {
            const Icon = mode.icon
            const isActive = activeTheme === mode.value

            return (
              <Button
                key={mode.value}
                type="button"
                variant={isActive ? "secondary" : "ghost"}
                size="sm"
                className="w-full justify-start"
                onClick={() => setTheme(mode.value)}
              >
                <Icon data-icon="inline-start" />
                <span>{mode.label}</span>
                {isActive ? <CheckIcon className="ml-auto" /> : null}
              </Button>
            )
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}

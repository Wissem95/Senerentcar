"use client"

import { ReactNode } from "react"
import { MoreHorizontal, LucideIcon } from "lucide-react"
import { Button } from "./button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu"

export interface DropdownAction {
  label: string
  icon: LucideIcon
  onClick: () => void
  className?: string
  disabled?: boolean
}

export interface DropdownActionGroup {
  actions: DropdownAction[]
  separator?: boolean
}

interface ActionDropdownProps {
  label?: string
  groups: DropdownActionGroup[]
}

export function ActionDropdown({ label = "Actions", groups }: ActionDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Ouvrir le menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        {groups.map((group, groupIndex) => (
          <div key={groupIndex}>
            {group.actions.map((action, actionIndex) => (
              <DropdownMenuItem
                key={actionIndex}
                onClick={action.onClick}
                className={action.className}
                disabled={action.disabled}
              >
                <action.icon className="mr-2 h-4 w-4" />
                {action.label}
              </DropdownMenuItem>
            ))}
            {group.separator && groupIndex < groups.length - 1 && (
              <DropdownMenuSeparator />
            )}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
"use client"

import { ReactNode } from "react"
import { Filter, Search } from "lucide-react"
import { Card } from "./card"
import { Input } from "./input"

interface FilterOption {
  label: string
  value: string
}

interface FilterSelectProps {
  label?: string
  value: string
  onChange: (value: string) => void
  options: FilterOption[]
  placeholder?: string
}

interface SearchInputProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
}

interface FilterBarProps {
  children?: ReactNode
  searchProps?: SearchInputProps
  className?: string
}

export function FilterSelect({ 
  label, 
  value, 
  onChange, 
  options, 
  placeholder = "Tous" 
}: FilterSelectProps) {
  return (
    <div className="flex items-center space-x-2">
      <Filter className="h-4 w-4 text-gray-400" />
      {label && <span className="text-sm font-medium text-gray-700">{label}:</span>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
      >
        <option value="all">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export function SearchInput({ value = "", onChange, placeholder }: SearchInputProps) {
  return (
    <div className="flex-1">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="pl-10"
        />
      </div>
    </div>
  )
}

export function FilterBar({ children, searchProps, className = "" }: FilterBarProps) {
  return (
    <Card className={`p-4 ${className}`}>
      <div className="flex flex-col sm:flex-row gap-4">
        {children}
        {searchProps && <SearchInput {...searchProps} />}
      </div>
    </Card>
  )
}
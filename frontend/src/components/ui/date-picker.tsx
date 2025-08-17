"use client"

import { useState, useEffect } from "react"
import { CalendarDays, ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "./button"
import { Card, CardContent } from "./card"
import { cn } from "@/lib/utils"

interface DatePickerProps {
  value?: Date
  onChange?: (date: Date | null) => void
  minDate?: Date
  maxDate?: Date
  placeholder?: string
  unavailableDates?: Date[]
  className?: string
  label?: string
}

const MONTHS = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
]

const DAYS = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]

function getDaysInMonth(date: Date): Date[] {
  const year = date.getFullYear()
  const month = date.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()
  
  const days: Date[] = []
  
  // Add empty days for the beginning of the month
  const startDay = firstDay.getDay()
  for (let i = 0; i < startDay; i++) {
    days.push(new Date(year, month, -startDay + i + 1))
  }
  
  // Add all days of the current month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(year, month, i))
  }
  
  // Add empty days for the end of the month to complete the grid
  const remainingDays = 42 - days.length // 6 rows × 7 days
  for (let i = 1; i <= remainingDays; i++) {
    days.push(new Date(year, month + 1, i))
  }
  
  return days
}

function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  )
}

function isDateUnavailable(date: Date, unavailableDates: Date[]): boolean {
  return unavailableDates.some(unavailableDate => isSameDay(date, unavailableDate))
}

export function DatePicker({
  value,
  onChange,
  minDate,
  maxDate,
  placeholder = "Sélectionner une date",
  unavailableDates = [],
  className,
  label
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [viewDate, setViewDate] = useState(value || new Date())
  const [viewMode, setViewMode] = useState<'days' | 'months' | 'years'>('days')
  const today = new Date()

  // Reset view mode when calendar opens
  useEffect(() => {
    if (isOpen) {
      setViewMode('days')
    }
  }, [isOpen])

  const days = getDaysInMonth(viewDate)

  const handleDateSelect = (date: Date) => {
    const currentMonth = viewDate.getMonth()
    const currentYear = viewDate.getFullYear()
    
    // If clicking on a date from previous/next month, change the view
    if (date.getMonth() !== currentMonth || date.getFullYear() !== currentYear) {
      setViewDate(new Date(date.getFullYear(), date.getMonth(), 1))
      return
    }

    // Check if date is disabled
    if (minDate && date < minDate) return
    if (maxDate && date > maxDate) return
    if (isDateUnavailable(date, unavailableDates)) return

    onChange?.(date)
    setIsOpen(false)
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(viewDate)
    newDate.setMonth(viewDate.getMonth() + (direction === 'next' ? 1 : -1))
    setViewDate(newDate)
  }

  const navigateYear = (direction: 'prev' | 'next') => {
    const newDate = new Date(viewDate)
    newDate.setFullYear(viewDate.getFullYear() + (direction === 'next' ? 1 : -1))
    setViewDate(newDate)
  }

  const handleYearSelect = (year: number) => {
    const newDate = new Date(viewDate)
    newDate.setFullYear(year)
    setViewDate(newDate)
    setViewMode('months')
  }

  const handleMonthSelect = (month: number) => {
    const newDate = new Date(viewDate)
    newDate.setMonth(month)
    setViewDate(newDate)
    setViewMode('days')
  }

  const toggleYearView = () => {
    setViewMode(viewMode === 'years' ? 'days' : 'years')
  }

  const toggleMonthView = () => {
    setViewMode(viewMode === 'months' ? 'days' : 'months')
  }

  // Generate years around current year for birth date context
  const generateYears = () => {
    const currentYear = viewDate.getFullYear()
    const years = []
    const startYear = Math.max(1930, currentYear - 50) // Minimum year 1930
    const endYear = currentYear + 10
    
    for (let year = endYear; year >= startYear; year--) {
      years.push(year)
    }
    return years
  }

  const formatDisplayDate = (date: Date | null) => {
    if (!date) return placeholder
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date)
  }

  const getDayClassName = (date: Date) => {
    const currentMonth = viewDate.getMonth()
    const currentYear = viewDate.getFullYear()
    const isCurrentMonth = date.getMonth() === currentMonth && date.getFullYear() === currentYear
    const isSelected = value && isSameDay(date, value)
    const isToday = isSameDay(date, today)
    const isDisabled = (minDate && date < minDate) || (maxDate && date > maxDate) || isDateUnavailable(date, unavailableDates)

    return cn(
      "w-10 h-10 flex items-center justify-center text-sm rounded-lg transition-colors cursor-pointer",
      !isCurrentMonth && "text-gray-300",
      isCurrentMonth && !isDisabled && "text-gray-900 hover:bg-senegal-green/10",
      isSelected && "bg-senegal-green text-white hover:bg-senegal-green",
      isToday && !isSelected && "bg-senegal-yellow/20 text-senegal-green font-semibold",
      isDisabled && "text-gray-300 cursor-not-allowed opacity-50",
      !isCurrentMonth && "hover:bg-gray-100"
    )
  }

  return (
    <div className={cn("relative", className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      {/* Trigger Button */}
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full justify-start gap-2 text-left",
          !value && "text-gray-500"
        )}
      >
        <CalendarDays className="w-4 h-4 text-senegal-green" />
        {formatDisplayDate(value)}
      </Button>

      {/* Calendar Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Calendar */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full mt-2 z-50 w-80"
            >
              <Card className="shadow-lg border-senegal-green/20">
                <CardContent className="p-4">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        if (viewMode === 'days') navigateMonth('prev')
                        else if (viewMode === 'months') navigateYear('prev')
                        else if (viewMode === 'years') {
                          const newDate = new Date(viewDate)
                          newDate.setFullYear(viewDate.getFullYear() - 12)
                          setViewDate(newDate)
                        }
                      }}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    
                    <div className="flex flex-col items-center space-y-1">
                      {viewMode === 'days' && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={toggleMonthView}
                            className="text-sm font-semibold text-gray-900 hover:text-senegal-green"
                          >
                            {MONTHS[viewDate.getMonth()]}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={toggleYearView}
                            className="text-sm font-semibold text-gray-900 hover:text-senegal-green"
                          >
                            {viewDate.getFullYear()}
                          </Button>
                        </>
                      )}
                      {viewMode === 'months' && (
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={toggleYearView}
                            className="text-sm font-semibold text-gray-900 hover:text-senegal-green"
                          >
                            {viewDate.getFullYear()}
                          </Button>
                          <div className="flex flex-col">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => navigateYear('next')}
                              className="h-4 p-0"
                            >
                              <ChevronUp className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => navigateYear('prev')}
                              className="h-4 p-0"
                            >
                              <ChevronDown className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      )}
                      {viewMode === 'years' && (
                        <h3 className="text-sm font-semibold text-gray-900">
                          Sélectionner une année
                        </h3>
                      )}
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        if (viewMode === 'days') navigateMonth('next')
                        else if (viewMode === 'months') navigateYear('next')
                        else if (viewMode === 'years') {
                          const newDate = new Date(viewDate)
                          newDate.setFullYear(viewDate.getFullYear() + 12)
                          setViewDate(newDate)
                        }
                      }}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Days View */}
                  {viewMode === 'days' && (
                    <>
                      {/* Days of week header */}
                      <div className="grid grid-cols-7 gap-1 mb-2">
                        {DAYS.map((day) => (
                          <div
                            key={day}
                            className="text-center text-xs font-medium text-gray-500 py-2"
                          >
                            {day}
                          </div>
                        ))}
                      </div>

                      {/* Calendar Grid */}
                      <div className="grid grid-cols-7 gap-1">
                        {days.map((date, index) => (
                          <button
                            key={index}
                            onClick={() => handleDateSelect(date)}
                            className={getDayClassName(date)}
                            disabled={
                              (minDate && date < minDate) || 
                              (maxDate && date > maxDate) || 
                              isDateUnavailable(date, unavailableDates)
                            }
                          >
                            {date.getDate()}
                          </button>
                        ))}
                      </div>
                    </>
                  )}

                  {/* Months View */}
                  {viewMode === 'months' && (
                    <div className="grid grid-cols-3 gap-2">
                      {MONTHS.map((month, index) => (
                        <button
                          key={month}
                          onClick={() => handleMonthSelect(index)}
                          className={cn(
                            "p-3 text-sm rounded-lg transition-colors",
                            index === viewDate.getMonth()
                              ? "bg-senegal-green text-white"
                              : "text-gray-700 hover:bg-senegal-green/10 hover:text-senegal-green"
                          )}
                        >
                          {month}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Years View */}
                  {viewMode === 'years' && (
                    <div className="grid grid-cols-4 gap-2 max-h-64 overflow-y-auto">
                      {generateYears().map((year) => (
                        <button
                          key={year}
                          onClick={() => handleYearSelect(year)}
                          className={cn(
                            "p-2 text-sm rounded-lg transition-colors",
                            year === viewDate.getFullYear()
                              ? "bg-senegal-green text-white"
                              : "text-gray-700 hover:bg-senegal-green/10 hover:text-senegal-green"
                          )}
                        >
                          {year}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Footer */}
                  <div className="mt-4 pt-3 border-t border-gray-100">
                    <div className="flex items-center justify-between text-xs">
                      {viewMode === 'days' && (
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded bg-senegal-green"></div>
                            <span className="text-gray-600">Sélectionné</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded bg-gray-300"></div>
                            <span className="text-gray-600">Indisponible</span>
                          </div>
                        </div>
                      )}
                      
                      {viewMode !== 'days' && (
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setViewMode('days')}
                            className="text-xs text-gray-600 hover:text-senegal-green"
                          >
                            ← Retour au calendrier
                          </Button>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2">
                        {viewMode === 'days' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const today = new Date()
                              setViewDate(today)
                              onChange?.(today)
                              setIsOpen(false)
                            }}
                            className="text-xs text-senegal-green hover:text-senegal-green/80"
                          >
                            Aujourd'hui
                          </Button>
                        )}
                        
                        {viewMode === 'years' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const currentYear = new Date().getFullYear()
                              const newDate = new Date(viewDate)
                              newDate.setFullYear(currentYear)
                              setViewDate(newDate)
                            }}
                            className="text-xs text-senegal-green hover:text-senegal-green/80"
                          >
                            Année actuelle
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
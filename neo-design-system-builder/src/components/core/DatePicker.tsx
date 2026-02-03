import React, { useState, useMemo } from 'react'
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react'

/**
 * Date picker display mode
 */
export type DatePickerMode = 'inline' | 'popup'

/**
 * Date picker props
 */
export interface DatePickerProps {
  /** Selected date */
  value?: Date
  /** Date change handler */
  onChange?: (date: Date | null) => void
  /** Display mode */
  mode?: DatePickerMode
  /** Minimum selectable date */
  minDate?: Date
  /** Maximum selectable date */
  maxDate?: Date
  /** Disabled dates */
  disabledDates?: Date[]
  /** Enable range selection */
  range?: boolean
  /** Range start date */
  rangeStart?: Date
  /** Range end date */
  rangeEnd?: Date
  /** Show week numbers */
  showWeekNumbers?: boolean
  /** First day of week (0 = Sunday, 1 = Monday) */
  firstDayOfWeek?: 0 | 1
  /** Placeholder text (popup mode) */
  placeholder?: string
  /** Disabled state */
  disabled?: boolean
  /** Custom className */
  className?: string
}

/**
 * DatePicker Component
 *
 * Full-featured date picker with inline and popup modes, range support.
 *
 * @example
 * ```tsx
 * // Basic date picker
 * <DatePicker
 *   value={selectedDate}
 *   onChange={setSelectedDate}
 * />
 *
 * // Inline calendar
 * <DatePicker
 *   mode="inline"
 *   value={selectedDate}
 *   onChange={setSelectedDate}
 * />
 *
 * // Date range
 * <DatePicker
 *   range
 *   rangeStart={startDate}
 *   rangeEnd={endDate}
 *   onChange={(date) => handleRangeSelection(date)}
 * />
 * ```
 */
export function DatePicker({
  value,
  onChange,
  mode = 'popup',
  minDate,
  maxDate,
  disabledDates = [],
  range = false,
  rangeStart,
  rangeEnd,
  showWeekNumbers = false,
  firstDayOfWeek = 0,
  placeholder = 'Select date',
  disabled = false,
  className = '',
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(() => value || new Date())

  const handleDateSelect = (date: Date) => {
    onChange?.(date)
    if (mode === 'popup' && !range) {
      setIsOpen(false)
    }
  }

  const isDateDisabled = (date: Date): boolean => {
    if (minDate && date < minDate) return true
    if (maxDate && date > maxDate) return true
    return disabledDates.some(d =>
      d.getDate() === date.getDate() &&
      d.getMonth() === date.getMonth() &&
      d.getFullYear() === date.getFullYear()
    )
  }

  const isDateInRange = (date: Date): boolean => {
    if (!range || !rangeStart || !rangeEnd) return false
    return date >= rangeStart && date <= rangeEnd
  }

  const isDateSelected = (date: Date): boolean => {
    if (!value) return false
    return (
      date.getDate() === value.getDate() &&
      date.getMonth() === value.getMonth() &&
      date.getFullYear() === value.getFullYear()
    )
  }

  const calendar = useMemo(() => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()

    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)

    const startDay = firstDay.getDay() - firstDayOfWeek
    const daysInMonth = lastDay.getDate()

    const weeks: Date[][] = []
    let currentWeek: Date[] = []

    // Fill days before month start
    for (let i = startDay; i > 0; i--) {
      currentWeek.push(new Date(year, month, 1 - i))
    }

    // Fill month days
    for (let day = 1; day <= daysInMonth; day++) {
      currentWeek.push(new Date(year, month, day))
      if (currentWeek.length === 7) {
        weeks.push(currentWeek)
        currentWeek = []
      }
    }

    // Fill days after month end
    if (currentWeek.length > 0) {
      const remaining = 7 - currentWeek.length
      for (let i = 1; i <= remaining; i++) {
        currentWeek.push(new Date(year, month + 1, i))
      }
      weeks.push(currentWeek)
    }

    return weeks
  }, [currentMonth, firstDayOfWeek])

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const weekDays = firstDayOfWeek === 0
    ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  const CalendarView = () => (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-80">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={previousMonth}
          className="p-1 rounded hover:bg-gray-100 transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft className="h-5 w-5 text-gray-600" />
        </button>
        <div className="font-semibold text-gray-900">{monthName}</div>
        <button
          type="button"
          onClick={nextMonth}
          className="p-1 rounded hover:bg-gray-100 transition-colors"
          aria-label="Next month"
        >
          <ChevronRight className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {/* Week days */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {showWeekNumbers && <div className="text-xs text-gray-500 text-center font-medium">Wk</div>}
        {weekDays.map(day => (
          <div key={day} className="text-xs text-gray-500 text-center font-medium py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="space-y-1">
        {calendar.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7 gap-1">
            {showWeekNumbers && (
              <div className="text-xs text-gray-400 text-center py-2">
                {week[0].getWeek()}
              </div>
            )}
            {week.map((date, dayIndex) => {
              const isCurrentMonth = date.getMonth() === currentMonth.getMonth()
              const isDisabled = isDateDisabled(date)
              const isSelected = isDateSelected(date)
              const inRange = isDateInRange(date)
              const isToday =
                date.getDate() === new Date().getDate() &&
                date.getMonth() === new Date().getMonth() &&
                date.getFullYear() === new Date().getFullYear()

              return (
                <button
                  key={dayIndex}
                  type="button"
                  onClick={() => !isDisabled && handleDateSelect(date)}
                  disabled={isDisabled}
                  className={`
                    h-9 w-9 rounded text-sm transition-colors
                    ${!isCurrentMonth ? 'text-gray-400' : 'text-gray-900'}
                    ${isSelected ? 'bg-blue-600 text-white font-semibold hover:bg-blue-700' : ''}
                    ${inRange && !isSelected ? 'bg-blue-100' : ''}
                    ${isToday && !isSelected ? 'border border-blue-600' : ''}
                    ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}
                  `}
                >
                  {date.getDate()}
                </button>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )

  if (mode === 'inline') {
    return (
      <div className={className}>
        <CalendarView />
      </div>
    )
  }

  // Popup mode
  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          w-full px-4 py-2 text-left border border-gray-300 rounded-md
          bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          disabled:bg-gray-100 disabled:cursor-not-allowed
          flex items-center justify-between
        `}
      >
        <span className={value ? 'text-gray-900' : 'text-gray-500'}>
          {value ? value.toLocaleDateString() : placeholder}
        </span>
        <Calendar className="h-5 w-5 text-gray-400" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute z-20 mt-2">
            <CalendarView />
          </div>
        </>
      )}
    </div>
  )
}

DatePicker.displayName = 'DatePicker'

// Helper: Add getWeek method to Date prototype (simplified)
declare global {
  interface Date {
    getWeek(): number
  }
}

Date.prototype.getWeek = function() {
  const onejan = new Date(this.getFullYear(), 0, 1)
  return Math.ceil(((this.getTime() - onejan.getTime()) / 86400000 + onejan.getDay() + 1) / 7)
}

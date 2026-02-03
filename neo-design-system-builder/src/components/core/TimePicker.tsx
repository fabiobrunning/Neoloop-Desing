import React, { useState, useRef, useEffect } from 'react'
import { Clock } from 'lucide-react'

/**
 * Time picker mode
 */
export type TimePickerMode = 'hours-minutes' | 'hours-minutes-seconds' | '12h' | '24h'

/**
 * Time value
 */
export interface TimeValue {
  hours: number
  minutes: number
  seconds?: number
  period?: 'AM' | 'PM'
}

/**
 * Time picker props
 */
export interface TimePickerProps {
  /** Selected time */
  value?: TimeValue
  /** Time change handler */
  onChange?: (time: TimeValue) => void
  /** Time format mode */
  mode?: TimePickerMode
  /** Show seconds */
  showSeconds?: boolean
  /** Use 12-hour format */
  use12Hour?: boolean
  /** Minute step interval */
  minuteStep?: number
  /** Second step interval */
  secondStep?: number
  /** Placeholder text */
  placeholder?: string
  /** Disabled state */
  disabled?: boolean
  /** Custom className */
  className?: string
}

/**
 * TimePicker Component
 *
 * Time input with hours, minutes, and optional seconds.
 *
 * @example
 * ```tsx
 * // 24-hour format
 * <TimePicker
 *   value={time}
 *   onChange={setTime}
 *   showSeconds
 * />
 *
 * // 12-hour format with AM/PM
 * <TimePicker
 *   value={time}
 *   onChange={setTime}
 *   use12Hour
 * />
 *
 * // Custom step intervals
 * <TimePicker
 *   value={time}
 *   onChange={setTime}
 *   minuteStep={15}
 * />
 * ```
 */
export function TimePicker({
  value,
  onChange,
  mode = 'hours-minutes',
  showSeconds: showSecondsProp,
  use12Hour: use12HourProp,
  minuteStep = 1,
  secondStep = 1,
  placeholder = 'Select time',
  disabled = false,
  className = '',
}: TimePickerProps) {
  const showSeconds = showSecondsProp ?? (mode === 'hours-minutes-seconds')
  const use12Hour = use12HourProp ?? (mode === '12h')

  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const [localTime, setLocalTime] = useState<TimeValue>({
    hours: value?.hours ?? 0,
    minutes: value?.minutes ?? 0,
    seconds: value?.seconds ?? 0,
    period: value?.period ?? 'AM',
  })

  useEffect(() => {
    if (value) {
      setLocalTime({
        hours: value.hours,
        minutes: value.minutes,
        seconds: value.seconds ?? 0,
        period: value.period ?? 'AM',
      })
    }
  }, [value])

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleTimeChange = (field: keyof TimeValue, value: number | string) => {
    const newTime = { ...localTime, [field]: value }
    setLocalTime(newTime)
    onChange?.(newTime)
  }

  const formatDisplayTime = (): string => {
    if (!value) return placeholder

    const hours = use12Hour
      ? value.hours === 0 ? 12 : value.hours > 12 ? value.hours - 12 : value.hours
      : value.hours

    const parts = [
      hours.toString().padStart(2, '0'),
      value.minutes.toString().padStart(2, '0'),
    ]

    if (showSeconds) {
      parts.push((value.seconds ?? 0).toString().padStart(2, '0'))
    }

    const timeStr = parts.join(':')
    return use12Hour ? `${timeStr} ${value.period ?? 'AM'}` : timeStr
  }

  const hourOptions = use12Hour
    ? Array.from({ length: 12 }, (_, i) => i + 1)
    : Array.from({ length: 24 }, (_, i) => i)

  const minuteOptions = Array.from(
    { length: Math.floor(60 / minuteStep) },
    (_, i) => i * minuteStep
  )

  const secondOptions = Array.from(
    { length: Math.floor(60 / secondStep) },
    (_, i) => i * secondStep
  )

  return (
    <div ref={containerRef} className={`relative ${className}`}>
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
          {formatDisplayTime()}
        </span>
        <Clock className="h-5 w-5 text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute z-20 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-64">
          <div className="flex gap-2">
            {/* Hours */}
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Hours
              </label>
              <div className="max-h-40 overflow-y-auto border border-gray-200 rounded">
                {hourOptions.map(hour => (
                  <button
                    key={hour}
                    type="button"
                    onClick={() => {
                      const adjustedHour = use12Hour
                        ? localTime.period === 'PM' && hour !== 12
                          ? hour + 12
                          : hour === 12 && localTime.period === 'AM'
                          ? 0
                          : hour
                        : hour
                      handleTimeChange('hours', adjustedHour)
                    }}
                    className={`
                      w-full px-3 py-2 text-sm text-left hover:bg-gray-100 transition-colors
                      ${localTime.hours === hour || (use12Hour && (
                        (localTime.hours % 12 || 12) === hour
                      )) ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-900'}
                    `}
                  >
                    {hour.toString().padStart(2, '0')}
                  </button>
                ))}
              </div>
            </div>

            {/* Minutes */}
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Minutes
              </label>
              <div className="max-h-40 overflow-y-auto border border-gray-200 rounded">
                {minuteOptions.map(minute => (
                  <button
                    key={minute}
                    type="button"
                    onClick={() => handleTimeChange('minutes', minute)}
                    className={`
                      w-full px-3 py-2 text-sm text-left hover:bg-gray-100 transition-colors
                      ${localTime.minutes === minute ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-900'}
                    `}
                  >
                    {minute.toString().padStart(2, '0')}
                  </button>
                ))}
              </div>
            </div>

            {/* Seconds */}
            {showSeconds && (
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Seconds
                </label>
                <div className="max-h-40 overflow-y-auto border border-gray-200 rounded">
                  {secondOptions.map(second => (
                    <button
                      key={second}
                      type="button"
                      onClick={() => handleTimeChange('seconds', second)}
                      className={`
                        w-full px-3 py-2 text-sm text-left hover:bg-gray-100 transition-colors
                        ${localTime.seconds === second ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-900'}
                      `}
                    >
                      {second.toString().padStart(2, '0')}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* AM/PM */}
            {use12Hour && (
              <div className="w-16">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Period
                </label>
                <div className="space-y-1">
                  {(['AM', 'PM'] as const).map(period => (
                    <button
                      key={period}
                      type="button"
                      onClick={() => handleTimeChange('period', period)}
                      className={`
                        w-full px-2 py-2 text-sm rounded transition-colors
                        ${localTime.period === period
                          ? 'bg-blue-600 text-white font-semibold'
                          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                        }
                      `}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-3 py-1.5 text-sm rounded border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                onChange?.(localTime)
                setIsOpen(false)
              }}
              className="px-3 py-1.5 text-sm rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

TimePicker.displayName = 'TimePicker'

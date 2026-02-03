/**
 * Core Components Export
 *
 * This file exports all core components for the Neoloop Design System.
 */

// Phase 1 - Basic Components
export { Button, type ButtonProps, type ButtonSize, type ButtonVariant } from './Button'
export { Input, type InputProps, type InputState } from './Input'
export { Select, type SelectProps, type SelectOption, type SelectState } from './Select'
export { Card, CardHeader, CardBody, CardFooter, type CardVariant, type CardPadding, type CardShadow, type CardRadius } from './Card'
export { Checkbox, type CheckboxProps } from './Checkbox'

// Phase 2 - Basic Components (18)
export { Link, type LinkProps } from './Link'
export { Label, type LabelProps } from './Label'
export { HelperText, type HelperTextProps } from './HelperText'
export { Badge, type BadgeProps } from './Badge'
export { Avatar, type AvatarProps } from './Avatar'
export { Tooltip, type TooltipProps } from './Tooltip'
export { ProgressBar, type ProgressBarProps } from './ProgressBar'
export { Spinner, type SpinnerProps } from './Spinner'
export { Skeleton, type SkeletonProps } from './Skeleton'
export { Radio, RadioGroup, type RadioProps, type RadioGroupProps } from './Radio'
export { Switch, type SwitchProps } from './Switch'
export { Textarea, type TextareaProps } from './Textarea'
export { Breadcrumb, type BreadcrumbProps, type BreadcrumbItem } from './Breadcrumb'
export { Divider, type DividerProps } from './Divider'
export { TagInput, type TagInputProps } from './TagInput'
export { IconButton, IconButtonGroup, type IconButtonProps, type IconButtonGroupProps } from './IconButton'
export { PillButton, type PillButtonProps } from './PillButton'

// Phase 2 - Structural Components (8)
export { LoginCard, type LoginCardProps } from './LoginCard'
export { Modal, ModalHeader, ModalBody, ModalFooter, type ModalProps, type ModalHeaderProps, type ModalBodyProps, type ModalFooterProps } from './Modal'
export { Drawer, type DrawerProps } from './Drawer'
export { Accordion, type AccordionProps, type AccordionItemProps } from './Accordion'
export { Sidebar, type SidebarProps, type SidebarItemProps } from './Sidebar'
export { Navbar, NavLink, type NavbarProps, type NavLinkProps } from './Navbar'
export { Footer, type FooterProps, type FooterLinkGroup } from './Footer'

// Phase 3 - Data Components (7)
export { Table, type TableProps, type TableColumn, type SortState, type SortDirection } from './Table'
export { ResponsiveTable, type ResponsiveTableProps, type ResponsiveTableColumn } from './ResponsiveTable'
export { List, ListItem, type ListProps, type ListItem as ListItemData, type ListItemComponentProps } from './List'
export { LineChart, BarChart, AreaChart, PieChart, DonutChart, CHART_COLORS, CHART_COLOR_PALETTE, type ChartDataPoint, type LineChartProps, type BarChartProps, type AreaChartProps, type PieChartProps, type PieChartDataPoint } from './Charts'
export { EmptyState, NoResultsEmptyState, NoDataEmptyState, ErrorEmptyState, type EmptyStateProps, type EmptyStateIcon } from './EmptyState'
export { DatePicker, type DatePickerProps, type DatePickerMode } from './DatePicker'
export { TimePicker, type TimePickerProps, type TimePickerMode, type TimeValue } from './TimePicker'
export { FileUpload, type FileUploadProps, type UploadFile } from './FileUpload'

// Phase 3 - Feedback Components (10)
export { ToastProvider, useToast, toast, type Toast, type ToastVariant, type ToastPosition } from './Toast'
export { Alert, type AlertProps, type AlertVariant } from './Alert'
export { ConfirmDialog, useConfirmDialog, type ConfirmDialogProps, type ConfirmDialogVariant } from './ConfirmDialog'

// Phase 3 - State Styles (Global Design Patterns)
export {
  hoverStyles,
  focusStyles,
  disabledStyles,
  loadingStyles,
  successStyles,
  errorStyles,
  warningStyles,
  infoStyles,
  stateStyles,
  combineStateClasses,
  LoadingSpinner,
  SuccessIcon,
  ErrorIcon,
  WarningIcon,
  type LoadingSpinnerProps,
  type SuccessIconProps,
  type ErrorIconProps,
  type WarningIconProps,
} from './StateStyles'

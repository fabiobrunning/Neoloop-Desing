/**
 * Synkra DS - Icon System
 *
 * Individual icon components and the icon registry.
 * All icons are inline SVGs — no external dependencies.
 */

export { createIcon, type IconComponentProps } from "./create-icon";

// Re-export every icon component
export {
  // Interface / Essential
  XIcon,
  PlusIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  ChevronUpIcon,
  SearchIcon,
  SettingsIcon,
  HouseIcon,
  // Status / Feedback
  AlertCircleIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  InfoIcon,
  XCircleIcon,
  // Theme
  SunIcon,
  MoonIcon,
  MonitorIcon,
  // User
  UserIcon,
  // Communication
  BellIcon,
  MailIcon,
  // Favorites
  HeartIcon,
  StarIcon,
  // Actions
  Trash2Icon,
  PencilIcon,
  EyeIcon,
  EyeOffIcon,
  LogOutIcon,
  // Text Formatting
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  // Navigation
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ExternalLinkIcon,
  // Files / Data
  FileIcon,
  CopyIcon,
  ClipboardIcon,
  // Media
  ImageIcon,
  // Layout
  MenuIcon,
  GridIcon,
  FilterIcon,
  // Misc
  LoaderIcon,
  MoreHorizontalIcon,
  MoreVerticalIcon,
  CalendarIcon,
  ClockIcon,
  DownloadIcon,
  UploadIcon,
  RefreshIcon,
  MinusIcon,
  LinkIcon,
  HashIcon,
  ShieldIcon,
  ZapIcon,
} from "./icons";

// ── Icon Registry ──────────────────────────────────────────────────────
// Maps string names to icon components for the <Icon name="..." /> API.

import type { IconComponentProps } from "./create-icon";
import * as AllIcons from "./icons";

type IconComponent = React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<SVGSVGElement>
>;

/**
 * Registry of all available icons, keyed by display name.
 * Used by the `<Icon name="..." />` component in `src/atoms/icon/`.
 */
export const iconRegistry: Record<string, IconComponent> = {
  // Interface / Essential
  X: AllIcons.XIcon,
  Plus: AllIcons.PlusIcon,
  Check: AllIcons.CheckIcon,
  ChevronDown: AllIcons.ChevronDownIcon,
  ChevronRight: AllIcons.ChevronRightIcon,
  ChevronLeft: AllIcons.ChevronLeftIcon,
  ChevronUp: AllIcons.ChevronUpIcon,
  Search: AllIcons.SearchIcon,
  Settings: AllIcons.SettingsIcon,
  House: AllIcons.HouseIcon,

  // Status / Feedback
  AlertCircle: AllIcons.AlertCircleIcon,
  CircleAlert: AllIcons.AlertCircleIcon, // alias
  CheckCircle: AllIcons.CheckCircleIcon,
  CheckCircle2: AllIcons.CheckCircleIcon, // alias
  AlertTriangle: AllIcons.AlertTriangleIcon,
  Info: AllIcons.InfoIcon,
  XCircle: AllIcons.XCircleIcon,

  // Theme
  Sun: AllIcons.SunIcon,
  Moon: AllIcons.MoonIcon,
  Monitor: AllIcons.MonitorIcon,

  // User
  User: AllIcons.UserIcon,

  // Communication
  Bell: AllIcons.BellIcon,
  Mail: AllIcons.MailIcon,

  // Favorites
  Heart: AllIcons.HeartIcon,
  Star: AllIcons.StarIcon,

  // Actions
  Trash2: AllIcons.Trash2Icon,
  Pencil: AllIcons.PencilIcon,
  Eye: AllIcons.EyeIcon,
  EyeOff: AllIcons.EyeOffIcon,
  LogOut: AllIcons.LogOutIcon,

  // Text Formatting
  Bold: AllIcons.BoldIcon,
  Italic: AllIcons.ItalicIcon,
  Underline: AllIcons.UnderlineIcon,

  // Navigation
  ArrowLeft: AllIcons.ArrowLeftIcon,
  ArrowRight: AllIcons.ArrowRightIcon,
  ArrowUp: AllIcons.ArrowUpIcon,
  ArrowDown: AllIcons.ArrowDownIcon,
  ExternalLink: AllIcons.ExternalLinkIcon,

  // Files / Data
  File: AllIcons.FileIcon,
  Copy: AllIcons.CopyIcon,
  Clipboard: AllIcons.ClipboardIcon,

  // Media
  Image: AllIcons.ImageIcon,

  // Layout
  Menu: AllIcons.MenuIcon,
  Grid: AllIcons.GridIcon,
  Filter: AllIcons.FilterIcon,

  // Misc
  Loader: AllIcons.LoaderIcon,
  MoreHorizontal: AllIcons.MoreHorizontalIcon,
  MoreVertical: AllIcons.MoreVerticalIcon,
  Calendar: AllIcons.CalendarIcon,
  Clock: AllIcons.ClockIcon,
  Download: AllIcons.DownloadIcon,
  Upload: AllIcons.UploadIcon,
  Refresh: AllIcons.RefreshIcon,
  Minus: AllIcons.MinusIcon,
  Link: AllIcons.LinkIcon,
  Hash: AllIcons.HashIcon,
  Shield: AllIcons.ShieldIcon,
  Zap: AllIcons.ZapIcon,
};

/** All valid icon names for the `<Icon name="..." />` API */
export type IconName = keyof typeof iconRegistry;

/** Get all available icon names */
export const iconNames = Object.keys(iconRegistry) as IconName[];

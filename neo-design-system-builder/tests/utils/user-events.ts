import userEvent from '@testing-library/user-event';
import { UserEvent } from '@testing-library/user-event';

/**
 * Setup user event instance
 * Use this for all user interactions in tests
 */
export function setupUser(): UserEvent {
  return userEvent.setup();
}

/**
 * Click an element with user event
 */
export async function clickElement(element: HTMLElement): Promise<void> {
  const user = setupUser();
  await user.click(element);
}

/**
 * Double click an element
 */
export async function doubleClickElement(element: HTMLElement): Promise<void> {
  const user = setupUser();
  await user.dblClick(element);
}

/**
 * Type into an input element
 */
export async function typeIntoElement(
  element: HTMLElement,
  text: string
): Promise<void> {
  const user = setupUser();
  await user.type(element, text);
}

/**
 * Clear an input and type new text
 */
export async function clearAndType(
  element: HTMLElement,
  text: string
): Promise<void> {
  const user = setupUser();
  await user.clear(element);
  await user.type(element, text);
}

/**
 * Select an option from a select element
 */
export async function selectOption(
  selectElement: HTMLElement,
  optionText: string | string[]
): Promise<void> {
  const user = setupUser();
  await user.selectOptions(selectElement, optionText);
}

/**
 * Hover over an element
 */
export async function hoverElement(element: HTMLElement): Promise<void> {
  const user = setupUser();
  await user.hover(element);
}

/**
 * Unhover an element
 */
export async function unhoverElement(element: HTMLElement): Promise<void> {
  const user = setupUser();
  await user.unhover(element);
}

/**
 * Tab to next focusable element
 */
export async function tabToNext(): Promise<void> {
  const user = setupUser();
  await user.tab();
}

/**
 * Tab to previous focusable element
 */
export async function tabToPrevious(): Promise<void> {
  const user = setupUser();
  await user.tab({ shift: true });
}

/**
 * Press a keyboard key
 */
export async function pressKey(key: string): Promise<void> {
  const user = setupUser();
  await user.keyboard(`{${key}}`);
}

/**
 * Press multiple keys in sequence
 */
export async function pressKeys(keys: string[]): Promise<void> {
  const user = setupUser();
  for (const key of keys) {
    await user.keyboard(`{${key}}`);
  }
}

/**
 * Press and hold a key
 */
export async function holdKey(key: string): Promise<void> {
  const user = setupUser();
  await user.keyboard(`{${key}>}`);
}

/**
 * Release a held key
 */
export async function releaseKey(key: string): Promise<void> {
  const user = setupUser();
  await user.keyboard(`{/${key}}`);
}

/**
 * Upload a file to a file input
 */
export async function uploadFile(
  input: HTMLElement,
  file: File | File[]
): Promise<void> {
  const user = setupUser();
  await user.upload(input, file);
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(): Promise<void> {
  const user = setupUser();
  await user.copy();
}

/**
 * Paste text from clipboard
 */
export async function pasteFromClipboard(): Promise<void> {
  const user = setupUser();
  await user.paste();
}

/**
 * Cut text to clipboard
 */
export async function cutToClipboard(): Promise<void> {
  const user = setupUser();
  await user.cut();
}

/**
 * Simulate keyboard navigation through focusable elements
 *
 * @param times - Number of tabs
 * @param reverse - Tab backwards (Shift+Tab)
 */
export async function navigateByKeyboard(
  times: number = 1,
  reverse: boolean = false
): Promise<void> {
  const user = setupUser();
  for (let i = 0; i < times; i++) {
    await user.tab({ shift: reverse });
  }
}

/**
 * Focus an element and verify it has focus
 */
export async function focusAndVerify(element: HTMLElement): Promise<void> {
  element.focus();
  expect(element).toHaveFocus();
}

/**
 * Helper to test keyboard accessibility
 */
export async function testKeyboardAccessibility(
  element: HTMLElement,
  keys: string[] = ['Enter', 'Space']
): Promise<void> {
  const user = setupUser();

  // Focus element
  element.focus();
  expect(element).toHaveFocus();

  // Test each key
  for (const key of keys) {
    await user.keyboard(`{${key}}`);
  }
}

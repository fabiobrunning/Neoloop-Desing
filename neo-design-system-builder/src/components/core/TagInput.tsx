import React from 'react';

export interface TagInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  /** Current tags */
  tags: string[];
  /** Change handler for tags */
  onChange: (tags: string[]) => void;
  /** Label */
  label?: string;
  /** Placeholder */
  placeholder?: string;
  /** Max tags allowed */
  maxTags?: number;
  /** Allow duplicates */
  allowDuplicates?: boolean;
  /** Error state */
  error?: boolean;
  /** Helper text */
  helperText?: string;
  /** Separator keys (default: Enter, Comma) */
  separatorKeys?: string[];
}

/**
 * Tag input component for multiple values
 *
 * @example
 * ```tsx
 * <TagInput tags={tags} onChange={setTags} placeholder="Add tags..." />
 * <TagInput tags={tags} onChange={setTags} maxTags={5} label="Skills" />
 * ```
 */
export const TagInput = React.forwardRef<HTMLInputElement, TagInputProps>(
  (
    {
      tags,
      onChange,
      label,
      placeholder = 'Add tag...',
      maxTags,
      allowDuplicates = false,
      error = false,
      helperText,
      separatorKeys = ['Enter', ','],
      disabled = false,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const [inputValue, setInputValue] = React.useState('');
    const inputRef = React.useRef<HTMLInputElement>(null);
    const tagInputId = React.useId();
    const inputId = id || tagInputId;

    const addTag = (tag: string) => {
      const trimmedTag = tag.trim();

      if (!trimmedTag) return;
      if (maxTags && tags.length >= maxTags) return;
      if (!allowDuplicates && tags.includes(trimmedTag)) return;

      onChange([...tags, trimmedTag]);
      setInputValue('');
    };

    const removeTag = (indexToRemove: number) => {
      onChange(tags.filter((_, index) => index !== indexToRemove));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (separatorKeys.includes(e.key)) {
        e.preventDefault();
        addTag(inputValue);
      } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
        removeTag(tags.length - 1);
      }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      // Remove separator characters while typing
      const cleanValue = value.replace(/,/g, '');
      setInputValue(cleanValue);
    };

    const handleContainerClick = () => {
      inputRef.current?.focus();
    };

    const isMaxReached = maxTags ? tags.length >= maxTags : false;

    return (
      <div className={`w-full ${className}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            {label}
            {maxTags && (
              <span className="text-gray-500 font-normal ml-1">
                ({tags.length}/{maxTags})
              </span>
            )}
          </label>
        )}

        <div
          onClick={handleContainerClick}
          className={`
            flex flex-wrap gap-2 p-2 rounded-lg border
            bg-white dark:bg-gray-800
            transition-colors duration-200
            min-h-[42px]
            ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
            ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-50 dark:bg-gray-900' : 'cursor-text'}
            focus-within:ring-2 focus-within:ring-offset-2
            ${error ? 'focus-within:ring-red-500' : 'focus-within:ring-blue-500'}
          `}
        >
          {tags.map((tag, index) => (
            <span
              key={index}
              className="
                inline-flex items-center gap-1.5
                px-2.5 py-0.5
                bg-blue-100 text-blue-800
                dark:bg-blue-900 dark:text-blue-200
                rounded-full text-sm font-medium
              "
            >
              {tag}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeTag(index);
                }}
                disabled={disabled}
                className="
                  flex-shrink-0 hover:opacity-70
                  focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full
                "
                aria-label={`Remove ${tag}`}
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </span>
          ))}

          {!isMaxReached && (
            <input
              ref={(node) => {
                inputRef.current = node;
                if (typeof ref === 'function') {
                  ref(node);
                } else if (ref) {
                  ref.current = node;
                }
              }}
              id={inputId}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={tags.length === 0 ? placeholder : ''}
              disabled={disabled}
              className="
                flex-1 min-w-[120px] outline-none
                bg-transparent
                text-gray-900 dark:text-gray-100
                placeholder-gray-400 dark:placeholder-gray-500
                disabled:cursor-not-allowed
              "
              aria-describedby={helperText ? `${inputId}-helper` : undefined}
              {...props}
            />
          )}
        </div>

        {helperText && (
          <p
            id={`${inputId}-helper`}
            className={`text-xs mt-1 ${error ? 'text-red-600' : 'text-gray-500'}`}
          >
            {helperText}
          </p>
        )}

        {isMaxReached && (
          <p className="text-xs mt-1 text-gray-500">
            Maximum number of tags reached
          </p>
        )}
      </div>
    );
  }
);

TagInput.displayName = 'TagInput';

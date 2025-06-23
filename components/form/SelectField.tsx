import { useState } from 'react';
import {
  FieldValues, UseFormSetValue, Path, PathValue,
} from 'react-hook-form';

import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { titleCaseUnderscoreDash } from '@/services/TextServices';

// Define the type for an individual option
type SelectOption = {
  value: string | number;
  label: string;
};

type SelectFieldType<T extends FieldValues> = {
  className?: string;
  error?: string;
  disabled?: boolean;
  selectName: Path<T>;
  options: SelectOption[]; // Changed to array of objects { value, label }
  labelText: string;
  setValue: UseFormSetValue<T>; // The function to set the value of the select field
  value: string | number; // The current value of the select field
  showPlaceholder?: boolean;
};

export default function SelectField<T extends FieldValues>({
  className, error, selectName, options, labelText, setValue, value, disabled, showPlaceholder = true,
}: SelectFieldType<T>) {
  // State to track if the select is focused
  const [isFocused, setIsFocused] = useState(false);

  // Find the label for the currently selected value
  const selectedLabel = options.find(option => option.value.toString() === value?.toString())?.label || '';

  const generateTriggerDynamicClasses = () => {
    if (isFocused) {
      return 'border-[2px] border-gray-900 focus:border-gray-900';
    }
    if (error) {
      return 'border border-red-500';
    }

    return 'border-[#79747E] border';
  };

  const generateLabelDynamicClasses = () => {
    // If focused or a value is selected, move the label up and change its style
    if (isFocused || value) {
      return 'bg-white text-gray-900 -translate-y-[27px] text-sm font-normal';
    }
    // If only a value is selected (and not focused), keep the label style as text-gray-900
    if (value) {
      return 'text-gray-900';
    }
    // Default style when not focused and no value
    return 'text-[#808080]';
  };

  return (
    <div className={`w-full mb-5 relative ${className} `}>
      <Select
        name={selectName}
        disabled={disabled}
        value={value ? value.toString() : ''} // Ensure value is a string for the Select component
        // Handler for when the select box is opened or closed
        onOpenChange={(isOpened) => { setIsFocused(isOpened); }}
        // Handler for when a value is selected, setting the form value
        onValueChange={(selectValue) => {
          setValue(selectName, selectValue as PathValue<T, Path<T>>);
        }}
      >
        <SelectTrigger
          className={`flex relative font-light items-center rounded-md border justify-between cursor-pointer pl-4 pr-3 w-full py-1 h-12
            ${disabled && 'disabled:cursor-not-allowed disabled:opacity-50'}
            ${generateTriggerDynamicClasses()}
          `}
        >
          <span className="absolute left-6 opacity-0">{labelText}</span>
          {/* Floating label effect, moves up when focused or has value */}

          {/* This span now acts as the placeholder when no value is selected AND showPlaceholder is false */}
          {!showPlaceholder && (
            <span className={`px-1 text-base font-light transition-all duration-300 absolute left-[18px] top-3 pointer-events-none
              ${generateLabelDynamicClasses()}
            `}
            >
              {labelText}
            </span>
          )}

          {/* Display the selected value or placeholder */}
          <SelectValue placeholder={showPlaceholder ? labelText : ' '}>
            {
              // If a value is selected, display its corresponding label
              value && selectedLabel ? (
                <span className="absolute left-[18px] top-3 text-normal font-light">
                  {selectedLabel}
                </span>
              )
                // If showPlaceholder is true and no value, display labelText as placeholder
                : showPlaceholder ? labelText : null
            }
          </SelectValue>
        </SelectTrigger>
        <SelectContent sideOffset={10} className="max-h-[280px] min-h-20 border bg-white">
          {/* Map over options to create select items */}
          {options.map((item) => (
            <SelectItem key={item.value.toString()} value={item.value.toString()}>
              {item.label} {/* Display the label property */}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {/* Display an error message if there is an error */}
      {error ? <span className="text-red-500 text-sm absolute -bottom-5 left-2">{error}</span> : null}
    </div>
  );
}

import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

import { cn } from '@/lib/utils';
import './input-field-styles.css';
import { Textarea } from '@/components/ui/textarea';

type InputFieldType<T extends FieldValues> = {
  error?: string
  fieldName: Path<T>
  register: UseFormRegister<T>
  containerClassName?: string
  placeholder?: string
  className?: string
  disabled?: boolean
  labelText?: string
  showPlaceholder?: boolean
};

// global input field for validating user inputs
export default function TextAreaInput<T extends FieldValues>({
  containerClassName,
  fieldName,
  disabled = false,
  error,
  register,
  className,
  labelText,
  placeholder,
  showPlaceholder = true,
}: InputFieldType<T>) {
  const {
    onChange, onBlur, name, ref,
  } = register(fieldName as Path<T>);

  return (
    <div className={cn('mb-4 w-full relative', containerClassName)}>
      <Textarea
        onChange={onChange}
        id={name}
        name={name}
        onBlur={onBlur}
        ref={ref}
        placeholder={placeholder || showPlaceholder ? labelText : ' '}
        disabled={disabled}
        className={cn(`px-4 w-full resize-none py-2 border-[#79747E] font-light h-[252px] rounded-md invalid:focus:border-gray-900 invalid:focus:border-4 invalid:focus:border-solid invalid:border-red-500 ${error ? 'border-red-500' : ''}`, className)}
      />
      <label htmlFor={name}>
        {showPlaceholder ? ' ' : labelText}
      </label>
      {error ? <span className="text-red-500 text-sm absolute -bottom-5 left-2">{error}</span> : null}
    </div>
  );
}

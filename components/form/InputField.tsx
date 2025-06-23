import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

import { cn } from '@/lib/utils';;

import { Input } from '@/components/ui/input';
import './input-field-styles.css';
import SvgIcons from '@/icons/SvgIcons';

type InputType = 'password' | 'email' | 'text' | 'number' | 'date';
type InputFieldType<T extends FieldValues> = {
  error?: string
  fieldName: Path<T>
  register: UseFormRegister<T>
  containerClassName?: string
  className?: string
  disabled?: boolean
  type?: InputType
  showPasswordToggle?: boolean
  onPasswordToggle?: () => void
  labelText?: string
  showPlaceholder?: boolean
};

// global input field for validating user inputs
export default function InputField<T extends FieldValues>({
  containerClassName,
  type = 'text',
  fieldName,
  disabled = false,
  error,
  register,
  className,
  showPasswordToggle,
  onPasswordToggle,
  labelText,
  showPlaceholder = true,
}: InputFieldType<T>) {
  const {
    onChange, onBlur, name, ref,
  } = register(fieldName as Path<T>);

  return (
    <div className={cn('mb-5 w-full relative', containerClassName)}>
      <Input
        onChange={onChange}
        id={name}
        name={name}
        onBlur={onBlur}
        ref={ref}
        type={type}
        placeholder={showPlaceholder ? labelText : ' '}
        disabled={disabled}
        className={cn(`px-4 w-full py-1 h-12 font-light  border-gray-900 text-normal focus-visible:border-[2px] focus-visible:border-[#79747E] rounded-md invalid:focus:border-gray-900 invalid:focus:border-4 invalid:focus:border-solid invalid:border-red-500 ${error ? 'border-red-500' : ''}`, className)}
      />
      <label htmlFor={name}>
        {showPlaceholder ? ' ' : labelText}
      </label>
      {/* optionally render password toggle button if showPasswordToggle is passed */}
      {showPasswordToggle
        ? (
          <button
            aria-label="cancel-button"
            type="button"
            onClick={onPasswordToggle}
            className={`rounded-full absolute  right-2 ${type === 'password' ? 'top-2' : 'top-0.5'}  p-2`}
          >
            <span>
              {type === 'text' ? <SvgIcons.EyesClosed /> : <SvgIcons.EyesOpened />}
            </span>
          </button>
        ) : null}
      {error ? <span className="text-red-500 text-sm absolute -bottom-5 left-2">{error}</span> : null}
    </div>
  );
}

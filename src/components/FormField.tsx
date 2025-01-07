import clsx from 'clsx';

interface FormFieldProps {
  type: string;
  placeholder: string;
  name: string;
  register: any;
  error?: any;
  valueAsNumber?: boolean;
  className?: string;
  value?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
  value,
  className
}) => (
  <>
    <input
      type={type}
      placeholder={placeholder}
      {...register(name, { valueAsNumber })}
      className={`${className}`}
      value={value}
    />
    {error && <span className="text-sm text-red-500">{error.message}</span>}
  </>
);
export default FormField;
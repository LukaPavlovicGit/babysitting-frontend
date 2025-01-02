import clsx from 'clsx';

interface FormFieldProps {
  type: string;
  placeholder: string;
  name: string;
  register: any;
  error?: any;
  valueAsNumber?: boolean;
  className?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
  className
}) => (
  <>
    <input
      type={type}
      placeholder={placeholder}
      {...register(name, { valueAsNumber })}
      className={`${className}`}
    />
    {error && <span className="text-sm text-red-500">{error.message}</span>}
  </>
);
export default FormField;
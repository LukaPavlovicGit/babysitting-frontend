import React from 'react'
import clsx from 'clsx'

interface CheckboxProps {
  label: string
  name: string
  register: any
  error?: any
  className?: string
  checked?: boolean
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  name,
  register,
  error,
  className,
  checked,
}) => (
  <div className="flex items-center gap-2">
    <input
      type="checkbox"
      {...register(name)}
      className={clsx(
        'h-4 w-4 rounded border-gray-300',
        'focus:ring-2 focus:ring-blue-500',
        className
      )}
      checked={checked}
    />
    <label htmlFor={name} className="text-sm">
      {label}
    </label>
    {error && <span className="text-sm text-red-500">{error.message}</span>}
  </div>
)

export default Checkbox

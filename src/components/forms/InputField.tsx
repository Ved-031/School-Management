"use client";

import { FieldError } from "react-hook-form";


interface InputFieldProps {
    label: string;
    type?: string;
    name: string;
    defaultValue?: string;
    register: any;
    error?: FieldError;
    placeholder?: string;
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

const InputField = ({ label, type="text", name, defaultValue, register, error, placeholder, inputProps }: InputFieldProps) => {
  return (
    <div className="flex flex-col gap-1 flex-1">
        <label className="text-sm font-medium text-gray-500">{label}</label>
        <input 
            type={type}
            className="ring-1 ring-gray-300 rounded-md py-2 px-3 text-sm"
            placeholder={placeholder}
            defaultValue={defaultValue}
            {...register(name)}
            {...inputProps}
        />
        {error?.message && (
            <p className="text-xs text-red-500">
                {error.message}
            </p>
        )}
    </div>
  )
}

export default InputField;
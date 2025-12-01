import type { UseFormRegisterReturn } from "react-hook-form";

interface InputFormProps {
  type: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  error?: string;
}

function InputForm({ type, placeholder, register, error }: InputFormProps) {
  return (
    <div className="w-full">
      <input
        type={type}
        placeholder={placeholder}
        {...register}
        className="border border-[#f2f2f2] px-3 py-2 focus:outline-none w-full"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

export default InputForm;

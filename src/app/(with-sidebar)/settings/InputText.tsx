import { InputHTMLAttributes } from "react";

type Props = {
  label: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

function InputText({ label, error, ...props }: Props) {
  return (
    <div className="flex w-full flex-col gap-2 rounded-xl">
      <label htmlFor={props.id} className="font-semibold">
        {label}
      </label>
      <div className="w-full space-y-2">
        <input
          className="border-foreground/20 w-full rounded-xl border px-4 py-2 outline-0"
          {...props}
        />
        {error && <p className="text-xs text-red-400">{error}</p>}
      </div>
    </div>
  );
}

export default InputText;

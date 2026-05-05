import { cn } from "@/lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export function InputField({ label, error, className, ...props }: InputProps) {
  return (
    <label className="grid gap-2 text-sm font-medium text-[#163A70]">
      <span className="flex items-center gap-2 uppercase tracking-[0.14em] text-[11px]">
        <span className="h-px w-5 bg-[#163A70]/18" />
        {label}
      </span>
      <input
        className={cn(
          "h-12 rounded-none border border-[#163A70]/12 bg-[linear-gradient(rgba(22,58,112,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(22,58,112,0.018)_1px,transparent_1px),white] bg-[size:18px_18px,18px_18px,auto] px-4 text-[#1F2937] outline-none placeholder:text-[#1F2937]/35 focus:border-[#2F6BFF]",
          className
        )}
        {...props}
      />
      {error ? <span className="text-xs text-red-600">{error}</span> : null}
    </label>
  );
}

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
};

export function TextareaField({ label, error, className, ...props }: TextareaProps) {
  return (
    <label className="grid gap-2 text-sm font-medium text-[#163A70]">
      <span className="flex items-center gap-2 uppercase tracking-[0.14em] text-[11px]">
        <span className="h-px w-5 bg-[#163A70]/18" />
        {label}
      </span>
      <textarea
        className={cn(
          "min-h-32 rounded-none border border-[#163A70]/12 bg-[linear-gradient(rgba(22,58,112,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(22,58,112,0.018)_1px,transparent_1px),white] bg-[size:18px_18px,18px_18px,auto] px-4 py-3 text-[#1F2937] outline-none placeholder:text-[#1F2937]/35 focus:border-[#2F6BFF]",
          className
        )}
        {...props}
      />
      {error ? <span className="text-xs text-red-600">{error}</span> : null}
    </label>
  );
}

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
};

export function SelectField({ label, error, className, children, ...props }: SelectProps) {
  return (
    <label className="grid gap-2 text-sm font-medium text-[#163A70]">
      <span className="flex items-center gap-2 uppercase tracking-[0.14em] text-[11px]">
        <span className="h-px w-5 bg-[#163A70]/18" />
        {label}
      </span>
      <select
        className={cn(
          "h-12 rounded-none border border-[#163A70]/12 bg-[linear-gradient(rgba(22,58,112,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(22,58,112,0.018)_1px,transparent_1px),white] bg-[size:18px_18px,18px_18px,auto] px-4 text-[#1F2937] outline-none focus:border-[#2F6BFF]",
          className
        )}
        {...props}
      >
        {children}
      </select>
      {error ? <span className="text-xs text-red-600">{error}</span> : null}
    </label>
  );
}

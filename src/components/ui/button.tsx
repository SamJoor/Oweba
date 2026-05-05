import Link, { LinkProps } from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full border font-medium tracking-[-0.015em] transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F6BFF]/40 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "border-[#2F6BFF] bg-[#2F6BFF] text-white shadow-[0_18px_40px_rgba(47,107,255,0.22)] hover:-translate-y-0.5 hover:border-[#163A70] hover:bg-[#163A70] hover:shadow-[0_22px_50px_rgba(22,58,112,0.24)]",
        secondary:
          "border-[#163A70]/12 bg-white/84 text-[#163A70] shadow-[inset_0_1px_0_rgba(255,255,255,0.86)] hover:-translate-y-0.5 hover:border-[#163A70]/28 hover:bg-white hover:shadow-[0_16px_36px_rgba(22,58,112,0.08)]",
        ghost: "border-transparent text-[#163A70] hover:bg-[#163A70]/5",
        dark:
          "border-white/15 bg-[#163A70] text-[#F8F4EC] shadow-[0_18px_45px_rgba(22,58,112,0.24)] hover:-translate-y-0.5 hover:bg-[#122d57]"
      },
      size: {
        sm: "h-10 px-4 text-sm",
        md: "h-12 px-5 text-sm",
        lg: "h-14 px-6 text-[0.97rem]",
        xl: "h-15 px-7 text-base",
        hero: "h-12 px-6 text-[0.95rem]"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  )
);

Button.displayName = "Button";

type ButtonLinkProps = LinkProps &
  VariantProps<typeof buttonVariants> & {
    className?: string;
    children: React.ReactNode;
    target?: string;
    rel?: string;
    onClick?: () => void;
  };

export function ButtonLink({ className, variant, size, children, ...props }: ButtonLinkProps) {
  return (
    <Link className={cn(buttonVariants({ variant, size }), className)} {...props}>
      {children}
    </Link>
  );
}

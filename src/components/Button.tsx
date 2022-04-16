import * as React from "react";
import classNames from "classnames";

export type ButtonProps = JSX.IntrinsicElements["button"] & {
  variant?: keyof typeof variants | null;
};

const variants = {
  default: "bg-gray-400/50 dark:bg-dark-3 hover:bg-gray-400 dark:hover:bg-dark-4",
  cancel: "bg-transparent hover:bg-gray-400/40 dark:hover:bg-dark-2 mr-1",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ ...props }, ref) => {
  const variant = props.variant === null ? null : props.variant ?? "default";

  return (
    <button
      {...props}
      disabled={props.disabled}
      className={classNames(
        "p-1 px-2 rounded-md transition-colors cursor-pointer",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variant && variants[variant],
        props.className,
      )}
      ref={ref}
    >
      {props.children}
    </button>
  );
});

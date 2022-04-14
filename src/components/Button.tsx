import * as React from "react";
import classNames from "classnames";

export type ButtonProps = JSX.IntrinsicElements["button"] & {
  variant?: keyof typeof variants | null;
  loading?: boolean;
};

const variants = {
  default: "bg-gray-400/50 dark:bg-dark-3 hover:bg-gray-400 dark:hover:bg-dark-4",
  cancel: "bg-transparent hover:bg-gray-400/40 dark:hover:bg-dark-2 mr-1",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ loading, ...props }, ref) => {
    const variant = props.variant === null ? null : props.variant ?? "default";

    return (
      <button
        {...props}
        disabled={typeof loading === "boolean" ? loading : props.disabled}
        className={classNames(
          "p-1 px-3 rounded-md transition-colors cursor-default",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          variant && variants[variant],
          loading && "flex justify-center items-center gap-2",
          props.className,
        )}
        ref={ref}
      >
        {props.children}
      </button>
    );
  },
);

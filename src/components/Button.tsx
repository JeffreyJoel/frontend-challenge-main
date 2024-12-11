import { FunctionComponent, PropsWithChildren } from "react";
import classNames from "classnames";

type ButtonProps = {
  onClick?: () => void;
  className?: string;
};

export const Button: FunctionComponent<PropsWithChildren<ButtonProps>> = ({
  onClick,
  children,
  className,
}) => {
  
  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(
        "px-2 py-1 border border-black", 
        className
      )}
    >
      {children}
    </button>
  );
};

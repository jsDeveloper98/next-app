import { ButtonHTMLAttributes } from "react";
import classNames from "classnames";

const Button = ({
  children,
  className,
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={classNames(
        "text-white bg-blue-700 hover:bg-blue-800 cursor-pointer dark:focus:ring-0 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;

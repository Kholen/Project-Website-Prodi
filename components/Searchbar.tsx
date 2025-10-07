import React, { forwardRef } from "react";
import { useInput } from "@heroui/react";
import { FiX } from "react-icons/fi";
import "@/styles/globals.css";

export const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg aria-hidden="true" fill="none" focusable="false" height="1em" role="presentation" viewBox="0 0 24 24" width="1em" {...props}>
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path d="M22 22L20 20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
};

export const CloseFilledIcon = (props: React.ComponentProps<typeof FiX>) => {
  return <FiX aria-hidden="true" className="text-default-500"  {...props} />;
};

const styles = {
  label: "text-black/50 dark:text-white/90",
  input: ["bg-transparent", "text-black/90 dark:text-white/90", "placeholder:text-default-700/50 dark:placeholder:text-white/60"],
  innerWrapper: "bg-transparent",
  inputWrapper: [
    "shadow-xl",
    "bg-default-200/50",
    "dark:bg-default/60",
    "backdrop-blur-xl",
    "backdrop-saturate-200",
    "hover:bg-default-200/70",
    "focus-within:bg-default-200/50!",
    "dark:hover:bg-default/70",
    "dark:focus-within:bg-default/60!",
    "cursor-text!",
  ],
};

type UseInputPropsInfer<T extends HTMLInputElement | HTMLTextAreaElement = HTMLInputElement> = Parameters<typeof useInput<T>>[0];
type MyInputProps = Omit<UseInputPropsInfer<HTMLInputElement>, "ref">;

const MyInput = forwardRef<HTMLInputElement, MyInputProps>((props, ref) => {
  const {
    Component,
    label,
    domRef,
    description,
    isClearable,
    startContent,
    endContent,
    shouldLabelBeOutside,
    shouldLabelBeInside,
    errorMessage,
    getBaseProps,
    getLabelProps,
    getInputProps,
    getInnerWrapperProps,
    getInputWrapperProps,
    getDescriptionProps,
    getErrorMessageProps,
    getClearButtonProps,
  } = useInput<HTMLInputElement>({
    ...props,
    ref,
    // this is just for the example, the props bellow should be passed by the parent component
    type: "search",
    placeholder: props.placeholder ?? "Cari Dosen...",
    value: props.value,
    defaultValue: props.defaultValue,
    onValueChange: props.onValueChange,
    onClear: props.onClear,
    startContent: <SearchIcon className="text-black/50 mb-0.5 pointer-events-none shrink-0" />,
    // custom styles
    classNames: {
      ...styles,
    },
  });

  const labelContent = <label {...getLabelProps()}>{label}</label>;

  const end = React.useMemo(() => {
    if (isClearable) {
      const clearProps = getClearButtonProps();

      return (
        <span
          {...clearProps}
          onClick={(evt) => {
            clearProps.onClick?.(evt);
            props.onClear?.();
          }}
        >
          {endContent || <CloseFilledIcon />}
        </span>
      );
    }

    return endContent;
  }, [isClearable, endContent, getClearButtonProps]);

  const innerWrapper = React.useMemo(() => {
    if (startContent || end) {
      return (
        <div {...getInnerWrapperProps()}>
          {startContent}
          <input {...getInputProps()} />
          {end}
        </div>
      );
    }

    return <input {...getInputProps()} />;
  }, [startContent, end, getInputProps, getInnerWrapperProps]);

  return (
    <div className="w-[auto] h-[44px]  rounded-xl flex justify-center items-center border-gray-200 border-2  text-white shadow-lg">
      <Component {...getBaseProps()}>
        {shouldLabelBeOutside ? labelContent : null}
        <div
          tabIndex={0}
          {...getInputWrapperProps()}
          role="button"
          onClick={() => {
            domRef.current?.focus();
          }}
          onKeyDown={() => {
            domRef.current?.focus();
          }}
        >
          {shouldLabelBeInside ? labelContent : null}
          {innerWrapper}
        </div>
        {description && <div {...getDescriptionProps()}>{description}</div>}
        {errorMessage && <div {...getErrorMessageProps()}>{errorMessage}</div>}
      </Component>
    </div>
  );
});

MyInput.displayName = "MyInput";

export default MyInput;





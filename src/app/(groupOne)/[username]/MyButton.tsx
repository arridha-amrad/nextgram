"use client";

import { Key, Ref, forwardRef } from "react";
import { useButton, Ripple, Spinner } from "@nextui-org/react";

const MyButton = forwardRef((props) => {
  const {
    domRef,
    children,
    spinnerSize,
    spinner = <Spinner color="current" size={spinnerSize} />,
    spinnerPlacement,
    startContent,
    endContent,
    isLoading,
    disableRipple,
    getButtonProps,
    getRippleProps,
  } = useButton({
    ...props,
  });

  const { ripples } = getRippleProps();

  return (
    <button ref={domRef} {...getButtonProps()}>
      {startContent}
      {isLoading && spinnerPlacement === "start" && spinner}
      {children}
      {isLoading && spinnerPlacement === "end" && spinner}
      {endContent}
      {!disableRipple && (
        <Ripple
          ripples={ripples}
          onClear={function (key: Key): void {
            throw new Error("Function not implemented.");
          }}
        />
      )}
    </button>
  );
});

MyButton.displayName = "MyButton";

export default MyButton;

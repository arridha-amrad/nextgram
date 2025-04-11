"use client";

import { usePathname } from "next/navigation";
import {
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type State = {
  preview: string[];
  setPreview: Dispatch<SetStateAction<string[]>>;
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  isSubmitting: boolean;
  setIsSubmitting: Dispatch<SetStateAction<boolean>>;
  isSubmitSuccessful: boolean;
  setSubmitSuccessful: Dispatch<SetStateAction<boolean>>;
  newPostFormRef: RefObject<HTMLFormElement | null> | null;
  reset: () => void;
};

const Context = createContext<State>({
  files: [],
  preview: [],
  step: 0,
  setFiles: () => {},
  setPreview: () => {},
  setStep: () => {},
  isSubmitSuccessful: false,
  setSubmitSuccessful: () => {},
  reset: () => {},
  newPostFormRef: null,
  isSubmitting: false,
  setIsSubmitting: () => {},
});

export const CreatePostProvider = ({ children }: { children: ReactNode }) => {
  const [preview, setPreview] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [step, setStep] = useState(0);
  const [isSubmitSuccessful, setSubmitSuccessful] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const reset = () => {
    setPreview([]);
    setFiles([]);
    setStep(0);
    setSubmitSuccessful(false);
  };
  const pathname = usePathname();

  const newPostFormRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    reset();
  }, [pathname]);

  return (
    <Context.Provider
      value={{
        isSubmitting,
        setIsSubmitting,
        newPostFormRef,
        reset,
        files,
        preview,
        step,
        setFiles,
        setPreview,
        setStep,
        isSubmitSuccessful,
        setSubmitSuccessful,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useCreatePost = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("Provider not found");
  }
  return context;
};

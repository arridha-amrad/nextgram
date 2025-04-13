"use client";

import { TSearchUser } from "@/lib/drizzle/queries/users/fetchSearchHistories";
import { page } from "@/lib/pages";
import { usePathname } from "next/navigation";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

type TContext = {
  isSmallSidebar: boolean;
  setSmallSidebar: Dispatch<SetStateAction<boolean>>;
  isNotificationsOpen: boolean;
  setNotificationsOpen: Dispatch<SetStateAction<boolean>>;
  isSearchOpen: boolean;
  setSearchOpen: Dispatch<SetStateAction<boolean>>;
  closeSecondarySidebar: () => void;
  histories: TSearchUser[];
  searchResult: TSearchUser[];
};

const Context = createContext<TContext>({
  isSmallSidebar: false,
  setSmallSidebar: () => {},
  isNotificationsOpen: false,
  setNotificationsOpen: () => {},
  isSearchOpen: false,
  setSearchOpen: () => {},
  closeSecondarySidebar: () => {},
  histories: [],
  searchResult: [],
});

export const SidebarProvider = ({
  children,
  histories,
  searchResult,
}: {
  children: ReactNode;
  histories: TSearchUser[];
  searchResult: TSearchUser[];
}) => {
  const [isSmallSidebar, setSmallSidebar] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [isNotificationsOpen, setNotificationsOpen] = useState(false);

  const pathname = usePathname();

  const closeSecondarySidebar = () => {
    setSearchOpen(false);
    setNotificationsOpen(false);
    if (pathname !== page.inbox) {
      setSmallSidebar(false);
    }
  };

  useEffect(() => {
    setNotificationsOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isSearchOpen || isNotificationsOpen) {
      setSmallSidebar(true);
    }
  }, [isSearchOpen, isNotificationsOpen]);

  useEffect(() => {
    if (!isSearchOpen && !isNotificationsOpen && pathname !== page.inbox) {
      setSmallSidebar(false);
    }
  }, [isSearchOpen, isNotificationsOpen, pathname]);

  return (
    <Context
      value={{
        isSmallSidebar,
        setSmallSidebar,
        isNotificationsOpen,
        setNotificationsOpen,
        isSearchOpen,
        setSearchOpen,
        closeSecondarySidebar,
        histories,
        searchResult,
      }}
    >
      {children}
    </Context>
  );
};

export const useSidebarContext = () => {
  const context = useContext(Context);
  if (!context)
    throw new Error("Component must be wrapped with SidebarProvider");

  return context;
};

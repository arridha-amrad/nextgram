"use client";

import { TSearchUser } from "@/lib/drizzle/queries/users/fetchSearchHistories";
import { TNotification } from "@/lib/drizzle/queries/users/fetchUserNotifications";
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
  notifications: TNotification[];
  markNotificationAsRead: () => void;
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
  notifications: [],
  markNotificationAsRead: () => {},
});

export const SidebarProvider = ({
  children,
  histories,
  searchResult,
  notificationsData,
}: {
  children: ReactNode;
  histories: TSearchUser[];
  searchResult: TSearchUser[];
  notificationsData: TNotification[];
}) => {
  const [isSmallSidebar, setSmallSidebar] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [isNotificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] =
    useState<TNotification[]>(notificationsData);

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

  const markNotificationAsRead = () => {
    setNotifications((notifs) => {
      return notifs.map((n) => ({
        ...n,
        isRead: true,
      }));
    });
  };

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
        notifications,
        markNotificationAsRead,
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

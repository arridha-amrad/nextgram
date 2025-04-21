"use client";

import ChevronIcon from "@/icons/Chevron";
import { cn } from "@/lib/utils";
import {
  autoUpdate,
  FloatingPortal,
  offset,
  shift,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { Button } from "@headlessui/react";
import { AnimatePresence, motion } from "motion/react";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import {
  HTMLAttributes,
  ReactNode,
  useEffect,
  useState,
  useTransition,
} from "react";
import ButtonLink from "./ButtonLink";
import {
  ActivityIcon,
  MoonIcon,
  OptionsFilledIcon,
  OptionsOutlinedIcon,
  ReportProblemIcon,
  SaveIcon,
  SettingsIcon,
  SunIcon,
} from "./Icons";

import LogoutDialog from "@/components/LogoutDialog";
import MySwitch from "@/components/MySwitch";
import { page } from "@/lib/pages";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function Options() {
  const [open, setOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    strategy: "fixed",
    whileElementsMounted: autoUpdate,
    placement: "top-start",
    middleware: [offset(5), shift()],
  });

  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getFloatingProps, getReferenceProps } = useInteractions([
    dismiss,
    role,
  ]);

  const [openTheme, setOpenTheme] = useState(false);
  const { theme } = useTheme();

  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const logout = async () => {
    await signOut({ redirect: false });
    startTransition(async () => {
      await new Promise((res) => setTimeout(res, 1000));
      router.replace(page.login, { scroll: false });
    });
  };

  const t = useTranslations("Sidebar");
  return (
    <>
      <ButtonLink
        ref={refs.setReference}
        {...getReferenceProps()}
        onClick={() => {
          setOpenTheme(false);
          setOpen((val) => !val);
        }}
        activeIcon={<OptionsFilledIcon />}
        icon={<OptionsOutlinedIcon />}
        label={t("more")}
      />

      <AnimatePresence>
        {open && (
          <FloatingPortal>
            <div
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
            >
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
                className={cn(
                  "bg-skin-elevated-separator w-max space-y-2 overflow-hidden rounded-lg p-2 drop-shadow-sm",
                )}
              >
                {openTheme ? (
                  <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 10, opacity: 0 }}
                    className="w-full space-y-4"
                  >
                    <div className="flex h-12 items-center justify-between gap-4 pr-2">
                      <ChevronIcon
                        onClick={() => setOpenTheme(false)}
                        className="size-4"
                      />
                      <h1 className="block">{t("switchAppearance")}</h1>
                      {theme === "dark" ? <MoonIcon /> : <SunIcon />}
                    </div>
                    <div className="flex h-12 justify-between px-2">
                      <h1>{t("darkMode")}</h1>
                      <SwitchTheme />
                    </div>
                  </motion.div>
                ) : (
                  <>
                    <OptionsButton
                      icon={<SettingsIcon />}
                      label={t("settings")}
                    />
                    <OptionsButton
                      icon={<ActivityIcon />}
                      label={t("recentActivity")}
                    />
                    <OptionsButton icon={<SaveIcon />} label={t("bookMark")} />
                    <OptionsButton
                      onClick={() => {
                        setOpenTheme(true);
                      }}
                      icon={theme === "dark" ? <MoonIcon /> : <SunIcon />}
                      label={t("switchAccount")}
                    />
                    <OptionsButton
                      icon={<ReportProblemIcon />}
                      label={t("reportAProblem")}
                    />
                    <hr className="bg-skin-muted/20 my-2 h-px w-full border-0" />
                    <OptionsButton label={t("switchAccount")} />
                    <OptionsButton onClick={logout} label={t("logout")} />
                  </>
                )}
              </motion.div>
            </div>
          </FloatingPortal>
        )}
      </AnimatePresence>
      <LogoutDialog isPending={isPending} />
    </>
  );
}

export function SwitchTheme() {
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    if (isDarkMode) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <MySwitch
      isChecked={theme === "dark"}
      onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
    />
  );
}

const OptionsButton = ({
  icon,
  label,
  ...props
}: {
  label: string;
  icon?: ReactNode;
} & HTMLAttributes<HTMLButtonElement>) => {
  return (
    <Button
      {...props}
      className="hover:bg-foreground/10 flex h-10 w-full cursor-pointer items-center gap-4 rounded-lg p-4"
    >
      {icon}
      {label}
    </Button>
  );
};

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
import { Button, Switch } from "@headlessui/react";
import { AnimatePresence, motion } from "motion/react";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { HTMLAttributes, ReactNode, useState, useTransition } from "react";
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
import { page } from "@/lib/pages";
import { useRouter } from "next/navigation";

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
        label="More"
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
                      <h1 className="block">Switch Appearance</h1>
                      {theme === "dark" ? <MoonIcon /> : <SunIcon />}
                    </div>
                    <div className="flex h-12 justify-between px-2">
                      <h1>Dark Mode</h1>
                      <SwitchTheme />
                    </div>
                  </motion.div>
                ) : (
                  <>
                    <OptionsButton icon={<SettingsIcon />} label="Settings" />
                    <OptionsButton
                      icon={<ActivityIcon />}
                      label="Recent Activity"
                    />
                    <OptionsButton icon={<SaveIcon />} label="Saved" />
                    <OptionsButton
                      onClick={() => {
                        setOpenTheme(true);
                      }}
                      icon={theme === "dark" ? <MoonIcon /> : <SunIcon />}
                      label="Switch Appearance"
                    />
                    <OptionsButton
                      icon={<ReportProblemIcon />}
                      label="Report a Problem"
                    />
                    <hr className="bg-skin-muted/20 my-2 h-px w-full border-0" />
                    <OptionsButton label="Switch Account" />
                    <OptionsButton onClick={logout} label="Logout" />
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

  return (
    <Switch
      checked={theme === "dark"}
      onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="group bg-foreground/10 data-[checked]:bg-foreground data-[focus]:outline-foreground relative flex h-7 w-12 cursor-pointer rounded-full p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1"
    >
      <span
        aria-hidden="true"
        className="bg-background pointer-events-none inline-block size-5 translate-x-0 rounded-full shadow-lg ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
      />
    </Switch>
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

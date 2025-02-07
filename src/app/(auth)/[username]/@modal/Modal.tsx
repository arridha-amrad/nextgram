"use client";

import DialogContentWrapper from "@/components/core/MyDialog";
import { useParams } from "next/navigation";
import { ReactNode, useState } from "react";

type Props = {
  children: ReactNode;
  href: string;
};

export default function Modal({ children, href }: Props) {
  const [open, setOpen] = useState(false);
  const { username } = useParams();
  const path = `/${username}/${href}`;

  return (
    <DialogContentWrapper
      open={open}
      setOpen={setOpen}
      path={path}
      title="Followers"
    >
      {children}
    </DialogContentWrapper>
  );
}

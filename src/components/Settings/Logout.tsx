"use client";

import { useState } from "react";
import Button from "@/components/core/Button";
import { signOut } from "next-auth/react";
import Modal from "@/components/core/ModalWrapper";
import { useRouter } from "next/navigation";
import { page } from "@/lib/pages";

const Logout = () => {
  const [open, setOpen] = useState(false);
  const closeModal = () => {
    setOpen(false);
  };

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const logout = async () => {
    setLoading(true);
    try {
      await signOut({ redirect: false });
      router.replace(`/${page.login}`, { scroll: false });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <fieldset className="flex items-center justify-center" disabled={loading}>
      <button
        onClick={() => setOpen(true)}
        className="cursor-pointer py-3 text-sm"
      >
        Logout
      </button>
      {open && (
        <Modal closeModal={closeModal}>
          <div className="border-skin-border bg-background relative max-w-sm overflow-hidden rounded-md border">
            <section className="border-skin-border border-b p-4">
              <h1 className="text-center text-xl font-semibold">Logout</h1>
            </section>
            <p className="text-skin-muted px-4 py-8 text-center text-sm">
              This action will clear your session. You need to relogin again to
              use this app. Are you sure?
            </p>
            <section className="flex justify-end gap-3 p-4">
              <button
                onClick={closeModal}
                className="border-skin-border rounded-md border px-4 py-2 text-sm"
              >
                Cancel
              </button>
              <Button
                isLoading={loading}
                onClick={logout}
                className="w-32 text-sm"
              >
                Yes, Continue
              </Button>
            </section>
          </div>
        </Modal>
      )}
    </fieldset>
  );
};

export default Logout;

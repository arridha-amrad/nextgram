import { ReactNode } from "react";
import SwitchTheme from "@/components/SwitchTheme";

type Props = {
  children: ReactNode;
};
const Layout = ({ children }: Props) => {
  return (
    <main>
      {children}
      <div className="fixed bottom-4 right-4">
        <SwitchTheme />
      </div>
    </main>
  );
};

export default Layout;

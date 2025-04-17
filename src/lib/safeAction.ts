import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from "next-safe-action";
import { SafeActionError } from "./errors/SafeActionError";
import { getAuth } from "./next.auth";
import { redirect } from "next/navigation";
import { page } from "./pages";

export const actionClient = createSafeActionClient({
  handleServerError(e) {
    if (e instanceof SafeActionError) {
      return e.message;
    }
    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
});

export const authActionClient = actionClient.use(
  async ({ next, bindArgsClientInputs }) => {
    const session = await getAuth();

    const pathname = bindArgsClientInputs[bindArgsClientInputs.length - 1];

    if (!session) {
      if (typeof pathname === "string" && pathname.includes("/")) {
        return redirect(`${page.login}?cb_url=${pathname}`);
      } else {
        return redirect(page.login);
      }
    }

    return next({
      ctx: {
        session,
      },
    });
  },
);

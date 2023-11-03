import Cookies from "js-cookie";

export const switchTheme = () => {
  if (document.documentElement.classList.contains("dark")) {
    document.documentElement.classList.remove("dark");
    Cookies.set("theme", "light", { expires: 365 });
  } else {
    document.documentElement.classList.add("dark");
    Cookies.set("theme", "dark", { expires: 365 });
  }
};

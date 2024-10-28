"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

// 因为只能在客户端使用，所以需要提取出来，并指定在客户端使用
export default function ThemeProvider({
  children,
}: ThemeProviderProps) {
  return <NextThemesProvider
    attribute="class"
    defaultTheme="light"
    disableTransitionOnChange
  >{children}</NextThemesProvider>;
}

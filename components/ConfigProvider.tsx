import {
  ConfigProvider as AntdConfigProvider,
  ConfigProviderProps,
} from "antd";

import { lightTheme, darkTheme } from "@/utils/theme";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import en from "antd/locale/en_US";

export default function ConfigProvider({ children }: ConfigProviderProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [language, setLanguage] = useState(en);
  const router = useRouter();
  const { locale } = router;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    languageImport(locale);
  }, [locale]);

  const languageImport = async (locale?: string) => {
    switch (locale) {
      case "zh-CN":
        return setLanguage((await import("antd/locale/zh_CN")).default);
      case "es":
        return setLanguage((await import("antd/locale/es_ES")).default);
      case "de_DE":
        return setLanguage((await import("antd/locale/de_DE")).default);
      case "fr":
        return setLanguage((await import("antd/locale/fr_FR")).default);
      case "it":
        return setLanguage((await import("antd/locale/it_IT")).default);
      case "nl":
        return setLanguage((await import("antd/locale/nl_NL")).default);
      case "pl":
        return setLanguage((await import("antd/locale/pl_PL")).default);
      case "pt":
        return setLanguage((await import("antd/locale/pt_PT")).default);
      case "sv":
        return setLanguage((await import("antd/locale/sv_SE")).default);
      case "tr":
        return setLanguage((await import("antd/locale/tr_TR")).default);
      case "ru":
        return setLanguage((await import("antd/locale/ru_RU")).default);
      case "ja":
        return setLanguage((await import("antd/locale/ja_JP")).default);
      case "ko":
        return setLanguage((await import("antd/locale/ko_KR")).default);
      default:
        return setLanguage(en);
    }
  };

  const themeConfig = useMemo(() => {
    return theme === "light" ? lightTheme : darkTheme;
  }, [theme]);

  if (!mounted) {
    return (
      <AntdConfigProvider>
        <div className="opacity-0">{children}</div>
      </AntdConfigProvider>
    );
  }

  return (
    <AntdConfigProvider
      locale={language}
      theme={{
        // 启用 css 变量模式
        //   同一组件在不同主题下的样式可以共享，减少了样式体积
        // 切换主题时不再需要重新序列化样式，提升了主题切换的性能
        cssVar: true,
        // 如果你的应用中只存在一个版本的 antd，你可以选择关闭 hash 来进一步减小样式体积
        // hashed: false,
        ...themeConfig,
        // ...darkTheme
      }}
    >
      {children}
    </AntdConfigProvider>
  );
}

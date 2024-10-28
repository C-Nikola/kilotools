import {
  ConfigProvider as AntdConfigProvider,
  ConfigProviderProps,
} from "antd";

import { lightTheme, darkTheme } from "@/utils/theme";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";

export default function ConfigProvider({ children }: ConfigProviderProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

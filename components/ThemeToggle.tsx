import { SunOutlined, MoonOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  }

  return (
    <Button
      onClick={toggleTheme}
      icon={theme === "light" ? <SunOutlined /> : <MoonOutlined />}/>
  );
}

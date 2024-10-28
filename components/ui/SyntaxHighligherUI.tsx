import { useTheme } from "next-themes";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { PrismLight } from "react-syntax-highlighter";
import toml from "react-syntax-highlighter/dist/esm/languages/prism/toml";
// import {
//   atomOneDark,
//   atomOneLight,
// } from "react-syntax-highlighter/dist/esm/styles/hljs";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import CopyButton from "../CopyButton";
import styles from "@/styles/components/SyntaxHighlighter.module.scss";
import { useEffect } from "react";

const dynamicImport = async (languageProp: string) => {
  switch (languageProp) {
    case "toml":
      const toml = (
        await import("react-syntax-highlighter/dist/esm/languages/prism/toml")
      ).default;
      PrismLight.registerLanguage("toml", toml);
      break;
    case "sql":
      const sql = (
        await import("react-syntax-highlighter/dist/esm/languages/prism/sql")
      ).default;
      PrismLight.registerLanguage("sql", sql);
      break;
    case "xml":
      const xml = (
        await import(
          "react-syntax-highlighter/dist/esm/languages/prism/xml-doc"
        )
      ).default;
      PrismLight.registerLanguage("xml", xml);
      break;
    case "yaml":
      const yaml = (
        await import("react-syntax-highlighter/dist/esm/languages/prism/yaml")
      ).default;
      PrismLight.registerLanguage("yaml", yaml);
  }
};

interface SyntaxHighligherProps {
  isError: boolean;
  outputLanguage: string;
  output: string;
}

export default function SyntaxHighlighterUI({
  isError,
  outputLanguage,
  output,
}: SyntaxHighligherProps) {
  const { theme } = useTheme();

  useEffect(() => {
    dynamicImport(outputLanguage);
  }, [outputLanguage]);

  return (
    <OverlayScrollbarsComponent
      element="div"
      defer
      options={{ scrollbars: { autoHide: "scroll" } }}
      style={{
        height: "100%",
      }}
    >
      <PrismLight
        customStyle={{
          background: "transparent",
          textShadow: "none",
        }}
        codeTagProps={{
          style: {
            background: "transparent",
            textShadow: "none",
          },
        }}
        wrapLongLines
        language={isError ? "string" : outputLanguage}
        // style={theme === "light" ? atomOneLight : atomOneDark}
        style={theme === "light" ? oneLight : oneDark}
      >
        {output}
      </PrismLight>
      <CopyButton text={output} buttonClass={styles.copyButton} />
    </OverlayScrollbarsComponent>
  );
}

import ToolPageHeader from "@/components/ToolPageHeader";
import TransformCustom from "@/components/TransformCustom";
import JSONEditorUI from "@/components/ui/JSONEditor";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { useCallback, useState } from "react";
import SyntaxHighlighterUI from "@/components/ui/SyntaxHighligherUI";
import JSON5 from "json5";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import {
  Content,
  isTextContent,
  MenuItem,
  Mode,
  OnChangeStatus,
} from "vanilla-jsoneditor";
import { stringifyTOML } from "confbox";
import { getErrorMsg } from "@/utils/error";

export default function JSONToTOML() {
  const { t } = useTranslation("toolList");

  const [output, setOutput] = useState("");

  const handleChange = (
    content: Content,
    previousContent: Content,
    status: OnChangeStatus
  ) => {
    // Union Types
    if (isTextContent(content) && status.contentErrors === undefined) {
      const value = content.text;
      if (value.trim() === "") {
        setOutput("");
        return;
      }

      try {
        setOutput([stringifyTOML(JSON5.parse(value))].flat().join("\n").trim());
      } catch (err) {
        setOutput(getErrorMsg(err));
      }
    }
  };

  const handleRenderMenu = useCallback((items: MenuItem[]) => {
    return items.slice(4, items.length);
  }, []);
  return (
    <>
      <ToolPageHeader title={t("JSONToTOML.title")} toolName="json-to-toml" />
      <TransformCustom
        inputLabel="JSON"
        outputLable="TOML"
        from={
          <div style={{ height: "calc(100% - 55px)" }}>
            <JSONEditorUI
              onChange={handleChange}
              mode={Mode.text}
              onRenderMenu={handleRenderMenu}
            />
          </div>
        }
        to={
          <OverlayScrollbarsComponent
            element="div"
            defer
            options={{ scrollbars: { autoHide: "scroll" } }}
            style={{
              height: "calc(100% - 55px)",
            }}
          >
            <SyntaxHighlighterUI
              outputLanguage="toml"
              output={output}
              isError={false}
            />
          </OverlayScrollbarsComponent>
        }
      />
    </>
  );
}
export async function getStaticProps({ locale }: Locale) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["toolList"])),
    },
  };
}

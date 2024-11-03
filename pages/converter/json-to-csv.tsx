import ToolPageHeader from "@/components/ToolPageHeader";
import JSONEditorUI from "@/components/ui/JSONEditor";
import { JSONtoCSV } from "@/utils/components/json-to-csv.utils";
import { useCallback, useState } from "react";
import {
  Content,
  isTextContent,
  MenuItem,
  Mode,
  OnChangeStatus,
} from "vanilla-jsoneditor";
import TransformCustom from "@/components/TransformCustom";
import TextAreaCopyable from "@/components/ui/TextAreaCopyable";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export default function JsonToCsv() {
  const { t } = useTranslation("toolList");

  const [output, setOutput] = useState("");

  const handleChange = (
    content: Content,
    previousContent: Content,
    status: OnChangeStatus
  ) => {
    if (isTextContent(content) && status.contentErrors === undefined) {
      const value = content.text;
      if (value.trim() === "") {
        setOutput("");
        return;
      }

      try {
        const json = JSONtoCSV(value.trim());
        setOutput(json);
      } catch (errorMessage: unknown) {
        setOutput(errorMessage as string);
      }
    }
  };

  const handleRenderMenu = useCallback((items: MenuItem[]) => {
    return items.slice(4, items.length);
  }, []);

  return (
    <>
      <ToolPageHeader title={t("JSONToCSV.title")} toolName="json-to-csv" />
      <TransformCustom
        inputLabel="JSON"
        outputLable="CSV"
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
          <TextAreaCopyable
            value={output}
            readOnly
            autoSize={{ minRows: 5 }}
            styles={{
              textarea: {
                borderWidth: 0,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                boxShadow: "none",
                borderColor: "var(--ant-color-border)",
              },
            }}
          />
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

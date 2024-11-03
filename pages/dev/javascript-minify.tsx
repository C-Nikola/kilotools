import ToolPageHeader from "@/components/ToolPageHeader";
import TransformCustom from "@/components/TransformCustom";
import TextAreaCopyable from "@/components/ui/TextAreaCopyable";
import TextAreaUI from "@/components/ui/TextAreaUI";
import { getErrorMsg } from "@/utils/error";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { ChangeEvent, useMemo, useState } from "react";
import { minify_sync } from "terser";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export default function JavascriptMinify() {
  const { t } = useTranslation("toolList");
  const [input, setInput] = useState("");

  const handleChangeInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.currentTarget.value;
    setInput(value);
  };

  const output = useMemo(() => {
    try {
      const result = minify_sync(input);
      return {
        isErr: false,
        result: result.code ?? "",
      };
    } catch (err) {
      return {
        isErr: true,
        result: getErrorMsg(err),
      };
    }
  }, [input]);

  return (
    <>
      <ToolPageHeader
        title={t("javascriptMinify.title")}
        toolName="javascript-minify"
      />
      <TransformCustom
        inputLabel={t("javascriptMinify.from")}
        outputLable={t("javascriptMinify.to")}
        from={
          <OverlayScrollbarsComponent
            element="div"
            defer
            options={{ scrollbars: { autoHide: "scroll" } }}
            style={{
              height: "calc(100% - 55px)",
            }}
          >
            <TextAreaUI
              value={input}
              isErr={output.isErr}
              errMsg={output.result}
              autoSize={{ minRows: 10 }}
              styles={{
                textarea: { border: 0, outline: "none", boxShadow: "none" },
              }}
              placeholder="Enter your code here..."
              onChange={handleChangeInput}
            />
          </OverlayScrollbarsComponent>
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
            <TextAreaCopyable
              value={output.result}
              readOnly
              autoSize={{ minRows: 10 }}
              styles={{
                textarea: { border: 0, outline: "none", boxShadow: "none" },
              }}
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

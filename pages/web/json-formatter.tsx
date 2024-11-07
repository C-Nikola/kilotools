import Full from "@/components/Full";
import ToolPageHeader from "@/components/ToolPageHeader";
import JSONEditorUI from "@/components/ui/JSONEditor";
import { Splitter } from "antd";
import { useCallback, useState } from "react";
import { Content, MenuItem, Mode } from "vanilla-jsoneditor";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { NextSeo } from "next-seo";
import JsonFormatterDesc from "@/components/pageDescription/JsonFormatterDesc";

const { Panel } = Splitter;

export default function JsonFormatter() {
  const { t } = useTranslation("toolList");
  const [input, setInput] = useState<Content>({ json: {} });
  const handleChange = (content: Content) => {
    setInput(content);
  };

  const handleRenderMenu = useCallback((items: MenuItem[]) => {
    return items.slice(4, items.length);
  }, []);

  return (
    <>
      <NextSeo
        title={t("JSONFormatter.title")}
        description={t("JSONFormatter.description")}
      />
      <ToolPageHeader
        title={t("JSONFormatter.title")}
        toolName="json-formatter"
      />
      <Full scrollable>
        <Splitter>
          <Panel>
            <JSONEditorUI
              onChange={handleChange}
              mode={Mode.text}
              onRenderMenu={handleRenderMenu}
            />
          </Panel>
          <Panel>
            <JSONEditorUI
              askToFormat={false}
              mode={Mode.tree}
              content={input}
              readOnly
              onRenderMenu={handleRenderMenu}
            />
          </Panel>
        </Splitter>
      </Full>
      <JsonFormatterDesc />
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

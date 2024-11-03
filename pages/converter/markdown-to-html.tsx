import Full from "@/components/Full";
import ToolPageHeader from "@/components/ToolPageHeader";
import SyntaxHighlighterUI from "@/components/ui/SyntaxHighligherUI";
import { Button, Splitter } from "antd";
import TextArea from "antd/es/input/TextArea";
import Panel from "antd/es/splitter/Panel";
import { ChangeEvent, useState } from "react";
import markdownit from "markdown-it";
import { getErrorMsg } from "@/utils/error";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import Title from "antd/es/typography/Title";
import { PrinterOutlined } from "@ant-design/icons";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export default function MarkdownToHtml() {
  const { t } = useTranslation("toolList");

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isError, setIsError] = useState(false);

  function printHtml() {
    const w = window.open();
    if (w === null) {
      return;
    }
    w.document.body.innerHTML = output;
    w.print();
  }

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.currentTarget.value;
    setInput(value);

    try {
      const md = markdownit();
      setOutput(md.render(value));
      setIsError(false);
    } catch (err) {
      setOutput(getErrorMsg(err));
      setIsError(true);
    }
  };

  return (
    <>
      <ToolPageHeader
        toolName="markdown-to-html"
        title={t("markdownToHTML.title")}
      />
      <Full scrollable>
        <Splitter>
          <Panel>
            <Title
              level={2}
              className="pl-[24px] !mt-2 !mb-2 border-b border-solid border-[var(--ant-color-border)]"
            >
              Markdown
            </Title>
            <OverlayScrollbarsComponent
              element="div"
              defer
              options={{ scrollbars: { autoHide: "scroll" } }}
              style={{
                height: "calc(100% - 55px)",
              }}
            >
              <TextArea
                placeholder="Enter your markdown here..."
                value={input}
                autoSize={{ minRows: 10 }}
                styles={{
                  textarea: { border: 0, outline: "none", boxShadow: "none" },
                }}
                onChange={handleInputChange}
              />
            </OverlayScrollbarsComponent>
          </Panel>
          <Panel>
            <Title
              level={2}
              className="pl-[24px] !mt-2 !mb-2 relative border-b border-solid border-[var(--ant-color-border)]"
            >
              HTML
              <Button
                icon={<PrinterOutlined />}
                className="!absolute right-[10px] top-[3px]"
                onClick={printHtml}
              />
            </Title>
            <div style={{ height: "calc(100% - 55px)" }}>
              <SyntaxHighlighterUI
                output={output}
                isError={isError}
                outputLanguage="html"
              />
            </div>
          </Panel>
        </Splitter>
      </Full>
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

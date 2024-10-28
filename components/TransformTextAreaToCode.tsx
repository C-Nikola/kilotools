import { Card, Space, Splitter, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import { ChangeEventHandler, ReactNode, useCallback } from "react";
import SyntaxHighlighterUI from "./ui/SyntaxHighligherUI";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import JSONEditorUI from "./ui/JSONEditor";
import { MenuItem, Mode } from "vanilla-jsoneditor";
import Panel from "antd/es/splitter/Panel";

const { Title } = Typography;

interface TransformerProps {
  inputLabel: string;
  outputLable: string;
  inputPlaceholder: string;
  outputLanguage: string;
  handleChange: ChangeEventHandler;
  input: string;
  output: string;
  isError: boolean;
  inputValidationRules?: () => [];
  inputDefault?: string;
  children?: ReactNode;
}

export default function TransformTextAreaToCode({
  inputLabel,
  outputLable,
  inputPlaceholder,
  outputLanguage,
  handleChange,
  inputValidationRules,
  inputDefault,
  children,
  input,
  output,
  isError,
}: TransformerProps) {
  const handleRenderMenu = useCallback((items: MenuItem[]) => {
    return items.slice(4, items.length);
  }, []);
  return (
    <Card
      className="w-full"
      style={{ height: "calc(100% - 60px)" }}
      styles={{ body: { padding: 0, height: "100%" } }}
    >
      <Splitter>
        <Panel>
          <Title
            level={2}
            className="pl-[24px] !pt-2 !pb-2 !mb-0 border-b border-solid border-[var(--ant-color-border)]"
          >
            {inputLabel}
          </Title>
          <OverlayScrollbarsComponent
            element="div"
            defer
            options={{ scrollbars: { autoHide: "scroll" } }}
            style={{
              height: "calc(100% - 55px)",
            }}
          >
            {children && <div className="p-2">{children}</div>}
            <TextArea
              autoSize={{ minRows: 20 }}
              onChange={handleChange}
              value={input}
              placeholder={inputPlaceholder}
              styles={{
                textarea: {
                  borderWidth: children ? "1px 0 0 0" : 0,
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
                  boxShadow: "none",
                  borderColor: "var(--ant-color-border)",
                },
              }}
            />
          </OverlayScrollbarsComponent>
        </Panel>
        <Panel>
          <Title
            level={2}
            className="pl-[24px] !pt-2 !pb-2 !mb-0 border-b border-solid border-[var(--ant-color-border)]"
          >
            {outputLable}
          </Title>
          {outputLanguage !== "json" ? (
            <div
              style={{
                height: "calc(100% - 55px)",
              }}
            >
              <SyntaxHighlighterUI
                output={output}
                isError={isError}
                outputLanguage={outputLanguage}
              />
            </div>
          ) : (
            <div style={{ height: "calc(100% - 55px)" }}>
              <JSONEditorUI
                onRenderMenu={handleRenderMenu}
                askToFormat={false}
                mode={Mode.tree}
                content={{ json: output }}
                readOnly
              />
            </div>
          )}
        </Panel>
      </Splitter>
    </Card>
  );
}

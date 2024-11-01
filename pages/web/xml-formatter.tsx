import ToolPageHeader from "@/components/ToolPageHeader";
import TransformTextAreaToCode from "@/components/TransformTextAreaToCode";
import { getErrorMsg } from "@/utils/error";
import { Col, InputNumber, Row, Space, Switch } from "antd";
import { ChangeEvent, useMemo, useState } from "react";
import xmlFormat, { type XMLFormatterOptions } from "xml-formatter";

export default function XMLFormatter() {
  const [rawXML, setRawXML] = useState("");
  const [collapseContent, setCollapseContent] = useState(true);
  const [indentation, setIndentation] = useState<number | null>(2);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.currentTarget.value.trim();
    setRawXML(value);
  };

  const handleChangeCollapseContent = (value: boolean) => {
    setCollapseContent(value);
  };

  const handleChangeIndentation = (value: number | null) => {
    setIndentation(value);
  };

  const output = useMemo(() => {
    if (!rawXML) {
      return {
        isErr: false,
        result: "",
      };
    }
    try {
      const result = xmlFormat(rawXML, {
        indentation: " ".repeat(indentation ?? 0),
        collapseContent: collapseContent,
        lineSeparator: "\n",
      });
      return {
        isErr: false,
        result,
      };
    } catch (err) {
      return {
        isErr: true,
        result: getErrorMsg(err),
      };
    }
  }, [rawXML, collapseContent, indentation]);

  return (
    <>
      <ToolPageHeader title="XML Formatter" toolName="xml-formatter" />
      <TransformTextAreaToCode
        inputLabel="Your XML"
        outputLable="Formatted XML"
        inputPlaceholder="Paste XML here"
        outputLanguage="xml"
        handleChange={handleChange}
        input={rawXML}
        output={output.result}
        isError={output.isErr}
      >
        <Row gutter={8} className="px-4">
          <Col span={12}>
            <Space>
              Collapse content:
              <Switch
                value={collapseContent}
                onChange={handleChangeCollapseContent}
              />
            </Space>
          </Col>
          <Col span={12}>
            <Space>
              Indent size:
              <InputNumber
                value={indentation}
                onChange={handleChangeIndentation}
                min={0}
                placeholder="Please enter a number..."
              />
            </Space>
          </Col>
        </Row>
      </TransformTextAreaToCode>
    </>
  );
}

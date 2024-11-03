import ToolPageHeader from "@/components/ToolPageHeader";
import TransformTextAreaToCode from "@/components/TransformTextAreaToCode";
import { getErrorMsg } from "@/utils/error";
import { Col, InputNumber, Row, Space, Switch } from "antd";
import { ChangeEvent, useMemo, useState } from "react";
import xmlFormat from "xml-formatter";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export default function XMLFormatter() {
  const { t } = useTranslation("toolList");
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
      <ToolPageHeader
        title={t("XMLFormatter.title")}
        toolName="xml-formatter"
      />
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
              <span>{t("XMLFormatter.collapse")}:</span>
              <Switch
                value={collapseContent}
                onChange={handleChangeCollapseContent}
              />
            </Space>
          </Col>
          <Col span={12}>
            <Space>
              <span>{t("XMLFormatter.indent")}:</span>
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
export async function getStaticProps({ locale }: Locale) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["toolList"])),
    },
  };
}

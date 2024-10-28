import ToolPageHeader from "@/components/ToolPageHeader";
import TransformTextAreaToCode from "@/components/TransformTextAreaToCode";
import { getErrorMsg } from "@/utils/error";
import { Col, InputNumber, Row, Space, Switch } from "antd";
import { ChangeEvent, useMemo, useState } from "react";
import yaml from "yaml";

export default function YAMLFormatter() {
  const [rawYaml, setRawYaml] = useState("");
  const [sortKeys, setSortKeys] = useState(false);
  const [indentSize, setIndentSize] = useState<number | null>(2);

  const handleChangeSortKeys = (value: boolean) => {
    setSortKeys(value);
  };

  const handleChangeIndentSize = (value: number | null) => {
    setIndentSize(value);
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.currentTarget.value;
    setRawYaml(value);
  };

  const output = useMemo(() => {
    if (!rawYaml.trim()) {
      return {
        isErr: false,
        result: "",
      };
    }
    try {
      const parsedYaml = yaml.parse(rawYaml);
      const formattedYAML = yaml.stringify(parsedYaml, {
        sortMapEntries: sortKeys,
        indent: indentSize ?? 2,
      });
      return {
        isErr: false,
        result: formattedYAML,
      };
    } catch (err) {
      return {
        isErr: true,
        result: getErrorMsg(err),
      };
    }
  }, [sortKeys, indentSize, rawYaml]);

  return (
    <>
      <ToolPageHeader title="YAML formatter" toolName="yaml-formatter" />
      <TransformTextAreaToCode
        inputLabel="Your YAML"
        outputLable="Formatted YAML"
        inputPlaceholder="Paste YAML here..."
        outputLanguage="yaml"
        handleChange={handleChange}
        input={rawYaml}
        output={output.result}
        isError={output.isErr}
      >
        <Row gutter={8} className="px-4">
          <Col span={12}>
            <Space>
              Sort keys :
              <Switch value={sortKeys} onChange={handleChangeSortKeys} />
            </Space>
          </Col>
          <Col span={12}>
            <Space>
              Indent size :
              <InputNumber
                value={indentSize}
                onChange={handleChangeIndentSize}
                min={1}
                placeholder="Please enter a number..."
              />
            </Space>
          </Col>
        </Row>
      </TransformTextAreaToCode>
    </>
  );
}

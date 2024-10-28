import OneColumn from "@/components/OneColumn";
import ToolPageHeader from "@/components/ToolPageHeader";
import InputCopyable from "@/components/ui/InputCopyable";
import { convertBase } from "@/utils/components/integer-base-converter.utils";
import { getErrorMsg } from "@/utils/error";
import { Col, Divider, Input, InputNumber, Row, Space } from "antd";
import { ChangeEvent, useMemo, useState } from "react";

const inputFlex = "0 1 100px";
const outputFlex = "0 1 150px";
const gutter = 8;

export default function IntegerBaseConverter() {
  const [input, setInput] = useState("");
  const [inputBase, setInputBase] = useState<number>(10);
  const [outputBase, setOuputBase] = useState<number>(42);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setInput(value);
  };

  const handleInputBase = (value: number | null) => {
    value = value ?? 0;
    setInputBase(value);
  };

  const handleOutputBase = (value: number | null) => {
    value = value ?? 0;
    setOuputBase(value);
  };

  const resultList = useMemo(() => {
    const baseList = [2, 8, 10, 16, 64, outputBase];
    return baseList.map((base: number) => {
      try {
        return {
          number: convertBase({
            value: input,
            fromBase: inputBase,
            toBase: base,
          }),
        };
      } catch (err: unknown) {
        return {
          error: getErrorMsg(err),
        };
      }
    });
  }, [input, inputBase, outputBase]);

  return (
    <>
      <ToolPageHeader
        title="Integer base converter"
        toolName="integer-base-converter"
      />
      <OneColumn>
        <Space direction="vertical" className="w-full">
          <Row gutter={gutter}>
            <Col className="text-right" flex={inputFlex}>
              Input number
            </Col>
            <Col flex={1}>
              <Input onChange={handleInput} value={input} />
            </Col>
          </Row>
          <Row gutter={gutter}>
            <Col className="text-right" flex={inputFlex}>
              Input base
            </Col>
            <Col flex={1}>
              <InputNumber
                min={2}
                value={inputBase}
                onChange={handleInputBase}
                className="w-full"
              />
            </Col>
          </Row>

          <Divider />
          <Row gutter={gutter}>
            <Col className="text-right" flex={outputFlex}>
              Binary (2)
            </Col>
            <Col flex={1}>
              <InputCopyable
                status={resultList[0].error ? "error" : ""}
                value={resultList[0].number ?? resultList[0].error}
              />
            </Col>
          </Row>
          <Row gutter={gutter}>
            <Col className="text-right" flex={outputFlex}>
              Octal (8)
            </Col>
            <Col flex={1}>
              <InputCopyable
                status={resultList[1].error ? "error" : ""}
                value={resultList[1].number ?? resultList[1].error}
              />
            </Col>
          </Row>
          <Row gutter={gutter}>
            <Col className="text-right" flex={outputFlex}>
              Decimal (10)
            </Col>
            <Col flex={1}>
              <InputCopyable
                status={resultList[2].error ? "error" : ""}
                value={resultList[2].number ?? resultList[2].error}
              />
            </Col>
          </Row>
          <Row gutter={gutter}>
            <Col className="text-right" flex={outputFlex}>
              Hexadecimal (16):
            </Col>
            <Col flex={1}>
              <InputCopyable
                status={resultList[3].error ? "error" : ""}
                value={resultList[3].number ?? resultList[3].error}
              />
            </Col>
          </Row>
          <Row gutter={gutter}>
            <Col className="text-right" flex={outputFlex}>
              Base64 (64)
            </Col>
            <Col flex={1}>
              <InputCopyable
                status={resultList[4].error ? "error" : ""}
                value={resultList[4].number ?? resultList[4].error}
              />
            </Col>
          </Row>
          <Row gutter={gutter}>
            <Col className="text-right" flex={outputFlex}>
              <InputNumber
                min={2}
                value={outputBase}
                onChange={handleOutputBase}
                addonBefore="Custom:"
              />
            </Col>
            <Col flex={1}>
              <InputCopyable
                status={resultList[5].error ? "error" : ""}
                value={resultList[5].number ?? resultList[5].error}
              />
            </Col>
          </Row>
        </Space>
      </OneColumn>
    </>
  );
}

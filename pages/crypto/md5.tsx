import OneColumn from "@/components/OneColumn";
import ToolPageHeader from "@/components/ToolPageHeader";
import TextAreaUI from "@/components/ui/TextAreaUI";
import { Space, Typography } from "antd";
import { ChangeEvent, useState } from "react";
import { MD5 } from "crypto-js";
import { getErrorMsg } from "@/utils/error";
import TextAreaCopyable from "@/components/ui/TextAreaCopyable";

const { Text } = Typography;

export default function MD5Page() {
  const [input, setInput] = useState("");
  const [output, setOuput] = useState({
    isError: false,
    result: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.currentTarget.value;
    setInput(value);
    try {
      const result = MD5(value);
      setOuput({
        isError: false,
        result: result.toString(),
      });
    } catch (err) {
      setOuput({
        isError: true,
        result: getErrorMsg(err),
      });
    }
  };

  return (
    <>
      <ToolPageHeader title="MD5" toolName="md5" />
      <OneColumn>
        <Space direction="vertical" size="middle" className="w-full">
          <Space direction="vertical" className="w-full">
            <Text strong>Your string</Text>
            <TextAreaUI
              isErr={output.isError}
              errMsg={output.result}
              value={input}
              onChange={handleInputChange}
              autoSize={{ minRows: 5 }}
            />
          </Space>
          <Space direction="vertical" className="w-full">
            <Text strong>Result</Text>
            <TextAreaCopyable
              readOnly
              autoSize={{ minRows: 5 }}
              value={output.result}
            />
          </Space>
        </Space>
      </OneColumn>
    </>
  );
}

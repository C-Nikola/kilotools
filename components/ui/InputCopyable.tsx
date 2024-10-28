import { Input, InputProps, message } from "antd";
import CopyToClipboard from "react-copy-to-clipboard";
import { CopyOutlined } from "@ant-design/icons";

/**
 * 用于输出的可复制的 Input
 * @param props
 * @returns
 */
// TODO: 需要限制value类型为 string
export default function InputCopyable(props: InputProps) {
  const { value = "" } = props;
  const [messageApi, contextHolder] = message.useMessage();

  const handleCopy = (text: string, result: boolean) => {
    if (result) {
      messageApi.success("Copied");
    }
  };
  return (
    <>
      {contextHolder}
      <Input
        {...props}
        addonAfter={
          <CopyToClipboard onCopy={handleCopy} text={value.toString()}>
            <CopyOutlined />
          </CopyToClipboard>
        }
      />
    </>
  );
}

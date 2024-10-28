import { CopyOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import CopyToClipboard from "react-copy-to-clipboard";

interface CopyButtonProps {
  text: string;
  buttonClass?: string;
}

export default function CopyButton({ text, buttonClass }: CopyButtonProps) {
  const [messageApi, contextHolder] = message.useMessage();

  const handleCopy = (text: string, result: boolean) => {
    if (result) {
      messageApi.success("Copied");
    }
  };

  return (
    <>
      {contextHolder}
      <CopyToClipboard onCopy={handleCopy} text={text}>
        <Button className={buttonClass} icon={<CopyOutlined />}></Button>
      </CopyToClipboard>
    </>
  );
}

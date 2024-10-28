import { Input, InputProps } from "antd";
import ErrorMsg from "@/components/ErrorMsg";

/**
 * 用于输入的 Input
 * @param props
 * @returns
 */
export default function InputUI(props: InputProps & { message: string }) {
  const { status } = props;
  const { message } = props;
  return (
    <>
      <Input {...props} />
      {status === "error" && <ErrorMsg errMsg={message} />}
    </>
  );
}

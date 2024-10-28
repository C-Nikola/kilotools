import TextArea, { TextAreaProps } from "antd/es/input/TextArea";
import CopyButton from "../CopyButton";

export default function TextAreaCopyable({
  shortedValue,
  ...props
}: TextAreaProps & { shortedValue?: string }) {
  const { value = "" } = props;

  return (
    <div className="relative">
      <TextArea {...props} value={shortedValue ?? value} />
      <CopyButton
        buttonClass="!absolute top-[10px] right-[10px]"
        text={value.toString()}
      />
    </div>
  );
}

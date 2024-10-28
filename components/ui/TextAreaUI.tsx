import TextArea, { TextAreaProps } from "antd/es/input/TextArea";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import ErrorMsg from "@/components/ErrorMsg";

export default function TextAreaUI({
  isErr,
  errMsg,
  scrollable,
  ...props
}: TextAreaProps & {
  isErr: boolean;
  errMsg: string;
  scrollable?: boolean;
}) {
  return scrollable ? (
    <OverlayScrollbarsComponent
      element="div"
      defer
      options={{ scrollbars: { autoHide: "scroll" } }}
      style={{
        height: "100%",
      }}
    >
      <TextArea status={isErr ? "error" : ""} {...props} />
      {isErr && <ErrorMsg errMsg={errMsg} />}
    </OverlayScrollbarsComponent>
  ) : (
    <>
      <TextArea status={isErr ? "error" : ""} {...props} />
      {isErr && <ErrorMsg errMsg={errMsg} />}
    </>
  );
}

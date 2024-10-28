import Full from "@/components/Full";
import ToolPageHeader from "@/components/ToolPageHeader";
import DiffEditorUI from "@/components/ui/DiffEditorUI";
import { Button, Col, Flex, Row } from "antd";
import DOMPurify from "dompurify";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";

// const DiffEditorUI = dynamic(() => import("@/components/ui/DiffEditorUI"), {
//   ssr: false,
// });

export default function XssDefence() {
  const editorRef = useRef<{
    getOriginalValue: () => string | undefined;
    getModifiedValue: () => string | undefined;
  }>(null);

  const [modifiedValue, setModifiedValue] = useState("");

  const handleRemove = () => {
    const originalValue = editorRef.current?.getOriginalValue();
    originalValue && setModifiedValue(DOMPurify.sanitize(originalValue));
  };

  return (
    <>
      <ToolPageHeader title="Xss defence" toolName="xss-defence" />
      <Full scrollable>
        <Flex className="m-2">
          <Button onClick={handleRemove}>Remove</Button>
        </Flex>
        <div
          style={{
            height: "calc(100% - 48px)",
            borderTop: "1px solid var(--ant-color-border)",
          }}
        >
          <DiffEditorUI ref={editorRef} modified={modifiedValue} />
        </div>
      </Full>
    </>
  );
}

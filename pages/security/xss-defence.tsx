import Full from "@/components/Full";
import ToolPageHeader from "@/components/ToolPageHeader";
import DiffEditorUI from "@/components/ui/DiffEditorUI";
import { Button, Flex } from "antd";
import DOMPurify from "dompurify";
import { useRef, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export default function XssDefence() {
  const { t } = useTranslation("toolList");
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
      <ToolPageHeader title={t("xssDefence.title")} toolName="xss-defence" />
      <Full scrollable>
        <Flex className="m-2">
          <Button onClick={handleRemove}>{t("xssDefence.remove")}</Button>
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
export async function getStaticProps({ locale }: Locale) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["toolList"])),
    },
  };
}

import OneColumn from "@/components/OneColumn";
import ToolPageHeader from "@/components/ToolPageHeader";
import TowColumns from "@/components/TowColumns";
import { Divider, Select, Space, Table, Tag, Typography } from "antd";
import {
  types as extensionToMimeType,
  extensions as mimeTypeToExtension,
} from "mime-types";
import { useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
const { Title, Text } = Typography;

export default function MimeType() {
  const { t } = useTranslation("toolList");
  const [mimeTypeInput, setMimeTypeInput] = useState<string | null>();
  const [extensionOutput, setExtensionOutput] = useState<string[]>([]);

  const [extensionInput, setExtensionInput] = useState<string | null>();
  const [mimeTypeOutput, setMimeTypeOutput] = useState("");

  const handleChangeMimeType = (value: string) => {
    setMimeTypeInput(value);
    setExtensionOutput(value ? mimeTypeToExtension[value] : []);
  };

  const handleChangeExtension = (value: string) => {
    setExtensionInput(value);
    setMimeTypeOutput(value ? extensionToMimeType[value] : "");
  };

  return (
    <>
      <ToolPageHeader title="MIME types" toolName="mime-types" />
      <TowColumns
        children1={
          <Space direction="vertical" className="w-full">
            <Title level={2}>Mime type to extension</Title>
            <Text>
              Know which file extensions are associated to a mime-type
            </Text>
            <Select
              value={mimeTypeInput}
              options={mimeToExtensionsOptions}
              className="w-full"
              placeholder="Select your mimetype here... (ex: application/pdf)"
              onChange={handleChangeMimeType}
              allowClear
            />
            {extensionOutput.length > 0 && (
              <Space size="small" direction="vertical">
                <Text>
                  Extensions of files with the:
                  <Tag color="processing" bordered={false}>
                    {mimeTypeInput}
                  </Tag>
                </Text>
                <Text>
                  mime-type:
                  {extensionOutput.map((extension) => {
                    return (
                      <Tag color="success" bordered={false} key={extension}>
                        {extension}
                      </Tag>
                    );
                  })}
                </Text>
              </Space>
            )}
          </Space>
        }
        children2={
          <Space direction="vertical" className="w-full">
            <Title level={2}> File extension to mime type</Title>
            <Text>Know which mime type is associated to a file extension</Text>
            <Select
              value={extensionInput}
              options={extensionToMimeTypeOptions}
              className="w-full"
              placeholder="Select your mimetype here... (ex: application/pdf)"
              onChange={handleChangeExtension}
              allowClear
            />
            {mimeTypeOutput && (
              <Space size="small" direction="vertical">
                <Text>
                  Mime type associated to the extension:
                  <Tag color="processing" bordered={false}>
                    {extensionInput}
                  </Tag>
                </Text>
                <Text>
                  file extension:
                  <Tag color="success" bordered={false}>
                    {mimeTypeOutput}
                  </Tag>
                </Text>
              </Space>
            )}
          </Space>
        }
      />
      <Divider />
      <OneColumn>
        <Table
          pagination={false}
          columns={tableColums}
          dataSource={mimeInfos}
        />
      </OneColumn>
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

const mimeToExtensionsOptions = Object.keys(mimeTypeToExtension).map(
  (label) => ({ label, value: label })
);

const extensionToMimeTypeOptions = Object.keys(extensionToMimeType).map(
  (label) => {
    const extension = `.${label}`;

    return { label: extension, value: label };
  }
);

const tableColums = [
  {
    title: "MIME types",
    dataIndex: "mimeType",
    key: "mimeType",
  },
  {
    title: "Extensions",
    dataIndex: "extensions",
    key: "extensions",
    render: (extensions: string[]) => {
      return extensions.map((item) => {
        return (
          <Tag color="success" key={item}>
            {item}
          </Tag>
        );
      });
    },
  },
];

const mimeInfos = Object.entries(mimeTypeToExtension).map(
  ([mimeType, extensions]) => ({ key: mimeType, mimeType, extensions })
);

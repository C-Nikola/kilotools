import ToolPageHeader from "@/components/ToolPageHeader";
import TextAreaCopyable from "@/components/ui/TextAreaCopyable";
import { InboxOutlined } from "@ant-design/icons";
import { Card, Col, Divider, Row, Space, Upload } from "antd";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import { useCallback, useState } from "react";

const { Dragger } = Upload;

const MAX_FILE_SIZE = 4 * 1024 * 1024;
type Status = "idle" | "loading" | "error" | "unsupported";

export default function ImageToBase64() {
  const [status, setStatus] = useState<Status>("idle");
  const [base64, setBase64] = useState("");

  const handleFileInputChange = useCallback(
    (e: UploadChangeParam<UploadFile>) => {
      if (e.file.status === "done") {
        const file = e.file.originFileObj ?? null;
        validateImageFile(file);
      }
    },
    []
  );

  const handleRemove = () => {
    setBase64("");
  };

  const validateImageFile = (file: Blob | null) => {
    if (!file || !file.type.startsWith("image/")) {
      setStatus("unsupported");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    const reader = new FileReader();
    reader.onload = () => {
      setBase64(reader.result as string);
      setStatus("idle");
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <ToolPageHeader
        title="Image to base64 converter"
        toolName="csv-to-json"
      />
      <Row className="w-full" gutter={[16, 16]} justify="center">
        <Col flex="0 1 600px">
          <Card className="w-full">
            <h2 className="text-xl font-bold mb-4">String to base64</h2>
            <Space direction="vertical" className="w-full">
              <Dragger
                onRemove={handleRemove}
                maxCount={1}
                onChange={handleFileInputChange}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                {statusComponents[status]}
              </Dragger>
              <Divider />
              <div>
                <h3 className="text-lg font-bold mb-2">Base64 Output</h3>
                <TextAreaCopyable
                  value={base64}
                  shortedValue={base64 ? truncate(base64, 120) : ""}
                  autoSize={{ minRows: 2 }}
                  readOnly
                />
              </div>
              <Divider />
              <div>
                <h3 className="text-lg font-bold mb-2">
                  Use in {"<img>"} tag:
                </h3>
                <TextAreaCopyable
                  shortedValue={
                    base64
                      ? truncate(
                          `<img src="${base64}" alt="Base64 Image" />`,
                          120
                        )
                      : ""
                  }
                  value={
                    base64 ? `<img src="${base64}" alt="Base64 Image" />` : ""
                  }
                  autoSize={{ minRows: 2 }}
                  readOnly
                />
              </div>
              <Divider />
              <div>
                <h3 className="text-lg font-bold mb-2">Use in CSS</h3>
                <TextAreaCopyable
                  shortedValue={
                    base64
                      ? truncate(`background-image: url(${base64});`, 120)
                      : ""
                  }
                  value={base64 ? `background-image: url(${base64});` : ""}
                  autoSize={{ minRows: 2 }}
                  readOnly
                />
              </div>
            </Space>
          </Card>
        </Col>
      </Row>
    </>
  );
}

const StatusComponent = (props: StatusComponentProps) => (
  <div>
    <p>{props.title}</p>
    <p>{props.message || "\u00A0"}</p>
  </div>
);

const statusComponents: Record<Status, JSX.Element> = {
  idle: (
    <StatusComponent
      title="Click or drag file to this area to upload"
      message="Support for a single upload"
    />
  ),
  loading: <StatusComponent title="Converting..." message="" />,
  error: <StatusComponent title="Image is too big!" message="4MB max" />,
  unsupported: (
    <StatusComponent title="Please provide a valid image" message="" />
  ),
};

interface StatusComponentProps {
  title: string;
  message: string;
}

const truncate = (input: string, maxLength: number) => {
  if (input.length <= maxLength) {
    return input;
  }

  return input.substring(0, maxLength) + "...";
};

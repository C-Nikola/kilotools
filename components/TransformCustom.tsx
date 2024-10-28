import { Card, Splitter, Typography } from "antd";
import { ReactNode } from "react";
import Panel from "antd/es/splitter/Panel";

const { Title } = Typography;

interface TransformerProps {
  inputLabel: ReactNode;
  outputLable: ReactNode;
  from: ReactNode;
  to: ReactNode;
  argsChildren?: ReactNode;
}

export default function TransformCustom({
  inputLabel,
  outputLable,
  from,
  to,
  argsChildren,
}: TransformerProps) {
  return (
    <Card
      style={{ height: "calc(100% - 60px)" }}
      styles={{ body: { padding: 0, height: "100%" } }}
    >
      <Splitter>
        <Panel>
          <Title
            level={2}
            className="pl-[24px] !pt-2 !pb-2 !mb-0 border-b border-solid border-[var(--ant-color-border)]"
          >
            {inputLabel}
          </Title>
          {argsChildren && (
            <div className="p-2 border-b border-solid border-[var(--ant-color-border)]">
              {argsChildren}
            </div>
          )}
          {from}
        </Panel>
        <Panel>
          <Title
            level={2}
            className="pl-[24px] !pt-2 !pb-2 !mb-0 border-b border-solid border-[var(--ant-color-border)]"
          >
            {outputLable}
          </Title>
          {to}
        </Panel>
      </Splitter>
    </Card>
  );
}

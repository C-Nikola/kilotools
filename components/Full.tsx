import { Card } from "antd";
import { ReactNode } from "react";

export default function Full({
  children,
  scrollable,
}: {
  children: ReactNode;
  scrollable?: boolean;
}) {
  return (
    <Card
      style={
        scrollable
          ? { height: "calc(100% - 60px)" }
          : { minHeight: "calc(100% - 60px)" }
      }
      styles={{ body: { padding: 0, height: "100%" } }}
    >
      {children}
    </Card>
  );
}

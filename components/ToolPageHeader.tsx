import { IconHeartFilled } from "@tabler/icons-react";
import { Button } from "antd";
import { useEffect, useState } from "react";
import _ from "lodash";
import { Typography } from "antd";
import useLocalStorageListener from "@/hooks/useLocalStorageListener";
import { LOCAL_STORAGE_KEY } from "@/utils/const";

const { Title } = Typography;

export default function ToolPageHeader({
  title,
  toolName,
}: {
  title: string;
  toolName: string;
}) {
  const { value: localFavoriteTools, dispatchStorageListener } =
    useLocalStorageListener<string[]>(
      LOCAL_STORAGE_KEY.FAVORITE_TOOL_NAME,
      "array"
    );

  const [hearted, setHearted] = useState(false);

  const handleChange = () => {
    if (localFavoriteTools?.includes(toolName)) {
      const newValue = localFavoriteTools.filter(
        (tool) => !(tool === toolName)
      );
      // 触发 localStorage 修改事件
      dispatchStorageListener(JSON.stringify(newValue));
    } else {
      dispatchStorageListener(
        JSON.stringify(_.concat(localFavoriteTools, toolName))
      );
    }
  };

  useEffect(() => {
    localFavoriteTools &&
      setHearted(localFavoriteTools?.includes(toolName) as boolean);
  }, [localFavoriteTools, toolName]);

  return (
    <Title level={2} className="text-3xl font-bold mb-4 text-center">
      {title}
      <Button
        onClick={handleChange}
        className="ml-4"
        icon={
          <IconHeartFilled
            color={
              hearted
                ? "var(--ant-color-primary)"
                : "var(--ant-color-text-disabled)"
            }
            size={18}
          />
        }
      ></Button>
    </Title>
  );
}

import { HeartTwoTone } from "@ant-design/icons";
import { Typography } from "antd";
import OneColumn from "../OneColumn";
import { COLOR } from "@/utils/const";
import { TFunction } from "i18next";
import { withTranslation } from "next-i18next";

const { Paragraph } = Typography;

export function ImageToBase64Desc({ t }: { t: TFunction }) {
  return (
    <OneColumn>
      <Paragraph className="text-base" type="secondary">
        {t("imageToBase64Converter.description")}
      </Paragraph>
      <Paragraph className="text-base" type="secondary">
        Built with <HeartTwoTone twoToneColor={COLOR.HEART_TWO_TONE_COLOR} />
      </Paragraph>
    </OneColumn>
  );
}
export default withTranslation("toolList")(ImageToBase64Desc);

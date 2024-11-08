import { HeartTwoTone } from "@ant-design/icons";
import { Typography } from "antd";
import OneColumn from "../OneColumn";
import { COLOR } from "@/utils/const";
import Link from "next/link";
import { TFunction } from "i18next";
import { withTranslation } from "next-i18next";

const { Paragraph } = Typography;

export function SHA1PageDesc({ t }: { t: TFunction }) {
  return (
    <OneColumn>
      <Paragraph className="text-base" type="secondary">
        {t("SHA.description")}
      </Paragraph>
      <Paragraph className="text-base" type="secondary">
        Built with <HeartTwoTone twoToneColor={COLOR.HEART_TWO_TONE_COLOR} />,
        using the open-source package{" "}
        <Link href="https://github.com/brix/crypto-js" target="_blank">
          crypto-js
        </Link>
        .
      </Paragraph>
    </OneColumn>
  );
}
export default withTranslation("toolList")(SHA1PageDesc);

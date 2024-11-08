import { HeartTwoTone } from "@ant-design/icons";
import { Typography } from "antd";
import OneColumn from "../OneColumn";
import { COLOR } from "@/utils/const";
import Link from "next/link";
import { TFunction } from "i18next";
import { withTranslation } from "next-i18next";

const { Paragraph } = Typography;

export function MACAddressLookupDesc({ t }: { t: TFunction }) {
  return (
    <OneColumn>
      <Paragraph className="text-base" type="secondary">
        {t("MACAddressLookup.description")}
      </Paragraph>
      <Paragraph className="text-base" type="secondary">
        Built with <HeartTwoTone twoToneColor={COLOR.HEART_TWO_TONE_COLOR} />,
        using the open-source package{" "}
        <Link href="https://github.com/silverwind/oui-data" target="_blank">
          oui-data
        </Link>
        .
      </Paragraph>
    </OneColumn>
  );
}
export default withTranslation("toolList")(MACAddressLookupDesc);

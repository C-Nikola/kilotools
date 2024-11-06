import OneColumnWithCard from "@/components/OneColumnWithCard";
import ToolPageHeader from "@/components/ToolPageHeader";
import InputUI from "@/components/ui/InputUI";
import TextAreaCopyable from "@/components/ui/TextAreaCopyable";
import { Space } from "antd";
import { ChangeEvent, useState } from "react";
import db from "oui-data";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { NextSeo } from "next-seo";

export default function MACAddressLookup() {
  const { t } = useTranslation("toolList");
  const [macAddress, setMacAddress] = useState("");
  const [output, setOutput] = useState({
    isErr: false,
    result: "",
  });

  const handleMacAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setMacAddress(value);
    if (!value.trim().match(/^([0-9A-Fa-f]{2}[:-]){2,5}([0-9A-Fa-f]{2})$/)) {
      setOutput({
        isErr: true,
        result: "Invalid MAC address",
      });
      return;
    }

    setOutput({
      isErr: false,
      result: (db as Record<string, string>)[getVendorValue(value)],
    });
  };

  return (
    <>
      <NextSeo
        title={t("MACAddressLookup.title")}
        description={t("MACAddressLookup.description")}
      />
      <ToolPageHeader
        title={t("MACAddressLookup.title")}
        toolName="mac-address-lookup"
      />
      <OneColumnWithCard>
        <Space direction="vertical" size="middle" className="w-full">
          <Space direction="vertical" className="w-full">
            {t("MACAddressLookup.mac_address")}
            <InputUI
              allowClear
              value={macAddress}
              onChange={handleMacAddressChange}
              status={output.isErr ? "error" : ""}
              message={output.result}
              placeholder="Enter your MAC address..."
            />
          </Space>
          <Space direction="vertical" className="w-full">
            {t("MACAddressLookup.vendor_info")}
            <TextAreaCopyable
              readOnly
              autoSize={{ minRows: 5 }}
              value={output.result}
              placeholder="Unknown vendor for this address"
            />
          </Space>
        </Space>
      </OneColumnWithCard>
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

const getVendorValue = (address: string) =>
  address.trim().replace(/[.:-]/g, "").toUpperCase().substring(0, 6);

import ToolPageHeader from "@/components/ToolPageHeader";
import TransformTextAreaToCode from "@/components/TransformTextAreaToCode";
import { getErrorMsg } from "@/utils/error";
import { Col, Row, Select, Space } from "antd";
import { ChangeEvent, useMemo, useState } from "react";
import {
  type FormatOptionsWithLanguage,
  format as formatSQL,
  IndentStyle,
  KeywordCase,
  SqlLanguage,
} from "sql-formatter";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export default function SQLFormatter() {
  const { t } = useTranslation("toolList");
  const [rawSQL, setRawSQL] = useState("");
  const [config, setConfig] = useState<FormatOptionsWithLanguage>({
    keywordCase: "upper",
    useTabs: false,
    language: "sql",
    indentStyle: "standard",
  });

  const handleChangeRawSQL = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.currentTarget.value;
    setRawSQL(value);
  };

  const handleChangeLanguage = (value: SqlLanguage) => {
    setConfig({
      ...config,
      language: value,
    });
  };

  const handleChangeIndentStyle = (value: IndentStyle) => {
    setConfig({
      ...config,
      indentStyle: value,
    });
  };

  const handleChangeKeywordCase = (value: KeywordCase) => {
    setConfig({
      ...config,
      keywordCase: value,
    });
  };

  const output = useMemo(() => {
    try {
      const result = formatSQL(rawSQL, config);
      return {
        isErr: false,
        result,
      };
    } catch (err) {
      return {
        isErr: true,
        result: getErrorMsg(err),
      };
    }
  }, [config, rawSQL]);

  return (
    <>
      <ToolPageHeader
        title={t("SQLFormatter.title")}
        toolName="sql-formatter"
      />
      <TransformTextAreaToCode
        input={rawSQL}
        inputLabel={t("SQLFormatter.from")}
        outputLable={t("SQLFormatter.to")}
        outputLanguage="sql"
        output={output.result}
        inputPlaceholder="Paste your SQL query here..."
        handleChange={handleChangeRawSQL}
        isError={output.isErr}
      >
        <Row gutter={8} className="px-4">
          <Col span={8}>
            <Space direction="vertical" className="w-full">
              {t("SQLFormatter.dialect")}
              <Select
                className="w-full"
                value={config.language}
                onChange={handleChangeLanguage}
                options={[
                  { label: "GCP BigQuery", value: "bigquery" },
                  { label: "IBM DB2", value: "db2" },
                  { label: "Apache Hive", value: "hive" },
                  { label: "MariaDB", value: "mariadb" },
                  { label: "MySQL", value: "mysql" },
                  { label: "Couchbase N1QL", value: "n1ql" },
                  { label: "Oracle PL/SQL", value: "plsql" },
                  { label: "PostgreSQL", value: "postgresql" },
                  { label: "Amazon Redshift", value: "redshift" },
                  { label: "Spark", value: "spark" },
                  { label: "Standard SQL", value: "sql" },
                  { label: "sqlite", value: "sqlite" },
                  { label: "SQL Server Transact-SQL", value: "tsql" },
                ]}
              />
            </Space>
          </Col>
          <Col span={8}>
            <Space direction="vertical" className="w-full">
              {t("SQLFormatter.keyword_case")}
              <Select
                className="w-full"
                onChange={handleChangeKeywordCase}
                value={config.keywordCase}
                options={[
                  { label: "UPPERCASE", value: "upper" },
                  { label: "lowercase", value: "lower" },
                  { label: "Preserve", value: "preserve" },
                ]}
              />
            </Space>
          </Col>
          <Col span={8}>
            <Space direction="vertical" className="w-full">
              {t("SQLFormatter.indent_style")}
              <Select
                className="w-full"
                onChange={handleChangeIndentStyle}
                value={config.indentStyle}
                options={[
                  { label: "Standard", value: "standard" },
                  { label: "Tabular left", value: "tabularLeft" },
                  { label: "Tabular right", value: "tabularRight" },
                ]}
              />
            </Space>
          </Col>
        </Row>
      </TransformTextAreaToCode>
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

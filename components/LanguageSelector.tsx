import { Select } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const options = [
  {
    label: "English",
    value: "en",
  },
  {
    label: "简体中文",
    value: "zh-CN",
  },
];

export default function LanguageSelector() {
  const router = useRouter();
  const { pathname, asPath, query, locale } = router;
  const [language, setLanguage] = useState(locale);

  const handleChange = (value: string) => {
    setLanguage(value);
    document.cookie = `NEXT_LOCALE=${value}; max-age=31536000; path=/`;
    router.push({ pathname, query }, asPath, { locale: value });
  };

  return <Select value={language} onChange={handleChange} options={options} />;
}

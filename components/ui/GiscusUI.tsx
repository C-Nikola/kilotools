import Giscus from "@giscus/react";
import { useTheme } from "next-themes";

export default function GiscusUI() {
  const { theme } = useTheme();
  return (
    <div className="pt-16">
      <Giscus
        repo="C-Nikola/kilotools"
        repoId="R_kgDONGxPpA"
        category="Announcements"
        categoryId="DIC_kwDONGxPpM4Cj_l2"
        mapping="title"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={theme}
        lang="en"
      />
    </div>
  );
}

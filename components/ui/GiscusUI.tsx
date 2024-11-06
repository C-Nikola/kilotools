import Giscus from "@giscus/react";
import { useTheme } from "next-themes";

export default function GiscusUI({ path }: { path: string }) {
  const { theme } = useTheme();
  return (
    <div id="comment">
      <Giscus
        repo="C-Nikola/kilotools"
        repoId="R_kgDONLENMg"
        category="Announcements"
        categoryId="DIC_kwDONLENMs4CkA86"
        term={path}
        mapping="specific"
        strict="1"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={theme}
        lang="en"
        loading="lazy"
      />
    </div>
  );
}

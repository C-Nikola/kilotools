import Giscus from "@giscus/react";

export default function GiscusUI() {
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
        theme="preferred_color_scheme"
        lang="en"
      />
    </div>
  );
}

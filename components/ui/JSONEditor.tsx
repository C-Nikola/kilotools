import {
  Content,
  JSONEditor,
  JSONEditorPropsOptional,
} from "vanilla-jsoneditor";
import { useEffect, useRef } from "react";

export default function JSONEditorUI(props: JSONEditorPropsOptional) {
  const refContainer = useRef(null);
  //   Usage note: if you need the result of useRef to be directly mutable, include | null in the type of the generic argument.
  // TODO: cloudflare 报错Type error: 'JSONEditor' refers to a value, but is being used as a type here. Did you mean 'typeof JSONEditor'?
  /* @ts-ignore */
  const refEditor = useRef<JSONEditor | null>(null);

  useEffect(() => {
    // create editor
    /* @ts-ignore */
    const editor = new JSONEditor({
      target: refContainer.current!,
      props,
    });

    refEditor.current = editor;

    return () => {
      // destroy editor
      if (refEditor.current) {
        refEditor.current.destroy();
        refEditor.current = null;
      }
    };
  }, []);

  // update props
  useEffect(() => {
    if (props.content && refEditor.current) {
      refEditor.current.set(props.content as Content);
    }
  }, [props.content]);

  return <div className="h-full" ref={refContainer}></div>;
}

import CodeMirror from '@uiw/react-codemirror';
import { memo } from 'react';

import { type CodeMirrorEditorSetupProps, useCodeMirrorSetup } from '@grafana/ui/internal';

export const CoreCodeMirrorEditorImplementation = memo(function CoreCodeMirrorEditorImplementation(
  props: CodeMirrorEditorSetupProps
) {
  const { ref, props: editorProps, languageAlert } = useCodeMirrorSetup(props);

  return (
    <>
      {languageAlert}
      <CodeMirror ref={ref} {...editorProps} />
    </>
  );
});

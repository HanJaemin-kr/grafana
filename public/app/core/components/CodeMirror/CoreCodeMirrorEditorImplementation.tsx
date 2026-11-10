import CodeMirror from '@uiw/react-codemirror';
import { memo } from 'react';

import { type CodeMirrorEditorSetupProps, type CodeMirrorSetup } from '@grafana/ui/internal';

/**
 * Takes the hook from `loadCodeMirrorSetup` because `@grafana/ui/internal`
 * exports it only lazily.
 */
export function createCoreCodeMirrorEditor(useCodeMirrorSetup: (props: CodeMirrorEditorSetupProps) => CodeMirrorSetup) {
  return memo(function CoreCodeMirrorEditorImplementation(props: CodeMirrorEditorSetupProps) {
    const { ref, props: editorProps, languageAlert } = useCodeMirrorSetup(props);

    return (
      <>
        {languageAlert}
        <CodeMirror ref={ref} {...editorProps} />
      </>
    );
  });
}

import { lazy, type ReactNode, Suspense } from 'react';

import { t } from '@grafana/i18n';
import { ErrorBoundaryAlert, LoadingPlaceholder } from '@grafana/ui';
import { type CodeMirrorEditorSetupProps } from '@grafana/ui/internal';

export interface CoreCodeMirrorEditorProps extends CodeMirrorEditorSetupProps {
  /** Rendered while the editor bundle loads. */
  loadingFallback?: ReactNode;
}

const Editor = lazy(() =>
  import(/* webpackChunkName: "core-codemirror-editor" */ './CoreCodeMirrorEditorImplementation').then((module) => ({
    default: module.CoreCodeMirrorEditorImplementation,
  }))
);

/**
 * Grafana's CodeMirror editor plus raw CodeMirror extensions and theme extensions,
 * for core features that need behavior `CodeMirrorEditor` has no prop for. Plugins
 * use `CodeMirrorEditor` from `@grafana/ui`, because extensions built with a
 * plugin's own copy of CodeMirror don't work in Grafana's editor.
 */
export function CoreCodeMirrorEditor({ loadingFallback, ...props }: CoreCodeMirrorEditorProps) {
  return (
    <ErrorBoundaryAlert
      boundaryName="CoreCodeMirrorEditor"
      title={t('code-mirror-editor.error-title', 'Code editor failed to load')}
      style="page"
    >
      <Suspense
        fallback={loadingFallback ?? <LoadingPlaceholder text={t('code-mirror-editor.loading', 'Loading editor')} />}
      >
        <Editor {...props} />
      </Suspense>
    </ErrorBoundaryAlert>
  );
}

// Plugins load the complete @grafana/ui namespace, and eagerly loaded core code
// imports @grafana/ui/internal, so neither may load CodeMirror before an editor
// renders. Jest doesn't tree-shake, so a static import anywhere in either entry
// point's module graph shows up here.
const CODEMIRROR_MODULES = ['@codemirror/state', '@codemirror/view'];

function trackCodeMirrorLoads(loaded: string[]) {
  for (const name of CODEMIRROR_MODULES) {
    jest.doMock(name, () => {
      loaded.push(name);
      return jest.requireActual(name);
    });
  }
}

describe('CodeMirror loading from package entry points', () => {
  it('exports QueryInput from @grafana/ui without loading CodeMirror', async () => {
    const loaded: string[] = [];

    await jest.isolateModulesAsync(async () => {
      trackCodeMirrorLoads(loaded);
      const ui = await import('../../index');
      expect(ui).toHaveProperty('QueryInput');
    });

    expect(loaded).toEqual([]);
  });

  it('loads CodeMirror from @grafana/ui/internal only when the editor setup is requested', async () => {
    const loaded: string[] = [];

    await jest.isolateModulesAsync(async () => {
      trackCodeMirrorLoads(loaded);
      const internal = await import('../../internal');
      expect(loaded).toEqual([]);

      const useCodeMirrorSetup = await internal.loadCodeMirrorSetup();
      expect(useCodeMirrorSetup).toEqual(expect.any(Function));
    });

    expect(loaded).toEqual(expect.arrayContaining(CODEMIRROR_MODULES));
  });
});

import * as React from "react";
import { Button } from "./components/Button";
import { Editor, DEFAULT_EDITOR_DATA } from "./components/editor/Editor";

function App() {
  const [readOnly, setReadOnly] = React.useState(false);

  return (
    <div className="p-10">
      <div className="mb-10">
        <Button onClick={() => setReadOnly((v) => !v)}>Toggle isReadonly</Button>
        <p className="mt-2">Is Readonly: {String(readOnly)}</p>
      </div>

      <Editor isReadonly={readOnly} value={DEFAULT_EDITOR_DATA} />
    </div>
  );
}

export default App;

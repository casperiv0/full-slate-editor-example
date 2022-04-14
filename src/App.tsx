import { Editor, DEFAULT_EDITOR_DATA } from "./components/editor/Editor";

function App() {
  return (
    <div className="p-10">
      <Editor value={DEFAULT_EDITOR_DATA} />
    </div>
  );
}

export default App;

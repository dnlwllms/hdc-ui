import { IconButton } from "./components/ui/icon-button";

function App() {
  return (
    <>
      <IconButton icon="Plus" size="xs" />
      <IconButton icon="Plus" size="sm" disabled />
      <IconButton icon="Plus" size="md" disabled />
    </>
  );
}

export default App;

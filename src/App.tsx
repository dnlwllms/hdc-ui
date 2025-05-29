import { TextButton } from "@/lib/components/ui/text-button";

function App() {
  return (
    <>
      <div className="flex">
        <TextButton size="lg" icon="ChevronLeft" position="reverse-row">
          TextButton
        </TextButton>
        <TextButton
          size="lg"
          icon="ChevronLeft"
          position="reverse-row"
          color="gray"
        >
          TextButton
        </TextButton>
      </div>
      <div className="flex">
        <TextButton
          size="lg"
          icon="ChevronLeft"
          position="reverse-row"
          disabled
        >
          TextButton
        </TextButton>
        <TextButton
          size="lg"
          icon="ChevronLeft"
          position="reverse-row"
          color="gray"
          disabled
        >
          TextButton
        </TextButton>
      </div>
      <div className="flex">
        <TextButton size="lg" icon="ChevronLeft" position="reverse-row">
          TextButton
        </TextButton>
        <TextButton
          size="lg"
          icon="ChevronLeft"
          position="reverse-row"
          color="gray"
        >
          TextButton
        </TextButton>
      </div>
    </>
  );
}

export default App;

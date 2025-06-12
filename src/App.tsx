import { useState } from "react";

import Slider from "./lib/components/ui/slider";

function App() {
  const [range, setRange] = useState<[number, number]>([10, 90]);
  return (
    <>
      <div className="flex justify-center items-center size-180 m-10 bg-gray-300">
        <Slider
          value={range}
          onChange={setRange}
          hasLabel
          labels={["10", "90"]}
        />
      </div>
    </>
  );
}

export default App;

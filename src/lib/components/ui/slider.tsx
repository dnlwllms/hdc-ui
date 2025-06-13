import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// 타입 정의도 한 파일에 포함
export interface SliderProps {
  value?: [number, number];
  min?: number;
  max?: number;
  step?: number;
  names?: [string, string];
  onChange?: (value: [number, number]) => void;
  isDisabled?: boolean;
  hasLabel?: boolean;
  labels?: [string, string];
}

type PointPosition = "left" | "right";

function Slider({
  min = 0,
  max = 100,
  step = 1,
  names,
  value = [min, max],
  onChange,
  isDisabled,
  labels,
  hasLabel,
}: SliderProps) {
  const [clickedPoint, setClickedPoint] = useState<PointPosition | null>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [minValue, maxValue] = value;

  const total = useMemo(
    () => (isDisabled ? 0 : max - min),
    [min, max, isDisabled]
  );
  const minRate = useMemo(
    () => (isDisabled ? 0 : ((minValue - min) / total) * 100),
    [minValue, min, total, isDisabled]
  );

  const maxRate = useMemo(
    () => (isDisabled ? 0 : ((max - maxValue) / total) * 100),
    [maxValue, max, total, isDisabled]
  );

  const error = useMemo(() => {
    if (min > max) return "max값이 min값 보다 작아야 합니다.";
    if (max - min < step) return "step 값이 초과 되었습니다.";
    return undefined;
  }, [min, max, step]);

  const updateValue = useCallback(
    (newVal: number) => {
      if (!onChange) return;
      const rounded = Math.round((newVal - min) / step) * step + min;

      if (
        clickedPoint === "left" &&
        rounded !== value[0] &&
        rounded <= value[1]
      ) {
        onChange([Math.min(rounded, value[1]), value[1]]);
      } else if (
        clickedPoint === "right" &&
        rounded !== value[1] &&
        rounded >= value[0]
      ) {
        onChange([value[0], Math.max(rounded, value[0])]);
      }
    },
    [clickedPoint, onChange, value, min, step]
  );

  const handlePointerMove = useCallback(
    (e: MouseEvent) => {
      if (!barRef.current || !clickedPoint) return;

      const { left, width } = barRef.current.getBoundingClientRect();
      const percent = Math.min(Math.max((e.clientX - left) / width, 0), 1);
      const newValue = min + percent * total;
      updateValue(newValue);
    },
    [clickedPoint, min, total, updateValue]
  );

  useEffect(() => {
    if (!clickedPoint || isDisabled) return;

    const up = () => setClickedPoint(null);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", up);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", up);
    };
  }, [clickedPoint, handlePointerMove, isDisabled]);

  const renderRangeInput = (side: "left" | "right", val: number) => (
    <input
      type="range"
      hidden
      name={names?.[side === "left" ? 0 : 1]}
      value={val}
      min={min}
      max={max}
      step={step}
      onChange={(e) => {
        const num = Number(e.target.value);
        if (side === "left") {
          onChange?.([num, value[1]]);
        } else {
          onChange?.([value[0], num]);
        }
      }}
    />
  );

  return (
    <div className="select-none">
      {error ? (
        <div className="text-red-500 text-sm">{error}</div>
      ) : (
        <>
          {renderRangeInput("left", value[0])}
          {renderRangeInput("right", value[1])}

          <div
            ref={barRef}
            className="relative w-full min-w-[300px] h-1 bg-gray-200"
          >
            {!isDisabled && (
              <div
                className="absolute top-0 bottom-0 h-full bg-gray-800 transition-all duration-100"
                style={{ left: `${minRate}%`, right: `${maxRate}%` }}
              >
                <div
                  className="absolute top-1/2 -left-2 w-6 h-6 -translate-y-1/2 rounded-full bg-white shadow cursor-pointer"
                  onPointerDown={() => setClickedPoint("left")}
                />
                <div
                  className="absolute top-1/2 -right-2 w-6 h-6 -translate-y-1/2 rounded-full bg-white shadow cursor-pointer"
                  onPointerDown={() => setClickedPoint("right")}
                />
              </div>
            )}
          </div>

          {hasLabel && (
            <div
              className={`w-full flex justify-between mt-2 text-sm ${
                isDisabled ? "text-gray-400" : "text-gray-900"
              }`}
            >
              <span>{labels?.[0] ?? min.toLocaleString()}</span>
              <span>{labels?.[1] ?? max.toLocaleString()}</span>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Slider;

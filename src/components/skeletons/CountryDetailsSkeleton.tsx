import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Types
import { CountrySkeletonProps } from "./CountrySkeleton";

const CountryDetailsSkeleton = ({ isDarkMode }: CountrySkeletonProps) => {
  const baseColor = isDarkMode ? "hsl(207, 26%, 19%)" : "#e0e0e0";
  const highlightColor = isDarkMode ? "hsl(209, 23%, 22%)" : "#f0f0f0";

  return (
    <div className="rounded border border-slate-200 p-4">
      <Skeleton
        className="block w-full max-w-[300px]"
        height={200}
        baseColor={baseColor}
        highlightColor={highlightColor}
      />
      <div className="space-y-6">
        <Skeleton
          height={30}
          width={200}
          style={{ marginTop: "1rem" }}
          baseColor={baseColor}
          highlightColor={highlightColor}
        />
        <Skeleton
          count={3}
          width={250}
          height={20}
          style={{ marginTop: "0.5rem" }}
          baseColor={baseColor}
          highlightColor={highlightColor}
        />
        <Skeleton
          count={3}
          width={250}
          height={20}
          style={{ marginTop: "0.5rem" }}
          baseColor={baseColor}
          highlightColor={highlightColor}
        />
      </div>
    </div>
  );
};

export default CountryDetailsSkeleton;

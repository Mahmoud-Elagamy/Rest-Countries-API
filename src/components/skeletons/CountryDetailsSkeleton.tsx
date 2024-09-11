import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Types
import { CountrySkeletonProps } from "./CountrySkeleton";

const CountryDetailsSkeleton = ({ isDarkMode }: CountrySkeletonProps) => {
  const baseColor = isDarkMode ? "hsl(207, 26%, 19%)" : "#e0e0e0";
  const highlightColor = isDarkMode ? "hsl(209, 23%, 22%)" : "#f0f0f0";

  return (
    <div className="flex flex-wrap items-center justify-center rounded-md border border-slate-200 p-4 lg:justify-between">
      <Skeleton
        className="block w-[240px] text-center"
        height={250}
        width={240}
        baseColor={baseColor}
        highlightColor={highlightColor}
      />
      <div className="flex flex-col items-center gap-6 md:items-start">
        <Skeleton
          height={30}
          width={200}
          style={{ marginTop: "1rem" }}
          baseColor={baseColor}
          highlightColor={highlightColor}
        />
        <div className="flex flex-wrap justify-center gap-10">
          <Skeleton
            count={3}
            width={innerWidth > 768 ? 250 : 220}
            height={20}
            style={{ marginTop: "0.5rem" }}
            baseColor={baseColor}
            highlightColor={highlightColor}
          />
          <Skeleton
            count={3}
            width={innerWidth > 768 ? 250 : 220}
            height={20}
            style={{ marginTop: "0.5rem" }}
            baseColor={baseColor}
            highlightColor={highlightColor}
          />
        </div>
        <Skeleton
          width={innerWidth > 768 ? 300 : 235}
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

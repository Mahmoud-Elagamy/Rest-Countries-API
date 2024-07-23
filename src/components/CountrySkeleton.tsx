import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type CountrySkeletonProps = {
  isDarkMode: boolean;
};

const CountrySkeleton = ({ isDarkMode }: CountrySkeletonProps) => {
  const baseColor = isDarkMode ? "hsl(207, 26%, 19%)" : "#e0e0e0";
  const highlightColor = isDarkMode ? "hsl(209, 23%, 22%)" : "#f0f0f0";

  return (
    <div
      style={{
        padding: "1rem",
        border: "1px solid #ccc",
        borderRadius: "4px",
        margin: "1rem auto",
        maxWidth: "250px",
      }}
    >
      <Skeleton
        className="block mx-auto w-full"
        height={160}
        baseColor={baseColor}
        highlightColor={highlightColor}
      />
      <Skeleton
        height={30}
        width={200}
        style={{ marginTop: "1rem" }}
        baseColor={baseColor}
        highlightColor={highlightColor}
      />
      <Skeleton
        count={3}
        height={20}
        style={{ marginTop: "0.5rem" }}
        baseColor={baseColor}
        highlightColor={highlightColor}
      />
    </div>
  );
};

export default CountrySkeleton;

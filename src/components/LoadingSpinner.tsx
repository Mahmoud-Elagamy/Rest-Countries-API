function ThreeDotSpinner() {
  return (
    <div className="flex justify-center space-x-2">
      <div className="size-2 animate-pulse rounded-full bg-blue-500"></div>
      <div className="size-2 animate-pulse rounded-full bg-blue-500 delay-100"></div>
      <div className="size-2 animate-pulse rounded-full bg-blue-500 delay-200"></div>
    </div>
  );
}

export default ThreeDotSpinner;

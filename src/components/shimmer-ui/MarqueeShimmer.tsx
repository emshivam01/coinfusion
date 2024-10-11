const MarqueeShimmer = () => {
  const arr1 = Array.from({ length: 10 }, (_, i) => i + 1);
  const arr2 = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div>
      <div className="relative flex h-[250px] md:h-[250px] w-full flex-col gap-4 items-center justify-center overflow-hidden rounded-lg bg-background dark:bg-[#171f2e] mt-24 ">
        <div className="[--duration:200s] w-full pl-28 flex gap-4 animate-pulse ">
          {arr1.map((index) => (
            <Block key={index} />
          ))}
        </div>
        <div className="[--duration:200s] w-full pr-28 flex gap-4 animate-pulse">
          {arr2.map((index) => (
            <Block key={index} />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-[#171f2e] "></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-[#171f2e] "></div>
      </div>
    </div>
  );
};

export default MarqueeShimmer;

const Block = () => {
  return <div className=" w-40 h-14 bg-gray-400 rounded-md"></div>;
};

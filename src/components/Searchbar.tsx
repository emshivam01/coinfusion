const Searchbar = () => {
  return (
    <div className=" w-full max-w-md  ">
      <input
        className=" dark:bg-[#323546]  w-full px-4 py-2 mt-20 mb-20 md:px-6 md:py-4 rounded-md shadow-lg focus:outline-none placeholder:text-base text-base"
        type="search"
        placeholder="Search your favourtie coins"
      />
    </div>
  );
};

export default Searchbar;

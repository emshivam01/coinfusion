const Searchbar = () => {
  return (
    <div className="w-72 md:w-full max-w-md  ">
      <input
        className=" dark:bg-[#323546]  w-full px-4 py-2 md:mt-8 md:mb-8 md:px-6 md:py-4 rounded-md shadow-lg focus:outline-none placeholder:text-base text-base"
        type="search"
        placeholder="Search your favourite coins"
      />
    </div>
  );
};

export default Searchbar;

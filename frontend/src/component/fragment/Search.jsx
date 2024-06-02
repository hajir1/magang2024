export const Search = ({ classFormat, valueInput, changeInput, btnClick }) => {
  return (
    <div
      className={`${
        classFormat.length <1 && "hidden"
      } pt-2 relative mx-auto text-gray-600 lg:w-4/5 flex justify-between p-1`}
    >
      <input
        className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 w-3/5 rounded-lg text-sm focus:outline-none"
        type="text"
        value={valueInput}
        onChange={changeInput}
        name="search"
        placeholder="Cari Mobil"
      />
      <button
        type="submit"
        onClick={btnClick}
        className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-[33%] lg:w-1/5"
      >
        hapus semua
      </button>
    </div>
  );
};

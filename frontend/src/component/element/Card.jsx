import { useNavigate } from "react-router-dom";
import { ButtonCard } from "./Button";

export const CardMobil = ({ data, handleDeleteById, handlePakaiByOd }) => {
  const navigate = useNavigate();
  return (
    <div className="group relative ">
      <h2 className="text-xl p-3 font-bold text-gray-900 sm:pr-12 ">
        {data?.nama_mobil}
      </h2>
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <img
          src={`${data?.url}`}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <p>
              <span className="absolute inset-0"></span>
              {data?.jenis}
            </p>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{data?.kondisi}</p>
          <p className={`${data?.dipakai?"text-red-700":"text-gray-700"} mt-1 text-sm  font-bold`}>
            {data?.dipakai ? "sedang dipakai ekspedisi" : "tidak sedang dipakai"}
          </p>
        </div>
        <p className="text-sm font-medium text-gray-900">{data?.pemilik}</p>
      </div>
      <div className="mt-4 flex flex-col z-10 gap-y-1 lg:flex-row lg:justify-evenly relative">
        <ButtonCard
          model={"detail"}
          handleClick={() => navigate(`/lihatkendaraan/${data?.id}`)}
        />
        <ButtonCard
          model={"pakai"}
          handleClick={(e) => handlePakaiByOd(e, data?.id)}
        />
        <ButtonCard
          model={"hapus"}
          handleClick={(e) => {
            handleDeleteById(e, data?.id);
          }}
        />
      </div>
    </div>
  );
};

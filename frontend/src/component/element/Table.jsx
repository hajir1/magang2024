import React from "react";

export const Table = ({ children ,tableId,th1,th2}) => {
  return (
    <table
      id={`${tableId}`}
      className="min-w-full text-left text-sm font-light text-surface "
    >
      <thead className="border-b border-neutral-200 font-medium ">
        <tr>
          <th scope="col" className="px-6 py-4">
            {th1}
          </th>
          <th scope="col" className="px-6 py-4">
            {th2}
          </th>
          <th scope="col" className="px-6 py-4">
            waktu
          </th>
          <th scope="col" className="px-6 py-4">
            opsi
          </th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};
export const Table2 = ({ children }) => {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light text-surface ">
              <thead className="border-b border-neutral-200 font-medium ">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    nama driver
                  </th>
                  <th scope="col" className="px-6 py-4">
                    jasa
                  </th>
                  <th scope="col" className="px-6 py-4">
                    nama mobil
                  </th>

                  <th scope="col" className="px-6 py-4">
                    kondisi
                  </th>
                  <th scope="col" className="px-6 py-4">
                    waktu
                  </th>
                  <th scope="col" className="px-6 py-4">
                    opsi
                  </th>
                </tr>
              </thead>
              <tbody>{children}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

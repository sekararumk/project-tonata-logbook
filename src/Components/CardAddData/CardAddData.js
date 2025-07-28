import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const CardAddData = ({onClose}) => {
  const [isModalAdd, setIsModalAdd] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-4 w-full">
        <div>
          <form className="max-w-md w-full">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-sm p-4 pl-10 text-sm text-gray-900 border border-gray-300 
                                rounded-lg bg-gray-50 
                                focus:outline-none focus:ring-1 focus:ring-white
                                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                                dark:focus:border-white dark:focus:ring-white"
                placeholder="Cari Data"
                required
              />
              <button
                type="submit"
                className="text-white absolute right-2.5 bottom-2.5 bg-rose-400 hover:bg-rose-500 
                    focus:outline-none font-medium rounded-lg text-sm px-4 py-2 
                    dark:bg-rose-400 dark:hover:bg-rose-500"
              >
                Search
              </button>
            </div>
          </form>
        </div>
        <button
          onClick={() => setIsModalAdd(true)}
          data-modal-target="crud-modal"
          data-modal-toggle="crud-modal"
          className="bg-secondary text-white px-4 py-2 rounded ml-4"
        >
          <FontAwesomeIcon icon={faPlus} className="me-2" />
          Tambah Data
        </button>
      </div>

      {isModalAdd && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
            <button
              onClick={() => setIsModalAdd(false)}
              className="absolute top-2 me-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <h3 className="text-xl text-center font-semibold mb-4 mt-3">
              Tambah Data
            </h3>

            <form>
              <div className="col-span-2 sm:col-span-1 mb-4">
                {/* FIELD NAMA AUTO TERISI KARNA SUDAH LOGIN */}
                <label
                  for="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nama
                </label>
                <select
                  id="category"
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-3 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option selected="">Pilih Nama</option>
                  <option value="ALFI">Andi Muyassar Alfideri Hatta</option>
                  <option value="ANDIKA">Andika Falah Himawan</option>
                  <option value="ARUM">Sekar Arum Kinasih</option>
                  <option value="AKBAR">Akbar Zulkarnaen</option>
                  <option value="LATIFAH">Latifah Damayanti</option>
                  <option value="SIAGA">Siaga Parlindungan Harahap</option>
                  <option value="ALBERT">Albert Michael Putra Yochanan</option>
                  <option value="ECKY">Aliefiza Eckyarda Tierza</option>
                  <option value="ARA">Zahara Nurjannah</option>
                </select>
              </div>
              <div className="mb-4" id="datepicker-inline">
                <label className="block text-sm font-medium mb-1">
                  Tanggal
                </label>
                <input
                  datepicker
                  id="default-datepicker"
                  type="date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Select date"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Judul Kegiatan
                </label>
                <input type="text" className="w-full border p-2 rounded" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Detail Kegiatan
                </label>
                <textarea type="text" className="w-full border p-2 rounded" />
              </div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Link Google Docs
              </label>
              <input type="text" className="w-full border p-2 rounded" />
              <div className="flex justify-end">
                <button
                  type="cancel"
                  onClick={onClose}
                  className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 mt-8 me-2 rounded border border-transparent shadow-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-rose-400 hover:bg-rose-500 text-white px-4 py-2 mt-8 rounded border border-transparent shadow-md"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardAddData;

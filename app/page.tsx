"use client";

import { useState } from "react";

type Category = {
  id: string;
  name: string;
  quota: number;
};

const categories: Category[] = [
  {
    id: "campuran",
    name: "Ganda Campuran",
    quota: 3,
  },
  {
    id: "putri",
    name: "Ganda Putri",
    quota: 2,
  },
  {
    id: "putra",
    name: "Ganda Putra",
    quota: 2,
  },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [name, setName] = useState("");
  const [registered, setRegistered] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  const getRemainingQuota = (categoryId: string) => {
    const category = categories.find((item) => item.id === categoryId);

    if (!category) return 0;

    const used = registered.filter(
      (item) => item === categoryId
    ).length;

    return category.quota - used;
  };

  const handleRegister = () => {
    setMessage("");

    if (!name.trim()) {
      setMessage("Silakan masukkan nama terlebih dahulu.");
      return;
    }

    if (!selectedCategory) {
      setMessage("Silakan pilih kategori terlebih dahulu.");
      return;
    }

    const remaining = getRemainingQuota(selectedCategory);

    if (remaining <= 0) {
      setMessage("Maaf, kuota kategori ini sudah penuh.");
      return;
    }

    setRegistered([...registered, selectedCategory]);

    const category = categories.find(
      (item) => item.id === selectedCategory
    );

    setMessage(
      `Berhasil! ${name} terdaftar di ${category?.name}.`
    );

    setName("");
    setSelectedCategory("");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white px-5 py-10">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mb-3 text-5xl">🏸</div>

          <h1 className="text-4xl font-extrabold tracking-tight text-green-700">
            FUNANDHEALTHY
          </h1>

          <p className="mt-3 text-lg text-gray-600">
            Badminton Fun & Healthy
          </p>

          <p className="mt-2 text-sm text-gray-500">
            Pilih kategori dan amankan slot kamu!
          </p>
        </div>

        {/* Category */}
        <section>
          <h2 className="mb-4 text-xl font-bold text-gray-800">
            Pilih Kategori
          </h2>

          <div className="grid gap-4 sm:grid-cols-3">
            {categories.map((category) => {
              const remaining = getRemainingQuota(category.id);
              const isSelected = selectedCategory === category.id;
              const isFull = remaining <= 0;

              return (
                <button
                  key={category.id}
                  type="button"
                  disabled={isFull}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`rounded-2xl border-2 p-5 text-left transition ${
                    isFull
                      ? "cursor-not-allowed border-gray-200 bg-gray-100 opacity-60"
                      : isSelected
                      ? "border-green-600 bg-green-50 shadow-lg"
                      : "border-gray-200 bg-white hover:border-green-400 hover:shadow-md"
                  }`}
                >
                  <div className="text-3xl">🏸</div>

                  <h3 className="mt-3 font-bold text-gray-800">
                    {category.name}
                  </h3>

                  <p
                    className={`mt-2 text-sm font-semibold ${
                      isFull ? "text-red-500" : "text-green-600"
                    }`}
                  >
                    {isFull
                      ? "KUOTA PENUH"
                      : `Sisa ${remaining} slot`}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        {/* Form */}
        <section className="mt-8 rounded-3xl bg-white p-6 shadow-xl ring-1 ring-gray-100">
          <h2 className="text-xl font-bold text-gray-800">
            Daftar Sekarang
          </h2>

          <div className="mt-5">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Nama
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan nama kamu"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
            />
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Kategori
            </label>

            <div className="rounded-xl bg-gray-50 px-4 py-3 text-gray-700">
              {selectedCategory
                ? categories.find(
                    (item) => item.id === selectedCategory
                  )?.name
                : "Pilih kategori di atas"}
            </div>
          </div>

          <button
            type="button"
            onClick={handleRegister}
            className="mt-6 w-full rounded-xl bg-green-600 px-5 py-3 font-bold text-white transition hover:bg-green-700 active:scale-[0.99]"
          >
            🏸 AMANKAN SLOT
          </button>

          {message && (
            <div className="mt-4 rounded-xl bg-green-50 p-4 text-center text-sm font-medium text-green-700">
              {message}
            </div>
          )}
        </section>

        {/* Quota */}
        <section className="mt-8 rounded-3xl bg-gray-900 p-6 text-white">
          <h2 className="text-xl font-bold">
            Status Kuota
          </h2>

          <div className="mt-5 space-y-4">
            {categories.map((category) => {
              const remaining = getRemainingQuota(category.id);
              const percentage =
                (remaining / category.quota) * 100;

              return (
                <div key={category.id}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span>{category.name}</span>
                    <span className="font-bold">
                      {remaining}/{category.quota}
                    </span>
                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-gray-700">
                    <div
                      className="h-full rounded-full bg-green-500 transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <p className="mt-8 text-center text-sm text-gray-400">
          © 2026 FUNANDHEALTHY • Badminton Fun & Healthy
        </p>
      </div>
    </main>
  );
}

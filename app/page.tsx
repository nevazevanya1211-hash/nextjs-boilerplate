"use client";

import { useState } from "react";

const categories = [
  { name: "Ganda Campuran", quota: 2 },
  { name: "Ganda Putra", quota: 3 },
  { name: "Ganda Putri", quota: 3 },
];

export default function Home() {
  const [category, setCategory] = useState("");
  const [team, setTeam] = useState("");
  const [member1, setMember1] = useState("");
  const [member2, setMember2] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <main className="min-h-screen bg-[#07131c] px-4 py-10 text-white">
      <div className="mx-auto max-w-4xl">
        <header className="mb-10 text-center">
          <p className="font-bold tracking-[0.25em] text-lime-400">
            FUN & HEALTHY
          </p>
          <p className="mt-2 text-sm text-slate-400">
            BADMINTON REGISTRATION
          </p>
          <h1 className="mt-6 text-3xl font-black sm:text-5xl">
            WAR <span className="text-lime-400">BADMINTON</span>
          </h1>
          <p className="mt-3 text-slate-300">
            Pilih kategori, daftarkan tim, dan amankan slotmu!
          </p>
        </header>

        <section className="mb-8 grid gap-4 sm:grid-cols-3">
          {categories.map((item) => (
            <div
              key={item.name}
              className="rounded-2xl border border-lime-400/30
              bg-slate-900 p-5 shadow-lg shadow-black/20"
            >
              <p className="text-sm font-bold text-slate-300">
                {item.name}
              </p>
              <p className="mt-3 text-3xl font-black text-lime-400">
                {item.quota}{" "}
                <span className="text-sm text-white">SLOT</span>
              </p>
            </div>
          ))}
        </section>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Tampilan sudah siap. Koneksi database belum dipasang.");
          }}
          className="mx-auto max-w-2xl space-y-5 rounded-3xl
          bg-white p-6 text-slate-900 shadow-2xl sm:p-9"
        >
          <h2 className="text-2xl font-black">Formulir Pendaftaran</h2>

          <label className="block text-sm font-semibold">
            Kategori Badminton
            <select
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-300
              bg-white p-3 outline-none focus:border-lime-500"
            >
              <option value="">Pilih kategori</option>
              {categories.map((item) => (
                <option key={item.name} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>

          {[
            { label: "Nama Tim", value: team, set: setTeam },
            { label: "Nama Anggota 1", value: member1, set: setMember1 },
            { label: "Nama Anggota 2", value: member2, set: setMember2 },
            { label: "Nomor Handphone / WhatsApp", value: phone, set: setPhone },
          ].map((field) => (
            <label key={field.label} className="block text-sm font-semibold">
              {field.label}
              <input
                required
                value={field.value}
                onChange={(e) => field.set(e.target.value)}
                placeholder={
                  field.label.includes("WhatsApp")
                    ? "08xxxxxxxxxx"
                    : `Masukkan ${field.label.toLowerCase()}`
                }
                className="mt-2 w-full rounded-xl border border-slate-300
                p-3 outline-none focus:border-lime-500"
              />
            </label>
          ))}

          <button
            type="submit"
            className="w-full rounded-xl bg-lime-400 px-5 py-4
            font-black text-slate-950 transition hover:bg-lime-300"
          >
            DAFTAR SEKARANG →
          </button>

          <p className="text-center text-xs text-slate-500">
            Pastikan data dan nomor WhatsApp sudah benar.
          </p>
        </form>

        <p className="mt-6 text-center text-xs text-slate-500">
          FUN & HEALTHY · WAR BADMINTON
        </p>
      </div>
    </main>
  );
}

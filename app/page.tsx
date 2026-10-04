"use client";

import { useState } from "react";

const quotas = {
  "Ganda Campuran": 2,
  "Ganda Putra": 3,
  "Ganda Putri": 3,
};

export default function Home() {
  const [category, setCategory] =
    useState<keyof typeof quotas>("Ganda Campuran");
  const [team, setTeam] = useState("");
  const [member1, setMember1] = useState("");
  const [member2, setMember2] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <main style={{ maxWidth: 600, margin: "40px auto", padding: 24, fontFamily: "Arial, sans-serif" }}>
      <h1>🏸 Pendaftaran War Badminton</h1>
      <p>Pilih kategori dan daftarkan tim kamu!</p>

      <label>Kategori badminton</label>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value as keyof typeof quotas)}
        style={{ display: "block", width: "100%", padding: 12, margin: "8px 0 20px" }}
      >
        {Object.entries(quotas).map(([name, quota]) => (
          <option key={name} value={name}>
            {name} — Kuota {quota} tim
          </option>
        ))}
      </select>

      <form onSubmit={(e) => {
        e.preventDefault();
        alert("Tampilan formulir berhasil! Database Firebase belum dihubungkan.");
      }}>
        <label>Nama tim</label>
        <input required value={team} onChange={(e) => setTeam(e.target.value)} placeholder="Nama tim" style={field} />

        <label>Nama anggota 1</label>
        <input required value={member1} onChange={(e) => setMember1(e.target.value)} placeholder="Nama anggota 1" style={field} />

        <label>Nama anggota 2</label>
        <input required value={member2} onChange={(e) => setMember2(e.target.value)} placeholder="Nama anggota 2" style={field} />

        <label>Nomor Handphone / WhatsApp</label>
        <input required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="08xxxxxxxxxx" style={field} />

        <button type="submit" style={{ width: "100%", padding: 14, background: "#15803d", color: "white", border: 0, borderRadius: 8, marginTop: 12 }}>
          Daftar Sekarang
        </button>
      </form>
    </main>
  );
}

const field = {
  display: "block",
  boxSizing: "border-box" as const,
  width: "100%",
  padding: 12,
  margin: "8px 0 20px",
  border: "1px solid #ccc",
  borderRadius: 8,
};

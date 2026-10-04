const SUPABASE_URL = "https://lbyfrqysyipwimvepayh.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_pIZ6CxqH874NxQjpbQZ9IA_fRm23P2L";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);

const form = document.getElementById("registration-form");
const message = document.getElementById("message");
const submitButton = document.getElementById("submit-btn");

const limits = {
  "Ganda Campuran": 2,
  "Ganda Putra": 3,
  "Ganda Putri": 3
};


// ===============================
// MENAMPILKAN DATA PENDAFTAR
// ===============================

async function loadRegistrations() {

  const { data, error } = await supabaseClient
    .from("pendaftaran")
    .select("*")
    .order("created_at", {
      ascending: true
    });

  if (error) {
    console.error(error);
    return;
  }

  updateQuota(data);
  displayRegistrations(data);
}


// ===============================
// UPDATE JUMLAH KUOTA
// ===============================

function updateQuota(data) {

  const campuran = data.filter(
    item => item.kategori === "Ganda Campuran"
  ).length;

  const putra = data.filter(
    item => item.kategori === "Ganda Putra"
  ).length;

  const putri = data.filter(
    item => item.kategori === "Ganda Putri"
  ).length;

  document.getElementById("campuran-count").textContent = campuran;

  document.getElementById("putra-count").textContent = putra;

  document.getElementById("putri-count").textContent = putri;
}


// ===============================
// MENAMPILKAN PESERTA
// ===============================

function displayRegistrations(data) {

  const list = document.getElementById("registration-list");

  if (data.length === 0) {
    list.innerHTML = "<p>Belum ada peserta.</p>";
    return;
  }

  list.innerHTML = "";

  data.forEach((item, index) => {

    const div = document.createElement("div");

    div.className = "registration-item";

    div.innerHTML = `
      <h3>${index + 1}. ${item.nama_tim}</h3>
      <p>
        <strong>Kategori:</strong>
        ${item.kategori}
      </p>
      <p>
        <strong>Anggota:</strong>
        ${item.anggota_1} & ${item.anggota_2}
      </p>
    `;

    list.appendChild(div);
  });
}


// ===============================
// PROSES PENDAFTARAN
// ===============================

form.addEventListener("submit", async function(event) {

  event.preventDefault();

  const namaTim =
    document.getElementById("nama_tim").value.trim();

  const anggota1 =
    document.getElementById("anggota_1").value.trim();

  const anggota2 =
    document.getElementById("anggota_2").value.trim();

  const whatsapp =
    document.getElementById("whatsapp").value.trim();

  const kategori =
    document.getElementById("kategori").value;


  submitButton.disabled = true;
  submitButton.textContent = "MEMPROSES...";

  message.textContent = "";


  const { data, error } = await supabaseClient.rpc(
    "daftar_peserta",
    {
      p_nama_tim: namaTim,
      p_anggota_1: anggota1,
      p_anggota_2: anggota2,
      p_whatsapp: whatsapp,
      p_kategori: kategori
    }
  );


  if (error) {

    console.error(error);

    message.textContent =
      "Terjadi kesalahan. Silakan coba lagi.";

    submitButton.disabled = false;
    submitButton.textContent = "DAFTAR SEKARANG";

    return;
  }


  const result =
    Array.isArray(data) ? data[0] : data;


  if (result.success) {

    message.textContent =
      "Pendaftaran berhasil!";

    message.style.color = "green";

    form.reset();

    await loadRegistrations();

  } else {

    message.textContent =
      result.message;

    message.style.color = "red";
  }


  submitButton.disabled = false;
  submitButton.textContent = "DAFTAR SEKARANG";

});


// ===============================
// REALTIME
// ===============================

supabaseClient
  .channel("pendaftaran-realtime")

  .on(
    "postgres_changes",
    {
      event: "*",
      schema: "public",
      table: "pendaftaran"
    },
    function() {
      loadRegistrations();
    }
  )

  .subscribe();


// LOAD DATA SAAT WEBSITE DIBUKA

loadRegistrations();
async function tampilkanPeserta() {
const { data, error } = await supabase
.from("pendaftaran")
.select("*")
.order("created_at", { ascending: false });

const daftar = document.getElementById("participants-list");

if (!daftar) return;

if (error) {
daftar.innerHTML = "Gagal memuat peserta.";
console.error(error);
return;
}

daftar.innerHTML = data.map(p =>
"<p>${p.nama_tim || ""} — ${p.anggota1 || ""} — ${p.anggota2 || ""} — ${p.nomor_handphone || ""}</p>"
).join("");
}

tampilkanPeserta();

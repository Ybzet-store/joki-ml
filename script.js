// Fungsi untuk memvalidasi urutan rank
function validateRankOrder(startRank, endRank) {
    const rankOrder = [
        "Master 5", "Master 4", "Master 3", "Master 2", "Master 1",
        "Grand Master 5", "Grand Master 4", "Grand Master 3", "Grand Master 2", "Grand Master 1",
        "Epic 5", "Epic 4", "Epic 3", "Epic 2", "Epic 1",
        "Legend 5", "Legend 4", "Legend 3", "Legend 2", "Legend 1",
        "Mytic", "Mytical Honor", "Mytical Glory"
    ];

    const startIndex = rankOrder.indexOf(startRank);
    const endIndex = rankOrder.indexOf(endRank);

    if (startIndex > endIndex) {
        alert("Mohon masukkan rank dari yang lebih rendah ke yang lebih tinggi.");
        return false;
    }
    return true;
}

const rankOptions = [
    { rank: "Master 5", maxBintang: 5, pricePerBintang: 2000 },
    { rank: "Master 4", maxBintang: 5, pricePerBintang: 2000 },
    { rank: "Master 3", maxBintang: 5, pricePerBintang: 2000 },
    { rank: "Master 2", maxBintang: 5, pricePerBintang: 2000 },
    { rank: "Master 1", maxBintang: 5, pricePerBintang: 2000 },
    { rank: "Grand Master 5", maxBintang: 5, pricePerBintang: 3000 },
    { rank: "Grand Master 4", maxBintang: 5, pricePerBintang: 3000 },
    { rank: "Grand Master 3", maxBintang: 5, pricePerBintang: 3000 },
    { rank: "Grand Master 2", maxBintang: 5, pricePerBintang: 3000 },
    { rank: "Grand Master 1", maxBintang: 5, pricePerBintang: 3000 },
    { rank: "Epic 5", maxBintang: 5, pricePerBintang: 4000 },
    { rank: "Epic 4", maxBintang: 5, pricePerBintang: 4000 },
    { rank: "Epic 3", maxBintang: 5, pricePerBintang: 4000 },
    { rank: "Epic 2", maxBintang: 5, pricePerBintang: 4000 },
    { rank: "Epic 1", maxBintang: 5, pricePerBintang: 4000 },
    { rank: "Legend 5", maxBintang: 5, pricePerBintang: 5000 },
    { rank: "Legend 4", maxBintang: 5, pricePerBintang: 5000 },
    { rank: "Legend 3", maxBintang: 5, pricePerBintang: 5000 },
    { rank: "Legend 2", maxBintang: 5, pricePerBintang: 5000 },
    { rank: "Legend 1", maxBintang: 5, pricePerBintang: 5000 },
    { rank: "Mytic", maxBintang: 24, pricePerBintang: 7000 },
    { rank: "Mytical Honor", minBintang: 25, maxBintang: 49, pricePerBintang: 10000 },
    { rank: "Mytical Glory", minBintang: 50, maxBintang: 99, pricePerBintang: 14000 }
];

document.addEventListener("DOMContentLoaded", () => {
    const rankAwal = document.getElementById("rankAwal");
    const rankTujuan = document.getElementById("rankTujuan");
    const bintangAwal = document.getElementById("bintangAwal");
    const bintangTujuan = document.getElementById("bintangTujuan");

    // Menyembunyikan tombol "Pesan Sekarang" saat halaman dimuat
    const pesanSekarangButton = document.getElementById("pesanSekarang");
    pesanSekarangButton.style.display = "none"; // Tombol tersembunyi

    // Mengisi dropdown rank
    rankOptions.forEach(option => {
        const optionElementAwal = document.createElement("option");
        optionElementAwal.text = option.rank;
        optionElementAwal.value = option.rank;
        rankAwal.add(optionElementAwal);

        const optionElementTujuan = document.createElement("option");
        optionElementTujuan.text = option.rank;
        optionElementTujuan.value = option.rank;
        rankTujuan.add(optionElementTujuan);
    });

    // Event listener saat rank awal dan tujuan berubah
    rankAwal.addEventListener("change", () => updateBintangOptions(rankAwal, bintangAwal));
    rankTujuan.addEventListener("change", () => updateBintangOptions(rankTujuan, bintangTujuan));

    document.getElementById("hitungHarga").addEventListener("click", () => {
        const rankAwalValue = rankAwal.value;
        const rankTujuanValue = rankTujuan.value;
        const bintangAwalValue = parseInt(bintangAwal.value);
        const bintangTujuanValue = parseInt(bintangTujuan.value);

        // Memvalidasi urutan rank
        if (!validateRankOrder(rankAwalValue, rankTujuanValue)) {
            return; // Hentikan proses jika urutan rank tidak valid
        }

        const totalHarga = calculateTotalPrice(rankAwalValue, bintangAwalValue, rankTujuanValue, bintangTujuanValue);
        document.getElementById("totalHarga").innerText = `Total Harga: Rp${totalHarga.toLocaleString()}`;

        // Menampilkan tombol "Pesan Sekarang" setelah harga dihitung
        pesanSekarangButton.style.display = "block"; // Tombol ditampilkan
    });

     // Set kolom password menjadi teks agar password selalu terlihat
     const passwordInput = document.getElementById("password");
     passwordInput.type = "text"; // Password sekarang ditampilkan sebagai teks biasa
});

// Fungsi untuk memperbarui opsi bintang berdasarkan rank yang dipilih
function updateBintangOptions(rankSelect, bintangSelect) {
    const selectedRank = rankOptions.find(option => option.rank === rankSelect.value);
    bintangSelect.innerHTML = ''; // Reset options

    const minBintang = selectedRank.minBintang || 1;
    for (let i = minBintang; i <= selectedRank.maxBintang; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.text = i;
        bintangSelect.add(option);
    }
}

// Fungsi untuk menghitung total harga
function calculateTotalPrice(rankAwal, bintangAwal, rankTujuan, bintangTujuan) {
    const startIndex = rankOptions.findIndex(option => option.rank === rankAwal);
    const endIndex = rankOptions.findIndex(option => option.rank === rankTujuan);
    let totalHarga = 0;

    if (startIndex === endIndex) {
        // Jika rank awal dan tujuan sama, hitung dari bintang awal ke bintang tujuan
        for (let i = bintangAwal; i <= bintangTujuan; i++) {
            totalHarga += rankOptions[startIndex].pricePerBintang; // Menggunakan harga per bintang untuk rank yang sama
        }
    } else {
        // Hitung dari bintang awal ke maksimum bintang dalam rank awal
        totalHarga += (rankOptions[startIndex].maxBintang - bintangAwal + 1) * rankOptions[startIndex].pricePerBintang;

        // Hitung harga untuk rank tengah
        for (let i = startIndex + 1; i <= endIndex - 1; i++) {
            totalHarga += rankOptions[i].maxBintang * rankOptions[i].pricePerBintang;
        }

        // Hitung harga dari 1 ke bintang tujuan dalam rank tujuan
        totalHarga += bintangTujuan * rankOptions[endIndex].pricePerBintang;
    }

    return totalHarga;
}

// Event untuk menampilkan popup form
document.getElementById("pesanSekarang").addEventListener("click", () => {
    document.getElementById("popupForm").style.display = "flex";
});

// Event untuk menutup popup form
document.getElementById("closePopup").addEventListener("click", () => {
    document.getElementById("popupForm").style.display = "none";
});

// Event untuk mengirim data melalui WhatsApp
document.getElementById("sendWa").addEventListener("click", () => {
    const loginOption = document.getElementById("loginOption").value;
    const userId = document.getElementById("userId").value;
    const nickName = document.getElementById("nickName").value;
    const contactInfo = document.getElementById("contactInfo").value;
    const password = document.getElementById("password").value;

    

    const note = document.getElementById("note").value;

    if (!loginOption || !userId || !nickName || !contactInfo || !password) {
        alert("Harap isi semua kolom wajib.");
        return;
    }

    const rankAwalValue = document.getElementById("rankAwal").value;
    const rankTujuanValue = document.getElementById("rankTujuan").value;
    const bintangAwalValue = parseInt(document.getElementById("bintangAwal").value);
    const bintangTujuanValue = parseInt(document.getElementById("bintangTujuan").value);
    const totalHarga = document.getElementById("totalHarga").innerText.split(": ")[1];

    const waMessage = `Hallo Min!\nSaya mau joki dari ${rankAwalValue} bintang (${bintangAwalValue}) ke ${rankTujuanValue} bintang (${bintangTujuanValue}) dengan total harga: ${totalHarga}.\n\nData Informasi Akun :\nOpsi Login: ${loginOption}\nUser ID: ${userId}\nNickName: ${nickName}\nKontak: ${contactInfo}\nPassword: ${password}\nCatatan: ${note}\n\nMohon diproses untuk kelanjutan transaksinya, Min.`;

    const waLink = `https://wa.me/6281228848754?text=${encodeURIComponent(waMessage)}`;
    window.open(waLink, "_blank");

    document.getElementById("popupForm").style.display = "none";
});

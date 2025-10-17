#studikasus2 : analisispenjualantoko.py

#1. inputdatapenjualan
hari = ["senin", "selasa", "rabu", "kamis", "jumat", "sabtu", "minggu"]
data_penjualan = [50, 60, 40, 70, 30, 100, 80]

print(hari)
print(data_penjualan)

#2. Rata-rata Penjualan per Hari
total = sum(data_penjualan)
rata = total / len(data_penjualan)
print("Rata-rata Penjualan per Hari:", rata)

#3. Hari dengan Penjualan Tertinggi 
max_penjualan = data_penjualan[0]
hari_max = hari[0]
for i in range(len(data_penjualan)):
    if data_penjualan[i] > max_penjualan:
        max_penjualan = data_penjualan[i]
        hari_max = hari[i]
print("Hari dengan Penjualan Tertinggi:", hari_max, "-", max_penjualan)

#4. Hari dengan Penjualan Terendah
min_penjualan = data_penjualan[0]
hari_min = hari[0]      
for i in range(len(data_penjualan)):
    if data_penjualan[i] < min_penjualan:
        min_penjualan = data_penjualan[i]
        hari_min = hari[i]      
print("Hari dengan Penjualan Terendah:", hari_min, "-", min_penjualan)  

#4. Tampilkan grafik sederhana dengan simbol ****  
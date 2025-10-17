#studikasus : 2.2analisislogingagal.py

#1. inputdatalogingagal
akun = ["akun1", "akun2", "akun3", "akun4", "akun5"]
login_gagal = [3, 7, 1, 9, 2]

print(akun)
print(login_gagal)

#2. hitungtotallogingagal
total = 0 
for n in login_gagal:
    total += n
print ("Total Gagal Login:", total)

#3. Hitung Rata-rata login gagal
rata = total / len(login_gagal)
print("Rata-rata login gagal per akun:", rata)

#4. Cari akun dengan Login Gagal Terbanyak
max_gagal = login_gagal[0]
akun_max = akun[0]

for i in range(len(login_gagal)):
    if login_gagal[i] > max_gagal:
        max_gagal = login_gagal[i]
        akun_max = akun[i]

        print("Akun dengan login gagal terbanyak:", akun_max,
              "-", max_gagal, "kali")
        
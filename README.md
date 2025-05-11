# 📝 BukuKasKu API Documentation

## **Authentication Endpoints**

---

### **Register User**
- **Method**: `POST`
- **URL**: `/api/auth/register`
- **Description**: Mendaftarkan user baru.
- **Headers**: Tidak diperlukan.
- **Request Body** (JSON):
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Contoh Response Sukses (201)**:
  ```json
  {
    "user": {
      "_id": "663f1a2b4a5b6c7d8e9f0a1b",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

---

### **Login User**
- **Method**: `POST`
- **URL**: `/api/auth/login`
- **Description**: Login user dan mendapatkan token JWT.
- **Headers**: Tidak diperlukan.
- **Request Body** (JSON):
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Contoh Response Sukses (200)**:
  ```json
  {
    "user": {
      "_id": "663f1a2b4a5b6c7d8e9f0a1b",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

---

### **Logout User**
- **Method**: `POST`
- **URL**: `/api/auth/logout`
- **Description**: Logout user dan hapus token.
- **Headers**:
  ```http
  Authorization: Bearer <JWT_TOKEN>
  ```
- **Request Body**: Tidak diperlukan.
- **Response Sukses (200)**: Body kosong.

---

## **Transaction Endpoints**  
*Semua endpoint transaksi memerlukan header `Authorization`*

---

### **Tambah Transaksi**
- **Method**: `POST`
- **URL**: `/api/transactions`
- **Headers**:
  ```http
  Authorization: Bearer <JWT_TOKEN>
  Content-Type: application/json
  ```
- **Request Body** (JSON):
  ```json
  {
    "amount": 150000,
    "type": "income",
    "category": "Gaji",
    "date": "2024-05-12",  // Opsional
    "description": "Gaji bulan Mei"  // Opsional
  }
  ```
- **Validasi**:
  - `amount`: Angka positif (min 0)
  - `type`: `income` atau `expense`
  - `category`: `Makanan`, `Transportasi`, `Belanja`, `Hiburan`, `Gaji`, `Lainnya`

---

### **Lihat Semua Transaksi**
- **Method**: `GET`
- **URL**: `/api/transactions`
- **Query Parameters** (Opsional):
  - `type`: Filter by `income`/`expense`
  - `category`: Filter by kategori
  - `startDate` & `endDate`: Filter tanggal (format: `YYYY-MM-DD`)
- **Contoh Response (200)**:
  ```json
  [
    {
      "_id": "663f1a2b4a5b6c7d8e9f0a1b",
      "amount": 150000,
      "type": "income",
      "category": "Gaji",
      "date": "2024-05-12T00:00:00.000Z",
      "description": "Gaji bulan Mei"
    }
  ]
  ```

---

### **Statistik Keuangan**
- **Method**: `GET`
- **URL**: `/api/transactions/summary`
- **Contoh Response (200)**:
  ```json
  {
    "income": 2500000,
    "expense": 750000,
    "balance": 1750000
  }
  ```

---

### **Detail Transaksi**
- **Method**: `GET`
- **URL**: `/api/transactions/:id`
- **Contoh Response (200)**:
  ```json
  {
    "_id": "663f1a2b4a5b6c7d8e9f0a1b",
    "amount": 150000,
    "type": "income",
    "category": "Gaji",
    "date": "2024-05-12T00:00:00.000Z",
    "description": "Gaji bulan Mei"
  }
  ```

---

### **Edit Transaksi**
- **Method**: `PUT`
- **URL**: `/api/transactions/:id`
- **Headers**:
  ```http
  Authorization: Bearer <JWT_TOKEN>
  Content-Type: application/json
  ```
- **Request Body** (JSON):  
  *Bisa partial update (hanya field yang ingin diubah)*
  ```json
  {
    "amount": 200000,
    "description": "Revisi gaji"
  }
  ```

---

### **Hapus Transaksi**
- **Method**: `DELETE`
- **URL**: `/api/transactions/:id`
- **Contoh Response (200)**:
  ```json
  {
    "message": "Transaksi dihapus"
  }
  ```

---

## **Error Responses**

### **401 Unauthorized**
```json
{
  "error": "Please authenticate"
}
```

### **404 Not Found**
```json
{
  "message": "Transaksi tidak ditemukan"
}
```

### **400 Bad Request (Validasi Error)**
```json
{
  "message": "Validasi gagal",
  "errors": ["Jumlah harus angka positif"]
}
```

---

## **Catatan Penting**
1. Selalu sertakan header `Authorization` untuk endpoint transaksi.
2. Untuk kategori `income`, gunakan `Gaji` atau `Lainnya`.
3. Format tanggal: `YYYY-MM-DD` (ISO 8601).
4. Gunakan `Content-Type: application/json` untuk operasi POST/PUT.

## **Testing dengan Curl**
Contoh create transaction:
```bash
curl -X POST http://localhost:5000/api/transactions \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"amount": 50000, "type": "expense", "category": "Makanan"}'
```
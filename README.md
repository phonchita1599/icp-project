# คู่มือการรันเซิร์ฟเวอร์บนเครื่องตัวเอง และ Deploy ไปยัง GitHub Pages

## 1. วิธีใช้เครื่องตัวเองเป็นเซิร์ฟเวอร์ (Self-Hosting บนเครื่องคุณเอง)

### วิธีที่ง่ายที่สุด (ดับเบิลคลิกเดียว):
1. ดับเบิลคลิกที่ไฟล์ `start-server.bat` (อยู่ที่โฟลเดอร์หลัก) หรือ `start-local-server.bat` (ในโฟลเดอร์ icp-project-app)
2. หน้าต่างจะแสดงที่อยู่ IP ประจำเครื่องของคุณ เช่น:
   - **เข้าจากเครื่องคุณเอง:** `http://localhost:5173`
   - **เข้าจากมือถือ / แท็บเล็ต / คอมเครื่องอื่นในบ้าน (Wi-Fi เดียวกัน):** `http://<IP-เครื่องคุณ>:5173`
3. เบราว์เซอร์จะเปิดขึ้นมาอัตโนมัติ พร้อมใช้งานได้ทันที!

### ถ้าต้องการให้คนนอกบ้าน (ผ่านอินเทอร์เน็ต) เข้าดูได้ฟรี:
- ใช้โปรแกรมเปิดพอร์ตชั่วคราวฟรี เช่น **Cloudflare Tunnel** หรือ **ngrok**:
  - ดาวน์โหลด [Cloudflare Tunnel / cloudflared](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/create-local-tunnel/) แล้วรันคำสั่ง:
    ```bash
    cloudflared tunnel --url http://localhost:5173
    ```
  - คุณจะได้ลิงก์ URL สาธารณะแบบ HTTPS ให้เพื่อนๆ เข้าได้จากทุกที่ทั่วโลกทันที!

---

## 2. วิธี Deploy ขึ้น GitHub Pages (ออนไลน์ 24 ชม. ฟรี)

ระบบถูกตั้งค่าให้รองรับ GitHub Pages ไว้อย่างสมบูรณ์แล้ว (`base: './'` และ GitHub Actions อัตโนมัติ)

### วิธีที่ 1: ผ่าน GitHub Desktop หรือ Git Push (แนะนำและเป็นอัตโนมัติที่สุด)
1. อัปโหลดโปรเจกต์นี้ขึ้น GitHub Repository ของคุณ (เช่น `https://github.com/your-username/icp-project`)
2. ไปที่หน้า GitHub Repository ของคุณบนเว็บ -> กดแท็บ **Settings** -> เมนู **Pages** (ทางซ้าย)
3. ตรง **Build and deployment -> Source**:
   - เลือก **GitHub Actions**
4. ระบบจะทำการ Build และ Deploy ขึ้นออนไลน์ให้อัตโนมัติทุกครั้งที่คุณ push โค้ด
5. เว็บไซต์ของคุณจะออนไลน์ที่: `https://your-username.github.io/icp-project/`

### วิธีที่ 2: Deploy ด้วยคำสั่งผ่าน npm (gh-pages)
1. เปิด Terminal ในโฟลเดอร์ `icp-project-app`
2. รันคำสั่ง:
   ```bash
   npm run deploy
   ```
3. ระบบจะสร้างโฟลเดอร์ `dist` และอัปโหลดไปยัง branch `gh-pages` ให้คุณโดยตรง
4. ใน GitHub Settings > Pages ให้เลือก Source เป็น **Deploy from a branch** แล้วเลือก branch **gh-pages** โฟลเดอร์ `/(root)`

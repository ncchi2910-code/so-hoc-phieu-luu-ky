# HƯỚNG DẪN TỪNG BƯỚC — Làm game trên Claude Code

Quy trình này giống hệt cách mình đã làm ESG Fresk Vietnam. Chị làm tuần tự từng bước nhé.

---

## BƯỚC 1 — Tạo thư mục dự án

Mở **Terminal** trên máy Mac của chị, copy-paste lần lượt từng dòng (Enter sau mỗi dòng):

```
mkdir -p /Users/CC/Documents/09_Game_Toan/so-hoc-phieu-luu
cd /Users/CC/Documents/09_Game_Toan/so-hoc-phieu-luu
```

---

## BƯỚC 2 — Copy 2 file tài liệu vào thư mục

Em gửi chị 2 file: `GAME_SPEC.md` và `PROMPT_KHOI_DAU.txt`.

Chị tải về, rồi kéo (drag) cả 2 file vào thư mục vừa tạo:
`/Users/CC/Documents/09_Game_Toan/so-hoc-phieu-luu`

(Mở Finder → Documents → 09_Game_Toan → so-hoc-phieu-luu → thả 2 file vào đây.)

---

## BƯỚC 3 — Mở Claude Code trong thư mục này

Trong Terminal, đảm bảo đang ở đúng thư mục (lệnh `cd` ở Bước 1 đã đưa chị vào rồi). Gõ:

```
claude
```

Đợi Claude Code khởi động (hiện ô gõ chữ với dấu `>`).

---

## BƯỚC 4 — Đưa prompt khởi đầu

1. Mở file `PROMPT_KHOI_DAU.txt`, copy toàn bộ đoạn nằm DƯỚI dòng kẻ ngang `---`.
2. Dán vào Claude Code, nhấn Enter.
3. Claude Code sẽ đọc spec, trình bày kế hoạch, rồi bắt đầu code. Khi nó hỏi xác nhận gì thì chị đọc, nếu hợp lý thì đồng ý (gõ `yes` hoặc chọn option được gợi ý).
4. Để nó làm xong. Khi báo "đã xong", sang Bước 5.

> Nếu gặp màn hình nào không biết chọn gì, chị chụp lại gửi em, em chỉ ngay.

---

## BƯỚC 5 — Kiểm tra thử game

Trong Terminal (mở tab/cửa sổ Terminal mới, hoặc thoát Claude Code tạm bằng cách gõ `/quit`):

```
cd /Users/CC/Documents/09_Game_Toan/so-hoc-phieu-luu
open index.html
```

Game sẽ mở trong trình duyệt. Chị chơi thử cả 3 màn, để ý:
- Đáp án Toán có đúng không (thử vài câu chị tự tính lại)
- 3 câu chuyện lịch sử có hiện ra sau mỗi màn không
- Trên điện thoại có chạy ổn không (có thể gửi link sau khi deploy để test)

Nếu cần sửa gì, mở lại Claude Code (`claude`) và nói nó sửa, ví dụ:
*"Câu chuyện lịch sử màn 2 ngắn quá, viết dài hơn một chút"* hoặc *"Màn 1 có câu đáp án sai, kiểm tra lại phần sinh đề"*.

---

## BƯỚC 6 — Đẩy code lên GitHub

Vẫn trong thư mục dự án, mở Claude Code và nói:

*"Khởi tạo git, tạo repo private trên GitHub tên `so-hoc-phieu-luu-ky` bằng gh CLI, rồi push code lên."*

Claude Code sẽ tự chạy các lệnh git và `gh` (chị đã cài và đăng nhập `gh` từ hồi làm ESG Fresk rồi nên không cần làm lại). Nếu nó hỏi xác nhận tạo repo thì chị đồng ý.

---

## BƯỚC 7 — Deploy lên Vercel

Cách dễ nhất:
1. Vào https://vercel.com, đăng nhập bằng tài khoản GitHub.
2. Bấm **Add New → Project**.
3. Chọn repo `so-hoc-phieu-luu-ky` vừa push.
4. Vercel tự nhận đây là site tĩnh → bấm **Deploy**.
5. Đợi ~1 phút, Vercel cho chị một đường link (dạng `so-hoc-phieu-luu-ky.vercel.app`).

Gửi link đó vào điện thoại để cháu chơi thử. Mỗi lần chị sửa code và push lại GitHub, Vercel tự deploy lại — không phải làm gì thêm.

---

## TÓM TẮT NHANH

1. Tạo thư mục → 2. Bỏ 2 file vào → 3. Mở `claude` → 4. Dán prompt → 5. Test thử → 6. Push GitHub → 7. Deploy Vercel.

Có vướng ở bước nào chị chụp màn hình gửi em, em đồng hành từng bước như hồi ESG Fresk ạ.

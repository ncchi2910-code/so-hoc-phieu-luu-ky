# GAME SPEC v2 — "Số Học Phiêu Lưu Ký"

> Đây là bản CẬP NHẬT, thay thế GAME_SPEC.md cũ. Game đã có sẵn (index.html) — SỬA TIẾP, không làm lại từ đầu. Giữ phần sinh đề ngẫu nhiên đã chạy tốt, chỉ thay đổi theo các mục dưới.

## 1. Thay đổi tổng quan so với bản cũ

- Cấu trúc đổi thành **6 chặng** (bản cũ là 3 màn): 3 chặng ôn nền lớp 6 + 3 chặng Chương I lớp 7.
- (Phần Chương II — Số thực TẠM BỎ, sẽ làm ở bản sau. Không code phần này.)
- Phần ôn lớp 6 là **BẮT BUỘC**: phải hoàn thành 3 chặng ôn mới mở khóa được 3 chặng lớp 7. Không cho nhảy cóc.
- Thêm tính năng **giải thích khi trả lời sai** (xem mục 4).
- **Đổi toàn bộ giao diện**: bỏ tông vàng giấy cổ, làm lại phong cách trẻ trung tươi sáng cho học sinh lớp 6–7 (xem mục 6).
- Nhân vật học sinh trong game tên là **Kim** — game gọi tên này xuyên suốt ("Giỏi lắm Kim!", "Kim đã vượt chặng 3!").
- Thêm **phần thưởng ảnh** sau mỗi câu chuyện lịch sử (xem mục 5).

## 2. Yêu cầu kỹ thuật (giữ nguyên như bản cũ)

- Một file `index.html` duy nhất (HTML + CSS + JS), không framework, không build.
- Responsive, chạy tốt trên điện thoại.
- Tiếng Việt đầy đủ dấu.
- KHÔNG dùng localStorage/sessionStorage.
- Sinh đề ngẫu nhiên, refresh ra đề mới, đáp án phải đúng tuyệt đối (giữ logic cũ đã test ổn).

## 3. Cấu trúc 6 chặng

### NHÓM A — ÔN NỀN LỚP 6 (Cánh Diều) — bắt buộc, làm trước

**Chặng 1 — "Bảng cửu chương & Tính nhẩm"**
- Bảng cửu chương (nhân, chia trong bảng)
- Cộng trừ nhanh số nguyên (có số âm)
- Mục tiêu: phản xạ tính nhẩm cơ bản, nền tảng luôn phải nhớ.

**Chặng 2 — "Số nguyên & Quy tắc dấu"**
- Cộng, trừ, nhân, chia số nguyên âm/dương
- Quy tắc dấu ngoặc
- Thứ tự thực hiện các phép tính
- Nền trực tiếp cho phép tính số hữu tỉ lớp 7.

**Chặng 3 — "Phân số & Số thập phân lớp 6"**
- Rút gọn phân số, quy đồng mẫu
- Cộng, trừ, nhân, chia phân số cơ bản
- Đổi phân số ↔ số thập phân
- Nền trực tiếp cho Chương I lớp 7.

### NHÓM B — CHƯƠNG I LỚP 7: SỐ HỮU TỈ — mở sau khi xong Nhóm A

**Chặng 4 — "Cộng, trừ, nhân, chia số hữu tỉ"**
- Bốn phép tính với số hữu tỉ (phân số có số âm)

**Chặng 5 — "Lũy thừa & Thứ tự phép tính"**
- Lũy thừa số mũ tự nhiên của số hữu tỉ
- Thứ tự thực hiện phép tính + quy tắc dấu ngoặc (mức lớp 7)

**Chặng 6 — "Biểu diễn thập phân của số hữu tỉ"**
- Số thập phân hữu hạn / vô hạn tuần hoàn
- Đổi phân số ↔ số thập phân (mức lớp 7)

Mỗi chặng ~8–10 câu, đạt tối thiểu (vd 7/10) để qua chặng & mở câu chuyện + phần thưởng.

## 4. Tính năng MỚI — Giải thích khi trả lời sai

Khi Kim chọn SAI một câu:
- Hiện NGAY LẬP TỨC một ô giải thích (modal/box nổi bật), Kim phải đọc xong, bấm "Đã hiểu" mới được làm tiếp. KHÔNG cho lướt qua.
- Nội dung ô giải thích gồm 3 phần:
  1. **Đáp án đúng là gì** + vì sao đáp án Kim chọn chưa đúng.
  2. **Cách làm đúng từng bước**, ngắn gọn, dễ hiểu cho học sinh lớp 6–7.
  3. **Ví dụ đời thường** để hình dung. Ví dụ mẫu:
     - Số âm: "−3 + 5 = 2. Hình dung: Kim đang nợ 3 nghìn (−3), được cho 5 nghìn (+5), trả nợ xong còn dư 2 nghìn."
     - Phân số: "1/2 + 1/4: như cắt bánh — nửa cái bánh cộng thêm một phần tư cái bánh thì được 3/4 cái bánh."
     - Quy tắc dấu ngoặc: "Bỏ ngoặc có dấu trừ đằng trước thì đổi dấu hết bên trong — như khi Kim 'lấy ngược lại' những gì đã cho mượn."
- Giọng giải thích: kiên nhẫn, khích lệ, KHÔNG chê bai. Sai là chuyện bình thường khi học.
- Mỗi dạng bài cần có mẫu giải thích riêng phù hợp nội dung câu đó (không dùng một câu chung chung cho mọi câu).

## 5. Câu chuyện lịch sử + Phần thưởng ảnh (6 chặng = 6 chuyện)

Sau khi hoàn thành mỗi chặng: hiện câu chuyện lịch sử (1 đoạn 5–8 câu, hấp dẫn, chính xác, có 1 câu chốt nối với kiến thức Toán vừa học). Đọc xong câu chuyện → hiện màn hình PHẦN THƯỞNG.

### Phần thưởng ảnh
- Sau câu chuyện chặng N, hiển thị ảnh từ file: `images/chuyenN.jpg` (N = 1..6).
- Ảnh hiển thị trong một khung "thẻ phần thưởng" đẹp, kèm 1 câu cổ vũ (mục dưới).
- QUAN TRỌNG — xử lý ảnh thiếu: nếu file ảnh không tồn tại / lỗi load (onerror), KHÔNG để vỡ giao diện. Thay vào đó hiện một thẻ cổ vũ thiết kế bằng CSS/SVG (không cần ảnh) với cùng câu cổ vũ. Game phải chạy hoàn chỉnh kể cả khi chưa có ảnh nào.
- Đường dẫn ảnh dùng tương đối: `images/chuyen1.jpg` ... `images/chuyen6.jpg` (cùng cấp với index.html).

### Nội dung 6 câu chuyện lịch sử
1. **Chặng 1** (bảng cửu chương, tính nhẩm): Người Ai Cập cổ đại và nhu cầu đếm, nhân chia khi xây dựng và buôn bán. Câu chốt: tính nhẩm nhanh là kỹ năng loài người rèn từ hàng nghìn năm.
2. **Chặng 2** (số nguyên, quy tắc dấu): Số âm trong thương mại Trung Hoa cổ — biểu thị "nợ" và "có". Câu chốt: số âm sinh ra từ chuyện vay–trả rất đời thường.
3. **Chặng 3** (phân số, thập phân lớp 6): Phân số trên giấy cói Ai Cập — bài toán chia bánh mì cho thợ xây kim tự tháp. Câu chốt: phân số ra đời để chia công bằng.
4. **Chặng 4** (số hữu tỉ): Số 0 và số âm của Ấn Độ thời trung đại, truyền sang thế giới Hồi giáo rồi châu Âu. Gắn Sử lớp 7 Bài 5 (Ấn Độ thế kỉ IV–XIX). Câu chốt: nhờ Ấn Độ mới có số 0 & số âm để tính số hữu tỉ.
5. **Chặng 5** (lũy thừa, thứ tự phép tính): Thời hoàng kim toán học Hồi giáo — al-Khwarizmi và "đại số". Gắn bối cảnh giao lưu tri thức trung đại (Sử lớp 7). Câu chốt: quy tắc tính toán có trật tự được hệ thống hóa từ thời này.
6. **Chặng 6** (biểu diễn thập phân): Con số theo chân các cuộc phát kiến địa lí & Con đường tơ lụa thế kỉ XV–XVI. Gắn Sử lớp 7 Bài 2 (Các cuộc phát kiến địa lí). Câu chốt: hệ chữ số, số thập phân lan ra toàn thế giới qua giao thương.

### 6 câu cổ vũ "Gai Con" (fan Anh Trai Vượt Ngàn Chông Gai) — đi kèm phần thưởng
1. "Kim ơi, mỗi chặng toán cũng như một chông gai — vượt qua rồi mới thấy mình mạnh hơn. Gai Con không bỏ cuộc!"
2. "Giỏi lắm Kim! Anh Trai vượt ngàn chông gai, còn Kim vừa vượt một chặng số học. Tinh thần đó, giữ vững nhé!"
3. "Một câu chuyện lịch sử + một chặng chinh phục = một bước Kim tiến gần hơn tới đỉnh. Cố lên Gai Con!"
4. "Chặng này khó mà Kim vẫn qua — đúng chất một Gai Con bản lĩnh. Tiếp tục thôi!"
5. "Kim thấy không, kiên trì từng bước nhỏ sẽ tới đích lớn. Anh Trai cũng đi lên từ những bước như thế!"
6. "Hoàn thành xuất sắc, Kim! Vượt ngàn chông gai số học — Kim chính là nhà vô địch của hành trình này!"

(Câu số mấy đi với chặng số đó.)

## 6. Giao diện MỚI — thay hoàn toàn tông vàng giấy cổ

- Đối tượng: học sinh lớp 6–7. Phong cách: **trẻ trung, tươi sáng, vui, năng động** — kiểu app học tập hiện đại cho thiếu niên.
- Gợi ý hướng (Claude Code tự chọn 1 hướng và làm cho đẹp, nhất quán):
  - Bảng màu tươi sáng, nhiều màu nhưng hài hòa (xanh dương/xanh lá/cam/hồng pastel...), nền sáng sạch, không dùng nâu/vàng giấy da.
  - Bo góc mềm, nút bấm to rõ dễ chạm trên điện thoại, hiệu ứng vui (nảy nhẹ, confetti khi qua chặng) nhưng không rối mắt.
  - Font dễ đọc, thân thiện, không dùng font cổ điển kiểu sách cũ.
  - Bản đồ hành trình 6 chặng trực quan: chặng đã qua sáng/được tô màu, chặng đang mở nổi bật, chặng khóa mờ + biểu tượng khóa.
  - Phản hồi đúng: vui tươi khích lệ. Phản hồi sai: nhẹ nhàng, không đỏ gắt gây áp lực.
- Giữ trải nghiệm tích cực, đúng tinh thần học mà chơi.

## 7. Tiêu chí hoàn thành

- 6 chặng chạy đúng thứ tự, ôn lớp 6 bắt buộc trước, không nhảy cóc.
- Sai là hiện giải thích ngay (đáp án đúng + cách làm + ví dụ đời thường), bắt đọc mới đi tiếp.
- 6 câu chuyện lịch sử đúng nội dung; sau mỗi chuyện hiện phần thưởng ảnh `images/chuyenN.jpg` + câu cổ vũ; thiếu ảnh thì có thẻ CSS thay thế, không vỡ giao diện.
- Giao diện mới trẻ trung, không còn tông vàng cổ.
- Đáp án toán đúng tuyệt đối, refresh ra đề mới.
- Chạy mượt trên điện thoại.

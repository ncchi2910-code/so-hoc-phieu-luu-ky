# GAME SPEC v3 — "Số Học Phiêu Lưu Ký"

> Bản CẬP NHẬT, thay thế GAME_SPEC_v2.md. Game đã có (index.html) và chạy tốt — SỬA TIẾP, KHÔNG viết lại từ đầu. GIỮ NGUYÊN: phần sinh đề ngẫu nhiên đã test kỹ, phần giải thích khi sai, giao diện trẻ trung hiện tại, 6 câu chuyện lịch sử, tên nhân vật "Kim". Chỉ thêm/sửa theo các mục dưới.

## 1. Tóm tắt thay đổi so với v2

1. Cấu trúc đổi thành **4 PHẦN** (v2 là 6 chặng gộp 2 nhóm). Mỗi phần gồm 3 chặng nhỏ.
2. Thêm 2 phần ôn lớp 6 mới (ƯCLN/BCNN & chia hết; Toán đố).
3. Thẻ động viên sau mỗi chặng nhỏ: đổi từ câu cố định → **random từ kho 20 câu + random ảnh trong 36 ảnh**.
4. Thêm **thẻ cào trúng tiền** sau khi hoàn thành mỗi phần (~3 chặng).
5. **Bật localStorage** để nhớ tổng tiền tích lũy qua các lần chơi.

## 2. Cấu trúc 4 PHẦN (mỗi phần 3 chặng nhỏ)

Mỗi phần phải hoàn thành tuần tự mới mở phần sau (giữ logic khóa/mở như v2). Mỗi phần hiển thị NHÃN rõ ràng.

### PHẦN 1 — "ÔN LỚP 6: Số học" (nhãn: "Ôn lớp 6")
GIỮ NGUYÊN nội dung 3 chặng số học lớp 6 đang có (bảng cửu chương & tính nhẩm; số nguyên & quy tắc dấu; phân số & số thập phân lớp 6).

### PHẦN 2 — "ÔN LỚP 6: ƯCLN, BCNN & Chia hết" (nhãn: "Ôn lớp 6") — MỚI
3 chặng nhỏ:
- Chặng 2.1 — Dấu hiệu chia hết (cho 2, 3, 5, 9) và quan hệ ước – bội
- Chặng 2.2 — Số nguyên tố, hợp số, phân tích một số ra thừa số nguyên tố
- Chặng 2.3 — Tìm ƯCLN và BCNN của hai/ba số
Lý do sư phạm (ghi chú nội bộ, không cần hiện cho học sinh): đây là nền trực tiếp để rút gọn & quy đồng phân số ở phần số hữu tỉ lớp 7.
Sinh đề ngẫu nhiên, đáp án phải đúng tuyệt đối (kiểm thử kỹ như các phần cũ). Số dùng trong đề nên ở mức vừa sức lớp 6 (ví dụ ƯCLN/BCNN của các số ≤ 100).

### PHẦN 3 — "ÔN LỚP 6: Toán đố" (nhãn: "Ôn lớp 6") — MỚI
3 chặng nhỏ, dạng **bài toán có lời văn / tình huống đời thường**, mức lớp 6:
- Chặng 3.1 — Toán đố về số và phép tính (thêm/bớt, gấp/kém, tổng–hiệu đơn giản)
- Chặng 3.2 — Toán đố về phân số & tỉ số phần trăm cơ bản (vd: ăn 1/3 cái bánh còn lại bao nhiêu; giảm giá 20%...)
- Chặng 3.3 — Toán đố vận dụng ƯCLN/BCNN (vd: chia kẹo đều nhiều túi; hai xe cùng xuất phát gặp lại nhau...)
Mỗi câu là một tình huống ngắn, gần gũi (mua hàng, chia quà, lớp học, gia đình). Có đáp án trắc nghiệm. Khi sai vẫn hiện ô giải thích như cơ chế hiện tại, nhấn mạnh diễn giải lời văn → phép tính.
Sinh ngẫu nhiên số liệu trong tình huống, đáp án đúng tuyệt đối.

### PHẦN 4 — "Chương I lớp 7: Số hữu tỉ" (nhãn: "Lớp 7")
GIỮ NGUYÊN 3 chặng số hữu tỉ lớp 7 đang có (cộng trừ nhân chia số hữu tỉ; lũy thừa & thứ tự phép tính; biểu diễn thập phân).

> Tổng cộng 4 phần × 3 chặng = 12 chặng nhỏ. Mỗi phần ghi nhãn cấp lớp rõ ràng để Kim biết đang ôn lớp 6 hay học lớp 7.

## 3. Thẻ động viên sau MỖI CHẶNG NHỎ (random)

Sau khi hoàn thành mỗi chặng nhỏ (12 lần trong toàn game), hiện một THẺ ĐỘNG VIÊN gồm:
- **Phần ảnh**: random chọn 1 ảnh trong `images/chuyen1.jpg` ... `images/chuyen36.jpg` (36 ảnh, người dùng tự cập nhật dần). Nếu ảnh chọn trúng bị lỗi/thiếu (onerror), tự chọn ảnh khác hoặc hiện khung CSS thay thế — KHÔNG vỡ giao diện, KHÔNG để ô trống.
- **Phần câu khen**: random 1 câu trong kho 20 câu bên dưới.
- Thiết kế thẻ đẹp, vui, hợp phong cách trẻ trung hiện tại; có nút "Tiếp tục".

### Kho 20 câu khen kiểu "Gai Con" (fan Anh Trai Vượt Ngàn Chông Gai)
1. Kim ơi, mỗi chặng toán là một chông gai — vượt rồi mới thấy mình mạnh hơn. Gai Con không bỏ cuộc!
2. Giỏi lắm Kim! Anh Trai vượt ngàn chông gai, Kim vừa vượt một chặng số học. Giữ vững tinh thần nhé!
3. Một bước nhỏ hôm nay, một đỉnh cao mai sau. Cố lên Gai Con!
4. Chặng này khó mà Kim vẫn qua — đúng chất một Gai Con bản lĩnh!
5. Kim thấy không, kiên trì từng bước nhỏ sẽ tới đích lớn!
6. Hoàn thành xuất sắc, Kim! Kim chính là nhà vô địch của hành trình này!
7. Không có chông gai nào cản được một Gai Con quyết tâm như Kim!
8. Mỗi câu đúng là một viên gạch xây nên đỉnh núi tri thức của Kim!
9. Kim đang tiến bộ từng ngày — Anh Trai cũng đi lên từ những bước như thế!
10. Tuyệt vời! Trí óc của Kim hôm nay lại sắc bén hơn hôm qua!
11. Gai Con là phải lì đòn với thử thách — Kim làm được rồi đó!
12. Càng khó càng phải chiến. Kim vừa chứng minh điều đó!
13. Vượt ngàn chông gai bắt đầu từ vượt một bài toán. Kim giỏi lắm!
14. Kim ơi, sự kiên trì của em hôm nay đẹp như một sân khấu rực sáng!
15. Một Gai Con thực thụ không sợ sai, chỉ sợ bỏ cuộc. Kim không bỏ cuộc!
16. Hành trình vạn dặm Kim đã đi thêm một bước vững chắc!
17. Số học có khó mấy cũng thua lòng quyết tâm của Kim!
18. Kim đang viết nên câu chuyện vượt chông gai của riêng mình!
19. Cứ đà này, không đỉnh núi nào là Kim không chinh phục được!
20. Xuất sắc, Gai Con! Tự hào về Kim lắm — tiếp tục tỏa sáng nhé!

## 4. Thẻ cào trúng tiền sau MỖI PHẦN (~3 chặng)

Sau khi hoàn thành trọn một PHẦN (cả 3 chặng nhỏ trong phần đó → 4 lần cào trong toàn game), hiện một mini-game **THẺ CÀO**:
- Hiển thị một tấm thẻ cào phủ lớp "nhũ bạc" che số tiền. Kim dùng chuột/ngón tay miết/bấm để "cào" lớp phủ (hiệu ứng cào lộ dần, hoặc bấm nút "Cào thẻ" → hiệu ứng mở).
- Kết quả random số tiền theo tỉ lệ:
  - 1.000đ — tỉ lệ ~40%
  - 2.000đ — tỉ lệ ~35%
  - 5.000đ — tỉ lệ ~20%
  - 20.000đ — tỉ lệ ~5% (giải may mắn hiếm, có hiệu ứng đặc biệt: pháo giấy, chữ "MAY MẮN LỚN!")
- Sau khi cào: cộng số tiền vào TỔNG TÍCH LŨY, hiện dòng: **"Tổng số tiền Kim đã tích luỹ: 47.000đ"** (định dạng số có dấu chấm ngăn nghìn, ví dụ 47.000đ).
- Thông điệp kèm theo: đây là tiền thưởng trong game để Kim phấn đấu (không phải tiền thật trong app). Giọng vui, khích lệ.

## 5. Lưu tổng tiền — bật localStorage

- CHO PHÉP dùng `localStorage` CHỈ để lưu **tổng tiền tích lũy** (và nếu cần, tiến độ phần đã mở khóa).
- Khi Kim mở lại game (kể cả sau khi tắt trình duyệt), tổng tiền hiển thị lại đúng số đã tích trước đó ("nuôi heo đất").
- Có nút nhỏ kín đáo (vd trong góc/cài đặt) để **đặt lại tổng tiền về 0** — phòng khi chị muốn bắt đầu lại chu kỳ thưởng cho Kim. Nút này nên có xác nhận "Bạn chắc chắn muốn đặt lại?" tránh bấm nhầm.
- Nếu localStorage không dùng được vì lý do nào đó, game vẫn chạy bình thường (tổng tiền tính trong phiên), không được lỗi trắng màn hình.

## 6. Giữ nguyên (KHÔNG đổi)

- Cơ chế sinh đề ngẫu nhiên + kiểm thử đáp án đúng tuyệt đối (áp dụng cả cho 2 phần mới).
- Ô giải thích hiện ngay khi sai (đáp án đúng + cách làm + ví dụ đời thường), áp dụng cho cả phần mới.
- 6 câu chuyện lịch sử hiện sau các chặng tương ứng như v2 (giữ nguyên, không bỏ). Lưu ý: câu chuyện lịch sử và thẻ động viên random là HAI thứ khác nhau — câu chuyện vẫn theo đúng mạch như v2; thẻ động viên random là phần thưởng thêm sau mỗi chặng nhỏ.
- Một file index.html duy nhất, không framework, responsive, chạy mượt điện thoại.
- Giao diện trẻ trung hiện tại — chỉ thêm thành phần mới cho đồng bộ, không đổi toàn bộ.

## 7. Tiêu chí hoàn thành

- 4 phần × 3 chặng chạy đúng thứ tự, nhãn cấp lớp rõ ràng (3 phần "Ôn lớp 6", 1 phần "Lớp 7").
- 2 phần mới (ƯCLN/BCNN & chia hết; Toán đố) sinh đề ngẫu nhiên, đáp án đúng tuyệt đối, có giải thích khi sai.
- Sau mỗi chặng nhỏ: thẻ động viên random (1 trong 20 câu + 1 trong 36 ảnh), không vỡ khi thiếu ảnh.
- Sau mỗi phần: thẻ cào trúng tiền đúng tỉ lệ, cộng dồn tổng, hiện tổng tích lũy định dạng có dấu chấm nghìn.
- Tổng tiền được lưu qua các lần mở lại (localStorage), có nút đặt lại kèm xác nhận.
- 6 câu chuyện lịch sử vẫn còn, không bị mất khi thêm tính năng.
- Refresh ra đề mới, chạy mượt điện thoại.

# GAME SPEC v3.1 — Bổ sung (sửa lỗi + mở rộng câu chuyện)

> Bản vá tiếp nối GAME_SPEC_v3.md. SỬA TIẾP index.html, KHÔNG viết lại từ đầu. Gộp 2 việc trong một lần: (A) sửa lỗi thẻ cào không hiện, (B) thêm câu chuyện cho mọi chặng (đủ 12).

## A. SỬA LỖI — Thẻ cào trúng tiền không bao giờ xuất hiện

### Triệu chứng (để khoanh vùng)
- Người chơi chơi LIỀN MẠCH một lần (không tắt, không chơi lại) tới chặng 10.
- Sau mỗi chặng, thẻ động viên (ảnh random + câu khen) VẪN HIỆN BÌNH THƯỜNG.
- Thẻ cào trúng tiền KHÔNG xuất hiện lần nào, kể cả sau chặng 3, 6, 9 (cuối Phần 1, 2, 3). Tổng tiền vẫn 0đ.
- Kết luận: pipeline sau chặng vẫn chạy (thẻ động viên hiện được) → lỗi nằm ở khâu phát hiện "đã hoàn thành trọn một PHẦN" hoặc điều kiện kích hoạt thẻ cào. KHÔNG do localStorage/replay.

### Cần soi
1. Hàm xác định hoàn thành phần (isPartComplete) + điều kiện gọi thẻ cào (rollScratch/renderScratch) trong pipeline sau vượt chặng (advancePostFlow hoặc tương tự).
2. Biến/điều kiện chống-spam "_justCompletedPart" (hoặc tương tự): nhiều khả năng sai logic khiến thẻ cào bị chặn ngay cả lần đầu hoàn thành phần.
3. Phép so sánh chỉ số chặng/phần xác định "chặng vừa xong có phải chặng cuối của phần" — khả năng lệch chỉ số (off-by-one) nên không khớp tại chặng 3/6/9/12.

### Yêu cầu sau sửa
- Hoàn thành chặng cuối mỗi Phần (chặng 3, 6, 9, 12) → hiện thẻ cào đúng tỉ lệ: 1.000đ ~40%, 2.000đ ~35%, 5.000đ ~20%, 20.000đ ~5%. Cộng dồn tổng tiền, lưu localStorage.
- Giữ nguyên thẻ động viên và mọi thứ đang chạy đúng.
- Tự viết test mô phỏng chơi tuần tự 12 chặng, in ra xác nhận thẻ cào kích hoạt đúng 4 lần tại chặng 3/6/9/12 và tổng tiền cộng dồn đúng.
- Báo cáo: nguyên nhân gốc là gì, đã sửa thế nào.

## B. MỞ RỘNG — Mỗi chặng đều có một mẩu Lịch sử / Văn hóa / Địa lý

### Hiện trạng
Game chỉ có 6 câu chuyện gắn 6 chặng (3 chặng đầu Phần 1 + 3 chặng Phần 4). 6 chặng còn lại (toàn bộ Phần 2 và Phần 3) KHÔNG có câu chuyện → người chơi thấy lúc có lúc không.

### Yêu cầu
- GIỮ NGUYÊN 6 câu chuyện đang có (không sửa nội dung, không bỏ).
- THÊM 6 câu chuyện mới cho 6 chặng đang trống (Phần 2: 3 chặng; Phần 3: 3 chặng) → đủ 12 chặng đều có câu chuyện.
- Mỗi câu chuyện: 1 đoạn 5–8 câu, giọng kể hấp dẫn cho học sinh lớp 6–7, chính xác về dữ kiện, có 1 câu chốt nối nội dung với kiến thức Toán của chặng đó.
- Tinh thần: mỗi mẩu là một câu chuyện Lịch sử / Văn hóa / Địa lý, ưu tiên gắn lịch sử – văn hóa Việt Nam (người chơi thích sử). Không cần đảm bảo cả 3 yếu tố trong cùng một mẩu — mỗi chặng chọn góc phù hợp nhất với nội dung toán.
- Hiển thị NHẤT QUÁN: sau khi hoàn thành BẤT KỲ chặng nào (cả 12) đều hiện câu chuyện tương ứng, theo cùng cách trình bày "cuộn giấy/trang kể chuyện" như 6 chuyện cũ. Thứ tự pipeline sau chặng: Summary → thẻ động viên (ảnh + câu khen random) → câu chuyện của chặng → (nếu là chặng cuối phần) thẻ cào.

### Nội dung 6 câu chuyện MỚI (gắn đúng chặng)

PHẦN 2 — Ôn lớp 6: ƯCLN, BCNN & Chia hết
- **Chặng 4 (dấu hiệu chia hết, ước–bội):** Cách người xưa chia thời gian theo chu kỳ — lịch âm phương Đông và việc tính tháng đủ/thiếu, năm nhuận; liên hệ nông lịch Việt Nam (xem ngày mùa, con nước). Chốt: chia hết và bội số là nền của cách tính lịch, mùa vụ cha ông dùng hàng nghìn năm.
- **Chặng 5 (số nguyên tố, phân tích thừa số):** Eratosthenes ở thư viện Alexandria và "cái sàng" lọc số nguyên tố; ông cũng là người đo được chu vi Trái Đất (yếu tố địa lý). Chốt: số nguyên tố là "viên gạch gốc" tạo nên mọi số, như cách phân tích thừa số.
- **Chặng 6 (ƯCLN, BCNN):** Thuật toán Euclid trong sách "Cơ sở" — một trong những thuật toán cổ nhất loài người vẫn dùng; truyền qua thế giới Hồi giáo trung đại tới ngày nay. Chốt: cách tìm ƯCLN của Euclid hơn 2000 năm vẫn đúng nguyên.

PHẦN 3 — Ôn lớp 6: Toán đố
- **Chặng 7 (toán đố số & phép tính):** Toán đố dân gian Việt Nam — bài "Trăm trâu trăm cỏ" (trâu đứng, trâu nằm, trâu già) hoặc "vừa gà vừa chó bó lại cho tròn"; nét văn hóa truyền miệng. Chốt: ông cha ta đã ra đề toán đố vui để rèn trí từ xa xưa.
- **Chặng 8 (toán đố phân số, %):** Toán trong đời sống buôn bán xưa — chợ phiên vùng cao, cân đong đo đếm, chia phần thóc lúa ở làng quê Việt; địa lý các phiên chợ. Chốt: phân số và tỉ lệ sinh ra từ nhu cầu chia – đổi – buôn bán rất đời thường.
- **Chặng 9 (toán đố ƯCLN/BCNN):** Tổ chức quân đội thời Trần — chia quân thành các đội đều nhau, sắp đặt đội hình trong ba lần kháng chiến chống Mông–Nguyên (gắn Sử lớp 7, mạch nối lịch sử Việt Nam như các chuyện cũ). Chốt: tư duy chia đều, bội chung từng giúp cha ông tổ chức binh lực giữ nước.

## C. Giữ nguyên (không đổi)
- Cơ chế sinh đề ngẫu nhiên + đáp án đúng tuyệt đối; ô giải thích khi sai; localStorage lưu tiền; 4 phần × 3 chặng; giao diện hiện tại.
- Một file index.html, không framework, responsive, chạy mượt điện thoại.

## D. Tiêu chí hoàn thành
- Thẻ cào kích hoạt đúng 4 lần tại chặng 3/6/9/12, tỉ lệ đúng, cộng dồn + lưu đúng (có test in kết quả).
- Cả 12 chặng đều hiện câu chuyện sau khi hoàn thành; 6 chuyện cũ giữ nguyên, 6 chuyện mới đúng nội dung trên.
- Không hỏng tính năng cũ; refresh ra đề mới; chạy mượt điện thoại.
- Báo cáo rõ: nguyên nhân lỗi thẻ cào + cách sửa; danh sách 6 câu chuyện đã thêm.

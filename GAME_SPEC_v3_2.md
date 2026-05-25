# GAME SPEC v3.2 — Bổ sung (thẻ cào không giới hạn + mở rộng database câu hỏi)

> Bản vá tiếp nối v3.1. SỬA TIẾP index.html, KHÔNG viết lại từ đầu. Gộp 2 việc.

## A. Thẻ cào — luôn trao mỗi khi hoàn thành một PHẦN

### Hiện trạng
Điều kiện chống-spam hiện tại chặn thẻ cào lần đầu trao xong sẽ không trao lại — kể cả khi người chơi học lại. Với game học cho trẻ, học đi học lại là điều cần khuyến khích, nên không hợp lý.

### Yêu cầu sửa
- BỎ điều kiện "chỉ trao lần đầu hoàn tất phần" (logic chống-spam _justCompletedPart hoặc tương tự).
- THAY bằng: **MỖI lần hoàn thành chặng cuối của một Phần (chặng 3, 6, 9, 12) → trao thẻ cào**. Kể cả khi phần đó đã từng hoàn thành trước đó.
- Tiền vẫn cộng dồn vào tổng và lưu localStorage như cũ. Tỉ lệ trao giải giữ nguyên: 1.000đ ~40%, 2.000đ ~35%, 5.000đ ~20%, 20.000đ ~5%.
- Logic mở khóa phần tiếp theo, đánh dấu "đã hoàn tất" trên bản đồ → giữ nguyên (không bị ảnh hưởng).
- Không cần giới hạn theo ngày/phiên — đơn giản, mỗi lần xong phần là cào.

### Test cần làm
Mô phỏng chơi:
- Lần 1: qua chặng 1→2→3 → thẻ cào kích hoạt (lần 1).
- Quay lại chơi lại Phần 1 từ đầu → tới chặng 3 lần nữa → thẻ cào kích hoạt (lần 2).
- Tổng tiền cộng dồn của cả 2 lần.
In ra xác nhận cả 2 lần đều fire scratch + tổng tiền cộng đúng.

## B. Mở rộng database câu hỏi — đa dạng dạng bài, không chỉ đổi số

### Hiện trạng
Mỗi chặng có 1–4 generator (khuôn sinh đề). Chơi lại nhiều lần có cảm giác "chỉ đổi số, kiểu bài giống nhau" → nhàm.

### Yêu cầu mở rộng
- **Tăng lên 6–8 generator khác nhau** cho MỖI chặng trong 12 chặng. Mỗi generator là một *dạng bài* riêng (cách đặt câu hỏi khác nhau), không chỉ đổi số.
- Khi sinh đề cho mỗi câu hỏi: **random chọn generator** trong kho 6–8 của chặng → đảm bảo mỗi lượt chơi pha trộn nhiều dạng, không lặp dạng quá nhiều lần liên tiếp.
- GIỮ NGUYÊN: độ khó hiện tại (vẫn ở mức lớp 6 / lớp 7 tương ứng), số câu mỗi chặng, cơ chế giải thích khi sai, đáp án đúng tuyệt đối.

### Hướng đa dạng cho từng phần (gợi ý, Claude Code có thể bổ sung thêm)

**Phần 1 — Ôn lớp 6: Số học** (3 chặng)
- Chặng 1 (bảng cửu chương & tính nhẩm): hỏi tích, hỏi thừa số còn thiếu (a × ? = c), hỏi thương, hỏi phép cộng/trừ nhanh có số âm, điền dấu so sánh, chọn kết quả đúng trong nhiều phương án...
- Chặng 2 (số nguyên & quy tắc dấu): cộng/trừ/nhân/chia số nguyên, bỏ ngoặc có dấu trừ, dãy phép tính có ngoặc, so sánh hai biểu thức, tìm x đơn giản (x + a = b)...
- Chặng 3 (phân số & thập phân lớp 6): rút gọn phân số, quy đồng, so sánh phân số, cộng/trừ/nhân/chia phân số, đổi phân số → thập phân, đổi thập phân → phân số, tìm phân số bằng phân số đã cho...

**Phần 2 — Ôn lớp 6: ƯCLN/BCNN & Chia hết** (3 chặng)
- Chặng 4 (chia hết, ước–bội): chia hết cho 2/3/5/9, tìm tất cả ước của một số, kiểm tra X có là bội của Y không, tìm bội nhỏ nhất thỏa điều kiện, tìm số thỏa nhiều dấu hiệu chia hết cùng lúc...
- Chặng 5 (số nguyên tố, phân tích thừa số): kiểm tra số nguyên tố, đếm ước của một số, phân tích thừa số nguyên tố (dạng tích lũy thừa), chọn số nguyên tố trong nhóm, tìm số nguyên tố giữa A và B...
- Chặng 6 (ƯCLN, BCNN): tìm ƯCLN của 2 số, BCNN của 2 số, ƯCLN/BCNN của 3 số, áp dụng ƯCLN/BCNN vào tình huống (chia đều, gặp nhau)...

**Phần 3 — Ôn lớp 6: Toán đố** (3 chặng)
- Chặng 7 (toán đố số & phép tính): tổng-hiệu, gấp-kém, thêm-bớt, so sánh tuổi/tiền/đồ vật, chia kẹo theo điều kiện, đếm số học sinh nam/nữ, bài toán trồng cây trên đoạn đường...
- Chặng 8 (toán đố phân số & %): ăn/dùng một phần còn lại bao nhiêu, giảm giá %, tăng giá %, đi được bao nhiêu phần quãng đường, lớp có bao nhiêu % nữ, lãi suất tiết kiệm đơn giản, công việc làm chung-làm riêng cơ bản...
- Chặng 9 (toán đố ƯCLN/BCNN): chia đều nhiều nhóm, xếp hàng đều cột, đèn nhấp nháy cùng lúc, xe buýt cùng rời bến, lát gạch hình vuông lớn nhất...

**Phần 4 — Lớp 7: Số hữu tỉ** (3 chặng)
- Chặng 10 (cộng/trừ/nhân/chia số hữu tỉ): bốn phép tính với phân số âm/dương, tìm x trong phương trình đơn giản, so sánh hai số hữu tỉ, tính giá trị biểu thức, chọn dạng tối giản...
- Chặng 11 (lũy thừa & thứ tự phép tính): tính lũy thừa, nhân/chia hai lũy thừa cùng cơ số, lũy thừa của lũy thừa, biểu thức có ngoặc nhiều tầng, áp dụng quy tắc dấu ngoặc với lũy thừa...
- Chặng 12 (biểu diễn thập phân số hữu tỉ): nhận diện thập phân hữu hạn / vô hạn tuần hoàn, đổi phân số → thập phân, đổi thập phân → phân số tối giản, sắp xếp thứ tự nhiều số thập phân/phân số...

### Yêu cầu chất lượng (quan trọng — không được lùi)
- **Đáp án đúng tuyệt đối** cho TOÀN BỘ generator mới và cũ. Test kiểm thử như các lần trước: vài nghìn lượt mỗi generator, đối chiếu bằng cách tính độc lập (gcd/lcm chuẩn, công thức đối chiếu, v.v.).
- 4 phương án trắc nghiệm (1 đúng + 3 mồi) **không trùng nhau**, không bị trùng đáp án đúng do tính nhầm.
- Phần giải thích khi sai vẫn áp dụng đầy đủ cho mọi generator mới (đáp án đúng + cách làm + ví dụ đời thường khi phù hợp).
- Khi pha trộn nhiều generator trong một lượt chơi: cố gắng không cho 2 câu cùng dạng nằm liền kề nhau (xáo trộn đều).

## C. Giữ nguyên (không đổi)
- Cấu trúc 4 phần × 3 chặng, nhãn lớp, 12 câu chuyện lịch sử (cả 6 cũ + 6 mới ở v3.1), thẻ động viên ảnh + câu khen random sau mỗi chặng, localStorage lưu tiền, nút Đặt lại tiền có confirm.
- Giao diện hiện tại, 1 file index.html, không framework, responsive.

## D. Tiêu chí hoàn thành
- Thẻ cào: kích hoạt MỖI lần hoàn thành chặng cuối phần, kể cả khi đã từng qua phần đó trước. Test mô phỏng chơi 2 lần phần 1 → kích hoạt 2 lần, tổng tiền cộng dồn đúng.
- Database: mỗi chặng có 6–8 generator dạng bài khác nhau, sinh đề random pha trộn, đáp án đúng tuyệt đối (test kiểm chứng), 4 phương án không trùng.
- Mọi tính năng cũ không hỏng: 12 chuyện, thẻ động viên, giải thích khi sai, localStorage, mở khóa tuần tự.
- Báo cáo: số generator mỗi chặng trước/sau, cách bỏ điều kiện chống-spam thẻ cào, kết quả test.

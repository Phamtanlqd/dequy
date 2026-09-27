
# LMS ONLINE — KỸ THUẬT ĐỆ QUY

## 1. Cấu trúc
- index.html: Trang chủ + hồ sơ học sinh
- lesson01.html: Phiếu 1–4
- lesson02.html: Phiếu 5–8 + AI Challenge
- lesson03.html: Phiếu 9–12 + HSG Challenge
- submit.html: kiểm tra, lưu, nộp, xuất JSON
- teacher.html: hồ sơ năng lực
- style.css: giao diện
- app.js: lưu dữ liệu bằng localStorage

## 2. Chạy trên GitHub Pages
1. Tạo repository mới.
2. Upload toàn bộ file trong thư mục này.
3. Vào Settings → Pages.
4. Chọn Deploy from a branch → main → /root.
5. Mở URL GitHub Pages.

Không cần server riêng để chạy bản cơ bản.

## 3. Lưu bài
Dữ liệu được lưu bằng localStorage trên thiết bị/trình duyệt của học sinh.
Điều này phù hợp để học sinh đang làm bài không mất dữ liệu khi tải lại trang.

## 4. Nộp bài tập trung
Nếu muốn nhiều học sinh gửi về một Google Sheet:
- tạo Google Apps Script Web App;
- nhận POST JSON;
- ghi dữ liệu vào Google Sheets;
- dán URL Web App vào API_ENDPOINT trong submit.html.

Không đưa API key của mô hình AI vào GitHub Pages.

## 5. AI Challenge
Website chỉ cung cấp prompt, vùng nhập câu trả lời AI và checklist kiểm chứng.
Học sinh phải:
Hỏi AI → đối chiếu tài liệu → tìm điểm đúng/thiếu → kết luận → phản biện bằng bằng chứng thuật toán.

## 6. Nguồn thiết kế
Nội dung bám theo PowerPoint chuyên đề “KỸ THUẬT ĐỆ QUY — Từ Tư duy Đệ quy đến Dynamic Programming”, gồm:
Recursive Thinking, Base Case, Recursive Case, Call Tree, Memoization, Dynamic Programming, Divide & Conquer, Hanoi, Backtracking, N-Queens, AI Challenge và NLS.

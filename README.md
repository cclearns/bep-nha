# Bếp Nhà · Hôm nay ăn gì?

Website tĩnh (một file `index.html`), giao diện tiếng Việt, responsive. Mở trực tiếp bằng trình duyệt hoặc đưa lên GitHub Pages / Netlify.

## Cấu trúc
- `index.html` — bản đã build, dùng được ngay.
- `src/ingredients.txt` — danh mục nguyên liệu (kcal, đạm / 100 g, khu vực chợ, thẻ dinh dưỡng).
- `src/recipes/*.txt`, `src/families.py` — công thức (nguyên liệu có định lượng, các bước, mẹo, thay thế).
- `src/template.html`, `src/style.css`, `src/app.js` — giao diện.
- `build.py` — kiểm tra dữ liệu, tự tính calo/đạm, gắn thẻ chu kỳ/tâm trạng, đóng gói `index.html`.

## Build lại
    python3 build.py

Sửa/thêm món: thêm một dòng vào `src/recipes/*.txt` theo định dạng
`Tên|nhóm|cách|vai|phút|khó|số phần|id:lượng id:lượng …|bước 1; bước 2; …|mẹo|thay thế` rồi chạy `build.py`.
Calo được tính tự động từ nguyên liệu, danh sách đi chợ cũng lấy từ đó.

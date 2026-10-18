---
name: chu-dong-dieu-phoi
description: Khung lập kế hoạch cá nhân và điều phối team theo kết quả. Dùng khi cần lập plan, phân loại ưu tiên, viết task, xác định Done/deadline, tổ chức multiple tasks, đặt mốc catch-up, điều phối resource, hoặc chuẩn bị weekly planning với team.
---

# Skill: Chủ động điều phối theo kết quả

## Mục tiêu

Biến một danh sách việc hoặc yêu cầu mơ hồ thành kế hoạch có kết quả đầu ra rõ ràng, owner, resource, mốc catch-up và thời điểm Done cụ thể.

Nguyên tắc cốt lõi:

> Chủ động → hình dung kết quả cuối → hiểu rõ việc cần đạt → catch-up đúng lúc → điều phối chính xác.

## Khi được gọi

Dùng skill này khi người dùng cần:

- Lập kế hoạch cá nhân hoặc kế hoạch tuần.
- Sắp xếp nhiều task theo mức độ gấp và quan trọng.
- Viết lại task cho rõ ràng, có thể hình dung kết quả.
- Xác định Done, deadline ngày/giờ, owner và resource.
- Lập nhịp catch-up hoặc cơ chế theo dõi tiến độ.
- Điều phối nhiều người, nhiều dependency hoặc nhiều dự án.
- Nhận diện và xử lý “việc không tên”/unplanned work.
- Chuẩn bị weekly planning cùng team.

## Quy trình thực hiện

### 1. Hình dung kết quả cuối

Trước khi lập task, xác định:

- Kết quả cuối cần nhìn thấy là gì?
- Ai là người nhận hoặc sử dụng kết quả?
- Kết quả đó tạo ra thay đổi gì?
- Điều kiện nào chứng minh đã hoàn thành?

Không bắt đầu bằng danh sách hành động nếu chưa rõ outcome.

### 2. Làm rõ Done

Mỗi task phải có:

- Kết quả đầu ra cụ thể.
- Tiêu chí Done có thể kiểm tra.
- Ngày và giờ hoàn thành.
- Owner chịu trách nhiệm chính.
- Resource hoặc dependency cần thiết.

Nếu thiếu ngày/giờ hoặc tiêu chí kiểm tra, coi task là chưa đủ rõ.

### 3. Ưu tiên First things first

Phân loại theo hai trục:

- Gấp.
- Quan trọng.

Nhưng phải xem đây là ưu tiên tương đối, không cố định. Đánh giá lại theo:

- Thời điểm hiện tại.
- Team và resource đang có.
- Dependency.
- Tác động tới dự án.
- Deadline và rủi ro.
- Việc mới phát sinh.

Nếu có xung đột, giải thích ngắn gọn vì sao task này đứng trước task kia.

### 4. Tách multiple tasks thành 3 lớp

#### Lớp A — Xây

Bao gồm planning, quản lý, phân bổ resource, xác định output, owner, deadline và mốc catch-up.

#### Lớp B — Vận hành

Bao gồm điều phối, theo dõi tiến độ, tối ưu resource, gỡ blocker và điều chỉnh ưu tiên.

#### Lớp C — Giải quyết việc không tên

Bao gồm việc phát sinh, vấn đề chưa có owner, khoảng trống giữa các team, blocker chưa được định nghĩa và rủi ro bất ngờ.

Không để lớp C chiếm toàn bộ thời gian của lớp A và B; phải ghi nhận và dành capacity phù hợp.

### 5. Đặt catch-up đúng thời điểm

Catch-up không phải chỉ hỏi “đã làm chưa”. Mỗi mốc cần kiểm tra:

- Kết quả trung gian đã đạt chưa?
- Có blocker hoặc dependency mới không?
- Scope có thay đổi không?
- Cần điều phối lại owner/resource không?
- Có còn khả năng đạt Done đúng ngày/giờ không?

Đặt catch-up theo rủi ro và dependency, không đặt máy móc theo lịch.

## Template viết task

```text
Task: [động từ + kết quả cần đạt]

Kết quả cuối:
Done khi:
Deadline: [ngày, giờ, timezone]
Owner:
Người/phần việc phụ thuộc:
Resource cần có:
Mốc catch-up:
Rủi ro/blocker:
Next action:
```

## Template weekly planning

```text
## Weekly planning — [tuần/ngày]

### Kết quả cuối tuần
- [Outcome 1]
- [Outcome 2]

### Ưu tiên tương đối
1. [Task] — vì sao đứng trước
2. [Task] — vì sao đứng sau

### Lớp xây
- Planning:
- Quản lý:
- Resource:

### Lớp vận hành
- Điều phối:
- Tối ưu:
- Blocker cần gỡ:

### Việc không tên
- Việc phát sinh/rủi ro:
- Capacity dự phòng:

### Owner và thời điểm Done
| Kết quả | Owner | Done khi | Deadline |
|---|---|---|---|

### Mốc catch-up
- [Ngày/giờ] — kiểm tra [kết quả trung gian]

### Điều kiện kết thúc tuần
- [Tiêu chí chứng minh tuần đã Done]
```

## Cách phản hồi

- Nếu đầu vào còn mơ hồ, trước tiên chuyển nó thành outcome và hỏi tối đa những câu hỏi thực sự chặn việc lập kế hoạch.
- Nếu có thể suy luận an toàn, chủ động dựng bản plan nháp thay vì chỉ hỏi lại.
- Luôn nêu rõ giả định, unknown và blocker.
- Không coi “đã tạo task” là Done; Done phải gắn với kết quả quan sát được.
- Với kế hoạch team, ưu tiên làm rõ owner, resource, dependency, catch-up và deadline ngày/giờ.
- Cuối cùng luôn có một `Next action` nhỏ và cụ thể.

## Checklist nhanh

- [ ] Đã hình dung kết quả cuối.
- [ ] Đã xác định Done có thể kiểm tra.
- [ ] Đã có ngày và giờ deadline.
- [ ] Đã phân loại gấp/quan trọng theo bối cảnh hiện tại.
- [ ] Đã tách xây/vận hành/việc không tên.
- [ ] Đã xác định owner và resource.
- [ ] Đã đặt catch-up đúng thời điểm.
- [ ] Đã ghi blocker, dependency và unknown.
- [ ] Đã chốt next action.

# Xây dụng hệ thống Cloud mô phỏng trang đăng ký môn học có thể tự scale up, scale down
# Sinh viên thực hiện: Nhóm 29_1
 Phạm Ngọc Hưng		18110127 </br>
	Nguyễn Dương Đạt		18110092 </br>
	Nguyễn Lâm Gia Khang	18110132
# Ứng dụng
Việc ứng dụng Auto Scaling cho trang đăng ký môn học giúp các trường sử dụng có thể tiết kiệm được chi phí tốt nhất cho nhà trường. Tình trạng trong một học kỳ chỉ đăng ký môn học một lần duy nhất và 1 năm chỉ có 2 lần. Nhưng vào những ngày đó lượng học sinh, sinh viên truy cập vào trang web để đăng ký rất đông, nếu nhà trường đầu tư cho việc nâng cấp mạng để đáp ứng cho mỗi kì đăng ký môn học thì các ngày khác lượng truy cập rất ít so với ngày đăng ký môn. Điều đó sẽ dẫn tới việc lãng phí tiền bạc.<br>
Việc sử dụng Auto Scaling sẽ giúp cho trang web có thể dựa vào lượng truy cập để tối ưu hoá đường truyền bằng cách tạo ra các instance để giúp cân bằng tải (load balancer) cho trang web từ đó có thể đáp ứng được lúc có nhiều sinh viên truy cập vào và lúc chỉ có ít sinh viên.
# Công cụ và công nghệ sử dụng
- ReactJS.
- EC2 của AWS.
- DynamoDB
# Cách cài đặt
-	B1: Lấy thông tin AWS
 ![alt](https://res.cloudinary.com/ute18110127/image/upload/v1639643696/DB/1_pzfcrw.png)
-	B2: SSH vào instance EC2
 ![alt](https://res.cloudinary.com/ute18110127/image/upload/v1639643706/DB/2_az2gda.png)
-	Chạy lệnh chạy website đăng ký
Cú pháp: `sh deploy.sh (1) (2) (3)`
 ![alt](https://res.cloudinary.com/ute18110127/image/upload/v1639643706/DB/3_rmzbpx.png)
Chú thích: thông tin (1) và (2) và (3) lấy ở Bước 1
# Cách cài đặt từ pull docker
-	B1: docker pull 18110127/register-aws:241121

-	B2:sudo docker run -it -d --name register-aws -e REACT_APP_BASE_API=$MY_IP -e PORT=3000 -e aws_access_key_id=$1 -e aws_secret_access_key=$2 -e aws_session_token=$3 --restart=always -p 3000:3000 18110127/register-aws:241121

$MY_IP --> địa chỉ chạy trangweb
$1, $2, $3 --> 3 key lấy từ lab

 # Link Config Auto Scaling
 https://youtu.be/kyyBlH5LkVc





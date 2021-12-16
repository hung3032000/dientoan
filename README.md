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

 





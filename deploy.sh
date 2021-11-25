#!/bin/bash
echo "aws_access_key_id: $1";
echo "aws_secret_access_key: $2";
echo "aws_session_token: $3";
ls
MY_IP=`curl ifconfig.me`
echo $MY_IP
echo "Start deploy container - [START]";
CONTAINER_NAMES=`sudo docker ps -aqf "name=register-aws" --format "{{.Names}}"`
echo $CONTAINER_NAMES
if [ -n "${CONTAINER_NAMES}" ]
then
    DOCKER_STOP=`sudo docker stop register-aws`
    DOCKER_RM=`sudo docker rm register-aws`
fi
# DOCKER_BUILD=`sudo docker build --tag 18110127/register-aws:241121 .`
DOCKER_PULL=`sudo docker pull 18110127/register-aws:241121`
DOCKER_RUN=`sudo docker run -it -d --name register-aws -e REACT_APP_BASE_API=$MY_IP -e PORT=3000 -e aws_access_key_id=$1 -e aws_secret_access_key=$2 -e aws_session_token=$3 --restart=always -p 3000:3000 18110127/register-aws:241121`
DOCKER_PRUNE=`sudo docker image prune -a --force`
echo "Finish deploy container - [END]";

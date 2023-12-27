#! /bin/bash

echo "***** start *****"

dockerOperate(){
    echo "docker build start"
    docker build -t company .
    docker stop company 
    docker rm company
    docker run -d --name company -p 3000:3000 company
}

dockerOperate

echo "***** end *****"

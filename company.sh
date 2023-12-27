#! /bin/bash

echo "***** start *****"

gitOperate(){
    git pull
}

dockerOperate(){
    echo "docker build start"
    docker build -t company .
    docker stop company 
    docker run -d --name company -p 3000:3000 company
}

gitOperate

dockerOperate

echo "***** end *****"

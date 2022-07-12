## Creating a Docker Image

```
$ docker build .
```

## Build with Giving a name for Docker Image REPOSITORY

```
$ docker build -t <DOCKER IMAGE REPOSITORY NAME> .
```

```ex
$ docker build -t node-app-image .
$ docker image ls
REPOSITORY       TAG       IMAGE ID       CREATED         SIZE
node-app-image   latest    938d86d9648b   4 seconds ago   861MB
<none>           <none>    f16678121606   4 minutes ago   861MB
```

## See Docker Image

```
$ docker image ls

REPOSITORY   TAG       IMAGE ID       CREATED              SIZE
<none>       <none>    838da49ec16c   9 seconds ago        861MB
<none>       <none>    f16678121606   About a minute ago   861MB
```

## Delete a Docker Image

```
$ docker image rm <IMAGE ID>
```

## Docker run

```
$ docker run -d --name <DOCKER CONTAINER NAME> <DOCKER IMAGE NAME>
```

```ex
$ docker run -d --name node-app node-app-image

$ docker ps
CONTAINER ID   IMAGE            COMMAND                  CREATED         STATUS         PORTS      NAMES
af6fd9e73072   node-app-image   "docker-entrypoint.s…"   7 seconds ago   Up 6 seconds   3000/tcp   node-app
```

-d: works at background
--name: name

## Delete Docker container

```
$ docker rm <DOCKER IMAGE NAME> -f
```

```ex
$ docker rm node-app -f

$ docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
```

## PORT

```
$ docker run -p 3000:3000 -d --name node-app node-app-image
<!-- option -p <LOCALHOST>:<CONTAINER PORT> -->
```

![](https://files.slack.com/files-pri/T09UYHA6T-F03NXT9L151/____________________________0004-07-10_16.39.35.png)

## Be in Docker Container

```
$ docker exec -it <CONTAINER NAME> bash
```

```ex
$ docker exec -it node-app bash
root@805fd6210616:/app#
```

## Volume

```
$ docker run -v $(pwd):/app -p 4000:3000 -d --name node-app node-app-image

-v <Path to the location>:<Path to Folder on container>
```

これをすると Docker Image 内の index.js がローカル内同様反映される。
→ need to restart the node process

### Read only

```
docker run -v $(pwd):/app:ro -v $(pwd):/app/node_modules -p 4000:3000 -d --name node-app node-app-image
```

## Delete volume

Delete All

```
$ docker volume ls
DRIVER    VOLUME NAME
local     a90b94f1055d5bcc84e949d87739da4382c7fe49fcdec7cae8cb96e2a99979c9
local     d4c21d1c958b7b019323db1d538c0569bc7695b1643e2b6d4367bfed9e02c5b8
local     e2f86419af264d299fc4d0f9bbf70a5239a9d83167ca4c8ab8774b322cb7f4dd
$ docker volume prune
Are you sure you want to continue? [y/N] y
Deleted Volumes:
a90b94f1055d5bcc84e949d87739da4382c7fe49fcdec7cae8cb96e2a99979c9
e2f86419af264d299fc4d0f9bbf70a5239a9d83167ca4c8ab8774b322cb7f4dd

$ docker volume ls
DRIVER    VOLUME NAME
local    d4c21d1c958b7b019323db1d538c0569bc7695b1643e2b6d4367bfed9e02c5b8
```

## Dekete a container and volume

```
$ docker volume ls
DRIVER    VOLUME NAME
local    d4c21d1c958b7b019323db1d538c0569bc7695b1643e2b6d4367bfed9e02c5b8

$ docker rm node-app -fv

$ docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
$ docker volume ls
DRIVER    VOLUME NAME
```

force quit and volume

## Docker compose up and down

```
$ docker-compose up -d
$ docker-compose down
```

## If you change Dockerfile

```
$ docker-compose up -d --build
```

## yml と一緒に up/down 必要

UP

```
$ docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
```

DOWN

```
$ docker-compose -f docker-compose.yml -f docker-compose.dev.yml down -v
```

## Be in the mongo container

```
<!-- Up -->
$ docker exec -it node-docker-mongo-1 mongo -u "yuki" -p "mypassword"
<!-- Down -->
$ docker-compose -f docker-compose.yml -f docker-compose.dev.yml down
```

Don't put -v when you use named volumes(at this time we use mongo-db), because using -v, we will automatically delete anonymous volume.(node_modules の場合は消えてもいいけど、database は永続してほしいから)

## Delete volumes

prune: Remove all unused local volumes
立ち上げてから prune すると、良い。

```
$ docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
$ docker volume prune
WARNING! This will remove all local volumes not used by at least one container.
Are you sure you want to continue? [y/N] y
Deleted Volumes:
ce0a1e87658be9a6163720f23249132f00742af9abb849786962a25787ac878b
6fc2c504ea610bb9e0618ed4075a8347730c6d77e233d3b934d9e36f37f45ae5
03461641e8e4f3beb274b713cb4f85a8e0274188574589259d52151fe32a9cd7
9b37e2ec1ebb672759cc6734c07b1f8dfadf2e055d4db89de5e1e04306578cb2
21e75f482500818c926c0ff55997f6cfbad7309d31d27bc368685bb2e5062af7
48e1202ce2f576c858dac1a2659796edbed2a2c0af71b6c690be4769b4f99eb8
f89b4502816673cfb3ef61f565c6655312eb85cd4c5d318cd4981d4fc307bf52

$ docker volume ls
DRIVER    VOLUME NAME
local     5da4927e6d5e76d1c35a04e68d883dd4ff74e961699bbf6a453d2cda7b4c94c9
local     8d8af72e4df472a0a2b40caa49654e9ed273d19ccbf0f5353879f7f52fb1f6d0
local     node-docker_mongo-db
```

## Display networks

上二つはデフォルト

```
$ docker network ls
NETWORK ID     NAME                  DRIVER    SCOPE
c63e283fce3a   bridge                bridge    local
a09cbff7e16e   host                  host      local
6992cd0e5d4f   node-docker_default   bridge    local
fd7376f04552   none                  null      local
```

## 監視

```
$ docker logs node-docker-node-app-1 -f
ズラズラー
```

## ip address 証明

node-app に入って ping すると mongo の ip アドレス(192.168.48.2)が取れる

```
$ docker exec -it node-docker-node-app-1 bash
root@8a518674096a:/app# ping mongo
PING mongo (192.168.48.2) 56(84) bytes of data.
64 bytes from node-docker-mongo-1.node-docker_default (192.168.48.2): icmp_seq=1 ttl=64 time=0.832 ms
64 bytes from node-docker-mongo-1.node-docker_default (192.168.48.2): icmp_seq=2 ttl=64 time=0.295 ms
64 bytes from node-docker-mongo-1.node-docker_default (192.168.48.2): icmp_seq=3 ttl=64 time=0.165 ms
```

## inspect Docker network

```
$ docker network inspect node-docker_default
[
    {
        "Name": "node-docker_default",
        "Id": "6992cd0e5d4fec4fe90804f7541ee996a8e60375ddd77e64c7e4b12cfb732747",
        "Created": "2022-07-12T09:48:18.305331675Z",
        "Scope": "local",
        "Driver": "bridge",
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "default",
            "Options": null,
            "Config": [
                {
                    "Subnet": "192.168.48.0/20",
                    "Gateway": "192.168.48.1"
                }
            ]
        },
        "Internal": false,
        "Attachable": false,
        "Ingress": false,
        "ConfigFrom": {
            "Network": ""
        },
        "ConfigOnly": false,
        "Containers": {
            "8a518674096a96cf8c10e4a091d714bf20b064ba1f9f89f30a88d763dd44a43a": {
                "Name": "node-docker-node-app-1",
                "EndpointID": "36292ee1cadfe94df796933dd6a4a90897d2ffd0c5e250e8697419e4cc7fcad0",
                "MacAddress": "02:42:c0:a8:30:03",
                "IPv4Address": "192.168.48.3/20",
                "IPv6Address": ""
            },
            "b77ccd9d9342c4e83f016cf347b07602a880a7de756a03e6a61acd46b95ca8da": {
                "Name": "node-docker-mongo-1",
                "EndpointID": "87c3f5f841d10fabe380c97220583c8e9327e227aaa022df17f2094e0bd56ff2",
                "MacAddress": "02:42:c0:a8:30:02",
                "IPv4Address": "192.168.48.2/20",
                "IPv6Address": ""
            }
        },
        "Options": {},
        "Labels": {
            "com.docker.compose.network": "default",
            "com.docker.compose.project": "node-docker",
            "com.docker.compose.version": "2.6.1"
        }
    }
]
```

# inside of exec DB

```
$ show dbs
admin   0.000GB
config  0.000GB
local   0.000GB

$ use mydb
switched to db mydb

$ db.books.insert({"name": "harry potter"})
WriteResult({ "nInserted" : 1 })


```

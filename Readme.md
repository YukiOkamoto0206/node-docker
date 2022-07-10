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

## fdsaf

UP

```
$ docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
```

DOWN

```
$ docker-compose -f docker-compose.yml -f docker-compose.dev.yml down -v
```

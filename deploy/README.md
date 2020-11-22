# Deploy

You can build Docker image locally like that (positionned in root directory):
```bash
docker build -t prismarinejs/flying-squid . -f deploy/Dockerfile
```

```bash
docker run -p 25565:25565 -v $(pwd)/config:/config --name my-flying-squid --rm prismarinejs/flying-squid
```

or custom config folder path

```bash
docker run -p 25565:25565 -v $(pwd)/foo:/bar --name my-flying-squid --rm prismarinejs/flying-squid -c /bar
```

[docker-compose](https://docs.docker.com/compose/) is useful to quickly launch & stop a single container with a specific configuration, for a more production purpose, it is more frequent to deploy your container(s) in [Kubernetes](https://kubernetes.io) with [Helm](https://helm.sh).

```bash
docker-compose -f deploy/docker-compose.yaml up
```
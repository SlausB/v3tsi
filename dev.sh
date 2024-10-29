docker-compose down

docker-compose up -d --build --force-recreate --renew-anon-volumes --remove-orphans
docker-compose exec v3ts bash
docker-compose down

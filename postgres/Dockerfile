FROM postgres:10
EXPOSE 5432

COPY seed.sql /docker-entrypoint-initdb.d/
VOLUME /var/lib/postgresql/data

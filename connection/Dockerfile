FROM mysql:5.5

# Add a database
ENV MYSQL_DATABASE test_shopee
# Add the content of the sql-scripts/ directory to your image
# All scripts in docker-entrypoint-initdb.d/ are automatically
# executed during container startup

COPY ./test_shopee.sql /docker-entrypoint-initdb.d/test_shopee.sql

EXPOSE 3306


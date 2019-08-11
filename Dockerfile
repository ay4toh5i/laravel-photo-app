FROM php:7.3.8-fpm-alpine3.9
ENV COMPOSER_ALLOW_SUPERUSER 1
RUN apk update \
    && apk upgrade \
    && apk --no-cache add \
    bash \
    && docker-php-ext-install  bcmath \
    pdo_mysql \
    && curl -sS https://getcomposer.org/installer | php \
    && mv -v composer.phar /usr/local/bin/composer \

FROM php:7.3.8-fpm-alpine3.9
ENV COMPOSER_ALLOW_SUPERUSER 1
RUN apk update \
    && apk upgrade \
    && apk --no-cache add \
    bash \
    libpng-dev \
    libjpeg-turbo-dev \
    && docker-php-ext-install  bcmath \
    pdo_mysql \
    && docker-php-ext-configure gd \
    --with-png-dir=/usr/include \
    --with-jpeg-dir=/usr/include \
    && docker-php-ext-install gd \
    && curl -sS https://getcomposer.org/installer | php \
    && mv -v composer.phar /usr/local/bin/composer

RUN apk add nodejs
RUN touch ~/.bashrc \
    && curl -o- -L https://yarnpkg.com/install.sh | bash \
    && ln -s "$HOME/.yarn/bin/yarn" /usr/local/bin/yarn

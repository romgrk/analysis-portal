/*
 * seed.sql
 * Copyright (C) 2017 rgregoir <rgregoir@LAURIER>
 *
 * Distributed under terms of the MIT license.
 */

CREATE TABLE samples (
    id       varchar(60)  primary key,
    "user"   varchar(100) not null,
    created  timestamp    not null,
    modified timestamp    not null,
    data     jsonb
);

-- vim:et

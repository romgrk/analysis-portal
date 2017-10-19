/*
 * seed.sql
 * Copyright (C) 2017 rgregoir <rgregoir@LAURIER>
 *
 * Distributed under terms of the MIT license.
 */

CREATE TABLE samples (
    id varchar(60) primary key,
    data jsonb
);

-- vim:et

CREATE TABLE record
(
    id        varchar(36)  NOT NULL,
    from_page varchar(255) NOT NULL,
    size      float        NOT NULL,
    date      datetime     not null,
    PRIMARY KEY (id)
);
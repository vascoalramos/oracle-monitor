CREATE OR REPLACE VIEW view_tablespace_values_per_minute AS
    SELECT
        name,
        AVG(total) AS total,
        AVG(free) AS free,
        AVG(used) AS used,
        AVG(percentage_free) AS percentage_free,
        AVG(percentage_used) AS percentage_used,
        TO_CHAR(tstp, 'YYYY/MM/DD HH24:MI') AS tstp
    FROM tablespace_values
    GROUP BY name, total, free, used, percentage_free, percentage_used,TO_CHAR(tstp, 'YYYY/MM/DD HH24:MI')
    ORDER BY tstp DESC;


CREATE OR REPLACE VIEW view_tablespace_values_per_hour AS
    SELECT
        name,
        AVG(total) AS total,
        AVG(free) AS free,
        AVG(used) AS used,
        AVG(percentage_free) AS percentage_free,
        AVG(percentage_used) AS percentage_used,
        TO_CHAR(tstp, 'YYYY/MM/DD HH24') AS tstp
    FROM tablespace_values
    GROUP BY name, total, free, used, percentage_free, percentage_used,TO_CHAR(tstp, 'YYYY/MM/DD HH24')
    ORDER BY tstp DESC;


CREATE OR REPLACE VIEW view_tablespace_values_per_day AS
    SELECT
        name,
        AVG(total) AS total,
        AVG(free) AS free,
        AVG(used) AS used,
        AVG(percentage_free) AS percentage_free,
        AVG(percentage_used) AS percentage_used,
        TO_CHAR(tstp, 'YYYY/MM/DD') AS tstp
    FROM tablespace_values
    GROUP BY name, total, free, used, percentage_free, percentage_used,TO_CHAR(tstp, 'YYYY/MM/DD')
    ORDER BY tstp DESC;


CREATE OR REPLACE VIEW view_tablespace_values_per_month AS
    SELECT
        name,
        AVG(total) AS total,
        AVG(free) AS free,
        AVG(used) AS used,
        AVG(percentage_free) AS percentage_free,
        AVG(percentage_used) AS percentage_used,
        TO_CHAR(tstp, 'YYYY/MM') AS tstp
    FROM tablespace_values
    GROUP BY name, total, free, used, percentage_free, percentage_used,TO_CHAR(tstp, 'YYYY/MM')
    ORDER BY tstp DESC;


CREATE OR REPLACE VIEW view_tablespace_values_per_year AS
    SELECT
        name,
        AVG(total) AS total,
        AVG(free) AS free,
        AVG(used) AS used,
        AVG(percentage_free) AS percentage_free,
        AVG(percentage_used) AS percentage_used,
        TO_CHAR(tstp, 'YYYY') AS tstp
    FROM tablespace_values
    GROUP BY name, total, free, used, percentage_free, percentage_used,TO_CHAR(tstp, 'YYYY')
    ORDER BY tstp DESC;
CREATE OR REPLACE VIEW view_datafile_values_per_minute AS
    SELECT
        tablespace_name,
        datafile_name,
        AVG(total) AS total,
        AVG(free) AS free,
        AVG(used) AS used,
        AVG(percentage_free) AS percentage_free,
        AVG(percentage_used) AS percentage_used,
        TO_CHAR(tstp, 'YYYY/MM/DD HH24:MI') AS tstp
    FROM datafile_values
    GROUP BY tablespace_name, datafile_name, total, free, used, percentage_free, percentage_used,TO_CHAR(tstp, 'YYYY/MM/DD HH24:MI')
    ORDER BY tstp DESC;


CREATE OR REPLACE VIEW view_datafile_values_per_hour AS
    SELECT
        tablespace_name,
        datafile_name,
        AVG(total) AS total,
        AVG(free) AS free,
        AVG(used) AS used,
        AVG(percentage_free) AS percentage_free,
        AVG(percentage_used) AS percentage_used,
        TO_CHAR(tstp, 'YYYY/MM/DD HH24') AS tstp
    FROM datafile_values
    GROUP BY tablespace_name, datafile_name, total, free, used, percentage_free, percentage_used,TO_CHAR(tstp, 'YYYY/MM/DD HH24')
    ORDER BY tstp DESC;


CREATE OR REPLACE VIEW view_datafile_values_per_day AS
    SELECT
        tablespace_name,
        datafile_name,
        AVG(total) AS total,
        AVG(free) AS free,
        AVG(used) AS used,
        AVG(percentage_free) AS percentage_free,
        AVG(percentage_used) AS percentage_used,
        TO_CHAR(tstp, 'YYYY/MM/DD') AS tstp
    FROM datafile_values
    GROUP BY tablespace_name, datafile_name, total, free, used, percentage_free, percentage_used,TO_CHAR(tstp, 'YYYY/MM/DD')
    ORDER BY tstp DESC;


CREATE OR REPLACE VIEW view_datafile_values_per_month AS
    SELECT
        tablespace_name,
        datafile_name,
        AVG(total) AS total,
        AVG(free) AS free,
        AVG(used) AS used,
        AVG(percentage_free) AS percentage_free,
        AVG(percentage_used) AS percentage_used,
        TO_CHAR(tstp, 'YYYY/MM') AS tstp
    FROM datafile_values
    GROUP BY tablespace_name, datafile_name, total, free, used, percentage_free, percentage_used,TO_CHAR(tstp, 'YYYY/MM')
    ORDER BY tstp DESC;


CREATE OR REPLACE VIEW view_datafile_values_per_year AS
    SELECT
        tablespace_name,
        datafile_name,
        AVG(total) AS total,
        AVG(free) AS free,
        AVG(used) AS used,
        AVG(percentage_free) AS percentage_free,
        AVG(percentage_used) AS percentage_used,
        TO_CHAR(tstp, 'YYYY') AS tstp
    FROM datafile_values
    GROUP BY tablespace_name, datafile_name, total, free, used, percentage_free, percentage_used,TO_CHAR(tstp, 'YYYY')
    ORDER BY tstp DESC;
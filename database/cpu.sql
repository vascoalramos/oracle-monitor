CREATE OR REPLACE VIEW view_cpu_values_per_minute AS
    SELECT
        username,
        AVG(value) AS value,
        TO_CHAR(tstp, 'YYYY/MM/DD HH24:MI') AS tstp
    FROM cpu_values
    GROUP BY username, value, TO_CHAR(tstp, 'YYYY/MM/DD HH24:MI')
    ORDER BY tstp DESC;


CREATE OR REPLACE VIEW view_cpu_values_per_hour AS
    SELECT
        username,
        AVG(value) AS value,
        TO_CHAR(tstp, 'YYYY/MM/DD HH24') AS tstp
    FROM cpu_values
    GROUP BY username, value, TO_CHAR(tstp, 'YYYY/MM/DD HH24')
    ORDER BY tstp DESC;


CREATE OR REPLACE VIEW view_cpu_values_per_day AS
    SELECT
        username,
        AVG(value) AS value,
        TO_CHAR(tstp, 'YYYY/MM/DD') AS tstp
    FROM cpu_values
    GROUP BY username, value, TO_CHAR(tstp, 'YYYY/MM/DD')
    ORDER BY tstp DESC;


CREATE OR REPLACE VIEW view_cpu_values_per_month AS
    SELECT
        username,
        AVG(value) AS value,
        TO_CHAR(tstp, 'YYYY/MM') AS tstp
    FROM cpu_values
    GROUP BY username, value, TO_CHAR(tstp, 'YYYY/MM')
    ORDER BY tstp DESC;


CREATE OR REPLACE VIEW view_cpu_values_per_year AS
    SELECT
        username,
        AVG(value) AS value,
        TO_CHAR(tstp, 'YYYY') AS tstp
    FROM cpu_values
    GROUP BY username, value, TO_CHAR(tstp, 'YYYY')
    ORDER BY tstp DESC;
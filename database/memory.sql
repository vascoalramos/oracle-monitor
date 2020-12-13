CREATE OR REPLACE VIEW view_memory_values_per_minute AS
    SELECT
        AVG(total) AS total,
        AVG(used) AS used,
        TO_CHAR(tstp, 'YYYY/MM/DD HH24:MI') AS tstp
    FROM memory_values
    GROUP BY TO_CHAR(tstp, 'YYYY/MM/DD HH24:MI')
    ORDER BY tstp DESC;


CREATE OR REPLACE VIEW view_memory_values_per_hour AS
    SELECT
        AVG(total) AS total,
        AVG(used) AS used,
        TO_CHAR(tstp, 'YYYY/MM/DD HH24') AS tstp
    FROM memory_values
    GROUP BY TO_CHAR(tstp, 'YYYY/MM/DD HH24')
    ORDER BY tstp DESC;


CREATE OR REPLACE VIEW view_memory_values_per_day AS
    SELECT
        AVG(total) AS total,
        AVG(used) AS used,
        TO_CHAR(tstp, 'YYYY/MM/DD') AS tstp
    FROM memory_values
    GROUP BY TO_CHAR(tstp, 'YYYY/MM/DD')
    ORDER BY tstp DESC;


CREATE OR REPLACE VIEW view_memory_values_per_month AS
    SELECT
        AVG(total) AS total,
        AVG(used) AS used,
        TO_CHAR(tstp, 'YYYY/MM') AS tstp
    FROM memory_values
    GROUP BY TO_CHAR(tstp, 'YYYY/MM')
    ORDER BY tstp DESC;


CREATE OR REPLACE VIEW view_memory_values_per_year AS
    SELECT
        AVG(total) AS total,
        AVG(used) AS used,
        TO_CHAR(tstp, 'YYYY') AS tstp
    FROM memory_values
    GROUP BY TO_CHAR(tstp, 'YYYY')
    ORDER BY tstp DESC;
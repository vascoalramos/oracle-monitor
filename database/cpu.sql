CREATE OR REPLACE VIEW cpu_history_per_minute AS
    SELECT
        AVG(value) AS value,
        TO_CHAR(tstp, 'YYYY/MM/DD HH24:MI') AS tstp
    FROM cpu_history
    GROUP BY TO_CHAR(tstp, 'YYYY/MM/DD HH24:MI')
    ORDER BY tstp DESC;


CREATE OR REPLACE VIEW cpu_history_per_hour AS
    SELECT
        AVG(value) AS value,
        TO_CHAR(tstp, 'YYYY/MM/DD HH24') AS tstp
    FROM cpu_history
    GROUP BY TO_CHAR(tstp, 'YYYY/MM/DD HH24')
    ORDER BY tstp DESC;


CREATE OR REPLACE VIEW cpu_history_per_day AS
    SELECT
        AVG(value) AS value,
        TO_CHAR(tstp, 'YYYY/MM/DD') AS tstp
    FROM cpu_history
    GROUP BY TO_CHAR(tstp, 'YYYY/MM/DD')
    ORDER BY tstp DESC;


CREATE OR REPLACE VIEW cpu_history_per_month AS
    SELECT
        AVG(value) AS value,
        TO_CHAR(tstp, 'YYYY/MM') AS tstp
    FROM cpu_history
    GROUP BY TO_CHAR(tstp, 'YYYY/MM')
    ORDER BY tstp DESC;


CREATE OR REPLACE VIEW cpu_history_per_year AS
    SELECT
        AVG(value) AS value,
        TO_CHAR(tstp, 'YYYY') AS tstp
    FROM cpu_history
    GROUP BY TO_CHAR(tstp, 'YYYY')
    ORDER BY tstp DESC;
CREATE OR REPLACE VIEW view_session_values_per_second AS
     SELECT
        count(sid) AS total,
        tstp
    FROM session_values
    GROUP BY TO_CHAR(tstp, 'YYYY/MM/DD HH24:MI:SS'), tstp
    ORDER BY tstp DESC;
    

CREATE OR REPLACE VIEW view_session_values_per_minute AS
    SELECT
        AVG(total) AS total,
        TO_CHAR(tstp, 'YYYY/MM/DD HH24:MI') AS tstp
    FROM view_session_values_per_second
    GROUP BY TO_CHAR(tstp, 'YYYY/MM/DD HH24:MI')
    ORDER BY tstp DESC;

CREATE OR REPLACE VIEW view_session_values_per_hour AS
    SELECT
        AVG(total) AS total,
        TO_CHAR(tstp, 'YYYY/MM/DD HH24') AS tstp
    FROM view_session_values_per_second
    GROUP BY TO_CHAR(tstp, 'YYYY/MM/DD HH24')
    ORDER BY tstp DESC;


CREATE OR REPLACE VIEW view_session_values_per_day AS
    SELECT
        AVG(total) AS total,
        TO_CHAR(tstp, 'YYYY/MM/DD') AS tstp
    FROM view_session_values_per_second
    GROUP BY TO_CHAR(tstp, 'YYYY/MM/DD')
    ORDER BY tstp DESC;


CREATE OR REPLACE VIEW view_session_values_per_month AS
    SELECT
        AVG(total) AS total,
        TO_CHAR(tstp, 'YYYY/MM') AS tstp
    FROM view_session_values_per_second
    GROUP BY TO_CHAR(tstp, 'YYYY/MM')
    ORDER BY tstp DESC;


CREATE OR REPLACE VIEW view_session_values_per_year AS
    SELECT
        AVG(total) AS total,
        TO_CHAR(tstp, 'YYYY') AS tstp
    FROM view_session_values_per_second
    GROUP BY TO_CHAR(tstp, 'YYYY')
    ORDER BY tstp DESC;
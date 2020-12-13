CREATE OR REPLACE VIEW view_pdb_values_per_minute AS
    SELECT
        con_id,
        name,
        AVG(total_size) AS total_size,
        TO_CHAR(tstp, 'YYYY/MM/DD HH24:MI') AS tstp
    FROM pdb_values
    GROUP BY con_id, name, total_size, TO_CHAR(tstp, 'YYYY/MM/DD HH24:MI')
    ORDER BY tstp DESC;


CREATE OR REPLACE VIEW view_pdb_values_per_hour AS
    SELECT
        con_id, 
        name,
        AVG(total_size) AS total_size,
        TO_CHAR(tstp, 'YYYY/MM/DD HH24') AS tstp
    FROM pdb_values
    GROUP BY con_id, name, total_size, TO_CHAR(tstp, 'YYYY/MM/DD HH24')
    ORDER BY tstp DESC;


CREATE OR REPLACE VIEW view_pdb_values_per_day AS
    SELECT
        con_id,
        name,
        AVG(total_size) AS total_size,
        TO_CHAR(tstp, 'YYYY/MM/DD') AS tstp
    FROM pdb_values
    GROUP BY con_id, name, total_size, TO_CHAR(tstp, 'YYYY/MM/DD')
    ORDER BY tstp DESC;


CREATE OR REPLACE VIEW view_pdb_values_per_month AS
    SELECT
        con_id,
        name,
        AVG(total_size) AS total_size,
        TO_CHAR(tstp, 'YYYY/MM') AS tstp
    FROM pdb_values
    GROUP BY con_id, name, total_size, TO_CHAR(tstp, 'YYYY/MM')
    ORDER BY tstp DESC;


CREATE OR REPLACE VIEW view_pdb_values_per_year AS
    SELECT
        con_id,
        name,
        AVG(total_size) AS total_size,
        TO_CHAR(tstp, 'YYYY') AS tstp
    FROM pdb_values
     GROUP BY con_id, name, total_size, TO_CHAR(tstp, 'YYYY')
    ORDER BY tstp DESC;
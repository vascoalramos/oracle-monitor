pdb_sql = "select name, con_id, round(total_size / (1024*1024*1024), 2) as total_size_gb, CURRENT_TIMESTAMP from V$PDBS"

sessions_sql = "select sid, con_id, username, status, program, 'type', CURRENT_TIMESTAMP from V$SESSION"

memory_sql = '''select T as total, U as used, CURRENT_TIMESTAMP
    from dual
    inner join (
        select sum(pga_max_mem)/1024/1024 "U", 'X' "DUMMY"
        from v$process
    ) "A" on dual.DUMMY = "A".DUMMY
    inner join (
        select  sum(value)/1024/1024 "T", 'X' "DUMMY"
        from v$sga
    ) "B" on dual.DUMMY = "B".DUMMY'''

tablespaces_sql = '''select b.tablespace_name,
    tbs_size total,
    a.free_space free,
    round(tbs_size - a.free_space) used,
    round(100 * ( (tbs_size - round(tbs_size - a.free_space))/ tbs_size)) percentage_free,
    100 - round(100 * ( (tbs_size - round(tbs_size - a.free_space))/ tbs_size)) percentage_used,
    CURRENT_TIMESTAMP
    from  (select tablespace_name, round(sum(bytes)/1024/1024) as free_space
       from dba_free_space
       group by tablespace_name) a,
      (select tablespace_name, sum(bytes)/1024/1024 as tbs_size
       from dba_data_files
       group by tablespace_name) b
    where a.tablespace_name(+)=b.tablespace_name
    UNION ALL
    SELECT tablespace_name,
       round(tablespace_size / (1024*1024)) total,
       round(free_space / (1024*1024)) free,
       round((tablespace_size - free_space) / (1024*1024)) used,
       100 - round(((tablespace_size / (1024*1024)) - (free_space / (1024*1024))) / (tablespace_size / (1024*1024)) * 100) percentage_free,
       round(((tablespace_size / (1024*1024)) - (free_space / (1024*1024))) / (tablespace_size / (1024*1024)) * 100) percentage_used,
        CURRENT_TIMESTAMP
    FROM dba_temp_free_space'''

datafiles_sql = '''select tablespace_name, file_name, total, free, used, percentage_used, percentage_free, CURRENT_TIMESTAMP
    from (select d.tablespace_name,
	    d.file_id,
	    d.file_name,
	    round(d.bytes / (1024*1024)) total,
	    round(nvl(f.bytes,0) / (1024*1024)) free,
	    round((d.bytes - nvl(f.bytes,0)) / (1024*1024)) used,
	    round(((d.bytes - nvl(f.bytes,0)) / d.bytes) * 100) percentage_used,
	    100 - round(((d.bytes - nvl(f.bytes,0)) / d.bytes) * 100) percentage_free,
	    current_timestamp
	from (select tablespace_name, file_id, file_name, sum(bytes) bytes from dba_data_files
	    group by tablespace_name, file_id, file_name) d,
	    (select tablespace_name, file_id, sum(bytes) bytes from dba_free_space
		group by tablespace_name, file_id) f
	where d.tablespace_name = f.tablespace_name(+)
	    and d.file_id = f.file_id(+)
	order by tablespace_name, file_id)
	union ALL
	select d.tablespace_name,
	    d.file_name,
	    round(d.bytes / (1024*1024)) total,
	    round(nvl(f.bytes,0) / (1024*1024)) free,
	    round((d.bytes - nvl(f.bytes,0)) / (1024*1024)) used,
	    round(((d.bytes - nvl(f.bytes,0)) / d.bytes) * 100) percentage_used,
	    100 - round(((d.bytes - nvl(f.bytes,0)) / d.bytes) * 100) percentage_free,
	    current_timestamp
	from (select tablespace_name, file_name, sum(bytes) bytes from dba_temp_files
	    group by tablespace_name, file_name) d,
	    (select tablespace_name, allocated_space bytes from dba_temp_free_space
		group by tablespace_name, allocated_space) f
	where d.tablespace_name = f.tablespace_name(+)
	order by tablespace_name'''

users_sql = '''select user_id, username, account_status, default_tablespace, temporary_tablespace, last_login, CURRENT_TIMESTAMP from dba_users'''


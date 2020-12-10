# Oracle Monitor

## DB Entities

-   pdb_history (name, con_id, total_size, tstp: `select con_id, name, total_size, from V$PDBS;`)
-   users (user_id, username, account_status, default_tablespace, temporary_tablespace, last_login: `select user_id, username, account_status, default_tablespace, temporary_tablespace, last_login from dba_users;`)
-   session_history (sid, con_id, username, status, program, type, tstp: `select sid, con_id, username, status, program, 'type' from V$SESSION;`)
-   cpu_history (value (%), tstp)
-   memory_history (total, used, tstp: check sql of vilaça repo)
-   tablespace_history (name, total, free, used, percentage_free, percentage_used, tstp)
-   datafile_history (tablespace_name, datafile_name, total, free, used, percentage_free, percentage_used, tstp)

## Authors

-   **Carolina Marques:** [CarolinaRMarques](https://github.com/CarolinaRMarques)
-   **Francisco Borges:** [AlbertinoDias](https://github.com/AlbertinoDias)
-   **Rui Pereira:** [???](https://github.com/???)
-   **Vasco Ramos:** [vascoalramos](https://vascoalramos.me)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

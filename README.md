# Oracle Monitor

## DB Entities

-   pdb_history (name, con_id, total_size, tstp)
-   users (user_id, username, account_status, default_tablespace, temporary_tablespace, last_login)
-   session_history (sid, con_id, username, status, program, type, tstp)
-   cpu_history (value (%), tstp)
-   memory_history (total, used, tstp)
-   tablespace_history (name, total, free, used, percentage_free, percentage_used, tstp)
-   datafile_history (tablespace_name, datafile_name, total, free, used, percentage_free, percentage_used, tstp)

## Run Software

### Scrapper Agent

#### Prerequisites

Install Oracle Instant Client: https://www.oracle.com/database/technologies/instant-client/linux-x86-64-downloads.html#ic_x64_inst

```bash
# install necessary software
sudo apt-get install python3-venv
pip3 install virtualenv

# install env software (python)
cd scrapper-agent
python3 -m venv venv
source venv/bin/activate
pip3 install -r requirements.txt
```

#### How to run

```bash
cd scrapper-agent
source venv/bin/activate
python3 agent.py &
```

### How to kill process

When running agent.py it will return a pid. To kill the process, run `kill <pid>`.

### Rest API

#### Prerequisites

```bash
# install dependencies
cd rest-api
npm install
```

#### How to run

```bash
cd rest-api
npm run start
```



### Create PDB and users managment


#### Create space for PDB


Enter root mode with:
```
sudo su
 ```

After entering root mode run the folowing commands, if you're not able to enter root mode, input "sudo" before each command:
```cd /home/uminho/dockers/data/oracle/
 cd u02/app/oracle/oradata/ORCL/
 mkdir monitor
 chown oracle:oinstall monitor/
 ```
 #### Create PDB
 
 
 Enter oracle shell:
 ```
 docker exec -it DOCKER_ID bash
 ```
You can check the "DOCKER_ID" with the following command:
```
docker ps -a
 ```
Remember to be in root mode, otherwise add "sudo" before each command.

After you enter the oracle shell, you have to connect to your cbd:
```
sqlplus sys/Oradoc_db1@localhost:1521/ORCLCDB.localdomain as sysdba
 ```
Now that you have connected with your CBD, it's time to create the PDB:
``` CREATE pluggable database monitor 
        admin user aebd_admin IDENTIFIED BY aebd 
        roles = (DBA) 
        FILE_NAME_CONVERT=('/u02/app/oracle/oradata/ORCL/pdbseed','/u02/app/oracle/oradata/ORCL/monitor');
 ```
 
 Before you can do anything with your new PDB, you need to turn it on and then connect to it:
 
``` ALTER pluggable database monitor open;
connect sys/Oradoc_db1@localhost:1521/monitor.localdomain AS sysdba
 ```
  #### Create Tablespaces and Datafiles


``` CREATE tablespace monito_data 
	datafile '/u02/app/oracle/oradata/ORCL/permatablemonitor01.dbf' 
	SIZE 10M
	AUTOEXTEND ON;

CREATE temporary tablespace temp_monitor
	tempfile '/u02/app/oracle/oradata/ORCL/aebd/temptablemonitor01.dbf' 
	SIZE 10M
	AUTOEXTEND ON;
 ```
 
  #### Create User and grant him previleges
 
 
``` CREATE user orclmonitor IDENTIFIED BY secret;
SELECT username, common, con_id  FROM cdb_users WHERE username ='ORCLmonitor';
GRANT CREATE MATERIALIZED VIEW, UNLIMITED TABLESPACE, CREATE SESSION, RESOURCE, ALTER ANY MATERIALIZED VIEW, DROP ANY MATERIALIZED VIEW, DROP ANY VIEW, CREATE ANY VIEW TO orclmonitor;
 ```


## Authors

-   **Carolina Marques:** [CarolinaRMarques](https://github.com/CarolinaRMarques)
-   **Francisco Borges:** [AlbertinoDias](https://github.com/AlbertinoDias)
-   **Rui Pereira:** [rpcbp](https://github.com/rpcbp)
-   **Vasco Ramos:** [vascoalramos](https://vascoalramos.me)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

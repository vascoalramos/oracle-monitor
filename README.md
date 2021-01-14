# Oracle Monitor

## Run Software

### Create PDB and users managment

#### Create space for PDB

Enter **root** mode with: `sudo su`

After entering root mode, run the folowing commands (if you're not able to enter root mode, add `sudo` before each command):

```bash
cd /home/uminho/dockers/data/oracle/
cd u02/app/oracle/oradata/ORCL/
mkdir orclmonitor
chown oracle:oinstall orclmonitor/
```

#### Create PDB

Enter oracle shell: `docker exec -it <DOCKER_ID> bash`

You can check the `DOCKER_ID` with the following command: `docker ps -a`

Remember to be in **root** mode, otherwise add `sudo` before each command.

After you enter the oracle shell, you have to connect to your cbd:

```bash
sqlplus sys/Oradoc_db1 as sysdba
```

Now that you have connected with your CBD, it's time to create the PDB:

```sql
CREATE pluggable database orclmonitor
	admin user aebd_admin IDENTIFIED BY aebd
	roles = (DBA)
    FILE_NAME_CONVERT=('/u02/app/oracle/oradata/ORCL/pdbseed','/u02/app/oracle/oradata/ORCL/orclmonitor');
```

Before you can do anything with your new PDB, you need to turn it on and then connect to it:

```sql
ALTER pluggable database orclmonitor open;
connect sys/Oradoc_db1@localhost:1521/orclmonitor.localdomain AS sysdba
```

#### Create Tablespaces and Datafiles

```sql
CREATE tablespace orclmonitor_data datafile '/u02/app/oracle/oradata/ORCL/orclmonitor/permmonitor01.dbf' SIZE 10M AUTOEXTEND ON;

CREATE temporary tablespace orclmonitor_temp tempfile '/u02/app/oracle/oradata/ORCL/orclmonitor/tempmonitor01.dbf' SIZE 10M AUTOEXTEND ON;
```

#### Create User and grant him previleges

```sql
CREATE user orcl_monitor IDENTIFIED BY secret DEFAULT TABLESPACE orclmonitor_data TEMPORARY TABLESPACE orclmonitor_temp QUOTA UNLIMITED ON orclmonitor_data;
SELECT username, common, con_id  FROM cdb_users WHERE username ='ORCL_MONITOR';
GRANT CREATE MATERIALIZED VIEW, UNLIMITED TABLESPACE, CREATE SESSION, RESOURCE, ALTER ANY MATERIALIZED VIEW, DROP ANY MATERIALIZED VIEW, DROP ANY VIEW, CREATE ANY VIEW TO orcl_monitor;
```

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

**Note:** To access Rest API documentation, go to: http://localhost:3000/api

## Author

-   **Carolina Marques:** [CarolinaRMarques](https://github.com/CarolinaRMarques)
-   **Francisco Borges:** [AlbertinoDias](https://github.com/AlbertinoDias)
-   **Rui Pereira:** [rpcbp](https://github.com/rpcbp)
-   **Vasco Ramos:** [vascoalramos](https://vascoalramos.me)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

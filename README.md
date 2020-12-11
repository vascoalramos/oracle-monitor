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

## Authors

-   **Carolina Marques:** [CarolinaRMarques](https://github.com/CarolinaRMarques)
-   **Francisco Borges:** [AlbertinoDias](https://github.com/AlbertinoDias)
-   **Rui Pereira:** [rpcbp](https://github.com/rpcbp)
-   **Vasco Ramos:** [vascoalramos](https://vascoalramos.me)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

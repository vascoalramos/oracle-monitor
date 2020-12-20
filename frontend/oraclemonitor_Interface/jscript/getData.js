const fetchParams = {
    method: "GET",
    mode: "cors",
    cache: "default"
};

const url = "http://localhost:3000/api/";


function fetchMemory() {
    fetch(url + 'memory/history', fetchParams)
        .then(res => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json();
        })
        .then(data => {
            let characterData = [];
            data.forEach(function(character) {
                characterData.push([parseInt(character.total), parseInt(character.used)]);
            });
            const chartOneData = {
                type: "pie",
                title: {
                    text: "Fetch + REST API Endpoint Demo",
                    adjustLayout: true
                },
                scaleX: {
                    item: {
                        angle: '-45'
                    }
                },
                series: [{
                    values: characterData
                }],
                plotarea: {
                    margin: 'dynamic'
                }
            };
            zingchart.render({
                id: "myChart",
                data: chartOneData,
                height: "100%",
                width: "100%"
            });
        })
        .catch(err => {
            console.log("Error Getting Data From API");
        });

}

function getUsers() {
    fetch(url + 'users', fetchParams)
        .then(res => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json();
        })
        .then(data => {
            let count = 0;
            let output = '';

            data.forEach(function(user) {
                count++;
                output += `
                <li class="list-group-item">
                    <!-- Custom content-->
                    <div class="media align-items-lg-center flex-column flex-lg-row p-3">
                    <div class="media-body order-2 order-lg-1">
                          <h5 class="mt-0 font-weight-bold mb-2" id="name_` + count + `">Name: ${user.name}</h5>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item" id="status_` + count + `">Status: ${user.status} </li>
                                <li class="list-group-item" id="def_tablespace_` + count + `">Default Tablespace: ${user.defaylt_tablespace}</li>
                                <li class="list-group-item" id="temp_tablespace_` + count + `">Temp Tablespace: ${user.temp_tablespace}</li>
                                <li class="list-group-item" id="last_login_` + count + `">Last Login: ${user.last_login}</li>
                                </ul>
                        </div>
                    </div>
                    <!-- End -->
                </li>
                         `;

            });

            document.getElementById('output').innerHTML = output;
        })
        .catch(err => {
            console.log("Error Getting Data From API");
        });
}


function getTableSpaces() {
    fetch(url + 'tablespaces', fetchParams)
        .then(res => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json();
        })
        .then(data => {
            let count = 0;
            let output = '';

            data.forEach(function(tablespaces) {
                count++;
                output += `
                <li class="list-group-item">
                    <!-- Custom content-->
                    <div class="media align-items-lg-center flex-column flex-lg-row p-3">
                    <div class="media-body order-2 order-lg-1">
                          <h5 class="mt-0 font-weight-bold mb-2" id="name_` + count + `">Name: ${tablespaces.name}</h5>
            
                        </div>
                    </div>
                    <!-- End -->
                </li>
                         `;

            });

            document.getElementById('output').innerHTML = output;
        })
        .catch(err => {
            console.log("Error Getting Data From API");
        });
}

function getDatafiles() {
    fetch(url + 'datafiles', fetchParams)
        .then(res => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json();
        })
        .then(data => {
            let count = 0;
            let output = '';

            data.forEach(function(datafiles) {
                count++;
                output += `
            <li class="list-group-item">
                <!-- Custom content-->
                <div class="media align-items-lg-center flex-column flex-lg-row p-3">
                <div class="media-body order-2 order-lg-1">
                      <h5 class="mt-0 font-weight-bold mb-2" id="tablespace_name_` + count + `">Tablespace: ${datafiles.tablespace_name}</h5>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item" id="datafile_name_` + count + `">Name: ${datafiles.datafile_name} </li>

                            </ul>
                    </div>
                </div>
                <!-- End -->
            </li>
                     `;

            });

            document.getElementById('output').innerHTML = output;
        })
        .catch(err => {
            console.log("Error Getting Data From API");
        });
}
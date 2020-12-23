const fetchParams = {
    method: "GET",
    mode: "cors",
    cache: "default",
};
const backgroundColor = [
    "#0074D9",
    "#FF4136",
    "#2ECC40",
    "#FF851B",
    "#3e95cd",
    "#8e5ea2",
    "#3cba9f",
    "#e8c3b9",
    "#c45850",
];
const datafileChart = null;

function clearChart(objChart) {
    if (objChart != null) {
        objChart.destroy();
    }
}

const url = "http://localhost:3000/api/";

function fetchTablespaceHistory(argument) {
    document.getElementById("myChart").innerHTML = ""
    fetch(url + "tablespaces/history?groupBy=" + argument, fetchParams)
        .then((res) => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json();
        })
        .then((data) => {

            var ctx = document.getElementById("myChart");

            let history = data.history;

            let labels = data.entities.map((e) => e.name);

            let datasets = [];

            let label_history;

            let graph_labels;

            labels.forEach((label, idx) => {
                label_history = history.filter((e) => e.name === label);
                datasets.push({
                    label: label,
                    data: label_history.map((e) => e.used),
                    backgroundColor: "transparent",
                    borderColor: backgroundColor[idx],
                    borderWidth: 1,
                });
                if (idx === labels.length - 1) {
                    graph_labels = label_history.map((e) => e.tstp);
                }
            });

            var myChart = new Chart(ctx, {
                type: "line",
                label: labels,
                data: {
                    labels: graph_labels,
                    datasets: datasets,
                },
                options: {
                    responsive: false,
                    legend: {
                        display: false,
                    },
                    title: {
                        display: true,
                        text: "Tablespaces Used",
                    },
                    animation: {
                        animateScale: true,
                        animateRotate: true,
                    },
                },
            });
        })
        .catch((err) => {
            console.log(err);
            console.log("Error Getting Data From API");
        });
}

function fetchDatafileHistory(argument) {
    clearChart(datafileChart);
    fetch(url + "datafiles/history?groupBy=" + argument, fetchParams)
        .then((res) => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json();
        })
        .then((data) => {

            var ctx = document.getElementById("myChart");

            let history = data.history;

            let labels = data.entities.map((e) => e.datafile_name);

            let datasets = [];

            let label_history;

            let graph_labels;

            labels.forEach((label, idx) => {
                label_history = history.filter((e) => e.datafile_name === label);
                datasets.push({
                    label: label,
                    data: label_history.map((e) => e.used),
                    backgroundColor: "transparent",
                    borderColor: backgroundColor[idx],
                    borderWidth: 1,
                });
                if (idx === labels.length - 1) {
                    graph_labels = label_history.map((e) => e.tstp);
                }
            });


            datafileChart = new Chart(ctx, {
                type: "line",
                data: {
                    labels: graph_labels,
                    datasets: datasets,
                },
                options: {
                    responsive: false,
                    legend: {
                        display: false,
                    },
                    title: {
                        display: true,
                        text: "Datafiles",
                    },
                    animation: {
                        animateScale: true,
                        animateRotate: true,
                    },
                },
            });
        })
        .catch((err) => {
            console.log(err);
            console.log("Error Getting Data From API");
        });
}

function fetchPDB(argument) {
    document.getElementById("myPDBChart").innerHTML = ""
    fetch(url + "pdbs/history?groupBy=" + argument, fetchParams)
        .then((res) => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json();
        })
        .then((data) => {

            var ctx = document.getElementById("myPDBChart");

            let history = data.history;

            let labels = data.entities.map((e) => e.name);

            let datasets = [];

            let label_history;

            let graph_labels;

            labels.forEach((label, idx) => {
                label_history = history.filter((e) => e.name === label);
                datasets.push({
                    label: label,
                    data: label_history.map((e) => e.size),
                    backgroundColor: "transparent",
                    borderColor: backgroundColor[idx],
                    borderWidth: 1,
                });
                if (idx === labels.length - 1) {
                    graph_labels = label_history.map((e) => e.tstp);
                }
            });


            var myChart = new Chart(ctx, {
                type: "line",
                data: {
                    labels: graph_labels,
                    datasets: datasets,
                },
                options: {
                    responsive: false,
                    legend: {
                        display: false,
                    },
                    title: {
                        display: true,
                        text: "PDBs",
                    },
                    animation: {
                        animateScale: true,
                        animateRotate: true,
                    },
                },
            });
        })
        .catch((err) => {
            console.log(err);
            console.log("Error Getting Data From API");
        });
}

function getSessions(argument) {
    document.getElementById("mySessionChart").innerHTML = ""
    fetch(url + "sessions/total/history?groupBy=" + argument, fetchParams)
        .then((res) => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json();
        })
        .then((data) => {

            var ctx = document.getElementById("mySessionChart");

            let vals = []

            let datasets = new Map();
            data.forEach(function(val) {
                vals.push([parseInt(`${val.total}`), `${val.tstp}`]);
            })

            vals.forEach(function(v) {
                datasets.set(v[1], v[0]);
            })
            var myChart = new Chart(ctx, {
                type: "line",
                data: {
                    labels: Array.from(datasets.keys()),
                    datasets: [{
                        label: 'Session value',
                        data: Array.from(datasets.values()),
                        backgroundColor: "transparent",
                        borderColor: backgroundColor[1],
                        borderWidth: 1,
                    }]
                },
                options: {
                    responsive: false,
                    legend: {
                        display: false,
                    },
                    title: {
                        display: true,
                        text: "Sessions",
                    },

                },
            });
        })
        .catch((err) => {
            console.log(err);
            console.log("Error Getting Data From API");
        });
}

function fetchCPU(argument) {
    document.getElementById("myCPUPie").innerHTML = ""
    fetch(url + "cpu/history?groupBy=" + argument, fetchParams)
        .then((res) => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json();
        })
        .then((data) => {
            var ctx = document.getElementById("myCPUPie");

            let cpuMap = new Map();

            data.forEach(function(character) {
                cpuMap.set(`${character.username}`, `${character.value}`);
            });

            var myChart = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: Array.from(cpuMap.keys()),

                    datasets: [{

                        data: Array.from(cpuMap.values()),
                        backgroundColor: backgroundColor,
                    }, ],
                },
                options: {
                    responsive: false,
                    legend: {
                        display: false,
                    },
                    title: {
                        display: true,
                        text: "CPU Usage",
                    },
                    animation: {
                        animateScale: true,
                        animateRotate: true,
                    },
                },
            });
        })
        .catch((err) => {
            console.log("Error Getting Data From API");
        });
}

/*function fetchMemory() {
    document.getElementById("myMemoryPie").innerHTML = ""
    fetch(url + "memory/history", fetchParams)
        .then((res) => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json();
        })
        .then((data) => {
            var ctx = document.getElementById("myMemoryPie");
            let characterData = [];
            data.forEach(function(character) {
                characterData.push([parseInt(character.total), parseInt(character.used)]);
            });
            var myPieChart = new Chart(ctx, {
                type: "pie",
                data: {
                    labels: ["Total", "Used"],
                    datasets: [{
                        data: characterData[characterData.length - 1],
                        backgroundColor: ["#0074D9", "#FF4136"],
                    }, ],
                },
                options: {
                    responsive: true,
                    legend: {
                        position: "top",
                    },
                    title: {
                        display: true,
                        text: "Memory Usage",
                    },
                    animation: {
                        animateScale: true,
                        animateRotate: true,
                    },
                },
            });
        })
        .catch((err) => {
            console.log("Error Getting Data From API");
        });
}*/

function fetchMemory(argument) {
    document.getElementById("myMemoryPie").innerHTML = ""
    fetch(url + "memory/history?groupBy=" + argument, fetchParams)
        .then((res) => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json();
        })
        .then((data) => {
            var ctx = document.getElementById("myMemoryPie");

            let vals = [];
            let total = new Map();
            let used = new Map();


            data.forEach(function(val) {
                vals.push([parseInt(`${val.total}`), parseInt(`${val.used}`), `${val.tstp}`]);
            });

            vals.forEach(function(v) {
                total.set(v[2], v[0]);
                used.set(v[2], v[1]);
            })



            var myChart = new Chart(ctx, {
                type: "line",
                data: {
                    labels: Array.from(total.keys()),
                    datasets: [{
                        label: 'Total',
                        data: Array.from(total.values()),
                        backgroundColor: "transparent",
                        borderColor: backgroundColor[1],
                        borderWidth: 1,
                    }, {
                        label: 'Used',
                        data: Array.from(used.values()),
                        backgroundColor: "transparent",
                        borderColor: backgroundColor[6],
                        borderWidth: 1,
                    }],
                },
                options: {
                    title: {
                        display: true,
                        text: "Memory Usage",
                    },
                    responsive: false
                }
            });
        })
        .catch((err) => {
            console.log("Error Getting Data From API");
        });
}

function getUsers() {
    document.getElementById("output").innerHTML = ""

    fetch(url + "users", fetchParams)
        .then((res) => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json();
        })
        .then((data) => {
            let count = 0;
            let output = "";

            data.forEach(function(user) {
                count++;
                output +=
                    `
                <tr>
                <td id="name_` +
                    count +
                    `">${user.name}</td>
                <td id="status_` +
                    count +
                    `">${user.status} </td>
                <td id="def_tablespace_` +
                    count +
                    `"> ${user.default_tablespace}</td>
                <td id="temp_tablespace_` +
                    count +
                    `">${user.temp_tablespace}</td>
                <td id="last_login_` +
                    count +
                    `"> ${user.last_login}</td>
              </tr>            
             <!-- End -->
                         `;
            });

            document.getElementById("output").innerHTML = output;
        })
        .catch((err) => {
            console.log("Error Getting Data From API");
        });
}

function getTableSpaces(argument) {
    document.getElementById("output").innerHTML = ""

    fetch(url + "tablespaces/history?groupBy=" + argument, fetchParams)
        .then((res) => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json();
        })
        .then((data) => {
            let count = 0;
            let output = "";
            let tablespaceMap = new Map();
            data["entities"].forEach(function(names) {
                tablespaceMap.set(`${names.name}`, []);
            });
            data["history"].forEach(function(tablespaces) {
                if (tablespaceMap.has(`${tablespaces.name}`)) {
                    tablespaceMap.set(`${tablespaces.name}`, [
                        `${tablespaces.name}`,
                        `${tablespaces.total}`,
                        `${tablespaces.free}`,
                        `${tablespaces.used}`,
                    ]);
                }
            });
            for (const [key, value] of tablespaceMap.entries()) {
                count++;
                output +=
                    `
                <tr>
                    <td id="name_` +
                    count +
                    `">${value[0]}</td>
                    <td id="total_` +
                    count +
                    `">${value[1]}</td>
                    <td id="free_` +
                    count +
                    `">${value[2]}</td>
                    <td id="used_` +
                    count +
                    `">${value[3]}</td>
                </tr>       
          
                     `;
            }

            document.getElementById("output").innerHTML = output;
        })
        .catch((err) => {
            console.log("Error Getting Data From API");
        });
}

function getDatafiles(argument) {
    document.getElementById("output").innerHTML = ""

    fetch(url + "datafiles/history?groupBy=" + argument, fetchParams)
        .then((res) => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json();
        })
        .then((data) => {
            let count = 0;
            let output = "";

            let datafilesMap = new Map();

            data["entities"].forEach(function(names) {
                datafilesMap.set(`${names.datafile_name}`, []);
            });

            data["history"].forEach(function(datafiles) {

                if (datafilesMap.has(`${datafiles.datafile_name}`)) {

                    datafilesMap.set(`${datafiles.datafile_name}`, [
                        `${datafiles.tablespace_name}`,
                        `${datafiles.datafile_name}`,
                        `${datafiles.total}`,
                        `${datafiles.free}`,
                        `${datafiles.used}`,
                    ]);
                }
            });


            for (const [key, value] of datafilesMap.entries()) {
                count++;
                output +=
                    `
                <tr>
                    <td id="t_name_` +
                    count +
                    `">${value[0]}</td>
                    <td id="d_name_` +
                    count +
                    `">${value[1]}</td>
                    <td id="total_` +
                    count +
                    `">${value[2]}</td>
                    <td id="free_` +
                    count +
                    `">${value[3]}</td>
                    <td id="used_` +
                    count +
                    `">${value[4]}</td>

                </tr>       
          
                     `;
            }

            document.getElementById("output").innerHTML = output;
        })
        .catch((err) => {
            console.log("Error Getting Data From API");
        });
}

function getMemoryPie() {
    var ctx = document.getElementById("myMemoryPie");
    var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ["Total", "Used"],
            datasets: [{
                data: [30, 70],
                backgroundColor: ["#0074D9", "#FF4136"],
                labels: [
                    'Red',
                    'Orange'
                ]
            }]
        },
        options: {
            responsive: true,
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Memory Usage'
            },
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    });
}

function getPDBChart() {
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            datasets: [{
                data: [15339, 21345, 18483, 24003, 23489, 24092, 12034],
                lineTension: 0,
                backgroundColor: 'transparent',
                borderColor: '#007bff',
                borderWidth: 4,
                pointBackgroundColor: '#007bff'
            }]
        },
        options: {
            responsive: true,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: false
                    }
                }]
            },
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'PDB'
            }
        }
    });
}

function getCPUPie() {
    var ctx = document.getElementById("myCPUPie");
    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [
                    70,
                    20,
                    10,
                ],
                backgroundColor: [
                    "#0074D9", "#FF4136", "#2ECC40", "#FF851B"
                ],
            }],
            labels: [
                'User 1',
                'User 2',
                'User 3',
            ]
        },
        options: {
            responsive: true,
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'CPU Usage'
            },
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    });
}
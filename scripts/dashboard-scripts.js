document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            tab.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    const initialData = [
        { name: 'Máquina A', consumo: 4000, costo: 2400, employee: 'employee1' },
        { name: 'Máquina B', consumo: 3000, costo: 1398, employee: 'employee2' },
        { name: 'Máquina C', consumo: 2000, costo: 9800, employee: 'employee3' },
        { name: 'Máquina D', consumo: 2780, costo: 3908, employee: 'employee1' },
        { name: 'Máquina E', consumo: 1890, costo: 4800, employee: 'employee2' },
    ];

    let filteredData = [...initialData];

    // Chart.js
    const ctx = document.getElementById('machineChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: filteredData.map(item => item.name),
            datasets: [
                {
                    label: 'Consumo (kWh)',
                    data: filteredData.map(item => item.consumo),
                    backgroundColor: 'rgba(59, 130, 246, 0.5)',
                    borderColor: 'rgb(59, 130, 246)',
                    borderWidth: 1
                },
                {
                    label: 'Costo ($)',
                    data: filteredData.map(item => item.costo),
                    backgroundColor: 'rgba(16, 185, 129, 0.5)',
                    borderColor: 'rgb(16, 185, 129)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    function updateChart() {
        chart.data.labels = filteredData.map(item => item.name);
        chart.data.datasets[0].data = filteredData.map(item => item.consumo);
        chart.data.datasets[1].data = filteredData.map(item => item.costo);
        chart.update();
    }

    const employeeSelect = document.getElementById('employee-select');
    employeeSelect.addEventListener('change', function() {
        const selectedEmployee = this.value;
        if (selectedEmployee === 'all') {
            filteredData = [...initialData];
        } else {
            filteredData = initialData.filter(item => item.employee === selectedEmployee);
        }
        updateChart();
        updateSummaryCards();
    });

    function updateSummaryCards() {
        const totalConsumo = filteredData.reduce((sum, item) => sum + item.consumo, 0);
        const totalCosto = filteredData.reduce((sum, item) => sum + item.costo, 0);
        const eficiencia = (totalConsumo / totalCosto * 100).toFixed(2);

        document.querySelector('.card:nth-child(1) .text-2xl').textContent = `${totalConsumo.toLocaleString()} kWh`;
        document.querySelector('.card:nth-child(2) .text-2xl').textContent = `$${totalCosto.toLocaleString()}`;
        document.querySelector('.card:nth-child(3) .text-2xl').textContent = `${eficiencia}%`;
    }

    updateSummaryCards();
});
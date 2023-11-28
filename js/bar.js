var chartDom = document.getElementById('chart');

function createBarChart() {

    var myChart = echarts.init(chartDom);
    var option;

    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data/*xaxis*/: [1, 6, 9, 22, 35, 62, { value: 135, itemStyle: { color: '#a90000' } },],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: 'Citations',
                type: 'bar',
                barWidth: '60%',
                data/*yaxis*/: [1, 6, 9, 22, 35, 62, { value: 135, itemStyle: { color: '#a90000' } },],
                itemStyle: {
                    borderRadius: 3,
                    borderWidth: 1,
                    color: '#3498db',
                    borderType: 'solid',
                    //borderColor: '#73c0de',
                },
                animationDelay: function (idx) {
                    return idx * 500;
                }
            }
        ]
    };

    option && myChart.setOption(option);
}

const chartObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            createBarChart();
            chartObserver.disconnect()
        }
    });
});

chartObserver.observe(chartDom);
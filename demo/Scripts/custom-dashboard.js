require.config({
    paths: {
        'echarts': '../Scripts/echarts-2.0.0/build/echarts',
        'echarts/chart/bar': '../Scripts/echarts-2.0.0/build/echarts',
        'echarts/chart/pie': '../Scripts/echarts-2.0.0/build/echarts',
        'echarts/chart/gauge': '../Scripts/echarts-2.0.0/build/echarts',
        'theme/default': '../Scripts/echarts-2.0.0/src/theme/default'
    }
});
require(
    [
        'echarts',
        'echarts/chart/bar', // 使用柱状图就加载bar模块，按需加载
        'echarts/chart/pie',
        'echarts/chart/gauge',
        'theme/default'
    ],
    function(ec) {
        // 基于准备好的dom，初始化echarts图表
        var myBarChart = ec.init(document.getElementById('echartsBar')).showLoading({ effect: 'whirling' });
        var barOption = {
            title: {
                text: 'Bar',
                x: 'left'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['A', 'B']
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    splitArea: { show: true }
                }
            ],
            series: [
                {
                    name: 'A',
                    type: 'bar',
                    data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                    markPoint: {
                        data: [
                            { type: 'max', name: 'Max' },
                            { type: 'min', name: 'Min' }
                        ]
                    },
                    markLine: {
                        data: [
                            { type: 'average', name: 'Avg' }
                        ]
                    }
                },
                {
                    name: '降水量',
                    type: 'bar',
                    data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                    markPoint: {
                        data: [
                            { name: '年最高', value: 182.2, xAxis: 7, yAxis: 183, symbolSize: 18 },
                            { name: '年最低', value: 2.3, xAxis: 11, yAxis: 3 }
                        ]
                    },
                    markLine: {
                        data: [
                            { type: 'average', name: 'Avg' }
                        ]
                    }
                }
            ]
        };
        myBarChart.setOption(barOption).hideLoading();
        require(['theme/default'], function (tarTheme) {
            myBarChart.setTheme(tarTheme);
        });
        var myPieChart = ec.init(document.getElementById('echartsPie')).showLoading({ effect: 'whirling' });
        var pieOption = {
            title: {
                text: 'Pie',
                subtext: 'from global web index',
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                data: ['A', 'B', 'C', 'D', 'E']
            },
            calculable: true,
            series: [
                {
                    name: 'DATA',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', 225],
                    data: [
                        { value: 335, name: 'A' },
                        { value: 310, name: 'B' },
                        { value: 234, name: 'C' },
                        { value: 135, name: 'D' },
                        { value: 1548, name: 'E' }
                    ]
                }
            ]
        };
        myPieChart.setOption(pieOption).hideLoading();
        require(['theme/default'], function(tarTheme) {
            myPieChart.setTheme(tarTheme);
        });
        var myRingPieChart = ec.init(document.getElementById('echartsRingPie')).showLoading({ effect: 'whirling' });
        var labelTop = {
            normal: {
                label: {
                    show: true,
                    position: 'center',
                    textStyle: {
                        baseline: 'bottom'
                    }
                },
                labelLine: {
                    show: false
                }
            }
        };
        var labelBottom = {
            normal: {
                color: '#ccc',
                label: {
                    show: true,
                    position: 'center',
                    formatter: function(a, b, c) { return 100 - c + '%' },
                    textStyle: {
                        baseline: 'top'
                    }
                },
                labelLine: {
                    show: false
                }
            },
            emphasis: {
                color: 'rgba(0,0,0,0)'
            }
        };
        var radius = [40, 55];
        var ringPieOption = {
            legend: {
                x: 'center',
                y: 'center',
                data: [
                    'GoogleMaps', 'Facebook', 'Youtube', 'Google+', 'Weixin',
                    'Twitter', 'Skype', 'Messenger', 'Whatsapp', 'Instagram'
                ]
            },
            title: {
                text: 'The App World',
                subtext: 'from global web index',
                x: 'center'
            },
            series: [
                {
                    type: 'pie',
                    center: ['10%', '30%'],
                    radius: radius,
                    data: [
                        { name: 'other', value: 46, itemStyle: labelBottom },
                        { name: 'GoogleMaps', value: 54, itemStyle: labelTop }
                    ]
                },
                {
                    type: 'pie',
                    center: ['30%', '30%'],
                    radius: radius,
                    data: [
                        { name: 'other', value: 56, itemStyle: labelBottom },
                        { name: 'Facebook', value: 44, itemStyle: labelTop }
                    ]
                },
                {
                    type: 'pie',
                    center: ['50%', '30%'],
                    radius: radius,
                    data: [
                        { name: 'other', value: 65, itemStyle: labelBottom },
                        { name: 'Youtube', value: 35, itemStyle: labelTop }
                    ]
                },
                {
                    type: 'pie',
                    center: ['70%', '30%'],
                    radius: radius,
                    data: [
                        { name: 'other', value: 70, itemStyle: labelBottom },
                        { name: 'Google+', value: 30, itemStyle: labelTop }
                    ]
                },
                {
                    type: 'pie',
                    center: ['90%', '30%'],
                    radius: radius,
                    data: [
                        { name: 'other', value: 73, itemStyle: labelBottom },
                        { name: 'Weixin', value: 27, itemStyle: labelTop }
                    ]
                },
                {
                    type: 'pie',
                    center: ['10%', '70%'],
                    radius: radius,
                    data: [
                        { name: 'other', value: 78, itemStyle: labelBottom },
                        { name: 'Twitter', value: 22, itemStyle: labelTop }
                    ]
                },
                {
                    type: 'pie',
                    center: ['30%', '70%'],
                    radius: radius,
                    data: [
                        { name: 'other', value: 78, itemStyle: labelBottom },
                        { name: 'Skype', value: 22, itemStyle: labelTop }
                    ]
                },
                {
                    type: 'pie',
                    center: ['50%', '70%'],
                    radius: radius,
                    data: [
                        { name: 'other', value: 78, itemStyle: labelBottom },
                        { name: 'Messenger', value: 22, itemStyle: labelTop }
                    ]
                },
                {
                    type: 'pie',
                    center: ['70%', '70%'],
                    radius: radius,
                    data: [
                        { name: 'other', value: 83, itemStyle: labelBottom },
                        { name: 'Whatsapp', value: 17, itemStyle: labelTop }
                    ]
                },
                {
                    type: 'pie',
                    center: ['90%', '70%'],
                    radius: radius,
                    data: [
                        { name: 'other', value: 89, itemStyle: labelBottom },
                        { name: 'Instagram', value: 11, itemStyle: labelTop }
                    ]
                }
            ]
        };
        myRingPieChart.setOption(ringPieOption).hideLoading();
        require(['theme/default'], function (tarTheme) {
            myRingPieChart.setTheme(tarTheme);
        });
        var myLineChart = ec.init(document.getElementById('echartsLine')).showLoading({ effect: 'whirling' });
        var lineOption = {
            title: {
                text: 'Line'
            },
            legend: {
                data: ['Max', 'Min']
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value} °C'
                    },
                    splitArea: { show: true }
                }
            ],
            series: [
                {
                    name: 'Max',
                    type: 'line',
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                shadowColor: 'rgba(0,0,0,0.4)',
                                shadowBlur: 5,
                                shadowOffsetX: 3,
                                shadowOffsetY: 3
                            }
                        }
                    },
                    data: [11, 11, 15, 13, 12, 13, 10],
                    markPoint: {
                        data: [
                            { type: 'max', name: 'Max' },
                            { type: 'min', name: 'Min' }
                        ]
                    },
                    markLine: {
                        data: [
                            { type: 'average', name: 'Avg' }
                        ]
                    }
                },
                {
                    name: 'Min',
                    type: 'line',
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                shadowColor: 'rgba(0,0,0,0.4)',
                                shadowBlur: 5,
                                shadowOffsetX: 3,
                                shadowOffsetY: 3
                            }
                        }
                    },
                    data: [1, -2, 2, 5, 3, 2, 0],
                    markPoint: {
                        data: [
                            { name: 'Week Min', value: -2, xAxis: 1, yAxis: -1.5 }
                        ]
                    },
                    markLine: {
                        data: [
                            { type: 'average', name: 'Avg' }
                        ]
                    }
                }
            ]
        };
        myLineChart.setOption(lineOption).hideLoading();
        require(['theme/default'], function (tarTheme) {
            myLineChart.setTheme(tarTheme);
        });
        var myGaugeChart = ec.init(document.getElementById('echartsGauge')).showLoading({ effect: 'whirling' });
        var gaugeOption = {
            title: {
                text: 'Customer Rating',
                x: 'center'
            },
            series: [
                {
                    name: 'Customer Rating',
                    type: 'gauge',
                    detail: { formatter: '{value}' },
                    data: [{ value: 4.7, name: 'Rating' }],
                    min: 0,
                    max:5
                }
            ]
        };
        myGaugeChart.setOption(gaugeOption).hideLoading();
        require(['theme/default'], function (tarTheme) {
            myGaugeChart.setTheme(tarTheme);
        });
        window.onresize = function () {
            myBarChart.resize();
            myPieChart.resize();
            myRingPieChart.resize();
            myLineChart.resize();
            myGaugeChart.resize();
        };
    }

);
//Drag
$(function () {
    $(".sortable").sortable({
        connectWith: ".sortable",
        tolerance: 'pointer',
        revert: 'invalid',
        forceHelperSize: true,
        forcePlaceholderSize:true,
        handle: ".cursor-move",
        cancel: ".echarts-content,.db-custom",
        placeholder: "portlet-placeholder",
        start: function(event, ui) {
            var plus;
            if(ui.item.hasClass('db-1')) plus = 'db-1'; else
                if(ui.item.hasClass('db-2')) plus = 'db-2'; else
                    if(ui.item.hasClass('db-3')) plus = 'db-3'; else
                        if(ui.item.hasClass('db-1')) plus = 'db-1'; else
                            if(ui.item.hasClass('db-2')) plus = 'db-2'; else
                                if(ui.item.hasClass('db-3')) plus = 'db-3'; else
                                    plus = 'db-1';
            ui.placeholder.addClass(plus);
        }
    });
});
//TimePicker
$("#dateFrom,#dateTo").datetimepicker({
    format: 'mm/dd/yyyy h:ii P',
    weekStart: 1,
    todayBtn: 1,
    autoclose: 1,
    todayHighlight: 1,
    startView: 2,
    minView: 2,
    forceParse: 0
});
// Dashboard close
$('.wclose').click(function (e) {
    e.preventDefault();
    var $wbox = $(this).parent().parent().parent();
    $wbox.hide(100);
});
//dashboard Setting
$('#openSetting').click(function () {
    $('.db-custom').slideDown('fast');
});
$('#closeSetting').click(function () {
    $('.db-custom').slideUp('fast');
});
// hasRead-num
var incrementK = $('#fromAffiliate').text();

$({ numberValue: incrementK }).animate({
    numberValue: 129
}, {
    duration: 5000,
    easing: 'linear',
    step: function () {
        $('#fromAffiliate').text(Math.ceil(this.numberValue));
    },
    done: function () {
        $('#fromAffiliate').text(Math.ceil(this.numberValue));
    }
});

// unRead-num
var incrementL = $('#fromCustormer').text();

$({ numberValue: incrementL }).animate({
    numberValue: 48
}, {
    duration: 5000,
    easing: 'linear',
    step: function () {
        $('#fromCustormer').text(Math.ceil(this.numberValue));
    },
    done: function () {
        $('#fromCustormer').text(Math.ceil(this.numberValue));
    }
});

//loading
$(window).load(function () {
    setTimeout(function() {
        $('#load').fadeOut();
        $('#preloader').fadeOut();
        $('body').delay(350).css({
            'overflow': 'visible'
        });
    },2000);
});

//shake
$('#shake').jrumble({
    x: 4,
    y: 0,
    rotation: 0
});
$('#shake').trigger('startRumble');
$('#shake').click(function () {
    $(this).trigger('stopRumble').removeAttr('style');
});
$('#shake').hover(function () {
    $(this).trigger('stopRumble').removeAttr('style');
});

//right menu
$(document).ready(function () {
    context.init({
        fadeSpeed: 100,
        filter: function ($obj){},
        above: 'auto',
        preventDoubleContext: true,
        compress: false
    });
    context.attach('.well', [
         { header: 'Extensible Menu' },
         { text: 'Reload', href: '#' },
         { text: 'Zoom In', href: '#' },
         { text: 'Close', href: '#' },
         { divider: true },
         {
           text: 'Add Gadget',
           action: function(e) {
               $('#myModal').modal('show');
           }
         }
    ]);
});
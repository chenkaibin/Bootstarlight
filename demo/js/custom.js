// Scroll to top
$(function () {
    $(function () {
        $('html').append('<div class="scrollup"><a href="javascript:;" title="Scroll to top"></a></div>');
        $(window).scroll(function () {
            if ($(window).scrollTop() >= 50) {
                $('.scrollup').fadeIn(300);
            } else {
                $('.scrollup').fadeOut(300);
            }
        });
        $('.scrollup').click(function () {
            $('html,body').animate({ scrollTop: '0px' }, 800);
        });
    });
});
// Typeahead
var dssDashboard = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('result'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    prefetch: 'js/typeahead/data/dss-dashboard.json'
});

var dssWo = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('result'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    prefetch: 'js/typeahead/data/dss-wo.json'
});

var dssCallCenter = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('result'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    prefetch: 'js/typeahead/data/dss-callcenter.json'
});

var dssDivision = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('result'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    prefetch: 'js/typeahead/data/dss-division.json'
});

var dssFloorCare = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('result'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    prefetch: 'js/typeahead/data/dss-floorcare.json'
});

var dssClient = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('result'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    prefetch: 'js/typeahead/data/dss-client.json'
});

var dssAffiliate = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('result'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    prefetch: 'js/typeahead/data/dss-affiliate.json'
});

var dssReport = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('result'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    prefetch: 'js/typeahead/data/dss-report.json'
});

dssDashboard.initialize();
dssWo.initialize();
dssCallCenter.initialize();
dssDivision.initialize();
dssFloorCare.initialize();
dssClient.initialize();
dssAffiliate.initialize();
dssReport.initialize();

$('#typeahead').typeahead({
    highlight: true
},
{
    name: 'dss-dashboard',
    displayKey: 'result',
    source: dssDashboard.ttAdapter(),
    templates: {
        header: '<h4 class="league-name">Dashboard</h4>',
    }
},
{
    name: 'dss-wo',
    displayKey: 'result',
    source: dssWo.ttAdapter(),
    templates: {
        header: '<h4 class="league-name">WO</h4>'
    }
},
{
    name: 'dss-callcenter',
    displayKey: 'result',
    source: dssCallCenter.ttAdapter(),
    templates: {
        header: '<h4 class="league-name">Call Center</h4>'
    }
},
{
    name: 'dss-division',
    displayKey: 'result',
    source: dssDivision.ttAdapter(),
    templates: {
        header: '<h4 class="league-name">Division</h4>'
    }
},
{
    name: 'dss-floorcare',
    displayKey: 'result',
    source: dssFloorCare.ttAdapter(),
    templates: {
        header: '<h4 class="league-name">Floor Care</h4>'
    }
},
{
    name: 'dss-client',
    displayKey: 'result',
    source: dssClient.ttAdapter(),
    templates: {
        header: '<h4 class="league-name">Client</h4>'
    }
},
{
    name: 'dss-affiliate',
    displayKey: 'result',
    source: dssAffiliate.ttAdapter(),
    templates: {
        header: '<h4 class="league-name">Affiliate</h4>'
    }
},
{
    name: 'dss-report',
    displayKey: 'result',
    source: dssReport.ttAdapter(),
    templates: {
        header: '<h4 class="league-name">Report</h4>'
    }
})
    .on('typeahead:opened', onOpened)
    .on('typeahead:selected', onAutocompleted)
    .on('typeahead:autocompleted', onSelected);
function onOpened($e) {
    console.log('开始输入');
}

function onAutocompleted($e, datum) {
    console.log('点击结果');
    console.log(datum);
}

function onSelected($e, datum) {
    console.log('已选择');
    console.log(datum);
}
// SparkLine Bar
var $border_color = "#efefef";
var $grid_color = "#ddd";
var $default_black = "#666";
var $primary = "#575348";
var $secondary = "#8FBB6C";
var $orange = "#F38733";
$(function () {
  $('#currentSale').sparkline([23213, 63216, 82234, 29341, 61789, 88732, 11234, 54328, 33245], {
    type: 'bar',
    barColor: [$orange, $secondary],
    barWidth: 6,
    height: 18,
  });

  $('#currentBalance').sparkline([33251, 98123, 54312, 88763, 12341, 55672, 87904, 23412, 17632], {
    type: 'bar',
    barColor: [$secondary, $primary],
    barWidth: 6,
    height: 18,
  });
  
});

//Dropdown Menu
$( document ).ready(function() {
  $('#menu > ul > li > a').click(function() {
    $('#menu li').removeClass('active');
    $(this).closest('li').addClass('active'); 
    var checkElement = $(this).next();
    if((checkElement.is('ul')) && (checkElement.is(':visible'))) {
      $(this).closest('li').removeClass('active');
      checkElement.slideUp('normal');
    }
    if((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
      $('#menu ul ul:visible').slideUp('normal');
      checkElement.slideDown('normal');
    }
    if($(this).closest('li').find('ul').children().length == 0) {
      return true;
    } else {
      return false; 
    }   
  });
  //Dropdown sub sub Menu
  $('#menu > ul > li > ul > li > a').click(function() {
    $(this).closest('li').addClass('active'); 
    var checkElement = $(this).next();
    if((checkElement.is('ul')) && (checkElement.is(':visible'))) {
        checkElement.slideUp('normal');
        $(this).closest('li').removeClass('active');
    }
    if((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
       checkElement.slideDown('normal');
   }
    if ($(this).closest('li').find('ul').children().length == 0) {
      return true;
    } else {
        return false;
    }   
  });
});


$(function() {
  $(document).ready(function() {
    $.slidebars();
  });
});

//Sidebar
$(function() {
  var s = 0;
  
  $('.arrow-box').click(function() {
    if (s == 0) {
      s = 1;
      $('#sidebar').css('left', '-220px');
      $('.dashboard-wrapper').css('margin-left', '0px');
      $('.logo').css('background', 'transparent');
    } else {
      s = 0;
      $('#sidebar').css('left', '0');
      $('.dashboard-wrapper').css('margin-left', '220px');
      $('.logo').css('background', '');
    }
  });
});

//
$('#mob-nav').click(function(){
  if($('aside.open').length > 0){
    $('aside').attr('style', 'left: -220px').removeClass('open')
  } else {
    $('aside').attr('style', 'left: 0px').addClass('open')
  }
});
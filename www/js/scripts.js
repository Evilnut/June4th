

$(document).ready(function() {

    var records_per_page = 20;
  
	$('.pagination').jqPagination({
		link_string	: '/?page={page_number}',
		max_page	: 40,
		paged		: function(page) {
			
            console.log('');
            console.log('Page ' + page + ' requested');
            console.log(records_per_page + ' records per page');
            console.log('Show records ' + (records_per_page * (page-1) + 1) + ' to ' + records_per_page * (page));
          
		}
	});

});

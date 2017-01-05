define(["jquery"],function($){
	return {
		setActive:function(active){
			$(".navs a[href='"+active+"']").addClass("active");
		}
	}
})
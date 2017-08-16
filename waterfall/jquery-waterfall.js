 // $(window).on('load',function() {
 //        alert("hello,我是jQuery!");
 //  });
 // $(window).on('load',function() {
 //        alert("hello,我也是jQuery");
 // });
$(window).on('load',function(){
	var parentId = 'waterfall';
	var boxClass = 'box';

	waterfall(parentId,boxClass);
	var dataSet = {"images":[{"src":"image/1.jpg"},{"src":"image/2.jpg"},{"src":"image/3.jpg"},{"src":"image/4.jpg"},{"src":"image/5.jpg"}]};

	$(window).on('scroll',function(){
		if(checkScrollSlide(parentId,boxClass)){

			var boxHtml = '';
			$.each(dataSet.images,function(i,item){
				boxHtml += '<div class="box"><div class="pic"><img src="'+item.src+'"></div></div>'
			})
			$('#'+parentId).append(boxHtml);
			waterfall(parentId,boxClass);
		}
	})
	
})

function waterfall(parentId,boxClass){
	var parentNode = $('#'+parentId);
	var boxNodes = $('.'+ boxClass);
	var boxNum = boxNodes.length;
	if(boxNum){
		var boxWidth = boxNodes.eq(0).outerWidth(); //单个元素宽度
		var columnNum = Math.floor($(window).outerWidth() / boxWidth); //列数
		parentNode.width(boxWidth*columnNum); //设置父元素宽度
		var hArray = [];
		boxNodes.each(function(i,item){
			if(i<columnNum){
				hArray.push($(item).outerHeight());
			}else{
				var minHeight = Math.min.apply(null,hArray);
				var index = $.inArray(minHeight,hArray);
				$(item).css({
					'position':'absolute',
					'top':minHeight+'px',
					'left':index*boxWidth+'px'
				})

				hArray[index] += $(item).outerHeight();
			}
		})
	}
}

function checkScrollSlide(parentId,boxClass){
	var parentNode = $('#'+parentId);
	var boxNodes = $('.'+ boxClass);
	var boxNum = boxNodes.length;
	if(boxNum){
		var lastBoxTop = boxNodes.last().offset().top;//最后一个元素距离父元素顶部的距离
		var scrollTop = $(window).scrollTop(); // 滚动距离
		var clientHeight = $(window).height(); //可视区高度

		return lastBoxTop < (scrollTop + clientHeight) ? true : false;
	}else{
		return false;
	}

	
	
}
window.onload = function(){
	var parentNode = document.getElementById('waterfall');
	var boxNodes = document.getElementsByClassName('box');


	var dataSet = {"images":[{"src":"image/1.jpg"},{"src":"image/2.jpg"},{"src":"image/3.jpg"},{"src":"image/4.jpg"},{"src":"image/5.jpg"}]};
	waterfall(parentNode,boxNodes);
	//无限滚动加载图片
	window.onscroll = function(){
		if(checkScrollSlide(parentNode,boxNodes)){ // 检测滚动条件
			var images = dataSet.images;
			var imagesNum = images.length;
			var codeFrag = document.createDocumentFragment();//创建代码片段以减少DOM插入操作
			for (var i = 0; i < imagesNum; i++) {
				var boxNode = document.createElement('div');
				boxNode.className = 'box';
				codeFrag.appendChild(boxNode);
				var picNode = document.createElement('div');
				picNode.className = 'pic';
				boxNode.appendChild(picNode);
				var imgNode = document.createElement('img');
				imgNode.src = images[i].src;
				picNode.appendChild(imgNode);
				
			}
			parentNode.appendChild(codeFrag);
			waterfall(parentNode,boxNodes);
		}
		// checkScrollSlide(parentNode,boxNodes);
	}
}

//瀑布流
function waterfall(parentNode,boxNodes){
	 
	var boxNum = boxNodes.length;
	
	if(boxNum){
		
		var boxWidth = boxNodes[0].offsetWidth; //单个box的宽度
		var columnNum = Math.floor(document.body.clientWidth / boxWidth); //根据body对象可见区的宽度计算最大能放置多少列。
		
		parentNode.style.cssText = "width:"+boxWidth*columnNum+"px"; //计算并设置parentNode 的宽度
		var heigthArr = []; //高度存放数组，初始值为第一行元素的高度
		for (var i = 0; i < boxNum; i++) {
			if(i<columnNum){
				heigthArr.push(boxNodes[i].offsetHeight);
			}else{
				var minHeight = Math.min.apply(null,heigthArr);//计算当前最小高度
				var index = heigthArr.indexOf(minHeight); //计算当前最小高度所在的列
				boxNodes[i].style.position = 'absolute';
				boxNodes[i].style.top = minHeight+'px';
				boxNodes[i].style.left = boxNodes[index].offsetLeft+'px';
				heigthArr[index] += boxNodes[i].offsetHeight;

			}
		}
	}
	
}

//判断最后一个box距父元素顶部的距离是否小于滚动距离与网页可视区高度之和
function checkScrollSlide(parentNode,boxNodes){
	var boxNum = boxNodes.length;
	if(boxNum){
		var lastBoxTop = boxNodes[boxNum-1].offsetTop; //最后一个box距父元素顶部的距离
		var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;//滚动距离，兼容标准模式和怪异模式
		var clientHeight = document.body.clientHeight || document.documentElement.clientHeight;//网页可视区高度，兼容标准模式和怪异模式

		return lastBoxTop < (scrollTop + clientHeight) ? true: false;		
	}else{
		return false;
	}

}
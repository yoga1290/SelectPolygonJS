var SelectPolygon=function(canvasId,imgArray){
		
		var isCanvasReady=false;
		var canvas=document.getElementById(canvasId);
		var ctx=canvas.getContext('2d');
		

		// used for mapping XY to an imgArray index
		var Map=[];

		//initialize WxH empty array
		var initMap=function(w,h){
			var i,j;
			Map=[];
			for(i=0;i<w;i++)
			{
				Map.push([]);
				for(j=0;j<h;j++)
					Map[i].push(-1);
			}
		};

		// Map the new none-empty pixels of given canvas to the given value
		var assignXY2City=function(x,y,w,h,value){
			var pixels=ctx.getImageData(x,y,w,h);
			var cx,cy,j=0;
			for(var i=3,j=0;i<pixels.data.length;i+=4,j++)
			{
				cx=x+parseInt(j%w);
				cy=y+parseInt(j/w);

				if(Map[cx][cy]==-1 && pixels.data[i]!=0)//alpha
					Map[cx][cy]=value;
			}
		};

		// loads the imgArray array
		// flag isCanvasReady to true after loading all images
		var imgLoader=function(i){
			if(i>=imgArray.length) {isCanvasReady=true;return;}

			var img=new Image();
			img.onload=function(){
				ctx.drawImage(img,imgArray[i].x,imgArray[i].y);//(img,0,0);
				imgArray[i].img=img;

				assignXY2City(imgArray[i].x,imgArray[i].y,img.width,img.height,i);

				imgLoader(i+1);
			};
			img.src=imgArray[i].src;
		};

		initMap(canvas.width,canvas.height);
		imgLoader(0);


		return {
			//mouse events:
			onclick:function(callbackFn){
				var click=function(event){
					if(!isCanvasReady) return;
					if(callbackFn!==null && callbackFn!==undefined)
					callbackFn(event,
						Map[event.offsetX][event.offsetY]
						);
    			};
				canvas.onclick=click;
				return this;
			},
			ondblclick:function(callbackFn){
				var dbclick=function(event){
					if(!isCanvasReady) return;
					if(callbackFn!==null && callbackFn!==undefined)
					callbackFn(event,
						Map[event.offsetX][event.offsetY]
						);
    			};
				canvas.ondblclick=dbclick;
				return this;
			},
			onmousedown:function(callbackFn){
				var mousedown=function(event){
					if(!isCanvasReady) return;
					if(callbackFn!==null && callbackFn!==undefined)
					callbackFn(event,
						Map[event.offsetX][event.offsetY]
						);
    			};
				canvas.onmousedown=mousedown;
				return this;
			},
			onmousemove:function(callbackFn){
				var mousemove=function(event){
					if(!isCanvasReady) return;
					if(callbackFn!==null && callbackFn!==undefined)
					callbackFn(event,
						Map[event.offsetX][event.offsetY]
						);
    			};
				canvas.onmousemove=mousemove;
				return this;
			},
			onmouseover:function(callbackFn){
				var mouseover=function(event){
					if(!isCanvasReady) return;
					if(callbackFn!==null && callbackFn!==undefined)
					callbackFn(event,
						Map[event.offsetX][event.offsetY]
						);
    			};
				canvas.onmouseover=mouseover;
				return this;
			},
			onmouseout:function(callbackFn){
				var mouseout=function(event){
					if(!isCanvasReady) return;
					if(callbackFn!==null && callbackFn!==undefined)
					callbackFn(event,
						Map[event.offsetX][event.offsetY]
						);
    			};
				canvas.onmouseout=mouseout;
				return this;
			},
			onmouseup:function(callbackFn){
				var mouseup=function(event){
					if(!isCanvasReady) return;
					if(callbackFn!==null && callbackFn!==undefined)
					callbackFn(event,
						Map[event.offsetX][event.offsetY]
						);
    			};
				canvas.onmouseup=mouseup;
				return this;
			}

		};
	};
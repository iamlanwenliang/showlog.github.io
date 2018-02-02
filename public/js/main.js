var dic_create = {};
			dic_create.init = function(data,dom){
				document.getElementById(dom).innerHTML = this.build(data);
			}
			dic_create.build = function(obj){
				let str = '';
				let length = obj.length;
				for(let i=0;i<length;i++){
					str += '<details class="details" ' + this.isopen(obj[i]['isopen']) + '><summary>'+this.parentstr + obj[i]['name'] + "</summary>";
					if(obj[i]['parent']){
						let length2 = obj[i]['children'].length;
						for(let j=0;j<length2;j++){
							if(obj[i]['children'][j]['parent']){
								str += '<div class="childp">' + this.build(obj[i]['children'][j]['children']) + '</div>';
							}else{
								if(obj[i]['children'][j]['active']){
									str += '<div class="childp lan_child lan_active" data-href="'+obj[i]['children'][j]['url']+'">' +this.childstr + obj[i]['children'][j]['name'] + '</div>';
								}else{
									str += '<div class="childp lan_child" data-href="'+obj[i]['children'][j]['url']+'">' +this.childstr + obj[i]['children'][j]['name'] + '</div>';
								}
								
							}
						}
					}
					str += '</details>';
				}
				
				
				return str ;
			}
			dic_create.isopen = function(con){
				return con?'open':'';
			}
			dic_create.parentstr = '<span class="iconfont  icon-file-b-"></span><span class="iconfont  icon-wenjian"></span>';
			dic_create.childstr = '<span class="iconfont  icon-file"></span>';
			
			$.getJSON('public/set_dic.json', function(data){
			  console.log(data)
			  if(data.length>0){
			  	dic_create.init(data,'directory');
			  }
			  
			});
			$('body').on('click','.lan_child',function(){
				//alert(0)
				$('.lan_child').removeClass('lan_active');
				$(this).addClass('lan_active');
				let url = $(this).attr('data-href');
				if(url){
				   $('#content').attr('src',url);
				}else{
				   $('#content').attr('src','javascript/preface/index.html');
				}
			});
			
//tips_sign
$('#content').attr('src','javascript/preface/index.html');

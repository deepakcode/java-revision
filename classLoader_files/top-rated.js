function PDRTJS_RATING_TOP(posts_id,pages_id,comments_id,seq,item_count){var server=("https:"==document.location.protocol?'https:':'http:')+'//polldaddy.com';this.filters=new Array;function $(id){return document.getElementById(id);}
this.make_call=function(url){var s=document.createElement('SCRIPT');s.charset='utf-8';s.src=server+url;var h=document.getElementsByTagName('head').item(0);h.appendChild(s);}
this.get_top=function(content,period){id=0;switch(content){case'posts':id=posts_id;break;case'pages':id=pages_id;break;case'comments':id=comments_id;break;}
link='/ratings/rating-top.php?id='+id+'&period='+period+'&content='+content+'&seq='+seq+'&item_count='+item_count;if(this.filters.length>0){link+='&filters=';for(var i=0;i<this.filters.length;i++){link+=this.filters[i]+':';}
link=link.slice(0,-1);}
this.make_call(link);}}
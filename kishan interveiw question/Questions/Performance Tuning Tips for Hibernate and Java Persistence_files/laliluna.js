$(function(){
 var i = window.location.pathname.lastIndexOf('/');
 var href= window.location.pathname.substring(i+1);
 if (/^\/articles/.test(window.location.pathname)){
  var link = $('#sidebar a[href=/tutorials.html]');
// add class to pretty print all pre with lang-*
 $('pre[class^=lang-]').addClass('prettyprint');
 prettyPrint();
// replace wide tab with spaces
 $('pre[class^=lang-]').each(function(){
   $(this).html($(this).html().replace(/\t/g, "   "));
 });
 }else{
   var link = $('#sidebar a[href=/' + href + ']');
}
 link.addClass('selected');

	var jsonStore = {
		jsonMap: new Array(),
		prefixes: 'a b c d e f g h i j k l m n o p q r s t u v w x y z',
		excludes: ['a','one','two','three','the','this','that','those','these','what','who','why','when','which','then','i',
		'you','yours','we','ours','he','his','she','hers','it','is','are','good','better','of','in','to','find','result','if',
		'an','will','you','now','for','there','other','may','avoid','and','or','get','need','can','could','create','some','any',
		'by','has','have','had','as','well','add','added','new','plain','from','know','been','their','want','than','our','does',
		'do','should','them','very','using','our','here','must','there','next','into','author','paper','book','about','your',
		'tutorials','org','not','use','called','changed','how','laliluna','information','working','but','set','available',
		'public','only','private','language','easy','used','application','sebastian','same','complete','pdf','first','file',
		'source','was','web','following','more','with'],
		lastInput: '',
		processSearch: function(prefixes){

			var items = new Array();
			var links = new Array();
			
			var filterPref = [];
			for(var i=0; i< prefixes.length; i++){
				var p = prefixes[i];
				if(this.excludes.indexOf(p) == -1)
					filterPref.push(p);
			}
			

			for(var i=0; i< filterPref.length;i++){
				var prefix = filterPref[i];
				var calcPrefix = this.calculatePrefix(prefix);
				var json = this.jsonMap[calcPrefix];
				var pLinks = new Array();

				$.each(json, function(index, keyitem) {
					if(keyitem['key'].indexOf(prefix) == 0){
					 $.each(keyitem['items'], function(index2, item){
						if($.inArray(item.link, links) == -1){
							links.push(item.link);
						}
						if($.inArray(item.link, pLinks) == -1){
							pLinks.push(item.link);
							if(typeof items[item.link] == 'undefined')
								items[item.link] = [1,item];
							else{
								items[item.link][0] = items[item.link][0] + 1;
								items[item.link][1].value = items[item.link][1].value + item.value;
							}

						}
					 });
					}

				  });
			}		

			var result = new Array();
			for(var item in items){
				if(items[item][0] == filterPref.length)
					result.push(items[item][1]);
			}

			result.sort(function(a,b){return b.value - a.value; });

			var out = $('#searchResult');
			out.empty();	
			out.append($('<h1>Search Result</h1>'));
			$.each(result, function(key,item){
				out.append($('<div><a href="'+item.link+'">'+item.title+
				' ('+ item.value+') </a><br/>'+item.description+'</div>'));
			});

		},
		calculatePrefix: function(prefix){
			if(this.prefixes.indexOf(prefix.substring(0,1)) == -1)
				return 'other';
			else
				return prefix.substring(0,1);

		},
		getJson: function(prefix){
			var self = this;
			var prefixes = prefix.split(' ');
			// assumption that the user is typing and that the last json was already loaded
			var toLoad = [];
			for(var i = 0; i< prefixes.length;i++){
				var calcPrefix = this.calculatePrefix(prefixes[i]);
				if(!self.jsonMap[calcPrefix]){
					toLoad.push(calcPrefix);
				}
			}

			if(toLoad.length==0){
				self.processSearch(prefixes);
			}
			else{
				// load first values synchronously
				for(var i=0; i< toLoad.length-1; i++){
					$.ajax({
					  url: '/articles/search/'+toLoad[i]+'.json',
					  dataType: 'json',
					  async: false,
					  success: function(data){
						self.jsonMap[toLoad[i]] = data;
					}});

				}
				$.ajax({
				  url: '/articles/search/'+toLoad[toLoad.length-1]+'.json',
				  dataType: 'json',
				  success: function(data){
					self.jsonMap[toLoad[toLoad.length-1]] = data;
					self.processSearch(prefixes);
				}});
			}
		}

	}
	$('#search form').submit(function(e){
		return false;
	});
	$('#search input').keyup(function(e){
		var input = $(this).val().toLowerCase();
		input = input.replace(/^\s+|\s+$/g, '') ;
		if(input == ''){
			$('#searchResult').remove();
			$('#main').show();
		}else{
			if(input == jsonStore.lastInput && $('#searchResult').is(":visible"))
				return;
			jsonStore.lastInput = input;

			var m = $('#main');
			if($('#searchResult').size() == 0)
				$('<div id="searchResult"/>').insertBefore(m);
			m.hide();
			jsonStore.getJson(input);
		}


	});

});

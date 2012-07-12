window.onresize = windowResize;
var editor_padding_real = 40;
var editor_width_padding = editor_padding_real * 2;
var editor_height_padding = (editor_padding_real * 2) + 20;
var editor = false;

$(document).ready(function() {
	
	$('body').height($(window).height()-20);
	$('body').addClass('shadow');
	
	$('.format-container').mouseenter(function(){
		$('.format-container').animate({
			top: '0px',
			right: '0px'
		},500);
	});
	$('.format-panel').mouseleave(function(){
		$('.format-container').animate({
			top: '-65px',
			right: '-110px'
		},500);
	});
	
	$('#input').bind('paste', function(e){
		setTimeout(function(){ safify($('#input').html()); },0);
	});
	
	windowResize();
});

function windowResize(){
	editor_width_padding = editor_padding_real * 2;
	editor_height_padding = (editor_padding_real * 2) + 20;
	$('body:first, .cleditorMain').height($(window).height()-20);
	$("body").width($("iframe").contents().find("html").width()-editor_width_padding);
	$("body").height($(window).height()-editor_height_padding);
}

function safify(content){
	var content = HTMLtoText(content);
	$('#input').html(TexttoHTML(content));
}

function HTMLtoText(text){
	text = text.replace(/<b>/gi,'[b]').replace(/<\/b>/gi,'[/b]');
	text = text.replace(/<i[^>]*>/gi,'[i]').replace(/<\/i>/gi,'[/i]');
	text = text.replace(/<u[^>]*>/gi,'[u]').replace(/<\/u>/gi,'[/u]');
	text = text.replace(/<br>/gi,'[br]').replace(/<br \/>/gi,'[br]');
	text = text.replace(/<div[^>]*>/gi,'[p]').replace(/<\/div>/gi,'[/p]');
    return text.replace(/(<([^>]+)>)/gi,'');
}
function TexttoHTML(text){
	text = text.replace(/\[b\]/g,'<b>').replace(/\[b\]/g,'</b>');
	text = text.replace(/\[i\]/g,'<i>').replace(/\[i\]/g,'</i>');
	text = text.replace(/\[u\]/g,'<u>').replace(/\[u\]/g,'</u>');
	text = text.replace(/\[br\]/g,'<br />');
	text = text.replace(/\[p\]/g,'<div>').replace(/\[\/p\]/g,'</div>');
	text = text.replace(/	/g,'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')
    return text;
}

function setStyle(style){
	rangy.init();
	var selection = rangy.getSelection();
	var range = selection.getRangeAt(0);
	var wrapper = document.createElement('f');
	if(range.canSurroundContents(wrapper)){
		range.surroundContents(wrapper)
		var tag = $('f').parent().is(style);
		var pre = range.toString();
		if(tag == true){
			$('f').parent().replaceWith(pre);
		}else{
			var wrapper = document.createElement(style);
			$(wrapper).html(pre);
			$('f').replaceWith($(wrapper).outerHTML());
			$(wrapper).remove();
		}
	}else{
		var rangenodes = range.getNodes();
		$.each(rangenodes, function(index, node){
			$(node).wrap(wrapper);
			var tag = $('f').parent().is(style);
			var pre = $(node).outerHTML();
			if(tag == true){
				$('f').parent().replaceWith(pre);
			}else{
				var cleanwrap = document.createElement(style);
				$(cleanwrap).html(pre);
				$('f').replaceWith($(cleanwrap).outerHTML());
				$(cleanwrap).remove();
			}
		});
	}
}
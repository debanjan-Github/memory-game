// Coded by Debanjan Basu
var rows = 6;
var columns = 6;
var firstClick = true;
var circleBoxes = [];
var clickedBoxes = [];
function selectRandomMemoryLocations() {
	var memoryBoxes = Array.prototype.slice.call(document.querySelectorAll('.memory-box'));
	var shuffled = memoryBoxes.sort(function(){
		return 0.555 - Math.random();
	});
	var circles = localStorage.getItem('circles') || localStorage.setItem('circles', 5);
	return shuffled.slice(0, circles || 5);
}
function resetClickHandler(e) {
	localStorage.removeItem('circles');
	window.location.reload();
}
function wrapperClickHandler(e) {
	var target = e.target;
	if (target.className === 'memory-circle') target = target.parentElement;
	if ((target.className === 'memory-box') && target.childNodes.length && (target.childNodes[0].className === 'memory-circle')) {
		firstClick = false;
		if (target.childNodes[0].style.opacity === '0') {
			clickedBoxes.push(target);
			if (clickedBoxes.length === circleBoxes.length) {
				alert('won');
				localStorage.setItem('circles', Number(localStorage.getItem('circles'))+1)
				window.location.reload();
			}	
		} else {
			Array.prototype.slice.call(document.querySelectorAll('.memory-circle')).forEach(function(element) {
				element.style.opacity = 0;
			});
			clickedBoxes.push(target);
		}
		
	} else {
		if (!firstClick) {
			alert('lost');
			localStorage.removeItem('circles');
			window.location.reload();
		}	
	}
}
window.onload = function(e) {
	var i = 0;
	var wrapperDiv = document.getElementById('content_wrapper');
	var reset = document.getElementById('reset_button');
	while (i < rows*columns) {
		var template ='<div id="memory_box_'+i+'" class="memory-box"></div>'

		wrapperDiv.innerHTML += template;
		i++;
	}
	wrapperDiv.addEventListener('click', wrapperClickHandler);
	reset.addEventListener('click', resetClickHandler);
	var randomLocations = selectRandomMemoryLocations();
	circleBoxes = randomLocations;
	randomLocations.forEach(function(element) {
	  element.innerHTML = '<div class="memory-circle"></div>';
	});
}
let targetItem = 1;
    
function TargetCount(){
	return targetDescriptions.length;
}

function Load(){
	// Add css
	var link = document.createElement("link");
	link.type = "text/css";
	link.rel = "stylesheet";
	var formatName = "Mobile";
	if (screen.width > screen.height){
		formatName = "Windows";
	}
	link.href = "css/searchPlate" + formatName + ".css";
	var head = document.head;
	head.appendChild(link);
	
	// Set the background image for the search plate
	let backgroundImageElement = document.getElementById("searchPlateContainer").getElementsByTagName("img")[0];
	backgroundImageElement.src = "images/searchPlate/background" + formatName + ".png"
	
	// Set the game info text
	document.getElementById("progressText").innerHTML = "0/" + TargetCount();
	document.getElementById("targetDescription").innerHTML = targetDescriptions[0];
}

function OnStartButton(){
	document.getElementById("gameIntroScreen").style.display = "none";
}

function OnItemClicked(itemIndex){
	if (targetItem > TargetCount()) {return;}
	if (itemIndex != targetItem) {return;}
	
	document.getElementById("invitation").style.display = "block";
	setTimeout(function() {
		document.getElementById("info-" + itemIndex).classList.add("visible");
	}, 100);
	document.getElementById("progressText").innerHTML = targetItem + "/" + TargetCount();
	document.getElementById("targetDescription").innerHTML = "";
	targetItem ++;
}
	
function OnCloseInvitationClicked(){
	if (targetItem <= TargetCount()){
		document.getElementById("targetDescription").innerHTML = targetDescriptions[targetItem-1];
	}else{
		document.getElementById("progressText").innerHTML = "Je hebt het spel uitgespeeld!";		
	}
	document.getElementById("invitation").style.display = "none";
}   
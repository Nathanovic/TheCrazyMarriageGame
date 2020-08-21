let targetItem = 1;
let isSpecialGuest = false;
let progressScreenElement;
let progressScreenImage;
let progressScreenText;
let progressScreenButtonText;
    
function TargetCount(){
	let targetCount = targetDescriptions.length;
	if (isSpecialGuest){
		targetCount += specialGuestTargetDescriptions.length;
	}
	return targetCount;
}

function Load(){
	// Add css
	let link = document.createElement("link");
	link.type = "text/css";
	link.rel = "stylesheet";
	let formatName = "Mobile";
	if (screen.width > screen.height){
		formatName = "Windows";
	}
	link.href = "css/searchPlate" + formatName + ".css";
	let head = document.head;
	head.appendChild(link);
	
	// Set the background image for the search plate
	let backgroundImageElement = document.getElementById("searchPlateContainer").getElementsByTagName("img")[0];
	backgroundImageElement.src = "images/searchPlate/background" + formatName + ".png"
	
	// See if this player is the special guest
	let splittedURL = window.location.href.split('/');
	let location = splittedURL[splittedURL.length -1];
	isSpecialGuest = location.includes("?specialGuest=true");
	
	// If the player is not a special guest, remove special-guest-only stuff
	if(!isSpecialGuest){
		let specialGuestElements = document.getElementsByClassName("specialGuestItem");
		for(let i = 0; i < specialGuestElements.length; i ++){
			specialGuestElements[i].style.display = "none";
		}
	}
	
	// Set the game info text
	document.getElementById("progressText").innerHTML = "0/" + TargetCount();
	document.getElementById("targetDescription").innerHTML = targetDescriptions[0];
}

function OnStartButton(){
	document.getElementById("gameIntroScreen").style.display = "none";
	progressScreenElement = document.getElementById("gameProgressScreen");
	progressScreenImage = progressScreenElement.getElementsByTagName("img")[0];
	progressScreenText = progressScreenElement.getElementsByTagName("p")[0];
	progressScreenButtonText = progressScreenElement.getElementsByTagName("p")[1];
	progressScreenElement.style.display = "block";
	progressScreenImage.src = "images/popUpScreens/gameProgressScreenImage" + targetItem + ".png";
}

function OnContinueButton(){
	progressScreenElement.style.display = "none";	
	if (targetItem <= TargetCount()){
		document.getElementById("targetDescription").innerHTML = targetDescriptions[targetItem-1];
	}else{
		document.getElementById("progressText").innerHTML = "Je hebt het spel uitgespeeld!";		
	}
}

function OnItemClicked(itemIndex){
	if (targetItem > TargetCount()) {return;}
	if (progressScreenElement.style.display != "none") {return;}
	if (itemIndex != targetItem) {return;}
	
	document.getElementById("progressText").innerHTML = targetItem + "/" + TargetCount();
	document.getElementById("targetDescription").innerHTML = "";
	targetItem ++;
	
	progressScreenElement.style.display = "block";
	if (targetItem <= TargetCount()){
		progressScreenImage.src = "images/popUpScreens/gameProgressScreenImage" + targetItem + ".png";
	}
	else{
		progressScreenImage.src = "images/popUpScreens/invitationCompleteImage.png";		
	}
} 
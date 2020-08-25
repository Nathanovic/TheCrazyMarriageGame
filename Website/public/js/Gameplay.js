let targetItem = 1;
let isSpecialGuest = false;
let progressScreenElement;
let progressScreenImage;
let progressScreenText;
let progressScreenButtonText;
let progressFinalContainer;

let targetCount;

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
	
	// Set target count
	if (isSpecialGuest){
		targetCount = targetDescriptions.length;
	}
	else{
		targetCount = targetDescriptions.length - SPECIAL_GUEST_ITEM_COUNT;		
	}
	
	// Set the game info text
	document.getElementById("progressText").innerHTML = "1/" + targetCount;
	document.getElementById("targetDescription").innerHTML = targetDescriptions[0];
}

function OnStartButton(){
	progressScreenElement = document.getElementById("gameProgressScreen");
	progressScreenImage = progressScreenElement.getElementsByTagName("img")[0];
	progressScreenText = progressScreenElement.getElementsByTagName("p")[0];
	progressScreenButtonText = progressScreenElement.getElementsByTagName("p")[0];
	progressFinalContainer = document.getElementById("finalScreenButtonContainer");
	
	document.getElementById("gameIntroScreen").style.display = "none";
	progressScreenElement.style.display = "block";
	progressScreenImage.src = "images/popUpScreens/gameProgressScreenImage" + targetItem + ".png";
}

function OnContinueButton(){
	if (targetItem <= targetCount){
		progressScreenElement.style.display = "none";
		document.getElementById("targetDescription").innerHTML = targetDescriptions[targetItem-1];
	}
	else{	
		OpenFinalScreen();
	}
}

function OnItemClicked(itemIndex){
	if (targetItem > targetCount) {return;}
	if (progressScreenElement.style.display != "none") {return;}
	if (itemIndex != targetItem) {return;}
	
	document.getElementById("progressText").innerHTML = (targetItem + 1) + "/" + targetCount;
	document.getElementById("targetDescription").innerHTML = "";
	targetItem ++;
	
	progressScreenElement.style.display = "block";
	if (targetItem <= targetCount || isSpecialGuest){
		progressScreenImage.src = "images/popUpScreens/gameProgressScreenImage" + targetItem + ".png";
		if (targetItem > targetCount){
			progressScreenButtonText.innerHTML = "Ga door";
		}
	}
	else{
		OpenFinalScreen();
	}
	
	if (targetItem > targetCount){
		document.getElementById("progressText").innerHTML = "Je hebt het spel uitgespeeld! (but where is the progress screen??)";
	}
}

function OpenFinalScreen(){
	document.getElementById("gameCompletedScreen").style.display = "block";
	if (screen.width < 650){
		document.getElementById("gameCompletedScreen").getElementsByTagName("img")[0].src = "images/popUpScreens/invitationCompleteMobile.png";
	}
}

function OnDownloadInvitationButton(){
	if (isSpecialGuest){
		window.open("images/InvitationSpecialGuest.pdf");		
	}
	else{
		window.open("images/InvitationStandard.pdf");			
	}
}

function OnGoToWebsiteButton(){
	window.open("RSVP.html");
}
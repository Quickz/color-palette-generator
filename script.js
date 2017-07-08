
var colorPaletteColors = [];

var slots = document.getElementsByClassName("color-slot");
for (let i = 0; i < slots.length; i++)
{
	colorPaletteColors[i] = {
		"container": slots[i],
		"color": slots[i].getElementsByTagName("div")[0],
		"text": slots[i].getElementsByTagName("span")[0]
	};
}

var historySection = document.getElementById("history-section");

var sectionToggleProcessing;
var historySectionActive;


/**
 * creates a color palette element
 * containing a square with the color
 * and a color code on the bottom
 */
function createPaletteColor(colorCode)
{
	var container = document.createElement("div");
	container.className = "color-slot";
	historySection.appendChild(container);

	var color = document.createElement("div");
	color.style.backgroundColor = "#" + colorCode;
	container.appendChild(color);

	var text = document.createElement("span");
	text.innerHTML = "#" + colorCode;
	container.appendChild(text);

	return container;
}


/**
 * creates a container for
 * a color palette - full row of colors
 */
function createPaletteContainer()
{
	var container = document.createElement("div");
	container.className = "color-slot-container";
	return container;
}


/**
 * fills up the current palette with new colors
 * and creates a copy of it inside recent history
 */
function generatePalette()
{
	var recentHistoryRow = createPaletteContainer();
	historySection.appendChild(recentHistoryRow);

	for (let i = 0; i < colorPaletteColors.length; i++)
	{
		var color = generateColor();
		colorPaletteColors[i].color.style.backgroundColor = "#" + color;
		colorPaletteColors[i].text.innerHTML = "#" + color;
		recentHistoryRow.appendChild(createPaletteColor(color));
	}
}


/**
 * creates a random hexadecimal number
 * representing a color
 */
function generateColor()
{
	var hex = Math.round(Math.random() * 1600000);
	hex = hex.toString(16);
	hex = padLeft(hex, 6);
	return hex;
}


/**
 * adds extra zeros until
 * the input string reaches selected length
 */
function padLeft(str, lng)
{
	while (str.length < lng)
		str += "0";
	return str;
}


/**
 * opens up or closes down
 * recent history page
 */
function toggleHistory()
{
	if (sectionToggleProcessing) return;
	sectionToggleProcessing = true;
	if (historySectionActive)
	{
		historySectionActive = false;
		processHeight(0.8, 0);
	}	
	else
	{
		historySectionActive = true;
		processHeight(0.8, 300);
	}
}


/**
 * increases/decreases history section
 * height until the targetValue's reached
 */
function processHeight(modifier, targetValue)
{
	var height = historySection.clientHeight;
	if (targetValue == 0)
		height = Math.floor(height * modifier);
	else
	{
		if (height == 0)
			height = 1;
		else
			height = Math.ceil(height + (targetValue - height) / 8);
	}

	if (height == targetValue ||
		targetValue > 0 && height > targetValue)
	{
		historySection.style.height = targetValue + "px";
		sectionToggleProcessing = false;
		return;
	}
	historySection.style.height = height + "px";
	setTimeout(function() {
		processHeight(modifier, targetValue);
	}, 10);
}

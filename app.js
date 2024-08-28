//Global vareable
let div= null;
const defultColor={
	red:255,
	green:0,
	blue:255
}
const colorModeRadio=document.getElementsByName("color-mode");
const defultPresetColor=['#FF00FF','#460D94','#0F5F16','#22081A','#036109','#525268','#E6602A','#D068C1','#15516B','#1921B8','#93C903','#02F34F','#8D5E5E','#140FA8','#705E39','#4F82B8','#907010','#0D0645','#758815','#59B4C3','#3EB1B6','#905108','#529CDB','#38B717'];
const copyBtnAudio=new Audio('button.mp3')
const custumColor=[];
const colorModeHexIn=document.getElementById("input-hex");
const custumColorPerent=document.getElementById('custum-color');
// Onload Hendelar
window.onload = () => {
	main();
	updateColorCodeToDom(defultColor);
	// display color boxex
	displayColorBoxs(document.getElementById('preset-color'),defultPresetColor);
};
// Main function and all dom refarance
function main() {
	//Dom refaerance
	const colorSliderRed=document.getElementById("color-slider-red");
	const colorSliderGreen=document.getElementById("color-slider-green");
	const colorSliderBlue=document.getElementById("color-slider-blue");
    const generateRandomColorBtn=document.getElementById("generate-random-color")
	const copyToClipboardBtn=document.getElementById("copy-to-clipboard")
	const perentPresetBox=document.getElementById('preset-color')
	const saveCustunBtn=document.getElementById("save-to-custum");
	
	

	//Event Listener

    generateRandomColorBtn.addEventListener('click',eventHandaler);
	colorModeHexIn.addEventListener('keyup',handleColorModeHexInp);
	colorSliderRed.addEventListener('change',colorSlider(colorSliderRed,colorSliderGreen,colorSliderBlue))
	colorSliderGreen.addEventListener('change',colorSlider(colorSliderRed,colorSliderGreen,colorSliderBlue))
	colorSliderBlue.addEventListener('change',colorSlider(colorSliderRed,colorSliderGreen,colorSliderBlue))
	copyToClipboardBtn.addEventListener("click",copyToColorCode)
	perentPresetBox.addEventListener('click',handlePerentPresetBoxEvent)
	saveCustunBtn.addEventListener('click',handleCustumColor)
	custumColorPerent.addEventListener('click',handlePerentPresetBoxEvent)
}

//Event handelar
function eventHandaler(){
    const color=genarateColorDecimel();
    updateColorCodeToDom(color);
};
function handleColorModeHexInp(e){
	const hexColor=e.target.value;
	if(hexColor){
		this.value=hexColor.toUpperCase()
		if(isValidHex(hexColor)){
		const color=hexToRgb(hexColor);
		updateColorCodeToDom(color);
		
	}
	
	}
}
function colorSlider (colorSliderRed,colorSliderGreen,colorSliderblue){
	return function color(){
	const color={
		red:parseInt(colorSliderRed.value),
		green:parseInt(colorSliderGreen.value),
		blue:parseInt(colorSliderblue.value)
	}
	updateColorCodeToDom(color);
}}

function copyToColorCode(){
	copyBtnAudio.play();
		copyBtnAudio.volume=0.2
	const mode=getCheckedValueFromRadio(colorModeRadio)
	if(mode===null){
		throw new Error("Invalid Color Code");
	}

	if(div!==null){
		div.remove();
		div=null;
	}

	if (mode==="hex"){
	const hexColor=document.getElementById("input-hex").value
	if(hexColor&&isValidHex){
		navigator.clipboard.writeText(`#${hexColor}`);
		genetareTostMassage(`#${hexColor} Copyed`)
		copyBtnAudio.play();
		copyBtnAudio.volume=0.5
	}else{
		alert("Invalid Hex-Color Code");
	}
	
}
	else{
		const rgbColor=document.getElementById("input-rgb").value
		if(rgbColor){
			navigator.clipboard.writeText(rgbColor);
			genetareTostMassage(`#${rgbColor} Copyed`)
		}else{
			alert("Invalid RGB-Color Code")
		}
		
	}}
	function handlePerentPresetBoxEvent(event){
		const child=event.target;
		if(child.className==='color-box'){
			navigator.clipboard.writeText(child.getAttribute('data-color'))
			copyBtnAudio.play();
			copyBtnAudio.volume=0.5
			genetareTostMassage(child.getAttribute('data-color'));
		}
		if(div!==null){
			div.remove();
			div=null;
		}
		
		document.getElementById("color-display").style.backgroundColor=child.getAttribute('data-color');
		
	}

	function handleCustumColor(){
		custumColor.push(`#${colorModeHexIn.value}`)
		removeChildren(custumColorPerent);
		displayColorBoxs(custumColorPerent,custumColor)
		copyBtnAudio.play();
		copyBtnAudio.volume=0.2
		
	}
// DOM relatet function
/**
 * genarate a daynamic dom elinemt tost massage
 * @param {string} mgs 
 */
function genetareTostMassage(mgs){
	div = document.createElement('div')
	div.innerText=mgs;
	div.className='toast-message toast-message-slide-in'
	div.addEventListener('click' , ()=>{
		div.classList.remove('toast-message-slide-in')
		div.classList.add('toast-message-slide-out')
		div.addEventListener('animationend',()=>{
			div.remove()
			div=null;
		})
	})


	document.body.appendChild(div);
}

/**
 * get checked value from dom eliment
 * @param {Array} node 
 * @returns {string/null}
 */
function getCheckedValueFromRadio(node){
	let checkedValue=null;
	for(let i=0; i<node.length;i++){
		if(node[i].checked){
			checkedValue=node[i].value
			break
		}
	}
	return checkedValue
}
/**
 * update dom to calculated color values
 * @param {object} color
 */
function updateColorCodeToDom(color){
    const hexColor=generateHexColor(color);
    const rgbColor=genarateRGBcolor(color);
    document.getElementById("color-display").style.backgroundColor=hexColor
    document.getElementById("input-hex").value=hexColor.slice(1);
    document.getElementById("input-rgb").value=rgbColor
    document.getElementById("color-slider-red-label").innerText=color.red;
    document.getElementById("color-slider-red").value=color.red;
    document.getElementById("color-slider-green-label").innerText=color.green;
    document.getElementById("color-slider-green").value=color.green;
    document.getElementById("color-slider-blue-label").innerText=color.blue;
    document.getElementById("color-slider-blue").value=color.blue;
}

/**
 * 
 * @param {string} color 
 * @returns {object} 
 */

function generateColorBox(color){
	const div=document.createElement('div');
	div.classList='color-box'
	div.style.backgroundColor=color;
	div.setAttribute('data-color',color);
	return div;
}
/**
 * 
 * @param {object} perent
 * @param {Array} colors
 */
function displayColorBoxs(perent,colors){
	colors.forEach(function(color){
		const colorBox=generateColorBox(color)
		perent.appendChild(colorBox)
	})
}
function removeChildren(perent){
	let child=perent.lastElementChild;
	while(child){
		perent.removeChild(child)
		child=perent.lastElementChild;
	}
}

//Other all function
/**
 * genarate and return an object three color decimel value
 * @returns {object}
 */
function genarateColorDecimel(){
	const red = Math.floor(Math.random() * 255);
	const green = Math.floor(Math.random() * 255);
	const blue = Math.floor(Math.random() * 255);
	return {
		red,
		green,
		blue,
	};
}
/**
 * take an object three decimel color code and returns hexadecimel color code
 * @param {object} color 
 * @returns {string}
 */
function generateHexColor({red,green,blue}) {
	const getTwoCode=(value)=>{
		const hex=value.toString(16);
		return hex.length===1?`0${hex}`: hex;
	}
	return `#${ getTwoCode(red)}${getTwoCode(green)}${ getTwoCode(blue)}`.toUpperCase();
}
/**
 * take an object three decimel color code and returns rgb color code
 * @param {object} color 
 * @returns {string}
 */
function genarateRGBcolor({red,green,blue}){
	return `RGB(${red},${green},${blue})`
}

/**
 * convarte hex to decimel number
 * @param {string} hex
 * @returns {object}
 */
function hexToRgb(hex){
	const red =parseInt(hex.slice(0,2),16);
	const green =parseInt(hex.slice(2,4),16);
	const blue = parseInt(hex.slice(4),16);
	return {
        red,
        green,
        blue
    };
}
/**
 * validate hex color code
 * @param {string} color 
 * @returns {boolean}
 */
function isValidHex(hexColor){
 if(hexColor.length!==6)return false;
 return /^[0-9A-Fa-f]{6}$/i.test(hexColor);

}

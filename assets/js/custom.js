
let canvas = new fabric.Canvas('tshirt-canvas-front');
let canvasBack = new fabric.Canvas('tshirt-canvas-back');

//fuction to change color
function changeColor(color) {
    document.getElementById("tshirt-div").style.backgroundColor = color;
    document.getElementById("tshirt-div-back").style.backgroundColor = color;
}

//change image src function with name changetshirt
function changetshirt(tshirtImage){
    front=tshirtImage;
    // replace "front" with "back" in tshirtImage
    back=tshirtImage.replace("front","back");
    document.getElementById("tshirt-backgroundpicture").src = front;
    document.getElementById("tshirt-backgroundpicture-back").src = back;
}

let activecanvas=canvas;

document.querySelectorAll(".product-tab-info-link").forEach(function(button) {
    button.addEventListener("click", function() {
        if (this.getAttribute("data-bs-target") === "#nav-description") {
            console.log("Front tab is active");
            activecanvas=canvas;
        } else if (this.getAttribute("data-bs-target") === "#nav-additional-information") {
            console.log("Back tab is active");
            activecanvas=canvasBack;
        }
    });
});



//function to add text
function addText(){
    var message = document.getElementById("text-input").value;
    var text = new fabric.Text(message, {
        left: 100,
        top: 100,
        fontFamily: 'helvetica',
        fill: '#000000',
        fontSize: 20
    });
    activecanvas.add(text);
    activecanvas.setActiveObject(text);
    text.bringToFront();
    document.getElementById("text-input").value="";

}

//put selected text in input
canvas.on('selection:created', function(options) {
    document.getElementById("text-input").value=options.target.text;
});

// unset input when no text is selected
canvas.on('selection:cleared', function(options) {
    document.getElementById("text-input").value="";
});

canvasBack.on('selection:created', function(options) {
    document.getElementById("text-input").value=options.target.text;
});

// unset input when no text is selected
canvasBack.on('selection:cleared', function(options) {
    document.getElementById("text-input").value="";
});



// text-input onkeyup change text
document.getElementById("text-input").onkeyup = function() {
    //check if text is selected
    if(activecanvas.getActiveObject()){
        activecanvas.getActiveObject().set("text", this.value);
        activecanvas.renderAll();
    }
};



//function to change font family
function changeFontFamily(fontFamily){
    activecanvas.getActiveObject().set("fontFamily", fontFamily);
    activecanvas.renderAll();
}

//function to change font size
function changeFontSize(fontSize){
    activecanvas.getActiveObject().set("fontSize", fontSize);
    activecanvas.renderAll();
}

//function to change font color
function changeFontColor(fontColor){
    activecanvas.getActiveObject().set("fill", fontColor);
    activecanvas.renderAll();
}
// change border color  
function changeBorderColor(borderColor){
    activecanvas.getActiveObject().set("stroke", borderColor);
    activecanvas.renderAll();
}

function changeShadowColor(shadowColor) {
    var activeObject = canvas.getActiveObject();
    if (activeObject && shadowColor) {
        var shadow = activeObject.getShadow();
        shadow.color = shadowColor;
        activeObject.setShadow(shadow);
        activecanvas.renderAll();
    }
}



//function to change font style
function changeFontStyle(fontStyle){
    activecanvas.getActiveObject().set("fontStyle", fontStyle);
    activecanvas.renderAll();
}

// change border color  
function changeBorderColor(borderColor){
    activecanvas.getActiveObject().set("stroke", borderColor);
    activecanvas.renderAll();
}

//function to change text leter space
function changeTextLetterSpace(textLetterSpace){
    activecanvas.getActiveObject().set("charSpacing", textLetterSpace);
    activecanvas.renderAll();
}

// function to change text to bold and unbold
function changeBold(){
    var isBold = activecanvas.getActiveObject().get("fontWeight") == "bold";
    activecanvas.getActiveObject().set("fontWeight", isBold ? "normal" : "bold");
    activecanvas.renderAll();
}

// function to change text to italic and unitalic
function changeItalic(){
    var isItalic = activecanvas.getActiveObject().get("fontStyle") == "italic";
    activecanvas.getActiveObject().set("fontStyle", isItalic ? "normal" : "italic");
    activecanvas.renderAll();
}
// change changeUnderline
function changeUnderline(){
    var isUnderline = activecanvas.getActiveObject().get("underline") == "underline";
    activecanvas.getActiveObject().set("underline", isUnderline ? "" : "underline");
    activecanvas.renderAll();
}


//add image function by src
function addImage(imageURL){
    fabric.Image.fromURL(imageURL, function (img) {
        img.scaleToHeight(150);
        img.scaleToWidth(150);
        activecanvas.add(img);
    });
}



// COPY , cut , paste functions 
function copy(){
    activecanvas.getActiveObject().clone(function(cloned) {
        _clipboard = cloned;
    });
}

function cut() {
    var activeObject = activecanvas.getActiveObject();
    if (activeObject) {
        activeObject.clone(function(cloned) {
            _clipboard = cloned;
        });
        activecanvas.remove(activeObject);
        activecanvas.discardActiveObject();
        activecanvas.renderAll();
    }
}

function paste(){
    _clipboard.clone(function(clonedObj) {
        activecanvas.discardActiveObject();
        clonedObj.set({
            left: clonedObj.left + 10,
            top: clonedObj.top + 10,
            evented: true,
        });
        if (clonedObj.type === 'activeSelection') {
            clonedObj.canvas = activecanvas;
            clonedObj.forEachObject(function(obj) {
                activecanvas.add(obj);
            });
            clonedObj.setCoords();
        } else {
            activecanvas.add(clonedObj);
        }
        _clipboard.top += 10;
        _clipboard.left += 10;
        activecanvas.setActiveObject(clonedObj);
        activecanvas.requestRenderAll();
    });
}


//brind forward
function bringForward() {
    var activeObject = activecanvas.getActiveObject();
    console.log(activeObject);
    if (activeObject) {
        
        activecanvas.bringForward(activeObject);
    }
}

//send backward
function sendBackwards() {
    var activeObject = activecanvas.getActiveObject();
    if (activeObject) {
        activecanvas.sendBackwards(activeObject);
    }
}


// copy , paste , cut shortcut
document.addEventListener("keydown", function(e) {
    var keyCode = e.keyCode;
    if (e.ctrlKey && keyCode === 67) {
        copy();
    } else if (e.ctrlKey && keyCode === 86) {
        paste();
    } else if (e.ctrlKey && keyCode === 88) {
        cut();
    }
}, false);






// When the user clicks on upload a custom picture
document.getElementById('tshirt-custompicture').addEventListener("change", function(e){
    var reader = new FileReader();
    
    reader.onload = function (event){
        var imgObj = new Image();
        imgObj.src = event.target.result;

        // When the picture loads, create the image in Fabric.js
        imgObj.onload = function () {
            var img = new fabric.Image(imgObj);

            img.scaleToHeight(300);
            img.scaleToWidth(300); 
            activecanvas.centerObject(img);
            activecanvas.add(img);
            activecanvas.renderAll();
        };
    };

    // If the user selected a picture, load it
    if(e.target.files[0]){
        reader.readAsDataURL(e.target.files[0]);
    }
}, false);

// When the user selects a picture that has been added and press the DEL key
// The object will be removed !
document.addEventListener("keydown", function(e) {
    var keyCode = e.keyCode;

    if(keyCode == 46){
        console.log("Removing selected element on Fabric.js on DELETE key !");
        activecanvas.remove(activecanvas.getActiveObject());
    }
}, false);

// Define as node the T-Shirt Div
var node = document.getElementById('tshirt-div');

domtoimage.toPng(node).then(function (dataUrl) {
// Print the data URL of the picture in the Console
console.log(dataUrl);

// You can for example to test, add the image at the end of the document
var img = new Image();
img.src = dataUrl;
document.body.appendChild(img);
}).catch(function (error) {
console.error('oops, something went wrong!', error);
});




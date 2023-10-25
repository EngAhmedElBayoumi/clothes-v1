
let canvas = new fabric.Canvas('tshirt-canvas-front');
let canvasBack = new fabric.Canvas('tshirt-canvas-back');

function updateTshirtImage(imageURL){
    fabric.Image.fromURL(imageURL, function(img) {                   
        img.scaleToHeight(300);
        img.scaleToWidth(300); 
        canvas.centerObject(img);
        canvas.add(img);
        canvas.renderAll();
    });
}
function updateTshirtImage(imageURL){
    fabric.Image.fromURL(imageURL, function(img) {                   
        img.scaleToHeight(300);
        img.scaleToWidth(300); 
        canvasBack.centerObject(img);
        canvasBack.add(img);
        canvasBack.renderAll();
    });
}

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
    canvas.add(text);
    canvas.setActiveObject(text);
    text.bringToFront();
}

//function to change font family
function changeFontFamily(fontFamily){
    canvas.getActiveObject().set("fontFamily", fontFamily);
    canvas.renderAll();
}

//function to change font size
function changeFontSize(fontSize){
    canvas.getActiveObject().set("fontSize", fontSize);
    canvas.renderAll();
}

//function to change font color
function changeFontColor(fontColor){
    canvas.getActiveObject().set("fill", fontColor);
    canvas.renderAll();
}
// change border color  
function changeBorderColor(borderColor){
    canvas.getActiveObject().set("stroke", borderColor);
    canvas.renderAll();
}

function changeShadowColor(shadowColor) {
    var activeObject = canvas.getActiveObject();
    if (activeObject && shadowColor) {
        var shadow = activeObject.getShadow();
        shadow.color = shadowColor;
        activeObject.setShadow(shadow);
        canvas.renderAll();
    }
}



//function to change font style
function changeFontStyle(fontStyle){
    canvas.getActiveObject().set("fontStyle", fontStyle);
    canvas.renderAll();
}

// change border color  
function changeBorderColor(borderColor){
    canvas.getActiveObject().set("stroke", borderColor);
    canvas.renderAll();
}

//function to change text leter space
function changeTextLetterSpace(textLetterSpace){
    canvas.getActiveObject().set("charSpacing", textLetterSpace);
    canvas.renderAll();
}

// function to change text to bold and unbold
function changeBold(){
    var isBold = canvas.getActiveObject().get("fontWeight") == "bold";
    canvas.getActiveObject().set("fontWeight", isBold ? "normal" : "bold");
    canvas.renderAll();
}

// function to change text to italic and unitalic
function changeItalic(){
    var isItalic = canvas.getActiveObject().get("fontStyle") == "italic";
    canvas.getActiveObject().set("fontStyle", isItalic ? "normal" : "italic");
    canvas.renderAll();
}
// change changeUnderline
function changeUnderline(){
    var isUnderline = canvas.getActiveObject().get("underline") == "underline";
    canvas.getActiveObject().set("underline", isUnderline ? "" : "underline");
    canvas.renderAll();
}




// COPY , cut , paste functions 
function copy(){
    canvas.getActiveObject().clone(function(cloned) {
        _clipboard = cloned;
    });
}

function cut() {
    var activeObject = canvas.getActiveObject();
    if (activeObject) {
        activeObject.clone(function(cloned) {
            _clipboard = cloned;
        });
        canvas.remove(activeObject);
        canvas.discardActiveObject();
        canvas.renderAll();
    }
}

function paste(){
    _clipboard.clone(function(clonedObj) {
        canvas.discardActiveObject();
        clonedObj.set({
            left: clonedObj.left + 10,
            top: clonedObj.top + 10,
            evented: true,
        });
        if (clonedObj.type === 'activeSelection') {
            clonedObj.canvas = canvas;
            clonedObj.forEachObject(function(obj) {
                canvas.add(obj);
            });
            clonedObj.setCoords();
        } else {
            canvas.add(clonedObj);
        }
        _clipboard.top += 10;
        _clipboard.left += 10;
        canvas.setActiveObject(clonedObj);
        canvas.requestRenderAll();
    });
}







// Update the TShirt color according to the selected color by the user
document.getElementById("tshirt-design").addEventListener("change", function(){
    updateTshirtImage(this.value);
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
            canvas.centerObject(img);
            canvas.add(img);
            canvas.renderAll();
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
        canvas.remove(canvas.getActiveObject());
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

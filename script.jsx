// Extensions To Use:
        // ExtendScript Debugger (by Adobe)
        // Adobe Script Runner (by renderTom)

// Guides
        // After Effects Scripting Guide - https://ae-scripting.docsforadobe.dev/
        // UI Reference Guide - https://fotozcech.cz/wp-content/uploads/2015/11/scriptui-2-8.pdf

var window = new Window("palette", "Script", undefined);
window.orientation = "column";
var text = window.add("statictext", undefined, "brandon ugly");

// Buttons
var group = window.add("group", undefined, "");
group.orientation = "row";
var buttonOne = group.add("button", undefined, "Twixtor 80");
var buttonTwo = group.add("button", undefined, "Twixtor Second 60");
var buttonThree = group.add("button", undefined, "Twixtor Tamsaeps")
var splitClip = group.add("button", undefined, "Split Clips");

var group2 = window.add("group", undefined, "");
var pageDown = group2.add("button", undefined, "Page Down");
var removeOnes = group2.add("button", undefined, "Remove Ones");
var sequenceLayer = group2.add("button", undefined, "Sequence Layers");

var group3 = window.add("group", undefined, "");
var addLayer = group3.add("button", undefined, "Add Layer");

var array = ["Test 1", "Test 2", "Test 3"];

// Dropdown
var dropdown = window.add("dropdownlist", undefined, array);
dropdown.selection = 0;
dropdown.size = [170, 25];

dropdown.add("item", "My Extra Item");

// Radio & Checkbox
var panel = window.add("panel", undefined, "Panel");
panel.oriention = "row";
var radio = panel.add("radiobutton", undefined, "Radio");
var checkbox = panel.add("checkbox", undefined, "Checkbox");

// Textbox
var textbox = window.add("edittext", undefined, "Text here");
textbox.size = [170, 25];

var slider = window.add("slider",  undefined, "");
slider.size = [170, 15];


window.center();
window.show();


buttonOne.onClick = function() {    
    addTwixtors80();
}

buttonTwo.onClick = function() {    
    addTwixtors();
}

buttonThree.onClick = function() {
    addTwixtorsTamsaep();
}

splitClip.onClick = function () {
    splitClips();
}

pageDown.onClick = function () {
    pageDowns();
}

removeOnes.onClick = function () {
    removeOneFrameLayers();
}

sequenceLayer.onClick = function () {
    sequenceLayers();
}

addLayer.onClick = function () {
    addLayers();
}


function modifyLayers() {
    if (app.project.activeItem == null || !(app.project.activeItem instanceof CompItem)) {
        alert("No composition selected");
        return false;
    }
    
    app.executeCommand(app.findMenuCommandId("Select All"));
    // app.executeCommand(app.findMenuCommandId("Sequence Layers..."));


    // layer.property("ADBE Transform Group").property("ADBE Scale").setValue([200, 200]);
}

function addTwixtors80() {
    if (app.project.activeItem == null || !(app.project.activeItem instanceof CompItem)) {
        alert("No composition selected");
        return false;
    }
    
    var composition = app.project.activeItem;
    var presetPath = "C:/Users/Angie/Documents/Adobe/After Effects 2022/User Presets/Twixtor 80.ffx";
    var myPreset = File(presetPath)
    composition.layer(1).applyPreset(myPreset);
}

function addTwixtors() {
    if (app.project.activeItem == null || !(app.project.activeItem instanceof CompItem)) {
        alert("No composition selected");
        return false;
    }
    
    var composition = app.project.activeItem;
    var presetPath = "C:/Users/Angie/Documents/Adobe/After Effects 2022/User Presets/Twixtor Second 60.ffx";
    var myPreset = File(presetPath)
    composition.layer(1).applyPreset(myPreset);
}

function addTwixtorsTamsaep() {
    if (app.project.activeItem == null || !(app.project.activeItem instanceof CompItem)) {
        alert("No composition selected");
        return false;
    }
    
    var composition = app.project.activeItem;
    var presetPath = "C:/Users/Angie/Documents/Adobe/After Effects 2022/User Presets/Twixtor Tamsaeps.ffx";
    var myPreset = File(presetPath)
    composition.layer(1).applyPreset(myPreset);
}

// Flesh out the Twixtor adding mechanism
function splitClips() {
    if (app.project.activeItem == null || !(app.project.activeItem instanceof CompItem)) {
        alert("No composition selected");
        return false;
    }

    app.project.item(1).layer(1).doSceneEditDetection(SceneEditDetectionMode.SPLIT_PRECOMP);
}

function pageDowns() {
    // change number depending on length of moving frames
    var number = 5;
    var comp = app.project.activeItem;
    if (comp && comp instanceof CompItem) {
        for (var i = 0; i < number; i++) {
            if (comp && comp instanceof CompItem) {
                comp.time = comp.time + comp.frameDuration;
            }
        }
        app.executeCommand(app.findMenuCommandId("Split Layer"));
        comp.time = comp.time + comp.frameDuration;
        app.executeCommand(app.findMenuCommandId("Split Layer"));
    }
}

function removeOneFrameLayers() {
    if (app.project.activeItem == null || !(app.project.activeItem instanceof CompItem)) {
        alert("No composition selected");
        return false;
    }
    var comp = app.project.activeItem;
    var selectedLayers = comp.selectedLayers;
    for (var i = 0; i < selectedLayers.length; i++) {
        var layer = selectedLayers[i];
        if (i % 2 == 0) {
            layer.remove();
        }
    }
}

function sequenceLayers() {
    if (app.project.activeItem == null || !(app.project.activeItem instanceof CompItem)) {
        alert("No composition selected");
        return false;
    }
    app.executeCommand(app.findMenuCommandId('Sequence Layers...'))
}

// TODO: Create for loop to iterate through every selected clip
function addLayers() {
    // Saves the selected "clip" aka layer into a variable
    var comp = app.project.activeItem;
    if (comp === null || !(comp instanceof CompItem)) {
        alert("No composition selected");
        return false;
    }
    // Get the first selected layer
    var selectedLayer = comp.selectedLayers[0];
    // Retrieve the layer index
    var layerIndex = selectedLayer.index;
    // Add a null layer
    var nullLayer = comp.layers.addNull();
    // Move the null layer above the selected layer
    nullLayer.moveBefore(selectedLayer);
    // Set the start and end points to the selected layer's
    nullLayer.inPoint = comp.layer(layerIndex + 1).inPoint;
    nullLayer.outPoint = comp.layer(layerIndex + 1).outPoint;
    // Parent the layer
    selectedLayer.parent = nullLayer;
    return true;
}
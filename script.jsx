// Extensions To Use:
        // ExtendScript Debugger (by Adobe)
        // Adobe Script Runner (by renderTom)

// Guides
        // After Effects Scripting Guide - https://ae-scripting.docsforadobe.dev/
        // UI Reference Guide - https://fotozcech.cz/wp-content/uploads/2015/11/scriptui-2-8.pdf

var window = new Window("palette", "Script", undefined);
window.orientation = "column";

// Buttons
var text = window.add("statictext", undefined, "");
var group0 = window.add("group", undefined, "");
group0.orientation = "row";
var prepEdit = group0.add("button", undefined, "Prep Edit");

var text = window.add("statictext", undefined, "");
var group = window.add("group", undefined, "");
group.orientation = "row";
var twixtor80 = group.add("button", undefined, "Twixtor 80");
var twixtorSecond60 = group.add("button", undefined, "Twixtor Second 60");
var twixtorTamsaep = group.add("button", undefined, "Twixtor Tamsaeps");

var text = window.add("statictext", undefined, "");
var group2 = window.add("group", undefined, "");
var pageDown = group2.add("button", undefined, "Page Down");
var removeOnes = group2.add("button", undefined, "Remove Ones");
var sequenceLayer = group2.add("button", undefined, "Sequence Layers");

var text = window.add("statictext", undefined, "");
var group3 = window.add("group", undefined, "");
var nullLayer = group3.add("button", undefined, "Add Null");
var textLayer = group3.add("button", undefined, "Add Text");
var adjustmentLayer = group3.add("button", undefined, "Add Adjustment")

var text = window.add("statictext", undefined, "");
var group4 = window.add("group", undefined, "");
var splitClip = group4.add("button", undefined, "Split Clips");

var array = ["Test 1", "Test 2", "Test 3"];

/*
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
*/

window.center();
window.show();

prepEdit.onClick = function() {
    autoPrepEdit();
}

twixtor80.onClick = function() {    
    addTwixtors80();
}

twixtorSecond60.onClick = function() {    
    addTwixtors();
}

twixtorTamsaep.onClick = function() {
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

nullLayer.onClick = function () {
    addNullLayers();
}

textLayer.onClick = function () {
    addTextLayers();
}

adjustmentLayer.onClick = function () {
    addAdjustmentLayer();
}

// Functions

function autoPrepEdit() {
    if (app.project.activeItem === null || !(app.project.activeItem instanceof CompItem)) {
        alert("No composition selected");
        return false;
    }

    app.beginUndoGroup("Auto Prep Edit");

    var comp = app.project.activeItem;
    var layerCount = comp.layers.length;

    if (layerCount === 0) {
        alert("You don't have any layers in your composition");
        return false;
    } else if (layerCount === 1) {
        var firstLayer = comp.layers[1];
        var secondLayer = firstLayer.duplicate();
    } else if (layerCount === 2) {
        var firstLayer = comp.layers[1];
        var secondLayer = comp.layers[2];
    } else {
        alert("You have too many layers");
        return false;
    }

    var compHeight = comp.height;
    var layerHeight = firstLayer.height;
    var scaleFactor = compHeight / layerHeight;
    var presetPath = "C:/Users/Angie/Documents/Adobe/After Effects 2022/User Presets/Watermark.ffx";
    var myPreset = File(presetPath);

    firstLayer.audioEnabled = false;
    firstLayer.scale.setValue([scaleFactor * 100, scaleFactor * 100]);

    secondLayer.enabled = false;
    secondLayer.label = 0;

    // Split clips
    firstLayer.doSceneEditDetection(SceneEditDetectionMode.SPLIT_PRECOMP);

    // Adding watermark
    var textLayer = comp.layers.addText();
    textLayer.label = 8;
    textLayer.applyPreset(myPreset);
    textLayer.blendingMode = BlendingMode.OVERLAY;

    // Adding coloring
    var adjustmentLayer = comp.layers.addSolid([255, 255, 255], "Adjustment Layer", comp.width, comp.height, comp.pixelAspect, comp.duration);
    adjustmentLayer.adjustmentLayer = true;
    adjustmentLayer.label = 5;
    presetPath = "C:/Users/Angie/Documents/Adobe/After Effects 2022/User Presets/Color Talyx.ffx";
    myPreset = File(presetPath);
    adjustmentLayer.applyPreset(myPreset);

    app.endUndoGroup();

    return true; 
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
    // Change variable number depending on length of moving frames
    var number = 5;
    var comp = app.project.activeItem;
    app.beginUndoGroup("Page Down");
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
    app.endUndoGroup();
}

function removeOneFrameLayers() {
    if (app.project.activeItem == null || !(app.project.activeItem instanceof CompItem)) {
        alert("No composition selected");
        return false;
    }
    var comp = app.project.activeItem;
    var selectedLayers = comp.selectedLayers;
    app.beginUndoGroup("Remove Freeze Frames");
    for (var i = 0; i < selectedLayers.length; i++) {
        var layer = selectedLayers[i];
        if (i % 2 == 0) {
            layer.remove();
        }
    }
    app.endUndoGroup();
}

function sequenceLayers() {
    if (app.project.activeItem == null || !(app.project.activeItem instanceof CompItem)) {
        alert("No composition selected");
        return false;
    }
    app.executeCommand(app.findMenuCommandId('Sequence Layers...'));
}

function addNullLayers() {
    // Saves the selected "clip" aka layer into a variable
    var comp = app.project.activeItem;

    // Broken
    if (comp === null || !(comp instanceof CompItem)) {
        alert("No composition selected");
        return false;
    }

    var allLayers = comp.selectedLayers;
    var selectedLayer;
    var layerIndex;
    var nullLayer;
    app.beginUndoGroup("Add Null Layer");

    // Loops through all layers selected and adds a null layer on top
    for (var i = 0; i < allLayers.length * 2; i++) {
        // Get the first selected layer
        selectedLayer = allLayers[i];
        layerIndex = selectedLayer.index;
        nullLayer = comp.layers.addNull();
        // Move the null layer above the selected layer
        nullLayer.moveBefore(selectedLayer);
        // Set the duration to match the current selected layer
        nullLayer.inPoint = comp.layer(layerIndex + 1).inPoint;
        nullLayer.outPoint = comp.layer(layerIndex + 1).outPoint;
        // Parent the layer
        selectedLayer.parent = nullLayer;
    }

    app.endUndoGroup();
    return true;
}

function addTextLayers() {
    // Saves the selected "clip" aka layer into a variable
    var comp = app.project.activeItem;

    // Broken
    if (comp === null || !(comp instanceof CompItem)) {
        alert("No composition selected");
        return false;
    }

    var allLayers = comp.selectedLayers;
    var selectedLayer;
    var layerIndex;
    var textLayer;

    app.beginUndoGroup("Add Text Layer");

    // Loops through all layers selected and adds a text layer on top
    for (var i = 0; i < allLayers.length * 2; i++) {
        selectedLayer = allLayers[i];
        layerIndex = selectedLayer.index;
        textLayer = comp.layers.addText();
        textLayer.label = 8;
        textLayer.moveBefore(selectedLayer);
        textLayer.inPoint = comp.layer(layerIndex + 1).inPoint;
        textLayer.outPoint = comp.layer(layerIndex + 1).outPoint;
    }

    app.endUndoGroup();
    return true;
}

function addAdjustmentLayer() {
    // Saves the selected "clip" aka layer into a variable
    var comp = app.project.activeItem;

    // Broken
    if (comp === null) {
        alert("No composition selected");
        return false;
    }

    var allLayers = comp.selectedLayers;
    var selectedLayer;
    var layerIndex;
    var adjLayer;

    app.beginUndoGroup("Add Adjustment Layer");

    // Loops through all layers selected and adds an adjustment layer on top
    for (var i = 0; i < allLayers.length * 2; i++) {
        selectedLayer = allLayers[i];
        layerIndex = selectedLayer.index;
        adjLayer = comp.layers.addSolid([1, 1, 1], "Adjustment Layer", comp.width, comp.height, 1);
        adjLayer.adjustmentLayer = true;
        adjLayer.label = 5;
        adjLayer.moveBefore(selectedLayer);
        adjLayer.inPoint = comp.layer(layerIndex + 1).inPoint;
        adjLayer.outPoint = comp.layer(layerIndex + 1).outPoint;
    }

    app.endUndoGroup();
    return true;
}
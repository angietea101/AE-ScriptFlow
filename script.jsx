// Extensions To Use:
        // ExtendScript Debugger (by Adobe)
        // Adobe Script Runner (by renderTom)

var window = new Window("palette", "Script", undefined);
window.orientation = "column";
var text = window.add("statictext", undefined, "brandon ugly");

// Buttons
var group = window.add("group", undefined, "");
group.orientation = "row";
var buttonOne = group.add("button", undefined, "Button 1");
var buttonTwo = group.add("button", undefined, "Twixtor Second 60");
var splitClip = group.add("button", undefined, "Split Clips");
var pageDown = group.add("button", undefined, "Page Down");

var group2 = window.add("group", undefined, "");
var removeOnes = group2.add("button", undefined, "Remove Ones");

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
    modifyLayers();
}

buttonTwo.onClick = function() {    
    addTwixtors();
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


function modifyLayers() {
    if (app.project.activeItem == null || !(app.project.activeItem instanceof CompItem)) {
        alert("No composition selected");
        return false;
    }
    
    app.executeCommand(app.findMenuCommandId("Select All"));
    // app.executeCommand(app.findMenuCommandId("Sequence Layers..."));


    // layer.property("ADBE Transform Group").property("ADBE Scale").setValue([200, 200]);
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

function splitClips() {
    app.executeCommand(app.findMenuCommandId("Split Layer"));
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
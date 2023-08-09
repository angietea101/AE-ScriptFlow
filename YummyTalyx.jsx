{
    function myScript(thisObj) {
        function myScriptBuildUI(thisObj) {
            var myPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette", "Dockable Script", undefined, {resizeable: true, closeButton: false});

            res = "group{orientation:'column',\
            groupOne: Group{orientation:'row',\
            prepEditButton: Button{text:'Prep Edit'},\
            },\
            groupEmpty: Group{orientation:'row',\
            emptyText: StaticText{text:''},\
            },\
            groupTwo: Group{orientation:'row',\
            testButtonButton: Button{text:'Test Button'},\
            },\
            groupThree: Group{orientation:'row',\
            addNullLayer: Button{text:'Add Null'},\
            },\
            groupFour: Group{orientation:'row',\
            addTextLayer: Button{text:'Add Text'},\
            },\
            groupFive: Group{orientation:'row',\
            addAdjustmentLayer: Button{text:'Add Adj'},\
            },\
            groupSix: Group{orientation:'row',\
            deleteFreezeFramesButton: Button{text:'DFF1'},\
            },\
            groupSeven: Group{orientation:'row',\
            deleteFreezeFramesButton2: Button{text:'DFF2'},\
            },\
            groupEight: Group{orientation:'row',\
            dropdown: DropDownList{},\
            },\
            groupNine: Group{orientation:'row',\
            applyButton: Button{text:'Apply'},\
            },\
            }";

            myPanel.grp = myPanel.add(res);

            // Button functionality
            myPanel.grp.groupOne.prepEditButton.onClick = function() {
                autoPrepEdit()
            }

            myPanel.grp.groupThree.addNullLayer.onClick = function () {
                addNullLayers();
            }
            
            myPanel.grp.groupFour.addTextLayer.onClick = function () {
                addTextLayers();
            }
            
            myPanel.grp.groupFive.addAdjustmentLayer.onClick = function () {
                addAdjustmentLayer();
            }
            
            myPanel.grp.groupSix.deleteFreezeFramesButton.onClick = function() {
                deleteFreezeFrames();
            }
            
            myPanel.grp.groupSeven.deleteFreezeFramesButton2.onClick = function() {
                deleteFreezeFrames2();
            }

            var menuList = ["Twixtors 80", "Twixtor Second 60", "Twixtor Tamsaeps"];
            myPanel.grp.groupEight.dropdown.size = [90, 25];
            for(var i = 0; i < menuList.length; i++) {
                myPanel.grp.groupEight.dropdown.add("item", menuList[i]);
            }
            myPanel.grp.groupEight.dropdown.selection = 0;
            myPanel.grp.groupNine.applyButton.onClick = function() {
                if (myPanel.grp.groupEight.dropdown.selection.text === 'Twixtors 80') {
                    addTwixtors80();
                } else if (myPanel.grp.groupEight.dropdown.selection.text === 'Twixtor Second 60') {
                    addTwixtorsSecond60();
                } else if (myPanel.grp.groupEight.dropdown.selection.text === 'Twixtor Tamsaeps') {
                    addTwixtorsTamsaep();
                } else {
                    alert('Error applying selection');
                }
            }
            
            myPanel.grp.groupTwo.testButtonButton.onClick = function() {
                // Change this function
                selectLayersFromPlayhead();
            }
            
            myPanel.layout.layout(true);

            return myPanel;
        }

    var myScriptPal = myScriptBuildUI(thisObj);

    if(myScriptPal != null && myScriptPal instanceof Window) {
        myScriptPal.center();
        myScriptPal.show();
        }
    }
    myScript(this);
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

function addTwixtorsSecond60() {
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

function pageDowns(number) {
    // Change variable number depending on length of moving frames
    var comp = app.project.activeItem;
    app.beginUndoGroup("Page Down");

    // Move playhead to the start of the composition
    // comp.time = 0;
    if (comp && comp instanceof CompItem) {
        // Get the number of frames of the entire composition and the number of parts to cut
        var frameCount = comp.duration * comp.frameRate;
        var cuts = Math.floor(frameCount / (number + 1));
        // Loops until there is nothing left to cut
        while (cuts > 0) {
            for (var i = 0; i < number; i++) {
                if (comp && comp instanceof CompItem) {
                    comp.time = comp.time + comp.frameDuration;
                }
            }
            app.executeCommand(app.findMenuCommandId("Split Layer"));
            comp.time = comp.time + comp.frameDuration;
            app.executeCommand(app.findMenuCommandId("Split Layer"));
            cuts--;
        }
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

function selectAllLayers() {
    var activeItem = app.project.activeItem;
    activeItem.time = 0;
    var selectedIndex = activeItem.numLayers;
    while (selectedIndex >= 1) {
        if (activeItem.layer(selectedIndex).inPoint >= activeItem.time) {
            activeItem.layer(selectedIndex).selected = true;
        } else {
            activeItem.layer(selectedIndex).selected = false;
        }
        selectedIndex--;
    }
}

function selectLayersFromPlayhead(){
    if (app.project.activeItem === null || !(app.project.activeItem instanceof CompItem)) {
        alert("No composition selected");
        return false;
      }
    
    var activeItem = app.project.activeItem;
    var selectedIndex = activeItem.numLayers;

    // Selects layer from bottom up
    while (selectedIndex >= 1) {
        if (activeItem.layer(selectedIndex).inPoint >= activeItem.time) {
            activeItem.layer(selectedIndex).selected = true;
        } else {
            activeItem.layer(selectedIndex).selected = false;
        }
        selectedIndex--;
    }
}

function deleteFreezeFrames() {
    // To start, cut the first freeze frame and leave playhead where frames begin to move
    var comp = app.project.activeItem;
    var currentTime = comp.time;
    // Change parameter based on length of moving frames
    pageDowns(5);
    comp.time = currentTime;
    comp.time = comp.time - comp.frameDuration;
    comp.layer(1).selected = false;
    selectLayersFromPlayhead();
    removeOneFrameLayers();
    sequenceLayers();
}

function deleteFreezeFrames2() {
    var comp = app.project.activeItem;
    var currentTime = comp.time;
    comp.time = currentTime;
    comp.time = comp.time - comp.frameDuration;
    comp.layer(1).selected = false;
    selectLayersFromPlayhead();
    removeOneFrameLayers();
    sequenceLayers();
}
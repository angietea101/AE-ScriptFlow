function addTextLayer() {
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

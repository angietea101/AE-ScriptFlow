function addNullLayer() {
    // Saves the selected "clip" aka layer into a variable
    var comp = app.project.activeItem;

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

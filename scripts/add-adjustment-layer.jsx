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
        adjLayer = comp.layers.addSolid(
            [1, 1, 1],
            "Adjustment Layer",
            comp.width,
            comp.height,
            1,
        );
        adjLayer.adjustmentLayer = true;
        adjLayer.label = 5;
        adjLayer.moveBefore(selectedLayer);
        adjLayer.inPoint = comp.layer(layerIndex + 1).inPoint;
        adjLayer.outPoint = comp.layer(layerIndex + 1).outPoint;
    }

    app.endUndoGroup();
    return true;
}

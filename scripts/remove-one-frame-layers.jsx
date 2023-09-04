function removeOneFrameLayers() {
    if (
        app.project.activeItem == null ||
        !(app.project.activeItem instanceof CompItem)
    ) {
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

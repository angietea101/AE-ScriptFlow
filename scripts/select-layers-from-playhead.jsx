function selectLayersFromPlayhead() {
    if (
        app.project.activeItem === null ||
        !(app.project.activeItem instanceof CompItem)
    ) {
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

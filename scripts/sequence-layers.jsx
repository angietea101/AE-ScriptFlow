function sequenceLayers() {
    if (
        app.project.activeItem == null ||
        !(app.project.activeItem instanceof CompItem)
    ) {
        alert("No composition selected");
        return false;
    }
    app.executeCommand(app.findMenuCommandId("Sequence Layers..."));
}

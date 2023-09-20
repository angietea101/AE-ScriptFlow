//@include "presets.jsx"

function addTextGlowMain() {
    if (
        app.project.activeItem == null ||
        !(app.project.activeItem instanceof CompItem)
    ) {
        alert("No composition selected");
        return false;
    }

    var composition = app.project.activeItem;
    composition.layer(1).applyPreset(File(textGlowMainPath));
}

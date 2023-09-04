var userPresetsFolder =
    "C:/Users/Angie/Documents/Adobe/After Effects 2023/User Presets";

var watermarkPath = userPresetsFolder + "/Watermark.ffx";
var coloringPath = userPresetsFolder + "/Color Talyx.ffx";

function autoPrepEdit() {
    if (
        app.project.activeItem === null ||
        !(app.project.activeItem instanceof CompItem)
    ) {
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

    firstLayer.audioEnabled = false;
    firstLayer.scale.setValue([scaleFactor * 100, scaleFactor * 100]);

    secondLayer.enabled = false;
    secondLayer.label = 0;

    // Split clips
    firstLayer.doSceneEditDetection(SceneEditDetectionMode.SPLIT_PRECOMP);

    // Adding coloring
    var adjustmentLayer = comp.layers.addSolid(
        [255, 255, 255],
        "Adjustment Layer",
        comp.width,
        comp.height,
        comp.pixelAspect,
        comp.duration,
    );
    adjustmentLayer.adjustmentLayer = true;
    adjustmentLayer.label = 5;
    adjustmentLayer.applyPreset(File(coloringPath));

    // Adding watermark
    var textLayer = comp.layers.addText();
    textLayer.label = 8;
    textLayer.applyPreset(File(watermarkPath));
    textLayer.blendingMode = BlendingMode.OVERLAY;

    app.endUndoGroup();

    return true;
}

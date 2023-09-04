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

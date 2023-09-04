#include "page-downs.jsx"
#include "select-layers-from-playhead.jsx"
#include "remove-one-frame-layers.jsx"
#include "sequence-layers.jsx"

function deleteFreezeFramez() {
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
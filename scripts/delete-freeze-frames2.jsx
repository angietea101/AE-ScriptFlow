#include "select-layers-from-playhead.jsx"
#include "remove-one-frame-layers.jsx"
#include "sequence-layers.jsx"

function deleteFreezeFramez2() {
    alert('hello')
    var comp = app.project.activeItem;
    var currentTime = comp.time;
    comp.time = currentTime;
    comp.time = comp.time - comp.frameDuration;
    comp.layer(1).selected = false;
    selectLayersFromPlayhead();
    removeOneFrameLayers();
    sequenceLayers();
};

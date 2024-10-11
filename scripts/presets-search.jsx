//@include "presets.jsx"

function SearchPresets(thisObj) {
    var win =
        thisObj instanceof Panel
            ? thisObj
            : new Window("palette", "Preset Apply", undefined, {
                  resizeable: true,
              });

    win.spacing = 10;

    // Input field 
    var searchInput = win.add("edittext", undefined, "");
    searchInput.characters = 30;

    // Button 
    var searchButton = win.add("button", undefined, "Search");

    // Display results
    var resultList = win.add("listbox", undefined, [], { multiselect: false });
    resultList.preferredSize.width = 300;
    resultList.preferredSize.height = 200;

    searchButton.onClick = function () {
        performSearch();
        searchButton.enabled = searchInput.text.length > 0;
    }

    // Event Listener
    function performSearch() {
        var query = searchInput.text.toLowerCase();
        var presets = getPresets();
    
        filteredPresets = filterPresets(presets, query);
        resultList.removeAll(); // Clear the previous results
    
        if (filteredPresets.length === 0) {
            resultList.add("item", "No results found.")
            return;
        }

        for (var i = 0; i < filteredPresets.length; i++) {
            cleanPresetName = decodeURIComponent(filteredPresets[i].name.slice(0, -4));
            resultList.add("item", cleanPresetName);
        }
    };

    resultList.onDoubleClick = function () {
        var selectedItem = resultList.selection;
        if (selectedItem) {
            if (selectedItem.text === "No results found.") {
                return;
            }

            var presetName = selectedItem.text;
            applyPresetToSelectedClips(presetName);
        }
    }

    searchInput.onChange = function() {
        performSearch();
        searchButton.enabled = searchInput.text.length > 0;
    }

    function applyPresetToSelectedClips(presetName) {
        app.beginUndoGroup("Apply Preset");
        var selectedClips = app.project.activeItem.selectedLayers;
        var presetPath = File(userPresetsPath + "/" + presetName + ".ffx");
        var comp = app.project.activeItem;

        if (selectedClips.length == 0) {
            alert("No clips are selected.");
            return;
        }

        /// Deselect all layers in the composition
        for (var j = 1; j <= comp.numLayers; j++) {
            comp.layer(j).selected = false; 
        }

        // Apply to beginning of each clip
        for (var i = 0; i < selectedClips.length; i++) {
            var clip = selectedClips[i];
            comp.time = clip.startTime;
            clip.selected = true; 
            clip.applyPreset(presetPath);
            clip.selected = false; 
        }
        app.endUndoGroup();

        win.close();
    }

    // Show the window
    win.onResizing = win.onResize = function () {
        this.layout.resize();
    };
    win instanceof Window ? (win.center(), win.show()) : win.layout.layout(true);
    
    // Function to get presets
    function getPresets() {
        var userPresetsFolder = Folder(userPresetsPath);
    
        if (!userPresetsFolder.exists) {
            alert("Presets folder cannot be found");
            return [];
        }
    
        var presets = userPresetsFolder.getFiles();
    
        return presets;
    }

    // Filter presets
    function filterPresets(presets, query) {
        var filtered = [];

        for (var i = 0; i < presets.length; i++) {
            if (presets[i].name.toLowerCase().indexOf(query) != -1) {
                filtered.push(presets[i]);
            }
        }

        return filtered;
    }
}

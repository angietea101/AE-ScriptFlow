//@include "scripts/auto-prep-edit.jsx"
//@include "scripts/add-null-layer.jsx"
//@include "scripts/add-text-layer.jsx"
//@include "scripts/add-adjustment-layer.jsx"
//@include "scripts/delete-freeze-frames.jsx"
//@include "scripts/delete-freeze-frames2.jsx"
//@include "scripts/add-twixtor-main.jsx"
//@include "scripts/add-twixtor-velocity.jsx"
//@include "scripts/add-flash.jsx"
//@include "scripts/add-text-glow-main.jsx"
//@include "scripts/presets-search.jsx"

(function (thisObj) {
    scriptBuildUI(thisObj);
    function scriptBuildUI(thisObj) {
        var win =
            thisObj instanceof Panel
                ? thisObj
                : new Window("palette", "tali-dock", undefined, {
                      resizeable: true,
                  });
        win.spacing = 10;

        // Buttons
        var prepEdit = win.add("button", undefined, "Prep Edit");
        var sep = win.add(
            "statictext {preferredSize: [10, 10]}",
            undefined,
            "",
        );
        var addNull = win.add("button", undefined, "Null");
        var addText = win.add("button", undefined, "Text");
        var addAdj = win.add("button", undefined, "Adj");
        var deleteFreezeFrames = win.add("button", undefined, "DFF1");
        var deleteFreezeFrames2 = win.add("button", undefined, "DFF2");

        var searchPresetsButton = win.add("button", undefined, "Search");

        var menuList = ["Main", "Velocity"];
        var dropdown = win.add("dropdownlist", undefined, menuList);
        dropdown.size = [80, 25];

        var apply = win.add("button", undefined, "Apply");

        var buttonRowOne = win.add("group", undefined, "");
        var flashMain = buttonRowOne.add(
            "iconbutton",
            undefined,
            File("public/images/lightning.png"),
        );
        var textGlowMain = buttonRowOne.add(
            "iconbutton",
            undefined,
            File("public/images/text.png"),
        );

        var last = win.add(
            "iconbutton",
            undefined,
            File("public/images/exclamation.png"),
        );

        // Button Functionality
        prepEdit.onClick = function () {
            autoPrepEdit();
        };

        addNull.onClick = function () {
            addNullLayer();
        };

        addText.onClick = function () {
            addTextLayer();
        };

        addAdj.onClick = function () {
            addAdjustmentLayer();
        };

        deleteFreezeFrames.onClick = function () {
            deleteFreezeFramez();
        };

        deleteFreezeFrames2.onClick = function () {
            deleteFreezeFramez2();
        };

        // Open Search Presets UI
        searchPresetsButton.onClick = function () {
            new SearchPresets(this); // Open the search presets UI
        };

        // Dropdown functionality
        dropdown.selection = 0;
        apply.onClick = function () {
            if (dropdown.selection.text === "Main") {
                addTwixtorMain();
            } else if (dropdown.selection.text === "Velocity") {
                addTwixtorVelocity();
            } else {
                alert("Error applying selection");
            }
        };

        flashMain.onClick = function () {
            addFlash();
        };

        textGlowMain.onClick = function () {
            addTextGlowMain();
        };

        // Show Window
        win.onResizing = win.onResize = function () {
            this.layout.resize();
        };
        win instanceof Window
            ? (win.center(), win.show())
            : (win.layout.layout(true), win.layout.resize());
    }
})(this);

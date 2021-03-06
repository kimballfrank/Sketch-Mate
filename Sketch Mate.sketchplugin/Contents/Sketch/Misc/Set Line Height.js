// Sets the line height as multiple of the font size (cmd l)



var onRun = function (context) {

    // old school variable
    doc = context.document;
    selection = context.selection;


    var textLayers = [];

    if (selection.count() > 0) {

        // Loop through selected layers
        for (var i = 0; i < selection.length(); i++) {

            var s = selection[i];

            // Check if the layer is a text layer
            if (s.className() == "MSTextLayer"){
                textLayers.push(s);
            }
        }

        if (textLayers.length > 0) {

            // get first text layer
            var firstTextLayer = textLayers[0];

            // Calculate initial line height
            var fontSize = firstTextLayer.fontSize();
            var lineHeight = firstTextLayer.lineSpacing();
            var multiple = (lineHeight / fontSize).toFixed(1);

            // Show a dialog, asking for the line height multiple
            var lineSpacing = parseFloat([doc askForUserInput:"Line Height Multiple:" initialValue:multiple]);

            for (var j = 0; j < textLayers.length; j++) {

                var textLayer = textLayers[j];

                // Calculate the line height based on the font size and multiple
                var fontSize = textLayer.fontSize();
                var lineHeight = fontSize * lineSpacing;
                textLayer.setLineSpacing(lineHeight);
            }

        } else {
            doc.showMessage("Please select a text layer.");
        }
    } else {
        doc.showMessage("Please select a text layer.")
    }

}
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("copy-button").addEventListener("click", function() {
        var employeeIdText = document.getElementById("employee-id-text").value;
        var dodText = document.getElementById("dod-text").value;
        var fmsText = document.getElementById("fms-text").value;
        var omsText = document.getElementById("oms-text").value;
        var notes = document.getElementById("note-text").value;
        
        var textToCopy = `${employeeIdText}-${dodText}-${fmsText}-${omsText}-${notes}`;
        navigator.clipboard.writeText(textToCopy).then(() => {
            alert("Text copied to clipboard");
        });

        var savedNotesContainer = document.getElementById("saved-notes");
        var newNote = document.createElement("div");
        newNote.textContent = textToCopy;
        savedNotesContainer.appendChild(newNote);

        // Clear all fields except the Employee ID field
        document.getElementById("fms-text").value = "";
        document.getElementById("oms-text").value = "";
        document.getElementById("note-text").value = "";
    });

    document.getElementById("save-button").addEventListener("click", function() {
        var currentDate = new Date();
        var formattedDate = currentDate.toLocaleDateString("en-US", {
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit'
        });

        var savedNotesContainer = document.getElementById("saved-notes");
        var notes = savedNotesContainer.querySelectorAll("div");
        var allNotesText = "Saved on: " + formattedDate + "\n\n";

        notes.forEach(function(note) {
            allNotesText += note.textContent + "\n\n";
        });

        var blob = new Blob([allNotesText], { type: "text/plain;charset=utf-8" });
        var link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "saved_notes_" + currentDate.toISOString().split('T')[0] + ".txt";
        link.click();
    });
});

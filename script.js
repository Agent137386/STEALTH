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
        var noteAndTimestampContainer = document.createElement("div");
        noteAndTimestampContainer.className = 'note-timestamp-container';

        var newNote = document.createElement("div");
        newNote.textContent = textToCopy;
        newNote.className = 'note-content';

        var timestamp = document.createElement("span");
        var currentTime = new Date();
        var formattedTime = currentTime.toLocaleTimeString("en-US", {
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit'
        });
        timestamp.textContent = formattedTime;
        timestamp.className = 'note-timestamp';

        var copyNoteButton = document.createElement("button");
        copyNoteButton.textContent = "Copy";
        copyNoteButton.className = 'copy-note-button';
        copyNoteButton.onclick = function() {
            navigator.clipboard.writeText(textToCopy).then(() => {
                alert("Note copied to clipboard");
            });
        };

        var editNoteButton = document.createElement("button");
        editNoteButton.textContent = "Edit";
        editNoteButton.className = 'edit-note-button';
        editNoteButton.onclick = function() {
            newNote.contentEditable = "true";
            newNote.focus();
            saveNoteButton.style.display = "inline-block";
        };

        var saveNoteButton = document.createElement("button");
        saveNoteButton.textContent = "Save";
        saveNoteButton.className = 'save-note-button';
        saveNoteButton.style.display = "none";
        saveNoteButton.onclick = function() {
            newNote.contentEditable = "false";
            saveNoteButton.style.display = "none";
            textToCopy = newNote.textContent;
        };

        noteAndTimestampContainer.appendChild(timestamp);
        noteAndTimestampContainer.appendChild(copyNoteButton);
        noteAndTimestampContainer.appendChild(editNoteButton);
        noteAndTimestampContainer.appendChild(saveNoteButton);

        var newNoteContainer = document.createElement("div");
        newNoteContainer.appendChild(noteAndTimestampContainer);
        newNoteContainer.appendChild(newNote);

        if (savedNotesContainer.firstChild) {
            savedNotesContainer.insertBefore(newNoteContainer, savedNotesContainer.firstChild);
        } else {
            savedNotesContainer.appendChild(newNoteContainer);
        }

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
        var notes = savedNotesContainer.querySelectorAll(".note-content");
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

    window.addEventListener('beforeunload', function (e) {
        e.preventDefault(); 
        e.returnValue = '';
    });
});

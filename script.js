let selectedProfile = null;

function showPinPrompt(profileId) {
    selectedProfile = profileId;
    document.getElementById("pin-modal").style.display = "flex";
}

function checkPin() {
    const pin = document.getElementById("pin-input").value;
    const correctPins = {
        1: "123456", 2: "234567", 3: "345678", 4: "456789",
        5: "567890", 6: "678901", 7: "789012", 8: "890123",
        9: "901234", 10: "012345", 11: "112233", 12: "223344",
        13: "334455", 14: "445566", 15: "556677", 16: "667788"
    };

    if (correctPins[selectedProfile] === pin) {
        window.location.href = `https://app.sane.fyi/furiouscopper/welcome${selectedProfile}`;
    } else {
        alert("Incorrect PIN");
    }
}

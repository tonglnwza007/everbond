// ฟังก์ชันสำหรับจัดการ header เมื่อ scroll
window.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

let selectedProfile = null;

// กำหนดลิงก์ redirect ของแต่ละโปรไฟล์
const redirectUrls = {
  1: "https://app.sane.fyi/s/81abc5fc-e77d-11ef-8a28-7b8a7b3023ae?t=4KB7XLxxTOqP7UFNrFM8&utm_source=share-menu&utm_medium=web",
  2: "https://app.sane.fyi/s/222bbc08-e7ba-11ef-9731-3704ce18ea19?t=cwzo6yKNnRXPfnAh1h7r&utm_source=share-menu&utm_medium=web",
  3: "https://app.sane.fyi/s/4b388b56-e7ad-11ef-a871-47852153f5ac?t=bTRoGd91MmhS4QkZaDgi&utm_source=share-menu&utm_medium=web",
  4: "https://app.sane.fyi/s/33976b36-e7ba-11ef-b5f5-03d15a346eec?t=CqsZB0GJvBczi0haCK4Z&utm_source=share-menu&utm_medium=web",
  5: "https://app.sane.fyi/s/51cff960-e7ba-11ef-9580-0f742a46c87b?t=YAboCePMwjeA3K7dBIoP&utm_source=share-menu&utm_medium=web",
  6: "https://app.sane.fyi/s/604f3532-e7ba-11ef-a3b8-631dba3c05ee?t=SWYrZH3Pw5erLFEb78Yd&utm_source=share-menu&utm_medium=web",
  7: "https://app.sane.fyi/s/7ebb355c-e7ba-11ef-a36b-1fd82066591c?t=xEkAHyQ4nizvTt2hymJw&utm_source=share-menu&utm_medium=web",
  8: "https://app.sane.fyi/s/a6af19fc-e7ba-11ef-a020-83524c088d5c?t=2zmqIH19Jw9VrP1HjlO9&utm_source=share-menu&utm_medium=web",
  9: "https://app.sane.fyi/s/fcc63974-e7ba-11ef-80ef-8b0bf117893b?t=qbIbY7bJvH1sqIEdKGjB&utm_source=share-menu&utm_medium=web",
  10: "https://app.sane.fyi/s/21b8235a-e7bb-11ef-86c2-6fdd5b80b5c1?t=sciShiDEIwVAZ3hrJlrp&utm_source=share-menu&utm_medium=web",
  11: "https://app.sane.fyi/s/5acadaba-e7bc-11ef-a922-ab5431931b2b?t=hitgd8jq2Pe1iQh6g2ei&utm_source=share-menu&utm_medium=web",
  12: "https://app.sane.fyi/s/05e9cbfc-e869-11ef-b96a-33cd0067aae1?t=xXCcEl6SE1U1ozpWPHSW&utm_source=share-menu&utm_medium=web",
  13: "https://app.sane.fyi/s/776e3f74-e869-11ef-b52e-47ff6bc1d584?t=AnmwPL5UlnE6I6l8FgSO&utm_source=share-menu&utm_medium=web",
  14: "https://app.sane.fyi/s/9fc74e34-e869-11ef-930d-5f5629bbfe58?t=1CETLHx791WWVC8YgDf9&utm_source=share-menu&utm_medium=web",
  15: "https://app.sane.fyi/s/b6bf170c-e869-11ef-94d1-3f805d65e793?t=wLFn8yiHa8omDp1fyXt3&utm_source=share-menu&utm_medium=web",
  16: "https://app.sane.fyi/s/c36a7032-e869-11ef-81d1-7f95b7dc7458?t=6OgoxnSoh7fUJE63Y7w7&utm_source=share-menu&utm_medium=web",
};

function showPinPrompt(profileId) {
  selectedProfile = profileId;
  document.getElementById("pin-modal").style.display = "flex";
  clearPinInputs();
  document.getElementById("error-msg").textContent = "";
  // focus ช่องแรก
  document.querySelector(".pin-box").focus();
}
  
function moveNext(element) {
  if (element.value.length === 1) {
    // ย้าย focus ไปยังช่องถัดไป ถ้ามี
    let next = element.nextElementSibling;
    if (next && next.classList.contains("pin-box")) {
      next.focus();
    } else {
      // ถ้าเป็นช่องสุดท้าย ให้ตรวจสอบ PIN
      checkPinAuto();
    }
  }
}

function handleBackspace(e, element) {
  if (e.key === "Backspace") {
    if (element.value === "") {
      let prev = element.previousElementSibling;
      if (prev && prev.classList.contains("pin-box")) {
        prev.focus();
        prev.value = "";
        e.preventDefault();
      }
    } else {
      element.value = "";
      e.preventDefault();
    }
  }
}

function getPinValue() {
  let pin = "";
  document.querySelectorAll(".pin-box").forEach(input => {
    pin += input.value;
  });
  return pin;
}

  function checkPinAuto() {
    const pin = getPinValue();
    if (pin.length === 6) {
      // กำหนดรหัส PIN ของแต่ละโปรไฟล์ (สามารถปรับเปลี่ยนได้)
      const correctPins = {
        1: "210107",  
        2: "091106", 
        3: "291206",
        4: "300750",
        5: "100350",
        6: "230649",
        7: "260649",
        8: "051149",
        9: "240849",
        10: "210609",
        11: "174709",
        12: "250650",
        13: "110350",
        14: "064909",
        15: "161006",
        16: "274908",
    };

    if (correctPins[selectedProfile] === pin) {
      window.location.href = redirectUrls[selectedProfile];
    } else {
      document.getElementById("error-msg").textContent = "Incorrect PIN. Please try again.";
      clearPinInputs();
      document.querySelector(".pin-box").focus();
    }
  }
}

function clearPinInputs() {
  document.querySelectorAll(".pin-box").forEach(input => input.value = "");
}

function goBack() {
  document.getElementById("pin-modal").style.display = "none";
  clearPinInputs();
  document.getElementById("error-msg").textContent = "";
}
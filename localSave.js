
// --- Simple local save/restore system (fixed and complete) ---

const fieldIDs = ["landlordAddress", "tenantAddress", "unitAddress", "tenantRent", "dateEffective", "increaseDollars", "increasePercent"];

// restore saved values when page loads
window.addEventListener("load", () => {
  // Restore text fields
  fieldIDs.forEach(id => {
    const el = document.getElementById(id);
    const saved = localStorage.getItem(id);
    if (el && saved !== null) el.value = saved;
  });

  // Restore radio selection
  const savedRadio = localStorage.getItem("rentFrequency");
  if (savedRadio) {
    const radioToCheck = document.querySelector(`input[name="rentFrequency"][value="${savedRadio}"]`);
    if (radioToCheck) {
      radioToCheck.checked = true;
      if (savedRadio === "n1_rent_per_other") {
        document.getElementById("rentFrequencyOther").disabled = false;
      }
    }
  }

  // Restore "Other" text if applicable
  const savedOther = localStorage.getItem("rentFrequencyOther");
  if (savedOther !== null) {
    const otherInput = document.getElementById("rentFrequencyOther");
    otherInput.value = savedOther;
  }
});

// Save whenever a text field changes
fieldIDs.forEach(id => {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener("input", () => {
    localStorage.setItem(id, el.value);
  });
});

// Save radio selection
const radios = document.querySelectorAll('input[name="rentFrequency"]');
radios.forEach(radio => {
  radio.addEventListener("change", () => {
    localStorage.setItem("rentFrequency", radio.value);

    // Handle "Other" enabling
    const otherInput = document.getElementById("rentFrequencyOther");
    if (radio.value === "n1_rent_per_other" && radio.checked) {
      otherInput.disabled = false;
    } else {
      otherInput.disabled = true;
      otherInput.value = "";
      localStorage.removeItem("rentFrequencyOther");
    }
  });
});



// Save "Other" input
document.getElementById("rentFrequencyOther").addEventListener("input", e => {
  localStorage.setItem("rentFrequencyOther", e.target.value);
});

// Clear button: wipe everything clean
document.getElementById("clearBtn").addEventListener("click", () => {
  const confirmClear = confirm("Are you sure you want to clear all fields and delete saved data?");
  if (!confirmClear) return;

  // Clear text fields
  fieldIDs.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = "";
    localStorage.removeItem(id);
  });

  // Clear radio selections
  radios.forEach(r => (r.checked = false));
  localStorage.removeItem("rentFrequency");

  // Clear "Other"
  const otherInput = document.getElementById("rentFrequencyOther");
  otherInput.value = "";
  otherInput.disabled = true;
  localStorage.removeItem("rentFrequencyOther");

  alert("Clearing all fields! :)");
});

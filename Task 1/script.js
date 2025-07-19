function showAlert() {
  const fileInput = document.getElementById("fileInput");
  if (!fileInput.files.length) {
    alert("⚠️ Please upload a resume file before analysis.");
    return;
  }
  const fileName = fileInput.files[0].name;
  alert("✅ AI is analyzing your resume for ATS score…\nFile: " + fileName);
}

document.getElementById("fileInput").addEventListener("change", function () {
  const name = this.files[0] ? this.files[0].name : "No file selected";
  document.getElementById("fileName").textContent = name;
});

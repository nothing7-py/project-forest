<!-- Include jsPDF CDN -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>

<!-- Simple Form -->
<input type="text" id="sender" placeholder="Your Name">
<input type="text" id="receiver" placeholder="Receiver Name">
<button onclick="generateCertificate()">Generate Certificate</button>

<script>
function generateCertificate() {
  const sender = document.getElementById("sender").value.trim();
  const receiver = document.getElementById("receiver").value.trim();

  if (!sender || !receiver) {
    alert("Please enter both names.");
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Title
  doc.setFontSize(22);
  doc.text("Certificate of Forest Love", 40, 40);

  // Main Message
  doc.setFontSize(16);
  doc.text(
    `${receiver} accepted ${sender}'s love.`,
    40,
    80
  );

  // Footer Line
  doc.setFontSize(14);
  doc.text("A promise made in the calm of the forest 🌿", 40, 110);

  // Save PDF
  doc.save("Forest_Love_Certificate.pdf");
}
</script>

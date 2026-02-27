function generateCertificate(){
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(22);
  doc.text("Certificate of Forest Love",40,40);

  doc.setFontSize(16);
  doc.text(
    `${data.receiver} accepted ${data.sender}'s love.`,
    40,80
  );

  doc.text("A promise made in the calm of the forest 🌿",40,110);

  doc.save("Forest_Love_Certificate.pdf");
}

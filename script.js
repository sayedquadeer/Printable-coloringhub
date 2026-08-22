// Title Live Sync
document.getElementById('bookTitle').addEventListener('input', function(e) {
  const previewTitle = document.getElementById('previewTitle');
  previewTitle.textContent = e.target.value.trim() !== "" ? e.target.value : "My Coloring Book";
});

// Helper function to draw simple line-art shapes onto PDF canvas
function drawSampleOutline(doc, x, y, width, height, pageNum) {
  // Page Border
  doc.setLineWidth(1);
  doc.rect(10, 10, width - 20, height - 20);

  // Header Title
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(`Page ${pageNum} - Outline Art`, width / 2, 25, { align: "center" });

  // Draw sample geometric coloring outline
  doc.setLineWidth(2);
  const cx = width / 2;
  const cy = height / 2;
  
  doc.circle(cx, cy, 40);
  doc.circle(cx, cy, 25);
  doc.circle(cx - 15, cy - 10, 5);
  doc.circle(cx + 15, cy - 10, 5);
  
  // Smile Arc
  doc.ellipse(cx, cy + 10, 12, 6, 'S');

  // Bottom Footer
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Printable Coloring Hub • Free Printable Activity Page", width / 2, height - 15, { align: "center" });
}

async function generatePDF() {
  const { jsPDF } = window.jspdf;
  const title = document.getElementById('bookTitle').value || "Kids Coloring Book";
  const pageSize = document.getElementById('pageSize').value;
  const btn = document.getElementById('generateBtn');
  const statusMsg = document.getElementById('statusMessage');

  btn.disabled = true;
  btn.style.opacity = "0.7";
  statusMsg.classList.add('active');
  statusMsg.textContent = "⏳ Generating 50 Pages PDF... Please wait!";

  setTimeout(() => {
    try {
      // Create PDF Document
      const format = pageSize === 'letter' ? 'letter' : 'a4';
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: format
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      // --- PAGE 1: COVER PAGE ---
      doc.setFillColor(245, 247, 255);
      doc.rect(0, 0, pageWidth, pageHeight, 'F');

      doc.setLineWidth(3);
      doc.rect(8, 8, pageWidth - 16, pageHeight - 16);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(26);
      doc.setTextColor(40, 50, 90);
      doc.text(title, pageWidth / 2, 60, { align: "center", maxWidth: pageWidth - 40 });

      doc.setFontSize(16);
      doc.setTextColor(100, 110, 140);
      doc.text("50 Printable Coloring Pages For Kids", pageWidth / 2, 80, { align: "center" });

      // Big Decorative Circle on Cover
      doc.setLineWidth(2);
      doc.circle(pageWidth / 2, pageHeight / 2 + 10, 45);
      doc.circle(pageWidth / 2, pageHeight / 2 + 10, 30);

      doc.setFontSize(12);
      doc.text("Created with Printable Coloring Hub", pageWidth / 2, pageHeight - 25, { align: "center" });

      // --- PAGES 2 TO 50: COLORING PAGES ---
      for (let i = 2; i <= 50; i++) {
        doc.addPage();
        drawSampleOutline(doc, 0, 0, pageWidth, pageHeight, i - 1);
      }

      // Save File
      const fileName = title.toLowerCase().replace(/[^a-z0-9]/g, '_') + '_50_pages.pdf';
      doc.save(fileName);

      statusMsg.textContent = "✅ Success! Your 50-page coloring book has been downloaded.";
    } catch (err) {
      console.error(err);
      statusMsg.textContent = "❌ An error occurred while generating PDF. Please try again.";
    } finally {
      btn.disabled = false;
      btn.style.opacity = "1";
    }
  }, 100);
  }


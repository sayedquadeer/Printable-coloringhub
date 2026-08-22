// Live Preview Sync
document.getElementById('bookTitle').addEventListener('input', function(e) {
  const previewTitle = document.getElementById('previewTitle');
  previewTitle.textContent = e.target.value.trim() !== "" ? e.target.value : "My Coloring Book";
});

// Draw Outlines Without Memory Leak
function drawSampleOutline(doc, width, height, pageNum) {
  doc.setLineWidth(1);
  doc.rect(10, 10, width - 20, height - 20);

  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(`Page ${pageNum} - Printable Line Art`, width / 2, 25, { align: "center" });

  doc.setLineWidth(2);
  const cx = width / 2;
  const cy = height / 2;
  
  doc.circle(cx, cy, 40);
  doc.circle(cx, cy, 25);
  doc.circle(cx - 15, cy - 10, 5);
  doc.circle(cx + 15, cy - 10, 5);
  doc.ellipse(cx, cy + 10, 12, 6, 'S');

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Printable Coloring Hub • Free Activity Worksheet", width / 2, height - 15, { align: "center" });
}

// Memory Safe Async PDF Generation
async function generatePDF() {
  const { jsPDF } = window.jspdf;
  const title = document.getElementById('bookTitle').value || "Kids Coloring Book";
  const pageSize = document.getElementById('pageSize').value;
  const btn = document.getElementById('generateBtn');
  const statusMsg = document.getElementById('statusMessage');

  btn.disabled = true;
  btn.style.opacity = "0.6";
  statusMsg.classList.add('active');

  try {
    const format = pageSize === 'letter' ? 'letter' : 'a4';
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: format });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // COVER PAGE
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

    doc.setLineWidth(2);
    doc.circle(pageWidth / 2, pageHeight / 2 + 10, 45);

    doc.setFontSize(12);
    doc.text("Created with Printable Coloring Hub", pageWidth / 2, pageHeight - 25, { align: "center" });

    // NON-BLOCKING LOOP (Prevents Browser Freeze)
    for (let i = 2; i <= 50; i++) {
      doc.addPage();
      drawSampleOutline(doc, pageWidth, pageHeight, i - 1);

      // Har 10 pages ke baad browser ko aaram dene ke liye micro-pause
      if (i % 10 === 0) {
        statusMsg.textContent = `⏳ Processing Page ${i} of 50...`;
        await new Promise(resolve => setTimeout(resolve, 30));
      }
    }

    const fileName = title.toLowerCase().replace(/[^a-z0-9]/g, '_') + '_50_pages.pdf';
    doc.save(fileName);

    statusMsg.textContent = "✅ Download Complete! Check your downloads folder.";
  } catch (err) {
    console.error(err);
    statusMsg.textContent = "❌ Generation failed. Try again!";
  } finally {
    btn.disabled = false;
    btn.style.opacity = "1";
  }
}

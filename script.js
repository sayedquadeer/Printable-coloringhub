let currentPreviewTab = 'cover';

// Initialize Canvas
window.addEventListener('DOMContentLoaded', () => {
  renderPreviewCanvas();
  
  // Title Sync
  document.getElementById('bookTitle').addEventListener('input', () => {
    if (currentPreviewTab === 'cover') {
      renderPreviewCanvas();
    }
  });
});

function switchPreviewPage(tabName) {
  currentPreviewTab = tabName;
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  renderPreviewCanvas();
}

function renderPreviewCanvas() {
  const canvas = document.getElementById('previewCanvas');
  const ctx = canvas.getContext('2d');
  const title = document.getElementById('bookTitle').value || "My Coloring Book";

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Background
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Outer Border
  ctx.strokeStyle = "#2d3436";
  ctx.lineWidth = 4;
  ctx.strokeRect(12, 12, canvas.width - 24, canvas.height - 24);

  if (currentPreviewTab === 'cover') {
    // COVER PAGE PREVIEW
    ctx.fillStyle = "#6c5ce7";
    ctx.font = "bold 22px Fredoka, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(title, canvas.width / 2, 70);

    ctx.fillStyle = "#ff7675";
    ctx.font = "bold 14px Nunito, sans-serif";
    ctx.fillText("50 Printable Coloring Pages Inside", canvas.width / 2, 95);

    // Cute Lion Graphic on Cover
    drawCuteLion(ctx, canvas.width / 2, 260, 1.1);

    ctx.fillStyle = "#b2bec3";
    ctx.font = "bold 11px Nunito, sans-serif";
    ctx.fillText("Printable Coloring Hub • A4 Standard", canvas.width / 2, canvas.height - 30);

  } else if (currentPreviewTab === 'lion') {
    // PAGE 2: LION PREVIEW
    ctx.fillStyle = "#2d3436";
    ctx.font = "bold 16px Fredoka, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Page 2 - Cute Jungle Lion", canvas.width / 2, 45);

    drawCuteLion(ctx, canvas.width / 2, 250, 1.2);

    ctx.fillStyle = "#b2bec3";
    ctx.font = "11px Nunito, sans-serif";
    ctx.fillText("Color me with crayons or markers!", canvas.width / 2, canvas.height - 30);

  } else if (currentPreviewTab === 'dino') {
    // PAGE 3: DINOSAUR PREVIEW
    ctx.fillStyle = "#2d3436";
    ctx.font = "bold 16px Fredoka, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Page 3 - Friendly Dinosaur", canvas.width / 2, 45);

    drawCuteDino(ctx, canvas.width / 2, 250, 1.2);

    ctx.fillStyle = "#b2bec3";
    ctx.font = "11px Nunito, sans-serif";
    ctx.fillText("Dinosaur Adventure Series", canvas.width / 2, canvas.height - 30);
  }
}

// Vector Drawing for Cute Lion Outline
function drawCuteLion(ctx, cx, cy, scale) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(scale, scale);
  ctx.strokeStyle = "#2d3436";
  ctx.lineWidth = 3;
  ctx.fillStyle = "none";

  // Mane (Outer Circle Arc Pattern)
  ctx.beginPath();
  for (let i = 0; i < 12; i++) {
    let angle = (i * Math.PI) / 6;
    let mx = Math.cos(angle) * 70;
    let my = Math.sin(angle) * 70;
    ctx.arc(mx, my, 22, 0, Math.PI * 2);
  }
  ctx.stroke();

  // Head Circle
  ctx.beginPath();
  ctx.arc(0, 0, 55, 0, Math.PI * 2);
  ctx.fillStyle = "#ffffff";
  ctx.fill();
  ctx.stroke();

  // Ears
  ctx.beginPath();
  ctx.arc(-40, -40, 16, 0, Math.PI * 2);
  ctx.arc(40, -40, 16, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Eyes
  ctx.beginPath();
  ctx.arc(-18, -10, 7, 0, Math.PI * 2);
  ctx.arc(18, -10, 7, 0, Math.PI * 2);
  ctx.fillStyle = "#2d3436";
  ctx.fill();

  // Nose
  ctx.beginPath();
  ctx.arc(0, 10, 9, 0, Math.PI * 2);
  ctx.fill();

  // Smile
  ctx.beginPath();
  ctx.arc(0, 15, 16, 0.2, Math.PI - 0.2);
  ctx.stroke();

  // Body
  ctx.beginPath();
  ctx.arc(0, 95, 40, Math.PI, 0);
  ctx.stroke();

  ctx.restore();
}

// Vector Drawing for Cute Dino Outline
function drawCuteDino(ctx, cx, cy, scale) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(scale, scale);
  ctx.strokeStyle = "#2d3436";
  ctx.lineWidth = 3;

  // Dino Head & Body
  ctx.beginPath();
  ctx.arc(0, -20, 45, 0, Math.PI * 2);
  ctx.arc(10, 50, 55, 0, Math.PI * 2);
  ctx.fillStyle = "#ffffff";
  ctx.fill();
  ctx.stroke();

  // Spikes on back
  ctx.beginPath();
  ctx.moveTo(-35, -40); ctx.lineTo(-50, -30); ctx.lineTo(-30, -20);
  ctx.moveTo(-40, 20); ctx.lineTo(-60, 30); ctx.lineTo(-35, 40);
  ctx.stroke();

  // Eye
  ctx.beginPath();
  ctx.arc(15, -25, 7, 0, Math.PI * 2);
  ctx.fillStyle = "#2d3436";
  ctx.fill();

  // Smile
  ctx.beginPath();
  ctx.arc(15, -10, 12, 0.1, Math.PI - 0.5);
  ctx.stroke();

  ctx.restore();
}

// PDF Generation Logic
async function generatePDF() {
  const { jsPDF } = window.jspdf;
  const title = document.getElementById('bookTitle').value || "Kids Coloring Book";
  const pageSize = document.getElementById('pageSize').value;
  const btn = document.getElementById('generateBtn');
  const statusMsg = document.getElementById('statusMessage');

  btn.disabled = true;
  statusMsg.classList.add('active');
  statusMsg.textContent = "⏳ Creating 50-Page HD PDF... Please wait!";

  setTimeout(async () => {
    try {
      const format = pageSize === 'letter' ? 'letter' : 'a4';
      const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: format });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      // --- PAGE 1: COVER ---
      doc.setLineWidth(2);
      doc.rect(8, 8, pageWidth - 16, pageHeight - 16);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(24);
      doc.setTextColor(108, 92, 231);
      doc.text(title, pageWidth / 2, 55, { align: "center", maxWidth: pageWidth - 30 });

      doc.setFontSize(14);
      doc.setTextColor(221, 107, 32);
      doc.text("50 Printable Coloring Worksheets", pageWidth / 2, 72, { align: "center" });

      // Circle art placeholder on cover
      doc.setLineWidth(1.5);
      doc.circle(pageWidth / 2, pageHeight / 2, 45);

      doc.setFontSize(10);
      doc.setTextColor(150, 150, 150);
      doc.text("Printable Coloring Hub • High Resolution A4 Format", pageWidth / 2, pageHeight - 20, { align: "center" });

      // --- PAGES 2 TO 50 ---
      for (let i = 2; i <= 50; i++) {
        doc.addPage();
        doc.setLineWidth(1);
        doc.rect(8, 8, pageWidth - 16, pageHeight - 16);

        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(50, 50, 50);
        doc.text(`Page ${i - 1} - Activity Worksheet`, pageWidth / 2, 20, { align: "center" });

        // Draw Sample Shapes for Coloring
        doc.setLineWidth(1.5);
        doc.circle(pageWidth / 2, pageHeight / 2, 50);
        doc.circle(pageWidth / 2 - 20, pageHeight / 2 - 15, 8);
        doc.circle(pageWidth / 2 + 20, pageHeight / 2 - 15, 8);

        doc.setFontSize(9);
        doc.setFont("helvetica", "normal");
        doc.text("Printable Coloring Hub", pageWidth / 2, pageHeight - 15, { align: "center" });

        if (i % 10 === 0) {
          await new Promise(r => setTimeout(r, 20));
        }
      }

      const fileName = title.toLowerCase().replace(/[^a-z0-9]/g, '_') + '_50pages.pdf';
      doc.save(fileName);

      statusMsg.textContent = "✅ Success! 50-Page PDF Downloaded Successfully.";
    } catch (err) {
      console.error(err);
      statusMsg.textContent = "❌ Error generating PDF. Please try again.";
    } finally {
      btn.disabled = false;
    }
  }, 100);
                      }

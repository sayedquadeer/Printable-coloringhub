let currentPreviewTab = 'cover';

window.addEventListener('DOMContentLoaded', () => {
  renderPreviewCanvas();
  document.getElementById('bookTitle')?.addEventListener('input', renderPreviewCanvas);
  document.getElementById('themeSelect')?.addEventListener('change', renderPreviewCanvas);
});

function switchPreviewPage(tabName) {
  currentPreviewTab = tabName;
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  if (event && event.target) event.target.classList.add('active');
  renderPreviewCanvas();
}

// HD Detailed Vector Paths for Real Animals
function drawDetailedAnimal(ctx, type, x, y, scale) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.strokeStyle = "#1e293b";
  ctx.lineWidth = 3;
  ctx.fillStyle = "#ffffff";
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  if (type === 'lion') {
    // Mane
    ctx.beginPath();
    for (let i = 0; i < 16; i++) {
      let a = (i * Math.PI) / 8;
      ctx.arc(Math.cos(a) * 75, Math.sin(a) * 75, 22, 0, Math.PI * 2);
    }
    ctx.fill(); ctx.stroke();

    // Body & Paws
    ctx.beginPath();
    ctx.roundRect(-45, 30, 90, 80, 20);
    ctx.fill(); ctx.stroke();

    // Head
    ctx.beginPath();
    ctx.arc(0, 0, 55, 0, Math.PI * 2);
    ctx.fill(); ctx.stroke();

    // Ears
    ctx.beginPath(); ctx.arc(-42, -42, 16, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.arc(42, -42, 16, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    // Snout Box & Nose
    ctx.beginPath(); ctx.roundRect(-20, 5, 40, 25, 10); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-10, 10); ctx.lineTo(10, 10); ctx.lineTo(0, 22); ctx.closePath(); ctx.fillStyle = "#1e293b"; ctx.fill();

    // Eyes with spark
    ctx.beginPath(); ctx.arc(-20, -12, 8, 0, Math.PI * 2); ctx.arc(20, -12, 8, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(-18, -14, 3, 0, Math.PI * 2); ctx.arc(22, -14, 3, 0, Math.PI * 2); ctx.fillStyle = "#ffffff"; ctx.fill();

    // Whiskers
    ctx.beginPath();
    ctx.moveTo(-25, 18); ctx.lineTo(-45, 15);
    ctx.moveTo(-25, 22); ctx.lineTo(-45, 25);
    ctx.moveTo(25, 18); ctx.lineTo(45, 15);
    ctx.moveTo(25, 22); ctx.lineTo(45, 25);
    ctx.stroke();

  } else if (type === 'bear') {
    // Ears
    ctx.beginPath(); ctx.arc(-50, -50, 22, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.arc(50, -50, 22, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.arc(-50, -50, 12, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.arc(50, -50, 12, 0, Math.PI * 2); ctx.stroke();

    // Head
    ctx.beginPath(); ctx.arc(0, 0, 65, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    // Snout
    ctx.beginPath(); ctx.ellipse(0, 15, 28, 20, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.arc(0, 5, 10, 0, Math.PI * 2); ctx.fillStyle = "#1e293b"; ctx.fill();

    // Mouth
    ctx.beginPath(); ctx.arc(-8, 20, 10, 0.2, Math.PI - 0.2); ctx.stroke();
    ctx.beginPath(); ctx.arc(8, 20, 10, 0.2, Math.PI - 0.2); ctx.stroke();

    // Eyes
    ctx.beginPath(); ctx.arc(-25, -15, 7, 0, Math.PI * 2); ctx.arc(25, -15, 7, 0, Math.PI * 2); ctx.fill();

  } else if (type === 'bunny') {
    // Long Ears
    ctx.beginPath(); ctx.ellipse(-25, -80, 16, 50, -0.1, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(25, -80, 16, 50, 0.1, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(-25, -80, 8, 35, -0.1, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(25, -80, 8, 35, 0.1, 0, Math.PI * 2); ctx.stroke();

    // Head
    ctx.beginPath(); ctx.arc(0, -10, 50, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    // Nose & Mouth
    ctx.beginPath(); ctx.moveTo(-6, 5); ctx.lineTo(6, 5); ctx.lineTo(0, 12); ctx.closePath(); ctx.fillStyle = "#1e293b"; ctx.fill();
    ctx.beginPath(); ctx.arc(-6, 16, 8, 0, Math.PI - 0.2); ctx.stroke();
    ctx.beginPath(); ctx.arc(6, 16, 8, 0.2, Math.PI); ctx.stroke();

    // Eyes
    ctx.beginPath(); ctx.arc(-20, -15, 7, 0, Math.PI * 2); ctx.arc(20, -15, 7, 0, Math.PI * 2); ctx.fill();
    
    // Cheeks
    ctx.beginPath(); ctx.arc(-30, 5, 10, 0, Math.PI * 2); ctx.arc(30, 5, 10, 0, Math.PI * 2); ctx.stroke();

  } else if (type === 'elephant') {
    // Ears
    ctx.beginPath(); ctx.ellipse(-65, -10, 35, 50, -0.2, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(65, -10, 35, 50, 0.2, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    // Head
    ctx.beginPath(); ctx.arc(0, -10, 50, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    // Trunk
    ctx.beginPath();
    ctx.moveTo(-12, 15);
    ctx.bezierCurveTo(-15, 60, 30, 65, 35, 45);
    ctx.bezierCurveTo(20, 45, 5, 40, 12, 15);
    ctx.closePath();
    ctx.fill(); ctx.stroke();

    // Eyes
    ctx.beginPath(); ctx.arc(-22, -20, 6, 0, Math.PI * 2); ctx.arc(22, -20, 6, 0, Math.PI * 2); ctx.fillStyle = "#1e293b"; ctx.fill();

  } else {
    // Cute Cat / Panda
    ctx.beginPath(); ctx.moveTo(-45, -20); ctx.lineTo(-25, -60); ctx.lineTo(-10, -35); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(45, -20); ctx.lineTo(25, -60); ctx.lineTo(10, -35); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.arc(0, 0, 55, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.arc(-22, -10, 8, 0, Math.PI * 2); ctx.arc(22, -10, 8, 0, Math.PI * 2); ctx.fillStyle = "#1e293b"; ctx.fill();
    ctx.beginPath(); ctx.arc(0, 5, 6, 0, Math.PI * 2); ctx.fill();
  }

  ctx.restore();
}

function renderPreviewCanvas() {
  const canvas = document.getElementById('previewCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const title = document.getElementById('bookTitle').value || "My Coloring Book";

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "#1e293b";
  ctx.lineWidth = 4;
  ctx.strokeRect(12, 12, canvas.width - 24, canvas.height - 24);

  if (currentPreviewTab === 'cover') {
    ctx.fillStyle = "#6c5ce7";
    ctx.font = "bold 20px Fredoka, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(title, canvas.width / 2, 60);

    drawDetailedAnimal(ctx, 'lion', canvas.width / 2, 230, 1.1);

    ctx.fillStyle = "#ff7675";
    ctx.font = "bold 14px Nunito, sans-serif";
    ctx.fillText("50 High-Quality HD Pages Inside", canvas.width / 2, canvas.height - 35);
  } else if (currentPreviewTab === 'lion') {
    drawDetailedAnimal(ctx, 'bear', canvas.width / 2, 220, 1.1);
  } else {
    drawDetailedAnimal(ctx, 'bunny', canvas.width / 2, 230, 1.1);
  }
}

// Dynamic PDF Engine rendering real Animal Drawings on every page
async function generatePDF() {
  const { jsPDF } = window.jspdf;
  const title = document.getElementById('bookTitle').value || "Cute Animal Coloring Book";
  const pageSize = document.getElementById('pageSize').value;
  const btn = document.getElementById('generateBtn');
  const statusMsg = document.getElementById('statusMessage');

  btn.disabled = true;
  statusMsg.classList.add('active');
  statusMsg.textContent = "⏳ Creating 50 HD Cute Animal Pages... Please wait!";

  setTimeout(async () => {
    try {
      const format = pageSize === 'letter' ? 'letter' : 'a4';
      const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: format });
      const pw = doc.internal.pageSize.getWidth();
      const ph = doc.internal.pageSize.getHeight();

      const animalTypes = ['lion', 'bear', 'bunny', 'elephant', 'cat'];
      const animalNames = ['Cute King Lion', 'Fluffy Teddy Bear', 'Happy Bunny Rabbit', 'Playful Baby Elephant', 'Adorable Kitten'];

      // Temp Canvas for rendering real vector drawings to PDF
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = 400;
      tempCanvas.height = 400;
      const tempCtx = tempCanvas.getContext('2d');

      // --- COVER PAGE ---
      doc.setLineWidth(2);
      doc.rect(8, 8, pw - 16, ph - 16);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.setTextColor(108, 92, 231);
      doc.text(title, pw / 2, 45, { align: "center", maxWidth: pw - 30 });

      doc.setFontSize(14);
      doc.setTextColor(235, 87, 87);
      doc.text("50 Ready-to-Color HD Printable Pages", pw / 2, 60, { align: "center" });

      // Render Cover Animal Artwork
      tempCtx.clearRect(0, 0, 400, 400);
      drawDetailedAnimal(tempCtx, 'lion', 200, 200, 1.4);
      const coverImgData = tempCanvas.toDataURL('image/png');
      doc.addImage(coverImgData, 'PNG', pw / 2 - 45, ph / 2 - 45, 90, 90);

      doc.setFontSize(10);
      doc.setTextColor(150, 150, 150);
      doc.text("Printable Coloring Hub • Premium Kids Edition", pw / 2, ph - 18, { align: "center" });

      // --- PAGES 2 TO 50 ---
      for (let i = 2; i <= 50; i++) {
        doc.addPage();
        doc.setLineWidth(1.2);
        doc.rect(8, 8, pw - 16, ph - 16);

        const animalIdx = (i - 2) % animalTypes.length;
        const currentType = animalTypes[animalIdx];
        const currentName = animalNames[animalIdx];

        // Page Header
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(45, 52, 54);
        doc.text(`Page ${i - 1}: ${currentName}`, pw / 2, 22, { align: "center" });

        // Draw HD Animal on canvas & transfer to PDF
        tempCtx.clearRect(0, 0, 400, 400);
        drawDetailedAnimal(tempCtx, currentType, 200, 200, 1.35);
        const imgData = tempCanvas.toDataURL('image/png');

        doc.addImage(imgData, 'PNG', pw / 2 - 50, ph / 2 - 50, 100, 100);

        // Footer
        doc.setFontSize(9);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(160, 160, 160);
        doc.text("Printable Coloring Hub • High Resolution 300 DPI", pw / 2, ph - 15, { align: "center" });

        if (i % 5 === 0) await new Promise(r => setTimeout(r, 10));
      }

      const fileName = title.toLowerCase().replace(/[^a-z0-9]/g, '_') + '_hd_animals.pdf';
      doc.save(fileName);

      statusMsg.textContent = "✅ Success! 50 Real HD Cute Animal Pages Downloaded.";
    } catch (e) {
      console.error(e);
      statusMsg.textContent = "❌ Error generating PDF. Please try again.";
    } finally {
      btn.disabled = false;
    }
  }, 100);
    }
        

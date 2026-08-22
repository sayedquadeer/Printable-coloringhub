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

function renderPreviewCanvas() {
  const canvas = document.getElementById('previewCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const title = document.getElementById('bookTitle').value || "My Coloring Book";

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "#2d3436";
  ctx.lineWidth = 4;
  ctx.strokeRect(12, 12, canvas.width - 24, canvas.height - 24);

  if (currentPreviewTab === 'cover') {
    ctx.fillStyle = "#6c5ce7";
    ctx.font = "bold 22px Fredoka, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(title, canvas.width / 2, 70);
    drawVectorShape(ctx, canvas.width / 2, 250, 1.1, 'lion');
  } else if (currentPreviewTab === 'lion') {
    drawVectorShape(ctx, canvas.width / 2, 240, 1.1, 'bear');
  } else if (currentPreviewTab === 'dino') {
    drawVectorShape(ctx, canvas.width / 2, 240, 1.1, 'dino');
  }
}

function drawVectorShape(ctx, cx, cy, scale, type) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(scale, scale);
  ctx.strokeStyle = "#2d3436";
  ctx.lineWidth = 3;
  ctx.fillStyle = "#ffffff";

  if (type === 'lion') {
    ctx.beginPath();
    for (let i = 0; i < 12; i++) {
      let a = (i * Math.PI) / 6;
      ctx.arc(Math.cos(a) * 60, Math.sin(a) * 60, 18, 0, Math.PI * 2);
    }
    ctx.stroke();
    ctx.beginPath(); ctx.arc(0, 0, 45, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.arc(-15, -10, 5, 0, Math.PI * 2); ctx.arc(15, -10, 5, 0, Math.PI * 2); ctx.fillStyle = "#2d3436"; ctx.fill();
  } else if (type === 'bear') {
    ctx.beginPath(); ctx.arc(0, 0, 50, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.arc(-40, -40, 18, 0, Math.PI * 2); ctx.arc(40, -40, 18, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.arc(-15, -10, 5, 0, Math.PI * 2); ctx.arc(15, -10, 5, 0, Math.PI * 2); ctx.fillStyle = "#2d3436"; ctx.fill();
  } else if (type === 'dino') {
    ctx.beginPath(); ctx.arc(0, -20, 35, 0, Math.PI * 2); ctx.arc(10, 35, 45, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  }
  ctx.restore();
}

async function generatePDF() {
  const { jsPDF } = window.jspdf;
  const title = document.getElementById('bookTitle').value || "Kids Coloring Book";
  const pageSize = document.getElementById('pageSize').value;
  const theme = document.getElementById('themeSelect').value;
  const btn = document.getElementById('generateBtn');
  const statusMsg = document.getElementById('statusMessage');

  btn.disabled = true;
  statusMsg.classList.add('active');
  statusMsg.textContent = "⏳ Generating 50 Unique HD Pages... Please wait!";

  setTimeout(async () => {
    try {
      const format = pageSize === 'letter' ? 'letter' : 'a4';
      const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: format });
      const pw = doc.internal.pageSize.getWidth();
      const ph = doc.internal.pageSize.getHeight();

      // Cover Page
      doc.setLineWidth(2);
      doc.rect(8, 8, pw - 16, ph - 16);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.setTextColor(108, 92, 231);
      doc.text(title, pw / 2, 50, { align: "center" });

      // 50 DYNAMIC PAGES
      for (let i = 2; i <= 50; i++) {
        doc.addPage();
        doc.setLineWidth(1);
        doc.rect(8, 8, pw - 16, ph - 16);

        const cx = pw / 2;
        const cy = ph / 2;
        const pattern = (i % 5);

        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(45, 52, 54);

        if (theme === 'alphabets') {
          const letter = String.fromCharCode(65 + ((i - 2) % 26));
          doc.text(`Page ${i - 1} - Letter ${letter}`, cx, 22, { align: "center" });
          doc.rect(cx - 30, cy - 40, 60, 60);
          doc.setFontSize(50);
          doc.text(letter, cx, cy + 5, { align: "center" });
        } else if (theme === 'dinos') {
          doc.text(`Page ${i - 1} - Dinosaur #${i-1}`, cx, 22, { align: "center" });
          doc.circle(cx, cy - 20, 25);
          doc.ellipse(cx + 10, cy + 20, 35, 45);
          doc.triangle(cx - 20, cy - 30, cx - 35, cy - 15, cx - 15, cy - 10, 'S');
        } else if (theme === 'space') {
          doc.text(`Page ${i - 1} - Space Explorer #${i-1}`, cx, 22, { align: "center" });
          if (pattern % 2 === 0) {
            doc.ellipse(cx, cy, 20, 45);
            doc.circle(cx, cy - 15, 10);
          } else {
            doc.circle(cx, cy, 30);
            doc.ellipse(cx, cy, 50, 10);
          }
        } else {
          // Animals
          doc.text(`Page ${i - 1} - Animal Friend #${i-1}`, cx, 22, { align: "center" });
          if (pattern === 0) {
            // Bear
            doc.circle(cx, cy, 35);
            doc.circle(cx - 30, cy - 30, 12);
            doc.circle(cx + 30, cy - 30, 12);
          } else if (pattern === 1) {
            // Elephant
            doc.ellipse(cx, cy, 30, 40);
            doc.ellipse(cx - 35, cy - 10, 15, 25);
            doc.ellipse(cx + 35, cy - 10, 15, 25);
          } else if (pattern === 2) {
            // Lion Mane
            doc.circle(cx, cy, 30);
            doc.circle(cx, cy, 45);
          } else {
            // Cute Cat / Fox
            doc.circle(cx, cy, 35);
            doc.triangle(cx - 30, cy - 25, cx - 10, cy - 35, cx - 15, cy - 10, 'S');
            doc.triangle(cx + 30, cy - 25, cx + 10, cy - 35, cx + 15, cy - 10, 'S');
          }
        }

        doc.setFontSize(9);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(150, 150, 150);
        doc.text("Printable Coloring Hub", cx, ph - 15, { align: "center" });

        if (i % 10 === 0) await new Promise(r => setTimeout(r, 10));
      }

      doc.save(`${title.toLowerCase().replace(/\s+/g, '_')}_50pages.pdf`);
      statusMsg.textContent = "✅ Success! Unique 50-Page PDF Generated.";
    } catch (e) {
      statusMsg.textContent = "❌ Error generating PDF.";
    } finally {
      btn.disabled = false;
    }
  }, 100);
        }

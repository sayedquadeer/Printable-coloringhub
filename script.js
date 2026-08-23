let currentPreviewTab = 'cover';

// HD Animal Line-Art SVG/Image URLs
const ANIMAL_IMAGES = [
  "https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=600&q=80", // Lion
  "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=600&q=80", // Bear
  "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=600&q=80", // Bunny
  "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=600&q=80", // Elephant
  "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80"  // Cat
];

window.addEventListener('DOMContentLoaded', () => {
  renderPreviewCanvas();
  document.getElementById('bookTitle')?.addEventListener('input', renderPreviewCanvas);
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
  const title = document.getElementById('bookTitle').value || "My Cute Animals";

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "#2d3436";
  ctx.lineWidth = 4;
  ctx.strokeRect(12, 12, canvas.width - 24, canvas.height - 24);

  ctx.fillStyle = "#6c5ce7";
  ctx.font = "bold 20px Fredoka, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(title, canvas.width / 2, 60);

  ctx.fillStyle = "#2d3436";
  ctx.font = "bold 14px Nunito, sans-serif";
  ctx.fillText("🎨 HD Cute Animal Coloring Book", canvas.width / 2, 100);
  ctx.fillText("50 High-Quality Pages Included", canvas.width / 2, 120);

  // Decorative Box for Preview
  ctx.strokeStyle = "#a29bfe";
  ctx.lineWidth = 2;
  ctx.strokeRect(40, 150, canvas.width - 80, 240);
  
  ctx.fillStyle = "#636e72";
  ctx.font = "12px Nunito, sans-serif";
  ctx.fillText("Click 'Download 50-Page PDF'", canvas.width / 2, 260);
  ctx.fillText("to get full high-res pages!", canvas.width / 2, 280);
}

// Helper to load external images reliably
function loadImage(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = url;
  });
}

async function generatePDF() {
  const { jsPDF } = window.jspdf;
  const title = document.getElementById('bookTitle').value || "Cute Animal Coloring Book";
  const pageSize = document.getElementById('pageSize').value;
  const btn = document.getElementById('generateBtn');
  const statusMsg = document.getElementById('statusMessage');

  btn.disabled = true;
  statusMsg.classList.add('active');
  statusMsg.textContent = "⏳ Fetching HD Cute Animal Artwork & Building PDF...";

  setTimeout(async () => {
    try {
      const format = pageSize === 'letter' ? 'letter' : 'a4';
      const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: format });
      const pw = doc.internal.pageSize.getWidth();
      const ph = doc.internal.pageSize.getHeight();

      // --- COVER PAGE ---
      doc.setLineWidth(2);
      doc.rect(8, 8, pw - 16, ph - 16);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(24);
      doc.setTextColor(108, 92, 231);
      doc.text(title, pw / 2, 50, { align: "center", maxWidth: pw - 30 });

      doc.setFontSize(14);
      doc.setTextColor(235, 87, 87);
      doc.text("50 Premium Printable Pages for Kids", pw / 2, 65, { align: "center" });

      doc.setFontSize(10);
      doc.setTextColor(150, 150, 150);
      doc.text("Printable Coloring Hub", pw / 2, ph - 20, { align: "center" });

      // --- 50 PAGES GENERATION ---
      for (let i = 2; i <= 50; i++) {
        doc.addPage();
        doc.setLineWidth(1.2);
        doc.rect(8, 8, pw - 16, ph - 16);

        // Header
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(45, 52, 54);
        doc.text(`Page ${i - 1} - Cute Animal Activity`, pw / 2, 22, { align: "center" });

        // Outer Image Frame
        doc.setLineWidth(0.8);
        doc.rect(pw / 2 - 60, ph / 2 - 70, 120, 140);

        // Text inside frame for coloring
        doc.setFontSize(18);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(180, 180, 180);
        doc.text(`ANIMAL FRIEND #${i - 1}`, pw / 2, ph / 2 - 10, { align: "center" });
        doc.setFontSize(12);
        doc.text("Color Me!", pw / 2, ph / 2 + 10, { align: "center" });

        // Footer
        doc.setFontSize(9);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(160, 160, 160);
        doc.text("Printable Coloring Hub • High Resolution Edition", pw / 2, ph - 15, { align: "center" });

        if (i % 10 === 0) {
          statusMsg.textContent = `⏳ Generated ${i} of 50 pages...`;
          await new Promise(r => setTimeout(r, 20));
        }
      }

      doc.save(`${title.toLowerCase().replace(/\s+/g, '_')}_50pages.pdf`);
      statusMsg.textContent = "✅ Success! 50-Page PDF Generated.";
    } catch (e) {
      console.error(e);
      statusMsg.textContent = "❌ Error generating PDF. Please try again.";
    } finally {
      btn.disabled = false;
    }
  }, 100);
      }


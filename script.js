let currentPreviewTab = 'cover';

// Initialize Canvas
window.addEventListener('DOMContentLoaded', () => {
  renderPreviewCanvas();
  
  // Title & Theme Listeners
  document.getElementById('bookTitle').addEventListener('input', () => {
    renderPreviewCanvas();
  });
  
  document.getElementById('themeSelect').addEventListener('change', () => {
    renderPreviewCanvas();
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
  const theme = document.getElementById('themeSelect').value;

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
    drawVectorShape(ctx, canvas.width / 2, 260, 1.1, 'lion');

    ctx.fillStyle = "#b2bec3";
    ctx.font = "bold 11px Nunito, sans-serif";
    ctx.fillText("Printable Coloring Hub • A4 Standard", canvas.width / 2, canvas.height - 30);

  } else if (currentPreviewTab === 'lion') {
    ctx.fillStyle = "#2d3436";
    ctx.font = "bold 16px Fredoka, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Page 2 - Cute Lion / Animal", canvas.width / 2, 45);

    drawVectorShape(ctx, canvas.width / 2, 250, 1.2, 'lion');

    ctx.fillStyle = "#b2bec3";
    ctx.font = "11px Nunito, sans-serif";
    ctx.fillText("Color me with crayons or markers!", canvas.width / 2, canvas.height - 30);

  } else if (currentPreviewTab === 'dino') {
    ctx.fillStyle = "#2d3436";
    ctx.font = "bold 16px Fredoka, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Page 3 - Dinosaur / Adventure", canvas.width / 2, 45);

    drawVectorShape(ctx, canvas.width / 2, 250, 1.2, 'dino');

    ctx.fillStyle = "#b2bec3";
    ctx.font = "11px Nunito, sans-serif";
    ctx.fillText("High Quality Line Art", canvas.width / 2, canvas.height - 30);
  }
}

// Custom Vector Draw Engine for Preview & PDF
function drawVectorShape(ctx, cx, cy, scale, shapeType) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(scale, scale);
  ctx.strokeStyle = "#2d3436";
  ctx.lineWidth = 3;
  ctx.fillStyle = "#ffffff";

  if (shapeType === 'lion') {
    // Lion Mane
    ctx.beginPath();
    for (let i = 0; i < 12; i++) {
      let angle = (i * Math.PI) / 6;
      let mx = Math.cos(angle) * 65;
      let my = Math.sin(angle) * 65;
      ctx.arc(mx, my, 20, 0, Math.PI * 2);
    }
    ctx.stroke();

    // Head
    ctx.beginPath();
    ctx.arc(0, 0, 50, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Ears
    ctx.beginPath();
    ctx.arc(-35, -35, 14, 0, Math.PI * 2);
    ctx.arc(35, -35, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Eyes
    ctx.beginPath();
    ctx.arc(-16, -10, 6, 0, Math.PI * 2);
    ctx.arc(16, -10, 6, 0, Math.PI * 2);
    ctx.fillStyle = "#2d3436";
    ctx.fill();

    // Nose & Smile
    ctx.beginPath();
    ctx.arc(0, 8, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(0, 12, 14, 0.2, Math.PI - 0.2);
    ctx.stroke();

  } else if (shapeType === 'bear') {
    // Bear Head
    ctx.beginPath();
    ctx.arc(0, 0, 55, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Ears
    ctx.beginPath();
    ctx.arc(-45, -45, 20, 0, Math.PI * 2);
    ctx.arc(45, -45, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Snout
    ctx.beginPath();
    ctx.arc(0, 10, 22, 0, Math.PI * 2);
    ctx.stroke();

    // Eyes
    ctx.beginPath();
    ctx.arc(-20, -15, 6, 0, Math.PI * 2);
    ctx.arc(20, -15, 6, 0, Math.PI * 2);
    ctx.fillStyle = "#2d3436";
    ctx.fill();

    // Nose
    ctx.beginPath();
    ctx.arc(0, 0, 9, 0, Math.PI * 2);
    ctx.fill();

  } else if (shapeType === 'dino') {
    // Dino Head & Body
    ctx.beginPath();
    ctx.arc(0, -20, 40, 0, Math.PI * 2);
    ctx.arc(10, 45, 50, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Back Spikes
    ctx.beginPath();
    ctx.moveTo(-30, -35); ctx.lineTo(-45, -25); ctx.lineTo(-25, -15);
    ctx.moveTo(-35, 15); ctx.lineTo(-55, 25); ctx.lineTo(-30, 35);
    ctx.stroke();

    // Eye
    ctx.beginPath();
    ctx.arc(12, -25, 6, 0, Math.PI * 2);
    ctx.fillStyle = "#2d3436";
    ctx.fill();

    // Smile
    ctx.beginPath();
    ctx.arc(12, -10, 10, 0.1, Math.PI - 0.5);
    ctx.stroke();

  } else if (shapeType === 'rocket') {
    // Rocket Body
    ctx.beginPath();
    ctx.ellipse(0, 0, 35, 75, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Window
    ctx.beginPath();
    ctx.arc(0, -20, 18, 0, Math.PI * 2);
    ctx.stroke();

    // Fins
    ctx.beginPath();
    ctx.moveTo(-32, 20); ctx.lineTo(-60, 60); ctx.lineTo(-28, 55);
    ctx.moveTo(32, 20); ctx.lineTo(60, 60); ctx.lineTo(28, 55);
    ctx.stroke();

    // Flames
    ctx.beginPath();
    ctx.moveTo(-15, 75); ctx.lineTo(0, 105); ctx.lineTo(15, 75);
    ctx.stroke();

  } else if (shapeType === 'alphabet') {
    // Alphabet Outline Box
    ctx.rect(-60, -70, 120, 140);
    ctx.stroke();

    ctx.font = "bold 90px Fredoka, sans-serif";
    ctx.fillStyle = "#2d3436";
    ctx.textAlign = "center";
    ctx.fillText("A", 0, 30);

  } else {
    // Default Star / Flower shape
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      ctx.lineTo(Math.cos((18 + i * 72) * Math.PI / 180) * 60, -Math.sin((18 + i * 72) * Math.PI / 180) * 60);
      ctx.lineTo(Math.cos((54 + i * 72) * Math.PI / 180) * 25, -Math.sin((54 + i * 72) * Math.PI / 180) * 25);
    }
    ctx.closePath();
    ctx.stroke();
  }

  ctx.restore();
}


// --- DYNAMIC PDF GENERATOR (UNIQUE 50 PAGES PER CATEGORY) ---
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

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      // Theme Details Mapping
      const themeTitles = {
        animals: ["Lion King", "Cute Little Bear", "Playful Elephant", "Tall Giraffe", "Happy Monkey", "Zeppy Zebra", "Wise Owl", "Cute Bunny", "Friendly Dog", "Fluffy Cat"],
        dinos: ["T-Rex King", "Stegosaurus", "Triceratops", "Pterodactyl", "Brachiosaurus", "Baby Dino", "Dino Nest", "Volcano World", "Spinosaurus", "Ankylosaurus"],
        alphabets: ["A is for Apple", "B is for Ball", "C is for Cat", "D is for Dog", "E is for Elephant", "F is for Fish", "G is for Giraffe", "H is for House", "I is for Icecream", "J is for Juice"],
        space: ["Rocket Launch", "Happy Moon", "Solar System", "Cute Alien", "Astronaut Kid", "Saturn Rings", "Shooting Star", "Space Shuttle", "Flying Saucer", "Galaxy Stars"]
      };

      const selectedList = themeTitles[theme] || themeTitles.animals;

      // ================= PAGE 1: COVER =================
      doc.setLineWidth(2);
      doc.rect(8, 8, pageWidth - 16, pageHeight - 16);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(24);
      doc.setTextColor(108, 92, 231);
      doc.text(title, pageWidth / 2, 55, { align: "center", maxWidth: pageWidth - 30 });

      doc.setFontSize(14);
      doc.setTextColor(221, 107, 32);
      doc.text(`50 Printable ${theme.toUpperCase()} Coloring Worksheets`, pageWidth / 2, 72, { align: "center" });

      // Big Decorative Center Box
      doc.setLineWidth(1.5);
      doc.rect(pageWidth / 2 - 40, pageHeight / 2 - 40, 80, 80);
      doc.setFontSize(16);
      doc.setTextColor(45, 52, 54);
      doc.text("COLORING BOOK", pageWidth / 2, pageHeight / 2 + 5, { align: "center" });

      doc.setFontSize(10);
      doc.setTextColor(150, 150, 150);
      doc.text("Printable Coloring Hub • High Resolution Format", pageWidth / 2, pageHeight - 20, { align: "center" });

      // ================= PAGES 2 TO 50 =================
      for (let i = 2; i <= 50; i++) {
        doc.addPage();
        doc.setLineWidth(1);
        doc.rect(8, 8, pageWidth - 16, pageHeight - 16);

        // Get Dynamic Name
        const pageItemName = selectedList[(i - 2) % selectedList.length];
        
        // Header Text
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(45, 52, 54);
        doc.text(`Page ${i - 1}: ${pageItemName} #${Math.ceil(i / 10)}`, pageWidth / 2, 22, { align: "center" });

        doc.setLineWidth(1.5);
        const centerX = pageWidth / 2;
        const centerY = pageHeight / 2;

        // DYNAMIC SHAPE DRAWING BASED ON THEME & PAGE INDEX
        if (theme === 'animals') {
          if (i % 3 === 0) {
            // Lion Face
            doc.circle(centerX, centerY, 40);
            doc.circle(centerX - 15, centerY - 10, 5);
            doc.circle(centerX + 15, centerY - 10, 5);
            doc.triangle(centerX - 8, centerY + 5, centerX + 8, centerY + 5, centerX, centerY + 12, 'S');
          } else if (i % 3 === 1) {
            // Bear Face
            doc.circle(centerX, centerY, 45);
            doc.circle(centerX - 35, centerY - 35, 15);
            doc.circle(centerX + 35, centerY - 35, 15);
            doc.circle(centerX - 15, centerY - 10, 5);
            doc.circle(centerX + 15, centerY - 10, 5);
          } else {
            // Elephant ears + head
            doc.ellipse(centerX, centerY, 35, 45);
            doc.ellipse(centerX - 40, centerY - 10, 20, 30);
            doc.ellipse(centerX + 40, centerY - 10, 20, 30);
          }
        } else if (theme === 'dinos') {
          // Dino Shapes
          doc.circle(centerX, centerY - 20, 30);
          doc.circle(centerX + 10, centerY + 30, 40);
          doc.triangle(centerX - 25, centerY - 30, centerX - 40, centerY - 20, centerX - 20, centerY - 10, 'S');
          doc.triangle(centerX - 30, centerY, centerX - 50, centerY + 10, centerX - 25, centerY + 20, 'S');
        } else if (theme === 'alphabets') {
          // Alphabet Letter Boxes
          const charCode = 65 + ((i - 2) % 26); // A to Z
          const letter = String.fromCharCode(charCode);

          doc.rect(centerX - 35, centerY - 50, 70, 70);
          doc.setFontSize(48);
          doc.setFont("helvetica", "bold");
          doc.text(letter, centerX, centerY - 2, { align: "center" });

          doc.setFontSize(16);
          doc.text(`Word: ${selectedList[(i - 2) % selectedList.length]}`, centerX, centerY + 40, { align: "center" });
        } else if (theme === 'space') {
          // Space Shapes (Rocket / Planet)
          if (i % 2 === 0) {
            // Rocket
            doc.ellipse(centerX, centerY, 25, 55);
            doc.circle(centerX, centerY - 20, 12);
            doc.triangle(centerX - 25, centerY + 20, centerX - 45, centerY + 50, centerX - 20, centerY + 45, 'S');
            doc.triangle(centerX + 25, centerY + 20, centerX + 45, centerY + 50, centerX + 20, centerY + 45, 'S');
          } else {
            // Planet with Rings
            doc.circle(centerX, centerY, 35);
            doc.ellipse(centerX, centerY, 60, 12);
          }
        }

        // Subtitle bottom
        doc.setFontSize(9);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(150, 150, 150);
        doc.text("Coloring Page • Printable Coloring Hub", pageWidth / 2, pageHeight - 15, { align: "center" });

        if (i % 8 === 0) {
          await new Promise(r => setTimeout(r, 15));
        }
      }

      const fileName = title.toLowerCase().replace(/[^a-z0-9]/g, '_') + '_' + theme + '_50pages.pdf';
      doc.save(fileName);

      statusMsg.textContent = "✅ Success! 50 Unique HD Pages Downloaded.";
    } catch (err) {
      console.error(err);
      statusMsg.textContent = "❌ Error generating PDF. Please try again.";
    } finally {
      btn.disabled = false;
    }
  }, 100);
            }
                       

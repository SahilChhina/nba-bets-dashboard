fetch("top_5_bets.csv")
  .then(response => response.text())
  .then(csv => {
    const rows = csv.trim().split("\n").slice(1); // Skip header
    const tbody = document.querySelector("tbody");

    rows.forEach(row => {
      const cells = row.split(",");
      const tr = document.createElement("tr");
      cells.forEach(cell => {
        const td = document.createElement("td");
        td.textContent = decodeURIComponent(cell);
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
  })
  .catch(err => console.error("Failed to load CSV:", err));

fetch("top_5_bets.csv")
  .then((response) => response.text())
  .then((csv) => {
    const lines = csv.trim().split("\n");
    const headers = lines[0].split(",");
    const tbody = document.querySelector("#betTable tbody");
    const thead = document.querySelector("#betTable thead tr");

    headers.forEach((header) => {
      const th = document.createElement("th");
      th.textContent = header;
      thead.appendChild(th);
    });

    lines.slice(1).forEach((line) => {
      const row = document.createElement("tr");
      const values = line.split(",");

      values.forEach((value) => {
        const td = document.createElement("td");
        td.textContent = value;
        row.appendChild(td);
      });

      tbody.appendChild(row);
    });
  })
  .catch((err) => {
    console.error("Failed to load CSV:", err);
  });

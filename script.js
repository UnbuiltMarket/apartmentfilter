document.addEventListener("DOMContentLoaded", function() {
  const gradientImage = "data:image/svg+xml;utf8,<svg width='300' height='200' xmlns='http://www.w3.org/2000/svg'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop stop-color='%23a18cd1' offset='0%'/><stop stop-color='%23fbc2eb' offset='100%'/></linearGradient></defs><rect width='300' height='200' fill='url(%23g)'/></svg>";

  const flats = [
    { id: 401, name: "K401", image: gradientImage, rooms: 3, floor: 4, price: 85000, area: 72.35, terrace: 8.50 },
    { id: 402, name: "K402", image: gradientImage, rooms: 3, floor: 4, price: 98000, area: 68.20, terrace: 7.10 },
    { id: 403, name: "K403", image: gradientImage, rooms: 4, floor: 4, price: 115000, area: 81.00, terrace: 10.00 },
    { id: 404, name: "K404", image: gradientImage, rooms: 3, floor: 4, price: 91000, area: 70.00, terrace: 6.80 },
    { id: 405, name: "K405", image: gradientImage, rooms: 2, floor: 4, price: 87000, area: 60.50, terrace: 5.00 },
    { id: 406, name: "K406", image: gradientImage, rooms: 3, floor: 4, price: 99000, area: 73.10, terrace: 8.20 },
    { id: 407, name: "K407", image: gradientImage, rooms: 4, floor: 4, price: 120000, area: 85.00, terrace: 12.00 },
    { id: 408, name: "K408", image: gradientImage, rooms: 2, floor: 4, price: 86000, area: 59.80, terrace: 4.50 },
    { id: 409, name: "K409", image: gradientImage, rooms: 3, floor: 5, price: 97000, area: 71.00, terrace: 7.80 },
    { id: 410, name: "K410", image: gradientImage, rooms: 4, floor: 5, price: 118000, area: 80.00, terrace: 11.00 }
  ];

  const container = document.getElementById("flats-container");
  const filterRooms = document.getElementById("filter-rooms");
  const filterFloor = document.getElementById("filter-floor");
  const filterPrice = document.getElementById("filter-price");

  function renderFlats(data) {
    container.innerHTML = ""; // Clear the container before rendering

    if (data.length === 0) {
      container.innerHTML = "<p>No flats match your criteria.</p>";
      highlightFloorplan([]); // Ensure all squares are grey if no flats match
      return;
    }

    // Render each flat as a card
    data.forEach(flat => {
      const card = document.createElement("div");
      card.className = "flat-card";

      // Set up the card with an anchor link to the detailed page
      card.innerHTML = `
        <a href="flat.html?id=${flat.id}" style="text-decoration: none; color: inherit; position: relative; display: block;">
          <img src="${flat.image}" alt="${flat.name}">
          <h3 style="text-shadow: 0 1px 4px rgba(80,80,80,0.15);">${flat.name}</h3>
          <div style="
            position: absolute;
            right: 12px;
            bottom: 12px;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            z-index: 2;
          ">
            <span style="font-weight:600; font-size:1.35em; text-shadow: 0 1px 4px rgba(80,80,80,0.15);">${flat.area.toFixed(2)} m²</span>
            <span style="font-weight:600; font-size:1.35em; margin-top:2px; text-shadow: 0 1px 4px rgba(80,80,80,0.15);">${flat.terrace.toFixed(2)} m²</span>
          </div>
          <p style="text-shadow: 2 2px 2px rgba(80,80,80,0.15);">Rooms: ${flat.rooms}</p>
          <p style="text-shadow: 2 2px 2px rgba(80,80,80,0.15);">Floor: ${flat.floor === 0 ? 'Ground' : flat.floor}</p>
          <p style="text-shadow: 2 2px 2px rgba(80,80,80,0.15);">Price: €${flat.price.toLocaleString()}</p>
        </a>
      `;

      container.appendChild(card); // Append the card to the container
    });

    highlightFloorplan(data); // Highlight the floorplan based on visible flats
  }

  function highlightFloorplan(visibleFlats) {
    const allFlatNames = [
      "K401", "K402", "K403", "K404", "K405",
      "K406", "K407", "K408", "K409", "K410"
    ];
    const visibleNames = visibleFlats.map(f => f.name);

    allFlatNames.forEach(name => {
      const rect = document.getElementById("svg-" + name);
      if (rect) {
        if (visibleNames.includes(name)) {
          rect.setAttribute("fill", "#a18cd1"); // soft desaturated purple
          rect.setAttribute("fill-opacity", "1");
        } else {
          rect.setAttribute("fill", "#666666");
          rect.setAttribute("fill-opacity", "0.4");
        }
      }
    });
  }

  function applyFilters() {
    const selectedRooms = filterRooms.value;
    const selectedFloor = filterFloor.value;
    const maxPrice = filterPrice.value;

    let filtered = flats.filter(flat => {
      let matches = true;

      // Check if the selected rooms match
      if (selectedRooms && flat.rooms !== parseInt(selectedRooms)) {
        matches = false;
      }

      // Check if the selected floor matches
      if (selectedFloor && selectedFloor !== "" && flat.floor !== parseInt(selectedFloor)) {
        matches = false;
      }

      // Check if the price is under the max price
      if (maxPrice && flat.price > parseInt(maxPrice)) {
        matches = false;
      }

      return matches;
    });

    renderFlats(filtered); // Re-render with the filtered flats
  }

  // Ensure the elements exist before adding event listeners
  if (filterRooms && filterFloor && filterPrice) {
    filterRooms.addEventListener("change", applyFilters);
    filterFloor.addEventListener("change", applyFilters);
    filterPrice.addEventListener("input", applyFilters);
  }

  // Initial render
  renderFlats(flats);
});

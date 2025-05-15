const flats = [
  {
    id: 1,
    rooms: 2,
    floor: 0,
    price: 80000,
    image: "images/flat1.jpg",
    description: "A lovely 2-room flat on the ground floor.",
    codeExample: `<iframe src="https://example.com/embed" width="300" height="200"></iframe>`
  },
  {
    id: 2,
    rooms: 3,
    floor: 1,
    price: 95000,
    image: "images/flat2.jpg",
    description: "Bright and spacious 3-room apartment on the 1st floor.",
    codeExample: `<iframe src="https://example.com/embed2" width="300" height="200"></iframe>`
  }
];

function getFlatIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get("id"));
}

function renderFlatDetails(flat) {
  const container = document.getElementById("flat-details");
  if (!flat) {
    container.innerHTML = "<p>Flat not found.</p>";
    return;
  }

  container.innerHTML = `
    <h1>Flat ${flat.id}</h1>
    <img src="${flat.image}" alt="Flat ${flat.id}">
    <p><strong>Rooms:</strong> ${flat.rooms}</p>
    <p><strong>Floor:</strong> ${flat.floor === 0 ? 'Ground' : flat.floor}</p>
    <p><strong>Price:</strong> €${flat.price.toLocaleString()}</p>
    <p>${flat.description}</p>
    <h3>Embedded Content:</h3>
    <div class="code-block">${flat.codeExample}</div>
    <p><a href="index.html">← Back to flats</a></p>
  `;
}

const flatId = getFlatIdFromUrl();
const flat = flats.find(f => f.id === flatId);
renderFlatDetails(flat);

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => navLinks.classList.remove("open")));

document.getElementById("year").textContent = new Date().getFullYear();

const searchInput = document.getElementById("commandSearch");
const filters = document.getElementById("filters");
const cards = [...document.querySelectorAll(".command-card")];
const emptyState = document.getElementById("emptyState");
let activeFilter = "all";

function updateCards() {
  const query = searchInput.value.trim().toLowerCase();
  let shown = 0;
  cards.forEach(card => {
    const matchesFilter = activeFilter === "all" || card.dataset.category === activeFilter;
    const matchesSearch = (card.dataset.search + " " + card.innerText).toLowerCase().includes(query);
    const visible = matchesFilter && matchesSearch;
    card.hidden = !visible;
    if (visible) shown++;
  });
  emptyState.hidden = shown > 0;
}

filters.querySelectorAll("button").forEach(button => {
  button.addEventListener("click", () => {
    filters.querySelectorAll("button").forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    activeFilter = button.dataset.filter;
    updateCards();
  });
});
searchInput.addEventListener("input", updateCards);

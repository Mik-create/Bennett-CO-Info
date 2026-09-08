const updates = [
  { tag: "Town update", title: "Your voice belongs at the table.", text: "The September town board meeting is open to everyone. Add an item to the public comment agenda.", meta: "Posted today · 2 min read" },
  { tag: "Roads & safety", title: "Main Street crosswalk refresh starts Monday.", text: "Expect short daytime closures near 4th Street while crews repaint and improve visibility.", meta: "Posted yesterday · 1 min read" },
  { tag: "Community", title: "Fall cleanup day needs a few more neighbors.", text: "Bring the family, a pair of gloves, and your best Bennett spirit. Bags and tools provided.", meta: "Saturday, Sep 20 · 9:00 AM" }
];

const events = [
  { day: "14", month: "SEP", title: "Bennett Harvest Market", detail: "Bennett Community Park · 10:00 AM–2:00 PM", free: true, week: true },
  { day: "16", month: "SEP", title: "Town Board Meeting", detail: "Town Hall · 6:00–8:00 PM", free: true, week: true },
  { day: "20", month: "SEP", title: "Fall Cleanup Day", detail: "Meet at the Public Works lot · 9:00 AM–12:00 PM", free: true, week: false },
  { day: "27", month: "SEP", title: "Bennett Neighbors Potluck", detail: "Bennett Recreation Center · 5:30–7:30 PM", free: true, week: false }
];

const updateGrid = document.querySelector("#updateGrid");
const updateEmpty = document.querySelector("#updateEmpty");
const search = document.querySelector("#updateSearch");
const eventsList = document.querySelector("#eventsList");

function renderUpdates(query = "") {
  const filtered = updates.filter((item) => `${item.title} ${item.text} ${item.tag}`.toLowerCase().includes(query.toLowerCase()));
  updateGrid.innerHTML = filtered.map((item) => `
    <article class="update-card">
      <span class="card-corner">↗</span>
      <span class="card-tag">${item.tag}</span>
      <h3>${item.title}</h3>
      <p>${item.text}</p>
      <small class="card-meta">${item.meta}</small>
    </article>
  `).join("");
  updateEmpty.hidden = filtered.length > 0;
}

function renderEvents(filter = "all") {
  const visible = events.filter((event) => filter === "all" || (filter === "free" && event.free) || (filter === "this-week" && event.week));
  eventsList.innerHTML = visible.map((event) => `
    <article class="event-row">
      <time class="event-date"><strong>${event.day}</strong>${event.month}</time>
      <div class="event-info"><h3>${event.title}</h3><p>${event.detail}</p></div>
      <span class="event-badge">${event.free ? "Free" : "Registration"}</span>
    </article>
  `).join("");
}

function updateClock() {
  const now = new Date();
  const clock = document.querySelector("#liveClock");
  clock.dateTime = now.toISOString();
  clock.textContent = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }) + " · " + now.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });
}

renderUpdates();
renderEvents();
search.addEventListener("input", (event) => renderUpdates(event.target.value));
document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(".filter-tabs .active").classList.remove("active");
    button.classList.add("active");
    renderEvents(button.dataset.filter);
  });
});
document.querySelector("#menuButton").addEventListener("click", (event) => {
  const menu = document.querySelector("#mobileNav");
  const open = menu.classList.toggle("open");
  event.currentTarget.setAttribute("aria-expanded", String(open));
});
document.querySelectorAll("#mobileNav a").forEach((link) => link.addEventListener("click", () => {
  document.querySelector("#mobileNav").classList.remove("open");
  document.querySelector("#menuButton").setAttribute("aria-expanded", "false");
}));
updateClock();
setInterval(updateClock, 30000);

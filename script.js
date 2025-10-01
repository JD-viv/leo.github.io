document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("bikeForm");
  const tableBody = document.getElementById("bikeTableBody");
  const selector = document.getElementById("bikeSelector");
  const detailsBox = document.getElementById("bikeDetails");

  let bikes = JSON.parse(localStorage.getItem("bikes")) || [];

  function saveBikes() {
    localStorage.setItem("bikes", JSON.stringify(bikes));
  }

  function populateBikeSelector() {
    if (!selector) return;
    selector.innerHTML = '<option value="">-- Choose a bike --</option>';
    bikes.forEach((bike, index) => {
      const option = document.createElement("option");
      option.value = index;
      option.textContent = `${bike.name} (${bike.year})`;
      selector.appendChild(option);
    });
  }

  function renderBikeTable() {
    if (!tableBody) return;
    tableBody.innerHTML = "";
    bikes.forEach((bike) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="px-4 py-2">${bike.name}</td>
        <td class="px-4 py-2">${bike.lastService}</td>
        <td class="px-4 py-2">${bike.nextService}</td>
      `;
      tableBody.appendChild(row);
    });
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const bike = Object.fromEntries(data.entries());
      bikes.push(bike);
      saveBikes();
      alert("Bike saved!");
      form.reset();
      populateBikeSelector();
      renderBikeTable();
    });
  }

  if (selector) {
    selector.addEventListener("change", function () {
      const selectedIndex = this.value;
      if (selectedIndex === "") {
        detailsBox.classList.add("hidden");
        return;
      }
      const bike = bikes[selectedIndex];
      document.getElementById("detailName").textContent = bike.name;
      document.getElementById("detailYear").textContent = bike.year;
      document.getElementById("detailDescription").textContent = bike.description;
      document.getElementById("detailLastService").textContent = bike.lastService;
      document.getElementById("detailNextService").textContent = bike.nextService;
      detailsBox.classList.remove("hidden");
    });
  }

  populateBikeSelector();
  renderBikeTable();
});
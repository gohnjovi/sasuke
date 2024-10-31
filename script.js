document.addEventListener("DOMContentLoaded", () => {
  fetch("menu.xml")
    .then(response => response.text())
    .then(data => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(data, "application/xml");
      const menuItems = xml.getElementsByTagName("item");
      const menuSection = document.querySelector(".menu-section");

      Array.from(menuItems).forEach(item => {
        const name = item.getElementsByTagName("name")[0].textContent;
        const description = item.getElementsByTagName("description")[0].textContent;
        const price = item.getElementsByTagName("price")[0].textContent;
        const image = item.getElementsByTagName("image")[0].textContent;
        const category = item.getElementsByTagName("category")[0].textContent;

        const menuItem = document.createElement("div");
        menuItem.classList.add("menu-item");

        const menuText = `
          <div class="menu-text">
            <p>${name} - $${price}</p>
            <p class="menu-description">${description}</p>
          </div>
        `;

        const menuImage = `<img src="${image}" alt="${name}">`;

        // Arrange content based on category (e.g., image on the left or right)
        if (category === "food") {
          menuItem.innerHTML = menuText + menuImage;
        } else {
          menuItem.innerHTML = menuImage + menuText;
        }

        menuSection.appendChild(menuItem);
      });
    })
    .catch(error => console.error("Error loading menu:", error));
});

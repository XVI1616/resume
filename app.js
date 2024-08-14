document.addEventListener("DOMContentLoaded", () => {
  const countryList = document.getElementById("country-list");
  const countryListContainer = document.getElementById("countryListContainer");
  const toggleButton = document.getElementById("toggleButton");
  const searchInput = document.getElementById("searchInput");
  const countryDetails = document.getElementById("country-details");
  const countryName = document.getElementById("country-name");
  const countryCapital = document.getElementById("country-capital");
  const countryPopulation = document.getElementById("country-population");
  const countryRegion = document.getElementById("country-region");

  let countriesData = [];

  fetch("https://restcountries.com/v3.1/all")
    .then((responce) => {
      if (!responce.ok) {
        throw new Error("Failed to fetch countries");
      }
      return responce.json();
    })

    .then((data) => {
      countriesData = data;
      data.sort((a, b) => a.name.common.localeCompare(b.name.common));

      data.forEach((country) => {
        const listItem = document.createElement("li");
        listItem.className = "list-group-item";
        listItem.textContent = country.name.common;
        listItem.addEventListener("click", () => {
          displayCountryDetails(country);
        });
        countryList.appendChild(listItem);
      });
    })

    .catch((error) => {
      console.error("Error fetching countries", error);
    });

  toggleButton.addEventListener("click", () => {
    if (countryListContainer.style.display === "none") {
      countryListContainer.style.display = "block";
      toggleButton.textContent = "Hide country and show selected";
    } else {
      countryListContainer.style.display = "none";
      toggleButton.textContent = "Show all countries";
    }
  });

  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const filteredCountries = countriesData.filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm)
    );
    displayFilteredCountries(filteredCountries);
  });

  function displayCountryDetails(country) {
    countryName.textContent = country.name.common;
    countryCapital.textContent = country.capital?.[0] || "Data not available";
    countryPopulation.textContent = country.population.toLocaleString();
    countryRegion.textContent = country.region;
    const countryCode = country.cca2;

    const flagImg = document.getElementById("country-flag");
    flagImg.src = country.flags.png;
    flagImg.alt = `Flag of ${country.name.common}`;

    countryDetails.style.display = "block";
  }

  function displayFilteredCountries(countries) {
    countryList.innerHTML = "";
    countries.forEach((country) => {
      const listItem = document.createElement("li");
      listItem.className = "list-group-item";
      listItem.textContent = country.name.common;
      listItem.addEventListener("click", () => {
        displayCountryDetails(country);
      });
      countryList.appendChild(listItem);
    });
  }
});

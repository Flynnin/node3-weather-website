const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const results = document.getElementById("results");
const errorBox = document.getElementById("error");

let count = 0;

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  console.log(location);

  fetch(`/weather?address='${location}'`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        errorBox.innerHTML = data.error;
      } else {
        errorBox.innerHTML = "";

        // create a result wrapper
        let resultContainer = document.createElement("div");
        resultContainer.setAttribute("id", `${location}-${count}`);
        resultContainer.setAttribute("class", "result-container");

        // create a result container
        let resultHeader = document.createElement("div");
        resultHeader.setAttribute("class", "result-header");

        // create a result title
        let title = document.createElement("h3");
        title.setAttribute("class", "result-title");
        title.innerHTML = `${data.location}`;

        // create a result timestamp
        let timestamp = document.createElement("p");
        timestamp.setAttribute("class", "timestamp");
        timestamp.innerHTML = `${data.localTime}`;

        // create a result list of weather data
        let list = document.createElement("ul");
        list.setAttribute("class", "list");
        list.insertAdjacentHTML(
          "afterbegin",
          `
					<li><b>Forecast:</b> ${data.forecast}</li>
					<li><b>Temperature:</b> ${data.temperature} degrees</li>
          <li><b>Wind Speed:</b> ${data.windSpeed} mph</li>
          <li><b>Humidity:</b> ${data.humidity}%</li>
					`
        );

        // append elements to 'results' div on page
        resultHeader.appendChild(title);
        resultHeader.appendChild(timestamp);
        resultContainer.appendChild(resultHeader);
        resultContainer.appendChild(list);
        results.prepend(resultContainer);
        count += 1;
      }
    });
  });
  search.value = "";
});

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
        console.log(errorBox);
        console.log(data.error);
        errorBox.innerHTML = data.error;
      } else {
        errorBox.innerHTML = "";
        let div = document.createElement("ul");
        div.setAttribute("id", `${location}-${count}`);
        div.insertAdjacentHTML(
          "afterbegin",
          `
					<li><b>Location:</b> ${data.location}</li>
					<li><b>Forecast:</b> ${data.forecast}</li>
					<li><b>Temperature (F):</b> ${data.temperature} degrees</li>
					`
        );
        console.log(div);
        count += 1;
        results.prepend(div);
      }
    });
  });
  search.value = "";
});

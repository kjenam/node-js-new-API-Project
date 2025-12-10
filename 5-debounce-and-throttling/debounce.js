function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

function fetchSuggestions(query) {
  const items = [
    "apple",
    "application",
    "apply",
    "apology",
    "api",
    "apex legends",
    "banana",
    "band",
    "bank",
    "basket",
    "cat",
    "car",
    "cartoon",
    "carbon",
  ];

  return new Promise((resolve) => {
    setTimeout(() => {
      const results = items.filter((item) =>
        item.toLowerCase().startsWith(query.toLowerCase())
      );
      resolve(results);
    }, 300);
  });
}

const input = document.getElementById("searchBox");
const suggestionBox = document.getElementById("suggestions");

let cntr = 0
async function handleSearch(query) {
  cntr++
  console.log("handleSeachCalled", cntr)
  if (!query) {
    suggestionBox.innerHTML = "";
    return;
  }

  const results = await fetchSuggestions(query);

  suggestionBox.innerHTML = results
    .map((r) => `<li>${r}</li>`)
    

  document.querySelectorAll("#suggestions li").forEach((li) => {
    li.addEventListener("click", () => {
      input.value = li.textContent;
      suggestionBox.innerHTML = "";
    });
  });
}

const debouncedSearch = debounce(handleSearch, 400);

input.addEventListener("input", (e) => {
  debouncedSearch(e.target.value);
});

const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

const searchStates = async (searchText) => {
  const res = await fetch('../data/ua.json');
  const cities = await res.json();

  let matches = cities.filter((city) => {
    const regex = new RegExp(`^${searchText}`, 'gi');
    return city.city.match(regex) || city.admin_name.match(regex);
  });

  if (searchText.length === 0) {
    matches = [];
    matchList.innerHTML = '';
  }

  outputHtml(matches);
};

const outputHtml = (matches) => {
  if (matches.length > 0) {
    const html = matches
      .map(
        (match) => `
      <div class="card card-body mb-1">
        <h4>${match.city}
        <br>${match.admin_name}
        <br>Population: <span class="text-primary"> ${match.population}</span>
        </h4>
        <small>Lat: ${match.lat} / Long: ${match.lng}</small>
      </div>
    `
      )
      .join('');

    matchList.innerHTML = html;
  }
};

search.addEventListener('input', () => searchStates(search.value));

window.onload = () => {

  // where we keep the state of the app
  this.state = {
    fetchResults: [],
    page: 0,
  };

  // the iSearch function recieves an input
  // search fetches and displays the results
  iSearch = async (event) => {

    // Initialize input search
    this.search = '';

    // // Enter key was pressed
    if (event.code === 'Enter') {
      search = event.target.value;

      // get input value from the DOM if the function was called by pressing the button
      if(!event) {
        search = document.getElementById('iSearch').value;
      }
      search = search.split(' ').join('+');
      this.state.fetchResults = await fetchItunes(search);

      // display the results
      const results = document.getElementById('searchResults');

      // results.removeChild(results.childNodes[0]);
      results.appendChild(makeList(this.state.fetchResults));
    }
  };

  fetchItunes = async (search) => {
    let res = await fetch(`https://itunes.apple.com/search?term=${search}&limit=10`).then(res => res.json());
    return res.results;
  };

  makeList = (array) => {
    let searchResults = document.getElementById('searchResults');
    let resultsDetails = document.getElementById('resultsDetail');
    searchResults.style.display = 'flex';
    resultsDetails.style.display = 'none';

    if (array.length === 0) {
      return document.getElementById('searchResults').innerHTML = '<p>No search results found</p>';
    }
    // clear search results
    document.getElementById('searchResults').innerHTML = '';

    let list = document.createElement('ul');
    list.style.cssText = 'list-style:none;';

    for (let i = 0; i < array.length; i++) {
      let item = document.createElement('li');
      item.innerHTML =
      `
      <div class='flexRow searchContent'>
        <a onclick='displayDetail(event)'>
          <img id='${i}' src='${array[i].artworkUrl60}' />
        </a>
        <div class='searchInfo'>
          <div>
            <span>${array[i].artistName} - </span>
            <span>${array[i].collectionName}</span>
          </div>
          <div>
            <a ref='${array[i].collectionViewUrl}'>iTunes Collection</a>
          </div>
        </div>
      </div>
      `;
      item.className = 'searchItem';
      list.appendChild(item);
    }

    return list;
  };

  displayDetail = (event) => {
    const id = event.target.id;

    let searchResults = document.getElementById('searchResults');
    let resultsDetails = document.getElementById('resultsDetail');
    searchResults.style.display = 'none';
    resultsDetails.style.display = 'flex';

    document.getElementById('resultsDetail').innerHTML = '';

    let details = document.createElement('div');

    // hide search results
    document.getElementById('searchResults').style.display = 'none';

    details.innerHTML =
    `
    <div class='flexRow'>
      <img src='${this.state.fetchResults[id].artworkUrl100}' />
      <div class='searchInfo'>
        <h1>${this.state.fetchResults[id].artistName}</h1>
        <h2>${this.state.fetchResults[id].collectionName}</h2>
      </div>
      <div>
        <audio controls>
          <source src='http://a80.phobos.apple.com/us/r30/Music/dc/45/31/mzm.kteqltlu.aac.p.m4a' type='audio/mpeg'>
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
    `;

    resultsDetail.appendChild(details);
    return resultsDetail;
  };

};

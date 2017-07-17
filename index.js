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
    // console.log(array);
    let list = document.createElement('ul');
    list.style.cssText = 'list-style:none;';
    for (let i = 0; i < array.length; i++) {
      let item = document.createElement('li');
      item.innerHTML =
      `
        <div class='flexRow searchContent'>
          <a onclick='displayDetail(event)'>
            <img id='${i}' src='${array[i].artworkUrl100}' />
          </a>
          <div class='searchInfo'>
            <h1>${array[i].artistName}</h1>
            <h2>${array[i].collectionName}</h2>
          </div>
        </div>
      `;
      item.className = 'searchItem';
      list.appendChild(item);
    }

    return list;
  };

  displayDetail = (event) => {
    document.getElementById('searchResults').style.display = 'none';
    document.getElementById('resultsDetail').style.display = 'flex';
  };

};

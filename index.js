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
    if (event && event.code === 'Enter') {
      search = event.target.value;
    }

    // get input value from the DOM if the function was called by pressing the button
    if(!event) {
      search = document.getElementById('iSearch').value;
    }

    if (search !== undefined) {
      search = search.split(' ').join('+');
      this.state.fetchResults = await fetchItunes(search);

      document.getElementById('searchResults').appendChild(makeList(this.state.fetchResults));
    }
  };

  fetchItunes = async (search) => {
    let res = await fetch(`https://itunes.apple.com/search?term=${search}`).then(res => res.json());
    return res.results;
  };

  makeList = (array) => {
    console.log(array);
    let list = document.createElement('ul');
    for (let i = 0; i < array.length; i++) {
      let item = document.createElement('li');
      item.appendChild(document.createTextNode(array[i].collectionName));
      list.appendChild(item);
    }

    return list;
  };

};

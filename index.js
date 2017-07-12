search = (event) => {
  let input = event.split(' ').replace(' ','+');

};

fetchItunes = (search) => fetch(`https://itunes.apple.com/search?term=michael+jackson`).then(res => console.log(res.json()));
// return fetch(`https://itunes.apple.com/search?term=${search}`);

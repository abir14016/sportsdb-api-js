const loadPlayers = () =>{
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayPlayers(data.player))
    searchField.value = '';
}
const displayPlayers = players =>{
    const playerContainer = document.getElementById('player-container');
    for(const player of players){
        console.log(player);
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card py-4">
            <div class="player-image">
                <img class="w-50" src="${player.strThumb}" alt="">
            </div>
            <h2>${player.strPlayer}</h2>
            <h6>country:${player.strNationality}</h6>
            <h6>Height:${player.strHeight}</h6>
            <h6>Weight:${player.strWeight}</h6>
            <h6>Sports:${player.strSport}</h6>
            <h6>Position:${player.strPosition}</h6>
            <h6>Team:${player.strTeam}</h6>
            <h6>Jursey No:${player.strNumber}</h6>
            <div class="buttons">
                <button class="btn btn-danger">Delete</button>
                <button class="btn btn-success">Details</button>
            </div>
        </div>
    `;
    playerContainer.appendChild(div);
    }
}
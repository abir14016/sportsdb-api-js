//load all players
const loadPlayers = () =>{
    document.getElementById('player-container').innerHTML = '';
    document.getElementById('spinner').style.display = 'inline';
    document.getElementById('details-container').innerHTML = '';
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    if(searchText == ''){
        document.getElementById('spinner').style.display = 'inline';
        document.getElementById('no-result').style.display = 'block';
        return;
    }
    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayPlayers(data.player))
    document.getElementById('spinner').style.display = 'none';
    searchField.value = '';
}
//display player with small details in the left side
const displayPlayers = players =>{
    // console.log(players)
    if(players == null){
        document.getElementById('spinner').style.display = 'inline';
        document.getElementById('no-result').style.display = 'block';
    }
    else{
        document.getElementById('spinner').style.display = 'none';
        document.getElementById('no-result').style.display = 'none';
        const playerContainer = document.getElementById('player-container');
    for(const player of players){
        // console.log(player);
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card p-4">
            <div class="player-image">
                <img class="w-50" src="${player.strThumb}" alt="">
            </div>
            <h2>${player.strPlayer}</h2>
            <h6>country:${player.strNationality}</h6>
            <div class="buttons">
                <button onclick="removePlayer('${player.idPlayer}')" class="btn btn-danger">Delete</button>
                <button onclick="playerDetails('${player.idPlayer}')" class="btn btn-success">Details</button>
            </div>
        </div>
    `;
    playerContainer.appendChild(div);
    }
    }
}
const playerDetails = playerID =>{
    // console.log(playerID)
    const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${playerID}`;
    fetch(url)
    .then(res => res.json())
    .then(data => setDetails(data.players[0]))
}
//display player with all details in the right side
const setDetails = info =>{
    // console.log(info);
    // if(info.strGender == 'Male'){
    //     document.getElementById('male-image').style.display = 'inline';
    //     // document.getElementById('male').style.display = 'block';
    //     // document.getElementById('female').style.display = 'none';
    //     document.getElementById('female-image').style.display = 'none';
    // }
    // else{
    //     document.getElementById('male-image').style.display = 'none';
    //     // document.getElementById('male').style.display = 'none';
    //     // document.getElementById('female').style.display = 'block';
    //     document.getElementById('female-image').style.display = 'inline';
    // }
    const detailsContainer = document.getElementById('details-container');
    const div = document.createElement('div');
    div.classList.add('spacing');
    detailsContainer.innerHTML = '';
    div.innerHTML = `
        <h2>Player Details</h2>
        <img class="w-25" src="${info.strFanart1}" alt="">
        <img class="w-25" src="${info.strFanart2}" alt="">
        <img class="w-25" src="${info.strFanart3}" alt="">
        <h2>Name:${info.strPlayer}</h2>
        <h6>Team:${info.strTeam}</h6>
        <h6>Jursey No:${info.strNumber}</h6>
        <h6>Height:${info.strHeight}</h6>
        <h6>Weight:${info.strWeight}</h6>
        <h6>Sports:${info.strSport}</h6>
        <h6>Position:${info.strPosition}</h6>
        <p>Description: ${info.strDescriptionEN}</p>
    `;
    detailsContainer.appendChild(div);
}




{/* <h6>Height:${player.strHeight}</h6>
            <h6>Weight:${player.strWeight}</h6>
            <h6>Sports:${player.strSport}</h6>
            <h6>Position:${player.strPosition}</h6> */}
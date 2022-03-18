const searchPhones = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    document.getElementById('error-message').style.display = 'none';

    if (searchText == '') {
        const searchErr = document.getElementById('search-err');
        searchErr.innerText = 'No phones found';
        searchErr.style.color = 'red';
    }
    else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.data))
        const searchErr = document.getElementById('search-err');
        searchErr.textContent = '';
    }
}

const displayError = error => {
    document.getElementById('error-message').style.display = 'block';
}

const displaySearchResult = phones => {
    const showPhnFiled = document.getElementById('show-phns');
    showPhnFiled.textContent = '';

    if (phones.length == 0) {
        // show no result found
        const searchErr = document.getElementById('search-err');
        searchErr.innerText = `no results found for phones.length`;
    }

    for (const phn of phones) {
        // console.log(phn);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div onclick ="loadDescription('${phn.slug}')" class="card h-100">
                <img src="${phn.image}" class="card-img-top img-fluid" width="300px alt="..." width="300px">
                <div class="card-body">
                <p> ${phn.slug} </p>
                    <h5 class="card-title">Name: ${phn.phone_name}</h5>
                    <p class="card-text">Brand: ${phn.brand}</p>
                    
                    <p class="card-text">Brifing: ${phn.phone_name.slice(0, 3)}</p>
                </div>
            </div>
        `;
        showPhnFiled.appendChild(div);
    }
}
const loadDescription = phnSlug => {
    const url = `https://openapi.programming-hero.com/api/phone/${phnSlug}`;
    console.log(url);
    // console.log(phnSlug);
    fetch(url)
        .then(res => res.json())
        .then(data => displayDescription(data.data))
}

// loadDescription();

const displayDescription = phnDes => {
    console.log(phnDes);
    const phnDetails = document.getElementById('phn-details');
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
            <div>
                <img src="${phnDes.image}" class="card-img-top img-fluid" alt="..." width="">
                <div class="card-body">
                    <h5 class="card-title">Name: ${phnDes.name}</h5>
                    <p class="card-text">Brand: ${phnDes.brand}</p>
                    <p class="card-text">DisplaySize: ${phnDes.mainFeatures.displaySize}</p>
                    <p class="card-text">Memory: ${phnDes.mainFeatures.memory}</p>
                    <p class="card-text">Sensor: ${phnDes.mainFeatures.sensors}</p> </br>
                </div>
            </div>
    `;
    phnDetails.appendChild(div);

}
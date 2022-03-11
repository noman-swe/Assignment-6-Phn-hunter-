const searchPhones = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.data))
}

const displaySearchResult = phones => {
    const showPhnFiled = document.getElementById('show-phns');
    for (const phn of phones) {
        // console.log(phn);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div onclick ="loadDescription(${phn.slug})" class="card h-100">
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
    // console.log(url);
    console.log(phnSlug);
    fetch(url)
    .then(res=> res.json())
    .then(data => console.log(data.status))
} 

loadDescription();
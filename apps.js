
const loadData = () => {
    const inputField = document.getElementById('input-field');
    const inputText = inputField.value;
    inputField.value = '';

    const url = `https://openlibrary.org/search.json?q=${inputText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayBooks(data));
}

const displayBooks = (data) => {
    // console.log(data.docs)
    const foundResult = document.getElementById('found-result');
    foundResult.textContent = '';
    const p = document.createElement('p');
    p.innerText = `Result Found ${data.numFound}`;
    foundResult.append(p);

    const displayBookDetail = document.getElementById('display-details');
    const docs = (data.docs);
    docs.forEach(doc => {
        console.log(data.docs);
        displayBookDetail.textContent = '';
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <img src="..." class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">This is a longer card with supporting  text below as a natural lead-in to
                    additional content. This content is a little bit longer.</  p>
            </div>
        `;
        displayBookDetail.appendChild(div);
    });

}

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
    displayBookDetail.textContent = '';
    const docs = (data.docs);
    // console.log(docs);
    docs.forEach(doc => {
        console.log(doc);

        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <img src="https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Books-Name: ${doc.title}</h5>
                
                <p class="card-text">Author Name: <small>${doc.author_name}</small> <br>
                Publisher Name: ${doc.publisher}<br>
                First Published Year: ${doc.first_publish_year}</p>
            </div>
        `;
        displayBookDetail.appendChild(div);
    });



}
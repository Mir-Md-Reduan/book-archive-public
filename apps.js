
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
    const errorCheck = document.getElementById('error-check');
    // Displaying Result Found 
    if (data.numFound === 0) {
        const p = document.createElement('p');
        p.classList.add('text-center');
        p.innerText = 'Please Type a Valid Book Name';
        errorCheck.append(p);
    }
    else {
        errorCheck.textContent = '';
        const foundResult = document.getElementById('found-result');
        foundResult.textContent = '';
        const p = document.createElement('p');
        p.classList.add('text-center');
        p.innerText = `Result Found ${data.numFound}`;
        foundResult.append(p);
        // Displaying Books Result Details
        const displayBookDetail = document.getElementById('display-details');
        displayBookDetail.textContent = '';
        const docs = (data.docs);
        // console.log(docs);
        docs?.forEach(doc => {
            console.log(doc.author_name);
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
                <img height="400px" src="https://covers.openlibrary.org/b/id/${doc.cover_i ? doc.cover_i : ''}-L.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Book Name: ${doc.title ? doc.title.slice(0, 25) : ''}</h5>
                    <p class="card-text"><b>Author Name:</b> <small>${doc.author_name ? doc.author_name : ''}</small> <br>
                    <b>Publisher Name:</b> ${doc.publisher ? doc.publisher : ''}<br>
                    <b>First Published Year:</b> ${doc.first_publish_year ? doc.first_publish_year : ''}</p>
                </div>
            `;
            displayBookDetail.appendChild(div);
        });
    }




}
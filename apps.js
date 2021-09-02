//Onclick button Input field data receive function 
const loadData = () => {
    // taking input value;
    const inputField = document.getElementById('input-field');
    const inputText = inputField.value;
    // Clear input field
    inputField.value = '';
    // fetching api
    const url = `https://openlibrary.org/search.json?q=${inputText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayBooks(data));
}
// display books detail, error check and result found function 
const displayBooks = (data) => {
    // Checking Error and Displaying Error Message
    const foundResult = document.getElementById('found-result');
    const errorCheck = document.getElementById('error-check');
    const displayBookDetail = document.getElementById('display-details');
    if (data.numFound === 0) {
        // Clear Book Details, Found Result and error message
        displayBookDetail.textContent = '';
        foundResult.textContent = '';
        errorCheck.textContent = '';
        const p = document.createElement('p');
        p.classList.add('text-center');
        p.innerText = 'Please Type a Valid Book Name';
        errorCheck.append(p);
    }
    else {
        // Clear error message
        errorCheck.textContent = '';
        // displaying book search result
        foundResult.textContent = '';
        const p = document.createElement('p');
        p.classList.add('text-center');
        p.innerText = `Result Found ${data.numFound}`;
        foundResult.append(p);
        // Clear Books details 
        displayBookDetail.textContent = '';
        const docs = (data.docs);
        // checking array with forEach chaining optional ? mark 
        docs?.forEach(doc => {
            // Displaying Books Result Details
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
                <img height="400px" src="https://covers.openlibrary.org/b/id/${doc.cover_i ? doc.cover_i : ''}-L.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Book Name: ${doc.title ? doc.title : ''}</h5>
                    <p class="card-text">
                        <b>Author Name:</b> <small>${doc.author_name?.[0]}</small > <br>
                        <b>Publisher Name:</b> ${doc.publisher?.[0]}<br>
                        <b>First Published Year:</b> ${doc.first_publish_year ? doc.first_publish_year : ''}
                    </p>
                </div>
            `;
            displayBookDetail.appendChild(div);
        });
    }
}
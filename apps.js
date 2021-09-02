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
    // Collecting id from HTML file
    const foundResult = document.getElementById('found-result');
    const errorCheck = document.getElementById('error-check');
    const displayBookDetail = document.getElementById('display-details');
    // error checking and displaying error message
    if (data.numFound === 0) {
        // Clear Book Details, Found Result and error message
        displayBookDetail.textContent = '';
        foundResult.textContent = '';
        errorCheck.textContent = '';
        // create paragraph element
        const p = document.createElement('p');
        // add a class in paragraph tag
        p.classList.add('text-center');
        // add paragraph element
        p.innerText = 'Please Type a Valid Book Name';
        // append paragraph to error-check id
        errorCheck.append(p);
    }
    else {
        // Clear error message, found result and display book detail.s
        errorCheck.textContent = '';
        foundResult.textContent = '';
        displayBookDetail.textContent = '';
        // displaying book search found result

        // create paragraph element
        const p = document.createElement('p');
        // add a class in paragraph tag 
        p.classList.add('text-center');
        // add paragraph element
        p.innerText = `Result Found ${data.numFound}`;
        // append paragraph to found-result id
        foundResult.append(p);
        const docs = (data.docs);
        // checking array with forEach chaining optional ? mark 
        docs?.forEach(doc => {
            // dynamic images data 
            const srcUrl = `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`;
            const srcValue = (doc.cover_i ? srcUrl : 'images/default.jpg');
            // Displaying Books Result Details

            // create div element
            const div = document.createElement('div');
            // adding col class to div
            div.classList.add('col');
            // set div innter HTML with dynamic string
            div.innerHTML = `
                <img height="400px" src ="${srcValue}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Book Name: ${doc.title ? doc.title : ''}</h5>
                    <p class="card-text">
                        <b>Author Name:</b> <small>${doc.author_name?.[0]}</small > <br>
                        <b>Publisher Name:</b> ${doc.publisher?.[0]}<br>
                        <b>First Published Year:</b> ${doc.first_publish_year ? doc.first_publish_year : ''}
                    </p>
                </div>
            `;
            // append div to display-details id
            displayBookDetail.appendChild(div);
        });
    }
}
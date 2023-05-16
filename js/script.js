// write a function to fetch users from the api using plain javascript
const numberOfUsers = 55;
const resultsPerPage = 10;
const maxContactsPages = 20;

// URL for the API
const url = "https://randomuser.me/api/?results=" + numberOfUsers;
let listOfUsers = [];

function formatDate(dateString) {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: '2-digit'
    });

    return formattedDate; 
}

window.addEventListener('load', function() {
    // Fetch users
    fetch(url)
    .then(response => response.json())
    .then(data => {

        listOfUsers = data.results;

        // Load the first 10 users
        loadContacts(0, 9);

        // Set the total number of users
        document.querySelector(".page-header h3").innerHTML = 'Total: ' + data.results.length;

        if(data.results.length > resultsPerPage) {
            const paginationContainer = document.querySelector(".pagination");
            const numPages = Math.ceil(data.results.length / resultsPerPage);
            
            // create a <ul> element to contain the pagination links
            const paginationList = document.createElement("ul");

            // create a <li> element for each page and append it to the <ul> element
            for (let i = 1; i <= numPages; i++) {
                // limit the number of pages to 20
                if(i > maxContactsPages) break;

                const listItem = document.createElement("li");
                const link = document.createElement("a");
                link.addEventListener("click", function() {
                    loadContacts((this.textContent - 1) * resultsPerPage, this.textContent * resultsPerPage - 1);
                });
                link.textContent = i; // set the text of the link to the page number
                listItem.appendChild(link);
                paginationList.appendChild(listItem);
            }

            // append the <ul> element to the pagination container
            paginationContainer.appendChild(paginationList);
        }

    })
    .catch(error => console.error(error));
});

function loadContacts(start, end) {
    let domContent = "";

    // iterate over the users and create a div for each user
    for(let i = start; i <= end; i++) {
        if(listOfUsers[i] === undefined) break;
        let user = listOfUsers[i];
        domContent += `<li class="contact-item cf">
                <div class="contact-details">
                    <img class="avatar" src="${user.picture.thumbnail}">
                    <h3>${user.name.title +" "+ user.name.first +" "+ user.name.last}</h3>
                    <span class="email">${user.email}</span>
                </div>
                <div class="joined-details">
                    <span class="date">Joined ${formatDate(user.registered.date)}</span>
            </div>
            </li>`;
    }

    // append the div to the container
    document.querySelector(".contact-list").innerHTML = domContent;
}




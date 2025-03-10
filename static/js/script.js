document.addEventListener('DOMContentLoaded', function() {
    const userContainer = document.getElementById('user-container');
    const fetchButton = document.getElementById('fetch-user');

    fetchButton.addEventListener('click', function(e) {
        e.preventDefault();
        fetch('https://randomuser.me/api/')
            .then(function(resp) {
                return resp.json();
            })
            .then(function(data) {
                let user = data.results[0];
                console.log("User Data:", user);

                let userCard = `
                    <div class="user-card">
                        <img src="${user.picture.large}" alt="user photo">
                        <h2>${user.name.title} ${user.name.first} ${user.name.last}</h2>
                        <p><strong>Gender:</strong> ${user.gender}</p>
                        <p><strong>Address:</strong> ${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.country}</p>
                        <p><strong>Email:</strong> ${user.email}</p>
                        <p><strong>Phone:</strong> ${user.phone}</p>
                    </div>
                `;

                userContainer.innerHTML = userCard;
            })
            .catch(function(err) {
                console.log("Errore nella richiesta:", err);
                userContainer.textContent = "Si è verificato un errore. Riprova più tardi.";
            });
    });
});
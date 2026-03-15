// Global array to store our data
let subscriptions = JSON.parse(localStorage.getItem('subs')) || [];

// --- READ (R) ---
// Function to display the data on the screen
function readSubscriptions() {
    const listContainer = document.getElementById('subscriptionList');
    listContainer.innerHTML = ''; // Clear existing list

    subscriptions.forEach((sub, index) => {
        listContainer.innerHTML += `
            <div class="card">
                <div class="card-info">
                    <strong>${sub.name}</strong>
                    <span>₹${sub.price} / month</span>
                </div>
                <div class="card-actions">
                    <button class="btn-edit" onclick="updateSubscription(${index})">Edit</button>
                    <button class="btn-delete" onclick="deleteSubscription(${index})">Drop</button>
                </div>
            </div>
        `;
    });
}


// --- CREATE (C) ---
// Function to add new data
function createSubscription() {
    const nameInput = document.getElementById('subName').value;
    const priceInput = document.getElementById('subPrice').value;

    if (nameInput === '' || priceInput === '') {
        alert("Please fill in both fields!");
        return;
    }

    const newSub = {
        name: nameInput,
        price: priceInput
    };

    subscriptions.push(newSub); // Add to array
    saveData(); // Save to local storage
    readSubscriptions(); // Update the display

    // Clear inputs
    document.getElementById('subName').value = '';
    document.getElementById('subPrice').value = '';
}

// --- UPDATE (U) ---
// Function to modify existing data
function updateSubscription(index) {
    const currentSub = subscriptions[index];
    
    // Using simple prompts for the tutorial
    const newName = prompt("Update Name:", currentSub.name);
    const newPrice = prompt("Update Price:", currentSub.price);

    if (newName !== null && newPrice !== null) {
        subscriptions[index].name = newName;
        subscriptions[index].price = newPrice;
        saveData();
        readSubscriptions();
    }
}

// --- DELETE (D) ---
// Function to remove data
function deleteSubscription(index) {
    if (confirm("Are you sure you want to delete this?")) {
        subscriptions.splice(index, 1); // Remove from array
        saveData();
        readSubscriptions();
    }
}

// Helper function to save data to the browser
function saveData() {
    localStorage.setItem('subs', JSON.stringify(subscriptions));
}

// Initial load to display any saved data
readSubscriptions();


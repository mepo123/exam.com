document.addEventListener("DOMContentLoaded", () => {
    const censusForm = document.getElementById("census-form");
    const familyMembersDiv = document.getElementById("family-members");
    const addMemberBtn = document.getElementById("add-member-btn");

    // Create a new family member input block
    function createFamilyMember() {
        const memberDiv = document.createElement("div");
        memberDiv.classList.add("family-member");
        memberDiv.innerHTML = `
            <label>Last Name:</label>
            <input type="text" class="lastName" required>
            <label>First Name:</label>
            <input type="text" class="firstName" required>
            <label>Middle Name:</label>
            <input type="text" class="middleName" required>
            <label>Birth Date:</label>
            <input type="date" class="birthDate" required>
            <label>Age:</label>
            <input type="number" class="age" required>
            <label>Gender:</label>
            <select class="gender" required>
                <option value="">-- Select Gender --</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
            <label>Civil Status:</label>
            <select class="civilStatus" required>
                <option value="">-- Select Civil Status --</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Widowed">Widowed</option>
                <option value="Separated">Separated</option>
            </select>
            <button type="button" class="remove-member-btn">Remove</button>
        `;
        return memberDiv;
    }

    // Handle form submission to store profile in localStorage
    function handleSubmit(event) {
        event.preventDefault();

        // Create the family profile object
        const profile = {
            purok: document.getElementById("purok").value,
            waterSource: document.getElementById("water-source").value,
            toiletType: document.getElementById("toilet-type").value,
            garbageDisposal: document.getElementById("garbage-disposal").value,
            ethnicity: document.getElementById("ethnicity").value,
            religion: document.getElementById("religion").value,
            members: Array.from(document.querySelectorAll(".family-member")).map(memberDiv => ({
                lastName: memberDiv.querySelector(".lastName").value,
                firstName: memberDiv.querySelector(".firstName").value,
                middleName: memberDiv.querySelector(".middleName").value,
                birthDate: memberDiv.querySelector(".birthDate").value,
                age: memberDiv.querySelector(".age").value,
                gender: memberDiv.querySelector(".gender").value,
                civilStatus: memberDiv.querySelector(".civilStatus").value
            }))
        };

        // Retrieve existing profiles or initialize an empty array
        const storedProfiles = JSON.parse(localStorage.getItem('familyProfiles')) || [];
        
        // Add the new profile
        storedProfiles.push(profile);
        
        // Save updated profiles back to localStorage
        localStorage.setItem('familyProfiles', JSON.stringify(storedProfiles));
        
        // Notify the user and redirect back
        alert("Family Profile Submitted!");
        window.location.href = "test%202.html"; // Change to the actual page path
    }

    // Handle adding a new family member
    function handleAddMember() {
        const memberDiv = createFamilyMember();
        familyMembersDiv.appendChild(memberDiv);

        // Add remove functionality for the newly added member
        memberDiv.querySelector(".remove-member-btn").addEventListener("click", function() {
            memberDiv.remove();
        });
    }

    // Event listeners for form submission and adding family members
    censusForm.addEventListener("submit", handleSubmit);
    addMemberBtn.addEventListener("click", handleAddMember);
});

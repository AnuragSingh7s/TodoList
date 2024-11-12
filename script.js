const form = document.querySelector(".form");
const ul = document.querySelector("ul");
const input = document.querySelector("#input");

const allItems = localStorage.getItem("allItems") ? JSON.parse(localStorage.getItem("allItems")) : [];

function createList() {
    ul.innerHTML = "";
    allItems.forEach((value, index) => {
        const li = document.createElement("li");
        li.textContent = value.item;

        const deleteBtn = document.createElement("i");
        deleteBtn.classList.add("bi", "bi-trash", "deleteBtn");

        deleteBtn.addEventListener("click", function () {
            if (allItems[index].alreadyBaught) {
                allItems.splice(index, 1);
                localStorage.setItem("allItems", JSON.stringify(allItems));
                createList();
            }
        });

        const baugthBtn = document.createElement("i");
        baugthBtn.classList.add("bi", "bi-check-circle-fill", "baugthBtn");

        baugthBtn.addEventListener("click", function () {
            allItems[index].alreadyBaught = !allItems[index].alreadyBaught;
            localStorage.setItem("allItems", JSON.stringify(allItems));
            createList();
        });

        if (allItems[index].alreadyBaught) {
            li.classList.add("completed");
        }

        li.appendChild(deleteBtn);
        li.appendChild(baugthBtn);
        ul.appendChild(li);
    });
}

form.addEventListener("submit", function (e) {
    e.preventDefault();

    allItems.push({
        item: input.value,
        alreadyBaught: false,
    });

    createList();

    input.value = "";

    localStorage.setItem("allItems", JSON.stringify(allItems));
});

createList();
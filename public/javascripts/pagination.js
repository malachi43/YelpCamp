

const page = document.querySelectorAll(".pagination .page-item")
console.log(page)

page.forEach(li => li.addEventListener('click', function (e) {
    e.target.classList.add('fs-5')
}))

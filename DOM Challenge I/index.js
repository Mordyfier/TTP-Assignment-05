// 1) Select the section with an id of container without using querySelector.

document.getElementById("container");

// 2) Select the section with an id of container using querySelector.

document.querySelector("section");

// 3) Select all of the list items with a class of "second".

document.getElementsByClassName("second");

// 4) Select a list item with a class of third, but only the list item inside of the ol tag.

document.querySelector('ol > li.third')

// 5) Give the section with an id of container the text "Hello!".

document.getElementById('container').textContent = "Hello!"

// 6) Add the class main to the div with a class of footer.

const footer = document.querySelector('div.footer')
footer.classList.add('main')

// 7) Remove the class main on the div with a class of footer.

footer.classList.remove('main')

// 8) Create a new li element.

const newLi = document.createElement('li')

// 9) Give the li the text "four".

newLi.textContent = 'four'

// 10) Append the li to the ul element.

document.querySelector('ul').appendChild(newLi)

// 12) Loop over all of the lis inside the ol tag and give them a background color of "green".

const a = document.querySelectorAll('ul > li');
for (let i = 0; i < a.length; i++) {
    a[i].setAttribute("style", 'background-color: green')
}

// 13) Remove the div with a class of footer.

document.querySelector('div.footer').remove();

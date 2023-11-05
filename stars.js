const stars = document.querySelectorAll(".star");
const starContainer = document.getElementById("stars-container");
const ratting = document.getElementById('ratting');

// reset the previous value which was clicked, this way we can reduce or increase the rattings given previously
const reset = () => {
    stars.forEach(star => star.classList.remove('isFilled', 'fill-red'));
}

const renderStars = (value, showRatting = true) => {
    if(showRatting) ratting.innerText = `(${value}/5)`;
    reset();
    for(let i=1; i <= Number(value); i++) {
        const elm = starContainer.querySelector(`:nth-child(${i})`);

        if(value <=2) {
            elm.classList.add("fill-red");
        } else {
            elm.classList.add("isFilled");
        }
    }
};

const getValueAsNumber = ele => Number(ele.getAttribute('data-value'));

// this listerner executes when dom is ready
window.addEventListener('load', () => {
    const val = localStorage.getItem('ratting');

    if(!val) return;
    renderStars(val);
})

stars.forEach(star => {
    star.addEventListener('click', (e) => {
    reset();
    const value = getValueAsNumber(star);

    // set value to local storage so that we can read it onload
    localStorage.setItem('ratting', value);
    renderStars(value);
    })
});

// the below logic, when user hovers or moves cursor on the stars it will but values gets locked only on the click
stars.forEach(star => {
    star.addEventListener('mouseenter', (e) => {
    reset();
    const value = getValueAsNumber(star);
    renderStars(value, false);
    })
});




const allStars = document.querySelectorAll('.star');
let currentRating = document.querySelector('.currentRating');

allStars.forEach( (star, i) =>{
    star.onclick = function(){
        let current_star_level = i + 1;
        currentRating.innerText = `${current_star_level}  out of 5 stars`;

        allStars.forEach((star, j) => {
            if(current_star_level >= j+1){
                star.innerHTML = '&#9733';
            }else{
                star.innerHTML = '&#9734';
            }         
        })
    }
})
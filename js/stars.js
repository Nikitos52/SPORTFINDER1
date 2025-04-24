document.addEventListener('DOMContentLoaded', function() {
    function handleRating(starsContainer, starClass, valueAttr) {
        const stars = starsContainer.querySelectorAll(`.${starClass}`);
        let lastClickedValue = null;
        let isAllActive = false;
  
        stars.forEach(star => {
            star.addEventListener('click', function() {
                const currentValue = parseInt(this.getAttribute(valueAttr));
                const allStarsActiveUpToCurrent = [...stars].every(s => {
                    const starValue = parseInt(s.getAttribute(valueAttr));
                    return starValue > currentValue || s.classList.contains('active');
                });
  
             
                if (lastClickedValue === currentValue && allStarsActiveUpToCurrent) {
                    stars.forEach(s => s.classList.remove('active'));
                    isAllActive = false;
                } 
                else {
                    stars.forEach(s => {
                        const starValue = parseInt(s.getAttribute(valueAttr));
                        if (starValue <= currentValue) {
                            s.classList.add('active');
                        } else {
                            s.classList.remove('active');
                        }
                    });
                    isAllActive = allStarsActiveUpToCurrent;
                }
  
                lastClickedValue = currentValue;
                
                const ratingValue = starsContainer.closest('.score')?.querySelector('.figure');
                if (ratingValue) {
                    const activeStars = starsContainer.querySelectorAll(`.${starClass}.active`).length;
                    ratingValue.textContent = activeStars > 0 ? activeStars.toFixed(1) : '0.0';
                }
            });
        });
    }
  
    const mainRating = document.querySelector('.rating');
    if (mainRating) {
        handleRating(mainRating, 'star', 'data-value');
    }
  
    const commentRating = document.querySelector('.stars-comment');
    if (commentRating) {
        handleRating(commentRating, 'star1', 'data-value1');
    }
  });
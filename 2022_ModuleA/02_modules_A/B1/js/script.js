const boxes = document.querySelectorAll('.box');
const sum = document.querySelector('.sum');

boxes.forEach(box=>{
    box.addEventListener('click',()=>{
        box.classList.toggle('active');

        let total = 0;
        boxes.forEach(b =>{
            if(b.classList.contains('active')){
                total += parseInt(b.dataset.value)
            }
        });

        sum.textContent = 'Sum: '+ total;
    });
});
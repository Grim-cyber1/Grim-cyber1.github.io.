document.addEventListener('DOMContentLoaded', function () {
    // Анимация появления
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(20px)';
        setTimeout(() => {
            section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            section.style.opacity = 1;
            section.style.transform = 'translateY(0)';
        }, 50);
    });

    // Анимация на кнопки
    document.querySelectorAll('.button').forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#2980b9';
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease, background-color 0.3s ease';
        });
        button.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '#3498db';
            this.style.transform = 'scale(1)';
        });
    });

    // Отзывы
    const reviewForm = document.getElementById('reviewForm');
    const reviewList = document.getElementById('reviewList');

    function displayReviews() {
        reviewList.innerHTML = ''; // Очищаем список перед отрисовкой

        let reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
        reviews.forEach(review => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<strong>${review.name}</strong><span>(${review.rating}/5): </span><span>${review.comment}</span>`;
            reviewList.appendChild(listItem);
        });
    }

    if(reviewForm){
       displayReviews();
       reviewForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Отменяем стандартное действие

            const name = document.getElementById('name').value;
            const rating = document.getElementById('rating').value;
            const comment = document.getElementById('comment').value;

            const newReview = { name, rating, comment };
            let reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
            reviews.push(newReview);
            localStorage.setItem('reviews', JSON.stringify(reviews));
            displayReviews();

            reviewForm.reset();
        });
    }

    function updateModuleStatus(moduleId) {
        const statusSpan = document.getElementById(`module${moduleId}-status`);
        if (!statusSpan) {
            return; // Если не нашли, выходим
        }
        const completedModules = JSON.parse(localStorage.getItem('completedModules') || '[]');
        if (completedModules.includes(moduleId)) {
            statusSpan.classList.add('completed');
        } else {
            statusSpan.classList.remove('completed');
        }
    }

    function checkAllModulesStatus(){
      document.querySelectorAll('[data-module]').forEach(el => {
          const moduleId = el.getAttribute('data-module');
          updateModuleStatus(moduleId);
        });
     }
    checkAllModulesStatus();

    // Кнопка "Отметить как пройденный"
    const markCompleteButton = document.querySelector('.mark-complete');
    if(markCompleteButton){
       markCompleteButton.addEventListener('click', function() {
           const moduleId = document.querySelector('h2[data-module]').getAttribute('data-module');
           let completedModules = JSON.parse(localStorage.getItem('completedModules') || '[]');
           if(!completedModules.includes(moduleId)){
              completedModules.push(moduleId);
               localStorage.setItem('completedModules', JSON.stringify(completedModules));
                updateModuleStatus(moduleId);
                checkAllModulesStatus();
            }
        });
    }

   // Кнопка "Назад"
    const backButton = document.querySelector('.back-button');
    if(backButton){
        backButton.addEventListener('click', function() {
            window.history.back();
        });
    }
    // Кнопки "Отправить решение"
    const submitButtons = document.querySelectorAll('.submit-button');
    submitButtons.forEach(button => {
        button.addEventListener('click', function() {
            const taskNumber = this.getAttribute('data-task');
            const solutionTextarea = document.getElementById(`task${taskNumber}-solution`);
            const feedbackDiv = document.getElementById(`feedback${taskNumber}`);
            const userSolution = solutionTextarea.value;
            feedbackDiv.textContent = `Решение отправлено:\n${userSolution}`
            //здесь можно добавить проверку решения
        });
    });
    // FAQ разворачивание
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('h3');
        question.addEventListener('click', function(){
            item.classList.toggle('active');
        });
    });
     // Переключатель тем
        const themeToggle = document.getElementById('theme-toggle');
       const body = document.body;

       // Получаем сохраненную тему из localStorage
         const savedTheme = localStorage.getItem('theme');
         if (savedTheme === 'dark') {
           body.classList.add('dark-theme');
           themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
         }

        themeToggle.addEventListener('click', function() {
            body.classList.toggle('dark-theme');
             if (body.classList.contains('dark-theme')) {
                 themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                 localStorage.setItem('theme', 'dark');
             } else {
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem('theme', 'light');
            }
        });
});
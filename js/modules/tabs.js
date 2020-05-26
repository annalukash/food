function tabs() {
    const tabContent = document.querySelectorAll('.tabcontent');
    const tabItems = document.querySelectorAll('.tabheader__item');

    function showTab(content, index) {
        content.forEach((tab) => {
            tab.style.display = 'none';
        });
        content[index].style.display = 'block';
    }

    tabItems.forEach((item, index) => {
        if (item.classList.contains('tabheader__item_active')) {
            showTab(tabContent, index);
        }
        
        item.addEventListener('click', () => {
            if (item.classList.contains('tabheader__item_active')) {
                showTab(tabContent, index);
            } else {
                tabItems.forEach((i) => {
                     i.classList.remove('tabheader__item_active');
                });
               
               item.classList.add('tabheader__item_active');

               showTab(tabContent, index);
           }
        });
    });
}

module.exports = tabs;
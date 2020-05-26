function tabs(tabsSelector, tabsContentSelector, activeClass) {
    const tabContent = document.querySelectorAll(tabsContentSelector);
    const tabItems = document.querySelectorAll(tabsSelector);

    function showTab(content, index) {
        content.forEach((tab) => {
            tab.style.display = 'none';
        });
        content[index].style.display = 'block';
    }

    tabItems.forEach((item, index) => {
        if (item.classList.contains(activeClass)) {
            showTab(tabContent, index);
        }
        
        item.addEventListener('click', () => {
            if (item.classList.contains(activeClass)) {
                showTab(tabContent, index);
            } else {
                tabItems.forEach((i) => {
                     i.classList.remove(activeClass);
                });
               
               item.classList.add(activeClass);

               showTab(tabContent, index);
           }
        });
    });
}

export default tabs;
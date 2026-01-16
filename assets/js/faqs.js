/* FAQs Page Functionality */

document.addEventListener('DOMContentLoaded', function () {
    const accordionItems = document.querySelectorAll('.accordion-item');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const faqSections = document.querySelectorAll('.faq-category-section');
    const searchInput = document.getElementById('faq-search');

    // Accordion Toggle
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all items
            accordionItems.forEach(i => i.classList.remove('active'));

            // Toggle clicked item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Category Filtering
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Show/Hide sections
            faqSections.forEach(section => {
                if (category === 'all') {
                    section.classList.remove('hidden');
                } else if (section.id === category) {
                    section.classList.remove('hidden');
                } else {
                    section.classList.add('hidden');
                }
            });
        });
    });

    // Simple Search Functionality
    searchInput.addEventListener('input', function (e) {
        const term = e.target.value.toLowerCase();

        accordionItems.forEach(item => {
            const question = item.querySelector('.accordion-header span').textContent.toLowerCase();
            const answer = item.querySelector('.accordion-content p').textContent.toLowerCase();

            if (question.includes(term) || answer.includes(term)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });

        // Hide empty categories if searching
        faqSections.forEach(section => {
            const visibleItems = section.querySelectorAll('.accordion-item[style="display: block;"]').length;
            const items = section.querySelectorAll('.accordion-item');

            // Special case for initial load/empty search (all block by default)
            if (term === "") {
                section.classList.remove('hidden');
                items.forEach(i => i.style.display = 'block');
                // Reset to active filter category
                const activeCategory = document.querySelector('.filter-btn.active').getAttribute('data-category');
                if (activeCategory !== 'all' && section.id !== activeCategory) {
                    section.classList.add('hidden');
                }
            } else {
                if (visibleItems === 0) {
                    section.classList.add('hidden');
                } else {
                    section.classList.remove('hidden');
                }
            }
        });
    });
});

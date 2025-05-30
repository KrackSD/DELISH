document.addEventListener('DOMContentLoaded', function() {
    // بيانات البيتزا
    const pizzaMenu = [
        {
            id: 1,
            name: "بيتزا مارغريتا",
            description: "صلصة طماطم، جبنة موزاريلا، ريحان طازج",
            price: 25,
            category: "classic",
            image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        {
            id: 2,
            name: "بيتزا بيبروني",
            description: "صلصة طماطم، جبنة موزاريلا، بيبروني",
            price: 30,
            category: "classic",
            image: "https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        {
            id: 3,
            name: "بيتزا الخضار",
            description: "صلصة طماطم، جبنة موزاريلا، فلفل، بصل، زيتون، فطر",
            price: 28,
            category: "vegetarian",
            image: "https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        {
            id: 4,
            name: "بيتزا اللحم المميزة",
            description: "صلصة طماطم، جبنة موزاريلا، لحم بقري، بيبروني، سجق",
            price: 35,
            category: "special",
            image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        {
            id: 5,
            name: "بيتزا الدجاج بالباربيكيو",
            description: "صلصة باربيكيو، جبنة موزاريلا، دجاج، بصل أحمر",
            price: 32,
            category: "special",
            image: "https://images.unsplash.com/photo-1620374645498-af6bd681a0bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        {
            id: 6,
            name: "بيتزا الجبن الأربعة",
            description: "صلصة طماطم، جبنة موزاريلا، جبنة شيدر، جبنة فيتا، جبنة بارميزان",
            price: 30,
            category: "vegetarian",
            image: "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        }
    ];

    // عرض البيتزا في القائمة
    const menuItemsContainer = document.querySelector('.menu-items');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const pizzaSelect = document.getElementById('pizza');

    function displayMenuItems(category = 'all') {
        menuItemsContainer.innerHTML = '';
        
        const filteredPizzas = category === 'all' 
            ? pizzaMenu 
            : pizzaMenu.filter(pizza => pizza.category === category);
        
        filteredPizzas.forEach(pizza => {
            const menuItem = document.createElement('div');
            menuItem.className = 'menu-item';
            menuItem.dataset.category = pizza.category;
            
            menuItem.innerHTML = `
                <img src="${pizza.image}" alt="${pizza.name}">
                <div class="menu-item-content">
                    <h3>${pizza.name}</h3>
                    <p>${pizza.description}</p>
                    <div class="price">${pizza.price} ريال</div>
                    <span class="category">${getCategoryName(pizza.category)}</span>
                </div>
            `;
            
            menuItemsContainer.appendChild(menuItem);
        });
    }

    // عرض خيارات البيتزا في نموذج الطلب
    function displayPizzaOptions() {
        pizzaMenu.forEach(pizza => {
            const option = document.createElement('option');
            option.value = pizza.id;
            option.textContent = `${pizza.name} - ${pizza.price} ريال`;
            pizzaSelect.appendChild(option);
        });
    }

    // الحصول على اسم الفئة بطريقة مقروءة
    function getCategoryName(category) {
        const categories = {
            'classic': 'كلاسيكية',
            'special': 'مميزة',
            'vegetarian': 'نباتية'
        };
        return categories[category];
    }

    // تصفية القائمة حسب الفئة
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const category = button.dataset.category;
            displayMenuItems(category);
        });
    });

    // معالجة نموذج الطلب
    const orderForm = document.getElementById('order-form');
    const modal = document.getElementById('order-modal');
    const orderDetails = document.getElementById('order-details');
    const closeModal = document.querySelector('.close');

    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        const pizzaId = document.getElementById('pizza').value;
        const size = document.getElementById('size').value;
        
        const selectedPizza = pizzaMenu.find(pizza => pizza.id == pizzaId);
        
        let sizePrice = 0;
        let sizeName = '';
        
        switch(size) {
            case 'small':
                sizePrice = 11;
                sizeName = 'صغيرة';
                break;
            case 'medium':
                sizePrice = 17;
                sizeName = 'متوسطة';
                break;
            case 'large':
                sizePrice = 22;
                sizeName = 'كبيرة';
                break;
        }
        
        const totalPrice = selectedPizza.price + sizePrice;
        
        orderDetails.innerHTML = `
            <p><strong>الاسم:</strong> ${name}</p>
            <p><strong>الهاتف:</strong> ${phone}</p>
            <p><strong>العنوان:</strong> ${address}</p>
            <p><strong>البيتزا:</strong> ${selectedPizza.name} (${sizeName})</p>
            <p><strong>السعر الإجمالي:</strong> ${totalPrice} ريال</p>
        `;
        
        modal.style.display = 'block';
        orderForm.reset();
    });

    // إغلاق المودال
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // التمرير السلس للروابط
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });

    // تهيئة الصفحة
    displayMenuItems();
    displayPizzaOptions();
});
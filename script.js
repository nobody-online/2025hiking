// Simple script for potential future enhancements like:
// - Smooth scrolling for internal links (if nav is added)
// - More complex parallax effects
// - Form validation feedback
// - Interactive map features

document.addEventListener('DOMContentLoaded', () => {
    console.log("健走活動網頁已載入！");

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent the default jump
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Use the browser's built-in smooth scrolling
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start' // Optional: Adjust scroll alignment
                });

                // Optional: Update URL hash without jumping (if desired)
                // history.pushState(null, null, targetId);
            }
        });
    });

    // Counter Animation Logic
    const countElement = document.getElementById('registered-count');
    const progressBar = document.getElementById('progress-bar');

    const animateCounter = (element, target) => {
        let current = 0;
        const increment = target / 100; // Adjust step size for smoother/faster animation
        const duration = 1500; // ms
        const stepTime = duration / 100;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                clearInterval(timer);
                element.textContent = Math.floor(target); // Ensure exact target value at the end
            } else {
                element.textContent = Math.floor(current);
            }
        }, stepTime);

        // Animate progress bar along with the counter
        if (progressBar) {
            // Example: Progress bar reflects percentage towards a goal (e.g., 250)
            const maxGoal = 40;
            const percentage = (target / maxGoal) * 100;
            // Set timeout to sync roughly with counter animation start
            setTimeout(() => {
                progressBar.style.width = `${Math.min(percentage, 100)}%`;
            }, 50); // Small delay
        }

    };

    // getParticipants
    async function fetchResponsesCount() {
        const response = await fetch('https://script.google.com/macros/s/AKfycbxXe7tsEtvwzk7pzVmeERP2wcU7upnOyP9MYNnkHpWToQXL4-WFv3h2Nx-7PG3AgoD2/exec');
        const count = await response.text();
        document.getElementById('registered-count').setAttribute('data-target', count);
        console.log(count);
        animateCounter(document.getElementById('registered-count'), parseInt(count, 10));
    }
    window.onload = fetchResponsesCount;

    // Floating Nav Visibility Logic
    const floatingNav = document.getElementById('floatingNav');

    const handleScroll = () => {
        const scrollPosition = window.scrollY;
        if (scrollPosition > 100) {
            floatingNav.classList.add('visible');
        } else {
            floatingNav.classList.remove('visible');
        }
    };

    // Initial check in case the page loads scrolled down
    if (floatingNav) {
        handleScroll();
        window.addEventListener('scroll', handleScroll);
    }

    // Intersection Observer for Counter Animation
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const targetValue = parseInt(element.getAttribute('data-target'), 10);
                animateCounter(element, targetValue);
                observer.unobserve(element); // Stop observing once animation starts
            }
        });
    };

    const observerOptions = {
        root: null, // viewport
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    if (countElement) {
        observer.observe(countElement);
    }

    // Example: Simple parallax effect adjustment (optional, CSS handles basic effect)
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        parallaxLayers.forEach(layer => {
            // Example: Move background slightly slower than scroll
            // Adjust the factor (e.g., 0.5) for different speeds
            // Note: This conflicts with background-attachment: fixed.
            // You'd need to change the CSS if using this JS approach.
            // layer.style.backgroundPositionY = `calc(50% + ${scrollTop * 0.3}px)`;
        });
    });

    // Form submission simulation (replace with actual submission logic if needed)
    // const form = document.querySelector('#register form');
    // if (form) {
    //     form.addEventListener('submit', (e) => {
    //         e.preventDefault(); // Prevent actual form submission for this example
    //         // alert('感謝您的報名！(此為範例，未實際送出)');
    //         submitForm();
    //         form.reset(); // Clear the form
    //     });
    // }

    const submitBtn = document.getElementById('submit');
    submitBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent actual form submission for this example
        submitForm();
    });

    // function submitForm() {
    //     // 獲取表單數據
    //     const name = document.getElementById('name').value;
    //     const unit = document.getElementById('unit').value;
    //     const people = document.getElementById('people').value;
    //     const kids = document.getElementById('kids').value;
    //     const food = document.getElementById('food').value;

    //     // 檢查數據是否填寫
    //     if (!name || !unit || !people || !kids || !food) {
    //         showMessage('請填寫所有必填欄位', false);
    //         return;
    //     }

    //     // 創建 URL 編碼的表單數據字符串
    //     const formData = new URLSearchParams();
    //     formData.append('name', name);
    //     formData.append('unit', unit);
    //     formData.append('people', people);
    //     formData.append('kids', kids);
    //     formData.append('food', food);

    //     // 顯示載入訊息
    //     showMessage('提交中，請稍候...', true);

    //     // 發送 AJAX 請求
    //     fetch('https://script.google.com/macros/s/AKfycbz5uZwBcwURJ8rulq1-JmpAc8Iqgt82YN09dtbvtp4lnY-ERRwvUBT2DLnavZuzeqJa/exec', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/x-www-form-urlencoded',
    //         },
    //         body: formData.toString()
    //     })
    //         .then(response => response.text())
    //         .then(data => {
    //             showMessage('報名成功！' + data, true);
    //             document.getElementById('registrationForm').reset();
    //             fetchResponsesCount();
    //             scrollToStats(); //滾動到指定 section

    //         })
    //         .catch(error => {
    //             showMessage('報名失敗！請稍後再試。錯誤: ' + error, false);
    //             console.error('Error:', error);
    //         });
    // }


    function scrollToStats() {
        const section = document.getElementById('stats');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }


    // function showMessage(message, isSuccess) {
    //     const messageDiv = document.getElementById('messageBox');
    //     if (messageDiv) {
    //         messageDiv.textContent = message;
    //         messageDiv.style.display = 'block';

    //         if (isSuccess) {
    //             messageDiv.style.backgroundColor = '#d4edda';
    //             messageDiv.style.color = '#155724';
    //             messageDiv.style.border = '1px solid #c3e6cb';
    //         } else {
    //             messageDiv.style.backgroundColor = '#f8d7da';
    //             messageDiv.style.color = '#721c24';
    //             messageDiv.style.border = '1px solid #f5c6cb';
    //         }

    //         // 5秒後隱藏訊息
    //         setTimeout(() => {
    //             messageDiv.style.display = 'none';
    //         }, 5000);
    //     } else {
    //         // 作為後備方案，如果找不到消息框，則使用警告框
    //         alert(message);
    //     }
    // }

    function submitForm() {
        // 獲取表單數據
        const name = document.getElementById('name').value;
        const unit = document.getElementById('unit').value;
        const people = document.getElementById('people').value;
        const kids = document.getElementById('kids').value;
        const food = document.getElementById('food').value;

        // 檢查數據是否填寫
        if (!name || !unit || !people || !kids || !food) {
            showMessage('請填寫所有必填欄位', false);
            return;
        }

        // 創建 URL 編碼的表單數據字符串
        const formData = new URLSearchParams();
        formData.append('name', name);
        formData.append('unit', unit);
        formData.append('people', people);
        formData.append('kids', kids);
        formData.append('food', food);

        // 顯示載入訊息
        swal.fire({
            title: '提交中，請稍候...',
            text: '正在提交您的報名表',
            icon: 'info',
            buttons: false,
            closeOnClickOutside: false,
            closeOnEsc: false,
        });
        swal.showLoading();

        // 發送 AJAX 請求
        fetch('https://script.google.com/macros/s/AKfycbz5uZwBcwURJ8rulq1-JmpAc8Iqgt82YN09dtbvtp4lnY-ERRwvUBT2DLnavZuzeqJa/exec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData.toString()
        })
            .then(response => response.text())
            .then(data => {
                // Swal.fire({
                //     title: '報名成功！',
                //     text: data,
                //     icon: 'success',
                //     confirmButtonText: '確定',
                //     returnFocus: false
                // });
                // document.getElementById('registrationForm').reset();
                // fetchResponsesCount();
                // scrollToStats(); // ←這會在彈窗出現時就執行

                Swal.fire({
                    title: '報名成功！',
                    text: data,
                    icon: 'success',
                    confirmButtonText: '確定',
                    returnFocus: false
                }).then(() => {
                    document.getElementById('registrationForm').reset();
                    fetchResponsesCount();
                    setTimeout(() => {
                        scrollToStats();
                    }, 300); // 延遲滾動位置，確保 SweetAlert 的重設動作結束
                });
            })
            .catch(error => {
                swal.fire({
                    title: '報名失敗！',
                    text: '請稍後再試。錯誤: ' + error,
                    icon: 'error',
                    button: '確定',
                });
                console.error('Error:', error);
            });
    }

    function showMessage(message, isSuccess) {
        if (isSuccess) {
            swal.fire({
                title: '成功',
                text: message,
                icon: 'success',
                button: '確定',
            });
        } else {
            swal.fire({
                title: '錯誤',
                text: message,
                icon: 'error',
                button: '確定',
            });
        }
    }

});

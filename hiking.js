/**
 * Good hiking - Interactive Features and Form Validation
 * Author: Antigravity AI
 * Date: 2026-05-26
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. Mobile Menu Toggle (手機版選單控制)
  // ==========================================
  const hamburger = document.getElementById('hamburger-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link, .nav-btn');
  const logo = document.getElementById('logo');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
    });

    // 點擊連結與按鈕後自動關閉選單
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
      });
    });
  }

  // 點擊 Logo 關閉手機選單並解鎖滾動
  if (logo) {
    logo.addEventListener('click', () => {
      if (hamburger && navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
      }
    });
  }

  // ==========================================
  // 2. Sticky Header on Scroll (滾動時導覽列變色)
  // ==========================================
  const header = document.getElementById('header');
  
  const handleScroll = () => {
    if (!header) return;
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  // 初始化檢查一次，防止重新整理網頁時沒有觸發
  handleScroll();

  // ==========================================
  // 3. Smooth Anchor Scrolling (平滑滾動)
  // ==========================================
  const allLinks = document.querySelectorAll('a[href^="#"]');
  allLinks.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        
        // 取得 header 的高度，避免滾動後標題被 Navbar 遮擋
        const headerHeight = header ? header.offsetHeight : 0;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ==========================================
  // 4. Gear Tabs Interaction (裝備分頁切換)
  // ==========================================
  const tabButtons = document.querySelectorAll('.gear-tab-btn');
  const tabContents = document.querySelectorAll('.gear-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.getAttribute('data-tab');

      // 切換 Button 狀態
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // 切換 Content 顯示
      tabContents.forEach(content => {
        if (content.id === targetTab) {
          content.classList.add('active');
        } else {
          content.classList.remove('active');
        }
      });
    });
  });

  // ==========================================
  // 5. Booking Form Validation & Modal Popup (表單驗證與成功彈窗)
  // ==========================================
  const bookingForm = document.getElementById('hiking-reg-form');
  const successModal = document.getElementById('success-modal');
  const closeModalBtn = document.getElementById('close-modal');

  // 手機號碼格式驗證 (台灣手機號碼格式為 09xx-xxx-xxx，總共 10 碼)
  const validatePhone = (phone) => {
    const phoneRegex = /^09\d{8}$/;
    return phoneRegex.test(phone.replace(/[-\s]/g, ''));
  };

  // 信箱格式驗證
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault(); // 阻止表單預設提交行為
      
      let isValid = true;
      
      // 獲取表單元素
      const nameInput = document.getElementById('name');
      const phoneInput = document.getElementById('phone');
      const emailInput = document.getElementById('email');
      const itinerarySelect = document.getElementById('itinerary-select');
      const dateInput = document.getElementById('date');

      // 1. 驗證姓名
      if (!nameInput.value.trim()) {
        showError(nameInput, '請輸入您的姓名');
        isValid = false;
      } else {
        clearError(nameInput);
      }

      // 2. 驗證電話
      if (!phoneInput.value.trim()) {
        showError(phoneInput, '請輸入您的聯絡電話');
        isValid = false;
      } else if (!validatePhone(phoneInput.value)) {
        showError(phoneInput, '請輸入有效的手機號碼 (例如: 0912345678)');
        isValid = false;
      } else {
        clearError(phoneInput);
      }

      // 3. 驗證信箱
      if (!emailInput.value.trim()) {
        showError(emailInput, '請輸入您的電子信箱');
        isValid = false;
      } else if (!validateEmail(emailInput.value)) {
        showError(emailInput, '請輸入有效的電子信箱格式');
        isValid = false;
      } else {
        clearError(emailInput);
      }

      // 4. 驗證行程
      if (!itinerarySelect.value) {
        showError(itinerarySelect, '請選擇您想參加的百岳行程');
        isValid = false;
      } else {
        clearError(itinerarySelect);
      }

      // 5. 驗證日期
      if (!dateInput.value) {
        showError(dateInput, '請選擇預計出發日期');
        isValid = false;
      } else {
        const selectedDate = new Date(dateInput.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // 僅比較日期，重設時間

        if (selectedDate < today) {
          showError(dateInput, '出發日期不可早於今天');
          isValid = false;
        } else {
          clearError(dateInput);
        }
      }

      // 所有欄位驗證通過，顯示成功彈窗
      if (isValid) {
        // 顯示成功 Modal
        successModal.classList.add('active');
        
        // 重設表單
        bookingForm.reset();
      }
    });
  }

  // 關閉成功彈窗
  if (closeModalBtn && successModal) {
    closeModalBtn.addEventListener('click', () => {
      successModal.classList.remove('active');
    });

    // 點擊 Modal 背景也可關閉
    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) {
        successModal.classList.remove('active');
      }
    });
  }

  // ==========================================
  // Helper Functions: Form Errors (表單錯誤提示輔助)
  // ==========================================
  const showError = (inputElement, message) => {
    const parent = inputElement.parentElement;
    inputElement.style.borderColor = '#ff4d4d';
    inputElement.style.boxShadow = '0 0 10px rgba(255, 77, 77, 0.2)';
    
    // 檢查是否已存在錯誤提示
    let errorText = parent.querySelector('.error-message');
    if (!errorText) {
      errorText = document.createElement('span');
      errorText.className = 'error-message';
      errorText.style.color = '#ff4d4d';
      errorText.style.fontSize = '0.8rem';
      errorText.style.marginTop = '4px';
      errorText.style.fontFamily = 'var(--font-body)';
      parent.appendChild(errorText);
    }
    errorText.innerText = message;
  };

  const clearError = (inputElement) => {
    const parent = inputElement.parentElement;
    inputElement.style.borderColor = '';
    inputElement.style.boxShadow = '';
    
    const errorText = parent.querySelector('.error-message');
    if (errorText) {
      parent.removeChild(errorText);
    }
  };

  // 設定出發日期的最小選取日期為明天，提供更好的使用者體驗
  const datePicker = document.getElementById('date');
  if (datePicker) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    datePicker.min = `${yyyy}-${mm}-${dd}`;
  }

});

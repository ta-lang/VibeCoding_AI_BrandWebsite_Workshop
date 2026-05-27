/**
 * Talang Chiu's Portal - Interactive Terminal & White Tech Controller
 * Author: Antigravity AI
 * Date: 2026-05-26
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. Mobile Menu Toggle (手機選單)
  // ==========================================
  const hamburger = document.getElementById('hamburger-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const logo = document.getElementById('logo');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
      });
    });
  }

  // Logo Click Scroll to Top & Close Mobile Menu
  if (logo) {
    logo.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      if (hamburger && navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
      }
    });
  }

  // ==========================================
  // 2. Sticky Header (滾動導覽列變色)
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
  handleScroll();

  // ==========================================
  // 3. Smooth Scrolling (平滑滾動)
  // ==========================================
  const allLinks = document.querySelectorAll('a[href^="#"]');
  allLinks.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
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
  // 4. Contact Form Validation & Redirection (表單驗證與背景傳送)
  // ==========================================
  const submitBtn = document.getElementById('execute-submit-btn');
  const contactForm = document.getElementById('google-contact-form');
  const successModal = document.getElementById('success-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  if (submitBtn && contactForm) {
    submitBtn.addEventListener('click', () => {
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const service = document.getElementById('service-type').value;
      const desc = document.getElementById('project-desc').value.trim();

      // 欄位驗證
      if (!name || !email || !service || !desc) {
        highlightEmptyFields(name, email, service, desc);
        alert('請填寫所有必要欄位。');
        return;
      }

      // 信箱格式驗證
      if (!validateEmail(email)) {
        document.getElementById('email').style.borderColor = '#ff3333';
        alert('請輸入有效的電子信箱格式。');
        return;
      }

      // 清除所有紅框
      clearHighlights();

      // 在背景默默提交 Google 表單
      contactForm.submit();

      // 彈出符合亮白科技風的自定義 Modal 提示視窗
      if (successModal) {
        successModal.classList.add('active');
        document.body.classList.add('no-scroll');
      }

      // 重設表單
      contactForm.reset();
    });
  }

  // 關閉 Modal 邏輯
  if (modalCloseBtn && successModal) {
    modalCloseBtn.addEventListener('click', () => {
      successModal.classList.remove('active');
      document.body.classList.remove('no-scroll');
    });
  }

  // ==========================================
  // Helper Functions (輔助函式)
  // ==========================================
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const highlightEmptyFields = (name, email, service, desc) => {
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const serviceField = document.getElementById('service-type');
    const descField = document.getElementById('project-desc');

    nameField.style.borderColor = name ? '' : '#ff3333';
    emailField.style.borderColor = email ? '' : '#ff3333';
    serviceField.style.borderColor = service ? '' : '#ff3333';
    descField.style.borderColor = desc ? '' : '#ff3333';
  };

  const clearHighlights = () => {
    document.querySelectorAll('.terminal-field').forEach(field => {
      field.style.borderColor = '';
    });
  };

});

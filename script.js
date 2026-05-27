/**
 * 邱大郎 (Talang Chiu) 個人品牌網站 - 互動控制邏輯
 * 技術堆疊：原生 JavaScript & Lucide Icons
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. 初始化 Lucide 圖標
    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

    // 2. 監聽導航列滾動事件
    const navbar = document.getElementById("main-navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 20) {
            navbar.classList.add("is-scrolled");
        } else {
            navbar.classList.remove("is-scrolled");
        }
    });

    // 3. 處理表單提交防呆與無感重置
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            // 設定標記表示表單已被提交，供 iframe.onload 識別
            window.submitCount = 1;
            
            // 由於使用隱藏 iframe，我們在表單提交後立即非同步清空輸入欄位
            setTimeout(() => {
                contactForm.reset();
            }, 100);
        });
    }

    // 4. 監聽鍵盤 Escape 鍵以關閉 Modal 彈窗
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeModal();
        }
    });
});

// 5. 服務項目手風琴切換 (Accordion Toggle)
function toggleService(cardId) {
    const targetCard = document.getElementById(cardId);
    if (!targetCard) return;

    const isExpanded = targetCard.classList.contains("is-expanded");
    
    // 關閉目前所有已展開的服務卡片（手風琴互斥效果）
    const allCards = document.querySelectorAll(".service-card");
    allCards.forEach(card => {
        card.classList.remove("is-expanded");
        const btn = card.querySelector(".service-toggle-btn");
        if (btn) {
            btn.innerHTML = `展開細節 <i data-lucide="chevron-down" style="width: 1rem; height: 1rem;"></i>`;
        }
    });

    // 切換目標卡片狀態
    if (!isExpanded) {
        targetCard.classList.add("is-expanded");
        const btn = targetCard.querySelector(".service-toggle-btn");
        if (btn) {
            btn.innerHTML = `收合細節 <i data-lucide="chevron-down" style="width: 1rem; height: 1rem;"></i>`;
        }
    }

    // 重新渲染切換後卡片內部的 Lucide 圖標
    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }
}

// 6. 成功彈窗 Modal 控制
function showSuccessModal() {
    // 檢查 window.submitCount，防止 iframe 初始載入時誤觸彈窗
    if (window.submitCount > 0) {
        const modal = document.getElementById("success-modal");
        if (modal) {
            modal.classList.add("is-active");
        }
        // 重置提交計數器
        window.submitCount = 0;
    }
}

function closeModal() {
    const modal = document.getElementById("success-modal");
    if (modal) {
        modal.classList.remove("is-active");
    }
}

# AI 品牌網站工作坊 (VibeCoding AI Brand Website Workshop)

> **專案定位**：資深系統架構師與技術培訓顧問 **邱大郎 (Talang Chiu)** 的個人品牌傳送門，結合多個高轉化率 AI 前端展示模組的綜合實作專案。

---

## 專案導覽與核心檔案

為方便瀏覽，以下列出本專案的核心檔案及其 Clickable 連結：

- **官方個人傳送門**：[portal.html](file:///c:/Users/talan/Projects/VibeCoding_AI_BrandWebsite_Workshop/portal.html)  
  包含關於我、核心技術專長、顧問服務預約（對接 Google Forms背景提交）、精選自託管 Gitea 專案，以及行銷影音作品集展示牆。
- **軟體規格書 (SRS)**：[SoftwareSpecification.md](file:///c:/Users/talan/Projects/VibeCoding_AI_BrandWebsite_Workshop/SoftwareSpecification.md)  
  包含專案的架構設計、模組拆解（融入 DDD, BDD, TDD 方法論）、無色彩 Mermaid 流程與時序圖、以及詳細的 CRA 安全合規評估。
- **專案工作日誌**：[work_log.md](file:///c:/Users/talan/Projects/VibeCoding_AI_BrandWebsite_Workshop/work_log.md)  
  記錄本專案的完整開發歷程、Bug 修復、功能新增與版本演進，每日工作項目均進行了細緻的 prepend 整合。
- **GitHub 404 自定義重定向**：[404.html](file:///c:/Users/talan/Projects/VibeCoding_AI_BrandWebsite_Workshop/404.html)  
  用以解決大小寫 URL 衝突，自動將大寫的 `Index.html` 重定向回正確的 [index.html](file:///c:/Users/talan/Projects/VibeCoding_AI_BrandWebsite_Workshop/index.html)。

---

## 前端展示模組 (Showcase Modules)

本專案收納了 VibeCoding 工作坊中產出的五大核心前端展示模組：

1. **邱大郎個人 brand 門戶** (`portal.html`, `portal.js`, `portal.css`)：
   - 實現行動端漢堡選單旋轉動畫與防穿透背景鎖定。
   - 終端機風格聯絡表單，攔截前端校驗並以 Iframe 非同步發送資料至 Google 表單。
2. **科技美髮 AI 助理** (`hairai.html`)：
   - TMR x 經濟部計畫的美髮業 AI 課程 Landing Page。
   - 內置 Before/After 髮型對比 Lightbox 大圖檢視、細部課綱折疊面板。
3. **商業影像製作 AI** (`howard_mv.html`)：
   - 靜音自動循環 YouTube 影片背景、Lucide SVG 圖標包。
   - 定價與報名方案 Tab 切換、非同步聯絡表單。
4. **奇點 JudgAI 保險科技** (`judgai_full.html`)：
   - 保險顧問 AI 助理，支援 CSS Clamp 全螢幕響應式排版。
   - 內置亮/暗主題（Light/Dark Theme）切換控制、產品特色對比表格。
5. **百岳登山導覽網站** (`hiking.html`, `hiking.js`, `hiking.css`)：
   - 森林系毛玻璃美學，支援 RWD 佈局。
   - 裝備分頁切換、登山報名表單（包含台灣手機格式校驗與出發日期驗證邏輯）。

---

## 技術堆疊與開發原則

- **前端核心**：語意化 HTML5、原生 JavaScript (ES6+)。
- **樣式系統**：Vanilla CSS 3 (導入 Glassmorphism 磨砂玻璃、CSS 變數、Flexbox/Grid 網格、Clamp 響應式字體)。
- **無色彩圖表**：使用 Mermaid 繪製流程與依賴，完全遵循無色彩、節點不含特殊字元之黑白純線條規範。
- **安全防護**：考量歐盟 CRA (Cyber Resilience Act) 合規要求，設計了前端 HTML Entity 消毒轉義、內容安全策略 (CSP) 限制與 Honeypot 蜜罐防 Spam 機制。

---

## 專案設定資訊

- **自託管遠端儲存庫** (Gitea)：`https://gitea.talang.org/Talang/VibeCoding_AI_BrandWebsite_Workshop.git`
- **GitHub 部署分支** (Pages)：`main` (由小寫 [index.html](file:///c:/Users/talan/Projects/VibeCoding_AI_BrandWebsite_Workshop/index.html) 提供 Pages 服務)

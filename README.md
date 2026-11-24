# هوش‌یار — لندینگ‌پیج مینیمال، روشن و پاستلی

**آنلاین:** https://panteamkhh.github.io/landpage/

سایت نمونه برای معرفی خدمات هوش مصنوعی و داده به کسب‌وکارهای کوچک.
رابط کاربری ساده، فارسی و راست‌چین؛ همه‌ی مسیرها به **واتساپ، تلگرام یا بله** می‌رسند.

> همه‌ی نمونه‌ها «دمو» هستند. نام کسب‌وکارها و اعداد ساختگی‌اند و ادعای نتیجه واقعی نیستند.

---

## اجرا

```bash
# ساده‌ترین: فایل index.html را باز کنید
# یا با سرور محلی:
python -m http.server 8000
# سپس http://localhost:8000
```

---

## انتشار روی GitHub Pages

```bash
git remote add origin https://github.com/panteamkhh/landpage.git
git add .
git commit -m "landing page"
git push -u origin main
```

سپس در ریپازیتوری: **Settings → Pages → Source: Deploy from a branch → main / (root) → Save**.
آدرس نهایی: `https://panteamkhh.github.io/landpage/`

فایل `.nojekyll` از قبل اضافه شده است.

---

## کانال‌های تماس

در `assets/js/content.js`:

```js
channels: {
  whatsapp: { handle: "989120000000", label: "واتساپ", display: "۰۹۱۲ ۰۰۰ ۰۰۰۰" },
  telegram: { handle: "hooshyar_demo", label: "تلگرام" },
  bale:     { handle: "hooshyar_demo", label: "بله" },
}
```

- **واتساپ:** شماره با کد کشور، بدون `+` و بدون صفر. پیام پیشنهادی خودکار پر می‌شود.
- **تلگرام:** نام کاربری بدون `@` → `https://t.me/USERNAME`
- **بله:** نام کاربری بدون `@` → `https://ble.ir/USERNAME`

پیام پیشنهادی هر موضوع در `messages` است (`general`، `agent`، `chatbot`، `analytics`).
در دیالوگ «شروع گفت‌وگو» همان پیام با دکمه‌ی **کپی** در دسترس است تا در تلگرام یا بله
هم بفرستید (این دو پیام‌رسان پر‌کردن خودکار پیام را پشتیبانی نمی‌کنند).

---

## شخصی‌سازی

همه‌ی محتوا در `assets/js/content.js` است:

| کلید | کار |
| --- | --- |
| `SITE.channels` | شماره/نام‌کاربری سه پیام‌رسان |
| `SITE.messages` | پیام پیشنهادی هر خدمت |
| `SCENARIOS` | گزینه‌های «کدام کار وقتت را می‌گیرد؟» |
| `PROJECTS` | نمونه‌ها: مسئله، راهکار، مزیت، سه عدد کلیدی |
| `FAQ` | پرسش‌های متداول |
| `PROJECT_FILTERS` | برچسب‌های فیلتر نمونه‌ها |

متن‌های ثابت صفحه (هیرو، بیانیه، خدمات، فرآیند، تماس، فوتر) در `index.html` است.
رنگ‌ها و فونت در ابتدای `assets/css/styles.css` داخل `:root`.

برای فونت محلی: فایل‌های `woff2` را در `assets/fonts/` بگذارید و `@font-face` اضافه کنید.

---

## نمونه‌ها

چهار پروژه‌ی دمو، هر کدام با ساختار «مسئله → راهکار → عدد → مزیت»:

1. **داشبورد ریزش باشگاه** — نرخ تمدید، اعضای در خطر، حضور هفتگی.
2. **دستیار چت کلینیک زیبایی** — پاسخ فارسی، ثبت نوبت، تحویل به منشی.
3. **ایجنت پیگیری سفارش** — اتصال به فروشگاه، وضعیت مرسوله، مرجوعی.
4. **داشبورد منو و ساعات شلوغی رستوران** — آیتم‌های سودآور، دورریز.

تصویر هر کارت یک اسکرین‌شات واقعی از محصولات متن‌باز است (Tabler، Chatwoot، n8n، Metabase) و در `assets/img` قرار دارد. منبع و مجوز هر تصویر در `assets/img/CREDITS.md` آمده است.

---

## اسکیل‌های موجود

**دانلود‌شده** از مخزن [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) (MIT):

- `.opencode/skills/copywriting`
- `.opencode/skills/content-strategy`
- `.opencode/skills/digital-marketing` (از `marketing-plan`)
- `.opencode/skills/conversion-optimization` (از `cro`)

**طراحی وب (نوشته‌شده برای همین پروژه):**

`web-landing-structure` · `web-hero-design` · `web-button-cta-design` ·
`web-rtl-persian-typography` · `web-design-system-tokens` ·
`web-micro-interactions` · `web-ui-accessibility-ux` · `web-portfolio-showcase`

> اسکیل‌ها روی خروجی سایت اثری ندارند و فقط راهنمای کار هستند. برای فعال شدن در
> opencode یک بار برنامه را ببندید و باز کنید.

---

## ساختار

```
.
├── index.html
├── assets/
│   ├── css/styles.css      # توکن‌های پاستلی روشن، کامپوننت‌ها، ریسپانسیو
│   ├── img/                # اسکرین‌شات نمونه‌ها + CREDITS.md
│   └── js/
│       ├── content.js      # کانال‌ها، پیام‌ها، نمونه‌ها، پرسش‌ها
│       └── main.js         # رندر، فیلتر، مودال، دیالوگ تماس، منو
├── .opencode/skills/       # اسکیل‌های طراحی و مارکتینگ
├── .nojekyll
└── README.md
```

---

## بررسی‌شده

- RTL کامل، بدون سرریز افقی در ۳۹۰px و ۱۴۴۰px.
- فیلتر نمونه‌ها، مودال جزئیات، دیالوگ تماس، انتخاب راهکار، آکاردئون و منوی موبایل
  با صفحه‌کلید و `aria` تست شده‌اند.
- سه کانال تماس در هدر، هیرو، هر خدمت، بخش تماس و فوتر تکرار شده‌اند.
- بدون خطای کنسول؛ بدون وابستگی جز فونت.

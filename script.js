const glassData = [
    {
        title: "Захисне скло Acclab Full Glue",
        models: ["Samsung A51", "Samsung A52", "Samsung A52s", "Samsung A53 5G", "Samsung A33 5G", "Samsung A80", "Samsung S20 FE"],
        info: "Група 6.5 дюймів (O-виріз). Найпопулярніше скло."
    },
    {
        title: "Захисне скло Acclab Full Glue",
        models: ["Samsung A13", "Samsung A14", "Samsung A04", "Samsung A04s", "Samsung A05", "Samsung A05s", "Samsung M13", "Samsung M14", "Samsung A23"],
        info: "Бюджетна лінійка (V-виріз). Універсальне для великих екранів."
    },
    {
        title: "Захисне скло Acclab Full Glue",
        models: ["Samsung A54 5G", "Samsung A34 5G"],
        info: "Лінійка 2023 року. Скло має специфічний радіус заокруглення кутів."
    },
    {
        title: "Захисне скло Acclab Full Glue",
        models: ["Samsung A55 5G", "Samsung A35 5G"],
        info: "Лінійка 2024 року. Прямі краї, новий формат вирізу под динамік."
    },
    {
        title: "Захисне скло Acclab Full Glue",
        models: ["Samsung A10", "Samsung A20", "Samsung A30", "Samsung A30s", "Samsung A50", "Samsung A50s", "Samsung M10", "Samsung M20", "Samsung M30"],
        info: "Класична серія (U/V-виріз). Повна сумісність зі сканером в екрані."
    },
    {
        title: "Захисне скло Acclab Full Glue",
        models: ["Samsung A12", "Samsung A02", "Samsung A02s", "Samsung A03", "Samsung A03s", "Samsung A21s", "Samsung M12"],
        info: "Попередня бюджетна серія. Однакова геометрія дисплея."
    },
    {
        title: "Захисне скло Acclab Full Glue",
        models: ["Samsung A71", "Samsung A72", "Samsung A73 5G", "Samsung S10 Lite"],
        info: "Великі дисплеї 6.7 дюймів."
    },
    {
        title: "Захисне скло Acclab Full Glue",
        models: ["Samsung A32 4G", "Samsung A22 4G", "Samsung M32"],
        info: "Тільки для 4G версій з Super AMOLED екранами (U-виріз)."
    },
    {
        title: "Захисне скло Acclab Full Glue",
        models: ["Samsung A32 5G", "Samsung A22 5G"],
        info: "Для 5G версій (V-виріз). Відрізняється від 4G версій."
    },
    {
        title: "Захисне скло Acclab Full Glue",
        models: ["Samsung A40", "Samsung A41"],
        info: "Для компактних моделей. Інше скло буде завеликим."
    }
];

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resultsList = document.getElementById('results');
const glassCard = document.getElementById('glassDetails');
const errorMsg = document.getElementById('errorMsg');
const themeToggle = document.getElementById('themeToggle');

// ФУНКЦІЯ ПОКАЗУ РЕЗУЛЬТАТУ
function showResult(data, modelName) {
    resultsList.classList.add('hidden');
    errorMsg.classList.add('hidden');
    searchInput.value = modelName;
    
    // Скидаємо анімацію картки
    glassCard.classList.remove('animate-card');
    void glassCard.offsetWidth; // Force reflow для рестарту анімації
    
    glassCard.innerHTML = `
        <h2>${data.title}</h2>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 15px; background: rgba(0,0,0,0.05); padding: 10px; border-radius: 8px;">
            ${data.info}
        </p>
        <p style="font-size: 0.75rem; font-weight: 800; text-transform: uppercase; color: var(--text-muted); margin-bottom: 12px; letter-spacing: 1px;">Також підходить на:</p>
        <div class="compat-list">
            ${data.models.map(m => `<span class="compat-badge">${m}</span>`).join('')}
        </div>
    `;
    glassCard.classList.remove('hidden');
    glassCard.classList.add('animate-card');
}

// ФУНКЦІЯ ПОШУКУ
function performSearch() {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) return;

    let found = null;
    for (const item of glassData) {
        const match = item.models.find(m => m.toLowerCase().includes(query));
        if (match) {
            found = { data: item, model: match };
            break;
        }
    }

    if (found) {
        showResult(found.data, found.model);
    } else {
        glassCard.classList.add('hidden');
        errorMsg.classList.remove('hidden');
    }
}

// ЖИВИЙ ПОШУК (ПІДКАЗКИ)
searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    resultsList.innerHTML = '';
    errorMsg.classList.add('hidden');

    if (query.length < 2) {
        resultsList.classList.add('hidden');
        return;
    }

    const matches = [];
    glassData.forEach(item => {
        item.models.forEach(m => {
            if (m.toLowerCase().includes(query)) {
                if (!matches.find(x => x.m === m)) {
                    matches.push({ item, m });
                }
            }
        });
    });

    if (matches.length > 0) {
        resultsList.classList.remove('hidden');
        matches.slice(0, 8).forEach(match => {
            const div = document.createElement('div');
            div.className = 'result-item';
            div.textContent = match.m;
            div.onclick = () => showResult(match.item, match.m);
            resultsList.appendChild(div);
        });
    } else {
        resultsList.classList.add('hidden');
    }
});

// КНОПКИ ТА КЛАВІАТУРА
searchBtn.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') performSearch(); });

// КЛІК ПОЗА ПОШУКОМ
document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !resultsList.contains(e.target)) {
        resultsList.classList.add('hidden');
    }
});

// ПЕРЕМИКАЧ ТЕМИ
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
    themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
    if (document.body.getAttribute('data-theme') === 'dark') {
        document.body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = '🌙';
    } else {
        document.body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = '☀️';
    }
});

const apiKey = 'AIzaSyCRMAojRZr1YuyGyfPnj9LY7H5EuWjmYn4'; // Replace with your API key
// AIzaSyCRMAojRZr1YuyGyfPnj9LY7H5EuWjmYn4
async function translateText(text, targetLanguage) {
    const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${apiKey}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            q: text,
            target: targetLanguage
        })
    });
    const data = await response.json();
    return data.data.translations[0].translatedText;
}

async function updateContent(language) {
    const elements = {
        'header h1': 'Welcome to my website',
        'header p': 'This is a simple internationalized website using i18next.',
        'section p': 'Explore the content and change the language using the dropdown below.'
    };

    for (const selector in elements) {
        const text = elements[selector];
        document.querySelector(selector).textContent = await translateText(text, language);
    }

    document.querySelectorAll('.nav-links a').forEach(async (element) => {
        const text = element.getAttribute('data-i18n');
        const translation = await translateText(text, language);
        element.textContent = translation;
    });
}

document.getElementById('languageSwitcher').addEventListener('change', function(event) {
    updateContent(event.target.value);
});

// Initialize with default language
updateContent('en');

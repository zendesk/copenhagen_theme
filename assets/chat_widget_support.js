/* chat widget support */

function unescapeHTML(escapedStr) {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = escapedStr;
    return textarea.value;
}

function loadScript(src, id) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.id = id;
        script.src = src;
        script.async = true;
        script.type = 'text/javascript';

        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`));

        document.body.appendChild(script);
    });
}
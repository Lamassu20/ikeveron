    function startTimer() {
       var zindexForContainerAndSocialFix = document.createElement("style");
       zindexForContainerAndSocialFix.appendChild(document.createTextNode(`
.container{
    z-index: 1;
}
.social-container[data-v-3d4cb83d] {
    max-width: 830px!important;
}
`));
document.head.appendChild(zindexForContainerAndSocialFix);

let smallContainer, section, privacyLink, tosLink, moveLinksCheckbox, hideSocialContainerCheckbox, toggleDateCheckbox, togglePressedKeysCheckbox, toggleMousePos, toggleReverseMenu, toggleAccountBelow, dateElement, minimapStatsElement;
let keyCounts = {};
let activeDiv = null;
let keyTimers = {};


const styles = `
.section[data-v-c41b640a] {
    border: 2px solid #000;
    border-radius: 8px;
    overflow: hidden;
}
.section > .header[data-v-c41b640a] {
    background: rgba(0,0,0,.5);
    text-align: center;
    border-bottom: 2px solid #000;
    padding: 7px;
    padding-left: 10px;
}
.settings-container {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    align-self: stretch;
    gap: 27px;
    color: #dadada;
}
.settings-column-1, .settings-column-2 {
    flex: 1;
    font-size: 16px;
}
.settings-column-2 {
    margin-left: 0px;
}
.zxc4{
    background: #b1700f;
    border: 0;
    border-radius: 4px;
    box-shadow: 0 0 1px 1px #000;
    color: #dadada;
    cursor: pointer;
    font-size: 16px;
    outline: none;
    padding: 5px 9px;
    text-shadow: 1px 1px 2px #000;
    margin: 15px;
    margin-top: 5px;
}
.zxc3 {
    background: #b1700f;
    border: 0;
    border-radius: 4px;
    box-shadow: 0 0 1px 1px #000;
    color: #dadada;
    cursor: pointer;
    font-size: 16px;
    outline: none;
    padding: 5px 9px;
    text-shadow: 1px 1px 2px #000;
    margin-left: 0px;
    margin-top: 0px;
}
.zxc1 {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    width: 450px;
    height: auto;
    background-color: rgba(0,0,0,0.5);
    padding: 10px;
    margin-top: 5px;
    padding-bottom: 10px;
}
.custom-checkbox {
    display: block;
}
.custom-checkbox label {
    display: inline-block;
    vertical-align: middle;
    color: #dadada;
}
.custom-checkbox input {
    vertical-align: middle;
    margin-right: 5px;
    cursor: pointer;
}
.checkbox-button-wrapper {
    display: flex;
    align-items: center;
}

.checkbox-button-wrapper .zxc3 {
    margin-left: 10px;
}

.color-picker-1 {
    display: block;
    margin-top: 15px;
    margin-left: 5px;
    margin-bottom: 5px;
}
.color-picker-2 {
    display: block;
    margin-top: 5px;
    margin-left: 5px;
    margin-bottom: 5px;
}
.color-picker-3 {
    display: block;
    margin-top: 5px;
    margin-left: 5px;
    margin-bottom: 10px;
}
`;


function createSmallContainer() {
    const container = document.createElement('div');
    container.className = 'small-container zxc1 fade-box tab-menu';
    container.style.display = localStorage.getItem('smallContainerVisible') === 'true' ? 'block' : 'none';

    const existingLineElement = document.querySelector('span[data-v-ba56a55e].line');
    if (existingLineElement) {
        existingLineElement.addEventListener('click', () => {
            const isVisible = container.style.display === 'none';
            container.style.display = isVisible ? 'block' : 'none';
            localStorage.setItem('smallContainerVisible', isVisible);
        });
    }
    return container;
}

function createSection() {
    const section = document.createElement('div');
    section.className = 'section';
    section.setAttribute('data-v-c41b640a', '');
    section.innerHTML = `
        <div class="header" data-v-c41b640a>⁺‧₊˚ཐི⋆♱⋆ཋྀ˚₊‧⁺⁺‧₊˚ᄿ༺ཐིㅤ ㅤཋྀ༻ᄽ˚₊‧⁺⁺‧₊˚ཐི⋆♱⋆ཋྀ˚₊‧⁺</div>
        <div class="settings-container">
            <div class="settings-column-1">
                ${createCheckbox('hideSocialContainerCheckbox', 'Hide Social Container')}
                ${createCheckbox('moveLinksCheckbox', 'Hide links')}
        <div class="checkbox-button-wrapper">
            ${createCheckbox('customThemeCheckbox', 'Your Theme')}
            <button class="zxc3" id="settingsButton">Settings</button>
            </div>
            </div>
            <div class="settings-column-2">
                ${createCheckbox('reverseMenuCheckbox', 'Reversed Menu')}
                ${createCheckbox('accountBelowCheckbox', 'Account Below')}
                ${createCheckbox('toggleDateCheckbox', 'Show Current Date')}
                ${createCheckbox('togglePressedKeysCheckbox', 'Show Pressed Keys')}
                ${createCheckbox('toggleMousePos', 'Show Mouse Position')}
            </div>
        </div>
    `;
    return section;
}



function createCheckbox(id, label) {
    return `
    <div class="custom-checkbox">
        <label>
            <input type="checkbox" id="${id}">
            ${label}
        </label>
    </div>`;
}




function resetThemeToDefault() {
    // Значения по умолчанию
    const defaultColor1 = '#273b5e';
    const defaultColor2 = '#0f1724';
    const defaultColor3 = '#001121';

    // Обновляем пипетки цветов
    const colorPicker1 = document.querySelector('.color-picker-1');
    const colorPicker2 = document.querySelector('.color-picker-2');
    const colorPicker3 = document.querySelector('.color-picker-3');

    if (colorPicker1 && colorPicker2 && colorPicker3) {
        colorPicker1.value = defaultColor1;
        colorPicker2.value = defaultColor2;
        colorPicker3.value = defaultColor3;
    }

    // Обновляем стили
    updateFadeBoxStyles(defaultColor1, defaultColor2, defaultColor3);

    // Сохраняем эти значения в localStorage
    saveColorsToLocalStorage(defaultColor1, defaultColor2, defaultColor3);
}

// Измените создание контейнера, чтобы добавить обработчик события для кнопки Reset





// Создайте контейнер с классом fade-box
function createCustomThemeContainer() {
    const customContainer = document.createElement('div');
    customContainer.className = 'fade-box custom-theme-container';
    customContainer.style.display = 'none';
    customContainer.style.position = 'absolute';
    customContainer.style.width = '180px';
    customContainer.style.height = 'auto';
    customContainer.style.backgroundColor = '#ffffff00';
    customContainer.style.left = '-196px';
    customContainer.style.top = '0px';

    // Получаем сохраненные цвета из localStorage
    const [savedColor1, savedColor2, savedColor3] = loadColorsFromLocalStorage();

    customContainer.innerHTML = `
        <div class="color-picker-group" style="display: flex; align-items: center;">
            <label for="colorPicker1" style="margin-left: 15px;">Bg color 1:</label>
            <input type="color" class="color-picker-1" id="colorPicker1" value="${savedColor1}">
        </div>
        <div class="color-picker-group" style="display: flex; align-items: center;">
            <label for="colorPicker2" style="margin-left: 15px;">Bg color 2:</label>
            <input type="color" class="color-picker-2" id="colorPicker2" value="${savedColor2}">
        </div>
        <div class="color-picker-group" style="display: flex; align-items: center;">
            <label for="colorPicker3" style="margin-left: 15px;">Overlay color:</label>
            <input type="color" class="color-picker-3" id="colorPicker3" value="${savedColor3}">
        </div>
        <button class="zxc4">Reset to default</button>
    `;

    // Добавьте ваш контейнер к small-container
    const smallContainer = document.querySelector('.small-container.zxc1.fade-box.tab-menu');
    if (smallContainer) {
        smallContainer.appendChild(customContainer);
    }

    // Привязываем функцию сброса к кнопке
    const resetButton = customContainer.querySelector('.zxc4');
    if (resetButton) {
        resetButton.addEventListener('click', resetThemeToDefault);
    }

    // Обновляем стили на основе сохраненных цветов
    updateFadeBoxStyles(savedColor1, savedColor2, savedColor3);

    return customContainer;
}


function saveColorsToLocalStorage(color1, color2, color3) {
    localStorage.setItem('colorPicker1', color1);
    localStorage.setItem('colorPicker2', color2);
    localStorage.setItem('colorPicker3', color3);
}

// Функция для загрузки цветов из localStorage
function loadColorsFromLocalStorage() {
    const color1 = localStorage.getItem('colorPicker1') || '#273b5e'; // Значение по умолчанию
    const color2 = localStorage.getItem('colorPicker2') || '#0f1724'; // Значение по умолчанию
    const color3 = localStorage.getItem('colorPicker3') || '#001121'; // Значение по умолчанию
    return [color1, color2, color3];
}
function updateFadeBoxStyles(color1, color2, color3) {
    let styleElement = document.getElementById('customFadeBoxStyles');

    if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.id = 'customFadeBoxStyles';
        document.head.appendChild(styleElement);
    }
    const color3wopacity = convertHexToRgba(color3, 0.75);
    styleElement.textContent = `
        .fade-box{
            background: linear-gradient(to right bottom, ${color1}, ${color2})!important;
        }
        ::-webkit-scrollbar-thumb {
            background-color: ${color1} !important;
        }
        .replay-list-header {
            background: linear-gradient(to right bottom, ${color1}, ${color2})!important;
        }
        .swal2-popup {
            background: linear-gradient(to right bottom, ${color1}, ${color2})!important;
        }
        .tooltip {
            background: linear-gradient(to right bottom, ${color1}, ${color2})!important;
        }
        #overlay {
            background: radial-gradient(${color3wopacity} 300px,rgba(0,0,0,.75))!important;
}
    `;
}

function convertHexToRgba(hex, opacity) {
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
        r = parseInt(hex[1] + hex[2], 16);
        g = parseInt(hex[3] + hex[4], 16);
        b = parseInt(hex[5] + hex[6], 16);
    }
    return `rgba(${r},${g},${b},${opacity})`;
}

function updateFadeBoxColors() {
    const colorPicker1 = document.querySelector('.color-picker-1');
    const colorPicker2 = document.querySelector('.color-picker-2');
    const colorPicker3 = document.querySelector('.color-picker-3');

    if (colorPicker1 && colorPicker2 && colorPicker3) {
        const color1 = colorPicker1.value;
        const color2 = colorPicker2.value;
        const color3 = colorPicker3.value;
        updateFadeBoxStyles(color1, color2, color3);
        saveColorsToLocalStorage(color1, color2, color3); // Сохранение цветов в localStorage
    }
}
function toggleThemeButtons() {
    const themeButtonElements = document.querySelectorAll('#theme-button');
    const customThemeCheckbox = document.querySelector('#customThemeCheckbox');

    if (customThemeCheckbox && themeButtonElements.length > 0) {
        const isChecked = customThemeCheckbox.checked;

        themeButtonElements.forEach(button => {
            button.style.pointerEvents = isChecked ? 'none' : 'auto';
            button.style.opacity = isChecked ? '0.5' : '1'; // Optional: to visually indicate disabled state
        });
    }
}

function setupCustomThemeButton() {
    const button = document.querySelector('.zxc3');
    const customContainer = createCustomThemeContainer();
    const customThemeCheckbox = document.querySelector('#customThemeCheckbox');
    const customThemeContainer = document.querySelector('.fade-box.custom-theme-container');

    button.addEventListener('click', () => {
        const isVisible = customContainer.style.display === 'none';
        customContainer.style.display = isVisible ? 'block' : 'none';
    });

    customThemeCheckbox.addEventListener('change', () => {
        const isChecked = customThemeCheckbox.checked;
        localStorage.setItem('customThemeCheckboxChecked', isChecked);
        applyCustomThemeStyles(isChecked);
        toggleThemeButtons(); // Update button clickability based on checkbox state

        // Disable or enable the "Settings" button based on the checkbox state
        button.disabled = !isChecked;
        button.style.opacity = isChecked ? '1' : '0.5'; // Optional: visually indicate disabled state
        button.style.cursor = isChecked ? 'pointer' : 'auto'; // Optional: change cursor for disabled state
    });

    // Set initial state
    const isCustomThemeChecked = localStorage.getItem('customThemeCheckboxChecked') === 'true';
    customThemeCheckbox.checked = isCustomThemeChecked;
    applyCustomThemeStyles(isCustomThemeChecked);
    toggleThemeButtons(); // Update button clickability based on initial state

    // Add event listeners for color pickers
    const colorPicker1 = customContainer.querySelector('.color-picker-1');
    const colorPicker2 = customContainer.querySelector('.color-picker-2');
    const colorPicker3 = customContainer.querySelector('.color-picker-3');

    if (colorPicker1) {
        colorPicker1.addEventListener('input', updateFadeBoxColors);
    }

    if (colorPicker2) {
        colorPicker2.addEventListener('input', updateFadeBoxColors);
    }

    if (colorPicker3) {
        colorPicker3.addEventListener('input', updateFadeBoxColors);
    }

    // Set initial state for "Settings" button
    button.disabled = !isCustomThemeChecked;
    button.style.opacity = isCustomThemeChecked ? '1' : '0.5';
    button.style.cursor = isCustomThemeChecked ? 'pointer' : 'auto';
}





function applyCustomThemeStyles(isChecked) {
    const color1 = localStorage.getItem('colorPicker1') || '#273b5e';
    const color2 = localStorage.getItem('colorPicker2') || '#0f1724';
    const color3 = localStorage.getItem('colorPicker3') || '#001121';

    let styleElement = document.getElementById('customFadeBoxStyles');

    const customThemeContainer = document.querySelector('.fade-box.custom-theme-container');
    if (customThemeContainer) {
        customThemeContainer.style.display = isChecked ? 'block' : 'none';
    }

    if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.id = 'customFadeBoxStyles';
        document.head.appendChild(styleElement);
    }

    const color3wopacity = convertHexToRgba(color3, 0.75);
    if (isChecked) {
        styleElement.textContent = `
            .fade-box{
                background: linear-gradient(to right bottom, ${color1}, ${color2})!important;
            }
            ::-webkit-scrollbar-thumb {
                background-color: ${color1} !important;
            }
            .replay-list-header {
                background: linear-gradient(to right bottom, ${color1}, ${color2})!important;
            }
            .swal2-popup {
                background: linear-gradient(to right bottom, ${color1}, ${color2})!important;
            }
            .tooltip {
                background: linear-gradient(to right bottom, ${color1}, ${color2})!important;
            }
            #overlay {
                background: radial-gradient(${color3wopacity} 300px,rgba(0,0,0,.75))!important;
            }
        `;
    } else {
        styleElement.textContent = `
            .fade-box{
                background: linear-gradient(to right bottom, ${color1}, ${color2});
            }
            ::-webkit-scrollbar-thumb {
                background-color: ${color1};
            }
            .replay-list-header {
                background: linear-gradient(to right bottom, ${color1}, ${color2});
            }
            .swal2-popup {
                background: linear-gradient(to right bottom, ${color1}, ${color2});
            }
            .tooltip {
                background: linear-gradient(to right bottom, ${color1}, ${color2});
            }
            #overlay {
                background: radial-gradient(${color3wopacity} 300px,rgba(0,0,0,.75));
            }
        `;
    }
}




function setupMoveLinks() {
    moveLinksCheckbox = section.querySelector('#moveLinksCheckbox');
    privacyLink = document.querySelector('a[href="privacy.html"][data-v-ba56a55e]');
    tosLink = document.querySelector('a[href="tos.html"][data-v-ba56a55e]');

    const moveLinksUp = () => {
        if (moveLinksCheckbox.checked) {
            privacyLink.style.transform = 'translateY(-10000px)';
            tosLink.style.transform = 'translateY(-10000px)';
        } else {
            privacyLink.style.transform = '';
            tosLink.style.transform = '';
        }
    };

    if (localStorage.getItem('moveLinksChecked') === 'true') {
        moveLinksCheckbox.checked = true;
        moveLinksUp();
    }

    moveLinksCheckbox.addEventListener('change', () => {
        moveLinksUp();
        localStorage.setItem('moveLinksChecked', moveLinksCheckbox.checked);
    });
}
function setupHideSocialContainer() {
    const toggleHideSocialContainer = section.querySelector('#hideSocialContainerCheckbox');
    const socialContainer = document.querySelector('.social-container[data-v-3d4cb83d]');

    const applyHideSocialContainer = () => {
        if (toggleHideSocialContainer.checked) {
            socialContainer.style.transform = 'translateY(-10000px)';
        } else {
            socialContainer.style.transform = '';
        }
    };

    if (localStorage.getItem('hideSocialContainerChecked') === 'true') {
        toggleHideSocialContainer.checked = true;
        applyHideSocialContainer();
    }

    toggleHideSocialContainer.addEventListener('change', () => {
        applyHideSocialContainer();
        localStorage.setItem('hideSocialContainerChecked', toggleHideSocialContainer.checked);
    });
}

function setupDateDisplay() {
    toggleDateCheckbox = section.querySelector('#toggleDateCheckbox');
    minimapStatsElement = document.querySelector('.minimap-stats');
    dateElement = document.createElement('div');
    dateElement.dataset.v769dba30 = '';
    dateElement.style.display = 'block';

    const updateDate = () => {
        const currentDate = new Date();
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();

        if (day < 10) day = '0' + day;
        if (month < 10) month = '0' + month;

        dateElement.textContent = `${day}.${month}.${year}`;
    };

    updateDate();
    minimapStatsElement.insertBefore(dateElement, minimapStatsElement.children[1]);

    if (localStorage.getItem('toggleDateChecked') === 'true') {
        toggleDateCheckbox.checked = true;
        dateElement.style.display = 'block';
    } else {
        dateElement.style.display = 'none';
    }

    toggleDateCheckbox.addEventListener('change', () => {
        const isVisible = toggleDateCheckbox.checked;
        dateElement.style.display = isVisible ? 'block' : 'none';
        localStorage.setItem('toggleDateChecked', isVisible);
    });

    setInterval(() => {
        const currentDate = new Date();
        if (currentDate.getHours() === 0 && currentDate.getMinutes() === 0) {
            updateDate();
        }
    }, 60000);
}

function setupMousePos() {
    toggleMousePos = section.querySelector('#toggleMousePos');

    const mousePositionDiv = document.createElement('div');
    mousePositionDiv.style.position = 'absolute';
    mousePositionDiv.style.backgroundColor = '#ffffff00';
    mousePositionDiv.style.padding = '6px';
    mousePositionDiv.style.fontFamily = 'Ubuntu, sans-serif';
    mousePositionDiv.style.fontSize = '14px';
    mousePositionDiv.style.fontWeight = '300';
    mousePositionDiv.style.color = 'white';
    mousePositionDiv.style.textAlign = 'right';
    mousePositionDiv.textContent = '';

    const leaderboard = document.querySelector('div[data-v-7e7860a8][data-v-0047b8f0][id="leaderboard"]');
    leaderboard.parentNode.insertBefore(mousePositionDiv, leaderboard.nextSibling);

    function updatePosition() {
        const rect = leaderboard.getBoundingClientRect();
        mousePositionDiv.style.top = (rect.bottom + window.scrollY) + 'px';
        mousePositionDiv.style.left = (rect.right - mousePositionDiv.offsetWidth) + 'px';
        mousePositionDiv.style.width = rect.width + 'px';
    }

    function updateMousePosition(event) {
        const x = event.clientX;
        const y = event.clientY;
        mousePositionDiv.textContent = `${x} / ${y}`;
    }

    function checkVisibility() {
        if (leaderboard.style.display === 'none' || leaderboard.style.visibility === 'hidden' || window.getComputedStyle(leaderboard).display === 'none' || window.getComputedStyle(leaderboard).visibility === 'hidden') {
            mousePositionDiv.style.display = 'none';
        } else {
            mousePositionDiv.style.display = 'block';
            updatePosition();
        }
    }

    const observer = new MutationObserver(checkVisibility);
    const config = { attributes: true, childList: true, subtree: true, attributeFilter: ['style', 'class'] };
    observer.observe(leaderboard, config);

    if (localStorage.getItem('toggleMousePosChecked') === 'true') {
        toggleMousePos.checked = true;
        document.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('resize', updatePosition);
        setTimeout(updatePosition, 0);
        checkVisibility();
    } else {
        mousePositionDiv.style.display = 'none';
    }

    toggleMousePos.addEventListener('change', () => {
        const isVisible = toggleMousePos.checked;
        if (isVisible) {
            document.addEventListener('mousemove', updateMousePosition);
            window.addEventListener('resize', updatePosition);
            setTimeout(updatePosition, 0);
            checkVisibility();
        } else {
            document.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('resize', updatePosition);
            mousePositionDiv.style.display = 'none';
        }
        localStorage.setItem('toggleMousePosChecked', isVisible);
    });
}

function setupPressedKeys() {
    togglePressedKeysCheckbox = section.querySelector('#togglePressedKeysCheckbox');

    const enablePressedKeys = () => {
        document.addEventListener('keydown', handleKeydown);
        document.addEventListener('keyup', handleKeyup);
        document.addEventListener('mousedown', handleMousedown);
        window.addEventListener('blur', clearAllKeyTimers);
    };

    const disablePressedKeys = () => {
        document.removeEventListener('keydown', handleKeydown);
        document.removeEventListener('keyup', handleKeyup);
        document.removeEventListener('mousedown', handleMousedown);
        window.removeEventListener('blur', clearAllKeyTimers);
        clearAllKeyTimers();
    };

    if (localStorage.getItem('togglePressedKeysChecked') === 'true') {
        togglePressedKeysCheckbox.checked = true;
        enablePressedKeys();
    }

    togglePressedKeysCheckbox.addEventListener('change', () => {
        const isChecked = togglePressedKeysCheckbox.checked;
        if (isChecked) {
            enablePressedKeys();
        } else {
            disablePressedKeys();
        }
        localStorage.setItem('togglePressedKeysChecked', isChecked);
    });
}


function handleKeydown(event) {
    if (!keyCounts[event.key]) {
        keyCounts[event.key] = 0;
    }
    keyCounts[event.key]++;
    updateDiv(event.key, keyCounts[event.key]);

    if (!keyTimers[event.key] && !['Control', 'Shift', 'Tab'].includes(event.key)) {
        keyTimers[event.key] = setInterval(function() {
            keyCounts[event.key]++;
            updateDiv(event.key, keyCounts[event.key]);
        }, 720);
    }
}

function handleKeyup(event) {
    clearInterval(keyTimers[event.key]);
    keyTimers[event.key] = null;
    keyCounts[event.key] = 0;
}

function handleMousedown(event) {
    let button;
    switch (event.button) {
        case 0:
            button = 'ЛКМ';
            break;
        case 1:
            button = 'СКМ';
            break;
        case 2:
            button = 'ПКМ';
            break;
        default:
            button = 'Mouse Click';
    }
    updateDiv(button, 1);
}

function clearAllKeyTimers() {
    for (let key in keyTimers) {
        clearInterval(keyTimers[key]);
        keyTimers[key] = null;
    }
    keyCounts = {};
}

function updateDiv(text, count) {
    const container = document.querySelector('.chat-container[data-v-7264abb4]');

    if (activeDiv) {
        activeDiv.textContent = count > 1 ? `${text}[${count}]` : text;
    } else {
        activeDiv = document.createElement('div');
        activeDiv.textContent = count > 1 ? `${text}[${count}]` : text;
        activeDiv.style.position = 'absolute';
        activeDiv.style.bottom = '100%';
        activeDiv.style.left = '0';
        activeDiv.style.transform = 'translateX(0)';
        activeDiv.style.backgroundColor = 'rgba(0,0,0,0)';
        activeDiv.style.borderRadius = '4px';
        activeDiv.style.marginBottom = '10px';
        activeDiv.style.marginLeft = '10px';
        activeDiv.style.maxWidth = '420px';
        activeDiv.style.padding = '2px 1px';
        activeDiv.style.width = 'max-content';
        activeDiv.style.transition = 'bottom 0.5s ease-in-out, opacity 0.5s ease-in-out, filter 0.5s ease-in-out';
        activeDiv.style.fontFamily = 'Ubuntu, sans-serif';
        activeDiv.style.fontSize = '24px';
        activeDiv.style.color = 'white';
        activeDiv.style.display = 'flex';
        activeDiv.style.alignItems = 'center';
        activeDiv.style.justifyContent = 'center';
        activeDiv.style.boxShadow = '0 0 4px 2px rgba(0,0,0,0)';
        activeDiv.style.textAlign = 'left';

        container.appendChild(activeDiv);
    }

    clearTimeout(activeDiv.timeout);
    activeDiv.style.opacity = '1';
    activeDiv.style.filter = 'blur(0px)';
    activeDiv.timeout = setTimeout(function() {
        activeDiv.style.opacity = '0';
        activeDiv.style.filter = 'blur(5px)';
        setTimeout(function() {
            container.removeChild(activeDiv);
            activeDiv = null;
        }, 500);
    }, 750);
}


function setupReverseMenu() {
    toggleReverseMenu = section.querySelector('#reverseMenuCheckbox');

    const applyReverseMenuStyles = () => {
        if (toggleReverseMenu.checked) {
            const style = document.createElement('style');
            style.id = 'reverseMenuStyles';
            style.textContent = `
                #player-container[data-v-5190ae12], .relative[data-v-5190ae12] {
                    position: relative;
                    grid-row: 2 / 4;
                    grid-column: 2 / 3;
                }
                .tab-menu.fade-box.two[data-v-5208baf4] {
                    grid-row: 2/4;
                    grid-column: 3/ span 1;
                }
                .tab-menu.fade-box[data-v-5208baf4]{
                grid-row: 2 / 3;
                grid-column: 1 / 2;
                }
                .account-wrapper.fade-box[data-v-5208baf4]{
                grid-column: 1 / 2;
                }
            `;
            document.head.appendChild(style);
        } else {
            const existingStyle = document.getElementById('reverseMenuStyles');
            if (existingStyle) {
                existingStyle.remove();
            }
        }
    };

    if (localStorage.getItem('reverseMenuChecked') === 'true') {
        toggleReverseMenu.checked = true;
        applyReverseMenuStyles();
    }

    toggleReverseMenu.addEventListener('change', () => {
        applyReverseMenuStyles();
        localStorage.setItem('reverseMenuChecked', toggleReverseMenu.checked);
    });
}
       var styleItem51 = document.createElement("style");
       styleItem51.appendChild(document.createTextNode(`
.tab-menu.fade-box.two[data-v-5208baf4]{
    grid-column: 1/2;
    grid-row: 2/4 !important;
}
#player-container[data-v-5190ae12],.relative[data-v-5190ae12] {
    grid-column: 2/3;
    grid-row: 2/4;
}
.account-wrapper.fade-box[data-v-5208baf4]{
    grid-column: 3/4;
    grid-row: 2/3;
}
.tab-menu.fade-box[data-v-5208baf4]{
    grid-column: 3/4;
    grid-row: 3/4 !important;
}
`));
document.head.appendChild(styleItem51);
function setupAccountBelow() {
    toggleAccountBelow = section.querySelector('#accountBelowCheckbox');

    const applyAccountBelowStyles = () => {
        if (toggleAccountBelow.checked) {
            const style = document.createElement('style');
            style.id = 'accountBelowStyles';
            style.textContent = `
                .account-wrapper[data-v-520f1371] {
                    padding: 15px 16px;
                    grid-row: 3/4 !important;
                }
                .tab-menu.fade-box[data-v-5208baf4]{
                grid-row: 2/3 !important;
                }
                #main-container[data-v-5208baf4] {
                    grid-template-rows: 110px 300px 146px;
                }
                .tab-menu.fade-box.two[data-v-5208baf4]{
                grid-row: 2/4 !important;
                }
            `;
            document.head.appendChild(style);
        } else {
            const existingStyle = document.getElementById('accountBelowStyles');
            if (existingStyle) {
                existingStyle.remove();
            }
        }
    };

    if (localStorage.getItem('accountBelowChecked') === 'true') {
        toggleAccountBelow.checked = true;
        applyAccountBelowStyles();
    }

    toggleAccountBelow.addEventListener('change', () => {
        applyAccountBelowStyles();
        localStorage.setItem('accountBelowChecked', toggleAccountBelow.checked);
    });
}

(function() {
    const styleItem = document.createElement("style");
    styleItem.textContent = styles;
    document.head.appendChild(styleItem);

    smallContainer = createSmallContainer();
    const containers = document.querySelectorAll('.container[data-v-ba56a55e]');
    const container = containers[0];
    if (container) {
        container.appendChild(smallContainer);
    }

    section = createSection();
    smallContainer.appendChild(section);

    setupMoveLinks();
    setupCustomThemeButton();
    setupHideSocialContainer();
    setupDateDisplay();
    setupPressedKeys();
    setupMousePos();
    setupReverseMenu();
    setupAccountBelow();
})();
    }
    setTimeout(startTimer, 20000);

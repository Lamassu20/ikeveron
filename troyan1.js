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

let smallContainer, toggleUkkoTheme, section, privacyLink, tosLink, moveLinksCheckbox, hideSocialContainerCheckbox, toggleDateCheckbox, togglePressedKeysCheckbox, toggleMousePos, toggleReverseMenu, toggleAccountBelow, dateElement, minimapStatsElement;
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
.zxc2 {
  position: absolute;
  background-color: #ffffff00;
  padding-right: 7px;
  padding-top: 5px;
  font-family: Ubuntu, sans-serif;
  font-size: 14px;
  color: #dadada;
  text-align: right;
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

function setupShowStatsColor() {
    const toggleStatsColorCheckbox = section.querySelector('#showStatsColorCheckbox');

    const applyStatsColor = () => {
        if (toggleStatsColorCheckbox.checked) {
            intervalId = setInterval(updateStatsColors, 1);
        } else {
            clearInterval(intervalId);
            resetStatsColor();
        }
    };

    if (localStorage.getItem('showStatsColorChecked') === 'true') {
        toggleStatsColorCheckbox.checked = true;
        applyStatsColor();
    }

    toggleStatsColorCheckbox.addEventListener('change', () => {
        applyStatsColor();
        localStorage.setItem('showStatsColorChecked', toggleStatsColorCheckbox.checked);
    });
}

function resetStatsColor() {
    var statsElement = document.querySelector('.stats');

    if (statsElement) {
        var fpsDiv = statsElement.querySelector('div:nth-child(1)');
        var pingDiv = statsElement.querySelector('div:nth-child(2)');

        if (fpsDiv) {
            fpsDiv.style.color = 'white';
        }

        if (pingDiv) {
            pingDiv.style.color = 'white';
        }
    }
}


function updateStatsColors() {
    var statsElement = document.querySelector('.stats');

    if (statsElement) {
        var fpsDiv = statsElement.querySelector('div:nth-child(1)');
        if (fpsDiv) {
            var fpsValue = fpsDiv.textContent.trim().split(':')[1].trim();
            var fpsInt = parseInt(fpsValue);
            if (!isNaN(fpsInt)) {
                if (fpsInt <= 40) {
                    fpsDiv.style.color = "#ffaaaa"; // хуйня
                } else if (fpsInt <= 120) {
                    fpsDiv.style.color = "#aaffaa"; // норм
                } else if (fpsInt <= 1000) {
                    fpsDiv.style.color = "#aaffff"; // все пиздато
                }
            }
        }
        var pingDiv = statsElement.querySelector('div:nth-child(2)');
        if (pingDiv) {
            var pingValue = pingDiv.textContent.trim().split(':')[1].trim();
            var pingInt = parseInt(pingValue);
            if (!isNaN(pingInt)) {
                if (pingInt <= 40) {
                    pingDiv.style.color = "#aaffff"; // все пиздато
                } else if (pingInt <= 120) {
                    pingDiv.style.color = "#aaffaa"; // норм
                } else if (pingInt <= 1000) {
                    pingDiv.style.color = "#ffaaaa"; // хуйня
                }
            }
        }
    }
}

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
                ${createCheckbox('reverseMenuCheckbox', 'Reversed Menu')}
                ${createCheckbox('accountBelowCheckbox', 'Account Below')}
            </div>
            <div class="settings-column-2">
                ${createCheckbox('showStatsColorCheckbox', 'Show Stats Color')}
                ${createCheckbox('toggleDateCheckbox', 'Show Current Date')}
                ${createCheckbox('togglePressedKeysCheckbox', 'Show Pressed Keys')}
                ${createCheckbox('toggleMousePos', 'Show Mouse Position')}
                ${createCheckbox('toggleUkkoTheme', '⋆｡‧₊°♱༺𓆩❦𓆪༻♱༉‧₊˚.')}
            </div>
        </div>
    `;
    return section;
}

function applyUkkoThemeStyles(isChecked) {
    // Define your custom CSS styles here
    const customCss = `
.show-stuck[data-v-0b6441fe] {color: #ffffff00;}
.box-1[data-v-0b6441fe] {height: 301px;background: #dadada00;margin-bottom: 0px;font-size: 0px;text-align: center}
.fade-box {box-shadow: 0 0 4px 2px #fff0!important}
#ext-options-menu{background: #ffffff00!important}
.scroll[data-v-0b6441fe] {animation-duration: 0s;animation-name: scroll-0b6441fe;animation-timing-function: linear;overflow: visible}
@keyframes scroll-0b6441fe {0% {height: 133px;opacity: 1}50% {height: 133px;opacity: 1}to { height: 133px; opacity: 1}}
.menu-enter-active[data-v-0b6441fe] {transition: all .2s ease}.menu-enter[data-v-0b6441fe] {opacity: 1;transform: scale(1)}
.btn[data-v-73f7fbfc] {background: #ffffff00;border: 0;border-radius: 0px;box-shadow: 0 0 4px 2px #fff0;color: #ffffff00;cursor: pointer;font-size: 16px;outline: none;padding: 5px;text-shadow: 0 0 2px #fff0;width: 100%}
.btn[data-v-73f7fbfc]:hover {transition: .4s cubic-bezier(0.4, 0, 1, 1);background: #ffffff00;color: #fff;text-shadow: 0 0 12px #fff;}
.btn[data-v-73f7fbfc]:active {background: #ffffff00;color: #fff0;text-shadow: 0 0 12px #fff0;}
.btn[data-v-73f7fbfc]:disabled {background: #ffffff00;color: #fff0;text-shadow: 0 0 12px #fff0;}
#player-container #game-buttons #play-button[data-v-5190ae12] {background: #ffffff00;border: 0;border-radius: 0px;box-shadow: 0 0 4px 2px #fff0;color: #ffffff00;cursor: pointer;font-size: 16px;outline: none;padding: 5px;text-shadow: 0 0 2px #fff0;width: 100%}
#player-container #game-buttons #play-button[data-v-5190ae12]:hover {transition: .4s cubic-bezier(0.4, 0, 1, 1);background: #ffffff00;  color: #fff;   text-shadow: 0 0 12px #fff;}
#player-container #game-buttons #play-button[data-v-5190ae12]:active {    background: #ffffff00;    color: #fff0;    text-shadow: 0 0 12px #fff0;}
#player-container #game-buttons #play-button[data-v-5190ae12]:disabled {    background: #ffffff00;    color: #fff0;    text-shadow: 0 0 12px #fff0;}
#player-container #game-buttons #spec-button[data-v-5190ae12] {background: #ffffff00;border: 0;border-radius: 0px;box-shadow: 0 0 4px 2px #fff0;color: #ffffff00;cursor: pointer;font-size: 16px;outline: none;flex: 1;padding: 5px;text-shadow: 0 0 2px #fff0;width: 100%}
#player-container #game-buttons #spec-button[data-v-5190ae12]:hover {    transition: .4s cubic-bezier(0.4, 0, 1, 1);    background: #ffffff00;    color: #fff;    text-shadow: 0 0 12px #fff;}
#player-container #game-buttons #spec-button[data-v-5190ae12]:active {    background: #ffffff00;    color: #fff0;    text-shadow: 0 0 12px #fff0;}
#player-container #game-buttons #spec-button[data-v-5190ae12]:disabled {    background: #ffffff00;    color: #fff0;    text-shadow: 0 0 12px #fff0;}
.server-button[data-v-67f43bc8] {    background: #ffffff00;    border: 0;    border-radius: 0px;    box-shadow: 0 0 4px 2px #fff0;    color: #ffffff00;    cursor: pointer;    font-size: 16px;    font-size: 14px;    outline: none;    padding: 5px;    text-shadow: 0 0 2px #fff0;}
.server-button[data-v-67f43bc8]:hover {    transition: .4s cubic-bezier(0.4, 0, 1, 1);    background: #ffffff00;    color: #fff;    text-shadow: 0 0 12px #fff;}
.server-button[data-v-67f43bc8]:active {    background: #ffffff00;    color: #fff0;    text-shadow: 0 0 12px #fff0;}
.server-button[data-v-67f43bc8]:disabled {    background: #ffffff00;    color: #fff;    text-shadow: 0 0 12px #fff0;}
.confirm-button[data-v-2c5139e0] {background: #ffffff00;border: 0;border-radius: 0px;box-shadow: 0 0 4px 2px #fff0;color: #ffffff00;cursor: pointer;font-size: 16px;outline: none;padding: 5px 9px;text-shadow: 0 0 2px #fff0;}
.confirm-button[data-v-2c5139e0]:hover {transition: .4s cubic-bezier(0.4, 0, 1, 1);background: #ffffff00;color: #fff;text-shadow: 0 0 12px #fff;}
.confirm-button[data-v-2c5139e0]:active {background: #ffffff00;color: #fff0;text-shadow: 0 0 12px #fff0;}
.confirm-button[data-v-2c5139e0]:disabled {background: #ffffff00;color: #fff0;text-shadow: 0 0 12px #fff0;}
.perk-color-update[data-v-2c5139e0] {    background: #ffffff00;    border: 0;    border-radius: 0px;    box-shadow: 0 0 4px 2px #fff0;    color: #ffffff00;    cursor: pointer;    font-size: 16px;    grid-row: 2;    outline: none;    padding: 5px;    text-shadow: 0 0 2px #fff0;}
.perk-color-update[data-v-2c5139e0]:hover {    transition: .4s cubic-bezier(0.4, 0, 1, 1);    background: #ffffff00;    color: #fff;    text-shadow: 0 0 12px #fff;}
.perk-color-update[data-v-2c5139e0]:active {    background: #ffffff00;    color: #fff0;    text-shadow: 0 0 12px #fff0;}
.perk-color-update[data-v-2c5139e0]:disabled {    background: #ffffff00;    color: #fff0;    text-shadow: 0 0 12px #fff0;}
.color-button[data-v-e11a74f8] {    border: 0px solid #ffffff;    box-shadow: 0 0 2px 1px #ffffff00;    border-radius: 0px;    cursor: pointer;    display: inline-block;    height: 30px;    width: 30px}
input[type=number],input[type=text],select {    background: rgb(0 0 0 / 0%);    border: 1px solid #fff0;    border-radius: 0px;    box-sizing: border-box;    color: #ffffffba;    display: block;    outline: 0;    padding: 5px;    width: 100%}
.confidential {    color: transparent!important;    text-shadow: 0 0 5px hsl(0deg 0% 85% / 0%);    transition: all .8s}
.confidential:focus,.confidential:hover {    color: #ffffffb5!important;    text-shadow: none}
#nickname[data-v-5190ae12] {flex: 2;margin-right: 10px;    color: transparent!important;        text-shadow: 0 0 5px hsl(0deg 0% 85% / 0%);        transition: all .8s}
#nickname[data-v-5190ae12]:focus,#nickname[data-v-5190ae12]:hover {        color: #ffffffb5!important;        text-shadow: none}
.tabs[data-v-5190ae12] {border-bottom: 2px solid #fff0;font-size: 20px}
.tab[data-v-5190ae12]:not(:last-child) {border-right: 2px solid #fff0}
.tab[data-v-5190ae12] {    cursor: pointer;    color: #fff0;    flex: 1;    padding: 9px;    text-align: center;    width: 55px}
.tab[data-v-5190ae12]:hover {    transition: .6s cubic-bezier(0.4, 0, 1, 1);    background: #ffffff00;    color: #ffffff;    text-shadow: 0 0 8px #fff;}
#player-container #player-data>[data-v-5190ae12] {    margin-bottom: 10px;    color: #fff0;}
.logout_[data-v-520f1371] {    cursor: pointer;    color: #fff0;    display: inline-block;    position: absolute;    right: 0;    top: 0}
.logout_[data-v-520f1371]:hover{    transition: all .2s cubic-bezier(0.4, 0, 1, 1);        background: #ffffff00;        color: #ffffff;    text-shadow: 0 0 8px #fff;}
.account-name[data-v-520f1371] {    display: flex;    flex-direction: row;    font-size: 28px;    font-weight: 700;    overflow: hidden;    text-overflow: ellipsis;    white-space: nowrap;    width: 168px;}
.player-info[data-v-520f1371] {    display: inline-block;    font-size: 14px;    color: #fff0;    display: inline-block;    vertical-align: top}
.player-info[data-v-520f1371]:hover{        transition: all .2s cubic-bezier(0.4, 0, 1, 1);            background: #ffffff00;            color: #ffffff;        text-shadow: 0 0 8px #fff0;}
.avatar[data-v-520f1371] {        border-radius: 0px;        box-shadow: 0 0 8px 1px #fff0;        margin-right: 8px;        width: 80px}
::-webkit-scrollbar {width: 0px}
.tab-menu .tabs[data-v-2eade0fe] {    border-bottom: 2px solid #fff0;    display: flex;    font-size: 18px}
.tab-menu .tab[data-v-2eade0fe]:not(:last-child) {border-right: 2px solid #ffffff00}
.tab-menu .tab.active[data-v-2eade0fe] {    background: rgb(255 255 255 / 0%)}
.badge-list[data-v-637ffd77] {    display: inline-flex;    flex-direction: row;    margin-right: 3px;  flex-wrap: wrap;}
.badge-icon.dim[data-v-637ffd77] {    filter: brightness(60%) grayscale(10%)}
.badge-icon.not-pickable[data-v-637ffd77] {    cursor: not-allowed;    filter: brightness(40%) grayscale(90%)}
.perks-tab-badge.using[data-v-2eade0fe] {background-color: #ffffff00;    box-shadow: 0 0 4px 2px #f0f0f000;}
.perks-tab-badge.unused[data-v-2eade0fe] {background-color: #ffffff00;    box-shadow: 0 0 4px 2px #f0f0f000;}
.perks-tab-badge.using[data-v-2eade0fe]:hover {    transition: .4s cubic-bezier(0.4, 0, 1, 1);     background-color: #ffffff;    box-shadow: 0 0 4px 2px #f0f0f0;}
.perks-tab-badge.unused[data-v-2eade0fe]:hover {    transition: .4s cubic-bezier(0.4, 0, 1, 1);     background-color: #909090;    box-shadow: 0 0 4px 2px #909090;}
.warning[data-v-2c5130o9e0] {    color: #ffffff}
.section[data-v-2c5139e0] {    border: 2px solid #fff0;    border-radius: 0px;    overflow: hidden}
.section>.header[data-v-2c5139e0] {    background: rgb(255 255 255 / 0%);    border-bottom: 2px solid #fff0;    padding: 7px}
.section[data-v-c41b640a] {    border: 2px solid #fff0;    border-radius: 0px;    overflow: hidden}
.section>.header[data-v-c41b640a] {    background: rgb(255 255 255 / 0%);    border-bottom: 2px solid #fff0;    padding: 7px}
.section[data-v-4dcda2ec] {    border: 2px solid #fff0;    border-radius: 0px;    overflow: hidden}
.section>.header[data-v-4dcda2ec] {    background: rgb(255 255 255 / 0%);    border-bottom: 2px solid #fff0;    padding: 7px}
input[type=number]:disabled,input[type=text]:disabled,select:disabled {    color: #ffffffab}
.section[data-v-0a751125] {    border: 2px solid #fff0;    border-radius: 0px;    overflow: hidden}
.section>.header[data-v-0a751125] {    background: rgb(255 255 255 / 0%);    border-bottom: 2px solid #fff0;    padding: 7px}
.section[data-v-4dcda2ec] {    border: 2px solid #fff0;    border-radius: 8px;    overflow: hidden}
.section>.header[data-v-4dcda2ec] {    background: rgb(255 255 255 / 0%);    border-bottom: 2px solid #fff0;    padding: 7px}
.button-row>.button {    background: #ffffff00;    border: 0;    border-radius: 0px;    box-shadow: 0 0 4px 2px #fff0;    color: #ffffff00;    cursor: pointer;    font-size: 16px;    font-size: 14px;    outline: none;    padding: 5px;    text-shadow: 1px 1px 2px #fff0}
.button-row>.button:hover {    transition: .4s cubic-bezier(0.4, 0, 1, 1);    background: #ffffff00;    color: #fff;    text-shadow: 0 0 12px #fff;}
.button-row>.button:active,.button-row>.button:disabled {background: #ffffff00;    color: #fff0;    text-shadow: 0 0 12px #fff0;}
.button-row>.button:disabled {    background: #ffffff00;    color: #fff;    text-shadow: 0 0 12px #fff0;}
.button-row {    border-bottom: 2px solid #fff0;    display: flex;    justify-content: space-between;    padding: 7px 6px 6px}
.swal2-styled.swal2-confirm {    background: initial;    background-color: #ffffff00;    border: 0;    border-radius: 0;    color: #fff;    font-size: 15px}
.swal2-styled.swal2-cancel {    background: initial;    background-color: rgb(255 255 255 / 0%);    border: 0;    border-radius: 0;    color: #fff;    font-size: 15px}
.swal2-actions:not(.swal2-loading) .swal2-styled:hover {    background: #fff0;    text-shadow: 0 0 7px #fff;    transition: .4s cubic-bezier(0.4, 0, 1, 1);}
.swal2-select {    background: #ffffff00;    border: 0;    border-radius: 0px;    color: #ffffff;    text-shadow: 0 0 4px #fff0;    color: inherit;    font-size: 15px;    max-width: 100%;    min-width: 50%;    padding: .375em .625em}
.lobby-list[data-v-67f43bc8] {    border-right: 2px solid #fff0;    margin-right: 6px;    width: 300px}
.lobby-chat[data-v-67f43bc8] {    border-left: 2px solid #fff0;    margin-left: 6px;    width: 300px}
.lobby-list>.row[data-v-fa675f88] {    border-bottom: 2px solid #fff0;    cursor: pointer;    display: flex;    justify-content: space-between;    padding: 10px}
.tab-menu .tab[data-v-752a3ab7]:not(:last-child) {    border-right: 2px solid #fff0}
.tab-menu .tabs[data-v-752a3ab7] {    border-bottom: 2px solid #fff0;    display: flex;    font-size: 18px}
.server-list-item[data-v-752a3ab7] {    border-bottom: 2px solid #fff0;    background: #ffffff00;    border: 0;    border-radius: 0px;   box-shadow: 0 0 4px 2px #0000;    color: #ffffffba;    text-shadow: 0 0 2px #fff0;    cursor: pointer;  display: flex;    padding: 10px;    user-select: none}
.server-list-item[data-v-752a3ab7]:hover {    transition: .2s cubic-bezier(0.4, 0, 1, 1);    background: #ffffff00;    color: #ffffffc4;    text-shadow: 0 0 3px #ffffffc4;}
.server-list-item.active[data-v-752a3ab7],.server-list-item.active[data-v-752a3ab7]:hover {    background: #ffffff00;    color: #fff;    text-shadow: 0px 0px 7px #fff;}
#hotkey-container .row[data-v-14acee54]:not(:last-child) {    border-bottom: 2px solid #fff0}
#hotkey-container .footer[data-v-14acee54] {    border-top: 2px solid #fff0;    color: white;    display: flex;    justify-content: center;    padding: 10px}
.reset-option[data-v-c41b640a] {    color: white;    cursor: pointer;    display: inline-flex;    justify-content: center}
.reset-option[data-v-4dcda2ec] {    color: white;    cursor: pointer;    display: inline-flex;    justify-content: center}
.reset-option[data-v-4dcda2ec] {    color: white;    cursor: pointer;    display: inline-flex;    justify-content: center}
.tab-menu .tab:not(:last-child) {    border-right: 2px solid #fff0}
.tab-menu .tab.active {    background: rgb(255 255 255 / 0%)}
.pretty.p-switch .state:before {    background: #ffffff00}
.tab-menu .tabs {    border-bottom: 2px solid #fff0;    display: flex;    font-size: 18px}
::-webkit-scrollbar-thumb {    background-color: #ffffff29;    border-radius: 10px;    box-shadow: 0 0 0px rgb(255 255 255 / 30%);}
::-webkit-scrollbar-track {    background: rgb(255 255 255 / 0%)}
.tab-menu .tabs[data-v-752a3ab7] {color: #fff0;}
.tab-menu .tabs[data-v-752a3ab7]:hover {    transition: all 0.4s cubic-bezier(0.4, 0, 1, 1);    background: #ffffff00;    color: #ffffff;            text-shadow: 0 0 8px #fff;}
.tab-menu .tab.active[data-v-752a3ab7] {    background: rgb(255 255 255 / 0%)}
.open-lobbies[data-v-752a3ab7] {    background: hsl(0deg 0% 100% / 0%)}
.tab-menu .tab[data-v-2eade0fe] {    cursor: pointer;    flex: 1;    padding: 7px;    position: relative;    text-align: center;    background: #ffffff00;    border: 0;    border-radius: 0px;    box-shadow: 0 0 4px 2px #fff0;    color: #ffffff00;    text-shadow: 0 0 2px #fff0;    border-right: 2px solid #ffffff00}
.tab-menu .tab[data-v-2eade0fe]:hover{    transition: .4s cubic-bezier(0.4, 0, 1, 1);    background: #ffffff00;    color: #fff;    text-shadow: 0 0 12px #fff;}
#skins[data-v-2eade0fe] {    grid-gap: 10px;    box-sizing: border-box;    display: grid;    grid-auto-rows: 1fr;    grid-template-columns: 1fr 1fr 1fr;    min-width: 100%;    padding: 10px}
.skin-container[data-v-2eade0fe] {    display: flex;    position: relative}
.skin[data-v-2eade0fe] {    border: 0px solid #ffffff00;    border-radius: 100%;    box-shadow: 0 0 6px 2px #fff0;    box-sizing: border-box;    cursor: pointer;    width: 100%}
.skin-remove-button[data-v-2eade0fe] {    display: none}
.skin-container:hover .skin-remove-button[data-v-2eade0fe] {    border-radius: 50%;    cursor: pointer;    display: inline;    font-size: 15px;    position: absolute;    right: -3px;    top: -3px}
.skin.add-skin[data-v-2eade0fe] {    background:    rgb(255 255 255 / 3%)}
.selected[data-v-2eade0fe] {    box-shadow: 0 0 7px 0px white}
#main-container[data-v-5208baf4] {    grid-row-gap: 0px;    grid-column-gap: 0px;    display: grid;    grid-template-columns: 308px 346px 308px;    grid-template-rows: 118px 162px 308px;    left: 50%;    margin-left: -481px;    margin-top: -240px;    position: absolute;  top: 38%}
.fade-box {border-radius: 0px}
.swal2-title {    text-shadow: 0px 0px 5px #fff}
#overlay {    background: radial-gradient(rgb(140 140 140 / 15%) 300px,rgb(0 0 0 / 42%));}
.xp-progress[data-v-520f1371] {    margin-top: 19px;    margin-left: -7px;    margin-right: -7px}
.xp-data[data-v-520f1371] {    color: #fff;    display: flex;    position: absolute;    text-shadow: 0 0 5px #fff;    top: 5px;    width: 100%}
.progress[data-v-5f2d6d72] {    background:    rgb(255 255 255 / 3%);    border-radius: 0px;    box-shadow: inset 0 1px 2px rgb(255 255 255 / 0%),0 1px hsl(0deg 0% 100% / 0%);    padding: 0px}
.progress-bar[data-v-5f2d6d72] {    background-color: #ff0010;    border-radius: 0px;    height: 33px}
.progress-striped .progress-bar[data-v-5f2d6d72] {    background:    rgb(255 255 255 / 3%)}
.tooltip[data-v-7d20daa3] {    background: #ffffff00}
.fade-box.scroll {background: #ffffff00}
.swal2-popup {background: #ffffff00!important}
.tab-menu[data-v-5208baf4] {    background: #ffffff00;}
#player-container[data-v-5190ae12],.relative[data-v-5190ae12] {    background: #ffffff00;}
.account-wrapper[data-v-520f1371] {background: #ffffff00}
@keyframes swal2-toast-show {    0% {        transform: none    }    33% {        transform: none    }    66% {        transform: none    }    to {        transform: none    }}
@keyframes swal2-toast-hide {    to {        transform: none    }}
@keyframes swal2-toast-animate-success-line-tip {    0% {        transform: none    }    54% {        transform: none    }    70% {        transform: none    }    84% {        transform: none    }    to {        transform: none    }}
@keyframes swal2-toast-animate-success-line-long {    0% {        transform: none    }    65% {        transform: none    }    84% {        transform: none    }    to {        transform: none    }}
@keyframes swal2-animate-success-line-tip {    0% {        transform: none    }    54% {        transform: none    }    70% {        transform: none    }    84% {        transform: none    }    to {        transform: none    }}
@keyframes swal2-animate-success-line-long {    0% {        transform: none    }    65% {        transform: none    }    84% {        transform: none    }    to {        transform: none    }}
@keyframes swal2-rotate-success-circular-line {    0% {        transform: none    }    5% {        transform: none    }    12% {        transform: none    }    to {        transform: none    }}
@keyframes swal2-animate-error-x-mark {    0% {        transform: none    }    50% {        transform: none    }    80% {        transform: none    }    to {        transform: none    }}
@keyframes swal2-animate-error-icon {    0% {        transform: none    }    to {        transform: none    }}@keyframes swal2-rotate-loading {    0% {        transform: none    }    to {        transform: none    }}
.swal2-popup {    box-shadow: 0 0 4px 2px #ffffff6b!important}
.content[data-v-73ccaaca] {    border-radius: 0px;    background: #ffffff00;}
.warning[data-v-fa675f88] {    color: #ffffff;    text-shadow: 0 0 5px #fff;}
.warning[data-v-0a751125] {    color: #ffffff;    text-shadow: 0 0 5px #fff;}
.lobby-connecting[data-v-fa675f88] {background: rgb(255 255 255 / 0%);}
.pretty.p-switch .state:before {    border: 1px solid #ffffff50;}
.slider[data-v-4dcda2ec] {    -webkit-appearance: none;    background: #ffffff00;    border: 1px solid #ffffff50;}
.pretty.p-switch input:checked~.state:before {    border-color: #ffffff!important}
.pretty.p-switch input:checked~.state label:after {    background-color: #ffffff!important}
.slider[data-v-4dcda2ec]::-webkit-slider-thumb {    -webkit-appearance: none;    appearance: none;    background: rgb(255 255 255 / 85%);    border-radius: 60px    cursor: pointer;    height: 15px;    width: 15px}
.discord[data-v-520f1371] {    background: #ffffff00;    border: 1px solid #fff0;    border-radius: 0px;    color: #ffffff;}
.slider[data-v-4dcda2ec] {    background: #ffffff00;    border: 1px solid #ffffff;}
.slider.draw-delay[data-v-4dcda2ec] {    background: linear-gradient(45deg,rgb(255 0 0 / 0%),#12121200 35%)}
.slider[data-v-4dcda2ec]::-webkit-slider-thumb {    background: #ffffff;}
.chatbox[data-v-7264abb4] {    border-radius: 0px;    background: rgb(255 255 255 / 0%);}
.chatbox>input[data-v-7264abb4] {    background: transparent;}
.chatbox[data-v-7264abb4] {    box-shadow: 0 0 4px 2px #fff0!important}
#leaderboard[data-v-7e7860a8] {    background: rgb(255 255 255 / 0%);    border-radius: 0px;}
#leaderboard[data-v-7e7860a8] {    box-shadow: 0 0 4px 2px #fff0!important}
.container[data-v-769dba30] {    background: rgb(255 255 255 / 0%);    border-radius: 0px}
.container[data-v-769dba30] {    box-shadow: 0 0 4px 2px #fff0!important}
.image-button[data-v-180f29a6] {    border: 1px solid #fff0;    border-radius: 0px;}
.slider[data-v-8dbe5024] {    -webkit-appearance: none;    background: #12121200;    border: 1px solid #ffffff;    border-radius: 60px;    box-sizing: border-box;    display: block;    outline: none;    padding: 1px;    transition: none;    width: 100%}
.slider[data-v-8dbe5024]::-webkit-slider-thumb {    -webkit-appearance: none;    appearance: none;    background: #ffffff;    border-radius: 60px;    cursor: pointer;    height: 15px;    width: 15px}
.slider[data-v-c41b640a] {    background: #ffffff00;    border: 1px solid #ffffff;}
.slider[data-v-c41b640a]::-webkit-slider-thumb {    background: #ffffff;}
.replay-list-header[data-v-11810f3c] {    background: linear-gradient(to right bottom,#ffffff00,#ffffff00);    border-bottom: 2px solid #fff0;    box-shadow: 0 0 10px 1px #0000;}
.vanis-button {background: #ffffff00;    border: 0;    border-radius: 0px;    box-shadow: 0 0 4px 2px #fff0;    color: #ffffff00;    cursor: pointer;    outline: none;    padding: 5px 10px;    text-decoration: none;    text-shadow: 0 0 2px #fff0;}
.vanis-button,.vanis-button:active {    transition: .4s cubic-bezier(0.4, 0, 1, 1);    background: #ffffff00;    color: #fff;    text-shadow: 0 0 5px #fff;}
.vanis-button:active {    transition: .4s cubic-bezier(0.4, 0, 1, 1);    background: #ffffff00;    color: #fff;    text-shadow: 0 0 5px #fff;}
.vanis-button:disabled {    transition: .4s cubic-bezier(0.4, 0, 1, 1);    background: #ffffff00;    color: #fff;    text-shadow: 0 0 5px #fff;}
.replay-item[data-v-1dc3fbb4] {    background-position: 50% 50%;    background-size: cover;    border: 0px solid #fff0;    border-radius: 0px;    box-shadow: 2px 2px 5px 1px #fff0;    cursor: pointer;    overflow: hidden;    position: relative}
.replay-header[data-v-1dc3fbb4] {    background: rgb(0 0 0 / 40%);    border-bottom: 1px solid #fff0;}
.replay-list-page>.anchor .current>.real-input>input[data-v-11810f3c] {    background: #fff0;}
.social-container[data-v-3d4cb83d] {}
.bulk-operation-overlay>.small.warning[data-v-11810f3c] {    color: #ffffff00}
input[type=number][data-v-2c5139e0] {    background: rgb(0 0 0 / 0%);    border: 1px solid #fff0;}
.fade-box, .replay-list-header, .swal2-popup, .tooltip {    background: #ffffff00; !important;}
.section[data-v-8dbe5024] {    border: 2px solid #0000;    border-radius: 8px;    overflow: hidden}
.section>.header[data-v-8dbe5024] {    background: rgb(0 0 0 / 0%);    border-bottom: 2px solid #0000;    padding: 7px}
    `;

    // Remove existing styles
    const existingStyles = document.querySelectorAll('style[id^="ukko-theme-"]');
    existingStyles.forEach(style => style.remove());

    // Apply new styles if the checkbox is checked
    if (isChecked) {
        const styleElement = document.createElement('style');
        styleElement.id = 'ukko-theme-styles';
        styleElement.textContent = customCss;
        document.head.appendChild(styleElement);
    }
}

function setupUkkoTheme() {
    const toggleUkkoTheme = section.querySelector('#toggleUkkoTheme');

    // Function to handle the checkbox state
    const handleUkkoThemeChange = () => {
        const isChecked = toggleUkkoTheme.checked;
        applyUkkoThemeStyles(isChecked);
        localStorage.setItem('toggleUkkoThemeChecked', isChecked);
    };

    // Check localStorage for the initial state
    const storedState = localStorage.getItem('toggleUkkoThemeChecked');
    if (storedState === 'true') {
        toggleUkkoTheme.checked = true;
        applyUkkoThemeStyles(true);
    } else {
        toggleUkkoTheme.checked = false;
        applyUkkoThemeStyles(false);
    }

    // Add event listener for changes
    toggleUkkoTheme.addEventListener('change', handleUkkoThemeChange);
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


// Настройка юзерскрипта
(function() {
    // Убедитесь, что скрипт запускается после загрузки DOM
    document.addEventListener('DOMContentLoaded', function() {
        // Находим canvas элемент, который используется для рисования
        var canvas = document.querySelector('canvas'); // Замените на ваш canvas селектор, если необходимо
        if (!canvas) {
            console.error('Canvas элемент не найден!');
            return;
        }

        var ctx = canvas.getContext('2d');

        // Предположим, что `p` - это массив объектов с координатами и радиусами
        // Если `p` действительно не определен, создаем тестовый массив `p` для демонстрации
        var p = window.p || [
            {x: 10, y: 10, radius: 5},
            {x: 20, y: 20, radius: 10}
        ];

        // Функция для изменения параметров рисования
        function modifyDrawing() {
            // Сохраняем оригинальные параметры заливки и прозрачности
            var originalFillStyle = ctx.fillStyle;
            var originalGlobalAlpha = ctx.globalAlpha;

            // Изменяем параметры функции f(t)
            function f(t) {
                ctx.beginPath();
                ctx.fillStyle = "#ffffff"; // Белый цвет заливки
                ctx.globalAlpha = 0.9; // Прозрачность 0.9

                p.forEach(function(e) {
                    // Проверяем наличие координат и радиуса в объекте
                    if (e.x !== undefined && e.y !== undefined && e.radius !== undefined) {
                        var newX = e.x * 4; // Увеличиваем координаты x в 4 раза
                        var newY = e.y * 4; // Увеличиваем координаты y в 4 раза
                        var newRadius = e.radius * 4; // Увеличиваем радиус в 4 раза

                        ctx.moveTo(newX, newY);
                        ctx.arc(newX, newY, newRadius, 0, 2 * Math.PI);
                    } else {
                        console.warn('Неправильный формат объекта в массиве p:', e);
                    }
                });

                ctx.fill();

                // Восстанавливаем оригинальные параметры заливки и прозрачности
                ctx.fillStyle = originalFillStyle;
                ctx.globalAlpha = originalGlobalAlpha;
            }

            // Вызываем функцию f(t) для изменения рисунка
            f();
        }

        // Запускаем функцию изменения рисования
        modifyDrawing();
    });

})();



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
    mousePositionDiv.classList.add('zxc2');
    mousePositionDiv.style.position = 'absolute';
    mousePositionDiv.style.backgroundColor = '#ffffff00';
    mousePositionDiv.style.padding = '6px';
    mousePositionDiv.style.fontFamily = 'Ubuntu, sans-serif';
    mousePositionDiv.style.fontSize = '14px';
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
    if (!toggleMousePos.checked) return;
    const x = event.clientX;
    const y = event.clientY;
    mousePositionDiv.textContent = `𓍢ִ໋${x} ${y}ˡ`;
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
            button = 'LMB';
            break;
        case 1:
            button = 'MMB';
            break;
        case 2:
            button = 'RMB';
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
}
.tab-menu.fade-box[data-v-5208baf4]{
    grid-column: 3/4;
    grid-row: 3/4 !important;
}
#ext-options-menu{
    grid-row: 2/4;
    grid-column: 4/5;
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
                .account-wrapper[data-v-890f31b4] {
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
    setupUkkoTheme();
    setupReverseMenu();
    setupShowStatsColor();
    setupAccountBelow();
})();
    }
    setTimeout(startTimer, 1488);

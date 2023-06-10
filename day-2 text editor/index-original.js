const optionsButtons = document.querySelectorAll('.option-button')
const advancedOptionButton = document.querySelectorAll('.adv-option-button');
const fontName = document.getElementById('fontName');
const fontSizeRef = document.getElementById('fontSize');
const writingArea = document.getElementById('text-input');
const linkButton = document.getElementById('createLink');
const alignButtons = document.querySelectorAll('.align');
const spacingButtons = document.querySelectorAll('.spacing');
const formatButtons = document.querySelectorAll('.spacing');
const scriptButtons = document.querySelectorAll('.script');


const fontList = [
    "Arial",
    "Vandana",
    "Times New Roman",
    "Garamond",
    "Georgia",
    "Courier New",
    "Cursive"
];

const initiallizer = () => {
    highlighter(alignButtons, true);
    highlighter(spacingButtons, true);
    highlighter(formatButtons, true);
    highlighter(scriptButtons, true);

    fontList.map(value => {
        const option = document.createElement('option');
        option.value = value;
        option.innerHTML = value;
        fontName.appendChild(option);
    });
}

for (let i = 1; i <= 7; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    fontSizeRef.appendChild(option);
}

const modifyText = (command, defaultUI, value) => {
    document.execCommand(command, defaultUI, value);
}


advancedOptionButton.forEach((button) => {
    button.addEventListener('change', () => {
        modifyText(button.id, false, button.value);
    });
});

linkButton.addEventListener('click', () => {
    let userLink = prompt('Enter a URL?')
    if (/http/i.test(userLink)) {
        modifyText(linkButton.id, false, userLink);
    } else {
        userLink = "http://" + userLink;
        modifyText(linkButton.id, false, userLink);
    }
})


function highlighter(className, needsRemoval) {
    className.forEach(button => {
        button.addEventListener('click', () => {
            if (needsRemoval) {
                let alreadyActive = false;
                if (button.classList.contains('active')) {
                    alreadyActive = true;
                }
                highlighterRemover(className);

                if (!alreadyActive) {
                    button.classList.add('active');
                }
            } else {
                button.classList.toggle('active');
            }
        });
    })
}

function highlighterRemover(className) {
    className.forEach(button => {
        button.classList.remove('active');
    })
}

window.onload = initiallizer;
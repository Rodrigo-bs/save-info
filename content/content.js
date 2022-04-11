class InsertPanel {
    insertValue(element) {
        if (localStorage.getItem('materia')){
            element.querySelector('.input-get_infos').value = localStorage.getItem('materia')
        }

        return element;
    }

    insertInToBody(element) {
        document.body.appendChild(this.insertValue(element));
    }

    insertElements(container, elements) {
        elements.forEach(element => {
            container.appendChild(element);
        });

        return container;
    }

    createElements() {
        let container = this.createElement('div');
        let button = this.createElement('button');
        let buttonClose = this.createElement('button');
        let input = this.createElement('input');

        container.classList.add('container-get_infos');

        button.classList.add('button-get_infos');
        button.innerText = 'Baixar JSON';

        buttonClose.classList.add('button-close');
        buttonClose.innerText = '>';

        input.classList.add('input-get_infos');
        input.setAttribute('type', 'text');

        const finalContainer = this.insertElements(container, [input, button, buttonClose]);
        this.insertInToBody(finalContainer);
        
        this.addEvent();
    }

    createElement(elementHTML) {
        return document.createElement(elementHTML);
    }

    togglePanel(event) {
        document.querySelector("#ow3 > div.T4LgNb > div > div:nth-child(9) > div.crqnQb > div.UnvNgf.Sdwpn.P9KVBf > div.jsNRx > div.Ok4Bg > div > div > div:nth-child(2) > span > button").click();
        const container = document.querySelector('.container-get_infos');
        container.classList.toggle('active');
    }

    addEvent() {
        this.buttonClose = document.querySelector('.button-close');
        this.buttonClose.addEventListener('click', this.togglePanel);
    }

    init() {
       this.createElements(); 
    }
}

class CreateJson {
    constructor(materia) {
        this.usersContainer = document.querySelectorAll('.cxdMu');
        this.messagesContainer = document.querySelectorAll('.GDhqjd');
        this.materia = materia;
        this.data = [];

        this.data.push(materia);
    }

    getMessages(men, texts) {
        let dataMen = {
            name: men.getAttribute('data-sender-name'),
            message: [],
            date: men.getAttribute('data-timestamp')
        };

        texts.forEach(text => {
            dataMen.message.push(text.innerText);
        });

        return dataMen
    }

    getMessage(men) {
        let dataMen = {
            name: men.getAttribute('data-sender-name'),
            message: men.querySelector('[data-message-text]').getAttribute('data-message-text'),
            date: men.getAttribute('data-timestamp')
        };

        return dataMen;
    }

    getUsers() {
        let data = [];

        this.usersContainer.forEach(user => {   
            let userArray = {
                name: user.querySelector('.zWGUib').innerText,
                img: user.querySelector('.KjWwNd').src
            };

            data.push(userArray);
        });

        return data;
    }

    downloadJson(content, fileName, contentType) {
        var a = document.createElement("a");
        var file = new Blob([content], { type: contentType });
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
    }

    getDataMessages() {
        this.messagesContainer.forEach(men => {
            let messageText = men.querySelectorAll('[data-message-text]');

            console.log(men.querySelectorAll('[data-message-text]').length);

            if (men.querySelectorAll('[data-message-text]').length > 1) this.data.push(this.getMessages(men, messageText));
            else this.data.push(this.getMessage(men));
        });

        this.data.push(this.getUsers());

        let time = new Date().getTime();
        this.downloadJson(JSON.stringify(this.data), time + '.json', 'text/plain');
    }

    setMateria() {
        if (this.materia != null) {
            localStorage.setItem('materia', this.materia);
        }
    }

    init() {
        this.setMateria();
        this.getDataMessages();
    }
}

const insertPanel = new InsertPanel();
insertPanel.init();

const button = document.querySelector('.button-get_infos');

button.addEventListener('click', () => {
    const input = document.querySelector('.input-get_infos');

    const createJson = new CreateJson(input.value);
    createJson.init();
});
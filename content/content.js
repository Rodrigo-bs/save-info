class InsertPanel {
    insertInToBody(element) {
        document.body.appendChild(element);
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
        let input = this.createElement('input');

        container.classList.add('container-get_infos');
        button.classList.add('button-get_infos');
        input.classList.add('input-get_infos');

        const finalContainer = this.insertElements(container, [button, input]);
        this.insertInToBody(finalContainer);
    }

    createElement(elementHTML) {
        return document.createElement(elementHTML.tag);
    }

    init() {
       this.createElements(); 
    }
}

const insertPanel = new InsertPanel();
insertPanel.init();
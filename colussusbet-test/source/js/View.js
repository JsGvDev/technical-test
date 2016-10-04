class html {
    insertHtml( html, tag ) {
        if (tag) {
            $(tag).html(html);
        } else {
            $('#tribal').html(html);
        }
    }

    joinHtml ( html, tag ) {

        if (tag) {
            $( tag ).after( html );
        } else {
            $('#tribal').html(html);
        }
    }

    updateBasket( val ) {
        this.insertHtml(val,"#items");
    }
}

export class View extends html {
    constructor() {
        super();
        this.tpl = [];
    }

    save(tpl) {
        let key = tpl.tplName;
        if (this.tpl.findIndex((obj) => obj.hasOwnProperty(key)) == -1){
            let obj = {};
            obj[key] = tpl;
            this.tpl.push(obj);
            return true;
        }
        return false;

    }

    delete(tpl) {
        let key = tpl.tplName,
            index = this.tpl.findIndex((obj) => obj.hasOwnProperty(key));
        if (index > -1){
            this.tpl.splice(index, 1);
            return true;
        }
        return false;
    }

    get(tplName) {
        return this.tpl.find((obj) => obj.hasOwnProperty(tplName));
    }

    render(tpl) {
        let myhtml = '';
        if (this.get(tpl.tplName)){
            myhtml = tpl.elHtml;
            this.insertHtml(myhtml);
            return true;
        }
        return false;
    }

}

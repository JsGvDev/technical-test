class LocalStore {

    save( key, value ) {
        try {
          localStorage.setItem(key, JSON.stringify(value));
          return true;
        } catch(e) { return false; }
    }

    remove( key ) {
        if (this.read(key)) {
          localStorage.removeItem(key);
          return true;
        } else return false;
    }

    read( key ) {
        return JSON.parse(localStorage.getItem( key ));
    }
}

const key = 'cart';
export class Basket extends LocalStore {

    constructor() {
        super();
        this.items = this.read( key );
        if (!this.items) {
            this.items = [];
        }
    }

    get() {
        return this.items;
    }

    set( item ) {
        this.items.push(item);
        this.save( key, this.items );
    }

    remove() {
        this.items.pop();
        this.save( key, this.items );
    }

    numberItems() {
        return this.items.length;
    }
}

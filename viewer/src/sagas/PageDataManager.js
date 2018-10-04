class PageDataManager {
    constructor() {
        this.list = [];
        this.maxLength = 5;
    }

    addPage(pageData) {
        this.list.push(pageData);
        if(this.list.length > this.maxLength) {
            var page = this.list.unshift
        }
    }
}
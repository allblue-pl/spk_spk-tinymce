'use strict';

const
    spocky = require('spocky')
;

export default class Editor extends spocky.Layout {

    static get Content() {
        return [];
    }


    constructor()
    {
        super(Editor.Content);
    }

}

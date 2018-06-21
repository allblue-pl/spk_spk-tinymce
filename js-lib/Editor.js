'use strict';

const
    js0 = require('js0'),
    spocky = require('spocky')
;

export default class Editor
{

    constructor(layout, htmlElement)
    {
        js0.args(arguments, spocky.Layout, htmlElement);

        this.htmlElement = htmlElement;

        layout.$onDisplay((displayed) => {
            if (displayed)
                this.activate();
            else
                this.deactivate();
        })
    }

    activate()
    {
        this.deactivate();

        tinymce.init({
            target: this.htmlElement,
            theme: 'modern',
            mobile: { theme: 'mobile' },
            plugins: [
                'link', 'preview',
            ],
        });
        this.editor = tinymce.get(this.htmlElement.id);
    }

    deactivate()
    {
        if (this.htmlElement.id in tinymce.editors)
            tinymce.get(this.htmlElement.id).destroy();
    }

    getHtml()
    {
        return this.editor.getContent();
    }

    setHtml(html)
    {
        this.editor.setContent(html);
    }

}
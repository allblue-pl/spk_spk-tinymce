'use strict';

const
    js0 = require('js0'),
    spocky = require('spocky')
;

export default class Editor
{

    constructor(layout, htmlElement, pkgUri = '/node_modules/spk-tinymce')
    {
        js0.args(arguments, spocky.Layout, htmlElement, [ 'string', js0.Default ]);

        this.htmlElement = htmlElement;
        this.pkgUri = pkgUri;

        layout.$onDisplay((displayed) => {
            if (displayed)
                this.activate();
            else
                this.deactivate();
        });
    }

    activate()
    {
        this.deactivate();

        console.log(`${this.pkgUri}/css/styles.css`);

        tinymce.init({
            target: this.htmlElement,
            theme: 'modern',
            mobile: { theme: 'mobile' },
            plugins: [
                'link', 'preview',
            ],
            body_class: 'spk-tinymce-editor',
            content_css: `${this.pkgUri}/css/styles.css`,
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
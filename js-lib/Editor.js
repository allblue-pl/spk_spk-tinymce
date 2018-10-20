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

        this._editor = null;
        this._content = '';
        layout.$onDisplay((displayed) => {
            if (displayed) {
                this.activate();
                this._editor.setContent(this._content);
            } else {
                this._content = this._editor.getContent();
                this.deactivate();
            }
        });
    }

    activate()
    {
        this.deactivate();

        tinyMCE.baseURL = '/dev/node_modules/tinymce/';
        tinymce.init({
            document_base_url: '/dev/node_modules/tinymce/',
            target: this.htmlElement,
            theme: 'modern',
            mobile: { theme: 'mobile' },
            plugins: [
                'code', 'link', 'image', 'lists', 'paste', 'preview',
            ],
            body_class: 'spk-tinymce-editor',
            content_css: `${this.pkgUri}/css/styles.css`,
            paste_as_text: true,
            relative_urls : false,
            remove_script_host : false,
            convert_urls : true,
        });
        this._editor = tinymce.get(this.htmlElement.id);
    }

    deactivate()
    {
        this._editor = null;
        if (this.htmlElement.id in tinymce.editors)
            tinymce.get(this.htmlElement.id).destroy();
    }

    getHtml()
    {
        if (this._editor === null)
            return this._content;

        return this._editor.getContent();
    }

    setHtml(html)
    {
        if (this._editor === null)
            this._content = html;
        else
            this._editor.setContent(html);
    }

}
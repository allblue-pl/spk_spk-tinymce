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

        tinymce.init({
            document_base_url: '/dev/node_modules/tinymce',
            target: this.htmlElement,
            theme: 'silver',
            mobile: { theme: 'mobile' },
            plugins: [
                'code', 'hr', 'link', 'image', 'lists', 'paste', 'preview', 'textcolor', 
                    'table',
            ],
            toolbar: "undo redo | styleselect | bold italic" +
                    " | alignleft aligncenter alignright alignjustify" +
                    " | forecolor | bullist numlist outdent indent | link image" +
                    " | table | hr | code",
            body_class: 'spk-tinymce-editor',
            content_css: `${this.pkgUri}/css/styles.css`,
            paste_as_text: true,
            relative_urls: true,
            remove_script_host: false,
            convert_urls: false,
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

    insertHtml_AtCursor(html)
    {
        tinymce.activeEditor.execCommand('mceInsertContent', false, html);
    }

    setHtml(html)
    {
        if (this._editor === null)
            this._content = html;
        else
            this._editor.setContent(html);
    }

}
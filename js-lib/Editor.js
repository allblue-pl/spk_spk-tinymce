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

        this._plugins = [ 'code', 'hr', 'link', 'image', 'lists', 'paste', 
                'preview', 'table', ];

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

    addPlugins(plugins)
    {
        js0.args(arguments, Array);

        for (let plugin of plugins)
            this._plugins.push(plugin);
    }

    activate()
    {
        this.deactivate();

        let baseUri = '/dev/node_modules/tinymce/';
        // let pluginUrls = [];
        // for (let plugin of this._plugins)
        //     pluginUrls.push(`${baseUri}plugins/${plugin}`);

        tinymce.init({
            base_url: baseUri,
            relative_urls : false,
            remove_script_host : true,
            document_base_url: baseUri,
            convert_urls: false,

            target: this.htmlElement,
            theme: `silver`,
            skin: `oxide`,
            mobile: { theme: `mobile` },
            plugins: this._plugins,
            toolbar: "undo redo | styleselect | bold italic" +
                    " | alignleft aligncenter alignright alignjustify" +
                    " | forecolor | bullist numlist outdent indent | link image" +
                    " | table | hr | code",
            body_class: 'spk-tinymce-editor',
            content_css: `${this.pkgUri}/css/styles.css`,
            paste_as_text: true,
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
        tinymce.activeEditor.execCommand('mceInsertContent', false, html + 
                '<p>&nbsp;</p>');
    }

    setHtml(html)
    {
        if (this._editor === null)
            this._content = html;
        else
            this._editor.setContent(html);
    }

    setPlugins(plugins)
    {
        js0.args(arguments, Array);

        this._plugins = plugins;
    }

}
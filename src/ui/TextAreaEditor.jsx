import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
    ClassicEditor,
    Alignment,
    AutoImage,
    Autoformat,
    Bold,
    BlockQuote,
    Essentials,
    Font,
    Heading,
    Highlight,
    Indent,
    IndentBlock,
    Italic,
    Link,
    List,
    MediaEmbed,
    Paragraph,
    Table,
    TableToolbar,
    TextTransformation,
    Undo,
    Image,
    ImageToolbar,
    ImageCaption,
    ImageStyle,
    ImageResize,
    ImageUpload,
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';

// Custom upload adapter
class MyUploadAdapter {
    constructor(loader) {
        this.loader = loader;
    }

    upload() {
        return this.loader.file.then(
            file =>
                new Promise((resolve, reject) => {
                    const formData = new FormData();
                    formData.append('image', file);

                    fetch('http://localhost:3000/upload', {
                        method: 'POST',
                        body: formData,
                    })
                        .then(response => {
                            if (!response.ok) {
                                return response.text().then(text => {
                                    console.error('Server error:', text);
                                    throw new Error('Upload failed');
                                });
                            }
                            return response.json();
                        })
                        .then(result => {
                            resolve({
                                default: result.url,
                            });
                        })
                        .catch(error => {
                            console.error('Upload error:', error);
                            reject(error);
                        });
                })
        );
    }

    abort() {
        console.log('Upload aborted');
    }
}

function MyCustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = loader => {
        return new MyUploadAdapter(loader);
    };
}

const TextAreaEditor = ({ onChange }) => {

    const editorConfiguration = {
        toolbar: [
            'undo', 'redo', '|',
            'heading', '|', 'bold', 'italic', 'underline', 'strikethrough', '|',
            'imageStyle:alignLeft',
            'imageStyle:alignCenter',
            'imageStyle:alignRight', "|",
            'alignment', 'highlight', 'fontColor', 'fontBackgroundColor', '|',
            'link', 'blockQuote', 'insertTable', 'mediaEmbed', 'imageUpload', '|',
            'bulletedList', 'numberedList', 'indent', 'outdent'
        ],
        plugins: [
            Alignment, AutoImage, Autoformat, Bold, BlockQuote, Essentials,
            Font, Heading, Highlight, Indent, IndentBlock, Italic, Link,
            List, MediaEmbed, Paragraph, Table, TableToolbar,
            TextTransformation, Undo, Image, ImageToolbar,
            ImageCaption, ImageStyle, ImageResize, ImageUpload,
            Essentials,
            Paragraph,
            Heading,
            Image,
            ImageStyle,
            ImageToolbar,
            ImageResize,
            Alignment,
        ],
        extraPlugins: [MyCustomUploadAdapterPlugin],
        heading: {
            options: [
                { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' }
            ]
        },
        image: {
            styles: {
                options: [
                    'alignLeft',
                    'alignCenter',
                    'alignRight'
                ]
            },
            resizeOptions: [
                {
                    name: 'imageResize:original',
                    value: null,
                    label: 'Original'
                },
                {
                    name: 'imageResize:50',
                    value: '50',
                    label: '50%'
                },
                {
                    name: 'imageResize:75',
                    value: '75',
                    label: '75%'
                }
            ],
            toolbar: [
                'imageStyle:alignLeft',
                'imageStyle:alignCenter',
                'imageStyle:alignRight',
                '|',
                'imageResize',
                '|',
                'imageTextAlternative'
            ]
        },
        initialData: '<h1>Hello from CKEditor 5!</h1>'
    };

    const handleEditorReady = (editor) => {
        console.log('Editor is ready to use!', editor);
    };


    const handleEditorChange = (event, editor) => {
        const content = editor.getData();
        if (onChange) {
            onChange(content);
        }
    };

    return (
        <div className="w-full">
            <CKEditor
                editor={ClassicEditor}
                config={editorConfiguration}
                onReady={handleEditorReady}
                onChange={handleEditorChange}
                className="w-full"
            />
        </div>
    );
};

export { TextAreaEditor };
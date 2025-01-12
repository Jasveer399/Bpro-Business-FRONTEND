import {
    Bold, Italic, Strikethrough, Heading1, Heading2,
    List, ListOrdered, Quote, Undo, Redo, Image as ImageIcon,
    Link as LinkIcon, AlignLeft, AlignCenter, AlignRight,
    Type, Highlighter,
    Heading3
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { isColorDark } from '../Utils/Helper.js';
import { colors, highlightColors } from '../Utils/options.js';

const TextEditorMenuBar = ({
    editor,
    addImage,
    showLinkInput,
    setShowLinkInput,
    linkUrl,
    setLinkUrl,
    setLink,
}) => {
    if (!editor) return null;

    const [showBgColors, setShowBgColors] = useState({
        text: "#000000",
        highlight: "#FFFFFF"
    });
    const linkRef = useRef(null);

    // Add effect to sync color state with editor
    useEffect(() => {
        if (!editor) return;
        // Update color when editor changes
        const updateColor = () => {
            const marks = editor.getAttributes('textStyle');
            const highlightMarks = editor.getAttributes('highlight');
            if (marks.color) {
                setShowBgColors(prev => ({
                    ...prev,
                    text: marks.color
                }));
            } else {
                setShowBgColors(prev => ({
                    ...prev,
                    text: "#000000"
                }));
            }

            if (highlightMarks.color) {
                setShowBgColors(prev => ({
                    ...prev,
                    highlight: highlightMarks.color
                }));
            } else {
                setShowBgColors(prev => ({
                    ...prev,
                    highlight: "#FFFFFF"
                }));
            }
        };
        // Listen for all transaction updates
        editor.on('transaction', updateColor);
        // Initial color sync
        updateColor();
        return () => {
            editor.off('transaction', updateColor);
        };
    }, [editor]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (linkRef.current && !linkRef.current.contains(event.target)) {
                setShowLinkInput(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setShowLinkInput]);

    const buttonStyle = "p-2 rounded hover:bg-gray-100 border border-gray-200";
    const activeButtonStyle = "p-2 rounded bg-primary/50 border border-primary";

    const handleAlign = (align) => {
        // Check if there's a selection
        const { from, to } = editor.state.selection;
        if (from === to) {
            // No selection, apply to whole block
            editor.chain().focus().setTextAlign(align).run();
        } else {
            // Has selection, wrap selected content in a div with alignment
            const content = editor.state.doc.textBetween(from, to);
            editor.chain()
                .focus()
                .setTextAlign(align)
                .run();
        }
    };

    return (
        <div className="border-b p-2 flex flex-wrap gap-1 bg-white">
            <div className="flex items-center gap-1 border-r pr-2">
                <button
                    type='button'
                    className={editor.isActive('heading', { level: 1 }) ? activeButtonStyle : buttonStyle}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                >
                    <Heading1 className="w-4 h-4" />
                </button>
                <button
                    type='button'
                    className={editor.isActive('heading', { level: 2 }) ? activeButtonStyle : buttonStyle}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                >
                    <Heading2 className="w-4 h-4" />
                </button>
                <button
                    type='button'
                    className={editor.isActive('heading', { level: 3 }) ? activeButtonStyle : buttonStyle}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                >
                    <Heading3 className="w-4 h-4" />
                </button>
            </div>

            <div className="flex items-center gap-1 border-r pr-2">
                <button
                    type='button'
                    className={editor.isActive('bold') ? activeButtonStyle : buttonStyle}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                >
                    <Bold className="w-4 h-4" />
                </button>
                <button
                    type='button'
                    className={editor.isActive('italic') ? activeButtonStyle : buttonStyle}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                    <Italic className="w-4 h-4" />
                </button>
                <button
                    type='button'
                    className={editor.isActive('strike') ? activeButtonStyle : buttonStyle}
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                >
                    <Strikethrough className="w-4 h-4" />
                </button>
            </div>

            <div className="flex items-center gap-1 border-r pr-2">
                <button
                    type='button'
                    className={editor.isActive('bulletList') ? activeButtonStyle : buttonStyle}
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                >
                    <List className="w-4 h-4" />
                </button>
                <button
                    type='button'
                    className={editor.isActive('orderedList') ? activeButtonStyle : buttonStyle}
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                >
                    <ListOrdered className="w-4 h-4" />
                </button>
                {/* <button
                    type='button'
                    className={editor.isActive('blockquote') ? activeButtonStyle : buttonStyle}
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                >
                    <Quote className="w-4 h-4" />
                </button> */}
            </div>

            <div className="flex items-center gap-1 border-r pr-2">
                <button
                    type='button'
                    className={buttonStyle}
                    onClick={() => editor.chain().focus().undo().run()}
                >
                    <Undo className="w-4 h-4" />
                </button>
                <button
                    type='button'
                    className={buttonStyle}
                    onClick={() => editor.chain().focus().redo().run()}
                >
                    <Redo className="w-4 h-4" />
                </button>
            </div>

            <div className="flex items-center gap-1 border-r pr-2">
                <button
                    type='button'
                    className={buttonStyle}
                    onClick={addImage}
                >
                    <ImageIcon className="w-4 h-4" />
                </button>

                <div className="relative" ref={linkRef}>
                    <button
                        type='button'
                        className={editor.isActive('link') ? activeButtonStyle : buttonStyle}
                        onClick={() => setShowLinkInput(!showLinkInput)}
                    >
                        <LinkIcon className="w-4 h-4" />
                    </button>
                    {showLinkInput && (
                        <div className="absolute top-full left-0 mt-1 bg-white border rounded-lg p-2 shadow-lg z-10 flex gap-2">
                            <input
                                type="url"
                                value={linkUrl}
                                onChange={(e) => setLinkUrl(e.target.value)}
                                autoFocus
                                placeholder="Enter URL"
                                className="border rounded px-2 py-1 text-sm"
                            />
                            <button
                                type='button'
                                onClick={() => {
                                    setLink();
                                    setShowLinkInput(false);
                                }}
                                className="bg-primary text-white px-2 py-1 rounded text-sm"
                            >
                                Add
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* <div className="flex items-center gap-1 border-r pr-2">
                <button
                    type='button'
                    className={editor.isActive({ textAlign: 'left' }) ? activeButtonStyle : buttonStyle}
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                >
                    <AlignLeft className="w-4 h-4" />
                </button>
                <button
                    type='button'
                    className={editor.isActive({ textAlign: 'center' }) ? activeButtonStyle : buttonStyle}
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                >
                    <AlignCenter className="w-4 h-4" />
                </button>
                <button
                    type='button'
                    className={editor.isActive({ textAlign: 'right' }) ? activeButtonStyle : buttonStyle}
                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                >
                    <AlignRight className="w-4 h-4" />
                </button>
            </div> */}

            <div className="flex items-center gap-1 border-r pr-2">
                <button
                    type='button'
                    className={editor.isActive({ textAlign: 'left' }) ? activeButtonStyle : buttonStyle}
                    onClick={() => handleAlign('left')}
                >
                    <AlignLeft className="w-4 h-4" />
                </button>
                <button
                    type='button'
                    className={editor.isActive({ textAlign: 'center' }) ? activeButtonStyle : buttonStyle}
                    onClick={() => handleAlign('center')}
                >
                    <AlignCenter className="w-4 h-4" />
                </button>
                <button
                    type='button'
                    className={editor.isActive({ textAlign: 'right' }) ? activeButtonStyle : buttonStyle}
                    onClick={() => handleAlign('right')}
                >
                    <AlignRight className="w-4 h-4" />
                </button>
            </div>

            <div className="flex items-center gap-1">
                <div className="relative group rounded-sm" style={{ backgroundColor: showBgColors.text }}>
                    <button
                        type='button' className={buttonStyle} style={{ backgroundColor: showBgColors.text }}>
                        <Type className="w-4 h-4" style={{
                            color: isColorDark(showBgColors.text) ? '#ffffff' : '#000000',
                        }} />
                    </button>
                    <div className="absolute hidden group-hover:grid grid-cols-6 top-full left-0 bg-white border rounded-lg p-2 shadow-lg z-10 gap-1 w-48">
                        {colors.map((color) => (
                            <button
                                type='button'
                                key={color}
                                className="w-6 h-6 rounded-full"
                                style={{ backgroundColor: color }}
                                onClick={() => {
                                    editor.chain().focus().setColor(color).run();
                                    setShowBgColors((prev) => ({ ...prev, text: color }));
                                }}
                            />
                        ))}
                    </div>
                </div>

                <div className="relative group">
                    <button
                        type='button'
                        className={buttonStyle}
                        style={{ backgroundColor: showBgColors.highlight }}
                    >
                        <Highlighter
                            className="w-4 h-4"
                            style={{
                                color: isColorDark(showBgColors.highlight) ? '#ffffff' : '#000000'
                            }}
                        />
                    </button>
                    <div className="absolute hidden group-hover:grid grid-cols-6 top-full left-0 bg-white border rounded-lg p-2 shadow-lg z-10 gap-1 w-48">
                        {highlightColors.map((color) => (
                            <button
                                type='button'
                                key={color}
                                className="w-6 h-6 rounded-full"
                                style={{ backgroundColor: color }}
                                onClick={() => {
                                    editor.chain().focus().toggleHighlight({ color }).run();
                                    setShowBgColors((prev) => ({ ...prev, highlight: color }));
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export { TextEditorMenuBar };
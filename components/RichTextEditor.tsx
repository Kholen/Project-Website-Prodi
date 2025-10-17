'use client';

import { useEffect, useRef } from 'react';
import type Quill from 'quill';
import 'quill/dist/quill.snow.css';

type RichTextEditorProps = {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  readOnly?: boolean;
};

const EMPTY_HTML = '<p><br></p>';

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, false] }],
  ['bold', 'italic', 'underline', 'strike'],
  [{ color: [] }, { background: [] }],
  [{ script: 'sub' }, { script: 'super' }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ indent: '-1' }, { indent: '+1' }],
  [{ align: [] }],
  ['blockquote', 'code-block'],
  ['link', 'clean'],
];

function normalize(html: string): string {
  return html === EMPTY_HTML ? '' : html;
}

export default function RichTextEditor({
  id,
  value,
  onChange,
  placeholder,
  className,
  readOnly,
}: RichTextEditorProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<Quill | null>(null);
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    let isMounted = true;
    let changeHandler: (() => void) | null = null;

    async function initEditor() {
      const { default: QuillConstructor } = await import('quill');
      if (!isMounted || !containerRef.current) {
        return;
      }

      const editorHost = document.createElement('div');
      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(editorHost);

      const quill = new QuillConstructor(editorHost, {
        theme: 'snow',
        modules: { toolbar: TOOLBAR_OPTIONS },
        placeholder,
        readOnly,
      });

      quillRef.current = quill;

      if (value) {
        quill.clipboard.dangerouslyPasteHTML(value);
      } else {
        quill.setText('');
      }

      quill.enable(!readOnly);

      changeHandler = () => {
        const html = quill.root.innerHTML;
        onChangeRef.current(normalize(html));
      };

      quill.on('text-change', changeHandler);
    }

    initEditor().catch((error) => {
      console.error('Gagal memuat editor Quill:', error);
    });

    return () => {
      isMounted = false;
      const quill = quillRef.current;
      if (quill && changeHandler) {
        quill.off('text-change', changeHandler);
      }
      quillRef.current = null;
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  useEffect(() => {
    const quill = quillRef.current;
    if (!quill) {
      return;
    }

    const normalizedValue = value ?? '';
    if (normalize(quill.root.innerHTML) === normalize(normalizedValue)) {
      return;
    }

    const selection = quill.getSelection();
    if (normalizedValue) {
      quill.clipboard.dangerouslyPasteHTML(normalizedValue);
    } else {
      quill.setText('');
    }

    if (selection) {
      const length = quill.getLength();
      quill.setSelection(Math.min(selection.index, Math.max(length - 1, 0)), selection.length);
    }
  }, [value]);

  useEffect(() => {
    const quill = quillRef.current;
    if (!quill) {
      return;
    }
    quill.enable(!readOnly);
    const toolbar = quill.getModule('toolbar') as { container?: HTMLElement } | undefined;
    if (toolbar?.container) {
      toolbar.container.style.display = readOnly ? 'none' : '';
    }
  }, [readOnly]);

  useEffect(() => {
    const quill = quillRef.current;
    if (!quill) {
      return;
    }

    const root = quill.root as HTMLElement;
    if (placeholder) {
      root.setAttribute('data-placeholder', placeholder);
    } else {
      root.removeAttribute('data-placeholder');
    }
  }, [placeholder]);

  const classes = ['rich-text-editor', className].filter(Boolean).join(' ');

  return <div id={id} ref={containerRef} className={classes} />;
}

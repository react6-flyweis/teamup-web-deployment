import React from 'react';
import { resolveImageUrl } from '../hooks/useSiteContent';

/**
 * Safely parses an HTML string and converts allowed tags into React elements.
 * This avoids the security risks of dangerouslySetInnerHTML while styling TipTap rich text.
 * 
 * @param {string} htmlString - The raw HTML string to parse.
 * @param {object} [customOverrides] - Optional custom tag style overrides.
 * @returns {React.ReactNode[] | string | null} The safe React elements or text.
 */
export const parseHtmlToReact = (htmlString, customOverrides = {}) => {
  if (!htmlString) return null;
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');

    const safeTags = [
      'div', 'p', 'br', 'strong', 'em', 'span', 'b', 'i', 'u', 's', 'strike',
      'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'section', 'img', 'a', 'blockquote', 'code', 'pre', 'hr',
      'table', 'thead', 'tbody', 'tr', 'th', 'td'
    ];

    const tagStyles = {
      ul: 'list-disc pl-6 my-4 space-y-2',
      ol: 'list-decimal pl-6 my-4 space-y-2',
      li: 'list-item',
      p: 'leading-relaxed mb-4 text-inherit',
      h1: 'text-3xl sm:text-4xl font-black mt-8 mb-4 tracking-tight',
      h2: 'text-2xl sm:text-3xl font-bold mt-6 mb-3 tracking-tight',
      h3: 'text-xl sm:text-2xl font-bold mt-5 mb-2',
      h4: 'text-lg sm:text-xl font-bold mt-4 mb-2',
      h5: 'text-base font-bold mt-4 mb-1',
      h6: 'text-sm font-bold mt-4 mb-1 uppercase tracking-wider',
      a: 'text-[#E1017D] hover:text-[#ff2b9c] underline transition-colors font-medium',
      blockquote: 'border-l-4 border-[#E1017D] pl-4 py-2 my-4 italic text-gray-700 bg-black/5 rounded-r',
      code: 'bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded text-sm font-mono',
      pre: 'bg-gray-900 text-gray-100 p-4 rounded-lg my-4 overflow-x-auto text-sm font-mono',
      hr: 'my-8 border-gray-300',
      table: 'w-full my-6 border-collapse border border-gray-300 text-left text-sm',
      th: 'border border-gray-300 bg-gray-100 p-2.5 font-bold',
      td: 'border border-gray-300 p-2.5',
      img: 'rounded-xl shadow-lg my-6 max-w-full h-auto mx-auto block',
      ...customOverrides
    };

    const isSafeUrl = (url) => {
      if (!url) return false;
      const trimmed = url.trim();
      return (
        trimmed.startsWith('http://') ||
        trimmed.startsWith('https://') ||
        trimmed.startsWith('mailto:') ||
        trimmed.startsWith('tel:') ||
        trimmed.startsWith('/') ||
        trimmed.startsWith('#')
      );
    };

    const renderNode = (node, key) => {
      if (node.nodeType === 3) { // Node.TEXT_NODE
        return node.textContent;
      }
      if (node.nodeType === 1) { // Node.ELEMENT_NODE
        const tagName = node.tagName.toLowerCase();
        if (safeTags.includes(tagName)) {
          const children = Array.from(node.childNodes).map((child, idx) => 
            renderNode(child, idx)
          );

          const props = { key, className: tagStyles[tagName] || undefined };

          // Handle links
          if (tagName === 'a') {
            const rawHref = node.getAttribute('href');
            if (rawHref && isSafeUrl(rawHref)) {
              props.href = rawHref;
              if (rawHref.startsWith('http://') || rawHref.startsWith('https://')) {
                props.target = '_blank';
                props.rel = 'noopener noreferrer';
              }
            } else {
              props.href = '#';
            }
          }

          // Handle images
          if (tagName === 'img') {
            const rawSrc = node.getAttribute('src');
            props.src = rawSrc ? resolveImageUrl(rawSrc) : '';
            props.alt = node.getAttribute('alt') || 'Content image';
            props.loading = 'lazy';

            const styleAttr = node.getAttribute('style');
            if (styleAttr) {
              const styleObj = {};
              styleAttr.split(';').forEach(ruleStr => {
                const separatorIndex = ruleStr.indexOf(':');
                if (separatorIndex !== -1) {
                  const keyName = ruleStr.slice(0, separatorIndex).trim();
                  const valName = ruleStr.slice(separatorIndex + 1).trim();
                  if (keyName && valName) {
                    const camelCaseRule = keyName.replace(/-./g, x => x[1].toUpperCase());
                    styleObj[camelCaseRule] = valName;
                  }
                }
              });
              props.style = styleObj;
            }
          }

          return React.createElement(
            tagName,
            props,
            children.length > 0 ? children : null
          );
        }
      }
      return null;
    };

    return Array.from(doc.body.childNodes).map((node, index) => renderNode(node, index));
  } catch (e) {
    console.error('Error parsing HTML safely', e);
    return htmlString;
  }
};

import React, { useEffect } from 'react';

interface BookNowMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  cardTitle: string;
  aLaCarteLink?: string;
  preselectLink?: string;
}

export const BookNowMenuModal: React.FC<BookNowMenuModalProps> = ({
  isOpen,
  onClose,
  cardTitle,
  aLaCarteLink = '',
  preselectLink = '',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOpenUrl = (url: string) => {
    if (!url) return;
    const cleanUrl = url.startsWith('http') ? url : `https://${url}`;
    window.open(cleanUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-[#1C1C1C] border border-[#3A3530] rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#333] flex items-center justify-between bg-[#161616]">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-[#E1017D] font-bold">
              Choose Dining Experience
            </span>
            <h3 className="text-xl font-bold text-white mt-0.5">
              {cardTitle}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-[#2A2A2A] transition-colors cursor-pointer text-xl leading-none"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        {/* Options */}
        <div className="p-6 space-y-4">
          <p className="text-sm text-gray-300">
            How would your group like to enjoy food & drinks during the booking?
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            {/* Option 1: A La Carte */}
            <div className="bg-[#141414] border border-[#333] hover:border-[#E1017D]/70 rounded-xl p-5 flex flex-col justify-between transition-all">
              <div>
                <div className="w-9 h-9 rounded-lg bg-[#E1017D]/10 border border-[#E1017D]/25 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-[#E1017D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h4 className="text-base font-bold text-white mb-1">
                  A La Carte Menu
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">
                  Order freely from our kitchen and bar menu on arrival.
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleOpenUrl(aLaCarteLink)}
                className="w-full bg-[#E1017D] hover:bg-[#c2016c] text-white py-2.5 px-3 rounded-lg text-xs font-bold transition-colors cursor-pointer text-center"
              >
                Choose A La Carte
              </button>
            </div>

            {/* Option 2: Preselect */}
            <div className="bg-[#141414] border border-[#333] hover:border-[#E1017D]/70 rounded-xl p-5 flex flex-col justify-between transition-all">
              <div>
                <div className="w-9 h-9 rounded-lg bg-[#E1017D]/10 border border-[#E1017D]/25 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-[#E1017D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <h4 className="text-base font-bold text-white mb-1">
                  Preselect Your Menu
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">
                  Lock in party platters and drinks packages ahead of time.
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleOpenUrl(preselectLink)}
                className="w-full bg-[#252525] hover:bg-[#303030] text-white border border-[#3A3530] py-2.5 px-3 rounded-lg text-xs font-bold transition-colors cursor-pointer text-center"
              >
                Preselect Menu
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#141414] border-t border-[#333] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs text-gray-400 hover:text-white rounded transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookNowMenuModal;

import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { parseHtmlToReact } from '../utils/htmlParser';
import { resolveImageUrl } from '../hooks/useSiteContent';

const texture = '/assets/texture.svg';

/**
 * Reusable Content Page Template conforming to the TeamUp Content Page Frontend Integration Guide.
 * Strictly uses API data without static fallbacks.
 */
export const ContentPageTemplate = ({
  page,
  isLoading = false,
  isError = false,
}) => {
  // Resolve media and text fields strictly from API data with backward-compatible aliases
  const rawBg = page?.heroBgImage || page?.heroImage || page?.bgMediaUrl;
  const bgImage = rawBg ? resolveImageUrl(rawBg) : '';

  const rawVideo = page?.heroVideo || page?.videoUrl;
  const videoSrc = rawVideo ? resolveImageUrl(rawVideo) : '';

  const tagline = page?.tagline || page?.subtitle || '';
  const pageTitle = page?.title || '';
  const content = page?.content;

  // SEO updates
  useEffect(() => {
    if (page?.metaTitle || pageTitle) {
      document.title = page?.metaTitle || (pageTitle ? `${pageTitle} | Team Up` : 'Team Up');
    }

    const desc = page?.metaDescription || page?.excerpt || tagline;
    if (desc) {
      let metaTag = document.querySelector('meta[name="description"]');
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.name = 'description';
        document.head.appendChild(metaTag);
      }
      metaTag.content = desc;
    }
  }, [page, pageTitle, tagline]);

  return (
    <>
      {/* ─── 1. HERO SECTION (grows to remaining screen as main hero) ─── */}
      <div className="relative w-full overflow-hidden h-dvh min-h-dvh bg-[#121212] flex flex-col">
        <Navbar />

        {/* Hero Body taking up only the remaining space below Navbar */}
        <div className="relative flex-1 w-full overflow-hidden flex flex-col items-center justify-center">
          {/* Background Video Layer */}
          {videoSrc ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              poster={bgImage || undefined}
              className="absolute inset-0 w-full h-full object-cover z-0"
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          ) : bgImage ? (
            /* Background Image Layer from API */
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
              style={{ backgroundImage: `url(${bgImage})` }}
            />
          ) : (
            /* Neutral Gradient Pattern when no image/video is provided */
            <div className="absolute inset-0 bg-gradient-to-br from-[#1C1C1C] to-[#121212] z-0" />
          )}

          {/* Readability Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-black/50 to-black/30 pointer-events-none z-10" />

          {/* Hero Content */}
          <div className="relative z-20 flex flex-col items-center justify-center py-6 md:py-0 text-center px-4 text-white max-w-4xl mx-auto">
            {pageTitle && (
              <h1
                style={{ fontFamily: 'Posterama2001W04' }}
                className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white mb-3 drop-shadow-lg"
              >
                {pageTitle}
              </h1>
            )}

            {tagline && (
              <p
                style={{ fontFamily: 'Noir Semi' }}
                className="text-base sm:text-lg md:text-xl text-gray-200 font-medium max-w-2xl mx-auto drop-shadow-md"
              >
                {tagline}
              </p>
            )}

            {pageTitle && (
              <div className="mt-8 animate-bounce">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 md:w-10 md:h-10 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─── 2. TIP TAP RICH CONTENT ARTICLE ─── */}
      <div
        className="w-full bg-fixed bg-cover bg-center min-h-[50vh]"
        style={{ backgroundImage: `url(${texture})` }}
      >
        <main className="max-w-5xl mx-auto px-4 md:px-12 py-10 md:py-16">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-[#292524]">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#E1017D] mb-4"></div>
              <p style={{ fontFamily: 'Noir Semi' }}>Loading...</p>
            </div>
          ) : isError ? (
            <div className="text-center py-16 text-[#292524]">
              <p className="font-bold text-lg mb-2">Unable to load page content</p>
              <p className="text-sm text-gray-600">Please try again later.</p>
            </div>
          ) : content ? (
            <article
              style={{ fontFamily: 'Noir Pro' }}
              className="text-[#292524] space-y-4 break-words overflow-hidden text-sm md:text-base leading-relaxed"
            >
              {parseHtmlToReact(content)}
            </article>
          ) : null}
        </main>
      </div>

      <Footer />
    </>
  );
};

export default ContentPageTemplate;

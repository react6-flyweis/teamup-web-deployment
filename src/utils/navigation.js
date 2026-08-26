export const isExternalUrl = (url) => {
  if (!url || typeof url !== 'string') return false;
  return /^(https?:\/\/|\/\/|mailto:|tel:|www\.)/i.test(url.trim());
};

export const getHref = (url) => {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();
  if (/^www\./i.test(trimmed)) {
    return `https://${trimmed}`;
  }
  return trimmed;
};

export const handleNavigation = (url, navigate, options = {}) => {
  if (!url || typeof url !== 'string') return;
  const trimmed = url.trim();
  if (isExternalUrl(trimmed)) {
    const targetUrl = getHref(trimmed);
    if (/^(mailto:|tel:)/i.test(targetUrl)) {
      window.location.href = targetUrl;
    } else {
      window.open(targetUrl, options.target || '_blank', 'noopener,noreferrer');
    }
  } else if (navigate) {
    navigate(trimmed);
  } else {
    window.location.href = trimmed;
  }
};

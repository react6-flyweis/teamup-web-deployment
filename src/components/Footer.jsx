import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa';
import bgImage from '../assets/bg.svg';
import symbol2 from '../assets/Symbol2.svg';
import { Link } from 'react-router-dom';
import { useSiteContent, resolveImageUrl } from '../hooks/useSiteContent';
import { useContentPages } from '../hooks/useContentPage';

const logo = '/assets/logo.svg';

const Footer = () => {
    const { data: footerSiteContent } = useSiteContent('footer');
    const { data: pagesData } = useContentPages();

    const footerData = footerSiteContent?.content?.data || footerSiteContent?.data;
    const companyInfo = footerData?.companyInfo;
    const socialMediaLinks = footerData?.socialMediaLinks;

    const bgWallpaperUrl = resolveImageUrl(footerData?.bgWallpaperImageUrl || footerData?.bgWallpaperImage) || bgImage;

    const officeAddress = companyInfo?.officeAddress || '';
    const addressLabel = companyInfo?.addressLabel || footerData?.addressLabel || 'Address';
    const phoneNumber = companyInfo?.phoneNumber || '';
    const copyrightText = companyInfo?.copyrightText || '';

    const facebookUrl = socialMediaLinks?.facebookUrl || '';
    const instagramUrl = socialMediaLinks?.instagramUrl || '';
    const tiktokUrl = socialMediaLinks?.tiktokUrl || '';

    return (
        <footer
            className="bg-cover bg-center text-white relative overflow-hidden"
            style={{ backgroundImage: `url(${bgWallpaperUrl})` }}
        >
            {/* Top Links */}
            <div
                className="font-noir-pro font-bold flex flex-wrap justify-center sm:justify-start gap-x-8 gap-y-4 border-b border-[#FFE6D8]/30 border-t py-8 px-6 md:px-12"
            >
                {(pagesData?.pages ?? []).map((page) => (
                    <Link
                        key={page._id}
                        to={`/page/${page.slug}`}
                        className="hover:underline text-sm md:text-base uppercase tracking-wider transition-all"
                    >
                        {page.title}
                    </Link>
                ))}
                <Link
                    to="/contact"
                    className="hover:underline text-sm md:text-base uppercase tracking-wider transition-all"
                >
                    Contact Us
                </Link>
            </div>


            {/* Middle Section */}
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10 py-12 px-6 md:px-12">
                {/* Logo and Address */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 text-center sm:text-left">
                    <img src={logo} alt="Team Up Logo" className="w-[160px] md:w-[200px] h-auto drop-shadow-lg" />
                    <div className="space-y-4">
                        {officeAddress && (
                            <div>
                                <p className="font-noir font-bold text-white text-sm uppercase tracking-widest opacity-60 mb-1">
                                    {addressLabel}
                                </p>
                                <p className="font-noir font-bold text-[#ABABAB] text-sm md:text-base leading-relaxed">
                                    {officeAddress}
                                </p>
                            </div>
                        )}

                        {phoneNumber && (
                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                                <p className="font-noir font-bold flex items-center gap-3 text-[#ABABAB] text-sm md:text-base">
                                    <img src={symbol2} className="w-5 h-5 opacity-80" alt="Phone" />
                                    <span className="text-white font-bold">Phone:</span> {phoneNumber}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Optional: Add social or other info here if needed, currently empty to keep it clean */}
            </div>

            {/* Bottom Bar */}
            <div
                className="font-noir font-bold flex flex-col md:flex-row items-center justify-between gap-6 px-6 md:px-12 py-8 border-t border-[#FFE6D8]/10"
            >
                <p className="text-xs text-[#FFE6D8]/60 text-center md:text-left tracking-wide">
                    {copyrightText}
                </p>

                <div className="hidden md:block flex-1 h-px bg-[#FFE6D8]/10 mx-8" />

                <div className="flex gap-6 text-white text-2xl md:pr-24">
                    {facebookUrl && <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#00AACB] transition-colors"><FaFacebookF /></a>}
                    {instagramUrl && <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#E1017D] transition-colors"><FaInstagram /></a>}
                    {tiktokUrl && <a href={tiktokUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#00AACB] transition-colors"><FaTiktok /></a>}
                </div>
            </div>
        </footer>
    );
};

export default Footer;

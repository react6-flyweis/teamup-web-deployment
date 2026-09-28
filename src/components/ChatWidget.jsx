import { useState } from 'react';
import { FaTiktok } from 'react-icons/fa';
import chat from '../assets/chat.svg';
import fb from '../assets/facebook (6).svg';
import mic from '../assets/mic.svg';

const insta = '/assets/instagram (2).svg';
const avtar = '/assets/avtar.svg';

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Chat Box */}
            {isOpen && (
                <div className="fixed bottom-24 right-4 w-[90%] sm:w-[360px] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden font-sans border border-gray-100">
                    <div
                        style={{
                            background: 'linear-gradient(180.11deg, #E1017D 0.1%, #FFFFFF 85.42%)',
                            borderTopLeftRadius: '1rem',
                            borderTopRightRadius: '1rem',
                        }}
                        className="px-6 pt-6 pb-8 text-white"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div
                                className="font-posterama text-[18px] sm:text-[20px] font-bold leading-tight"
                            >
                                PHILLIP DOKIDIS <br />
                                <span className="text-xs font-normal opacity-80">(YOUR PERSONAL ASSISTANCE)</span>
                            </div>
                        </div>
                        <div className="flex space-x-3 items-center">
                            <img src={insta} alt="Instagram" className="w-auto h-8 hover:scale-110 transition-transform" />
                            <a href="#" className="text-[#000000] bg-white rounded-full p-2 hover:scale-110 transition-transform shadow-sm"><FaTiktok className="w-5 h-5" /></a>
                            <img src={fb} alt="Facebook" className="w-auto h-8 hover:scale-110 transition-transform" />
                        </div>
                        <h2 className="font-posterama text-xl font-bold text-[#292524] mt-6">HELLO</h2>
                        <p className="font-posterama text-xl font-bold text-[#292524]">HOW CAN WE HELP?</p>
                    </div>

                    <div className="px-6 py-6 bg-white">
                        <div className="flex items-start mb-6">
                            <img src={avtar} alt="Avatar" className="w-8 h-8 rounded-full mr-3 shadow-sm" />
                            <div className="font-noir-semi bg-gray-50 rounded-2xl rounded-tl-none px-4 py-3 text-sm text-gray-700 shadow-sm">
                                Welcome to Team-Up. How can I assist you today?
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {["I need help with my order", "I want to know about Team Up"].map((txt, i) => (
                                <button
                                    key={i}
                                    className="px-4 py-2 rounded-full border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
                                >
                                    {txt}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center text-black bg-gray-50 rounded-full px-4 py-3 border border-gray-100">
                            <input
                                type="text"
                                placeholder="Enter your message..."
                                className="flex-1 bg-transparent text-sm outline-none placeholder-gray-400"
                            />
                            <button className="hover:scale-110 transition-transform">
                                <img src={mic} alt="Send" className="w-6 h-6 ml-2" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Chat Button */}
            <div className="fixed bottom-6 right-6 z-50">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-16 h-16 bg-[#E1017D] shadow-2xl rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                >
                    <img src={chat} alt="Chat Icon" className="w-9 h-9" />
                </button>
            </div>
        </>
    );
};

export default ChatWidget;

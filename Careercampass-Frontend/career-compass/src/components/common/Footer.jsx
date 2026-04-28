import { Facebook, Twitter, Linkedin, Instagram, Compass } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 py-12 border-t border-gray-800 font-sans">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Info */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-4 text-white">
            <Compass size={24} className="text-blue-500" />
            <span className="text-xl font-bold">CareerCompass</span>
          </div>
          <p className="text-sm leading-relaxed">
            Empowering students and professionals to achieve their career goals with AI-driven insights.
          </p>
        </div>

        {/* Links Column 1 */}
        <div>
          <h4 className="text-white font-bold mb-4">Platform</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-blue-400 cursor-pointer transition">For Students</li>
            <li className="hover:text-blue-400 cursor-pointer transition">For Job Seekers</li>
            <li className="hover:text-blue-400 cursor-pointer transition">For Professionals</li>
            <li className="hover:text-blue-400 cursor-pointer transition">Pricing</li>
          </ul>
        </div>

        {/* Links Column 2 */}
        <div>
          <h4 className="text-white font-bold mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-blue-400 cursor-pointer transition">About Us</li>
            <li className="hover:text-blue-400 cursor-pointer transition">Careers</li>
            <li className="hover:text-blue-400 cursor-pointer transition">Privacy Policy</li>
            <li className="hover:text-blue-400 cursor-pointer transition">Terms of Service</li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h4 className="text-white font-bold mb-4">Connect</h4>
          <div className="flex gap-4">
            <a href="#" className="p-2 bg-gray-900 rounded-full hover:bg-blue-600 hover:text-white transition"><Facebook size={18} /></a>
            <a href="#" className="p-2 bg-gray-900 rounded-full hover:bg-blue-400 hover:text-white transition"><Twitter size={18} /></a>
            <a href="#" className="p-2 bg-gray-900 rounded-full hover:bg-blue-700 hover:text-white transition"><Linkedin size={18} /></a>
            <a href="#" className="p-2 bg-gray-900 rounded-full hover:bg-pink-600 hover:text-white transition"><Instagram size={18} /></a>
          </div>
        </div>

      </div>
      
      <div className="text-center text-xs mt-12 border-t border-gray-900 pt-8">
        © 2025 CareerCompass AI. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
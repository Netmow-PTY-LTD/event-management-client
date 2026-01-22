import Link from 'next/link';
import { Heart } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <Heart className="w-6 h-6" fill="currentColor" />
                            <span className="text-xl font-bold">DCT Events</span>
                        </div>
                        <p className="text-gray-400">Making every event unforgettable</p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Company</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><Link href="/pricing" className="hover:text-white transition font-semibold text-purple-400">Pricing</Link></li>
                            <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
                            <li><Link href="/careers" className="hover:text-white transition">Careers</Link></li>
                            <li><Link href="/blog" className="hover:text-white transition">Blog</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Support</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><Link href="/help" className="hover:text-white transition">Help</Link></li>
                            <li><Link href="/support" className="hover:text-white transition">Support</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Legal</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-white transition">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
                    <p>&copy; 2026 DCT Events. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

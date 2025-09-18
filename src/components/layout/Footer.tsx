import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-earthy-brown text-white">
      <div className="max-w-[120rem] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-heading font-bold text-lg">A</span>
              </div>
              <span className="font-heading text-2xl font-bold">AyurSutra</span>
            </div>
            <p className="font-paragraph text-sm text-white/80 leading-relaxed">
              Your trusted partner in holistic wellness through authentic Panchakarma treatments and modern healthcare management.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="font-heading text-lg font-semibold">Quick Links</h3>
            <nav className="space-y-3">
              <Link to="/" className="block font-paragraph text-sm text-white/80 hover:text-white transition-colors">
                Home
              </Link>
              <Link to="/hospitals" className="block font-paragraph text-sm text-white/80 hover:text-white transition-colors">
                Hospitals
              </Link>
              <Link to="/treatments" className="block font-paragraph text-sm text-white/80 hover:text-white transition-colors">
                Treatments
              </Link>
              <Link to="/appointment" className="block font-paragraph text-sm text-white/80 hover:text-white transition-colors">
                Book Appointment
              </Link>
            </nav>
          </div>

          {/* Treatments */}
          <div className="space-y-6">
            <h3 className="font-heading text-lg font-semibold">Our Treatments</h3>
            <nav className="space-y-3">
              <Link to="/treatments/vaman" className="block font-paragraph text-sm text-white/80 hover:text-white transition-colors">
                Vaman Therapy
              </Link>
              <Link to="/treatments/virechan" className="block font-paragraph text-sm text-white/80 hover:text-white transition-colors">
                Virechan Therapy
              </Link>
              <Link to="/treatments/basti" className="block font-paragraph text-sm text-white/80 hover:text-white transition-colors">
                Basti Therapy
              </Link>
              <Link to="/treatments/nasya" className="block font-paragraph text-sm text-white/80 hover:text-white transition-colors">
                Nasya Therapy
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="font-heading text-lg font-semibold">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="font-paragraph text-sm text-white/80">
                  123 Wellness Street<br />
                  Ayurveda District<br />
                  Mumbai, Maharashtra 400001
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <p className="font-paragraph text-sm text-white/80">
                  +91 98765 43210
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <p className="font-paragraph text-sm text-white/80">
                  info@ayursutra.com
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="font-paragraph text-sm text-white/60">
              © 2024 AyurSutra. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <Link to="/privacy" className="font-paragraph text-sm text-white/60 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="font-paragraph text-sm text-white/60 hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
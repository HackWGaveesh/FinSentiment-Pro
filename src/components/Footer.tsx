import React from 'react';
import { motion } from 'framer-motion';
import { Twitter, Linkedin, Github, Mail, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Product: ['Features', 'Pricing', 'API', 'Documentation'],
    Company: ['About', 'Blog', 'Careers', 'Contact'],
    Resources: ['Help Center', 'Status', 'Privacy', 'Terms'],
  };

  const socialLinks = [
    { Icon: Twitter, href: '#', label: 'Twitter' },
    { Icon: Linkedin, href: '#', label: 'LinkedIn' },
    { Icon: Github, href: '#', label: 'GitHub' },
    { Icon: Mail, href: '#', label: 'Email' },
  ];

  return (
    <footer id="contact" className="bg-light-card dark:bg-dark-card border-t border-light-border dark:border-dark-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Product */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-slate-900 dark:text-white">
              Product
            </h3>
            <ul className="space-y-2">
              {footerLinks.Product.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-slate-900 dark:text-white">
              Company
            </h3>
            <ul className="space-y-2">
              {footerLinks.Company.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-slate-900 dark:text-white">
              Resources
            </h3>
            <ul className="space-y-2">
              {footerLinks.Resources.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-slate-900 dark:text-white">
              Connect
            </h3>
            <div className="flex space-x-4 mb-4">
              {socialLinks.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border flex items-center justify-center hover:border-indigo-500 transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                </motion.a>
              ))}
            </div>
            {/* Newsletter */}
            <form className="mt-4" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="newsletter" className="sr-only">
                Email address
              </label>
              <div className="flex">
                <input
                  id="newsletter"
                  type="email"
                  placeholder="Enter your email"
                  className="input-field text-sm rounded-r-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-light-border dark:border-dark-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              © {currentYear} FinSentiment Pro. Created for NLP Academic Project.
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center">
              Made with <Heart className="w-4 h-4 mx-1 text-red-500 fill-current" /> and AI
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

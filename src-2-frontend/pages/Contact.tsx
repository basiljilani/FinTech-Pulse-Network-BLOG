import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen pt-28 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">Get in Touch</h1>
            <p className="text-gray-400 mb-8">
              Have questions about our services? We're here to help.
            </p>

            <div className="space-y-8 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <span className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                    <Mail className="h-5 w-5 text-indigo-400" />
                  </span>
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-white">Email</h3>
                  <p className="text-gray-400">support@fintechpulse.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <span className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                    <Phone className="h-5 w-5 text-indigo-400" />
                  </span>
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-white">Phone</h3>
                  <p className="text-gray-400">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <span className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-indigo-400" />
                  </span>
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-white">Office</h3>
                  <p className="text-gray-400">123 Finance Street, New York, NY 10001</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <span className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                    <Clock className="h-5 w-5 text-indigo-400" />
                  </span>
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-white">Hours</h3>
                  <p className="text-gray-400">Monday - Friday: 9am - 6pm EST</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-8 transition-all duration-300 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10">
            <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-gray-500 transition-all duration-300"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-gray-500 transition-all duration-300"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-gray-500 transition-all duration-300"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600/90 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-600 transition-all duration-300 shadow-lg hover:shadow-indigo-500/25"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
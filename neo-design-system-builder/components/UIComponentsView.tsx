import React, { useState } from 'react';
import { ViewType } from '../src/types/design-system';
import type { ColorToken } from '../src/types/design-system';
import {
  Plus, Download, Trash2, Check, ArrowRight, Send,
  ShoppingCart, Heart, Share2, Star, Search, Menu
} from 'lucide-react';

interface UIComponentsViewProps {
  type: ViewType;
  colors: ColorToken[];
}

const UIComponentsView: React.FC<UIComponentsViewProps> = ({ type, colors }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    subscribe: false,
    plan: 'basic',
  });

  const primaryColor = colors.find(c => c.id === 'p-500')?.hex || '#2b4bee';
  const successColor = colors.find(c => c.id === 's-500')?.hex || '#22c55e';
  const errorColor = colors.find(c => c.id === 'e-500')?.hex || '#ef4444';

  // BUTTONS VIEW
  if (type === ViewType.UI_BUTTONS) {
    return (
      <div className="grid grid-cols-1 gap-6">
        {/* Primary Variants */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Primary Buttons</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              style={{ backgroundColor: primaryColor }}
              className="px-6 py-3 text-white font-bold rounded-xl shadow-lg hover:opacity-90 active:scale-95 transition-all"
            >
              Default
            </button>
            <button
              style={{ backgroundColor: primaryColor }}
              className="px-6 py-3 text-white font-bold rounded-full shadow-lg hover:opacity-90 active:scale-95 transition-all"
            >
              Rounded
            </button>
            <button
              style={{ backgroundColor: primaryColor }}
              className="px-6 py-3 text-white font-bold rounded shadow-lg hover:opacity-90 active:scale-95 transition-all"
            >
              Square
            </button>
            <button
              style={{ backgroundColor: primaryColor }}
              className="px-6 py-3 text-white font-bold rounded-xl shadow-lg hover:opacity-90 active:scale-95 transition-all flex items-center gap-2 justify-center"
            >
              <Plus size={20} /> New
            </button>
          </div>
        </div>

        {/* Secondary & Outline */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Secondary & Outline</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="px-6 py-3 bg-slate-100 text-slate-800 font-bold rounded-xl hover:bg-slate-200 active:scale-95 transition-all">
              Secondary
            </button>
            <button className="px-6 py-3 border-2 border-slate-300 text-slate-700 font-bold rounded-xl hover:border-blue-500 hover:text-blue-600 active:scale-95 transition-all">
              Outline
            </button>
            <button className="px-6 py-3 text-slate-600 font-bold rounded-xl hover:bg-slate-100 active:scale-95 transition-all">
              Ghost
            </button>
            <button className="px-6 py-3 text-blue-600 font-bold underline-offset-4 hover:underline">
              Link Button
            </button>
          </div>
        </div>

        {/* Sizes */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Button Sizes</h3>
          <div className="flex items-center gap-4 flex-wrap">
            <button
              style={{ backgroundColor: primaryColor }}
              className="px-3 py-1.5 text-white text-sm font-bold rounded-lg hover:opacity-90"
            >
              Small
            </button>
            <button
              style={{ backgroundColor: primaryColor }}
              className="px-4 py-2 text-white font-bold rounded-lg hover:opacity-90"
            >
              Medium
            </button>
            <button
              style={{ backgroundColor: primaryColor }}
              className="px-6 py-3 text-white font-bold rounded-xl hover:opacity-90"
            >
              Large
            </button>
            <button
              style={{ backgroundColor: primaryColor }}
              className="px-8 py-4 text-white text-lg font-bold rounded-xl hover:opacity-90"
            >
              Extra Large
            </button>
          </div>
        </div>

        {/* States */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Button States</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              style={{ backgroundColor: primaryColor }}
              className="px-6 py-3 text-white font-bold rounded-xl opacity-60 flex items-center gap-2 justify-center cursor-wait"
            >
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Loading
            </button>
            <button
              disabled
              className="px-6 py-3 bg-slate-200 text-slate-400 font-bold rounded-xl cursor-not-allowed"
            >
              Disabled
            </button>
            <button
              style={{ backgroundColor: successColor }}
              className="px-6 py-3 text-white font-bold rounded-xl flex items-center gap-2 justify-center"
            >
              <Check size={20} /> Success
            </button>
            <button
              style={{ backgroundColor: errorColor }}
              className="px-6 py-3 text-white font-bold rounded-xl flex items-center gap-2 justify-center"
            >
              <Trash2 size={20} /> Delete
            </button>
          </div>
        </div>

        {/* Icon Buttons */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Icon Buttons</h3>
          <div className="flex items-center gap-4">
            <button
              style={{ backgroundColor: primaryColor }}
              className="w-12 h-12 flex items-center justify-center text-white rounded-xl hover:opacity-90 transition-all"
            >
              <Plus size={20} />
            </button>
            <button className="w-12 h-12 flex items-center justify-center bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-all">
              <Download size={20} />
            </button>
            <button className="w-12 h-12 flex items-center justify-center border-2 border-slate-300 text-slate-700 rounded-xl hover:border-red-500 hover:text-red-600 transition-all">
              <Trash2 size={20} />
            </button>
            <button className="w-12 h-12 flex items-center justify-center text-slate-600 rounded-xl hover:bg-slate-100 transition-all">
              <Share2 size={20} />
            </button>
          </div>
        </div>

        {/* Button Groups */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Button Groups</h3>
          <div className="flex gap-6 flex-wrap">
            <div className="inline-flex rounded-xl border border-slate-200 overflow-hidden">
              <button className="px-4 py-2 bg-blue-600 text-white font-bold">Left</button>
              <button className="px-4 py-2 bg-white text-slate-700 font-bold border-x border-slate-200">Center</button>
              <button className="px-4 py-2 bg-white text-slate-700 font-bold">Right</button>
            </div>
            <div className="inline-flex gap-2">
              <button
                style={{ backgroundColor: primaryColor }}
                className="px-6 py-2 text-white font-bold rounded-lg flex items-center gap-2"
              >
                <Download size={16} /> Download
              </button>
              <button className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-lg hover:bg-slate-200">
                Cancel
              </button>
            </div>
          </div>
        </div>

        {/* Call-to-Action Examples */}
        <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-12 rounded-3xl border border-slate-200">
          <h3 className="text-xl font-bold text-slate-900 mb-8 text-center">Call-to-Action Examples</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button
              style={{ backgroundColor: primaryColor }}
              className="px-8 py-4 text-white font-bold rounded-xl shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              Get Started <ArrowRight size={20} />
            </button>
            <button className="px-8 py-4 bg-white text-slate-900 font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2">
              <ShoppingCart size={20} /> Add to Cart
            </button>
            <button
              style={{ backgroundColor: successColor }}
              className="px-8 py-4 text-white font-bold rounded-xl shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <Send size={20} /> Send Message
            </button>
          </div>
        </div>
      </div>
    );
  }

  // CARDS VIEW
  if (type === ViewType.UI_CARDS) {
    return (
      <div className="grid grid-cols-1 gap-6">
        {/* Basic Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all">
            <div className="w-12 h-12 bg-blue-500 rounded-xl mb-4 flex items-center justify-center text-white">
              <Star size={24} />
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-2">Feature Card</h4>
            <p className="text-slate-500 text-sm leading-relaxed">
              Simple card component with icon, title and description.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all overflow-hidden group cursor-pointer">
            <div className="h-40 bg-slate-100 rounded-2xl mb-4 overflow-hidden">
              <img
                src="https://picsum.photos/seed/card1/400/300"
                alt="Preview"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-2">Image Card</h4>
            <p className="text-slate-500 text-sm">Card with image and hover effect.</p>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-6 rounded-3xl shadow-xl text-white">
            <h4 className="text-2xl font-black mb-2">Premium</h4>
            <p className="text-blue-100 text-sm mb-4">Upgrade your plan</p>
            <div className="text-4xl font-black mb-6">$29<span className="text-lg">/mo</span></div>
            <button className="w-full py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors">
              Subscribe Now
            </button>
          </div>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all group">
              <div className="h-48 bg-slate-100 relative overflow-hidden">
                <img
                  src={`https://picsum.photos/seed/product${i}/300/300`}
                  alt="Product"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <button className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-red-50 transition-colors">
                  <Heart size={18} className="text-slate-400 hover:text-red-500" />
                </button>
              </div>
              <div className="p-4">
                <h5 className="font-bold text-slate-900 mb-1">Product Name {i}</h5>
                <p className="text-sm text-slate-500 mb-3">Category</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-black text-slate-900">$99</span>
                  <button
                    style={{ backgroundColor: primaryColor }}
                    className="px-4 py-2 text-white text-sm font-bold rounded-lg hover:opacity-90"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <p className="text-sm text-slate-500 mb-2">Total Users</p>
            <p className="text-3xl font-black text-slate-900 mb-2">24.5K</p>
            <p className="text-sm text-green-500 font-bold">+12% this month</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <p className="text-sm text-slate-500 mb-2">Revenue</p>
            <p className="text-3xl font-black text-slate-900 mb-2">$128K</p>
            <p className="text-sm text-green-500 font-bold">+8% this month</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <p className="text-sm text-slate-500 mb-2">Active Now</p>
            <p className="text-3xl font-black text-slate-900 mb-2">1.2K</p>
            <p className="text-sm text-blue-500 font-bold">Real-time</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <p className="text-sm text-slate-500 mb-2">Conversion</p>
            <p className="text-3xl font-black text-slate-900 mb-2">3.2%</p>
            <p className="text-sm text-red-500 font-bold">-2% this month</p>
          </div>
        </div>

        {/* Profile Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center">
              <img
                src={`https://picsum.photos/seed/profile${i}/100/100`}
                alt="Profile"
                className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-slate-100"
              />
              <h5 className="text-lg font-bold text-slate-900 mb-1">User Name {i}</h5>
              <p className="text-sm text-slate-500 mb-4">Product Designer</p>
              <div className="flex gap-2 justify-center">
                <button className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700">
                  Follow
                </button>
                <button className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-lg hover:bg-slate-200">
                  Message
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // FORMS VIEW
  if (type === ViewType.UI_FORMS) {
    return (
      <div className="grid grid-cols-1 gap-6">
        {/* Input Fields */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Text Inputs</h3>
          <div className="space-y-4 max-w-2xl">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Disabled Input</label>
              <input
                type="text"
                placeholder="Disabled"
                disabled
                className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-400 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Textarea & Select */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Textarea & Select</h3>
          <div className="space-y-4 max-w-2xl">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Message</label>
              <textarea
                rows={4}
                placeholder="Your message..."
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Select Plan</label>
              <select
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.plan}
                onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
              >
                <option value="basic">Basic Plan</option>
                <option value="pro">Pro Plan</option>
                <option value="enterprise">Enterprise Plan</option>
              </select>
            </div>
          </div>
        </div>

        {/* Checkboxes & Radio */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Checkboxes & Radio Buttons</h3>
          <div className="space-y-6 max-w-2xl">
            <div>
              <p className="text-sm font-bold text-slate-700 mb-3">Checkboxes</p>
              <div className="space-y-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                    checked={formData.subscribe}
                    onChange={(e) => setFormData({ ...formData, subscribe: e.target.checked })}
                  />
                  <span className="text-sm text-slate-700">Subscribe to newsletter</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500" />
                  <span className="text-sm text-slate-700">I agree to terms and conditions</span>
                </label>
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-700 mb-3">Radio Buttons</p>
              <div className="space-y-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="plan" className="w-5 h-5 text-blue-600 focus:ring-2 focus:ring-blue-500" />
                  <span className="text-sm text-slate-700">Monthly billing</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="plan" className="w-5 h-5 text-blue-600 focus:ring-2 focus:ring-blue-500" />
                  <span className="text-sm text-slate-700">Yearly billing (save 20%)</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Search Input */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Search Input</h3>
          <div className="max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Complete Form Example */}
        <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-12 rounded-3xl border border-slate-200">
          <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">Contact Form Example</h3>
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-xl">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">First Name</label>
                  <input
                    type="text"
                    placeholder="John"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    placeholder="Doe"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Message</label>
                <textarea
                  rows={4}
                  placeholder="Your message..."
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                style={{ backgroundColor: primaryColor }}
                className="w-full py-3 text-white font-bold rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2"
              >
                <Send size={20} /> Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default UIComponentsView;

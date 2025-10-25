import React, { useState } from 'react';
import { 
  Send, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  HelpCircle, 
  MessageSquare, 
  CheckCircle, 
  AlertCircle,
  ChevronDown,
  ChevronUp,
  User,
  FileText,
  Star,
  Heart,
  Shield,
  Truck,
  CreditCard
} from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: 'general' | 'orders' | 'payments' | 'shipping' | 'returns' | 'sellers';
}

interface SupportTicket {
  title: string;
  subject: string;
  description: string;
  email: string;
  name: string;
  priority: 'low' | 'medium' | 'high';
}

const Support: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'faqs' | 'contact'>('faqs');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [formData, setFormData] = useState<SupportTicket>({
    title: '',
    subject: '',
    description: '',
    email: '',
    name: '',
    priority: 'medium'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // FAQ Data
  const faqs: FAQ[] = [
    {
      id: 1,
      category: 'general',
      question: 'What is Aikyam and how does it work?',
      answer: 'Aikyam is a marketplace dedicated to authentic Indian handicrafts and artisan-made products. We connect skilled craftspeople directly with customers, ensuring fair prices for artisans while offering unique, high-quality products to buyers.'
    },
    {
      id: 2,
      category: 'general',
      question: 'How do I create an account?',
      answer: 'Creating an account is simple! Click on the "Sign Up" button in the top right corner, fill in your details, and verify your email address. You can also sign up using your Google or Facebook account for faster registration.'
    },
    {
      id: 3,
      category: 'orders',
      question: 'How can I track my order?',
      answer: 'Once your order is shipped, you will receive a tracking number via email and SMS. You can also track your order by going to "My Orders" section in your account and clicking on the specific order for detailed tracking information.'
    },
    {
      id: 4,
      category: 'orders',
      question: 'Can I modify or cancel my order?',
      answer: 'You can cancel your order within 2 hours of placing it if the payment is pending. For paid orders, cancellation is possible until the order is marked as "processing" by the seller. Modifications are not possible once the order is confirmed.'
    },
    {
      id: 5,
      category: 'payments',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major payment methods including UPI, Credit/Debit Cards, Net Banking, and popular wallets like Paytm, PhonePe, and Google Pay. All payments are processed securely through Razorpay.'
    },
    {
      id: 6,
      category: 'payments',
      question: 'Is my payment information secure?',
      answer: 'Absolutely! We use industry-standard encryption and work with Razorpay, a PCI DSS compliant payment gateway. We never store your complete card details on our servers, ensuring maximum security for all transactions.'
    },
    {
      id: 7,
      category: 'shipping',
      question: 'What are the shipping charges?',
      answer: 'Shipping charges vary based on the size, weight, and delivery location of your order. We offer free shipping on orders above ₹1,500. Detailed shipping costs are displayed at checkout before you complete your purchase.'
    },
    {
      id: 8,
      category: 'shipping',
      question: 'How long does delivery take?',
      answer: 'Delivery typically takes 3-7 business days for most locations in India. Remote areas may take 7-14 days. Each product page shows estimated delivery times specific to your location when you enter your PIN code.'
    },
    {
      id: 9,
      category: 'returns',
      question: 'What is your return policy?',
      answer: 'We offer a 7-day return policy for most items from the date of delivery. Items must be unused, in original condition with tags attached. Handmade custom items and perishable goods are not eligible for returns unless damaged.'
    },
    {
      id: 10,
      category: 'returns',
      question: 'How do I initiate a return or exchange?',
      answer: 'Go to "My Orders" section, find your order, and click "Return/Exchange". Follow the guided process to specify the reason and upload photos if needed. We will arrange pickup from your address within 2-3 business days.'
    },
    {
      id: 11,
      category: 'sellers',
      question: 'How can I become a seller on Aikyam?',
      answer: 'Click on "Sell Your Crafts" button on our homepage to start the registration process. You will need to provide business details, identity verification, and samples of your work. Our team reviews applications within 3-5 business days.'
    },
    {
      id: 12,
      category: 'sellers',
      question: 'What commission does Aikyam charge?',
      answer: 'We charge a competitive commission of 8-12% depending on the product category and your seller tier. This includes payment processing, platform maintenance, and marketing support. No hidden fees or setup costs.'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories', icon: HelpCircle },
    { value: 'general', label: 'General', icon: User },
    { value: 'orders', label: 'Orders', icon: FileText },
    { value: 'payments', label: 'Payments', icon: CreditCard },
    { value: 'shipping', label: 'Shipping', icon: Truck },
    { value: 'returns', label: 'Returns', icon: Shield },
    { value: 'sellers', label: 'For Sellers', icon: Star }
  ];

  const filteredFAQs = selectedCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/support/tickets', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitSuccess(true);
      setFormData({
        title: '',
        subject: '',
        description: '',
        email: '',
        name: '',
        priority: 'medium'
      });
    } catch (error) {
      console.error('Error submitting support ticket:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleFAQ = (id: number) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-cream-200">
      <Header />
      
      {/* Page Header */}
      <section className="bg-white border-b border-primary-200/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="font-headline text-3xl sm:text-4xl font-bold text-brown-800">
              SUPPORT CENTER
            </h1>
            <p className="font-body text-brown-600 mt-2 max-w-2xl mx-auto">
              We're here to help! Find answers to common questions or get in touch with our support team
            </p>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex justify-center mt-8">
            <div className="bg-cream-100 p-1 rounded-xl flex space-x-1">
              <button
                onClick={() => setActiveTab('faqs')}
                className={`px-6 py-3 rounded-lg font-body font-semibold transition-all duration-200 flex items-center space-x-2 ${
                  activeTab === 'faqs'
                    ? 'bg-white text-brown-800 shadow-md'
                    : 'text-brown-600 hover:text-brown-800'
                }`}
              >
                <HelpCircle className="w-4 h-4" />
                <span>FAQs</span>
              </button>
              <button
                onClick={() => setActiveTab('contact')}
                className={`px-6 py-3 rounded-lg font-body font-semibold transition-all duration-200 flex items-center space-x-2 ${
                  activeTab === 'contact'
                    ? 'bg-white text-brown-800 shadow-md'
                    : 'text-brown-600 hover:text-brown-800'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Contact Us</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'faqs' ? (
          <div className="space-y-8">
            {/* Category Filter */}
            <div className="bg-white rounded-xl p-6 border border-primary-200/20">
              <h2 className="font-headline text-xl font-bold text-brown-800 mb-4">Browse by Category</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
                {categories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <button
                      key={category.value}
                      onClick={() => setSelectedCategory(category.value)}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center space-y-2 ${
                        selectedCategory === category.value
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-primary-200/20 bg-cream-50 text-brown-600 hover:border-primary-300 hover:bg-primary-25'
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                      <span className="font-body text-sm font-medium text-center">
                        {category.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* FAQs List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-headline text-xl font-bold text-brown-800">
                  {selectedCategory === 'all' ? 'All FAQs' : `${categories.find(c => c.value === selectedCategory)?.label} FAQs`}
                </h2>
                <span className="font-body text-sm text-brown-600">
                  {filteredFAQs.length} question{filteredFAQs.length !== 1 ? 's' : ''}
                </span>
              </div>

              <div className="space-y-3">
                {filteredFAQs.map((faq) => (
                  <div key={faq.id} className="bg-white rounded-xl border border-primary-200/20 overflow-hidden">
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full p-6 text-left hover:bg-cream-25 transition-colors duration-200 flex items-center justify-between"
                    >
                      <h3 className="font-body font-semibold text-brown-800 pr-4">
                        {faq.question}
                      </h3>
                      {expandedFAQ === faq.id ? (
                        <ChevronUp className="w-5 h-5 text-brown-600 shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-brown-600 shrink-0" />
                      )}
                    </button>
                    
                    {expandedFAQ === faq.id && (
                      <div className="px-6 pb-6 border-t border-primary-200/20 bg-cream-25">
                        <p className="font-body text-brown-700 leading-relaxed pt-4">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 border border-primary-200/20">
                <h2 className="font-headline text-xl font-bold text-brown-800 mb-6">Get in Touch</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-primary-700" />
                    </div>
                    <div>
                      <h3 className="font-body font-semibold text-brown-800">Email Support</h3>
                      <p className="font-body text-brown-600 text-sm mt-1">
                        Get help via email
                      </p>
                      <a 
                        href="mailto:support@aikyam.com" 
                        className="font-body text-primary-700 hover:text-primary-800 font-medium text-sm"
                      >
                        support@aikyam.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-primary-700" />
                    </div>
                    <div>
                      <h3 className="font-body font-semibold text-brown-800">Phone Support</h3>
                      <p className="font-body text-brown-600 text-sm mt-1">
                        Speak with our team
                      </p>
                      <a 
                        href="tel:+918012345678" 
                        className="font-body text-primary-700 hover:text-primary-800 font-medium text-sm"
                      >
                        +91 80123 45678
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-primary-700" />
                    </div>
                    <div>
                      <h3 className="font-body font-semibold text-brown-800">Business Hours</h3>
                      <p className="font-body text-brown-600 text-sm mt-1">
                        Monday - Saturday: 9:00 AM - 6:00 PM IST
                      </p>
                      <p className="font-body text-brown-600 text-sm">
                        Sunday: 10:00 AM - 4:00 PM IST
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-primary-700" />
                    </div>
                    <div>
                      <h3 className="font-body font-semibold text-brown-800">Office Address</h3>
                      <p className="font-body text-brown-600 text-sm mt-1">
                        Aikyam Crafts Pvt. Ltd.<br />
                        123 Craft Street, Artisan Quarter<br />
                        Mumbai, Maharashtra 400001<br />
                        India
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Help */}
              <div className="bg-primary-50 rounded-xl p-6 border border-primary-200/20">
                <h3 className="font-headline text-lg font-bold text-brown-800 mb-4 flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-primary-700" />
                  <span>Quick Help</span>
                </h3>
                <p className="font-body text-brown-700 text-sm mb-4">
                  Need immediate assistance? Check out these quick options:
                </p>
                <div className="space-y-2">
                  <button className="w-full text-left p-3 bg-white rounded-lg border border-primary-200/20 hover:border-primary-300 transition-colors">
                    <span className="font-body text-sm font-medium text-brown-800">Track My Order</span>
                  </button>
                  <button className="w-full text-left p-3 bg-white rounded-lg border border-primary-200/20 hover:border-primary-300 transition-colors">
                    <span className="font-body text-sm font-medium text-brown-800">Return/Exchange</span>
                  </button>
                  <button className="w-full text-left p-3 bg-white rounded-lg border border-primary-200/20 hover:border-primary-300 transition-colors">
                    <span className="font-body text-sm font-medium text-brown-800">Payment Issues</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-xl p-6 border border-primary-200/20">
              <h2 className="font-headline text-xl font-bold text-brown-800 mb-6">Send us a Message</h2>
              
              {submitSuccess ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-headline text-lg font-bold text-brown-800">Message Sent!</h3>
                  <p className="font-body text-brown-600">
                    Thank you for contacting us. We'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="btn btn-primary"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block font-body font-semibold text-brown-800 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="input"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block font-body font-semibold text-brown-800 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="input"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="title" className="block font-body font-semibold text-brown-800 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="input"
                      placeholder="Brief title for your query"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block font-body font-semibold text-brown-800 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="input"
                    >
                      <option value="">Select a subject</option>
                      <option value="order-inquiry">Order Inquiry</option>
                      <option value="payment-issue">Payment Issue</option>
                      <option value="shipping-concern">Shipping Concern</option>
                      <option value="return-exchange">Return/Exchange</option>
                      <option value="product-quality">Product Quality</option>
                      <option value="seller-inquiry">Seller Inquiry</option>
                      <option value="technical-issue">Technical Issue</option>
                      <option value="general-feedback">General Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="priority" className="block font-body font-semibold text-brown-800 mb-2">
                      Priority
                    </label>
                    <select
                      id="priority"
                      name="priority"
                      value={formData.priority}
                      onChange={handleInputChange}
                      className="input"
                    >
                      <option value="low">Low - General inquiry</option>
                      <option value="medium">Medium - Standard support</option>
                      <option value="high">High - Urgent issue</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="description" className="block font-body font-semibold text-brown-800 mb-2">
                      Description *
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="input resize-none"
                      placeholder="Please describe your query in detail. Include order numbers, product names, or any other relevant information."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary w-full flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-start space-x-2 text-sm">
                    <AlertCircle className="w-4 h-4 text-brown-600 mt-0.5 shrink-0" />
                    <p className="font-body text-brown-600">
                      We typically respond within 24 hours. For urgent matters, please call our support line.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Support;
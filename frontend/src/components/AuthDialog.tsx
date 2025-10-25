import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  Eye, 
  EyeOff,
  ArrowRight,
  Check
} from 'lucide-react';

interface AuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
}

const AuthDialog: React.FC<AuthDialogProps> = ({ 
  isOpen, 
  onClose, 
  initialMode = 'signin' 
}) => {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    agreeToTerms: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Replace with actual API calls
      if (mode === 'signin') {
        // const response = await fetch('/api/auth/signin', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ phone: formData.phone, password: formData.password })
        // });
        console.log('Signing in:', { phone: formData.phone, password: formData.password });
      } else {
        // const response = await fetch('/api/auth/signup', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({
        //     name: formData.name,
        //     email: formData.email,
        //     phone: formData.phone,
        //     password: formData.password
        //   })
        // });
        console.log('Signing up:', {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password
        });
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Close dialog on success
      onClose();
    } catch (error) {
      console.error('Authentication error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
    setIsLoading(true);
    try {
      // TODO: Implement social login
      console.log(`${provider} login initiated`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      onClose();
    } catch (error) {
      console.error(`${provider} login error:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      phone: '',
      agreeToTerms: false
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-white rounded-xl shadow-xl border border-primary-200/20 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-primary-200/20">
          <div>
            <h2 className="font-headline text-2xl font-bold text-brown-800">
              {mode === 'signin' ? 'Welcome Back' : 'Join Aikyam'}
            </h2>
            <p className="font-body text-sm text-brown-600 mt-1">
              {mode === 'signin' 
                ? 'Sign in to your account to continue' 
                : 'Create an account to start your journey'
              }
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-brown-600 hover:text-brown-800 hover:bg-cream-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Social Login Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => handleSocialLogin('google')}
              disabled={isLoading}
              className="w-full flex items-center justify-center space-x-3 p-3 border-2 border-primary-200/30 rounded-xl hover:border-primary-300 hover:bg-cream-25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {/* <div className="w-5 h-5 bg-red-500 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">G</span>
              </div> */}
              <span className="font-body font-medium text-brown-800">
                Continue with Google
              </span>
            </button>

            <button
              onClick={() => handleSocialLogin('facebook')}
              disabled={isLoading}
              className="w-full flex items-center justify-center space-x-3 p-3 border-2 border-primary-200/30 rounded-xl hover:border-primary-300 hover:bg-cream-25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {/* <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">f</span>
              </div> */}
              <span className="font-body font-medium text-brown-800">
                Continue with Facebook
              </span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-primary-200/30"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white font-body text-brown-600">
                {mode === 'signin' ? 'or continue with phone' : 'or continue with email'}
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <>
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block font-body font-medium text-brown-800 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-brown-500" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-primary-200/30 rounded-xl focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors font-body"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                {/* Phone Field */}
                <div>
                  <label htmlFor="phone" className="block font-body font-medium text-brown-800 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-brown-500" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-primary-200/30 rounded-xl focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors font-body"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Phone/Email Field */}
            <div>
              <label htmlFor={mode === 'signin' ? 'phone' : 'email'} className="block font-body font-medium text-brown-800 mb-2">
                {mode === 'signin' ? 'Phone Number' : 'Email Address'}
              </label>
              <div className="relative">
                {mode === 'signin' ? (
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-brown-500" />
                ) : (
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-brown-500" />
                )}
                <input
                  type={mode === 'signin' ? 'tel' : 'email'}
                  id={mode === 'signin' ? 'phone' : 'email'}
                  name={mode === 'signin' ? 'phone' : 'email'}
                  value={mode === 'signin' ? formData.phone : formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-primary-200/30 rounded-xl focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors font-body"
                  placeholder={mode === 'signin' ? '+91 98765 43210' : 'Enter your email'}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block font-body font-medium text-brown-800 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-brown-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-12 py-3 border border-primary-200/30 rounded-xl focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors font-body"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-brown-500 hover:text-brown-700"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field (Signup only) */}
            {mode === 'signup' && (
              <div>
                <label htmlFor="confirmPassword" className="block font-body font-medium text-brown-800 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-brown-500" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-12 py-3 border border-primary-200/30 rounded-xl focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors font-body"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-brown-500 hover:text-brown-700"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {/* Terms & Conditions (Signup only) */}
            {mode === 'signup' && (
              <div className="flex items-start space-x-3">
                <div className="relative">
                  <input
                    type="checkbox"
                    id="agreeToTerms"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    required
                    className="sr-only"
                  />
                  <div 
                    className={`w-5 h-5 border-2 rounded cursor-pointer flex items-center justify-center transition-colors ${
                      formData.agreeToTerms 
                        ? 'bg-primary-500 border-primary-500' 
                        : 'border-primary-200/50 hover:border-primary-300'
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, agreeToTerms: !prev.agreeToTerms }))}
                  >
                    {formData.agreeToTerms && <Check className="w-3 h-3 text-white" />}
                  </div>
                </div>
                <label htmlFor="agreeToTerms" className="font-body text-sm text-brown-700 cursor-pointer">
                  I agree to the{' '}
                  <a href="#" className="text-primary-700 hover:text-primary-800 font-medium">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-primary-700 hover:text-primary-800 font-medium">
                    Privacy Policy
                  </a>
                </label>
              </div>
            )}

            {/* Forgot Password (Signin only) */}
            {mode === 'signin' && (
              <div className="text-right">
                <a 
                  href="#" 
                  className="font-body text-sm text-primary-700 hover:text-primary-800 font-medium"
                >
                  Forgot password?
                </a>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || (mode === 'signup' && !formData.agreeToTerms)}
              className="w-full bg-brown-800 text-white py-3 rounded-xl font-body font-semibold hover:bg-brown-900 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>{mode === 'signin' ? 'Signing in...' : 'Creating account...'}</span>
                </>
              ) : (
                <>
                  <span>{mode === 'signin' ? 'Sign In' : 'Create Account'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Switch Mode */}
          <div className="text-center pt-4 border-t border-primary-200/20">
            <p className="font-body text-sm text-brown-600">
              {mode === 'signin' 
                ? "Don't have an account? " 
                : "Already have an account? "
              }
              <button
                onClick={switchMode}
                className="text-primary-700 hover:text-primary-800 font-medium"
              >
                {mode === 'signin' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthDialog;
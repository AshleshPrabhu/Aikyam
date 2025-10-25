import React, { useState } from 'react';
import AuthDialog from '../../components/AuthDialog';

const SellerLogin: React.FC = () => {
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(true);

  const handleClose = () => {
    setIsAuthDialogOpen(false);
    // Navigate back to seller dashboard or home
    window.location.href = '/seller/dashboard';
  };

  return (
    <div className="min-h-screen bg-cream-200 flex items-center justify-center">
      <div className="text-center space-y-6 mb-8">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-primary-700 rounded-lg flex items-center justify-center">
            <span className="text-white font-headline text-2xl font-bold">A</span>
          </div>
          <div>
            <span className="font-headline text-3xl font-bold text-brown-800">AIKYAM</span>
            <span className="ml-3 font-body text-lg text-brown-600">Seller Portal</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="font-headline text-4xl font-bold text-brown-800">Welcome Back</h1>
          <p className="font-body text-brown-600 max-w-md mx-auto">
            Sign in to your seller account to manage your crafts, orders, and grow your business.
          </p>
        </div>
      </div>

      <AuthDialog
        isOpen={isAuthDialogOpen}
        onClose={handleClose}
        initialMode="signin"
      />
    </div>
  );
};

export default SellerLogin;
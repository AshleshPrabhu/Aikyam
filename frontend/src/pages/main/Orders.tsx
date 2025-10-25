import React, { useState, useEffect } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Package, 
  Truck, 
  Check, 
  X, 
  Clock, 
  MapPin, 
  // Calendar, 
  CreditCard, 
  RefreshCw,
  AlertCircle,
  Download,
  Star,
  MessageCircle
} from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

// Types based on backend Order schema
interface OrderItem {
  id: number;
  name: string;
  amount: number;
  image: string;
  quantity: number;
  sellerId: number;
  seller?: {
    id: number;
    name: string;
    phone: string;
  };
}

interface Order {
  id: number;
  userId: number;
  orderItems: OrderItem[];
  razorpayOrderId: string;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  totalAmount: number;
  isPaid: boolean;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
  // Additional fields for UI
  estimatedDelivery?: string;
  trackingNumber?: string;
  shippingAddress?: {
    name: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    phone: string;
  };
  paymentMethod?: string;
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Mock orders data (replace with actual API call later)
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        
        // TODO: Replace with actual API call
        // const response = await fetch('/api/orders/user/:userId');
        // const data = await response.json();
        
        // Mock data
        const mockOrders: Order[] = [
          {
            id: 1,
            userId: 1,
            razorpayOrderId: 'order_1234567890',
            status: 'delivered',
            totalAmount: 8500,
            isPaid: true,
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
            createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            estimatedDelivery: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            trackingNumber: 'TRK123456789',
            orderItems: [
              {
                id: 1,
                name: 'Handwoven Kashmiri Pashmina Shawl',
                amount: 8500,
                image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
                quantity: 1,
                sellerId: 1,
                seller: { id: 1, name: 'Rajesh Kumar', phone: '+91-9876543210' }
              }
            ],
            shippingAddress: {
              name: 'John Doe',
              address: '123 Main Street, Apartment 4B',
              city: 'Mumbai',
              state: 'Maharashtra',
              pincode: '400001',
              phone: '+91-9876543211'
            },
            paymentMethod: 'UPI'
          },
          {
            id: 2,
            userId: 1,
            razorpayOrderId: 'order_2345678901',
            status: 'shipped',
            totalAmount: 6700,
            isPaid: true,
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
            createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
            trackingNumber: 'TRK987654321',
            orderItems: [
              {
                id: 2,
                name: 'Blue Pottery Decorative Vase Set',
                amount: 3200,
                image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
                quantity: 1,
                sellerId: 2,
                seller: { id: 2, name: 'Priya Sharma', phone: '+91-9876543212' }
              },
              {
                id: 3,
                name: 'Traditional Brass Lamp',
                amount: 3500,
                image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
                quantity: 1,
                sellerId: 3,
                seller: { id: 3, name: 'Vikram Patel', phone: '+91-9876543213' }
              }
            ],
            shippingAddress: {
              name: 'John Doe',
              address: '123 Main Street, Apartment 4B',
              city: 'Mumbai',
              state: 'Maharashtra',
              pincode: '400001',
              phone: '+91-9876543211'
            },
            paymentMethod: 'Credit Card'
          },
          {
            id: 3,
            userId: 1,
            razorpayOrderId: 'order_3456789012',
            status: 'pending',
            totalAmount: 2800,
            isPaid: false,
            expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
            createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
            updatedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
            orderItems: [
              {
                id: 4,
                name: 'Madhubani Painting on Canvas',
                amount: 2800,
                image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
                quantity: 1,
                sellerId: 4,
                seller: { id: 4, name: 'Sunita Devi', phone: '+91-9876543214' }
              }
            ],
            shippingAddress: {
              name: 'John Doe',
              address: '123 Main Street, Apartment 4B',
              city: 'Mumbai',
              state: 'Maharashtra',
              pincode: '400001',
              phone: '+91-9876543211'
            },
            paymentMethod: 'Pending'
          }
        ];

        setOrders(mockOrders);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch orders');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'confirmed':
        return <Check className="w-5 h-5 text-blue-600" />;
      case 'processing':
        return <RefreshCw className="w-5 h-5 text-blue-600" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-purple-600" />;
      case 'delivered':
        return <Package className="w-5 h-5 text-green-600" />;
      case 'cancelled':
        return <X className="w-5 h-5 text-red-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'processing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'shipped':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const toggleOrderExpansion = (orderId: number) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const filteredOrders = statusFilter === 'all' 
    ? orders 
    : orders.filter(order => order.status === statusFilter);

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-200">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-4">
            <RefreshCw className="w-8 h-8 animate-spin text-primary-700 mx-auto" />
            <p className="font-body text-brown-600">Loading your orders...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-cream-200">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-4">
            <AlertCircle className="w-8 h-8 text-red-600 mx-auto" />
            <p className="font-body text-red-600">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="btn btn-primary"
            >
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-200">
      <Header />
      
      {/* Page Header */}
      <section className="bg-white border-b border-primary-200/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-headline text-3xl sm:text-4xl font-bold text-brown-800">
                MY ORDERS
              </h1>
              <p className="font-body text-brown-600 mt-2">
                Track and manage your craft orders
              </p>
            </div>
            
            {/* Status Filter */}
            <div className="flex items-center space-x-3">
              <span className="font-body text-sm text-brown-700">Filter by:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="input text-sm py-2 min-w-[140px]"
              >
                <option value="all">All Orders</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Orders List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <div className="space-y-4">
              <div className="w-24 h-24 bg-primary-200/30 rounded-full flex items-center justify-center mx-auto">
                <Package className="w-8 h-8 text-brown-600" />
              </div>
              <h3 className="font-headline text-xl font-bold text-brown-800">No orders found</h3>
              <p className="font-body text-brown-600">
                {statusFilter === 'all' 
                  ? "You haven't placed any orders yet." 
                  : `No orders with status "${statusFilter}" found.`}
              </p>
              <button 
                onClick={() => window.location.href = '/products'}
                className="btn btn-primary"
              >
                Start Shopping
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl border border-primary-200/20 overflow-hidden shadow-md">
                {/* Order Header */}
                <div 
                  className="p-6 cursor-pointer hover:bg-cream-50 transition-colors duration-200"
                  onClick={() => toggleOrderExpansion(order.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {/* Order ID & Date */}
                      <div>
                        <p className="font-body text-sm text-brown-600">Order ID</p>
                        <p className="font-body font-semibold text-brown-800">#{order.id}</p>
                        <p className="font-body text-xs text-brown-500 mt-1">
                          {new Date(order.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </p>
                      </div>

                      {/* Status */}
                      <div>
                        <p className="font-body text-sm text-brown-600">Status</p>
                        <div className="flex items-center space-x-2 mt-1">
                          {getStatusIcon(order.status)}
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-body font-semibold border ${getStatusColor(order.status)}`}>
                            {order.status.toUpperCase()}
                          </span>
                        </div>
                      </div>

                      {/* Total Amount */}
                      <div>
                        <p className="font-body text-sm text-brown-600">Total Amount</p>
                        <p className="font-headline text-lg font-bold text-brown-800">
                          ₹{order.totalAmount.toLocaleString()}
                        </p>
                        <p className="font-body text-xs text-brown-500 mt-1">
                          {order.isPaid ? 'Paid' : 'Payment Pending'}
                        </p>
                      </div>

                      {/* Items Count */}
                      <div>
                        <p className="font-body text-sm text-brown-600">Items</p>
                        <p className="font-body font-semibold text-brown-800">
                          {order.orderItems.length} item{order.orderItems.length > 1 ? 's' : ''}
                        </p>
                        {order.trackingNumber && (
                          <p className="font-body text-xs text-brown-500 mt-1">
                            Track: {order.trackingNumber}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Expand/Collapse Button */}
                    <div className="ml-4">
                      {expandedOrder === order.id ? (
                        <ChevronUp className="w-5 h-5 text-brown-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-brown-600" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded Order Details */}
                {expandedOrder === order.id && (
                  <div className="border-t border-primary-200/20 bg-cream-25 p-6 space-y-6">
                    {/* Order Items */}
                    <div>
                      <h3 className="font-headline text-lg font-bold text-brown-800 mb-4">ORDER ITEMS</h3>
                      <div className="space-y-4">
                        {order.orderItems.map((item) => (
                          <div key={item.id} className="flex items-center space-x-4 bg-white p-4 rounded-xl border border-primary-200/20">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h4 className="font-body font-semibold text-brown-800">{item.name}</h4>
                              <p className="font-body text-sm text-brown-600">
                                By {item.seller?.name || `Seller ${item.sellerId}`}
                              </p>
                              <div className="flex items-center space-x-4 mt-1">
                                <span className="font-body text-sm text-brown-600">
                                  Qty: {item.quantity}
                                </span>
                                <span className="font-body font-semibold text-brown-800">
                                  ₹{item.amount.toLocaleString()}
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-col space-y-2">
                              <button className="p-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors text-xs">
                                <Star className="w-4 h-4" />
                              </button>
                              <button className="p-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors text-xs">
                                <MessageCircle className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Details Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Shipping Address */}
                      <div className="bg-white p-4 rounded-xl border border-primary-200/20">
                        <h4 className="font-body font-semibold text-brown-800 mb-3 flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-primary-700" />
                          <span>Shipping Address</span>
                        </h4>
                        {order.shippingAddress && (
                          <div className="space-y-1 font-body text-sm text-brown-700">
                            <p className="font-semibold">{order.shippingAddress.name}</p>
                            <p>{order.shippingAddress.address}</p>
                            <p>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
                            <p>Phone: {order.shippingAddress.phone}</p>
                          </div>
                        )}
                      </div>

                      {/* Payment & Delivery Info */}
                      <div className="bg-white p-4 rounded-xl border border-primary-200/20">
                        <h4 className="font-body font-semibold text-brown-800 mb-3 flex items-center space-x-2">
                          <CreditCard className="w-4 h-4 text-primary-700" />
                          <span>Payment & Delivery</span>
                        </h4>
                        <div className="space-y-2 font-body text-sm">
                          <div className="flex justify-between">
                            <span className="text-brown-600">Payment Method:</span>
                            <span className="text-brown-800 font-semibold">{order.paymentMethod}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-brown-600">Payment Status:</span>
                            <span className={`font-semibold ${order.isPaid ? 'text-green-600' : 'text-red-600'}`}>
                              {order.isPaid ? 'Paid' : 'Pending'}
                            </span>
                          </div>
                          {order.estimatedDelivery && (
                            <div className="flex justify-between">
                              <span className="text-brown-600">Est. Delivery:</span>
                              <span className="text-brown-800 font-semibold">
                                {new Date(order.estimatedDelivery).toLocaleDateString('en-IN', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric'
                                })}
                              </span>
                            </div>
                          )}
                          {order.trackingNumber && (
                            <div className="flex justify-between">
                              <span className="text-brown-600">Tracking:</span>
                              <span className="text-brown-800 font-semibold">{order.trackingNumber}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3 pt-4 border-t border-primary-200/20">
                      {order.status === 'pending' && !order.isPaid && (
                        <button className="btn btn-primary">
                          Complete Payment
                        </button>
                      )}
                      {order.status === 'pending' && (
                        <button className="btn btn-secondary">
                          Cancel Order
                        </button>
                      )}
                      {order.trackingNumber && (
                        <button className="btn btn-secondary">
                          Track Package
                        </button>
                      )}
                      {order.status === 'delivered' && (
                        <button className="btn btn-secondary">
                          Return/Exchange
                        </button>
                      )}
                      <button className="btn btn-secondary flex items-center space-x-2">
                        <Download className="w-4 h-4" />
                        <span>Download Invoice</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Orders;
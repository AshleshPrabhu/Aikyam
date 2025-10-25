// API Service for Products
// This will be used to connect to the backend when endpoints are ready

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export interface Item {
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
  createdAt: string;
  updatedAt: string;
}

export interface CreateItemRequest {
  name: string;
  amount: number;
  image: string;
  quantity: number;
  sellerId: number;
}

class ProductService {
  // Get all items - TODO: Backend needs to implement this endpoint
  async getAllItems(): Promise<Item[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/items`);
      if (!response.ok) {
        throw new Error('Failed to fetch items');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching all items:', error);
      throw error;
    }
  }

  // Get items by seller ID - This endpoint exists in backend
  async getItemsBySeller(sellerId: number): Promise<Item[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/items/${sellerId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch seller items');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching seller items:', error);
      throw error;
    }
  }

  // Get single item by ID - TODO: Backend needs to implement this endpoint
  async getItemById(id: number): Promise<Item> {
    try {
      const response = await fetch(`${API_BASE_URL}/items/detail/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch item details');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching item details:', error);
      throw error;
    }
  }

  // Create new item - This endpoint exists in backend
  async createItem(item: CreateItemRequest): Promise<Item> {
    try {
      const response = await fetch(`${API_BASE_URL}/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create item');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating item:', error);
      throw error;
    }
  }

  // Search items - TODO: Backend needs to implement this endpoint
  async searchItems(query: string): Promise<Item[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/items/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error('Failed to search items');
      }
      return await response.json();
    } catch (error) {
      console.error('Error searching items:', error);
      throw error;
    }
  }

  // Filter items - TODO: Backend needs to implement this endpoint
  async filterItems(filters: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: string;
  }): Promise<Item[]> {
    try {
      const params = new URLSearchParams();
      if (filters.category) params.append('category', filters.category);
      if (filters.minPrice) params.append('minPrice', filters.minPrice.toString());
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
      if (filters.sortBy) params.append('sortBy', filters.sortBy);

      const response = await fetch(`${API_BASE_URL}/items/filter?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to filter items');
      }
      return await response.json();
    } catch (error) {
      console.error('Error filtering items:', error);
      throw error;
    }
  }
}

export const productService = new ProductService();

// Mock data for development until backend endpoints are ready
export const mockProducts: Item[] = [
  {
    id: 1,
    name: "Handwoven Kashmiri Pashmina Shawl",
    amount: 8500,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    quantity: 5,
    sellerId: 1,
    seller: { id: 1, name: "Rajesh Kumar", phone: "+91-9876543210" },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 2,
    name: "Blue Pottery Decorative Vase Set",
    amount: 3200,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    quantity: 8,
    sellerId: 2,
    seller: { id: 2, name: "Priya Sharma", phone: "+91-9876543211" },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 3,
    name: "Brass Handicraft Dancing Ganesha",
    amount: 5600,
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    quantity: 3,
    sellerId: 3,
    seller: { id: 3, name: "Vikram Patel", phone: "+91-9876543212" },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 4,
    name: "Madhubani Painting on Canvas",
    amount: 2800,
    image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    quantity: 12,
    sellerId: 4,
    seller: { id: 4, name: "Sunita Devi", phone: "+91-9876543213" },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 5,
    name: "Sandalwood Carved Jewelry Box",
    amount: 4200,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    quantity: 6,
    sellerId: 5,
    seller: { id: 5, name: "Raman Iyer", phone: "+91-9876543214" },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 6,
    name: "Embroidered Phulkari Dupatta",
    amount: 1800,
    image: "https://images.unsplash.com/photo-1610832835364-572dd1ffd8d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    quantity: 15,
    sellerId: 6,
    seller: { id: 6, name: "Gurpreet Kaur", phone: "+91-9876543215" },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 7,
    name: "Terracotta Garden Planters Set",
    amount: 2500,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    quantity: 20,
    sellerId: 7,
    seller: { id: 7, name: "Ramesh Chand", phone: "+91-9876543216" },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 8,
    name: "Handmade Silver Earrings",
    amount: 3500,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    quantity: 10,
    sellerId: 8,
    seller: { id: 8, name: "Meera Jain", phone: "+91-9876543217" },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 9,
    name: "Traditional Dhokra Art Piece",
    amount: 6800,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    quantity: 4,
    sellerId: 9,
    seller: { id: 9, name: "Mahesh Bauri", phone: "+91-9876543218" },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 10,
    name: "Kantha Embroidered Table Runner",
    amount: 1200,
    image: "https://images.unsplash.com/photo-1610832835364-572dd1ffd8d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    quantity: 25,
    sellerId: 10,
    seller: { id: 10, name: "Parvati Das", phone: "+91-9876543219" },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 11,
    name: "Bamboo Handicraft Lamp",
    amount: 1800,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    quantity: 18,
    sellerId: 11,
    seller: { id: 11, name: "Laxman Singh", phone: "+91-9876543220" },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 12,
    name: "Handwoven Ikat Silk Scarf",
    amount: 4500,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    quantity: 7,
    sellerId: 12,
    seller: { id: 12, name: "Kamala Devi", phone: "+91-9876543221" },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Helper function to transform Item to ProductCard interface
export const transformItemToProduct = (item: Item) => {
  const categories = ['Textiles', 'Pottery', 'Metalwork', 'Paintings', 'Woodwork', 'Embroidery', 'Jewelry', 'Home Decor'];
  const locations = [
    'Mumbai, Maharashtra', 
    'Delhi, NCR', 
    'Jaipur, Rajasthan', 
    'Kolkata, West Bengal', 
    'Chennai, Tamil Nadu',
    'Srinagar, Kashmir',
    'Mysore, Karnataka',
    'Amritsar, Punjab',
    'Madhubani, Bihar',
    'Moradabad, UP'
  ];
  
  return {
    id: item.id.toString(),
    title: item.name,
    price: item.amount,
    originalPrice: item.amount > 2000 ? Math.floor(item.amount * 1.3) : undefined,
    image: item.image,
    artisan: {
      name: item.seller?.name || `Artisan ${item.sellerId}`,
      location: locations[Math.floor(Math.random() * locations.length)],
      avatar: undefined
    },
    category: categories[Math.floor(Math.random() * categories.length)],
    rating: 4.0 + Math.random() * 1.0,
    reviewCount: Math.floor(Math.random() * 200) + 10,
    isWishlisted: false
  };
};
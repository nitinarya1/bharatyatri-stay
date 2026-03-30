const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = require('./config/db');
const Hotel = require('./models/Hotel');
const Admin = require('./models/Admin');
const User = require('./models/User');

const sampleHotels = [
  {
    name: 'Shri Ram Dharamshala',
    city: 'Prayagraj',
    address: 'Near Triveni Sangam, Civil Lines, Prayagraj, UP 211001',
    description: 'A peaceful and affordable dharamshala located just 500 meters from the holy Triveni Sangam. Perfect for pilgrims visiting Prayagraj for spiritual purposes. Clean rooms with attached bathrooms, hot water, and a serene courtyard.',
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800',
      'https://images.unsplash.com/photo-1590490360182-c33d955e4c47?w=800'
    ],
    pricePerNight: 450,
    roomTypes: [
      { type: 'Non-AC Double', price: 450, available: 8 },
      { type: 'AC Double', price: 800, available: 4 },
      { type: 'Family Room (4 beds)', price: 1200, available: 2 }
    ],
    amenities: ['Free WiFi', 'Hot Water', 'Parking', 'Temple Nearby', 'Vegetarian Food', '24/7 Reception'],
    rating: 4.3,
    totalReviews: 127,
    contactPhone: '9876543210',
    mapLink: 'https://maps.google.com/?q=25.4358,81.8463',
    nearbyAttractions: ['Triveni Sangam (500m)', 'Hanuman Mandir (1km)', 'Allahabad Fort (2km)'],
    propertyType: 'dharamshala',
    policies: {
      checkIn: '11:00 AM',
      checkOut: '10:00 AM',
      cancellation: 'Free cancellation up to 24 hours before check-in',
      idRequired: true
    }
  },
  {
    name: 'Ganga View Guest House',
    city: 'Varanasi',
    address: 'Dashashwamedh Ghat Road, Varanasi, UP 221001',
    description: 'Experience the magic of Varanasi from this charming guest house overlooking the sacred Ganges River. Watch the mesmerizing Ganga Aarti from your room balcony. Ideal location for exploring the ancient ghats and temples.',
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800'
    ],
    pricePerNight: 600,
    roomTypes: [
      { type: 'River View Non-AC', price: 600, available: 5 },
      { type: 'River View AC', price: 1100, available: 3 },
      { type: 'Deluxe AC Suite', price: 1800, available: 2 }
    ],
    amenities: ['River View', 'Free WiFi', 'Hot Water', 'Rooftop Restaurant', 'Ghat Access', 'Laundry'],
    rating: 4.5,
    totalReviews: 254,
    contactPhone: '9123456789',
    mapLink: 'https://maps.google.com/?q=25.3109,83.0107',
    nearbyAttractions: ['Dashashwamedh Ghat (100m)', 'Kashi Vishwanath Temple (500m)', 'Manikarnika Ghat (800m)'],
    propertyType: 'guest_house',
    policies: {
      checkIn: '12:00 PM',
      checkOut: '11:00 AM',
      cancellation: 'Free cancellation up to 48 hours before check-in',
      idRequired: true
    }
  },
  {
    name: 'Hotel Sangam Palace',
    city: 'Prayagraj',
    address: 'MG Road, Civil Lines, Prayagraj, UP 211001',
    description: 'A well-maintained budget hotel in the heart of Civil Lines. Close to railway station and bus stand. Spacious rooms with modern amenities, perfect for both business and leisure travelers.',
    images: [
      'https://images.unsplash.com/photo-1618773928121-c32f02f12156?w=800',
      'https://images.unsplash.com/photo-1590490360182-c33d955e4c47?w=800',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'
    ],
    pricePerNight: 700,
    roomTypes: [
      { type: 'Standard Non-AC', price: 700, available: 10 },
      { type: 'Standard AC', price: 1200, available: 8 },
      { type: 'Deluxe AC', price: 1800, available: 4 }
    ],
    amenities: ['Free WiFi', 'AC', 'TV', 'Room Service', 'Parking', 'Power Backup', 'CCTV Security'],
    rating: 4.0,
    totalReviews: 89,
    contactPhone: '9988776655',
    mapLink: 'https://maps.google.com/?q=25.4484,81.8460',
    nearbyAttractions: ['Prayagraj Junction (1km)', 'Civil Lines Market (500m)', 'Anand Bhawan (2km)'],
    propertyType: 'hotel',
    policies: {
      checkIn: '12:00 PM',
      checkOut: '11:00 AM',
      cancellation: 'Free cancellation up to 24 hours before check-in',
      idRequired: true
    }
  },
  {
    name: 'Kashi Yatri Niwas',
    city: 'Varanasi',
    address: 'Lanka, BHU Road, Varanasi, UP 221005',
    description: 'Budget-friendly lodge near BHU campus, popular among students and young travelers. Clean, no-frills accommodation with helpful staff and great food nearby. Walking distance to Assi Ghat.',
    images: [
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800',
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800',
      'https://images.unsplash.com/photo-1618773928121-c32f02f12156?w=800'
    ],
    pricePerNight: 350,
    roomTypes: [
      { type: 'Single Non-AC', price: 350, available: 6 },
      { type: 'Double Non-AC', price: 550, available: 8 },
      { type: 'Double AC', price: 900, available: 4 }
    ],
    amenities: ['Free WiFi', 'Hot Water', 'Laundry', '24/7 Reception', 'Near BHU'],
    rating: 3.8,
    totalReviews: 176,
    contactPhone: '9112233445',
    mapLink: 'https://maps.google.com/?q=25.2677,82.9913',
    nearbyAttractions: ['BHU Campus (200m)', 'Assi Ghat (1km)', 'New Vishwanath Temple (500m)'],
    propertyType: 'lodge',
    policies: {
      checkIn: '11:00 AM',
      checkOut: '10:00 AM',
      cancellation: 'Free cancellation up to 12 hours before check-in',
      idRequired: true
    }
  },
  {
    name: 'Maa Ganga Dharamshala',
    city: 'Varanasi',
    address: 'Godowlia, Near Kashi Vishwanath, Varanasi, UP 221001',
    description: 'Traditional dharamshala in the heart of old Varanasi. Walking distance to the famous Kashi Vishwanath Temple and the bustling Godowlia market. Simple, clean rooms perfect for devotees.',
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800'
    ],
    pricePerNight: 300,
    roomTypes: [
      { type: 'Basic Non-AC', price: 300, available: 12 },
      { type: 'Non-AC Double', price: 500, available: 6 },
      { type: 'AC Double', price: 850, available: 3 }
    ],
    amenities: ['Hot Water', 'Temple Access', 'Vegetarian Food', 'Locker', 'Meditation Hall'],
    rating: 4.1,
    totalReviews: 312,
    contactPhone: '9556677889',
    mapLink: 'https://maps.google.com/?q=25.3109,83.0100',
    nearbyAttractions: ['Kashi Vishwanath Temple (200m)', 'Godowlia Market (100m)', 'Dashashwamedh Ghat (500m)'],
    propertyType: 'dharamshala',
    policies: {
      checkIn: '10:00 AM',
      checkOut: '9:00 AM',
      cancellation: 'Non-refundable. Date change allowed once.',
      idRequired: true
    }
  },
  {
    name: 'Prayag Stay Inn',
    city: 'Prayagraj',
    address: 'Lukerganj, Near Railway Station, Prayagraj, UP 211001',
    description: 'Convenient hotel located just 5 minutes walk from Prayagraj Junction railway station. Ideal for transit travelers and those visiting the city for Magh Mela or Kumbh Mela. Modern rooms with all basic amenities.',
    images: [
      'https://images.unsplash.com/photo-1618773928121-c32f02f12156?w=800',
      'https://images.unsplash.com/photo-1590490360182-c33d955e4c47?w=800',
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800'
    ],
    pricePerNight: 550,
    roomTypes: [
      { type: 'Economy Non-AC', price: 550, available: 6 },
      { type: 'Standard AC', price: 1000, available: 5 },
      { type: 'Premium AC', price: 1500, available: 3 }
    ],
    amenities: ['Free WiFi', 'AC', 'TV', 'Room Service', 'Near Railway Station', 'Power Backup', 'Elevator'],
    rating: 3.9,
    totalReviews: 145,
    contactPhone: '9334455667',
    mapLink: 'https://maps.google.com/?q=25.4408,81.8432',
    nearbyAttractions: ['Prayagraj Junction (400m)', 'Khusro Bagh (1km)', 'Triveni Sangam (5km)'],
    propertyType: 'hotel',
    policies: {
      checkIn: '12:00 PM',
      checkOut: '11:00 AM',
      cancellation: 'Free cancellation up to 6 hours before check-in',
      idRequired: true
    }
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Hotel.deleteMany({});
    await Admin.deleteMany({});
    await User.deleteMany({});

    console.log('🗑️  Cleared existing data');

    // Seed hotels
    const hotels = await Hotel.insertMany(sampleHotels);
    console.log(`🏨 Seeded ${hotels.length} hotels`);

    // Create test user
    const user = await User.create({
      name: 'Test User',
      email: 'user@example.com',
      password: 'password123',
      phone: '9876543210'
    });
    console.log(`👤 Test User created: ${user.email}`);

    // Create admin user
    const admin = await Admin.create({
      username: process.env.ADMIN_USERNAME || 'admin',
      password: process.env.ADMIN_PASSWORD || 'bharatyatri@123'
    });
    console.log(`👤 Admin created: ${admin.username}`);

    console.log('\n✅ Database seeded successfully!');
    console.log('📌 Admin Login: username="admin", password="bharatyatri@123"');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error.message);
    process.exit(1);
  }
};

seedDatabase();

require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("../models/User");
const CreatorReel = require("../models/CreatorReel");
const Campaign = require("../models/Campaign");

const videoData = [
    {
      "source": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      "subtitle": "By Blender Foundation",
      "thumb": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
      "title": "Big Buck Bunny"
    },
    {
      "source": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      "subtitle": "By Blender Foundation",
      "thumb": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg",
      "title": "Elephant Dream"
    },
    {
      "source": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      "subtitle": "By Google",
      "thumb": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg",
      "title": "For Bigger Blazes"
    },
    {
      "source": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      "subtitle": "By Google",
      "thumb": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg",
      "title": "For Bigger Escape"
    },
    {
      "source": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      "subtitle": "By Google",
      "thumb": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerFun.jpg",
      "title": "For Bigger Fun"
    },
    {
      "source": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
      "subtitle": "By Google",
      "thumb": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerJoyrides.jpg",
      "title": "For Bigger Joyrides"
    },
    {
      "source": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
      "subtitle": "By Google",
      "thumb": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerMeltdowns.jpg",
      "title": "For Bigger Meltdowns"
    },
    {
      "source": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
      "subtitle": "By Blender Foundation",
      "thumb": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg",
      "title": "Sintel"
    },
    {
      "source": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
      "subtitle": "By Garage419",
      "thumb": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/SubaruOutbackOnStreetAndDirt.jpg",
      "title": "Subaru Outback On Street And Dirt"
    },
    {
      "source": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
      "subtitle": "By Blender Foundation",
      "thumb": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/TearsOfSteel.jpg",
      "title": "Tears of Steel"
    },
    {
      "source": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
      "subtitle": "By Garage419",
      "thumb": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/VolkswagenGTIReview.jpg",
      "title": "Volkswagen GTI Review"
    },
    {
      "source": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
      "subtitle": "By Garage419",
      "thumb": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/WeAreGoingOnBullrun.jpg",
      "title": "We Are Going On Bullrun"
    },
    {
      "source": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
      "subtitle": "By Garage419",
      "thumb": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/WhatCarCanYouGetForAGrand.jpg",
      "title": "What care can you get for a grand?"
    }
  ];
  
  const names = [
    'John Doe', 'Jane Smith', 'Alex Johnson', 'Sarah Williams', 'Mike Brown',
    'Emma Davis', 'James Wilson', 'Olivia Taylor', 'Robert Miller', 'Sophia Anderson',
    'David Thomas', 'Isabella Jackson', 'William White', 'Mia Harris', 'Charles Martin',
    'Abigail Thompson', 'Joseph Garcia', 'Emily Martinez', 'Thomas Robinson', 'Elizabeth Clark'
  ];
  
  const companies = [
    'Nike', 'Coca-Cola', 'Apple', 'Samsung', 'Amazon', 'Google', 'Microsoft', 'Tesla',
    'Adidas', 'Pepsi', 'McDonald\'s', 'Starbucks', 'Disney', 'Netflix', 'Spotify',
    'Sony', 'Intel', 'IBM', 'Ford', 'Toyota'
  ];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    await User.deleteMany();
    await CreatorReel.deleteMany();
    await Campaign.deleteMany();
    console.log("🧹 Cleared existing data");

    const users = [];
    const roles = ["consumer", "creator", "brand"];

    for (let i = 0; i < 20; i++) {
      const rand = Math.random();
      const role = rand < 0.5 ? "consumer" : rand < 0.8 ? "creator" : "brand";

      const name =
        role === "brand"
          ? companies[i % companies.length]
          : names[i];

      const email = `${name.toLowerCase().replace(/\s+/g, "")}@example.com`;

      const hashedPassword = await bcrypt.hash("password123", 10);

      users.push(
        await User.create({
          name,
          email,
          password: hashedPassword,
          role
        })
      );
    }

    const creators = users.filter(u => u.role === "creator");
    const brands = users.filter(u => u.role === "brand");

    // Create Creator Reels
    let videoIndex = 0;
    for (const creator of creators) {
      if (!videoData[videoIndex]) break;

      await CreatorReel.create({
        creatorId: creator._id,
        mediaUrl: videoData[videoIndex].source,
        views: Math.floor(Math.random() * 10000),
        earnings: Math.floor(Math.random() * 1000)
      });

      videoIndex++;
    }

    // Create Campaigns
    for (const brand of brands) {
      await Campaign.create({
        brandId: brand._id,
        title: `${brand.name} Campaign`,
        mediaUrl: videoData[Math.floor(Math.random() * videoData.length)].source,
        budget: Math.floor(Math.random() * 10000) + 1000,
        status: "active"
      });
    }

    console.log("🎉 Database seeding complete");
  } catch (err) {
    console.error("❌ Seeding failed:", err);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 MongoDB disconnected");
  }
}

seedDatabase();

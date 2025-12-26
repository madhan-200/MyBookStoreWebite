import asyncio
from datetime import datetime
from database import (
    products_collection, reviews_collection,
    gallery_collection, admin_users_collection
)
from auth import get_password_hash


async def seed_database():
    """Seed the database with initial data"""
    
    print("Starting database seeding...")
    
    # Clear existing data
    await products_collection.delete_many({})
    await reviews_collection.delete_many({})
    await gallery_collection.delete_many({})
    await admin_users_collection.delete_many({})
    print("✓ Cleared existing data")
    
    # Seed Products
    products = [
        # School Books
        {
            "name": "Class 10 Tamil Textbook",
            "description": "NCERT prescribed Tamil textbook for Class 10",
            "price": 120,
            "category": "school",
            "availability": "In Stock",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        {
            "name": "Class 12 Mathematics",
            "description": "State board mathematics textbook",
            "price": 150,
            "category": "school",
            "availability": "In Stock",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        {
            "name": "Class 8 Science Book",
            "description": "CBSE Science textbook with latest syllabus",
            "price": 135,
            "category": "school",
            "availability": "In Stock",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        {
            "name": "Class 6 English Reader",
            "description": "English supplementary reader",
            "price": 95,
            "category": "school",
            "availability": "Limited Stock",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        # Study Guides
        {
            "name": "Physics Guide - Class 12",
            "description": "Comprehensive physics guide with solved problems",
            "price": 250,
            "category": "guides",
            "availability": "In Stock",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        {
            "name": "Chemistry Reference Book",
            "description": "Complete chemistry reference for competitive exams",
            "price": 280,
            "category": "guides",
            "availability": "In Stock",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        {
            "name": "Mathematics Problem Solver",
            "description": "Step-by-step solutions for all topics",
            "price": 220,
            "category": "guides",
            "availability": "In Stock",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        {
            "name": "English Grammar Guide",
            "description": "Complete grammar reference with exercises",
            "price": 180,
            "category": "guides",
            "availability": "In Stock",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        # General Reading
        {
            "name": "Tamil Novels Collection",
            "description": "Popular Tamil literature novels",
            "price": 200,
            "category": "reading",
            "availability": "In Stock",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        {
            "name": "Children Story Books",
            "description": "Illustrated story books for kids",
            "price": 120,
            "category": "reading",
            "availability": "In Stock",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        {
            "name": "General Knowledge Book",
            "description": "Latest edition GK book",
            "price": 150,
            "category": "reading",
            "availability": "In Stock",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        {
            "name": "Moral Stories for Kids",
            "description": "Collection of inspiring moral stories",
            "price": 95,
            "category": "reading",
            "availability": "In Stock",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        # Stationery
        {
            "name": "Notebook Bundle",
            "description": "Pack of 6 ruled notebooks (200 pages)",
            "price": 180,
            "category": "stationery",
            "availability": "In Stock",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        {
            "name": "Pen Set",
            "description": "Blue & black ballpoint pens pack of 10",
            "price": 80,
            "category": "stationery",
            "availability": "In Stock",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        {
            "name": "Geometry Box",
            "description": "Complete geometry instruments set",
            "price": 120,
            "category": "stationery",
            "availability": "In Stock",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        {
            "name": "Art Supplies Kit",
            "description": "Crayons, color pencils, sketch pens",
            "price": 250,
            "category": "stationery",
            "availability": "In Stock",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        {
            "name": "Drawing Book A4",
            "description": "Premium quality drawing book",
            "price": 60,
            "category": "stationery",
            "availability": "In Stock",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        {
            "name": "School Bag",
            "description": "Durable school backpack",
            "price": 450,
            "category": "stationery",
            "availability": "In Stock",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
    ]
    
    await products_collection.insert_many(products)
    print(f"✓ Seeded {len(products)} products")
    
    # Seed Reviews (all approved)
    reviews = [
        {
            "name": "Priya Kumar",
            "rating": 4,
            "comment": "Very reliable bookstore for all school books. They have the latest editions and prices are genuine. My go-to place for my kids' school supplies.",
            "date": "March 2025",
            "approved": True,
            "created_at": datetime.utcnow()
        },
        {
            "name": "Rajesh M",
            "rating": 4,
            "comment": "Good availability of study guides and reference books. The staff is helpful in finding the right materials. Located conveniently in Town Hall.",
            "date": "February 2025",
            "approved": True,
            "created_at": datetime.utcnow()
        },
        {
            "name": "Lakshmi S",
            "rating": 4,
            "comment": "Trusted store for stationery items. Prices are affordable and they have a wide range of products. Inside Maharaja Fancy, easy to locate.",
            "date": "January 2025",
            "approved": True,
            "created_at": datetime.utcnow()
        },
        {
            "name": "Karthik P",
            "rating": 3,
            "comment": "Decent collection of books. Found most of what I needed for my nephew's school. Would be better if they had more space.",
            "date": "December 2024",
            "approved": True,
            "created_at": datetime.utcnow()
        },
        {
            "name": "Anitha R",
            "rating": 5,
            "comment": "Excellent service! They helped me find all the textbooks I needed. Genuine pricing and friendly staff. Highly recommend for school books.",
            "date": "November 2024",
            "approved": True,
            "created_at": datetime.utcnow()
        },
        {
            "name": "Muthu V",
            "rating": 4,
            "comment": "Been buying books here for years. Reliable and trustworthy. Good place for both books and stationery needs.",
            "date": "October 2024",
            "approved": True,
            "created_at": datetime.utcnow()
        }
    ]
    
    await reviews_collection.insert_many(reviews)
    print(f"✓ Seeded {len(reviews)} reviews")
    
    # Seed Gallery
    gallery_items = [
        {
            "title": "Store Front View",
            "description": "Our welcoming store entrance inside Maharaja Fancy",
            "image_url": None,
            "display_order": 1,
            "created_at": datetime.utcnow()
        },
        {
            "title": "School Books Section",
            "description": "Wide range of textbooks for all classes and boards",
            "image_url": None,
            "display_order": 2,
            "created_at": datetime.utcnow()
        },
        {
            "title": "Study Guides Collection",
            "description": "Reference books and guides for competitive exams",
            "image_url": None,
            "display_order": 3,
            "created_at": datetime.utcnow()
        },
        {
            "title": "Stationery Corner",
            "description": "Complete range of stationery items for students",
            "image_url": None,
            "display_order": 4,
            "created_at": datetime.utcnow()
        },
        {
            "title": "Customer Service Area",
            "description": "Our friendly staff ready to assist you",
            "image_url": None,
            "display_order": 5,
            "created_at": datetime.utcnow()
        },
        {
            "title": "Children Books Section",
            "description": "Story books and educational materials for kids",
            "image_url": None,
            "display_order": 6,
            "created_at": datetime.utcnow()
        },
        {
            "title": "Tamil Literature",
            "description": "Collection of Tamil novels and books",
            "image_url": None,
            "display_order": 7,
            "created_at": datetime.utcnow()
        },
        {
            "title": "Arts & Crafts Supplies",
            "description": "Drawing books, colors, and art materials",
            "image_url": None,
            "display_order": 8,
            "created_at": datetime.utcnow()
        },
        {
            "title": "Store Interior",
            "description": "Well-organized shelves with easy navigation",
            "image_url": None,
            "display_order": 9,
            "created_at": datetime.utcnow()
        }
    ]
    
    await gallery_collection.insert_many(gallery_items)
    print(f"✓ Seeded {len(gallery_items)} gallery items")
    
    # Seed Default Admin User
    admin_user = {
        "username": "admin",
        "email": "admin@radhamanistores.com",
        "password_hash": get_password_hash("admin123"),
        "role": "super_admin",
        "created_at": datetime.utcnow()
    }
    
    await admin_users_collection.insert_one(admin_user)
    print("✓ Created default admin user (username: admin, password: admin123)")
    
    print("\n✅ Database seeding completed successfully!")
    print("\nDefault Admin Credentials:")
    print("  Username: admin")
    print("  Password: admin123")
    print("  ⚠️  Please change the password after first login")


if __name__ == "__main__":
    asyncio.run(seed_database())

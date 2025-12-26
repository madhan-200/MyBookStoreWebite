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
            "name": "Class 10 All-in-One Tamil",
            "description": "Comprehensive textbook for Class 10 students",
            "price": 145,
            "category": "school",
            "availability": "In Stock",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        {
            "name": "Higher Secondary Math Vol 1",
            "description": "Standard mathematics textbook for class 12",
            "price": 180,
            "category": "school",
            "availability": "In Stock",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        # Guides
        {
            "name": "SSC Exam Master Guide",
            "description": "Complete preparatory guide for competitive exams",
            "price": 350,
            "category": "guides",
            "availability": "In Stock",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        {
            "name": "TNPSC Group 4 Guide",
            "description": "Latest edition for Tamil Nadu public service exams",
            "price": 320,
            "category": "guides",
            "availability": "In Stock",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        # Competitive Exam Books
        {
            "name": "NEET Biology MCQ Book",
            "description": "Detailed practice questions for NEET prep",
            "price": 450,
            "category": "competitive",
            "availability": "In Stock",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        # Kids Books
        {
            "name": "Illustrated Fairy Tales",
            "description": "Beautifully illustrated story book for children",
            "price": 200,
            "category": "kids",
            "availability": "In Stock",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        # Stationery
        {
            "name": "Premium Notebook Set",
            "description": "Pack of 5 long notebooks (192 pages)",
            "price": 160,
            "category": "stationery",
            "availability": "In Stock",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
    ]
    
    await products_collection.insert_many(products)
    print(f"✓ Seeded {len(products)} products")
    
    # Seed Reviews (Placeholder reviews as requested)
    reviews = [
        {
            "name": "Valued Customer",
            "rating": 5,
            "comment": "Excellent collection of competitive exam books. Highly recommended for students in Vadalur.",
            "date": "December 2025",
            "approved": True,
            "created_at": datetime.utcnow()
        },
        {
            "name": "Student Reviewer",
            "rating": 4,
            "comment": "Found all the guides I needed for my board exams here. Great service!",
            "date": "December 2025",
            "approved": True,
            "created_at": datetime.utcnow()
        }
    ]
    
    await reviews_collection.insert_many(reviews)
    print(f"✓ Seeded {len(reviews)} reviews")
    
    # Seed Gallery
    gallery_items = [
        {
            "title": "PrimeBooks Showroom",
            "description": "Our welcoming store interior at Vadalur",
            "image_url": "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=800",
            "display_order": 1,
            "created_at": datetime.utcnow()
        },
        {
            "title": "Stationery & Art Supplies",
            "description": "A wide range of pens, notebooks, and paints",
            "image_url": "https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?auto=format&fit=crop&q=80&w=800",
            "display_order": 2,
            "created_at": datetime.utcnow()
        },
        {
            "title": "Children's Corner",
            "description": "Colorful storybooks and educational games for kids",
            "image_url": "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800",
            "display_order": 3,
            "created_at": datetime.utcnow()
        },
        {
            "title": "Academic Excellence",
            "description": "Tamil Nadu State Board and Competitive Exam guides",
            "image_url": "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800",
            "display_order": 4,
            "created_at": datetime.utcnow()
        },
        {
            "title": "Premium Pens & Gifts",
            "description": "Branded pens and stationery gift sets",
            "image_url": "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800",
            "display_order": 5,
            "created_at": datetime.utcnow()
        }
    ]
    
    await gallery_collection.insert_many(gallery_items)
    print(f"✓ Seeded {len(gallery_items)} gallery items")
    
    # Seed Default Admin User
    admin_user = {
        "username": "admin",
        "email": "admin@book.com",
        "password_hash": get_password_hash(os.environ.get("ADMIN_DEFAULT_PASSWORD", "admin123")),
        "role": "super_admin",
        "created_at": datetime.utcnow()
    }
    
    await admin_users_collection.insert_one(admin_user)
    print("✓ Created default admin user (email: admin@book.com, password: admin123)")
    
    print("\n✅ Database seeding completed successfully!")
    print("\nDefault Admin Credentials:")
    print("  Username: admin")
    print("  Password: admin123")
    print("  ⚠️  Please change the password after first login")


if __name__ == "__main__":
    asyncio.run(seed_database())

from fastapi import APIRouter, HTTPException, Depends, status
from typing import List, Optional
from datetime import datetime
from bson import ObjectId
from models import (
    Product, ProductCreate, ProductUpdate,
    Review, ReviewCreate, ReviewUpdate,
    Gallery, GalleryCreate, GalleryUpdate
)
from database import products_collection, reviews_collection, gallery_collection

router = APIRouter(prefix="/api", tags=["public"])


# ============ PRODUCTS ============

@router.get("/products", response_model=List[Product])
async def get_products(category: Optional[str] = None):
    """Get all products, optionally filtered by category"""
    query = {} if not category else {"category": category}
    products = await products_collection.find(query).to_list(1000)
    
    for product in products:
        product["_id"] = str(product["_id"])
    
    return products


@router.get("/products/{product_id}", response_model=Product)
async def get_product(product_id: str):
    """Get a single product by ID"""
    if not ObjectId.is_valid(product_id):
        raise HTTPException(status_code=400, detail="Invalid product ID")
    
    product = await products_collection.find_one({"_id": ObjectId(product_id)})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    product["_id"] = str(product["_id"])
    return product


# ============ REVIEWS ============

@router.get("/reviews", response_model=List[Review])
async def get_reviews():
    """Get all approved reviews"""
    reviews = await reviews_collection.find({"approved": True}).to_list(1000)
    
    for review in reviews:
        review["_id"] = str(review["_id"])
    
    return reviews


@router.post("/reviews", response_model=Review, status_code=status.HTTP_201_CREATED)
async def create_review(review: ReviewCreate):
    """Submit a new review (requires admin approval)"""
    review_dict = review.dict()
    review_dict["approved"] = False  # New reviews need approval
    review_dict["created_at"] = datetime.utcnow()
    
    result = await reviews_collection.insert_one(review_dict)
    created_review = await reviews_collection.find_one({"_id": result.inserted_id})
    created_review["_id"] = str(created_review["_id"])
    
    return created_review


# ============ GALLERY ============

@router.get("/gallery", response_model=List[Gallery])
async def get_gallery():
    """Get all gallery items"""
    gallery_items = await gallery_collection.find().sort("display_order", 1).to_list(1000)
    
    for item in gallery_items:
        item["_id"] = str(item["_id"])
    
    return gallery_items
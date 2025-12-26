from fastapi import APIRouter, HTTPException, Depends, status
from typing import List
from datetime import datetime, timedelta
from bson import ObjectId
from models import (
    AdminUserCreate, AdminUserLogin, AdminUser, Token, AdminPasswordChange,
    Product, ProductCreate, ProductUpdate,
    Review, ReviewCreate, ReviewUpdate,
    Gallery, GalleryCreate, GalleryUpdate
)
from database import (
    admin_users_collection, products_collection,
    reviews_collection, gallery_collection
)
from auth import (
    verify_password, get_password_hash,
    create_access_token, verify_token
)

router = APIRouter(prefix="/api/admin", tags=["admin"])


# ============ ADMIN AUTH ============

@router.post("/login", response_model=Token)
async def admin_login(credentials: AdminUserLogin):
    """Admin login"""
    # Check if input is username or email
    admin = await admin_users_collection.find_one({
        "$or": [
            {"username": credentials.username},
            {"email": credentials.username}
        ]
    })
    
    if not admin or not verify_password(credentials.password, admin["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email/username or password"
        )
    
    access_token = create_access_token(data={"sub": admin["username"]})
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/register", response_model=AdminUser, status_code=status.HTTP_201_CREATED)
async def register_admin(admin_data: AdminUserCreate, username: str = Depends(verify_token)):
    """Register a new admin (requires authentication)"""
    # Check if username or email already exists
    existing_admin = await admin_users_collection.find_one({
        "$or": [{"username": admin_data.username}, {"email": admin_data.email}]
    })
    
    if existing_admin:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username or email already registered"
        )
    
    admin_dict = admin_data.dict()
    admin_dict["password_hash"] = get_password_hash(admin_data.password)
    del admin_dict["password"]
    admin_dict["created_at"] = datetime.utcnow()
    
    result = await admin_users_collection.insert_one(admin_dict)
    created_admin = await admin_users_collection.find_one({"_id": result.inserted_id})
    created_admin["_id"] = str(created_admin["_id"])
    
    return created_admin


@router.get("/me", response_model=AdminUser)
async def get_current_admin(username: str = Depends(verify_token)):
    """Get current admin info"""
    admin = await admin_users_collection.find_one({"username": username})
    if not admin:
        raise HTTPException(status_code=404, detail="Admin not found")
    
    admin["_id"] = str(admin["_id"])
    return admin


@router.post("/change-password")
async def change_password(
    data: AdminPasswordChange,
    username: str = Depends(verify_token)
):
    """Change admin password"""
    admin = await admin_users_collection.find_one({"username": username})
    if not admin:
        raise HTTPException(status_code=404, detail="Admin not found")
    
    if not verify_password(data.old_password, admin["password_hash"]):
        raise HTTPException(status_code=400, detail="Incorrect old password")
    
    new_password_hash = get_password_hash(data.new_password)
    await admin_users_collection.update_one(
        {"username": username},
        {"$set": {"password_hash": new_password_hash}}
    )
    
    return {"message": "Password changed successfully"}


# ============ PRODUCTS MANAGEMENT ============

@router.post("/products", response_model=Product, status_code=status.HTTP_201_CREATED)
async def create_product(product: ProductCreate, username: str = Depends(verify_token)):
    """Create a new product"""
    product_dict = product.dict()
    product_dict["created_at"] = datetime.utcnow()
    product_dict["updated_at"] = datetime.utcnow()
    
    result = await products_collection.insert_one(product_dict)
    created_product = await products_collection.find_one({"_id": result.inserted_id})
    created_product["_id"] = str(created_product["_id"])
    
    return created_product


@router.put("/products/{product_id}", response_model=Product)
async def update_product(
    product_id: str,
    product_update: ProductUpdate,
    username: str = Depends(verify_token)
):
    """Update a product"""
    if not ObjectId.is_valid(product_id):
        raise HTTPException(status_code=400, detail="Invalid product ID")
    
    update_data = {k: v for k, v in product_update.dict().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No update data provided")
    
    update_data["updated_at"] = datetime.utcnow()
    
    result = await products_collection.update_one(
        {"_id": ObjectId(product_id)},
        {"$set": update_data}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    
    updated_product = await products_collection.find_one({"_id": ObjectId(product_id)})
    updated_product["_id"] = str(updated_product["_id"])
    
    return updated_product


@router.delete("/products/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_product(product_id: str, username: str = Depends(verify_token)):
    """Delete a product"""
    if not ObjectId.is_valid(product_id):
        raise HTTPException(status_code=400, detail="Invalid product ID")
    
    result = await products_collection.delete_one({"_id": ObjectId(product_id)})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    
    return None


# ============ REVIEWS MANAGEMENT ============

@router.get("/reviews", response_model=List[Review])
async def get_all_reviews(username: str = Depends(verify_token)):
    """Get all reviews (including unapproved)"""
    reviews = await reviews_collection.find().to_list(1000)
    
    for review in reviews:
        review["_id"] = str(review["_id"])
    
    return reviews


@router.post("/reviews", response_model=Review, status_code=status.HTTP_201_CREATED)
async def create_review_admin(review: ReviewCreate, username: str = Depends(verify_token)):
    """Create a new review (auto-approved)"""
    review_dict = review.dict()
    review_dict["approved"] = True
    review_dict["created_at"] = datetime.utcnow()
    
    result = await reviews_collection.insert_one(review_dict)
    created_review = await reviews_collection.find_one({"_id": result.inserted_id})
    created_review["_id"] = str(created_review["_id"])
    
    return created_review


@router.put("/reviews/{review_id}", response_model=Review)
async def update_review(
    review_id: str,
    review_update: ReviewUpdate,
    username: str = Depends(verify_token)
):
    """Update a review"""
    if not ObjectId.is_valid(review_id):
        raise HTTPException(status_code=400, detail="Invalid review ID")
    
    update_data = {k: v for k, v in review_update.dict().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No update data provided")
    
    result = await reviews_collection.update_one(
        {"_id": ObjectId(review_id)},
        {"$set": update_data}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Review not found")
    
    updated_review = await reviews_collection.find_one({"_id": ObjectId(review_id)})
    updated_review["_id"] = str(updated_review["_id"])
    
    return updated_review


@router.put("/reviews/{review_id}/approve", response_model=Review)
async def approve_review(review_id: str, username: str = Depends(verify_token)):
    """Approve a review"""
    if not ObjectId.is_valid(review_id):
        raise HTTPException(status_code=400, detail="Invalid review ID")
    
    result = await reviews_collection.update_one(
        {"_id": ObjectId(review_id)},
        {"$set": {"approved": True}}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Review not found")
    
    updated_review = await reviews_collection.find_one({"_id": ObjectId(review_id)})
    updated_review["_id"] = str(updated_review["_id"])
    
    return updated_review


@router.delete("/reviews/{review_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_review(review_id: str, username: str = Depends(verify_token)):
    """Delete a review"""
    if not ObjectId.is_valid(review_id):
        raise HTTPException(status_code=400, detail="Invalid review ID")
    
    result = await reviews_collection.delete_one({"_id": ObjectId(review_id)})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Review not found")
    
    return None


# ============ GALLERY MANAGEMENT ============

@router.post("/gallery", response_model=Gallery, status_code=status.HTTP_201_CREATED)
async def create_gallery_item(gallery: GalleryCreate, username: str = Depends(verify_token)):
    """Create a new gallery item"""
    gallery_dict = gallery.dict()
    gallery_dict["created_at"] = datetime.utcnow()
    
    result = await gallery_collection.insert_one(gallery_dict)
    created_gallery = await gallery_collection.find_one({"_id": result.inserted_id})
    created_gallery["_id"] = str(created_gallery["_id"])
    
    return created_gallery


@router.put("/gallery/{gallery_id}", response_model=Gallery)
async def update_gallery_item(
    gallery_id: str,
    gallery_update: GalleryUpdate,
    username: str = Depends(verify_token)
):
    """Update a gallery item"""
    if not ObjectId.is_valid(gallery_id):
        raise HTTPException(status_code=400, detail="Invalid gallery ID")
    
    update_data = {k: v for k, v in gallery_update.dict().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No update data provided")
    
    result = await gallery_collection.update_one(
        {"_id": ObjectId(gallery_id)},
        {"$set": update_data}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Gallery item not found")
    
    updated_gallery = await gallery_collection.find_one({"_id": ObjectId(gallery_id)})
    updated_gallery["_id"] = str(updated_gallery["_id"])
    
    return updated_gallery


@router.delete("/gallery/{gallery_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_gallery_item(gallery_id: str, username: str = Depends(verify_token)):
    """Delete a gallery item"""
    if not ObjectId.is_valid(gallery_id):
        raise HTTPException(status_code=400, detail="Invalid gallery ID")
    
    result = await gallery_collection.delete_one({"_id": ObjectId(gallery_id)})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Gallery item not found")
    
    return None
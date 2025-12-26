from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from datetime import datetime
from bson import ObjectId


class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")


# Product Models
class ProductBase(BaseModel):
    name: str
    description: str
    price: float
    category: str  # school, guides, reading, stationery
    availability: str = "In Stock"


class ProductCreate(ProductBase):
    pass


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    category: Optional[str] = None
    availability: Optional[str] = None


class Product(ProductBase):
    id: str = Field(alias="_id")
    created_at: datetime
    updated_at: datetime

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}


# Review Models
class ReviewBase(BaseModel):
    name: str
    rating: int  # 1-5
    comment: str
    date: str


class ReviewCreate(ReviewBase):
    pass


class ReviewUpdate(BaseModel):
    approved: Optional[bool] = None


class Review(ReviewBase):
    id: str = Field(alias="_id")
    approved: bool = False
    created_at: datetime

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}


# Gallery Models
class GalleryBase(BaseModel):
    title: str
    description: str
    image_url: Optional[str] = None
    display_order: int = 0


class GalleryCreate(GalleryBase):
    pass


class GalleryUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    image_url: Optional[str] = None
    display_order: Optional[int] = None


class Gallery(GalleryBase):
    id: str = Field(alias="_id")
    created_at: datetime

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}


# Admin User Models
class AdminUserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str
    role: str = "admin"


class AdminUserLogin(BaseModel):
    username: str
    password: str


class AdminUser(BaseModel):
    id: str = Field(alias="_id")
    username: str
    email: EmailStr
    role: str
    created_at: datetime

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Optional[str] = None
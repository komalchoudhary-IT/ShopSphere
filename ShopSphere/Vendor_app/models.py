from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Vendor(models.Model):

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE
    )
    
    business_type=models.CharField(   
        max_length=100,
        blank=True,
        null=True)

    shop_name = models.CharField(max_length=100)
    
    shop_description=models.TextField(max_length=200)

    phone = models.CharField(max_length=15)

    gst_number = models.CharField(
        max_length=20,
        blank=True,
        null=True
    )

    address = models.TextField()

    shop_logo = models.ImageField(
        upload_to='vendor_logos/',
        blank=True,
        null=True,
    )

    is_approved = models.BooleanField(
        default=False
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.shop_name
    
    
class Product(models.Model):

    STATUS_CHOICES = (
        ('active', 'Active'),
        ('inactive', 'Inactive'),
        ('draft', 'Draft'),
    )

    CATEGORY_CHOICES = (
        ('electronics', 'Electronics'),
        ('fashion', 'Fashion'),
        ('books', 'Books'),
        ('home_kitchen', 'Home & Kitchen'),
        ('sports', 'Sports'),
    )

    vendor = models.ForeignKey(
        'Vendor',
        on_delete=models.CASCADE,
        related_name='products'
    )

    # Basic Information

    product_name = models.CharField(
        max_length=255
    )

    category = models.CharField(
        max_length=50,
        choices=CATEGORY_CHOICES
    )

    brand = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )

    # Pricing & Inventory

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    discount_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        blank=True,
        null=True
    )

    stock = models.PositiveIntegerField(
        default=0
    )

    sku = models.CharField(
        max_length=100,
        unique=True
    )

    # Images

    main_image = models.ImageField(
        upload_to='products/'
    )

    # Description

    short_description = models.TextField(
        blank=True,
        null=True
    )

    description = models.TextField(
        blank=True,
        null=True
    )

    specifications = models.TextField(
        blank=True,
        null=True
    )

    # Shipping

    weight = models.DecimalField(
        max_digits=6,
        decimal_places=2,
        blank=True,
        null=True
    )

    delivery_time = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )

    # Product Status

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='draft'
    )

    # Dates

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return self.product_name
    
    
class ProductImage(models.Model):

    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name='images'
    )

    image = models.ImageField(
        upload_to='product_gallery/'
    )
    
    uploaded_at = models.DateTimeField( auto_now_add=True )

    def __str__(self):
        return self.product.product_name
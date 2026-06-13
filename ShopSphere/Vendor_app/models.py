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
    

# class Product(models.Model):

#     vendor = models.ForeignKey(
#         Vendor,
#         on_delete=models.CASCADE
#     )

#     name = models.CharField(max_length=200)

#     price = models.DecimalField(
#         max_digits=10,
#         decimal_places=2
#     )

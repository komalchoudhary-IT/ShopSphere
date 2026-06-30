from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        ("Additional Information", {
            "fields": ("role","bio", "headline", "avatar"),
        }),
    )

    add_fieldsets = UserAdmin.add_fieldsets + (
        ("Additional Information", {
            "fields": ("role","bio", "headline", "avatar"),
        }),
    )

    list_display = (
        "username",
        "email",
        "role",
        "is_staff",
    )
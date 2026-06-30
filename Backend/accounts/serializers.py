from rest_framework import serializers
from .models import User

class RegisterSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'role']

    def create(self, validated_data):
        password = validated_data.pop('password')

        user = User(**validated_data)
        user.set_password(password)   # Encrypt password
        user.save()

        return user
    

class UserSerializer(serializers.ModelSerializer):

    avatar = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "role",
            "bio",
            "headline",
            "avatar",
        ]

    def get_avatar(self, obj):
        request = self.context.get("request")

        if obj.avatar:
            return request.build_absolute_uri(obj.avatar.url)
        return None
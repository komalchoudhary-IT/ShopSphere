from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import RegisterSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from .login_serializer import LoginSerializer
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated


class RegisterView(APIView):

    def post(self, request):

        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    "message": "User registered successfully"
                },
                status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class LoginView(APIView):

    def post(self, request):

        serializer = LoginSerializer(data=request.data)

        if serializer.is_valid():

            user = serializer.validated_data['user']

            refresh = RefreshToken.for_user(user)

            return Response({

                "access": str(refresh.access_token),

                "refresh": str(refresh),

                "username": user.username,

                "role": user.role

            })

        return Response(serializer.errors, status=400)
    




class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        if not user or not user.is_authenticated:
            return Response(
                {"error": "Not authenticated"},
                status=status.HTTP_401_UNAUTHORIZED
            )

        serializer = UserSerializer(user, context={"request": request})
        return Response(serializer.data)

    def put(self, request):
      user = request.user

      serializer = UserSerializer(
        user,
        data=request.data,
        partial=True,
        context={"request": request}
    )

      if serializer.is_valid():
        serializer.save()
        user.refresh_from_db()   # 🔥 IMPORTANT FIX

        return Response(UserSerializer(user, context={"request": request}).data)

      return Response(serializer.errors, status=400)
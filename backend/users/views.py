from rest_framework.response import Response
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .models import CustomUser
from .serializers import CustomUserSerializer, CustomUserDeleteSerializer
from rest_framework import status

class CustomUserListAPIView(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [IsAdminUser]

class CustomUserDeleteView(generics.GenericAPIView):
    serializer_class = CustomUserDeleteSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = request.user
        user.delete()

        response = Response({"detail": "アカウントを削除しました。"}, status=status.HTTP_204_NO_CONTENT)

        # Cookie削除
        response.delete_cookie('access_token', path='/')
        response.delete_cookie('refresh_token', path='/')

        return response
    

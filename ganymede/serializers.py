from rest_framework import serializers
from .models import Song, Artist, Genre, Album, Playlist


from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password


CustomUser = get_user_model()

class CustomUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'password', 'bio', 'profile_picture']
    
    def create(self, validated_data):
        # Encrypt the password before saving
        password = validated_data.pop('password')
        user = CustomUser(**validated_data)
        user.set_password(password)  # Hashing the password before saving
        user.save()
        return user


def absolute_media_url(request, file_field):
    if not file_field:
        return None

    try:
        url = file_field.url
    except ValueError:
        return None

    if request:
        return request.build_absolute_uri(url)
    return url


class SongSerializer(serializers.ModelSerializer):
    artist_name = serializers.CharField(source='artist.name', read_only=True)
    album_name = serializers.CharField(source='album.title', read_only=True)
    genre_name = serializers.CharField(source='genre.name', read_only=True)
    image_url = serializers.SerializerMethodField()
    cover_image = serializers.SerializerMethodField()
    music_url = serializers.SerializerMethodField()
    audio_file = serializers.SerializerMethodField()

    def get_image_url(self, obj):
        return absolute_media_url(self.context.get('request'), obj.image)

    def get_cover_image(self, obj):
        return self.get_image_url(obj)

    def get_music_url(self, obj):
        return absolute_media_url(self.context.get('request'), obj.music_file)

    def get_audio_file(self, obj):
        return self.get_music_url(obj)

    class Meta:
        model = Song
        fields = [
            'id',
            'title',
            'artist',
            'artist_name',
            'album',
            'album_name',
            'release_date',
            'genre',
            'genre_name',
            'duration',
            'created_at',
            'updated_at',
            'image',
            'image_url',
            'cover_image',
            'music_file',
            'music_url',
            'audio_file',
        ]

class ArtistSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    song_count = serializers.IntegerField(source='song_set.count', read_only=True)

    def get_image_url(self, obj):
        return absolute_media_url(self.context.get('request'), obj.image)

    class Meta:
        model = Artist
        fields = ['id', 'name', 'biography', 'image', 'image_url', 'song_count']

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'

class AlbumSerializer(serializers.ModelSerializer):
    artist_name = serializers.CharField(source='artist.name', read_only=True)
    cover_image_url = serializers.SerializerMethodField()
    song_count = serializers.IntegerField(source='songs.count', read_only=True)

    def get_cover_image_url(self, obj):
        return absolute_media_url(self.context.get('request'), obj.cover_image)

    class Meta:
        model = Album
        fields = [
            'id',
            'title',
            'artist',
            'artist_name',
            'release_date',
            'cover_image',
            'cover_image_url',
            'songs',
            'song_count',
        ]


class PlaylistSerializer(serializers.ModelSerializer):
    cover_image_url = serializers.SerializerMethodField()
    songs = SongSerializer(many=True, read_only=True)

    def get_cover_image_url(self, obj):
        return absolute_media_url(self.context.get('request'), obj.cover_image)

    class Meta:
        model = Playlist
        fields = ['id', 'name', 'cover_image', 'cover_image_url', 'songs', 'created_at', 'updated_at']

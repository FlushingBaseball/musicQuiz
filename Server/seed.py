from faker import Faker
from random import randint
from config import db, app
from models import User, Artist, Song, Playlist, Playlist_Songs

fake = Faker()
with app.app_context():

    def seed_users():
        for _ in range(10):
            username = fake.unique.user_name()
            profile_pic = fake.image_url()
            score = randint(0, 100)
            streak = randint(0, 50)
            
            user = User(username=username, profilePic=profile_pic, score=score, streak=streak)
            user.password_hash = fake.password()
            
            db.session.add(user)
        
        db.session.commit()

    def seed_artists():
        for _ in range(5):
            name = fake.unique.name()
            
            artist = Artist(name=name)
            
            db.session.add(artist)
        
        db.session.commit()

    def seed_songs():
        artists = Artist.query.all()
        
        for _ in range(10):
            title = fake.unique.catch_phrase()
            genre = fake.random_element(elements=('Rock', 'Pop', 'Hip Hop', 'Country'))
            location = fake.file_path()
            artist = fake.random_element(elements=artists)
            
            song = Song(title=title, genre=genre, location=location, artist=artist)
            
            db.session.add(song)
        
        db.session.commit()

    def seed_playlists():
        for _ in range(3):
            name = fake.unique.word()
            genre = fake.random_element(elements=('Rock', 'Pop', 'Hip Hop', 'Country'))
            
            playlist = Playlist(name=name, genre=genre)
            
            db.session.add(playlist)
        
        db.session.commit()

    def seed_playlist_songs():
        playlists = Playlist.query.all()
        songs = Song.query.all()
        
        for _ in range(10):
            playlist = fake.random_element(elements=playlists)
            song = fake.random_element(elements=songs)
            
            playlist_song = Playlist_Songs(playlist=playlist, song=song)
            
            db.session.add(playlist_song)
        
        db.session.commit()

    def seed_all():
        seed_users()
        seed_artists()
        seed_songs()
        seed_playlists()
        seed_playlist_songs()

    if __name__ == '__main__':
        seed_all()

from faker import Faker
from config import db, bcrypt
from models import User, Artist, Song, Playlist, Playlist_Songs

fake = Faker()

# Seed random number generator
Faker.seed(42)

# Generate and insert fake data into the database
def seed_database():
    # Create fake users
    num_users = 10
    for _ in range(num_users):
        username = fake.user_name()
        password = fake.password()
        profile_pic = fake.image_url()
        score = fake.random_int(min=0, max=100)
        streak = fake.random_int(min=0, max=50)

        user = User(username=username, profilePic=profile_pic, score=score, streak=streak)
        user.password_hash = password
        db.session.add(user)

    # Create fake artists
    num_artists = 5
    for _ in range(num_artists):
        name = fake.name()

        artist = Artist(name=name)
        db.session.add(artist)

    db.session.commit()

    # Create fake songs
    num_songs = 20
    artists = Artist.query.all()

    for _ in range(num_songs):
        title = fake.catch_phrase()
        genre = fake.word(ext_word_list=['Rock', 'Pop', 'Hip Hop', 'Jazz', 'Country'])
        location = fake.file_path()

        artist = fake.random_element(artists)

        song = Song(title=title, genre=genre, location=location, artist=artist)
        db.session.add(song)

    db.session.commit()

    # Create fake playlists
    num_playlists = 5
    for _ in range(num_playlists):
        name = fake.company()
        genre = fake.word(ext_word_list=['Rock', 'Pop', 'Hip Hop', 'Jazz', 'Country'])

        playlist = Playlist(name=name, genre=genre)
        db.session.add(playlist)

    db.session.commit()

    # Create fake playlist songs
    playlists = Playlist.query.all()
    songs = Song.query.all()

    for playlist in playlists:
        num_songs = fake.random_int(min=1, max=5)
        random_songs = fake.random_elements(elements=songs, length=num_songs)

        for song in random_songs:
            playlist_song = Playlist_Songs(playlist=playlist, song=song)
            db.session.add(playlist_song)

    db.session.commit()

    print("Database seeded successfully!")


# Seed the database
if __name__ == '__main__':
    seed_database()

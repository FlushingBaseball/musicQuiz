from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin

from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ()

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    _password_hash = db.Column(db.String)
    profilePic = db.Column(db.String, nullable=False)
    score = db.Column(db.Integer)
    streak = db.Column(db.Integer)




    @hybrid_property
    def password_hash(self):
        raise AttributeError('Cannot access password hash!')
    
    @password_hash.setter
    def password_hash(self, new_pass):
        p_hash = bcrypt.generate_password_hash(new_pass.encode('utf-8'))
        self._password_hash = p_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))

    def __repr__(self):
        return f"<User {self.username}>"



class Artist(db.Model, SerializerMixin):
    __tablename__ = "artists"

    serialize_rules =()
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True)
    artist_songs =  db.relationship('Song', backref='artist')

class Song(db.Model, SerializerMixin):
    __tablename__ = "songs"

    serialize_rules =()
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    genre = db.Column(db.String, nullable=False)
    location = db.Column(db.String, nullable=False)
    artist_id = db.Column(db.Integer, db.ForeignKey('artist.id'))
    playlist_song = db.relationship('Playlist_Songs', backref='song')



class Playlist(db.Model, SerializerMixin):
    __tablename__ ='playlists'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    genre = db.Column(db.String)
    playlist_song = db.relationship('Playlist_Songs', backref='playlist')




class Playlist_Songs(db.Model, SerializerMixin):
    __tablename__ = 'playlist_songs'

    id = db.Column(db.Integer, primary_key=True)
    song_id = db.Column(db.Integer, db.ForeignKey('song.id'))
    playlist_id = db.Column(db.Integer, db.ForeignKey('playlist.id'))












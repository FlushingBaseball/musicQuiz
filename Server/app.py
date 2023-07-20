#!/usr/bin/env python3

from flask import request, make_response, jsonify, session, Flask
from sqlalchemy.exc import IntegrityError
from models import User, Artist, Song, Playlist, Playlist_Songs

from config import app, db



# excluded_endpoints = ['signup', 'check_session', 'login', 'logout']

# @app.before_request ##hook that fires to check cookie
# def check_is_logged_in():
#     if request.endpoint not in excluded_endpoints:
#         user_id = session.get('user_id')
#         user = User.query.filter(User.id == user_id).first()

#         if not user:
#             return {'error': 'User is not logged in'}, 401


@app.post('/signup')
def signup():
    # get json from request
    data = request.get_json()

    try:
        # create new user using json data
        new_user = User(
            username=data['username'],
            streak=0,
            score =0
            #profilePic=data['profilepic']
        )
        new_user.password_hash = data['password']
        # add user to db
        db.session.add(new_user)
        db.session.commit()
    except Exception as e:
        print(e)
        return {'error': 'Error creating user'}, 422

    # add user_id cookie
    session['user_id'] = new_user.id

    # return user as JSON, status code 201
    return new_user.to_dict(), 201

@app.get('/check_session')
def check_session():
    # get user_id from browser cookies
    user_id = session.get('user_id')
    # check for user in db
    user = User.query.filter(User.id == user_id).first()

    if not user:
        # user doesn't exist, return 401 (unauthorized)
        return {'error': 'Unauthorized'}, 401
    
    # user exists, return user as JSON, status code 200
    return user.to_dict(), 200

@app.post('/login')
def login():
    # get JSON from request
    data = request.get_json()
    # query db by username
    user = User.query.filter(
        User.username == data['username']
    ).first()
    
    if not user or not user.authenticate(data['password']):
        # user doesn't exist or password doesn't match, return 401
        return make_response(jsonify({'error': 'Login failed'}), 401)
    
    # login success, add cookie to broswer
    session['user_id'] = user.id
    return jsonify(user.to_dict()),200

@app.delete('/logout')
def logout():
    # check if user_id cookie is set
    user_id = session.get('user_id')

    if not user_id:
        # no cookie is set, return 401
        return {'error': 'User is not logged in'}, 401
    
    # delete the cookie
    session.pop('user_id')
    # return 204 (no content)
    return {}, 204



# Endpoint to get all songs in a particular playlist and load them into the audio element
@app.get('/playlists/<int:playlist_id>/load_songs')
def load_songs_into_audio_element(playlist_id):
    
    # Check if the user is logged in before proceeding

    # if 'user_id' not in session:
    #     return make_response(jsonify({"error": "Unauthorized"}), 401)

    # Retrieve the playlist from the database by its ID
    playlist = Playlist.query.filter(Playlist.id == playlist_id).first()

    if not playlist:
        return make_response(jsonify({"error": "Playlist not found"}), 404)

    # Retrieve all the songs associated with the playlist
    songs = playlist.playlist_song  # Assuming the relationship is defined in the models

    if not songs:
        return make_response(jsonify({"error": "No songs found in the playlist"}), 404)

    # Convert the songs to a list of dictionaries
    songs_data = [song.to_dict() for song in songs]

    # Return the list of songs data as JSON
    return jsonify(songs_data), 200



@app.get('/playlists')
def get_all_playlists():
    playlists = Playlist.query.all()
    data = [p.to_dict() for p in playlists]
    return data, 200


@app.get('/playlists/<int:id>')
def get_playlist_by_id(id):
    playlist = Playlist.query.filter(
        Playlist.id == id
    ).first()

    if not playlist:
        return make_response(
            jsonify({"error": "Playlist not found"}),
            404

        )
    return make_response(
        jsonify(playlist.to_dict()),
        200
    )



if __name__ == '__main__':
    app.run(port=5555, debug=True)



## did not do the Client/package.json
## did not do the playlist componet
## I think my Nav link was further












flask db init



## Any time the database schema is changed run
flask db migrate 
    then
flask db upgrade




## sql commands for sqlite 3

to make it look okay
.headers on 
.mode column
.width auto

select * from playlist_songs;
select * from playlists;


update songs set title ="", genre = "", location="./Songs/", artist_id = WHERE id =

update playlist_songs set song_id =1, playlist_id=1  where id =1;
update artists set name ="The B52's" WHERE id =1;




# Music Quiz aka One Hit Wonder Quiz 


# get music to play



A user consists of a username a password that is encypted with bCrypt
a high score and a streak. 

Users can sign in


When signed in a user is greeted with a play button 
when play is hit a random song is chosen and played for 15 random seconds

The user has to type the name of the artist 



Make Sign in / Sign out




## Structure
IN public put everything that is used OUTSIDE THE APP like a favicon

IN src put everything that is used in the APP like a background image in a componet
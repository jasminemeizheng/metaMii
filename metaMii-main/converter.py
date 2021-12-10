import pyrebase
import requests
# from bs4 import BeautifulSoup
import instaloader
import tweepy


config = {
  "apiKey": "AIzaSyC9A4gzSfdhHSGy0nO00oxGw7Sw1jmuWLA",
  "authDomain": "metamii.firebaseapp.com",
  "databaseURL": "https://metamii-default-rtdb.firebaseio.com",
  "storageBucket": "metamii.appspot.com"
}



#Get firebase references
firebase = pyrebase.initialize_app(config)
db = firebase.database()

def stream_handler(message):        
    if message["event"] == "put" and message['data'] is not None:
        handlePut(message["path"], message["data"])

def handlePut(key, data):
    print()
    print(type(data))
    print()
    print(key)
    print()
    print(data)
    print("Handling this!")

    if (key == '/'): #The callback when program is launched
        for k in data:
            scrapedData = data[k].copy()
            scrapedData['followers'] = 0
            #Try to get instagram score
            if ("instagram" in scrapedData["socials"] and scrapedData["socials"]["instagram"] != ""):
                try:
                    print(f'Checking {scrapedData["socials"]["instagram"]}!')
                    scrapedData['followers'] += getInstaScore(scrapedData["socials"]["instagram"])
                    print(f"{scrapedData['name']} has a score of {scrapedData['meta_score']}")
                except:
                    print(f"User {scrapedData['name']} did something wrong!")
                    pass
            if ("twitter" in scrapedData["socials"] and scrapedData["socials"]["twitter"] != ""):
                try:
                    print(f"Checking {scrapedData['name']}'s twitter!")
                    scrapedData['meta_score'] += getTwitterScore(scrapedData["socials"]["twitter"])
                    print(f"{scrapedData['name']} has a score of {scrapedData['meta_score']}")
                except:
                    print(f"User {scrapedData['name']} did something wrong!")
                    pass
            db.child("scrapedCharacters").push(scrapedData)
            db.child("characters").child(k).remove()
        print("Handled!")
    else:
        scrapedData = data.copy()
        scrapedData['meta_score'] = 40
        if ("instagram" in scrapedData["socials"] and scrapedData["socials"]["instagram"] != ""):
            try:
                print(f"Checking {scrapedData['name']}'s instagram!")
                insta_score = getInstaScore(scrapedData["socials"]["instagram"])
                scrapedData['meta_score'] += insta_score
                print(f"{scrapedData['name']} has a insta-score of {insta_score}")
            except:
                print(f"User {scrapedData['name']} did something wrong!")
                pass
        if ("twitter" in scrapedData["socials"] and scrapedData["socials"]["twitter"] != ""):
            try:
                print(f"Checking {scrapedData['name']}'s twitter!")
                twitter_score = getTwitterScore(scrapedData["socials"]["twitter"])
                scrapedData['meta_score'] += twitter_score
                print(f"{scrapedData['name']} has a twitter-score of {twitter_score}")
            except:
                print(f"User {scrapedData['name']} did something wrong!")
                pass
        f"{scrapedData['name']} has a total score of {scrapedData['meta_score']}"

        db.child("scrapedCharacters").push(scrapedData)
        db.child("characters").child(key[1:]).remove()
        print("Handled!")

#For Instagram Scraping
L = instaloader.Instaloader()
user = "stockcluealt"
password = "pkmon123"
L.login(user, password)
def getInstaScore(username):
    global instaloader
    profile = instaloader.Profile.from_username(L.context, username)
    return profile.followers + profile.followees + 10*profile.mediacount

#For Twitter Scraping
auth = tweepy.OAuthHandler("82Xoa7KENA3yzHyFLIuG8MYGq", "bUG6Gs9GkJgj2LKBNHT4MRQvCW2V9mk4whw3UpsVF6YZSiBhv8")
access_token = "3305443046-0kKNGsBEW1BltZoLbsSKsDyTiy2574qVG1q7TAI"
access_token_secret = "POU9xe4FztxEgIkIYiqd7GxFJTaiaj47g7nbnb1xNT8ZZ"
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth)
def getTwitterScore(username):
    global api
    # getting all the followers
    # Turns out I need to apply and then I can do some stuff, not enough time though
    # return len(api.get_follower_ids(screen_name=username)) * 15
    return 50 * 15

# print(getTwitterScore("StockClue"))

my_stream = db.child("characters").stream(stream_handler)

print("Test!")

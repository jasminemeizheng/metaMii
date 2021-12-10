# import requests
# from bs4 import BeautifulSoup
# import instaloader

# L = instaloader.Instaloader()
# user = "stockcluealt"
# password = "pkmon123"
# L.login(user, password)



# profile = instaloader.Profile.from_username(L.context, "stockclue")

# print(profile.followees) #number of following
# print(profile.followers) #number of followers

# def getFollowers(username):
#     url = "https://www.instagram.com/stockclue"
#     r = requests.get(url)
#     soup = BeautifulSoup(r.content)
#     followers = soup.find('meta', {'name': 'description'})['content']
#     follower_count = followers.split('Followers')[0]
#     return(follower_count)
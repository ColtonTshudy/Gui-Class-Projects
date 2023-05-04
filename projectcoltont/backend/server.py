#  author: Colton Tshudy
#  version: 05/04/2023

from flask import Flask, request
from flask_cors import CORS
from waitress import serve

from pymongo import MongoClient
from configparser import ConfigParser
import os

### READ CONFIG
absolute_path = os.path.dirname(__file__)
relative_path = "config.ini"
config_path = os.path.join(absolute_path, relative_path)

config = ConfigParser()
config.read(config_path)

db_url = config['DB']['db_url']

### CREATE FLASK APP
app = Flask(__name__)
CORS(app)

### CONNECT TO MONGODB
client = MongoClient('0.0.0.0', 0, username='coltont@vt.edu', password='guiproject')

db = client.flask_db
googleTrends = db.googleTrends
print(googleTrends.find())

@app.route("/data")
def data():
    global db
    return db

if __name__ == "__main__":
    app.run(debug=True, port=5001, threaded=True)
    #serve(app, host='0.0.0.0', port=config['API_SERVER']['port'])
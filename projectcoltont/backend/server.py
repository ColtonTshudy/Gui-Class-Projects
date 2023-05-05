#  author: Colton Tshudy
#  version: 05/04/2023

from flask import Flask, request
from flask_cors import CORS
from bson import json_util
import json

from pymongo import MongoClient
from configparser import ConfigParser
import os

### READ CONFIG
absolute_path = os.path.dirname(__file__)
relative_path = "config.ini"
config_path = os.path.join(absolute_path, relative_path)

config = ConfigParser()
config.read(config_path)

db_uri = config['DB']['db_uri']

### CREATE FLASK APP
app = Flask(__name__)
CORS(app)

### CONNECT TO MONGODB
client = MongoClient(db_uri)

### PULL AND FORMAT DATA
trends = client.Project.googleTrends
global data
data = []
for trend in trends.find():
    data.append(trend)

### APP ROUTES
@app.route("/data", methods=['GET'])
def return_db_data():
    global data
    return json.loads(json_util.dumps(data))

### RUN
# Using debug mode here for simplicity
app.run(debug=True, port=config['API_SERVER']['port'], threaded=True)
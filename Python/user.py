import nxppy
import time
import requests
import json
mifare = nxppy.Mifare()

# Print card UIDs as they are detected
while True:
    try:
	#print("Show card to add owner")
        uid = mifare.select()
        print(uid)
	user = raw_input("Card owner name: ")
	headers = {"Content-type": "application/json"}
	body = {"name" : "Users",
		"description" : "Card owners",
		"sensorStatus" : "1",
		"properties" : {
		"identifier" : uid,
		"userName" : user 
		}
	}
	r=requests.post("https://iot-backend-metropolia.herokuapp.com/api/data/4", headers=headers, json=body)
	print(r.text)	
    except nxppy.SelectError:
        # SelectError is raised if no card is in the field.
        pass

    time.sleep(1)


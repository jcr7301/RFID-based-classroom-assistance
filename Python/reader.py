import nxppy
import time
import requests
import json
mifare = nxppy.Mifare()

# Print card UIDs as they are detected
while True:
    try:
        uid = mifare.select()
        print(uid)
	headers = {"Content-type": "application/json"}
	body = {"name" : "IoT Classroom",
		"description" : "IoT Course Assistance",
		"sensorStatus" : "1",
		"readings" : [	
			{	
				"uid" : uid
			}
		]
	}
	r=requests.post("https://iot-backend-metropolia.herokuapp.com/api/data/4", headers=headers, json=body)
	print(r.text)	
    except nxppy.SelectError:
        # SelectError is raised if no card is in the field.
        pass

    time.sleep(1)


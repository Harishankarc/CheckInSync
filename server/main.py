import requests as req
import cv2
import os
import numpy as np
import face_recognition as fr
import time

url = "http://localhost:4000/api/attendence/studentdetails"
headers = {'Content-type': 'application/json'}
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
face_encodings = []
face_names = []
last_sent_time = 0
last_sent_name = None

x = 0

def load_images_from_directory(directory):
    for filename in os.listdir(directory):
        if filename.endswith(".jpg") or filename.endswith(".png"):
            path = os.path.join(directory, filename)
            image = fr.load_image_file(path)
            encoding = fr.face_encodings(image)
            if encoding:
                face_encodings.append(encoding[0])
                face_names.append(filename.split('.')[0])

def send_face_data(name):
    global x
    if x == 10:
        try:
            response = req.post(url, json={"name": name, "date" : time.ctime()}, headers=headers)
            print(response.json())
        except Exception as e:
            print(f"Error sending name: {e}")
        x = 0
        return True
    else:
        x = x + 1
        return False
    

def camerstart():
    cam = cv2.VideoCapture(0)
    if not cam.isOpened():
        print("Could not open video device")
        return

    stop_capture = False

    while not stop_capture:
        ret, frame = cam.read()
        if not ret:
            print("Failed to capture image")
            break

        flipped_frame = cv2.flip(frame, 1)
        gray = cv2.cvtColor(flipped_frame, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, 1.3, 5)
        rgb_frame = cv2.cvtColor(flipped_frame, cv2.COLOR_BGR2RGB)
        live_face_loc = fr.face_locations(rgb_frame)
        live_face_encodings = fr.face_encodings(rgb_frame, live_face_loc)
        
        name = "Unknown"
        for face in live_face_encodings:
            matches = fr.compare_faces(face_encodings, face, tolerance=0.6)
            if True in matches:
                match_index = matches.index(True)
                name = face_names[match_index]
                print(f"Match found: {name}")
                if send_face_data(name):
                    cam.release()
                    cv2.destroyAllWindows()
                    break
        
        for x, y, w, h in faces:
            color = (0, 255, 0) if name != "Unknown" else (0, 0, 255)
            cv2.rectangle(flipped_frame, (x, y), (x + w, y + h), color, 2)
            cv2.putText(flipped_frame, name, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, color, 2)

        cv2.imshow("Face Recognition", flipped_frame)
                    
        if cv2.waitKey(1) & 0xFF == ord('q'):
            stop_capture = True
            break
        
    cam.release()
    cv2.destroyAllWindows()

load_images_from_directory('images')
camerstart()

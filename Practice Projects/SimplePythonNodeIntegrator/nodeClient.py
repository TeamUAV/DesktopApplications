import requests
import base64

response = requests.get('http://localhost:8080')

# print(response.content.decode())

# # file = open('sample.jpg', 'rb').read()

# strImage = str(base64.b64encode(file).decode('utf-8'))
# print({
#   'image' : strImage
# })

import cv2

vid = cv2.VideoCapture(0)

while True:
  ret, frame = vid.read()
  
    # Display the resulting frame
  cv2.imshow('frame', frame)

  retval, buffer = cv2.imencode('.jpg', frame)
  pic_str = base64.b64encode(buffer)
  pic_str = pic_str.decode()
  print(pic_str + '<ENDER && SEPARATOR>')
    
  if cv2.waitKey(1) & 0xFF == ord('q'):
      break

# After the loop release the cap object
vid.release()
# Destroy all the windows
cv2.destroyAllWindows()
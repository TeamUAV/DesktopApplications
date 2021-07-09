from djitellopy import Tello
import cv2, math, time
import base64

tello = Tello()
tello.connect()
# if not tello.connect():
# 	print("Cannot reach tello, aborting!")
# 	exit(1)

# tello.streamoff()
# tello.takeoff()
# time.sleep(1)

tello.streamon()

frame_read = tello.get_frame_read()

while True:
    img = frame_read.frame
    # cv2.imshow('frame', img)
    retval, buffer = cv2.imencode('.jpg', cv2.flip(img, 1))
    pic_str = base64.b64encode(buffer)
    pic_str = pic_str.decode()
    print(pic_str + '<ENDER && SEPARATOR>')
    if (cv2.waitKey(1) & 0xff) == ord('q'):
        tello.land()
        frame_read.stop()
        tello.streamoff()
        exit(0)
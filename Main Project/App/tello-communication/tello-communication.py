from djitellopy import Tello, tello
import base64, cv2, threading, time

tello = Tello()
tello.connect()

def thingsToDo():
    time.sleep(5)
    tello.takeoff()
    tello.move_up(30)
    tello.rotate_clockwise(90)
    tello.rotate_clockwise(90)
    tello.land()

def telloStream():
    tello.streamon()
    frame_read = tello.get_frame_read()

    while True:
        img = frame_read.frame
        retval, buffer = cv2.imencode('.jpg', cv2.flip(img, 1))
        pic_str = base64.b64encode(buffer)
        pic_str = pic_str.decode()
        print(pic_str + '<ENDER && SEPARATOR>')
        if (cv2.waitKey(1) & 0xff) == ord('q'):
            frame_read.stop()
            tello.streamoff()

t1 = threading.Thread(target=telloStream)
t2 = threading.Thread(target=thingsToDo)

t1.start()
t2.start()
from djitellopy import Tello, tello
import base64, cv2, math, time, threading, socket
import argparse

# parser = argparse.ArgumentParser()
# parser.add_argument('-p','--portnumber', type=int, help='define portnumber for the program')
# portnumber = vars(parser.parse_args())['portnumber']
# print(portnumber)

tello = Tello()
tello.connect()

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
telloStream()
# def telloSendMessage():
#     messenger = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
#     addr = ('localhost', portnumber)
#     messenger.connect(addr)

#     switch_case = {
#         'up' : lambda : print("going up"),
#         'down' : lambda : print("going down"),
#         'left' : lambda : print("going left"),
#         'right' : lambda : print("going right"),
#         'curve_right' : lambda : print("going curve_right"),
#         'curve_left' : lambda : print("going curve_left"), 
#     }

#     while True:
#         command = messenger.recv(100).decode('utf-8').strip()
#         try:
#             if(command == 'NaN'):
#                 break
#             else:
#                 switch_case.get(command)()
#         except:
#             continue
        
#     messenger.close()
                
# telloSendMessage()

import cv2, base64, time

video = cv2.VideoCapture(0)
count =0;
start = time.time()
while True:
    ret, frame = video.read()
    retval, buffer = cv2.imencode('.jpg', cv2.flip(frame, 1))
    pic_str = base64.b64encode(buffer)
    pic_str = pic_str.decode()
    print(pic_str + '<ENDER && SEPARATOR>')

    if cv2.waitKey(1) & 0xff == ord('q'):
        break

end = time.time()

video.release()

import sys, time, fileinput
import base64

def main():
    imageString =b''
    for line in sys.stdin.readlines():
        imageString+=line.encode('utf-8')
    imgdata = base64.b64decode(imageString)
    filename = 'some_image.jpg'
    with open(filename, 'wb') as f:
        f.write(imgdata)
        print('done')

if __name__ == '__main__':
    main()

# import time, sys
# def dummy() :
#     out = '';
#     for i in range(0,10) :
#         out += str(i + 1) + ", "
#         time.sleep(1)
#         print(out)
# if __name__ =='__main__' :
#     dummy = dummy()
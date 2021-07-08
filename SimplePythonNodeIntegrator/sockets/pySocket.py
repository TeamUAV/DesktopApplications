import socket, base64

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

server_addr = ('localhost', 8080)

sock.connect(server_addr)

# msg = sock.recv(1024)
# print(msg.decode().strip())
# size = int(msg.decode())

msg = sock.recv(10000)
print(msg.decode())

with open('file.png', 'wb') as f:
    f.write(base64.b64decode(msg.decode()))

sock.close()
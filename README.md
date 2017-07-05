# eCast

> [#FutureLab](http://medialab-bayern.de/futurelab/) hackathon project

We provide emergency broadcasting aimed towards news agencies.

This is a hackathon project and will never be finished.


## Installation

#### RTMP Server

[https://www.atlantic.net/community/howto/install-rtmp-ubuntu-14-04/](https://www.atlantic.net/community/howto/install-rtmp-ubuntu-14-04/)

#### nginx.conf

```
rtmp {
        server {
                listen 1935;
                chunk_size 4096;
                application live {
                        live on;

                        # record                   
                        record all;
                        record_path /tmp/av;
                }
        }
}
```

### 

```
sudo /usr/local/nginx/sbin/nginx -s reload
sudo nano /usr/local/nginx/conf/nginx.conf
node app.js

```

### Start server

Firstly install dependencies

```
npm install
```

start server

```
npm start
```

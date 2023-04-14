# **Watch-Together**

`Watch-Together` is a small web app that let you watch videos with your friends at the same time, and chat with them. currently it support `Youtube` only.


## **How it works ?**

the User Interface build with `NextJS(ReactJS)` and `TaillwindCss`.
and for realTime data transmission i am using `WebSocket` technology. and i am using `Sanity.io` as a database.

### **!! Important !!**

since it is `NextJS`, you may wondering how i am implementing the `WebSocket` server, basically what i did is use a [custom server](https://nextjs.org/docs/advanced-features/custom-server) advanced feature from nextjs. which also let me handle middlewares in more easy way since NextJS using the EDGE envirment for middlewares.
in my custom server i combined `expressJS` with `WebSocketServer` and `NextJS` handle.


## **Database**

in my database i have four schemas:

    - user.
    - room.
    - messages.
    - member.

![database](https://raw.githubusercontent.com/abdelfetah18/WatchTogether/main/public/database.png)


## **Images from the app:**

![1](https://raw.githubusercontent.com/abdelfetah18/WatchTogether/main/public/1.png)
![2](https://raw.githubusercontent.com/abdelfetah18/WatchTogether/main/public/2.png)
![3](https://raw.githubusercontent.com/abdelfetah18/WatchTogether/main/public/3.png)
![4](https://raw.githubusercontent.com/abdelfetah18/WatchTogether/main/public/4.png)
![5](https://raw.githubusercontent.com/abdelfetah18/WatchTogether/main/public/5.png)
![6](https://raw.githubusercontent.com/abdelfetah18/WatchTogether/main/public/6.png)
![7](https://raw.githubusercontent.com/abdelfetah18/WatchTogether/main/public/7.png)
![8](https://raw.githubusercontent.com/abdelfetah18/WatchTogether/main/public/8.png)
Thanks for reading and see you in my next project.


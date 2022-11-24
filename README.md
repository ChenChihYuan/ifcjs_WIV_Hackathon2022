# ifcjs_WIV_Hackathon2022

This is a project to explore the possiblity of MMO game with ifc.js

Here's the website:
[Game_website](https://ifcjs-mmog.herokuapp.com/)

I didn't optimized the upload process, so it might take couple minutes to load the ifc model. Once it loaded and you signed up your name, we should be able to see each other's name inside.

Some key pressing:
- 

Here's the demo video:
[Demo_Video](https://www.youtube.com/watch?v=VhPUefXLxsI)


# ifc.js introduction
Ifc.js is based on the [three.js](https://threejs.org/), a OSS WebGL API project by [mr.doob.](https://twitter.com/mrdoob) 
For someone who interested about the history of ifc.js: 
[Roadmap_of_Ifc.js](https://airtable.com/shrP82Kgb9Q1LEgbU/tblEnrnOX7FSZVdOu)

If there're some of your have touched about three.js, you might have already known there are some useful loaders provided.
To name a few:
- [3DMLoader](https://threejs.org/examples/#webgl_loader_3dm)
- [OBJLoader](https://threejs.org/examples/?q=obj#webgl_loader_obj)
- [IFCLoader](https://threejs.org/examples/?q=ifc#webgl_loader_ifc)

on the bottom right `<>` to learn their code.

## what is the great part of ifc.js in AEC

- Open Source
- Easier to develop
- Freedom from the licensed produce

## what is the drawbacks, you name it.

# Let's talk about MMO game project.
We now know ifc.js is based on three.js, and there're already some RPG games made out from three.js.
Now, we can bring those best parts of the three.js game and combine with the ifc.js.

- [First Person Shooter](https://threejs.org/examples/?q=fps#games_fps)
- [Japanese blog](https://qiita.com/te26/items/5204fa0d220de2df6295)
- [My blog about FPS](https://chenchihyuan.github.io/)
- [Shin Coding Channel_in Japanese](https://www.youtube.com/watch?v=Q_I0Tq61Ud8&t=744s)

Basically, we are dealing with camera poistion in three.js and how we can manipulate the camera position with keyboard/ mouse clicking (callback).

This piece of code is from my FPS blog, but not exact code I used for this project. Just to have a little sense about what it's about.

```
direction.z = Number(moveForward) - Number(moveBackward);
  direction.x = Number(moveLeft) - Number(moveRight);


  //ポインターがONになったら
  if (controls.isLocked) {
    const delta = (time - prevTime) / 1000;

    // decline
    velocity.z -= velocity.z * 5.0 * delta;
    velocity.x -= velocity.x * 5.0 * delta;

    if (moveForward || moveBackward) {
      velocity.z -= direction.z * 200 * delta;
    }

    if (moveRight || moveLeft) {
      velocity.x -= direction.x * 200 * delta;
    }



    controls.moveForward(-velocity.z * delta);
    controls.moveRight(-velocity.x * delta);
  }
```

There are several type of `ifc.js` we can used. If you look it up on [there website](https://ifcjs.github.io/info/docs/Hello%20world/)
There are
- web-ifc
- web-ifc-three
- web-ifc-viewer ( has most premade functions.

Functions like
- highlight ( raycast
- multithread
- annotation
...

In the end, I used `WIV` for my project.
However, there're some difference between `WIT` and `WIV`.

Web-ifc-viewer is more mature, in terms of development, you don't really need to deal with `three.js`, most of them are dealt with internally.
As a result, I had to modify my fps code, and looked it up what's the thing `WIV` to control its camera.
I found out they are using [this repo](https://github.com/yomotsu/camera-controls/tree/dev/examples) from yomotsu-san. After little modification of my code, it works.

Next thing I was think about is, considering a scenario that in metaverse(?), colleagues could view the same building, job-site and discuss about it visually.
That's what I tried to acchieve.

And it's not something new either. With the help of `socket.io`, it can easily made.

Here's the [documentation](https://ifcjs.github.io/info/docs/Guide/web-ifc-viewer/Tutorials/Socket) from ifc.js website

I used `Heroku` to host this page, but since it started to charge, so I have to turn down this website soon after this event.

---
If we have time, we can talk about how to learn `ifc.js` and the resources.

- liveServer
- [ifc.js repo](https://github.com/IFCjs)
- [three.js](https://sbcode.net/threejs/)

....

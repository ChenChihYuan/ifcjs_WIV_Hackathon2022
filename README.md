# ifcjs_WIV_Hackathon2022

This is a project to explore the possiblity of MMO game with ifc.js

Here's the website:
[Game_website](https://ifcjs-mmog.herokuapp.com/)

I didn't optimized the upload process, so it might take couple minutes to load the ifc model. Once it loaded and you signed up your name, we should be able to see each other's name inside.


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

Next thing I was thinking about is, considering a scenario that in metaverse(?), colleagues could view the same building, job-site and discuss about it visually.
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


---




# ifcjs_WIV_Hackathon2022

ifc.jsを使ったMMOゲームの可能性を探るプロジェクトです

Here's the website:
[Game_website](https://ifcjs-mmog.herokuapp.com/)

アップロードのプロセスを最適化しなかったので、ifcモデルの読み込みに2、3分かかるかもしれません。一度ロードして名前を登録すれば、中でお互いの名前を見ることができるはずです。


Here's the demo video:
[Demo_Video](https://www.youtube.com/watch?v=VhPUefXLxsI)


# ifc.jsの紹介

ifc.js は [mr.doob.](https://twitter.com/mrdoob) による OSS WebGL API プロジェクトである [three.js](https://threejs.org/) をベースにしています。
ifc.jsの歴史に興味がある人のために。

three.jsを触ったことがある人なら、いくつかの便利なローダーが提供されていることをすでに知っているかもしれません。
いくつか挙げてみましょう。

- [3DMLoader](https://threejs.org/examples/#webgl_loader_3dm)
- [OBJLoader](https://threejs.org/examples/?q=obj#webgl_loader_obj)
- [IFCLoader](https://threejs.org/examples/?q=ifc#webgl_loader_ifc)

on the bottom right `<>` to learn their code.

## AECにおけるifc.jsのすごいところは？

- オープンソース
- 開発しやすい
- ライセンス製品からの解放

## 欠点は何か、それを挙げてください。

#  MMOゲームプロジェクトの話をしよう。
ifc.jsはthree.jsをベースにしており、three.jsから作られたRPGゲームもすでにある。
今、私たちはthree.jsの良いところを持って来て、ifc.jsと結合することができる。

- [First Person Shooter](https://threejs.org/examples/?q=fps#games_fps)
- [Japanese blog](https://qiita.com/te26/items/5204fa0d220de2df6295)
- [My blog about FPS](https://chenchihyuan.github.io/)
- [Shin Coding Channel_in Japanese](https://www.youtube.com/watch?v=Q_I0Tq61Ud8&t=744s)

基本的には、three.jsのカメラ位置と、キーボードやマウスのクリック（コールバック）でカメラ位置を操作する方法について扱っています。

このコードは私のFPSブログから引用したものですが、このプロジェクトで使用した正確なコードではありません。しかし、このプロジェクトで使用したコードではありません。

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

IFC.JSには、いくつかの種類があります。そのサイト](https://ifcjs.github.io/info/docs/Hello%20world/)で調べてみてください。
以下のようなものがあります。
- web-ifc
- web-ifc-three
- web-ifc-viewer ( ほとんどのプリメイド機能を備えています。

Functions like
- highlight ( raycast
- multithread
- annotation
...

最終的に、私は `WIV` を使用しました。
しかし、`WIT`と`WIV`の間にはいくつかの違いがある。

Web-ifc-viewer の方が開発的には成熟していて、`three.js` を扱う必要がなく、そのほとんどが内部で処理されているのです。
その結果、fpsのコードを修正しなければならなくなり、`WIV`というのはカメラを制御するために何を使っているのか調べました。
その結果、yomotsuさんの[このレポ](https://github.com/yomotsu/camera-controls/tree/dev/examples)を使っていることがわかりました。私のコードを少し修正した後、それは動作します。

次に考えたのは、メタバース(？)で、同僚が同じ建物や現場を見ながら、視覚的に議論できるシナリオです。
それを実現しようとしました。

そして、それは新しいものでもありません。`socket.io`の力を借りれば簡単に作ることができます。

ifc.js ウェブサイトの [ドキュメント](https://ifcjs.github.io/info/docs/Guide/web-ifc-viewer/Tutorials/Socket) です。

このページをホストするために `Heroku` を使っていましたが、課金が始まったので、このイベントの後すぐにこのウェブサイトを閉鎖しなければならなくなりました。

---
もし時間があれば、`ifc.js` の学習方法やリソースについてお話しましょう。

- liveServer
- [ifc.js repo](https://github.com/IFCjs)
- [three.js](https://sbcode.net/threejs/)

....

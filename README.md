# TWITCH-BROADCASTERS

A webpage showing online status of interested broadcasters on twitch.tv by using jQuery $.getJSON() method, etc, inspired by <a href = "https://www.freecodecamp.cn/challenges/use-the-twitchtv-json-api" target="_blank">Task on FreeCodeCamp</a>.<br>

Main Functions/Features:

1. When opening this webpage, it will request and fetch the status and info of interested broadcasters from the server of twitch.tv, mainly by using AJAX ($.getJSON()) and open port on api.twitch.tv;

2. The returned info was in json format, which will be extracted, splited and joined as html snippets and appended to appropriate DOM nodes, an app-like web page will appear then with designated CSS style rendering;

3. The main status of broadcasters are Online vs. Offline.For online broadcasters, further info including the name, start-time, quality, total audience, etc of the video which is live will be fetched and shown further; For offline broadcasters, their images will be shown in gray(rendered with CSS3 filter grayscale()); By clicking the info panel of a broadcaster, you will be led to the live page of the broadcaster on twitch.tv;

4. There are three lists showing broadcasters according to online/offline status: All (online + offline), online, offline; The lists can be easily switched by clicking the name of each list; For a better user experience on mobile phones(/devices with touch functions), touch and move from left to right or vice versa can also switch among the lists(achieved by using touchmove event listeners); 

5. Above the broadcasters lists, a search box is also enabled for quick search and filtering among current lists by listening to keydown events in search box;

6. Inspired by QQ interface on pc, the broadcasters lists are also adjustable within the range of 300px to 600px, moreover, it's resizable and draggable when mouse pointer is near the borders, this was achieved mainly by using functions draggable() and resizable() in jQuery-UI;

7. The demo has been applied with CSS3 media query and jQuery $().css() to achieve responsive designs in most platforms and different size of screens, which have been simulated and tested in Chrome developer tools;

This Demo is very simple since it's one of my practicing projects when learning Front-end Developments from scratch, it can be viewed @ <a href = "https://www.mike652638.com/demo/twitch.html">My Website Demo Page-Twitch</a>. Any issues or bugs report are always welcome, helpful commits will be much appreciated :)

+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

# 推奇直播

这是一个展示推奇主播在线状态及直播信息的小网页, 主要应用了jQuery的$.getJSON()方法, 基于<a href = "https://www.freecodecamp.cn/challenges/use-the-twitchtv-json-api" target="_blank">FreeCodeCamp上的实践任务</a>完成。

主要功能/特色:

1. 打开这个页面后, 它会通过AJAX($.getJSON())结合推奇直播开放的接口向其服务器发起请求并返回关注列表中主播的在线状态和直播信息;

2. AJAX返回的信息为JSON格式, 经过函数的提取和拼接并以HTML代码段的形式添加到相应的文档节点, 再通过CSS样式的渲染生成类APP界面;

3. 主播状态分为在线和离线。对于在线的主播, 还会进一步请求获取其当前正在直播的节目名称, 开始时间, 视频质量和观看人数等信息; 对于当前离线的主播, 其头像会被渲染为灰色(通过CSS3的滤镜grayscale()实现);点击任一主播信息栏可以跳转至该主播在twitch.tv的直播页面;

4. 根据在线/离线状态, 主播列表氛围三栏: 全部(在线+离线), 当前在线, 当前离线; 你可以点击列表名称切换至相应的列表; 为了在移动端(或支持触摸屏功能的设备)上有更好的用户体验, 此处还支持触屏滑动, 左滑右滑可以在列表栏间循环切换(通过监听touchmove事件实现);

5. 在列表栏上方还放置了搜索框, 可以方便地对当前主播列表进行搜索或过滤, 这主要是通过监听搜索框中的keydown事件来实现的;

6. 参考QQ PC版界面, 在PC端浏览器中, 主播列表栏可以在300PX到600PX的宽度范围内调整, 同时通过引用jQuery-UI中的draggable() 和 resizable()函数实现了列表栏的"可变换"和"可拖动"的功能;

7. 这个小页面运用了CSS3的媒体查询和jQuery的$().css()方法, 尽可能做到对不同平台不同尺寸屏幕的兼容(已在Chrome浏览器的开发者模式中模拟测试); 

这个小页面是我自学前端时实践的一个小项目, 实现起来并不难, 您可以进入<a target="_blank" href = "https://www.mike652638.com/demo/twitch.html">我的网站DEMO展示页-推奇直播</a>查看在线效果, 随时欢迎您提出任何问题, 建议或反馈 :) <br>

<a target="_blank" href = "https://www.mike652638.com/demo/twitch.html"><img src="https://www.mike652638.com/demo/twitch/scrShts/twitchScrSht-pc.png" alt="twitch-screenshot" /></a>

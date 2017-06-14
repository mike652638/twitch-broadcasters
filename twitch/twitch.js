var userIdArr = ["mikulu777", "failverde", "chiao622", "rubychaoo", "minerva8018", "CinCinBear", "missypwns", "ChloeLock", "sweet0313love", "AimzAtchu", "Alliestrasza", "winny3531", "AlexiaRaye", "ning886", "mini8816", "yuanyuan_satomi", "blair0823", "deathfong", "vanessa_cc", "aphrolin1107", "iris522", "aga191919", "tsukilin", "donbingweihan", "zxcv323215", "n00biesuzikinz", "kana000089", "fanvivi", "lulalalulula", "midahri", "danenebobar", "Adobe", "mikadaime", "Ms_Vixen", "soming1907", "freecodecamp", "Rakin", "gmdkdsla", "fluidwindlolz", "LukiLuluped", "tim885885", "OGN_LoL", "LCK1", "chery0505", "VeRsuta", "ESL_SC2", "SaltyBet", "ryo_0814", "dnrkdnjs", "TwitchShow"];
var strGame,
    strView,
    strLink,
    strInfo;
var noLogo = "twitch/img/nologo.png";
var srchVal,
    srchValCode,
    srchValExp,
    keyDnWhich;

function getStreamer(userId) {
    $.ajax({
        url: "https://api.twitch.tv/kraken/streams/" + userId + "?client_id=5pkoj4ejkapzxzgq1f3a7dbry59s2r&duration=0&cache=false&noStore=true&callback=?",
        dataType: "jsonp",
        success: function(responseData) {
            $.ajax({
                url: "https://api.twitch.tv/kraken/users/" + userId + "?client_id=5pkoj4ejkapzxzgq1f3a7dbry59s2r&duration=0&cache=false&noStore=true&callback=?",
                dataType: "jsonp",
                success: function(respUser) {
                    /*服务器端成功返回数据后隐藏LOADING动画*/
                    $(".loader").css("display", "none");
                    myStatusMove(); //头部状态栏滚动
                    gameNameMove(); //主播信息栏直播节目名超长处理
                    strLink = "https://www.twitch.tv/" + userId;
                    //离线用户头像只能通过url: "https://api.twitch.tv/kraken/users/" + userId + "?client_id=5pkoj4ejkapzxzgq1f3a7dbry59s2r"
                    //获取, 所以上面另外嵌套了一层$.getJSON()
                    if (respUser.logo === null) {
                        respUser.logo = noLogo;
                    }
                    //判断当前是否正在直播
                    if (responseData.stream !== null) {
                        strGame = responseData.stream.game;
                        strView = responseData.stream.viewers;
                        strInfo = responseData.stream;
                        //注:下方用到了<li onclick="strDescToggle()"></li>, 是因为strDescToggle()在$(document).ready();中调用无效(DOM树加载时, AJAX还未完成数据返回, 但放在AJAX success的回调中会出BUG, 本来只需运行一次的实际运行N次, N等于具有class="userDesc"的元素个数
                        $("#twOnline").append('<li onclick="strDescToggle(this)" class="userDesc"><img class="userImg" src = "' + respUser.logo + '"><div class="userInfo"><span class="userName">' + respUser.display_name.toUpperCase() + '</span><br> 直播中: <span class="gameName">' + strGame + '</span><br>观看人数: ' + strView + '</div></li>');
                        $("#twOnline").append('<li style = "display: none;" class="strDetail"><a target="_blank" href=' + strLink + '>' + '<div class="strDesc"><span class="strStart">本次直播开始于: ' + strInfo.created_at.replace(/T/, " ").replace(/Z/, " ") + '</span><br><span class="strStar">主播粉丝数: ' + strInfo.channel.followers + ';&nbsp;&nbsp;总浏览次数: ' + strInfo.channel.views + '</span><br><span class="strVdo">视频高度: ' + strInfo.video_height + 'PX; 平均帧速: ' + Math.round(strInfo.average_fps) + 'FPS; </span><span class="strLang">语言: ' + strInfo.channel.broadcaster_language.toUpperCase() + '</span></div> <img src = ' + strInfo.preview.medium + ' alt = "strGame" class = "strImg"></a></li>');
                    } else {
                        $("#twOffline").append('<li class="userDesc"><a target="_blank" href=' + strLink + '>' + '<img class="userImg gray" src = "' + respUser.logo + '"><div class="userInfo"><span class="userName">' + respUser.display_name.toUpperCase() + '</span><br> 离线</div></a></li>');
                    }
                },
                error: function(error) {
                    console.log("已获取到stream信息但未获取到user信息, 返回的错误为: " + JSON.stringify(error));
                }
            });
        },
        error: function(error) {
            console.log("未获取到stream信息, 返回的错误为: " + JSON.stringify(error));
        }
    });
}

function twListHeight() {
    //console.log($(window).height() - $("#twList").offset().top - 10);
    $("#twList").css("height", $(window).height() - $("#twList").offset().top - 10);
}

/*状态栏超长字符滚动效果*/
function myStatusMove() {
    //console.log($("#myStatus").width());
    var overWidth = 3140 - $(".myStatus").width();
    //$("#myStatus").css("transform", "translateX(" + (0 - overWidth) + "px)");
    //$("#myStatus").css("transform", "translateX(0)");
    document.styleSheets[2].deleteRule(1);
    //document.styleSheets[2].insertRule("@keyframes myStatusMove { 0% { transform: translateX(0); color: #fff;} 50% {transform: translateX(-240px); color: #E64C65;} 100% { transform: translateX(0); color: #fff; }}", 1);
    document.styleSheets[2].insertRule("@keyframes myStatusMove { 0% { transform: translateX(0); color: #00FFFF;} 100% {transform: translateX(" + (0 - overWidth) / 2 + "px); color: #FFFF00;}}", 1);
}

function gameNameMove() {
    var maxWidth = $("#container").width() - 190;
    $(".gameName").css("max-width", maxWidth);
}

//点击主播信息栏可展开/收起其下方的视频信息
function strDescToggle(ele) {
    var eleStyle = $(ele).next()[0].style;
    //console.log(eleStyle);
    if (eleStyle.display === "none") {
        eleStyle.display = "block";
    } else {
        eleStyle.display = "none";
    }
}

/*CSS中media query只能适配屏幕大小的变化, 本例比较特殊, 因为通过jQuery UI可以在屏幕大小固定的情况下拖动边框改变container的大小, 故需js中在定义监听*/
function respCont() {
    $("#container").resize(function() {
        //console.log($(this).width());
        var contWidth = $(this).width();
        if (contWidth <= 340) {
            $(".myTitle").css("font-size", "1.1em");
            $(".myStatus").css("font-size", "0.9em");
        } else if (contWidth >= 341 && contWidth <= 400) {
            $(".myTitle").css("font-size", "1.2em");
            $(".myStatus").css("font-size", "1em");
        }
        if (contWidth <= 412) {
            $(".strDesc").css({
                "text-align": "center",
                "width": "100%",
                "padding": "4px 0"
            });
            $(".strDesc span").css("font-size", "14px");
            $(".strImg").css({
                "height": "74px",
                "padding": "13px 2px",
                "display": "none"
            });
        } else if (contWidth >= 413 && contWidth <= 455) {
            $(".strDesc").css({
                "float": "left",
                "text-align": "left",
                "width": "calc(100% - 140px)",
                "padding": "4px 0 4px 4px"
            });
            $(".strDesc span").css("font-size", "12px");
            $(".strImg").css({
                "height": "74px",
                "padding": "13px 2px",
                "display": "inline-block"
            });
        } else if (contWidth >= 456 && contWidth <= 535) {
            $(".strDesc").css({
                "float": "left",
                "text-align": "left",
                "width": "calc(100% - 158px)",
                "padding": "4px 0 4px 4px"
            });
            $(".strDesc span").css("font-size", "13px");
            $(".strImg").css({
                "height": "80px",
                "padding": "10px 4px",
                "display": "inline-block"
            });
        }
    });
}

$(document).ready(function() {
    //借助jQuery UI方法使得整个消息框可以在一定范围内随意拖动和改变大小,
    //参考http: //www.runoob.com/jqueryui/example-draggable.html
    $("#container").draggable();
    $("#container").resizable({
        handles: 'n, e, w, ne, nw'
    });

    twListHeight();
    myStatusMove();
    gameNameMove();
    respCont();
    $(window).resize(function() {
        twListHeight();
        myStatusMove();
        gameNameMove();
    });

    for (var i in userIdArr) {
        getStreamer(userIdArr[i]);
    }

    $("#navAll").click(function() {
        showAll();
    });

    $("#navOnline").click(function() {
        showOnline();
    });

    $("#navOffline").click(function() {
        showOffline();
    });

    function showAll() {
        $("#navAll").addClass("active");
        $("#navOnline").removeClass("active");
        $("#navOffline").removeClass("active");
        $("#twOnline").css("display", "block");
        $("#twOffline").css("display", "block");
    }

    function showOnline() {
        $("#navOnline").addClass("active");
        $("#navAll").removeClass("active");
        $("#navOffline").removeClass("active");
        $("#twOnline").css("display", "block");
        $("#twOffline").css("display", "none");
    }

    function showOffline() {
        $("#navOffline").addClass("active");
        $("#navAll").removeClass("active");
        $("#navOnline").removeClass("active");
        $("#twOnline").css("display", "none");
        $("#twOffline").css("display", "block");
    }

    $("#srchIpt").on("input", function() {
        keydnwhich();
        srchVal = $(this).val();
        srchValCode = srchVal.charCodeAt(srchVal.length - 1);
        // srchValCode !== 32 屏蔽中文拼音输入(候选词状态)时srchVal变化的BUG
        if (srchValCode !== 32) {
            //console.log(srchValCode);
            //如果按下了退格键, 则将之前隐藏的结果都显示出来再重新匹配
            if (keyDnWhich === "Backspace") {
                //console.log("按下了退格键");
                $(".userDesc").css("display", "block");
            }
            $(".strDetail").css("display", "none");
            hideUnMatch();
        }

        /*通过keydown()事件监听, 并通过window.event.key得到按下的键值,
        从而判断是否按下了退格键, 供上面函数调用作进一步处理*/
        function keydnwhich() {
            $("#srchIpt").keydown(function() {
                var keyDnEvt = window.event;
                keyDnWhich = keyDnEvt.key;
            });
        }

        //搜索时隐藏不匹配的结果
        function hideUnMatch() {
            srchValExp = new RegExp(srchVal.toUpperCase());

            var onlineList = $("#twOnline").children();
            var offlineList = $("#twOffline").children();
            for (var j = 0; j < onlineList.length; j++) {
                if (!srchValExp.test($($("#twOnline .userName")[j]).html())) {
                    $("#twOnline li:nth-Child(" + (j + 1) + ")").css("display", "none");
                }
            }

            for (var k = 0; k < offlineList.length; k++) {
                if (!srchValExp.test($($("#twOffline .userName")[k]).html())) {
                    $("#twOffline li:nth-Child(" + (k + 1) + ")").css("display", "none");
                }
            }
        }
    });

    //手机端触摸事件监听及左右滑动切换菜单
    function touchMove() {
        var currentX = 0;
        var lastX = 0;
        var moveTo = null;
        $(document).on('touchmove', function(e) {
            // clearTimeout(lastT);
            currentX = e.originalEvent.touches[0].clientX;
            if (lastX === 0) {
                lastX = currentX;
            }
        });

        $(document).on("touchend", function(e) {
            if (currentX) {
                if (currentX - lastX > 0) {
                    moveTo = "right";
                } else if (currentX - lastX < 0) {
                    moveTo = "left";
                }
            }
            //console.log(moveTo);
            if (moveTo === "left") {
                if ($("#navAll").hasClass("active")) {
                    showOnline();
                } else if ($("#navOnline").hasClass("active")) {
                    showOffline();
                } else if ($("#navOffline").hasClass("active")) {
                    showAll();
                }
            } else if (moveTo === "right") {
                if ($("#navAll").hasClass("active")) {
                    showOffline();
                } else if ($("#navOnline").hasClass("active")) {
                    showAll();
                } else if ($("#navOffline").hasClass("active")) {
                    showOnline();
                }
            }
            //每次运行后重置
            currentX = 0;
            lastX = 0;
            moveTo = null;
        });
    }
    touchMove();
});

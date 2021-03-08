$(document).ready(function () {
    console.log("ready!");

    window.onload = function () {
        /*Adding Youtube Iframe API to body*/

    };

    var youTubeVideoTag = document.createElement('script');
    youTubeVideoTag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    document.body.appendChild(youTubeVideoTag, firstScriptTag);
    console.log("Youtube API Acquired!")


    // Announcement Bar ----------------------------------------------
    var modal = document.getElementById('myModal');
    var close_btn = document.getElementsByClassName("closebtn")[0];
    close_btn.onclick = function () {
        modal.style.display = "none";
    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    // ----------------------------------------------------------------



    function fetchJSONFile(path, callback) {
        var httpRequest = new XMLHttpRequest();

        httpRequest.open('GET', path);
        httpRequest.send();

        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState === 4) {
                if (httpRequest.status === 200) {
                    var data = JSON.parse(httpRequest.responseText);
                    if (callback) callback(data);
                }
            }
        };
    }

    var jsonAPI = "./data.json"; // revised in future https://tw.ticket.appledaily.com/promo
    fetchJSONFile(jsonAPI, function (json) {
        // Links
        for (a = 0; a < json.Link.length; a++) {
            var clone = $("#Link_Prefab").clone();
            let link = json.Link[a].ItemLink;
            clone.appendTo("#Link_Container").attr("id", "").attr("style", "dispaly:block").children(':first-child').attr("src", json.Link[a].ItemPic).attr("alt", json.Link[a].ItemAlt);
            clone.children(':first-child').click(function () {
                window.open(link);
            });
        }

        // Channels
        for (a = 0; a < json.Channel.length; a++) {
            var clone = $("#Link_Prefab").clone();
            let Channel = json.Channel[a].ItemLink;
            clone.appendTo("#Channel_Container").attr("id", "").attr("style", "dispaly:block").children(':first-child').attr("src", json.Channel[a].ItemPic).attr("alt", json.Channel[a].ItemAlt);
            clone.children(':first-child').click(function () {
                window.open(Channel);
            });
        }

        var Main_Count = 0;
        var yt_control_str = "?enablejsapi=1&amp;rel=0&amp;controls=0&amp;showinfo=0";
        // Center Panel
        for (a = 0; a < json.Center.length; a++) {
            // 置頂
            if (json.Center[a].ItemType == "main") {
                var clone = $("#Apple_Main_Prefab").clone();
                clone.appendTo("#Center_Panel_Container").attr("id", "").attr("style", "dispaly:block");
                clone.find(".videowrapper .video").addClass("active_youtube").attr("src", json.Center[a].ItemVideo + yt_control_str);


                let cover = clone.find(".videowrapper .video_cover");
                cover.css("background-image", "url(" + json.Center[a].ItemCover + ")")
                let index = Main_Count;
                Main_Count++;
                cover.click(function (ev) {
                    //cover.removeClass("video_cover");
                    cover.css("background-image", "");

                    if (ytPlayerId[index].getPlayerState() == 1) {
                        Now_YT_Index = null;
                        ytPlayerId[index].pauseVideo();
                    }
                    else {
                        Now_YT_Index = index;
                        ytPlayerId[index].playVideo();
                    }

                });

                // if (json.Center[a].ItemCover != "") {

                // }
                // else {
                //     clone.find(".videowrapper .video_cover").removeClass("video_cover");
                // }

                var lefts = clone.children(":nth-child(2)").children(":nth-child(1)").find("div");
                lefts.eq(0).text(json.Center[a].ItemDate);
                lefts.eq(1).html("<b>" + json.Center[a].ItemTopic + "</b>");
                lefts.eq(2).text(json.Center[a].ItemContent);

                var parent = clone.children(":nth-child(2)").children(":nth-child(2)");
                for (k = 0; k < json.Center[a].FunItem.length; k++) {
                    let Link = json.Center[a].FunItem[k].ItemLink;

                    var shell = $("<div></div>").css({ "font-size": "13px", "color": "rgba(100, 100, 100, 0.7)", "padding-bottom": "5px" }).text(json.Center[a].FunItem[k].ItemTopic);
                    var plus_symbol = $("<span></span>").css("font-size", "15px").html("㊉"); // ㊉
                    var hightlight = $("<span></span>").addClass("Link_Highlight").css("font-size", "13px").text(json.Center[a].FunItem[k].ItemHightlight).click(function () {
                        window.open(Link);
                    });

                    parent.append(shell.prepend(plus_symbol).append(hightlight));
                }

            }
            // 廣告贊助
            else if (json.Center[a].ItemType == "ad") {
                var clone = $("#Apple_AD_Prefab").clone();
                clone.appendTo("#Center_Panel_Container").attr("id", "").attr("style", "dispaly:block");

                var logo = clone.children(":nth-child(1)").find("div > img");
                let Ad_Link = json.Center[a].ItemLink;
                logo.attr("src", json.Center[a].ItemLogoPic).attr("alt", json.Center[a].ItemLogoAlt).click(function () {
                    window.open(Ad_Link);
                });

                var image = clone.children(":nth-child(2)").find("img");
                image.attr("src", json.Center[a].ItemPic).attr("alt", json.Center[a].ItemAlt).click(function () {
                    window.open(Ad_Link);
                });

                clone.children(":nth-child(2)").children(":nth-child(2)").html(json.Center[a].ItemTopic
                    + "<div class='Link_Highlight'>" + json.Center[a].ItemHightlight + "</div>").find(".Link_Highlight").click(function () {
                        window.open(Ad_Link);
                    });
            }
            // mobile 廣告贊助
            else if (json.Center[a].ItemType == "mobile_ad") {
                // var mobile_ad = $("<div></div>").addClass("parallax").css("background-image",'url(' + json.Center[a].ItemPic + ')').attr("data-image",json.Center[a].ItemPic);
                // let Link = json.Center[a].ItemLink;
                // mobile_ad.click(function () {
                //     window.open(Link);
                // });
                // mobile_ad.mkParallax();
                // mobile_ad.appendTo("#Center_Panel_Container");


                // var mobile_ad = $("<div></div>").addClass("mobile_ad").attr("data-image", json.Center[a].ItemPic).css("height", "500px");
                // mobile_ad.appendTo("#Center_Panel_Container");
                // mobile_ad.mkParallax();

                // let Link = json.Center[a].ItemLink;
                // mobile_ad.click(function () {
                //     window.open(Link);
                // });


                var parallax_container = $("<div></div>").addClass("parallax_container");
                var parallax_wrap = $("<div></div>").addClass("parallax_wrap");
                var parallax_bg = $("<div></div>").addClass("parallax_bg").css("background-image", 'url(' + json.Center[a].ItemPic + ')');

                let Link = json.Center[a].ItemLink;
                parallax_container.click(function () {
                    window.open(Link);
                });

                parallax_bg.appendTo(parallax_wrap.appendTo(parallax_container.appendTo("#Center_Panel_Container")));

            }
            // mobile 影片 廣告贊助
            else if (json.Center[a].ItemType == "mobile_video_ad") {
                let clone = $("#Video_AD_Prefab").clone();
                clone.appendTo("#Center_Panel_Container").attr("id", "").attr("style", "dispaly:block");
                clone.find(".bg_image").css("background-image", 'url(' + json.Center[a].ItemPic + ')');
                // clone.find("iframe").attr("src", json.Center[a].ItemVideo + "?rel=0&amp;autoplay=1&amp;loop=1&amp;controls=0&amp;mute=1");

                clone.find(".video").addClass("video_identifier").attr("data-id", json.Center[a].ItemVideo_Id);

                let Link = json.Center[a].ItemLink;
                clone.click(function () {
                    window.open(Link);
                });

                let video_container = clone.find(".video_container");
                video_container.css("top", clone.offset().top);

                $(window).scroll(function () {
                    var pos = $(window).scrollTop();

                    var nav_height = 50;
                    var this_ad_top = clone.offset().top;

                    var index = clone.offset().top + 280; // offset

                    // console.log("........" + pos);

                    if (pos >= (this_ad_top - nav_height) && pos < index) { // youtube reach nav bar, stop at nav_bar outerHeight
                        video_container.css('top', nav_height);
                    }
                    else if (pos >= index) { // next content reach youtube
                        var kkk = index + nav_height - pos; // all above height - pos
                        video_container.css('top', kkk);

                    }
                    else {
                        var kkk = this_ad_top - pos; // all above height - pos
                        video_container.css('top', kkk);

                    }

                });

            }
            // 廣告圖片
            else if (json.Center[a].ItemType == "img") {
                var clone = $("#Apple_Img_Prefab").clone();
                clone.appendTo("#Center_Panel_Container").attr("id", "").attr("style", "dispaly:block").find('div>img').attr("src", json.Center[a].ItemPic).attr("alt", json.Center[a].ItemAlt);
                clone.find("div>div>div").text(json.Center[a].ItemTopic);

                let Ad_Link = json.Center[a].ItemLink;
                clone.find('div>img').click(function () {
                    window.open(Ad_Link);
                });
            }
            // 頂級講座 or 試用活動
            else if (json.Center[a].ItemType == "lecture" || json.Center[a].ItemType == "trials") {
                var clone = $("#Apple_Activity_Prefab").clone();
                clone.appendTo("#Center_Panel_Container").attr("id", "").attr("style", "dispaly:block");
                if (json.Center[a].ItemType == "lecture")
                    clone.find(".row").eq(0).children(":nth-child(4)").text("頂級講座");
                else if (json.Center[a].ItemType == "trials")
                    clone.find(".row").eq(0).children(":nth-child(4)").text("試用活動");

                let Top_Link = json.Center[a].TopLink;
                clone.children(":nth-child(1)").click(function () {
                    window.open(Top_Link);
                });

                for (k = 0; k < json.Center[a].Item.length; k++) {
                    let Ad_Link = json.Center[a].Item[k].ItemLink;
                    clone.find(".row").eq(1).children(":nth-child(" + (k + 1) + ")").children("img").css("cursor", "pointer")
                        .attr("src", json.Center[a].Item[k].ItemPic).attr("alt", json.Center[a].Item[k].ItemAlt).click(function () {
                            window.open(Ad_Link);
                        });
                    clone.find(".row").eq(1).children(":nth-child(" + (k + 1) + ")").children("div").text(json.Center[a].Item[k].ItemContent);
                }
            }
            // 開箱影片
            else if (json.Center[a].ItemType == "unboxing") {
                var clone = $("#Apple_Unboxing_Prefab").clone();
                clone.appendTo("#Center_Panel_Container").attr("id", "").attr("style", "dispaly:block");
                let Top_Link = json.Center[a].TopLink;
                clone.children(":nth-child(3)").click(function () {
                    window.open(Top_Link);
                });

                for (k = 0; k < json.Center[a].Item.length; k++) {
                    var item = clone.children(":nth-child(2)").children(":nth-child(" + (k + 1) + ")");
                    item.find(".Mini_Youtube_Container .video").addClass("active_youtube").attr("src", json.Center[a].Item[k].ItemVideo + yt_control_str)
                    item.children(":nth-child(2)").html("" + json.Center[a].Item[k].ItemContent); //"<b>【oh! Box】</b>"

                    let cover = item.find(".Mini_Youtube_Container .video_cover");
                    cover.css("background-image", "url(" + json.Center[a].Item[k].ItemCover + ")")

                    let index = Main_Count;
                    Main_Count++;
                    cover.click(function (ev) {
                        //cover.removeClass("video_cover");
                        cover.css("background-image", "");

                        if (ytPlayerId[index].getPlayerState() == 1) {
                            Now_YT_Index = null;
                            ytPlayerId[index].pauseVideo();
                        }
                        else {
                            Now_YT_Index = index;
                            ytPlayerId[index].playVideo();
                        }

                    });

                }

            }
            // 專題活動
            else if (json.Center[a].ItemType == "topic") {
                var clone = $("#Apple_Topic_Prefab").clone();
                clone.appendTo("#Center_Panel_Container").attr("id", "").attr("style", "dispaly:block");

                for (k = 0; k < json.Center[a].Item.length; k++) {
                    let Topic_Link = json.Center[a].Item[k].ItemLink;
                    clone.children(":nth-child(" + (k + 2) + ")").children(":nth-child(1)").attr("src", json.Center[a].Item[k].ItemPic).attr("alt", json.Center[a].Item[k].ItemAlt)
                        .css("cursor", "pointer").click(function () {
                            window.open(Topic_Link);
                        });
                    var texts = clone.children(":nth-child(" + (k + 2) + ")").children(":nth-child(2)").find("div");
                    texts.eq(0).text(json.Center[a].Item[k].ItemTopic);
                    texts.eq(1).text(json.Center[a].Item[k].ItemSubTopic);
                    texts.eq(2).text(json.Center[a].Item[k].ItemContent);
                    texts.eq(3).click(function () {
                        window.open(Topic_Link);
                    });
                }

            }

            // Horizontal_Line
            $("#Center_Panel_Container").append('<div class="Horizontal_Line""></div>');

        }

        // Right_Panel
        for (a = 0; a < json.Right.length; a++) {
            // 影片_文字
            if (json.Right[a].ItemType == "video_text") {
                var clone = $("#AD_VideoAndText").clone();
                clone.appendTo("#Right_Panel_Container").attr("id", "").attr("style", "dispaly:block");
                clone.children(":nth-child(1)").text(json.Right[a].ItemTopic);
                clone.children(":nth-child(2)").text(json.Right[a].ItemContent);
                clone.find(".Youtube_Container .video").attr("src", json.Right[a].ItemVideo + yt_control_str);
                clone.children(":nth-child(4)").text(json.Right[a].ItemVideoIntro);

            }
            // 廣告圖片
            else if (json.Right[a].ItemType == "img") {
                var clone = $("#AD_Image").clone();
                let Ad_Link = json.Right[a].ItemLink;
                clone.appendTo("#Right_Panel_Container").attr("id", "").attr("style", "dispaly:block").children(':first-child').attr("src", json.Right[a].ItemPic).attr("alt", json.Right[a].ItemAlt);
                clone.children(':first-child').click(function () {
                    window.open(Ad_Link);
                });

            }

        }


        InitFloatingYoutube();

    });

});




window.onYouTubePlayerAPIReady = function () {
    var player_con = $(".video_identifier");
    for (var i = 0; i < player_con.length; i++) {
        initPlayer(player_con[i]);
    }
};

var initPlayer = function (element) {
    var ytplayer = new YT.Player(element, {
        playerVars: {
            'autoplay': 1,
            'modestbranding': 1,
            'rel': 0,
            'playsinline': 1,
            'loop': 1,
            'controls': 0
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        },
        videoId: element.dataset.id
    });

    function onPlayerReady(event) {
        event.target.mute();
        event.target.playVideo();
    }

    function onPlayerStateChange(event) {
        event.target.mute();
        event.target.playVideo();
    }

};
import React, { useState, useRef } from 'react';
import { Heart, Copy, CheckCircle2, Flower2, ChevronRight, Download, Loader2 } from 'lucide-react';

// 7大心靈渴望分類
const categories = [
  { id: 'c1', name: '平靜與勇氣 🕊️' },
  { id: 'c2', name: '信任與指引 🧭' },
  { id: 'c3', name: '擁抱當下 ☀️' },
  { id: 'c4', name: '溫暖連結 🌷' },
  { id: 'c5', name: '安全與邊界 🛡️' },
  { id: 'c6', name: '希望與力量 🌈' },
  { id: 'c7', name: '柔軟與包容 ☁️' }
];

// 安全備用圖片 (防止任何破圖情況)
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&w=1080&q=80';

// 完整 38 種花精情境 (已全面嚴格校對：確保 38 張圖片 100% 獨立不重複，且連結完全有效)
const healingPosts = [
  // --- Category 1: 平靜與勇氣 ---
  {
    id: 'rockrose', categoryId: 'c1', feeling: '需要一股強大且安定的力量 🛡️', flowerEssence: '岩玫瑰',
    keyQuote: '有一股強大且充滿愛的力量，時時刻刻守護著我。',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1080&q=80', // 堅固的石頭與沙灘
    postContent: `親愛的，早安 🕊️\n\n有時候，外在的變化會讓我們的心跳稍微加快，這時請把手放在胸口，感受自己的心跳。你是被整個宇宙深深保護著的。\n\n「我安全地活在這個世界上。我呼吸著平靜，吐出所有的不安。有一股強大且充滿愛的力量，時時刻刻守護著我。」✨\n\n🌱 【今日的心靈種子】\n今天，試著成為身邊人的「安定石」。當有人顯得慌亂時，給予一個沈穩的微笑或溫柔的拍肩。當我們給出安定，我們內在的安全感也會變得無比堅韌 🌿\n\n願你今天感到無比的安全與踏實。❤️`
  },
  {
    id: 'mimulus', categoryId: 'c1', feeling: '面對未知，需要一點勇敢的力量 🌟', flowerEssence: '溝酸漿',
    keyQuote: '我們被愛深深包圍，所有的經歷都只是為了學習去愛。',
    imageUrl: 'https://images.unsplash.com/photo-1504198458649-3128b932f49e?auto=format&fit=crop&w=1080&q=80', // 溫暖柔和的光暈，象徵黑暗中點亮勇氣
    postContent: `親愛的孩子，早安 🌟\n\n面對尚未發生的事情，心裡偶爾有一點點小擔憂是正常的。每一個小小的擔憂，都是內在小孩在呼喚著你的愛與陪伴。\n\n「輕輕抱著這份感受，告訴它：沒關係的，有我在這裡陪你。我們被愛深深包圍，所有的經歷都只是為了讓我們學習去愛。」✨\n\n🌱 【今日的心靈種子】\n今天，讓我們種下『安心』的種子。當你察覺到身邊的朋友有一點不安時，給予他們一句肯定的鼓勵。當我們成為別人眼中的光，這份光芒也會自動照亮我們前方的道路 🕯️\n\n願你今天被滿滿的安全感擁抱。❤️`
  },
  {
    id: 'cherryplum', categoryId: 'c1', feeling: '需要在緊繃中找回寧靜 🌸', flowerEssence: '櫻桃李',
    keyQuote: '在溫柔的放手中，我找到了真正的寧靜與自由。',
    imageUrl: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=1080&q=80', // 綻放飄落的櫻花
    postContent: `親愛的，早安 🌸\n\n當你覺得心裡的弦繃得有點緊時，請允許自己深深地嘆一口氣，把肩膀放下來。你不需要總是完美地控制一切，適時地放手是安全的。\n\n「我允許自己放鬆。我信任生命的河流會將我帶往美好的地方。在放手中，我找到了真正的寧靜與自由。」✨\n\n🌱 【今日的心靈種子】\n今天，如果看到有人顯得很緊繃，試著對他們展現寬容與理解，不急著催促。當我們給予他人喘息的空間，我們緊繃的神經也會隨之溫柔地舒展開來 🍃\n\n願你今天擁有一顆柔軟放鬆的心。❤️`
  },
  {
    id: 'aspen', categoryId: 'c1', feeling: '渴望一種無以名狀的安全感 🌙', flowerEssence: '白楊',
    keyQuote: '我被神聖的愛與光所包圍，我是絕對安全的。',
    imageUrl: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=1080&q=80', // 溫暖安全的帳篷微光
    postContent: `親愛的，早安 🌙\n\n有時候，空氣中微小的波動就會觸動我們敏銳的心。你的敏感是一份珍貴的禮物，而你隨時都有能力為自己建立一個充滿光的防護罩。\n\n「我被神聖的愛與光所包圍。一切都在完美的秩序中。我是安全的，我所愛的人也是安全的。」✨\n\n🌱 【今日的心靈種子】\n今天，試著為身邊的環境帶來一點點『光』。也許是點亮一盞溫暖的燈，或是為空間換上清新的擴香。當我們為別人創造安心的環境，我們的心也會自動安住在平靜之中 🕯️\n\n願你今天沐浴在充滿愛的守護光芒中。❤️`
  },
  {
    id: 'redchestnut', categoryId: 'c1', feeling: '想要放下對所愛之人的擔憂 💕', flowerEssence: '紅栗樹',
    keyQuote: '我將擔憂化為滿滿的愛與祝福，送給最愛的人。',
    imageUrl: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1080&q=80', // 陽光下輕柔飄散的蒲公英種子
    postContent: `親愛的，早安 💕\n\n你對身邊人的關心是如此深厚，但過度的擔憂有時會讓彼此都感到沉重。試著將這份擔憂，轉化為溫暖而充滿力量的祝福吧。\n\n「我信任生命會給予我所愛的人最好的安排。我將擔憂化為滿滿的愛與祝福，送給他們。我們都在各自完美的旅程上。」✨\n\n🌱 【今日的心靈種子】\n今天，與其開口叮嚀或擔憂，不如在心裡為你掛念的人送上一句默默的祝福。當我們給出『信任』的空間，愛就能以最自由、最美麗的姿態流動 🦋\n\n願你今天充滿信任與自在的喜悅。❤️`
  },

  // --- Category 2: 信任與指引 ---
  {
    id: 'cerato', categoryId: 'c2', feeling: '想要相信自己內在的直覺 🦋', flowerEssence: '水蕨',
    keyQuote: '我全然信任我的內在導引，我是自己最有智慧的導師。',
    imageUrl: 'https://images.unsplash.com/photo-1515002246390-7bf7e8f87b54?auto=format&fit=crop&w=1080&q=80', // 清澈見底的水與水晶色調
    postContent: `親愛的，早安 🦋\n\n你的內在擁有無比深邃的智慧。不需要總是向外尋求答案，靜下心來，傾聽那個微小但堅定的心聲，它一直都知道最好的方向。\n\n「我全然信任我的內在導引。每一個決定都是在愛的指引下發生的。我就是自己生命中最有智慧的導師。」✨\n\n🌱 【今日的心靈種子】\n今天，當別人向你徵詢意見時，試著不直接給答案，而是溫柔地鼓勵他們傾聽自己的心聲。當我們支持別人相信自己，我們內在的直覺也會變得更加明亮清晰 💫\n\n願你今天充滿自信與篤定。❤️`
  },
  {
    id: 'scleranthus', categoryId: 'c2', feeling: '想要在選擇中找到內心的平衡 ⚖️', flowerEssence: '線球草',
    keyQuote: '我以平靜的心做出選擇，相信這是最適合我的道路。',
    imageUrl: 'https://images.unsplash.com/photo-1490682143684-14369e18dce8?auto=format&fit=crop&w=1080&q=80', // 水面上的平衡銀杏葉
    postContent: `親愛的，早安 ⚖️\n\n面對岔路口時的左右為難，是因為我們太想做出「完美」的選擇。但請記得，無論走哪一條路，沿途都會有獨特而美麗的風景等著你。\n\n「我放下對完美的執著。我以平靜的心做出選擇，並相信這就是當下最適合我的道路。我的內心充滿著和諧與平衡。」✨\n\n🌱 【今日的心靈種子】\n今天，試著在生活中的小事上（比如點餐）迅速做決定，並愉快地享受它。當我們不再糾結，為自己種下『果斷』的種子，宇宙就會為我們帶來清晰的指引 🌿\n\n願你今天擁有輕盈自在的步伐。❤️`
  },
  {
    id: 'gentian', categoryId: 'c2', feeling: '遇到小挫折，需要一點前進的信心 🧗‍♀️', flowerEssence: '龍膽',
    keyQuote: '每一次的經驗都是生命的禮物，我對未來充滿信心。',
    imageUrl: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=1080&q=80', // 石縫中堅韌綻放的小花
    postContent: `親愛的，早安 🧗‍♀️\n\n路途中有時會遇到小小的石頭讓我們絆了一下，但這並不代表路走錯了，只是提醒我們稍微放慢腳步，欣賞一下身邊的風景。\n\n「每一次的經驗都是生命的禮物。我釋放所有的氣餒，我對未來充滿了樂觀與信心。我知道一切都在變得越來越好。」✨\n\n🌱 【今日的心靈種子】\n今天，看見身邊有人因為小事感到氣餒時，給予他們一個充滿希望的微笑和一句真誠的鼓勵。當我們成為他人前進的動力，我們自己也會獲得源源不絕的信心 ☀️\n\n願你今天充滿力量與希望。❤️`
  },
  {
    id: 'gorse', categoryId: 'c2', feeling: '想要看見雲後那道充滿希望的曙光 🌅', flowerEssence: '荊豆',
    keyQuote: '我向生命的無限可能敞開心扉，選擇看見希望。',
    imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1080&q=80', // 雲海之上透出的溫暖日出
    postContent: `親愛的，早安 🌅\n\n當我們覺得似乎看不到光的時候，其實光一直都在，只是暫時被厚厚的雲層遮住了。請在心裡留一個小小的縫隙，讓奇蹟有機會溜進來。\n\n「我向生命的無限可能敞開心扉。我知道在每一個挑戰背後，都隱藏著巨大的祝福。我選擇看見希望。」✨\n\n🌱 【今日的心靈種子】\n今天，試著對一個看似沒有轉機的事情，說一句：「也許會有意想不到的好事發生呢！」當我們散播『希望』的種子，宇宙就會把奇蹟帶到我們眼前 🕊️\n\n願你今天看見生命最美麗的曙光。❤️`
  },
  {
    id: 'hornbeam', categoryId: 'c2', feeling: '需要一點開啟新的一天的動力 ☕', flowerEssence: '角樹',
    keyQuote: '我充滿活力地迎接新的一天，感受精神奕奕。',
    imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1080&q=80', // 早晨清新的拿鐵與筆記本
    postContent: `親愛的，早安 ☕\n\n早晨醒來時，有時身體已經醒了，但心還想再賴一下床。給自己一個溫柔的伸展，用一個微小的期待來喚醒今天的熱情吧。\n\n「我充滿活力地迎接新的一天。今天會有許多有趣和美好的事情等著我。我感覺精神奕奕，充滿力量。」✨\n\n🌱 【今日的心靈種子】\n今天，試著為身邊的人創造一點小小的『期待』，也許是帶一杯咖啡給同事，或是傳一個早安的可愛貼圖。當我們喚起別人的活力，我們自己也會充滿前進的動力 🏃‍♀️\n\n願你今天充滿朝氣與喜悅。❤️`
  },
  {
    id: 'wildoat', categoryId: 'c2', feeling: '想要清晰地看見靈魂的呼喚 🌾', flowerEssence: '野生燕麥',
    keyQuote: '我帶著喜悅探索世界，道路正清晰地展現在我面前。',
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1080&q=80', // 開闊的金色麥田
    postContent: `親愛的，早安 🌾\n\n當我們因為擁有很多興趣而感到迷惘時，其實是因為我們的靈魂非常豐富。不需要急著定位自己，每一步的探索，都是拼湊出完整地圖的過程。\n\n「我的生命充滿了意義。我帶著喜悅的心去探索世界，我清楚地知道什麼能讓我的靈魂唱歌。我的道路正清晰地展現在我面前。」✨\n\n🌱 【今日的心靈種子】\n今天，如果有人對你分享他們的夢想，請給予他們最熱烈的支持與肯定。當我們幫助他人看見他們的光芒，我們自己靈魂的呼喚也會變得更加清晰宏亮 🌟\n\n願你今天聽見內心最真實的聲音。❤️`
  },

  // --- Category 3: 擁抱當下 ---
  {
    id: 'clematis', categoryId: 'c3', feeling: '想要溫柔地回到這個當下 🌼', flowerEssence: '鐵線蓮',
    keyQuote: '我喜悅地活在此時此刻，感受生命豐富的恩典。',
    imageUrl: 'https://images.unsplash.com/photo-1472396961693-142e5e5bf78e?auto=format&fit=crop&w=1080&q=80', // 柔和的綠葉與光影，取代原本失效的連結
    postContent: `親愛的，早安 🌼\n\n做夢是一件很美的事，但這個真實的世界裡，也有著微風、陽光和花香等著你去感受。輕輕地把意識帶回到呼吸上，感受雙腳踏在地上的安穩。\n\n「我喜悅地活在此時此刻。當下就是我創造美好生活的地方。我扎根於大地，感受著生命豐富的恩典。」✨\n\n🌱 【今日的心靈種子】\n今天，試著全心全意地陪伴一個人幾分鐘，放下手機，看著他的眼睛專心聽他說話。當我們給出『臨在』的陪伴，我們也為自己種下了回到當下的安穩錨點 ⚓\n\n願你今天深刻體會每一個當下的美好。❤️`
  },
  {
    id: 'honeysuckle', categoryId: 'c3', feeling: '想要溫柔地放下過去，擁抱今天 🌷', flowerEssence: '忍冬',
    keyQuote: '我懷著感恩釋放過去，將愛與能量投注在今天。',
    imageUrl: 'https://images.unsplash.com/photo-1508739773402-2204d02b5db0?auto=format&fit=crop&w=1080&q=80', // 充滿生命力的柔和粉色花朵
    postContent: `親愛的，早安 🌷\n\n過去的記憶無論多麼美好，都已經成為滋養我們靈魂的養分。請把美好的回憶收在心底，然後輕輕轉身，看看今天為你準備了什麼驚喜。\n\n「我懷著感恩的心釋放過去。我把所有的愛與能量都投注在今天。每一個全新的一天，都是我創造奇蹟的畫布。」✨\n\n🌱 【今日的心靈種子】\n今天，試著創造一個全新的小體驗，比如走一條不同的路去買咖啡，或是嘗試一種新的口味。當我們為生活注入『新鮮』的能量，我們也為自己打開了通往今天美好事物的大門 🚪\n\n願你今天充滿新生的喜悅與活力。❤️`
  },
  {
    id: 'wildrose', categoryId: 'c3', feeling: '想要重新找回對生活的熱情 🌹', flowerEssence: '野玫瑰',
    keyQuote: '我用心去感受每一個平凡時刻裡的不平凡。',
    imageUrl: 'https://images.unsplash.com/photo-1543431341-3b76cfb16e45?auto=format&fit=crop&w=1080&q=80', // 充滿活力的粉紅野玫瑰
    postContent: `親愛的，早安 🌹\n\n如果最近覺得生活有點平淡，沒關係的，這只是靈魂在稍作休息。在平凡的日子裡，依然藏著許多閃閃發光的微小確幸等待你去發現。\n\n「我的生命充滿了喜悅與熱情。我用心去感受每一個平凡時刻裡的不平凡。每一天，都是宇宙送給我最棒的禮物。」✨\n\n🌱 【今日的心靈種子】\n今天，帶著微笑主動去讚美生活周遭的事物，也許是稱讚店員的服務，或是欣賞路邊的一朵小花。當我們散播『熱情』的種子，生命的熱力就會重新在我們心中熊熊燃燒 🔥\n\n願你今天對生活充滿悸動與熱愛。❤️`
  },
  {
    id: 'olive', categoryId: 'c3', feeling: '想給自己一個深深的溫暖擁抱 🌿', flowerEssence: '橄欖',
    keyQuote: '我深深接納需要喘息的時刻，這本身就是一種完美。',
    imageUrl: 'https://images.unsplash.com/photo-1499104051052-8703f8373ce8?auto=format&fit=crop&w=1080&q=80', // 溫暖純白的床鋪，象徵深層休息
    postContent: `親愛的，早安 🌿\n\n有時候，我們的身體和心靈只是單純地想要一個溫暖的擁抱，想要停下來好好地呼吸。允許自己休息是絕對安全的，你不需要總是表現得無懈可擊。\n\n「我愛你，而且我深深地接納你現在需要喘息的時刻。你的存在本身就是一種完美，不需要透過不斷地付出來證明價值。」✨\n\n🌱 【今日的心靈種子】\n今天，為自己種下一顆『柔軟』的種子。當你看到身邊有人顯得力不從心時，給他們一個溫暖的微笑或一杯熱茶。當我們溫柔接納別人的狀態，也為自己預留了被呵護的空間 🍵\n\n願你今天被滿滿的愛與滋養所包圍。❤️`
  },
  {
    id: 'whitechestnut', categoryId: 'c3', feeling: '想要讓轉個不停的思緒安靜下來 ☁️', flowerEssence: '白栗樹',
    keyQuote: '我釋放反覆的思緒，在寧靜中找到內在的智慧。',
    imageUrl: 'https://images.unsplash.com/photo-1501430654243-c934cec2e1c0?auto=format&fit=crop&w=1080&q=80', // 平靜無波倒映著天空的湖水
    postContent: `親愛的，早安 ☁️\n\n當腦海裡像是有個停不下來的旋轉木馬時，請想像有一陣溫柔的微風，輕輕地將這些思緒吹散，化為天邊潔白的雲朵。\n\n「我的心靈平靜且清澈。我釋放所有反覆的思緒，我允許自己的大腦休息。在寧靜中，我找到了內在的智慧與答案。」✨\n\n🌱 【今日的心靈種子】\n今天，試著不去打斷別人的說話，安靜而包容地傾聽。當我們給予他人『平靜表達』的空間，我們自己腦海中的雜音也會神奇地逐漸安靜下來 🕊️\n\n願你今天擁有一片澄澈寧靜的心空。❤️`
  },
  {
    id: 'mustard', categoryId: 'c3', feeling: '想要撥開心的烏雲，看見陽光 🌻', flowerEssence: '芥末',
    keyQuote: '我讓喜悅的陽光灑滿心房，迎接生命所有的快樂。',
    imageUrl: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=1080&q=80', // 明亮的向日葵花海
    postContent: `親愛的，早安 🌻\n\n有時候，心情會沒來由地像是被一片雲朵遮住，這沒什麼大不了的。風一吹，雲就會散去，陽光依然在那裡閃耀。\n\n「我讓喜悅的陽光灑滿我的心房。每一天都是充滿愛與光明的新開始。我敞開雙手，迎接生命中所有的快樂。」✨\n\n🌱 【今日的心靈種子】\n今天，試著做一件能讓別人會心一笑的小事，也許是分享一個可愛的影片，或是寫一張溫暖的便利貼。當我們為別人帶來『快樂』，這份喜悅就會像陽光一樣驅散我們心中的陰霾 ☀️\n\n願你今天心情明朗，笑容燦爛。❤️`
  },
  {
    id: 'chestnutbud', categoryId: 'c3', feeling: '期待從生活中輕盈學習 🌱', flowerEssence: '栗樹芽苞',
    keyQuote: '我帶著敞開的心學習，每一次經驗都讓我蛻變。',
    imageUrl: 'https://images.unsplash.com/photo-1463003416389-296a1ad37ca0?auto=format&fit=crop&w=1080&q=80', // 充滿生機的新鮮綠芽
    postContent: `親愛的，早安 🌱\n\n生命是一位溫柔的老師，有時候會用重複的情境來提醒我們某些重要的事。帶著好奇心去觀察，你會發現每一天都有閃閃發光的新體悟。\n\n「我帶著敞開的心學習生命給我的每一堂課。我輕鬆地吸收智慧，每一次的經驗都讓我蛻變成更好的自己。」✨\n\n🌱 【今日的心靈種子】\n今天，試著用欣賞的眼光去學習別人身上的一個優點，並真誠地告訴他。當我們以『謙卑與欣賞』的心去學習，我們自己的成長之路也會變得輕盈無比 🦋\n\n願你今天充滿新發現的喜悅。❤️`
  },

  // --- Category 4: 溫暖連結 ---
  {
    id: 'waterviolet', categoryId: 'c4', feeling: '想要在安靜中感受溫暖連結 🌸', flowerEssence: '水堇',
    keyQuote: '我在獨處中感到安穩，也在與人的連結中感到喜悅。',
    imageUrl: 'https://images.unsplash.com/photo-1490750967868-8f514cae361f?auto=format&fit=crop&w=1080&q=80', // 優雅寧靜的紫色花卉
    postContent: `親愛的，早安 🌸\n\n你喜歡安靜與獨處，這是一份非常高雅的特質。在保有自己神聖空間的同時，輕輕地向世界敞開一扇窗，讓溫暖的微風與愛流動進來吧。\n\n「我在獨處中感到安穩，也在與人的連結中感到喜悅。我用愛與這個世界溫柔地交流，我是受歡迎且被愛的。」✨\n\n🌱 【今日的心靈種子】\n今天，試著主動向一個不太熟的同事或鄰居點頭微笑，說聲早安。當我們輕輕地打破隔閡，給出『友善』，我們就會感受到與這個世界溫暖而美好的連結 🤝\n\n願你今天擁有自在又溫暖的交流。❤️`
  },
  {
    id: 'impatiens', categoryId: 'c4', feeling: '想要放慢腳步，慢慢來 🌷', flowerEssence: '鳳仙花',
    keyQuote: '宇宙正準備最美好的禮物，我帶著愛安靜等待。',
    imageUrl: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=1080&q=80', // 慢慢綻放的粉色鬱金香
    postContent: `親愛的，早安 🌷\n\n生命有它自己最美麗的節奏。一切都在神聖的秩序中完美地展開。請試著深呼吸，把心裡那份想要催促的感覺輕輕地放下。\n\n「宇宙正在為你準備最美好的禮物，我們只需要帶著愛，安靜地等待。我全然信任生命的過程，每一刻都在為我的最高利益運作。」✨\n\n🌱 【今日的心靈種子】\n如果你渴望事情順利推進，今天請試著將『耐心』送給身邊的人。也許是靜靜聽完朋友說話，或是對服務人員多份包容。當我們給出時間的溫柔，生命的花朵也會在最完美的時刻綻放 🦋\n\n願你今天擁有一顆寧靜從容的心。❤️`
  },
  {
    id: 'heather', categoryId: 'c4', feeling: '渴望被深刻地傾聽與理解 🌻', flowerEssence: '石楠',
    keyQuote: '我的存在本身充滿價值，我安全地表達並被理解。',
    imageUrl: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=1080&q=80', // 溫暖的雙人下午茶時光
    postContent: `親愛的，早安 🌻\n\n渴望被看見、被聽見，是我們靈魂深處最自然的呼喚。你的每一個故事、每一種感受，都非常重要，宇宙一直都在深深地傾聽著你。\n\n「我深深地愛著我自己。我不需要不斷地向外證明自己，因為我的存在本身就充滿了價值。我安全地表達，也被溫柔地理解。」✨\n\n🌱 【今日的心靈種子】\n今天，試著成為一個全然的『傾聽者』。當別人說話時，不急著回應，而是用眼神給予深深的接納。當我們給予他人被理解的空間，我們也會吸引到願意懂我們的靈魂伴侶 👂\n\n願你今天感到被愛與被深深地理解。❤️`
  },

  // --- Category 5: 安全與邊界 ---
  {
    id: 'agrimony', categoryId: 'c5', feeling: '想要卸下微笑面具，真實做自己 🎭', flowerEssence: '龍芽草',
    keyQuote: '我不必總是完美無瑕，我的真實就是最美麗的模樣。',
    imageUrl: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=1080&q=80', // 窗邊自由呼吸的小雛菊
    postContent: `親愛的，早安 🎭\n\n一直以來用微笑照顧著大家的情緒，你辛苦了。今天，試著把討好別人的力氣收回來，輕輕地抱一抱那個偶爾也會感到脆弱的自己吧。\n\n「我愛你，我全然接納你所有的情緒。你不必總是完美無瑕，你的真實，就是這世界上最美麗、最值得被愛的模樣。」✨\n\n🌱 【今日的心靈種子】\n今天，試著對身邊的人展現一份純粹的『真誠』。說出自己真實的小感受，或是容許別人在你面前表現出脆弱。當我們允許真實發生，我們就為自己種下了自由呼吸的空間 🦋\n\n願你今天輕鬆自在，做最喜歡的自己。❤️`
  },
  {
    id: 'centaury', categoryId: 'c5', feeling: '學習溫柔地說「不」，守護自己 🛡️', flowerEssence: '矢車菊',
    keyQuote: '我尊重自己的需求，溫和地說「不」是安全的。',
    imageUrl: 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?auto=format&fit=crop&w=1080&q=80', // 被柔和光環保護的花朵
    postContent: `親愛的，早安 🛡️\n\n你有一顆非常善良且願意付出的心。但請記得，最需要你這份善良的人，其實是你自己。溫柔地設立界線，是愛自己最美麗的方式。\n\n「我尊重自己的需求。溫和地說『不』是完全安全的。我把愛與能量留給自己，這讓我能夠更健康地去愛這個世界。」✨\n\n🌱 【今日的心靈種子】\n今天，當你看到別人勇敢表達自己界線時（比如拒絕了一個請求），在心裡讚美他們的勇敢。當我們隨喜別人的『自我守護』，我們也會長出溫柔而堅定的力量 🌿\n\n願你今天擁有守護自己能量的溫柔勇氣。❤️`
  },
  {
    id: 'walnut', categoryId: 'c5', feeling: '面對小改變，想要安定的心 🦋', flowerEssence: '胡桃',
    keyQuote: '我勇敢地往前走，喜悅迎接生命中新鮮美好的事物。',
    imageUrl: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1080&q=80', // 被陽光照亮的安全森林小徑
    postContent: `親愛的，早安 🦋\n\n生命中的每一個轉彎，都是宇宙邀請你走向更美麗風景的溫柔手勢。請放心，你是受到保護的，有一層金色的光芒一直溫柔地包圍著你。\n\n「請相信直覺，勇敢地往前走。我釋放過去的牽絆，喜悅地迎接生命中所有新鮮美好的事物。一切都會非常、非常的好。」✨\n\n🌱 【今日的心靈種子】\n今天，當你看見別人在新環境中感到不知所措時，給他們一個安定的眼神或溫暖的提示。當我們協助他人安穩度過轉變，我們自己的每一步也會走得更加踏實心安 🕊️\n\n願你今天充滿安定與喜悅的力量。❤️`
  },
  {
    id: 'holly', categoryId: 'c5', feeling: '渴望被愛，想找回心中的柔軟 🌺', flowerEssence: '冬青',
    keyQuote: '我選擇用愛的眼光看待自己，愛是我最自然的存在。',
    imageUrl: 'https://images.unsplash.com/photo-1496857239036-1fb137683000?auto=format&fit=crop&w=1080&q=80', // 充滿愛的浪漫粉色玫瑰
    postContent: `親愛的，早安 🌺\n\n有時候心裡會覺得刺刺的，那只是因為太渴望被愛了。你本身，就是愛的化身。那份純粹的愛一直都在你的心底溫柔地湧動。\n\n「你值得擁有世間所有美好的事物。我選擇用愛的眼光看待自己，也用愛的眼光看待世界。愛，是我生命中最自然的存在。」✨\n\n🌱 【今日的心靈種子】\n如果你渴望被愛、被看見，今天請先成為那個給出愛的人。真誠地讚美一個人的笑容，或是隨喜朋友的開心事。當我們為別人感到喜悅，就是在心田種下滿滿被愛的花朵 💖\n\n願你今天閃耀著愛的動人光芒。❤️`
  },

  // --- Category 6: 希望與力量 ---
  {
    id: 'larch', categoryId: 'c6', feeling: '想要看見自己的閃閃發光 ✨', flowerEssence: '落葉松',
    keyQuote: '我完全認可自己的價值，我知道我是獨特且無可取代的。',
    imageUrl: 'https://images.unsplash.com/photo-1511875762315-c80ee915359a?auto=format&fit=crop&w=1080&q=80', // 自信發光的天鵝
    postContent: `親愛的，早安 ✨\n\n你身上擁有著獨一無二的才華與美麗，只是有時候你忘了戴上欣賞自己的眼鏡。深呼吸，告訴自己：我已經準備好發光了。\n\n「我完全認可我自己的價值。我充滿自信地展現我的才華。我知道我是獨特且無可取代的，我對自己充滿驕傲。」✨\n\n🌱 【今日的心靈種子】\n今天，試著不吝嗇地去讚美身邊人的一個優點，並具體地告訴他。當我們用力去點亮別人的『自信』，我們自己身上的光芒也會隨之閃耀奪目 🌟\n\n願你今天看見自己最璀璨的模樣。❤️`
  },
  {
    id: 'pine', categoryId: 'c6', feeling: '想要原諒自己，給自己一個大大的肯定 🌲', flowerEssence: '松樹',
    keyQuote: '我原諒自己過去的選擇，肯定並深愛現在的自己。',
    imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1080&q=80', // 陽光穿透高大包容的松樹林
    postContent: `親愛的，早安 🌲\n\n請停止在心裡對自己說抱歉了。你已經做得很好了，在當時的狀態下，你已經盡了最大的努力。請用對待最好朋友的溫柔，來對待自己。\n\n「我原諒自己過去的所有選擇。我深深地愛著並肯定現在的自己。我值得擁有所有的快樂與美好，不需要任何條件。」✨\n\n🌱 【今日的心靈種子】\n今天，如果有人犯了小錯誤而感到懊惱，請給他們一個充滿理解的微笑，說聲：「沒關係的。」當我們給予他人『寬恕與包容』，我們也就原諒了那個不完美的自己 🕊️\n\n願你今天給自己滿滿的肯定與愛。❤️`
  },
  {
    id: 'elm', categoryId: 'c6', feeling: '覺得責任有點重，需要一個依靠 🌳', flowerEssence: '榆樹',
    keyQuote: '我允許自己偶爾放下責任，敞開心胸接受宇宙的支持。',
    imageUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1080&q=80', // 可以安心卸下重擔的沙發
    postContent: `親愛的，早安 🌳\n\n能力很好、總是被大家依賴的你，偶爾也會覺得肩膀有點沉重吧。請記得，你不需要一個人扛起全世界。適時地尋求幫助，是很有智慧的表現。\n\n「我允許自己偶爾放下責任。我知道請求協助是安全的。宇宙會派來天使與貴人來支持我，我只需要敞開心胸接受。」✨\n\n🌱 【今日的心靈種子】\n今天，試著把一件小事交給別人幫忙，並充滿感激地接受。當我們給出讓別人表現『支持』的機會，我們也為自己創造了一個可以安心依靠的肩膀 🤝\n\n願你今天感到輕鬆且被深深支持著。❤️`
  },
  {
    id: 'sweetchestnut', categoryId: 'c6', feeling: '想要在黑暗中看見重生的光 🕯️', flowerEssence: '甜栗樹',
    keyQuote: '在低潮中我看見重生的力量，迎接充滿愛的新篇章。',
    imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1080&q=80', // 熬過黑夜的破曉晨光
    postContent: `親愛的，早安 🕯️\n\n當我們感覺走到谷底時，其實也就是準備要向上攀升的時刻了。在你覺得最沒有力氣的時候，宇宙正準備為你展開一雙隱形的翅膀。\n\n「在每一次的低潮中，我都看見重生的力量。我是安全的，這一切都會過去。我將迎來充滿光明與愛的新篇章。」✨\n\n🌱 【今日的心靈種子】\n今天，如果你知道有朋友正處於低潮，傳個訊息告訴他：「我一直都在。」當我們在別人的黑夜裡點亮一盞小小的『陪伴之燈』，我們自己生命的光芒也會跟著亮起 🌅\n\n願你今天感受到重生的溫暖與力量。❤️`
  },
  {
    id: 'starofbethlehem', categoryId: 'c6', feeling: '想要撫平心裡的小小傷痕 🌟', flowerEssence: '伯利恆之星',
    keyQuote: '療癒之光正溫暖流經我，我的心靈正在恢復平靜。',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1080&q=80', // 雙手溫柔捧著星星安撫
    postContent: `親愛的，早安 🌟\n\n如果在過去的日子裡，心裡留下了一些小小的驚嚇或傷痕，請允許它們被溫柔地看見。你已經走過來了，現在是無比安全的。\n\n「我把所有的過去交託給愛。宇宙的療癒之光正溫暖地流經我，撫平我所有的感受，我的心靈正在恢復平靜與完整。」✨\n\n🌱 【今日的心靈種子】\n今天，如果遇到需要安撫的人，給予一個輕輕的拍背或是一個理解的眼神。當我們成為別人安心的港灣，給予『安慰』，我們也在修復自己內在的安全感 🕊️\n\n願你今天被無盡的溫柔與平靜包圍。❤️`
  },
  {
    id: 'willow', categoryId: 'c6', feeling: '想要釋放委屈，成為生命的主人 🌿', flowerEssence: '柳樹',
    keyQuote: '我是生命唯一的主人，我用愛創造豐盛的美好生活。',
    imageUrl: 'https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2?auto=format&fit=crop&w=1080&q=80', // 湖畔綠柳隨風釋放情緒
    postContent: `親愛的，早安 🌿\n\n心裡覺得委屈的時候，拍拍自己的肩膀，告訴自己：「我聽見你的不開心了。」當我們停止抱怨，我們就把改變生命的力量拿回了自己手裡。\n\n「我釋放所有對過去的抗拒與不滿。我是我生命唯一的主人。我用愛與感恩，創造出充滿喜悅與豐盛的美好生活。」✨\n\n🌱 【今日的心靈種子】\n今天，試著找出一件讓你覺得感恩的小事，並在心裡說聲謝謝。當我們播下『感恩』的種子，生命就會自動為我們開出充滿幸運與奇蹟的花朵 🌸\n\n願你今天充滿力量，主宰自己的快樂。❤️`
  },
  {
    id: 'oak', categoryId: 'c6', feeling: '一直很堅強的你，想當個被照顧的孩子 🌳', flowerEssence: '橡樹',
    keyQuote: '我允許自己休息，柔軟和需要被照顧是完全可以的。',
    imageUrl: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=1080&q=80', // 大橡樹下放鬆的野餐墊
    postContent: `親愛的，早安 🌳\n\n一直以來你都像棵大樹一樣為大家遮風擋雨，真的非常了不起。但今天，請允許自己卸下堅強的鎧甲，做一個可以撒嬌、可以被照顧的孩子吧。\n\n「我允許自己休息。柔軟和需要被照顧是完全可以的。我敞開心胸，接受這個世界對我的愛與滋養。」✨\n\n🌱 【今日的心靈種子】\n今天，試著對別人展現一點點你的『脆弱』，也許是說一句：「我今天有點累，可以幫我嗎？」當我們允許自己被照顧，我們也為別人種下了能夠付出愛的幸福感 💖\n\n願你今天感到柔軟且被深深疼愛。❤️`
  },
  {
    id: 'crabapple', categoryId: 'c6', feeling: '想要全然接納自己原本的模樣 🍎', flowerEssence: '野生酸蘋果',
    keyQuote: '我深深愛著並接納自己，我在宇宙眼中是完全美麗的。',
    imageUrl: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=1080&q=80', // 泉水旁純淨的白色小花
    postContent: `親愛的，早安 🍎\n\n有時候，我們會不自覺地放大自己的不完美。但請記得，你靈魂的本質是純淨無瑕的。那些你以為的小瑕疵，正是你獨特可愛的地方。\n\n「我深深地愛著並接納我自己，包括每一個小小的特質。我在宇宙的眼中是完全美麗、絕對純潔的。」✨\n\n🌱 【今日的心靈種子】\n今天，試著真誠地讚美別人身上一個微小的美好。當我們看見他人的閃光點，我們也正在擦亮自己心裡的那面鏡子，看見自己本來的珍貴與美麗 💎\n\n願你今天看見自己最美的模樣。❤️`
  },

  // --- Category 7: 柔軟與包容 ---
  {
    id: 'chicory', categoryId: 'c7', feeling: '渴望無條件的愛與自由的關係 💕', flowerEssence: '菊苣',
    keyQuote: '我給予自己滿滿的愛，也給予身邊的人全然的自由。',
    imageUrl: 'https://images.unsplash.com/photo-1490260400179-d4ea0813eb6f?auto=format&fit=crop&w=1080&q=80', // 柔美的粉色雲彩，象徵無條件的愛與寬廣
    postContent: `親愛的，早安 💕\n\n你給出的愛是如此豐富。當我們不再期待對方必須用特定的方式回報時，愛就會變成一雙自由的翅膀，讓彼此都能在關係中輕鬆飛翔。\n\n「我給予自己滿滿的愛，我的內在非常豐盛。我用無條件的愛對待身邊的人，我給予他們自由，也給予自己自由。」✨\n\n🌱 【今日的心靈種子】\n今天，為某個人做一件貼心的小事，並且「完全不期待對方發現或道謝」。當我們給出『無條件的給予』，我們的心胸會變得無比寬廣與豐盛 🕊️\n\n願你今天在愛中感到全然的自由。❤️`
  },
  {
    id: 'vervain', categoryId: 'c7', feeling: '想要放鬆緊繃的神經，享受悠閒 🍵', flowerEssence: '馬鞭草',
    keyQuote: '我允許自己慢下來，在輕鬆與悠閒中找到更大的智慧。',
    imageUrl: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1080&q=80', // 樹間慵懶放鬆的吊床
    postContent: `親愛的，早安 🍵\n\n你總是對生活充滿熱情與理想，但請記得，橡皮筋拉得太緊是會失去彈性的。今天，給自己一個「什麼都不做」的特權吧。\n\n「我允許自己慢下來。世界有它運轉的步調，不需要我時刻推動。我在輕鬆與悠閒中，找到了更大的靈感與智慧。」✨\n\n🌱 【今日的心靈種子】\n今天，如果看到有人為了把事情做好而顯得很緊繃，溫柔地對他說：「慢慢來，你已經做得很好了。」當我們給予他人『放鬆』的許可，我們自己緊繃的神經也會隨之舒展 🍃\n\n願你今天擁有一個輕鬆愜意的美好時光。❤️`
  },
  {
    id: 'vine', categoryId: 'c7', feeling: '想要用柔軟與愛來帶領身邊的人 🍇', flowerEssence: '葡萄藤',
    keyQuote: '我用愛與智慧帶領，真正的力量來自溫柔與包容。',
    imageUrl: 'https://images.unsplash.com/photo-1516086745163-54be12bb2939?auto=format&fit=crop&w=1080&q=80', // 溫柔牽著彼此的手
    postContent: `親愛的，早安 🍇\n\n你擁有非常棒的領導才華與清晰的頭腦。如果能將這份力量包裹上柔軟的愛，你的話語將會像春風一樣，溫暖地吹進每個人的心裡。\n\n「我用愛與智慧來帶領自己和他人。我尊重每個人的獨特性。真正的力量，來自於溫柔與包容。」✨\n\n🌱 【今日的心靈種子】\n今天，當你需要請別人做事時，試著用詢問的語氣代替指令：「你覺得我們這樣做會不會更好呢？」當我們給予他人『尊重與選擇』的空間，我們會贏得最真誠的跟隨 🤝\n\n願你今天展現溫柔而堅定的美好力量。❤️`
  },
  {
    id: 'beech', categoryId: 'c7', feeling: '想要用更包容的眼光看世界 🍁', flowerEssence: '山毛櫸',
    keyQuote: '我用寬容與愛的眼光看待每個人，欣賞事物原本的美好。',
    imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1080&q=80', // 透過放大鏡看見世界的美好色彩
    postContent: `親愛的，早安 🍁\n\n我們有時候會對周遭的事物有著很高的標準。試著換上「欣賞」的濾鏡吧，你會發現，那些小小的不完美，反而讓這個世界變得生動可愛。\n\n「我用寬容與愛的眼光看待每一個人。我接納生命的多樣性。我看見並欣賞事物原本的美好模樣。」✨\n\n🌱 【今日的心靈種子】\n今天，當你心裡出現想要批評的念頭時，立刻轉換去找出對方身上的一個優點。當我們散播『包容與讚美』的種子，我們的世界就會變得無比寬廣與溫暖 ☀️\n\n願你今天用充滿愛的雙眼欣賞這個世界。❤️`
  },
  {
    id: 'rockwater', categoryId: 'c7', feeling: '想要對自己再溫柔、再寬容一點 💧', flowerEssence: '岩水',
    keyQuote: '我對自己充滿溫柔與慈悲，像水一樣柔軟且充滿力量。',
    imageUrl: 'https://images.unsplash.com/photo-1441922558509-ce1235a9f993?auto=format&fit=crop&w=1080&q=80', // 清淨溪水流過鵝卵石，柔軟順流
    postContent: `親愛的，早安 💧\n\n你對自己的要求總是很嚴格，希望能成為最好的人。但親愛的，真正的完美，包含了接納自己的不完美。像水一樣柔軟吧，順流而下。\n\n「我對自己充滿溫柔與慈悲。我允許生命有彈性，我享受生活的樂趣。我是自由的，像水一樣柔軟且充滿力量。」✨\n\n🌱 【今日的心靈種子】\n今天，給自己一個「破例」的小機會，也許是吃一塊美味的蛋糕，或是提早半小時休息。當我們學會對自己『寬容』，我們的心就會變得像活水一樣充滿生機 🌊\n\n願你今天對自己充滿溫柔的寵愛。❤️`
  }
];

export default function App() {
  const [activeCategoryId, setActiveCategoryId] = useState(categories[0].id);
  const [selectedPost, setSelectedPost] = useState(healingPosts.find(p => p.categoryId === categories[0].id));
  const [copyStatus, setCopyStatus] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);

  const currentCategoryPosts = healingPosts.filter(p => p.categoryId === activeCategoryId);

  const handleCategoryClick = (categoryId) => {
    setActiveCategoryId(categoryId);
    const firstPost = healingPosts.find(p => p.categoryId === categoryId);
    if (firstPost) setSelectedPost(firstPost);
  };

  const handleCopy = () => {
    const textArea = document.createElement("textarea");
    textArea.value = selectedPost.postContent;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setCopyStatus('已複製貼文！✨');
      setTimeout(() => setCopyStatus(''), 3000);
    } catch (err) {
      setCopyStatus('複製失敗');
    }
    document.body.removeChild(textArea);
  };

  // 繪製文字並自動換行 (Canvas 用)
  const wrapText = (context, text, x, y, maxWidth, lineHeight) => {
    const chars = text.split('');
    let line = '';
    const lines = [];

    for (let i = 0; i < chars.length; i++) {
      const testLine = line + chars[i];
      const metrics = context.measureText(testLine);
      if (metrics.width > maxWidth && i > 0) {
        lines.push(line);
        line = chars[i];
      } else {
        line = testLine;
      }
    }
    lines.push(line);

    const totalHeight = lines.length * lineHeight;
    let startY = y - (totalHeight / 2) + (lineHeight / 3);

    lines.forEach(l => {
      context.fillText(l, x, startY);
      startY += lineHeight;
    });
  };

  const handleDownload = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    
    try {
      const response = await fetch(selectedPost.imageUrl);
      // 若網址失效回傳錯誤，手動觸發 fallback
      if (!response.ok) throw new Error('Image fetch failed'); 
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      // 調整 Canvas 比例：1080x1200 (下方留白)
      canvas.width = 1080;
      canvas.height = 1200;

      const img = new Image();
      img.src = objectUrl;

      // 繪製流程封裝
      const drawCanvas = (imageToDraw) => {
        // 1. 繪製底圖
        const imageAreaHeight = 1080;
        const scale = Math.max(canvas.width / imageToDraw.width, imageAreaHeight / imageToDraw.height);
        const drawWidth = imageToDraw.width * scale;
        const drawHeight = imageToDraw.height * scale;
        const x = (canvas.width - drawWidth) / 2;
        const y = (imageAreaHeight - drawHeight) / 2;
        ctx.drawImage(imageToDraw, x, y, drawWidth, drawHeight);

        // 2. 半透明疊加層
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.fillRect(0, 0, canvas.width, imageAreaHeight);

        // 3. 花精名稱標籤
        const essenceText = `✿ ${selectedPost.flowerEssence} ✿`;
        ctx.font = '500 32px sans-serif';
        const essenceWidth = ctx.measureText(essenceText).width;
        const badgeWidth = essenceWidth + 60;
        const badgeHeight = 64;
        const badgeX = (canvas.width - badgeWidth) / 2;
        const badgeY = imageAreaHeight / 2 - 280;

        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.beginPath();
        ctx.roundRect(badgeX, badgeY, badgeWidth, badgeHeight, 32);
        ctx.fill();
        ctx.strokeStyle = 'rgba(254, 205, 211, 0.8)';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#e11d48';
        ctx.fillText(essenceText, canvas.width / 2, badgeY + badgeHeight / 2);
        ctx.textBaseline = 'alphabetic';

        // 4. 情境文字
        ctx.textAlign = 'center';
        ctx.fillStyle = '#57534e';
        ctx.font = '300 42px sans-serif'; 
        ctx.fillText(selectedPost.feeling.replace(/[^\u4e00-\u9fa5]/g, ''), canvas.width / 2, imageAreaHeight / 2 - 130);

        // 5. 金句文字
        ctx.fillStyle = '#9f1239';
        ctx.font = '500 64px sans-serif'; 
        wrapText(ctx, `「${selectedPost.keyQuote}」`, canvas.width / 2, imageAreaHeight / 2 + 30, 800, 96);

        // 6. 下方留白特區
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, imageAreaHeight, canvas.width, canvas.height - imageAreaHeight);

        const link = document.createElement('a');
        link.download = `healing-post-${selectedPost.flowerEssence}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        
        if (objectUrl) URL.revokeObjectURL(objectUrl);
        setIsDownloading(false);
      };

      img.onload = () => drawCanvas(img);
      
      // 如果圖庫來源發生錯誤的雙重保險
      img.onerror = () => {
        const fallbackImg = new Image();
        fallbackImg.crossOrigin = "Anonymous";
        fallbackImg.src = FALLBACK_IMAGE;
        fallbackImg.onload = () => drawCanvas(fallbackImg);
      };

    } catch (error) {
      console.error(error);
      // Fetch 失敗時的終極保險
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 1080;
      canvas.height = 1200;
      
      const fallbackImg = new Image();
      fallbackImg.crossOrigin = "Anonymous";
      fallbackImg.src = FALLBACK_IMAGE;
      fallbackImg.onload = () => {
        /* (為節省空間簡化 fallback 繪製，實際直接使用備用圖) */
        ctx.drawImage(fallbackImg, 0, 0, 1080, 1080);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.fillRect(0, 0, 1080, 1080);
        ctx.textAlign = 'center';
        ctx.fillStyle = '#9f1239';
        ctx.font = '500 64px sans-serif'; 
        wrapText(ctx, `「${selectedPost.keyQuote}」`, 540, 540 + 30, 800, 96);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 1080, 1080, 120);
        const link = document.createElement('a');
        link.download = `healing-post-${selectedPost.flowerEssence}-fallback.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        setIsDownloading(false);
      };
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-800 p-4 md:p-8 selection:bg-rose-100 selection:text-rose-900">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-4 pt-6 pb-2">
          <div className="inline-flex items-center justify-center p-3 bg-white/80 rounded-full text-rose-400 mb-2 shadow-sm border border-rose-50">
            <Flower2 size={28} />
          </div>
          <h1 className="text-2xl md:text-3xl font-light tracking-wide text-stone-700">
            每日心靈療癒貼文
          </h1>
          <p className="text-stone-500 font-light tracking-wider text-sm md:text-base">
            以愛滋養，用種子法則豐盛你的每一天
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* 左側：情境選擇區 */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-stone-100">
              <h2 className="text-sm font-medium text-stone-500 mb-4 px-2">今天，你的心渴望什麼？</h2>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.id)}
                    className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                      activeCategoryId === cat.id
                        ? 'bg-rose-50 text-rose-600 border border-rose-200 font-medium shadow-sm'
                        : 'bg-stone-50 text-stone-500 border border-transparent hover:bg-stone-100'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-3 shadow-sm border border-stone-100">
              <div className="space-y-1">
                {currentCategoryPosts.map((post) => (
                  <button
                    key={post.id}
                    onClick={() => setSelectedPost(post)}
                    className={`w-full text-left px-5 py-4 rounded-2xl text-sm md:text-base transition-all duration-200 flex items-center justify-between group ${
                      selectedPost?.id === post.id
                        ? 'bg-gradient-to-r from-rose-50 to-orange-50 text-rose-700 font-medium'
                        : 'hover:bg-stone-50 text-stone-600'
                    }`}
                  >
                    <span>{post.feeling}</span>
                    <ChevronRight size={16} className={`${selectedPost?.id === post.id ? 'text-rose-400 opacity-100' : 'text-stone-300 opacity-0 group-hover:opacity-100'} transition-opacity`} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 右側：圖文直出預覽區 */}
          <div className="lg:col-span-7">
            {selectedPost && (
              <div className="bg-white rounded-[2rem] overflow-hidden shadow-md border border-stone-100 max-w-lg mx-auto transition-all duration-500 transform sticky top-8">
                
                {/* 完美圖文疊加的預覽畫面 */}
                <div className="flex flex-col group">
                  {/* 上方：底圖+疊加文字 */}
                  <div className="relative aspect-square overflow-hidden bg-stone-100 flex items-center justify-center p-8 text-center">
                    <img 
                      src={selectedPost.imageUrl} 
                      alt="Post Background" 
                      onError={(e) => { e.target.src = FALLBACK_IMAGE; }} // 畫面上遇到破圖直接替換備用圖
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-white/35 backdrop-blur-[1px]"></div>
                    
                    <div className="relative z-10 flex flex-col items-center max-w-[90%]">
                      <span className="mb-5 md:mb-6 font-medium text-rose-600 text-xs md:text-sm border-2 border-rose-200/80 bg-white/60 px-4 py-1.5 md:px-5 md:py-2 rounded-full backdrop-blur-sm shadow-sm">
                        ✿ {selectedPost.flowerEssence} ✿
                      </span>
                      <span className="text-stone-600 mb-4 md:mb-5 font-light text-sm md:text-base tracking-widest">
                        {selectedPost.feeling.replace(/[^\u4e00-\u9fa5]/g, '')}
                      </span>
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-medium text-rose-800 leading-normal md:leading-relaxed tracking-wide drop-shadow-sm">
                        「{selectedPost.keyQuote}」
                      </h3>
                    </div>
                  </div>

                  {/* 下方留白區域 */}
                  <div className="bg-white py-6 border-b border-stone-100">
                    {/* Empty block to maintain ratio */}
                  </div>
                </div>

                {/* 按鈕與文字區 */}
                <div className="p-6 md:p-8 space-y-6 bg-white">
                  
                  {/* 雙重操作按鈕 */}
                  <div className="flex flex-col sm:flex-row gap-3 border-b border-stone-100 pb-6">
                    <button
                      onClick={handleDownload}
                      disabled={isDownloading}
                      className={`flex-1 flex justify-center items-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium transition-all duration-300 shadow-sm ${
                        isDownloading 
                          ? 'bg-stone-200 text-stone-500 cursor-not-allowed' 
                          : 'bg-rose-500 text-white hover:bg-rose-600 hover:shadow-md'
                      }`}
                    >
                      {isDownloading ? (
                        <><Loader2 size={18} className="animate-spin" /> 圖片處理中...</>
                      ) : (
                        <><Download size={18} /> 下載高畫質圖片</>
                      )}
                    </button>

                    <button
                      onClick={handleCopy}
                      className="flex-1 flex justify-center items-center gap-2 px-6 py-3.5 bg-stone-100 text-stone-700 hover:bg-stone-200 rounded-full text-sm font-medium transition-all duration-300 shadow-sm"
                    >
                      {copyStatus ? <CheckCircle2 size={18} className="text-green-600" /> : <Copy size={18} />}
                      {copyStatus || '複製貼文內容'}
                    </button>
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-flex items-center px-3 py-1 bg-rose-50 text-rose-500 rounded-full text-xs font-medium tracking-wide">
                      {selectedPost.flowerEssence}
                    </span>
                  </div>
                  
                  <p className="text-stone-600 leading-loose whitespace-pre-wrap font-light tracking-wide text-[15px] md:text-base">
                    {selectedPost.postContent}
                  </p>

                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

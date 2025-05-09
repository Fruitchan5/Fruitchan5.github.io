const ap = new APlayer({
    container: document.getElementById('aplayer'), // 播放器容器的 ID
    audio: [
      {
        name: '为什么',
        artist: '五月天',
        url: 'music/why.mp3', // 替换为你音乐文件的 URL
        cover: 'image/handsome.jpg', // 替换为封面图的 URL
        lrc: 'music/为什么（今日的爱情）-五月天-歌词。lrc' // 替换为歌词文件的 URL
      }
    ],
    lrcType: 3,  // 自动滚动歌词
    autoplay: true,  // 自动播放
    loop: 'all',  // 循环播放
    storageName: 'aplayer', // 使用本地存储保存播放器状态
    volume: 0.8, // 默认音量，改成你想要的音量大小
  });
  
  // 恢复进度和播放状态
  window.addEventListener('load', function () {
    const savedTime = localStorage.getItem('savedTime');
    const isPlaying = localStorage.getItem('isPlaying') === 'true'; // 获取播放状态
  
    if (savedTime) {
      ap.seek(savedTime);  // 恢复播放进度
    }
    
    if (isPlaying) {
      ap.play(); // 恢复播放
    }
  });
  
  // 监听播放器的时间更新事件
  ap.on('timeupdate', function () {
    localStorage.setItem('savedTime', ap.audio.currentTime);  // 保存播放进度
  });
  
  // 监听播放器的暂停事件
  ap.on('pause', function () {
    localStorage.setItem('savedTime', ap.audio.currentTime);  // 暂停时保存播放进度
    localStorage.setItem('isPlaying', 'false'); // 保存暂停状态
  });
  
  // 监听播放器的播放事件
  ap.on('play', function () {
    localStorage.setItem('isPlaying', 'true'); // 播放时保存播放状态
  });
  
  // 确保页面加载时自动恢复播放器
  window.addEventListener('load', function () {
    // 恢复播放进度和状态
    const savedTime = localStorage.getItem('savedTime');
    const isPlaying = localStorage.getItem('isPlaying') === 'true';
  
    if (savedTime && isPlaying) {
      ap.seek(savedTime);  // 恢复播放进度
      ap.play();           // 播放音乐
    }
  });
  